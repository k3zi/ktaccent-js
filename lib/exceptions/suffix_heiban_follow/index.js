var list = require(__dirname + '/list');

/*
Suffix Heiban Follow Examples:
LHH (H) + HHL = LHH + HHL = LHHHHL <- Special Case
LHH (L) + HHL = LHH + LLL = LHHLLL
LHL + HHL = LHL + LLL = LHLLLL
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
                // Previous word has an accent so the next word shoudn't
                word.result = exception.pronunciation.replace('＼', '');
            } else {
                word.result = exception.pronunciation;
            }

            parser.insertResult(previousWord);
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
