const MeCab = new require('mecab-async');
const _request = require("request");
const request = require('cached-request')(_request);
const cheerio = require('cheerio');
const moji = require('moji');
const glob = require('glob')
const path = require('path');

request.setCacheDirectory(path.resolve(__dirname, './temp/'));

var mecab = new MeCab();

var mecabDataParser = data => ({
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

function insertJapanese(base, index, string) {
    if (index > 0) {
        if ('ァィゥェォャュョヮヵヶぁぃぅぇぉゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ'.includes(base.charAt(index))) {
            index += 1;
        }

        return base.substring(0, index) + string + base.substring(index, base.length);
    }

    return string + base;
}

function isAfterADoubleVowel(string, position) {
    var vowels = 'あいうえおアイウエオ';
    return position > 1
        && vowels.includes(string.charAt(position - 1))
        && vowels.includes(string.charAt(position - 2));
}

function isAtVoiclessVowel(string, position) {
    var frontSet = 'きキくクしシすスちチつツひヒふフぴピぷプ';
    var backSet = 'かきくけこさしすせそたちつてとはひふへほぱぴぷぺぽカキクケコサシスセソタチツテトハヒフヘホパピプペポ';
    return position > 0
        && frontSet.includes(string.charAt(position - 1))
        && backSet.includes(string.charAt(position));
}

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

var utilities = {
    fetchPronunciation: fetchPronunciation,
    insertJapanese: insertJapanese,
    isAfterADoubleVowel: isAfterADoubleVowel,
    isAtVoiclessVowel: isAtVoiclessVowel
};

var KTAccentSession = function () {
    this.textArray = [];
    this.resultArray = [];
    this.callback = function () { };
    this.exceptionHandlers = loadExceptions();
}

KTAccentSession.prototype.internalParse = function() {
    var shouldSkip = 0;
    this.exceptionHandlers.forEach(handler => {
        shouldSkip = shouldSkip || handler(this, utilities);
    });

    if (shouldSkip === 1) {
        // Cut off this thread of execution since another is running
        return;
    } else if (shouldSkip === -1) {
        // Run again
        return this.internalParse();
    }

    if (this.textArray.length == 0) {
        return this.callback(this.resultArray.join(''));
    }

    var word = this.textArray.shift();
    if (['名詞', '感動詞', '副詞', '形容詞', '動詞'].includes(word.lexical)) {
        var self = this;
        fetchPronunciation(word.kanji, word.reading, function (fetchedWord, accent) {
            var result = word.pronunciation;
            if (!word) {
                result = `~~${result}~~`;
            }

            if (accent > 0) {
                result = insertJapanese(result, accent, "＼");
            }

            self.resultArray.push(result);
            self.internalParse();
        });
    } else {
        var result = word.pronunciation;
        this.resultArray.push(result);
        this.internalParse();
    }
}

function parse(text, callback) {
    mecab.parse(text, function(err, result) {
        if (err) throw err;
        var mecabArray = result.map(mecabDataParser);
        var parser = new KTAccentSession();
        parser.textArray = mecabArray;
        parser.callback = callback;
        parser.internalParse();
    });
}

utilities.insertJapanese = insertJapanese;
utilities.parse = parse;
utilities.mecabDataParser = mecabDataParser;
utilities.mecab = mecab;
exports.parse = parse;
