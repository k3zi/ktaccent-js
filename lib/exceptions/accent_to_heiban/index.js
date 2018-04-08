var list = require(__dirname + '/list');

/*
Connection to Accent Follow Examples:
の・い・な・る + LHH (H) = LHH (L)
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var previousWord = parser.removeResult();
    var foundException = false;

    var exception = !previousWord ? false : list.find(x => word.kanji == x.kanji　&& word.lexical == x.lexical);
    if (exception) {
        if (['形容詞', '助動詞', '動詞', '連体詞'].includes(previousWord.lexical) || ['連体化'].includes(previousWord.compound)) {
            word.result = exception.pronunciation;
        } else {
            word.result = exception.pronunciation.replace('＼', '');
        }

        parser.insertResult(previousWord);
        parser.insertResult(word);

        foundException = true;
    }

    if (!foundException) {
        parser.textArray.unshift(word);

        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }
    }

    return foundException ? 0 : 0;
}
