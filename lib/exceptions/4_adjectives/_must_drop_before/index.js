var list = require(__dirname + '/list');
/*
赤い　あかい　あか＼いです
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞'
        && word.original.slice(-1) == 'い'
        && word.kanji.slice(-1) == 'い'
        && nextWord) {
        var exception = list.find(s => nextWord.kanji == s);
        if (exception) {
            var result = word.pronunciation.replace('＼', '').slice(0, -1) + '＼イ';
            word.result = result;
            parser.insertResult(word);
            foundException = true;
        }
    }

    /*
    if (word.lexical == '形容詞'
        && word.original.slice(-1) == 'い'
        && word.kanji.slice(-1) == 'い'
        && nextWord) {
        var exception = list.find(s => nextWord.kanji == s);
        if (exception) {
            var result = word.pronunciation.slice(0, -1) + '＼イ';
            parser.insertResult(result);
            foundException = true;
        }
    }*/

    if (nextWord) {
        parser.textArray.unshift(nextWord);
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
