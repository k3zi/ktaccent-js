module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var nextWord = textArray.shift();
    var previousWord = resultArray.pop();
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
            mecabArray.reverse().forEach(x => textArray.unshift(x));
            utilities.internalParse(textArray, resultArray, callback);
        });
        foundException = 1;
    } else if (word.original == 'ない' && word.lexical == '助動詞') {
        word.lexical = '形容詞';
        // Leave the value to be unshifted
    } else if (word.kanji == 'ん' && previousWord == 'ナ') {
        foundException = -1;
        if (nextWord) {
            textArray.unshift(nextWord);
        }
        resultArray.push('ナ＼ン');
    } else if (word.kanji == '何' && word.pronunciation == 'ナニ' && nextWord && 'ダデ'.includes(nextWord.pronunciation.charAt(0))) {
        foundException = -1;
        if (typeof previousWord !== 'undefined') {
            resultArray.push(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            textArray.unshift(nextWord);
        }
        resultArray.push('ナ＼ン');
    }

    if (foundException == 0) {
        if (typeof previousWord !== 'undefined') {
            resultArray.push(previousWord);
        }

        if (typeof nextWord !== 'undefined') {
            textArray.unshift(nextWord);
        }
        textArray.unshift(word);
    }

    return foundException;
}
