var list = require(__dirname + '/list');

/* 副詞的に使うと平板になる

Noun Heiban Adverb Examples:
LHH (L) + Particle = LHH (L)
LHH (L) + Non-Particle = LHH (H)
LHL + Particle = LHL (L)
LHL + Non-Particle = LHH (H)

Warning: At the moment 'particle' is too vague. Anything that is used
as an adverb (副詞的に) will become flat.
*/

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    var foundException = false;

    for (let exception of list) {
        if (word.kanji == exception.kanji) {
            if (!nextWord || nextWord.lexical == '助詞') {
                // If there is no next word or the next word is a particle
                word.result = exception.pronunciation;
            } else {
                word.result = exception.pronunciation.replace('＼', '');
            }

            parser.insertResult(word);
            foundException = true;
            break;
        }
    }

    if (nextWord) {
        parser.textArray.unshift(nextWord);
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
