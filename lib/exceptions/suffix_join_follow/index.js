var list = require(__dirname + '/list');

/*
Suffix Join Follow Examples:
LHH + LHL = LHH + HHL = LHHHHL
LHL + LHL = LHH + HHL = LHHHHL
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var previousWord = parser.resultArray.pop();
    var foundException = false;
    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical && previousWord) {
            if (previousWord.includes('＼')) {
                // Previous word has an accent so the next word shoud
                parser.resultArray.push(previousWord.replace('＼', ''));
            } else {
                parser.resultArray.push(previousWord);
            }

            parser.resultArray.push(exception.pronunciation);
            foundException = true;
            break;
        }
    }

    if (!foundException) {
        parser.textArray.unshift(word);
        parser.resultArray.push(previousWord);
    }

    return foundException ? -1 : 0;
}
