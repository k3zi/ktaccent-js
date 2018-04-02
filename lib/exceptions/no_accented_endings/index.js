module.exports = (textArray, resultArray) => {
    var lastWord = resultArray.pop();
    if (!lastWord) {
        return;
    } else if (lastWord.slice(-1) !== '＼') {
        return resultArray.push(lastWord);
    }

    var nextWord = textArray.shift();
    if (!nextWord || nextWord.lexical === '記号') {
        lastWord = lastWord.replace('＼', '');
    }

    textArray.unshift(nextWord);
    resultArray.push(lastWord);
}
