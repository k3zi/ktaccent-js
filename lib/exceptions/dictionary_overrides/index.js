var list = require(__dirname + '/list');

module.exports = (textArray, resultArray) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var foundException = false;

    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical) {
            resultArray.push(exception.pronunciation);

            foundException = true;
            break;
        }
    }

    if (!foundException) {
        textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
