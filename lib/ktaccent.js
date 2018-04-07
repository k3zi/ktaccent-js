const MeCab = new require('mecab-async');
const _request = require("request");
const request = require('cached-request')(_request);
const cheerio = require('cheerio');
const moji = require('moji');
const glob = require('glob')
const path = require('path');

request.setCacheDirectory(path.resolve(__dirname, './temp/'));

var mecab = new MeCab();

var KTAccentWord = function (data, result) {
    this.kanji = data[0];
    this.lexical = data[1];
    this.compound = data[2];
    this.compound2 = data[3];
    this.compound3 = data[4];
    this.conjugation = data[5];
    this.inflection = data[6];
    this.original = data[7];
    this.reading = data[8];
    this.pronunciation = data[9] || '';
    this.result = result || false;
    this.shouldSpace = true;
};

KTAccentWord.prototype.includes = function (str) {
    return this.result.includes(str);
};

KTAccentWord.prototype.slice = function (start, end) {
    return this.result.slice(start, end);
};

KTAccentWord.prototype.replace = function (searchvalue, newvalue) {
    return this.result.replace(searchvalue, newvalue);
};

var mecabDataParser = data => new KTAccentWord(data);

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
    this.divider = KTAccentWord([], '　');
};

KTAccentSession.prototype.insertResult = function (word, extraInfo) {
    if (!word || typeof word === 'undefined') {
        return;
    }

    this.resultArray.push(word);
    var noSpaceGroup = ['ジャ'];
    if (word.lexical == '助詞'
        && this.textArray.length
        && this.textArray[0].lexical != '記号'
        && !noSpaceGroup.includes(word.pronunciation)
    ) {
        this.resultArray.push(this.divider);
    }
};

KTAccentSession.prototype.removeResult = function () {
    return this.resultArray.pop();
};

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
        return this.callback(this.resultArray.map((x, i, a) => {
            var addDivider = true;
            if (['記号'].includes(x.lexical)) {
                addDivider = false;
            }

            if (['接尾', '接続助詞'].includes(x.compound)) {
                addDivider = false;
            }

            if ('助動詞' == x.lexical && i > 0 && a[i - 1].inflection != '基本形' && ['助動詞', '助詞', '動詞'].includes(a[i -1].lexical)) {
                addDivider = false;
            }

            if (i == 0 || ['記号', '接頭詞'].includes(a[i - 1].lexical)) {
                addDivider = false;
            }

            if (!x.shouldSpace) {
                addDivider = false;
            }

            return (addDivider ? '　' : '') + x.result;
        }).join('').replace('　　', '　'));
    }

    var word = this.textArray.shift();
    if (['名詞', '感動詞', '副詞', '形容詞', '動詞'].includes(word.lexical)
        && !word.pronunciation.includes('＼')) {
        var self = this;
        fetchPronunciation(word.kanji, word.reading, function (fetchedWord, accent) {
            var result = word.pronunciation;
            if (accent > 0) {
                result = insertJapanese(result, accent, "＼");
            }

            word.result = result;
            self.insertResult(word);
            self.internalParse();
        });
    } else {
        var result = word.pronunciation;
        word.result = result;
        this.insertResult(word);
        this.internalParse();
    }
};

function parse(text, callback) {
    mecab.parse(moji(text).convert('ZE', 'HE').toString(), function(err, result) {
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
