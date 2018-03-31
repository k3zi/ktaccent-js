const MeCab = new require('mecab-async');
const _request = require("request");
const request = require('cached-request')(_request);
const cheerio = require('cheerio');
const moji = require('moji');
const glob = require('glob')
const path = require('path');

request.setCacheDirectory(path.resolve(__dirname, './temp/'));

var mecab = new MeCab();

var parser = data => ({
    kanji: data[0],
    lexical: data[1],
    compound: data[2],
    compound2: data[3],
    compound3: data[4],
    conjugation: data[5],
    inflection: data[6],
    original: data[7],
    reading: data[8],
    pronunciation: data[9] || ''
});

String.prototype.insertJapanese = function (index, string) {
    if (index > 0) {
        if ('ァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ'.includes(this.charAt(index))) {
            index += 1;
        }

        return this.substring(0, index) + string + this.substring(index, this.length);
    }

    return string + this;
};

function loadExceptions() {
    return glob.sync('./exceptions/**/index.js', { cwd: __dirname }).map(file => {
        return require(path.resolve(__dirname, file));
    });
}

function fetchPronunciation(word, reading, callback) {
    request({
        url: 'https://www.weblio.jp/content/' + encodeURI(word),
        method: 'GET',
        ttl: 1000 * 60 * 60 * 24 * 365 * 10
    }, function (error, response, body) {
        if (error) {
            // console.log(`error: ${error}`);
            return callback();
        }

        var $ = cheerio.load(body);

        $('span').not(function(i, el) {
            return $(this).text().includes("［");
        }).remove();

        var foundWord = false;

        // console.log(`loaded body: ${word}`);

        $('.midashigo').each(function(i, elem) {
            if (!$(this).html().includes('span') || foundWord) {
                return;
            }

            var text = $(this).text().replace("・", "");
            var splitText = text.split('［');
            var word = splitText[0].trim().replace(/ /g, "").replace(/　/g, "").replace(/・/g, "");

            // console.log(`Got text: ${text} ${splitText.length}`);
            for (var i = 1; i < splitText.length; i++) {
                var accent = splitText[i].split('］')[0];
                accent = parseInt(accent);
                if (reading.length == 0 || moji(word).convert('HG', 'KK').toString() == reading) {
                    foundWord = true;
                    return callback(word, accent);
                }
            }
        });

        if (!foundWord) {
            // console.log(`didn't find: ${word}`);
            return callback();
        }
    });
}

var exceptionHandlers = loadExceptions();

function internalParse(textArray, resultArray, callback) {
    // console.log(`internalParse: ${resultArray.join('')}`);
    exceptionHandlers.forEach(handler => {
        if (textArray.length > 0) {
            handler(textArray, resultArray);
        }
    });

    if (textArray.length == 0) {
        return callback(resultArray.join(''));
    }

    var word = textArray.shift();

    if (['名詞', '感動詞'].includes(word.lexical)) {
        fetchPronunciation(word.kanji, word.reading, function (fetchedWord, accent) {
            var result = word.pronunciation;
            if (!word) {
                result = `~~${result}~~`;
            }

            if (accent > 0) {
                result = result.insertJapanese(accent, "＼");
            }

            resultArray.push(result);
            internalParse(textArray, resultArray, callback);
        });
    } else {
        var result = word.pronunciation;
        resultArray.push(result);
        internalParse(textArray, resultArray, callback);
    }
}

function parse(text, callback) {
    mecab.parse(text, function(err, result) {
        if (err) throw err;
        var mecabArray = result.map(parser);
        internalParse(mecabArray, [], callback)
    });
}

exports.parse = parse;
