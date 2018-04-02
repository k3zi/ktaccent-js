var list = require(__dirname + '/list');
/*
MeCab groups the i-adjectives with their endings thus we must search
their accemts and adjust the endings manually.

よ＼い　　＝　よ＼く
おおき＼い　＝　おおき＼く
*/

module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞' && word.original.slice(-1) == 'い') {
        var exception = list.find(s => word.pronunciation.endsWith(s));
        if (exception) {
            utilities.parse(word.original, function (originalResult) {
                var result = word.pronunciation;

                var accent = originalResult.indexOf('＼');
                if (accent > 0) {
                    if (utilities.isAfterADoubleVowel(result, accent)) {
                        result = utilities.insertJapanese(result, accent - 1, '＼');
                    } else {
                        result = utilities.insertJapanese(result, accent, '＼');
                    }
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

    return foundException ? 1 : 0;
}
