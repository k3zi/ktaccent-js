/*
MeCab groups the verbs with their endings thus we must search
their accemts and adjust the endings manually.

たべ＼る
*/

module.exports = (textArray, resultArray, utilities, callback) => {
    if (!textArray.length) {
        return 0;
    }

    var word = textArray.shift();
    var foundException = false;

    if (word.lexical == '動詞' && word.conjugation == '一段' && word.inflection != '基本形') {
        utilities.parse(word.original, function (originalResult) {
            var result = word.pronunciation;

            var accent = originalResult.indexOf('＼');
            if (accent > 0) {
                // Has accent
                if (word.inflection == '連用形') {
                    accent = Math.max(1, accent - 1);
                    result = utilities.insertJapanese(result, accent, '＼');
                }
            }
            resultArray.push(result);
            utilities.internalParse(textArray, resultArray, callback);
        });
        foundException = true;
    }

    if (!foundException) {
        textArray.unshift(word);
    }

    return foundException ? 1 : 0;
}
