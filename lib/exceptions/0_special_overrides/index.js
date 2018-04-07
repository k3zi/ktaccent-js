module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    var previousWord = parser.removeResult();
    var foundException = 0;

    if (word.kanji.startsWith('つまら') && word.lexical === '形容詞') {
        foundException = 1;
        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }
        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }

        var text = '困ら' + word.kanji.replace('つまら', '');
        utilities.mecab.parse(text, function(err, result) {
            if (err) throw err;
            var mecabArray = result.map(utilities.mecabDataParser);
            mecabArray[0].kanji = '詰まら';
            mecabArray[0].original = '詰まる';
            mecabArray[0].reading = 'ツマラ';
            mecabArray[0].pronunciation = 'ツマラ';

            mecabArray.reverse().forEach(x => parser.textArray.unshift(x));
            parser.internalParse();
        });
    } else if (word.original == 'ない' && word.lexical == '助動詞') {
        word.lexical = '形容詞';
        // Leave the value to be unshifted
    } else if (word.kanji == 'ん' && previousWord.result == 'ナ') {
        foundException = -1;
        if (nextWord) {
            parser.textArray.unshift(nextWord);
        }

        var prevprevWord = parser.removeResult();
        if (prevprevWord) {
            parser.insertResult(prevprevWord);
        }
        word.result = prevprevWord && prevprevWord.includes('＼') ? 'ナン' : 'ナ＼ン';
        parser.insertResult(word);
    } else if (word.kanji == '何' && word.pronunciation == 'ナニ' && nextWord && 'ダデ'.includes(nextWord.pronunciation.charAt(0))) {
        foundException = -1;
        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }

        word.result = 'ナ＼ン';
        parser.insertResult(word);
    } else if (word.lexical == '名詞' && ['固有名詞', 'サ変接続'].includes(word.compound)) {
        foundException = -1;
        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }

        word.result = word.pronunciation;
        parser.insertResult(word);
    }

    if (previousWord && previousWord.lexical == '助詞' && previousWord.original == 'じゃ' && ['形容詞', '助動詞'].includes(word.lexical) && word.original == 'ない') {
        word.shouldSpace = false;
    }

    if (foundException == 0) {
        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }
        parser.textArray.unshift(word);
    }

    return foundException;
}
