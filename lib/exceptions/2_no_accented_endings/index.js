module.exports = (parser, utilities) => {
    var lastWord = parser.removeResult();
    if (!lastWord) {
        return 0;
    }

    if (lastWord.slice(-1) !== '＼') {
        parser.insertResult(lastWord);
    } else {
        var nextWord = parser.textArray.shift();
        if (!nextWord || nextWord.lexical === '記号') {
            lastWord.result = lastWord.replace('＼', '');
        }

        parser.textArray.unshift(nextWord);
        parser.insertResult(lastWord);
    }

    return 0;
};
