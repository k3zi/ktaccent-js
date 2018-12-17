var list = require(__dirname + '/list');

/*
Suffix Heiban Follow

Description:
    Accented following a heiban value.
Examples:
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
    var exception = !previousWord ? false : list.find(x =>
        word.kanji == x.kanji
        && word.lexical == x.lexical
        && (!x.compound || x.compound.includes(word.compound))
        && (!x.prev_lexical || x.prev_lexical.includes(previousWord.lexical)));
    if (exception) {
        if (previousWord.includes('＼') || previousWord.sharesPreviousAccent) {
            // Previous word has an accent so the next word shoudn't
            word.result = exception.pronunciation.replace('＼', '');
        } else {
            word.result = exception.pronunciation;
        }

        parser.insertResult(previousWord);
        parser.insertResult(word);

        foundException = true;
    }

    if (!foundException) {
        parser.textArray.unshift(word);
        parser.insertResult(previousWord);
    }

    return foundException ? -1 : 0;
}
