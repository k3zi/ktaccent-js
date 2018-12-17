var list = require(__dirname + '/list');

/*
Suffix Join Follow

Description:
    Accent of suffix takes over.
Examples:
    LHH + LHL = LHH + HHL = LHHHHL
    LHL + LHL = LHH + HHL = LHHHHL
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var previousWord = parser.removeResult();
    var foundException = false;
    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical && previousWord) {
            if (previousWord.includes('＼')) {
                // Previous word has an accent so the next word shoud
                previousWord.result = previousWord.replace('＼', '');
            }

            parser.insertResult(previousWord);
            word.result = exception.pronunciation;
            parser.insertResult(word);
            foundException = true;
            break;
        }
    }

    if (!foundException) {
        parser.textArray.unshift(word);
        parser.insertResult(previousWord);
    }

    return foundException ? -1 : 0;
}
