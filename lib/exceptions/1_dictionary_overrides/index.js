const parse = require('csv-parse/lib/sync');
const list = require(__dirname + '/list');
const fs = require('fs');
const nameList = parse(fs.readFileSync(__dirname + '/names_places.csv'), { columns: true });
module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var word = parser.textArray.shift();
    var foundException = false;

    var exception = list.find(x => word.kanji == x.kanji && word.lexical == x.lexical);
    exception = exception || nameList.find(x => word.kanji == x.kanji && word.lexical == x.lexical);
    if (exception) {
        word.result = exception.pronunciation;
        word.addNote('Dictionary Overide', `${exception.kanji}（${exception.lexical}） ⇨ ${exception.pronunciation}`);
        parser.insertResult(word);

        foundException = true;
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? -1 : 0;
}
