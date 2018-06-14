var list = require(__dirname + '/list');

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var previousWord = parser.removeResult();
    var foundException = false;

    var exception = !previousWord ? false : list.find(x => word.kanji == x.kanji　&& word.lexical == x.lexical);
    if (exception && previousWord.lexical == '助詞' && previousWord.compound == '接続助詞' && ['で', 'て'].includes(previousWord.original)) {
        if (previousWord.pronunciation.includes('＼')) {
            word.result = exception.pronunciation.replace('＼', '');
        } else {
            word.result = exception.pronunciation;
        }

        word.shouldSpace = false;

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
