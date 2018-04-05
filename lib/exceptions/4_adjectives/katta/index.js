/*
よかっ　　＋　た　＝　よ＼かった
大きかっ　＋　た　＝　オ＼ーキカッタ　ＯＲ　オーキ＼カッタ
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
        && word.pronunciation.slice(-2) == 'カッ'
        && nextWord && nextWord.kanji == 'た') {
            var result = word.pronunciation.slice(0, -2);
            result += result.includes('＼') ? 'カッタ' : '＼カッタ';
            
            var accent = result.indexOf('＼');
            if (utilities.isAfterADoubleVowel(result, accent)) {
                result = utilities.insertJapanese(result.replace('＼', ''), accent - 1, '＼');
            }

            if (word.conjugation == '特殊・ナイ') {
                var prevWord = parser.removeResult();
                if (prevWord) {
                    result = prevWord.result + result;
                }
            }

            word.result = result;
            parser.insertResult(word);
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
