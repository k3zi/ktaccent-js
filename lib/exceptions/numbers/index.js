const moji = require('moji');

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var foundException = false;

    var word = parser.textArray.shift();
    if (word.lexical == '名詞' && word.compound == '数') {
        word.result = word.kanji;
        parser.insertResult(word);
        foundException = true;
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
