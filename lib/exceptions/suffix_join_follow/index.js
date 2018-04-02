var list = require(__dirname + '/list');

/* Suffix Join Follow Examples:
LHH + LHL = LHH + HHHL = LHHHHHL
LHL + LHL = LHH + HHHL = LHHHHHL
*/

module.exports = (textArray, resultArray) => {
    var word = textArray.shift();
    var previousWord = resultArray.pop();
    var foundException = false;
    for (let exception of list) {
        if (word.kanji == exception.kanji && word.lexical == exception.lexical && previousWord) {
            if (previousWord.includes('＼')) {
                // Previous word has an accent so the next word shoud
                resultArray.push(previousWord.replace('＼', ''));
            } else {
                resultArray.push(previousWord);
            }

            resultArray.push(exception.pronunciation);
            foundException = true;
            break;
        }
    }

    if (!foundException) {
        textArray.unshift(word);
        resultArray.push(previousWord);
    }
}
