module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var foundException = false;
    var word = parser.textArray.shift();
    var prevWord = parser.removeResult();
    var prevprevWord = parser.removeResult();

    if (prevWord
        && prevWord.compound == '格助詞'
        && prevWord.lexical == '助詞'
        && !prevWord.result.includes('＼')
        && word.lexical == '助詞'
        && word.compound == '係助詞'
    ) {
        prevWord.result = prevWord.result + '＼' + word.pronunciation;
        if (prevprevWord) {
            if (prevprevWord.result.includes('＼')) {
                prevWord.result = prevWord.result.replace('＼', '');
            }

            parser.insertResult(prevprevWord);
        }

        parser.insertResult(prevWord);
        foundException = true;
    }

    if (!foundException) {
        if (prevprevWord) {
            parser.insertResult(prevprevWord);
        }
        if (prevWord) {
            parser.insertResult(prevWord);
        }
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
