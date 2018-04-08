var list = require(__dirname + '/list');

/*
Accent to Heiban Follow Examples:
LHH (L) + の = LHH (H) の
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var previousWord = parser.removeResult();
    var foundException = false;

    if (typeof previousWord !== 'undefined' && ['格助詞', '連体化'].includes(word.compound) && word.kanji == 'の') {
        var exception = !previousWord ? false : list.find(x => previousWord.kanji == x.kanji && previousWord.lexical == x.lexical);
        if (exception) {
            previousWord.result = exception.pronunciation || previousWord.result.replace('＼', '');

            parser.insertResult(previousWord);
            parser.insertResult(word);

            foundException = true;
        } else if (previousWord.compound == '数') {
            // no exception
        } else if (utilities.hasVoiclessVowel(previousWord.pronunciation)) {
            // no exception
        } else if (
            (
                previousWord.result.length > 1
                && '＼' == previousWord.result.slice(-2, -1)
                && 'アイウエオーン'.includes(previousWord.result.slice(-1))
            ) || '＼' == previousWord.result.slice(-1)
        ) {
            previousWord.result = previousWord.result.replace('＼', '');
            word.result = 'ノ';
            parser.insertResult(previousWord);
            parser.insertResult(word);
            
            foundException = true;
        }
    }

    if (!foundException) {
        parser.textArray.unshift(word);

        if (typeof previousWord !== 'undefined') {
            parser.insertResult(previousWord);
        }
    }

    return foundException ? -1 : 0;
}
