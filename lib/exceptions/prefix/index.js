var list = require(__dirname + '/list');

/*
電話　デンワ　お電話　オデ＼ンワ
*/

module.exports = (textArray, resultArray) => {
    if (textArray.length < 2) {
        return 0;
    }

    var word = textArray.shift();
    var nextWord = textArray.shift();
    var foundException = false;

    let exception = word.lexical !== '接頭詞' ? false : list.find(x => x.original == nextWord.kanji && x.suffix == word.kanji);
    if (exception) {
        resultArray.push(exception.pronunciation);

        foundException = true;
    }

    if (!foundException) {
        if (nextWord) {
            textArray.unshift(nextWord);
        }

        textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
