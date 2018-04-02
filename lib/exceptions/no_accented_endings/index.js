module.exports = (textArray, resultArray) => {
    var lastWord = resultArray.pop();
    if (!lastWord) {
        return 0;
    }

    if (lastWord.slice(-1) !== '＼') {
        resultArray.push(lastWord);
    } else {
        var nextWord = textArray.shift();
        if (!nextWord || nextWord.lexical === '記号') {
            lastWord = lastWord.replace('＼', '');
        }

        textArray.unshift(nextWord);
        resultArray.push(lastWord);
    }

    return 0;
}
