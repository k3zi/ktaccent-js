module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    var previousWord = parser.resultArray.pop();
    var foundException = 0;

    if (word.kanji.startsWith('つまら') && word.lexical === '形容詞') {
        var text = '食べ' + word.kanji.replace('つまら', '');
        utilities.mecab.parse(text, function(err, result) {
            if (err) throw err;
            var mecabArray = result.map(utilities.parser);
            mecabArray[0].kanji = 'つまら';
            mecabArray[0].original = 'つまる';
            mecabArray[0].reading = 'ツマラ';
            mecabArray[0].pronunciation = 'ツマラ';
            mecabArray.reverse().forEach(x => parser.textArray.unshift(x));
            parser.internalParse();
        });
        foundException = 1;
    } else if (word.original == 'ない' && word.lexical == '助動詞') {
        word.lexical = '形容詞';
        // Leave the value to be unshifted
    } else if (word.kanji == 'ん' && previousWord == 'ナ') {
        foundException = -1;
        if (nextWord) {
            parser.textArray.unshift(nextWord);
        }

        var prevprevWord = parser.resultArray.pop();
        if (prevprevWord) {
            parser.resultArray.push(prevprevWord);
        }
        parser.resultArray.push(prevprevWord && prevprevWord.includes('＼') ? 'ナン' : 'ナ＼ン');
    } else if (word.kanji == '何' && word.pronunciation == 'ナニ' && nextWord && 'ダデ'.includes(nextWord.pronunciation.charAt(0))) {
        foundException = -1;
        if (typeof previousWord !== 'undefined') {
            parser.resultArray.push(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }
        parser.resultArray.push('ナ＼ン');
    }

    if (foundException == 0) {
        if (typeof previousWord !== 'undefined') {
            parser.resultArray.push(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            parser.textArray.unshift(nextWord);
        }
        parser.textArray.unshift(word);
    }

    return foundException;
}
