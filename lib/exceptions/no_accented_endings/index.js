module.exports = (parser, utilities) => {
    var lastWord = parser.resultArray.pop();
    if (!lastWord) {
        return 0;
    }

    if (lastWord.slice(-1) !== '＼') {
        parser.resultArray.push(lastWord);
    } else {
        var nextWord = parser.textArray.shift();
        if (!nextWord || nextWord.lexical === '記号') {
            lastWord = lastWord.replace('＼', '');
        }

        parser.textArray.unshift(nextWord);
        parser.resultArray.push(lastWord);
    }

    return 0;
}
