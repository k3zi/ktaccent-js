var list = require(__dirname + '/list');

module.exports = (textArray, resultArray) => {
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
}
