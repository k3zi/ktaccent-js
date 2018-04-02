var list = require(__dirname + '/list');
/*
MeCab groups the i-adjectives with their endings thus we must search
their accemts and adjust the endings manually.

よ＼い　　＝　よ＼く
おおき＼い　＝　おおき＼く
*/

module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return;
    }

    var word = textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞' && word.original.slice(-1) == 'い') {
        var exception = list.find(s => word.pronunciation.endsWith(s));
        if (exception) {
            utilities.fetchPronunciation(word.original, '', function (fetchedWord, accent) {
                var result = word.pronunciation;
                if (!word) {
                    result = `~~${result}~~`;
                }

                if (accent > 0) {
                    result = utilities.insertJapanese(result, accent, "＼");
                }

                if (utilities.isAfterADoubleVowel(result, accent)) {
                    result = utilities.insertJapanese(result.replace('＼', ''), accent - 1, '＼');
                }

                resultArray.push(result);
                utilities.internalParse(textArray, resultArray, callback);
            });
            foundException = true;
        }
    }

    if (!foundException) {
        textArray.unshift(word);
    }

    return foundException;
}
