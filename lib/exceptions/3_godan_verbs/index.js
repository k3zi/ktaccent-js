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
    var nextWord = parser.textArray.shift();
    var foundException = false;

    if (word.lexical == '動詞' && word.conjugation.includes('五段') && word.inflection != '基本形') {
        utilities.parse(word.original, function (originalResult) {
            var result = word.pronunciation;

            var accent = originalResult.indexOf('＼');
            if (accent > 0) {
                // Has accent
                if (word.inflection == '連用形') {
                    result = utilities.insertJapanese(result, accent, '＼');
                } else if (word.inflection == '未然形') {
                    result = utilities.insertJapanese(result, result.length, '＼');
                }
            }

            if (word.inflection == '未然形' && nextWord && nextWord.lexical == '助動詞' && nextWord.conjugation == '特殊・ナイ') {
                result += nextWord.pronunciation;
                var nextNextWord = parser.textArray.shift();
                if (nextNextWord) {
                    if (nextNextWord.lexical == '助動詞' && nextNextWord.conjugation == '特殊・タ') {
                        result += nextNextWord.pronunciation;
                    } else {
                        parser.textArray.unshift(nextNextWord);
                    }
                }
                nextWord = false;
            }

            if (nextWord) {
                parser.textArray.unshift(nextWord);
            }
            
            word.result = result;
            parser.insertResult(word);
            parser.internalParse();
        });
        foundException = true;
    }

    if (!foundException) {
        if (nextWord) {
            parser.textArray.unshift(nextWord);
        }
        parser.textArray.unshift(word);
    }

    return foundException ? 1 : 0;
}
