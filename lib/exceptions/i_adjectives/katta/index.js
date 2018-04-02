/*
よかっ　　＋　た　＝　よ＼かった
大きかっ　＋　た　＝　オ＼ーキカッタ　ＯＲ　オーキ＼カッタ
*/

module.exports = (textArray, resultArray, utilities) => {
    if (!textArray.length) {
        return;
    }

    var word = textArray.shift();
    var nextWord = textArray.shift();
    var foundException = false;

    if (word.lexical == '形容詞'
        && word.original.slice(-1) == 'い'
        && word.pronunciation.slice(-2) == 'カッ'
        && nextWord && nextWord.kanji == 'た') {
            var result = word.pronunciation.slice(0, -2) + '＼カッタ';
            var accent = result.indexOf('＼');
            if (utilities.isAfterADoubleVowel(result, accent)) {
                result = utilities.insertJapanese(result.replace('＼', ''), accent - 1, '＼');
            }
            resultArray.push(result);
            foundException = true;
    }

    if (!foundException) {
        if (nextWord) {
            textArray.unshift(nextWord);
        }
        textArray.unshift(word);
    }
}
