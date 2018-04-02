var list = require(__dirname + '/list');

/*
Suffix Heiban Follow Examples:
LHH (H) + HHL = LHH + HHL = LHHHHL <- Special Case
LHH (L) + HHL = LHH + LLL = LHHLLL
LHL + HHL = LHL + LLL = LHLLLL
*/

module.exports = (textArray, resultArray) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var previousWord = resultArray.pop();
    var foundException = false;
    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical && previousWord) {
            if (previousWord.includes('＼')) {
                // Previous word has an accent so the next word shoudn't
                resultArray.push(previousWord);
                resultArray.push(exception.pronunciation.replace('＼', ''));
            } else {
                resultArray.push(previousWord);
                resultArray.push(exception.pronunciation);
            }

            foundException = true;
            break;
        }
    }

    if (!foundException) {
        textArray.unshift(word);
        resultArray.push(previousWord);
    }

    return foundException ? -1 : 0;
}
