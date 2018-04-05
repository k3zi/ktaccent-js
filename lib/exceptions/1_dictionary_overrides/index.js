var list = require(__dirname + '/list');

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var foundException = false;

    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical) {
            word.result = exception.pronunciation;
            parser.insertResult(word);

            foundException = true;
            break;
        }
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
