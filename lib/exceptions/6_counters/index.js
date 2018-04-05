const list = require(__dirname + '/list');
const moji = require('moji');

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var foundException = false;
    var word = parser.textArray.shift();
    var prevWord = parser.removeResult();
    if (prevWord && prevWord.compound == '数' && word.lexical == '名詞' && word.compound2 == '助数詞') {
        var exception = list.find(s => s.counter.includes(word.kanji));
        if (exception) {
            var numberPronunciation = prevWord.kanji;
            var pronunciations = exception.pronunciations.reverse();
            var replacement = pronunciations.find(x =>
                (prevWord.kanji.endsWith(x.number) || x.number == '*')
                && prevWord.result.endsWith(x.before)
            );
            if (replacement) {
                word.result = prevWord.result;
                word.result = word.result.replace(replacement.before, replacement.after);
                word.result = word.result.replace('｜', '');
                foundException = true;
                parser.insertResult(word);
            } else if (exception.type == 'before_fall') {
                var accent = prevWord.result.length;
                if (['ン', 'ー', 'ッ'].includes(prevWord.result.charAt(accent - 1))) {
                    accent = Math.max(1, accent - 1);
                }

                word.result = prevWord.result + exception.pronunciation;
                if (!word.result.includes('＼')) {
                    word.result = utilities.insertJapanese(word.result, accent, '＼');
                }
                word.result = word.result.replace('｜', '');

                foundException = true;
                parser.insertResult(word);
            } else if (exception.type == 'on_counter') {
                var counterAccent = exception.pronunciation.indexOf('＼');
                var accent = prevWord.result.length + counterAccent;
                if (counterAccent > 0) {
                    if (['ン', 'ー', 'ッ'].includes(prevWord.result.charAt(accent - 1))) {
                        accent = Math.max(1, accent - 1);
                    }
                }

                word.result = prevWord.result + exception.pronunciation;
                if (!word.result.includes('＼') && counterAccent > 0) {
                    word.result = utilities.insertJapanese(word.result, accent, '＼');
                }
                word.result = word.result.replace('｜', '');

                foundException = true;
                parser.insertResult(word);
            }
        }
    }

    if (!foundException) {
        if (prevWord) {
            parser.insertResult(prevWord);
        }
        parser.textArray.unshift(word);
    }

    return foundException ? 0 : 0;
}
