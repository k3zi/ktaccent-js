module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var next
    var foundException = false;

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
        foundException = true;
    } else if (word.original == 'ない' && word.lexical == '助動詞') {
        word.lexical = '形容詞';
        // Leave the value to be unshifted
    }

    if (!foundException) {
        textArray.unshift(word);
    }

    return foundException ? 1 : 0;
}
