var list = require(__dirname + '/list');

module.exports = (textArray, resultArray) => {
    var word = textArray.shift();
    var nextWord = textArray.shift();
    var foundException = false;

    for (let exception of list) {
        if (word.kanji == exception.kanji) {
            if (!nextWord || nextWord.lexical == '助詞') {
                // If there is no next word or the next word is a particle
                resultArray.push(exception.pronunciation);
            } else {
                resultArray.push(exception.pronunciation.replace('＼', ''));
            }

            foundException = true;
            break;
        }
    }

    if (nextWord) {
        textArray.unshift(nextWord);
    }

    if (!foundException) {
        textArray.unshift(word);
    }
}
