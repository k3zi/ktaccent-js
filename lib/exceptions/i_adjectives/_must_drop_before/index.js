var list = require(__dirname + '/list');
/*
赤い　あかい　あか＼いです
*/

module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var nextWord = textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞'
        && word.original.slice(-1) == 'い'
        && word.kanji.slice(-1) == 'い'
        && nextWord) {
        var exception = list.find(s => nextWord.kanji == s);
        if (exception) {
            var result = word.pronunciation.slice(0, -1) + '＼イ';
            resultArray.push(result);
            foundException = true;
        }
    }

    if (nextWord) {
        textArray.unshift(nextWord);
    }

    if (!foundException) {
        textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
