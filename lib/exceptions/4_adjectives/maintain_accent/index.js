var list = require(__dirname + '/list');
/*
MeCab groups the i-adjectives with their endings thus we must search
their accemts and adjust the endings manually.

よ＼い　　＝　よ＼く
おおき＼い　＝　おおき＼く
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞' && word.original.slice(-1) == 'い') {
        var exception = list.find(s => word.pronunciation.endsWith(s));
        if (exception) {
            var result = word.result;

            if (result) {
                parser.insertResult(word);
                parser.internalParse();
            } else {
                utilities.parse(word.original, function (originalResult) {
                    result = word.pronunciation;
                    var accent = originalResult.indexOf('＼');
                    if (accent > 0) {
                        if (utilities.isAfterADoubleVowel(result, accent)) {
                            result = utilities.insertJapanese(result, accent - 1, '＼');
                        } else {
                            result = utilities.insertJapanese(result, accent, '＼');
                        }
                    }

                    word.result = result;
                    parser.insertResult(word);
                    parser.internalParse();
                });
            }
            foundException = true;
        }
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? 1 : 0;
}
