/*
MeCab groups the verbs with their endings thus we must search
their accemts and adjust the endings manually.

たべ＼る
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var foundException = false;

    if (word.lexical == '動詞' && word.conjugation == '一段' && word.inflection != '基本形') {
        utilities.parse(word.original, function (originalResult) {
            var result = word.pronunciation;

            var accent = originalResult.indexOf('＼');
            if (accent > 0) {
                // Has accent
                if (word.inflection == '連用形') {
                    if (!utilities.isAtVoiclessVowel(result, accent - 1)) {
                        // ツケ＼ル　⇨　ツケ＼テ
                        accent = Math.max(1, accent - 1);
                    }

                    if (result.charAt(accent - 1) == 'ン') {
                        // ゾンジ＼ル　⇨　ゾ＼ンジテ
                        accent = Math.max(1, accent - 1);
                    }

                    result = utilities.insertJapanese(result, accent, '＼');
                }
            }
            parser.resultArray.push(result);
            parser.internalParse();
        });
        foundException = true;
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? 1 : 0;
}
