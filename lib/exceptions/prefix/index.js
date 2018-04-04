var list = require(__dirname + '/list');

/*
電話　デンワ　お電話　オデ＼ンワ
*/

module.exports = (parser, utilities) => {
    if (parser.textArray.length < 2) {
        return 0;
    }

    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    var foundException = false;

    let exception = word.lexical !== '接頭詞'
        ? false
        : list.find(x => x.original.includes(nextWord.kanji) && x.prefix.includes(word.kanji));
    if (exception) {
        parser.resultArray.push(exception.pronunciation);

        foundException = true;
    }

    if (!foundException) {
        if (nextWord) {
            parser.textArray.unshift(nextWord);
        }

        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
