const moji = require('moji');
const ja2num = require('japanese-numerals-to-number');

function guessBaseNumber(number, isBeforeCounter) {
    if (number == 0) {
        return 'ゼ＼ロ';
    }

    var place = 0;
    var yArr = [];
    var d = (number + '').length;
    while (d > place) {
        var y = '';
        // 1 \ 10,000
        if (place == 0) {
            var x = (number + '')[d - 1 - place];
            if (d > place + 1) {
                x = (number + '')[d - 2 - place] + x;
            }

            x = Number(x);

            if (x < 20) {
                switch (x) {
                    case 1: y = 'イチ＼'; break;
                    case 2: y = 'ニ＼'; break;
                    case 3: y = 'サン'; break;
                    case 4: y = isBeforeCounter ? 'ヨ＼ン' : 'シ＼'; break;
                    case 5: y = 'ゴ＼'; break;
                    case 6: y = 'ロク＼'; break;
                    case 7: y = 'シチ＼'; break;
                    case 8: y = 'ハチ＼'; break;
                    case 9: y = 'キュ＼ー'; break;
                    case 10: y = 'ジュ＼ー'; break;
                    case 11: y = 'ジューイチ＼'; break;
                    case 12: y = 'ジューニ＼'; break;
                    case 13: y = 'ジュ＼ーサン'; break;
                    case 14: y = 'ジュー' + (isBeforeCounter ? 'ヨ＼ン' : 'シ＼'); break;
                    case 15: y = 'ジュ＼ーゴ'; break;
                    case 16: y = 'ジューロク＼'; break;
                    case 17: y = 'ジューシチ＼'; break;
                    case 18: y = 'ジューハチ＼'; break;
                    case 19: y = 'ジュ＼ー' + (isBeforeCounter ? 'キュ＼ー' : 'ク'); break;
                    default:
                        break;
                }

                if (isBeforeCounter) {
                    y = y.replace('＼', '');
                }
            } else {
                var w = x % 10
                var z = x - w;
                switch (z) {
                    case 20: y = w == 0 ? 'ニ＼ジュー' : 'ニ＼ジュー'; break;
                    case 30: y = w == 0 ? 'サ＼ンジュー' : 'サ＼ンジュー' ; break;
                    case 40: y = w == 0 ? 'ヨ＼ンジュー' : 'ヨ＼ンジュー'; break;
                    case 50: y = w == 0 ? 'ゴジュ＼ー' : 'ゴジュー'; break;
                    case 60: y = w == 0 ? 'ロクジュ＼ー' : 'ロクジュー'; break;
                    case 70: y = w == 0 ? 'ナナ＼ジュー' : 'ナナ＼ジュー'; break;
                    case 80: y = w == 0 ? 'ハチジュ＼ー' : 'ハチジュー'; break;
                    case 90: y = w == 0 ? 'キュ＼ージュー' : 'キュ＼ージュー'; break;
                    default:
                        break;
                }

                if (isBeforeCounter && w == 0) {
                    y = y.replace('＼', '');
                }

                var f = '';

                switch (w) {
                    case 1: f = 'イチ＼'; break;
                    case 2: f = 'ニ＼'; break;
                    case 3: f = 'サン'; break;
                    case 4: f = isBeforeCounter ? 'ヨ＼ン' : 'シ＼'; break;
                    case 5: f = 'ゴ＼'; break;
                    case 6: f = 'ロク＼'; break;
                    case 7: f = 'シチ＼'; break;
                    case 8: f = 'ハチ＼'; break;
                    case 9: f = isBeforeCounter ? 'キュ＼ー' : 'ク＼'; break;
                    default:
                        break;
                }

                if (isBeforeCounter) {
                    f = f.replace('＼', '');
                }

                y += f;
            }
            place += 1;
            d -= 1;
        } else if (place % 4 == 0) {
            var w = Number((number + '')[d - place])
            var x = Number((number + '')[d - 1 - place]);
            switch (x) {
                case 1: y = 'ジュ＼ー'; break;
                case 2: y = w == 0 ? 'ニ＼ジュー' : 'ニ＼ジュー'; break;
                case 3: y = w == 0 ? 'サ＼ンジュー' : 'サ＼ンジュー' ; break;
                case 4: y = w == 0 ? 'ヨ＼ンジュー' : 'ヨ＼ンジュー'; break;
                case 5: y = w == 0 ? 'ゴジュ＼ー' : 'ゴジュー'; break;
                case 6: y = w == 0 ? 'ロクジュ＼ー' : 'ロクジュー'; break;
                case 7: y = w == 0 ? 'ナナ＼ジュー' : 'ナナ＼ジュー'; break;
                case 8: y = w == 0 ? 'ハチジュ＼ー' : 'ハチジュー'; break;
                case 9: y = w == 0 ? 'キュ＼ージュー' : 'キュ＼ージュー'; break;
                default:
                    break;
            }
            place += 1;
        } else if (place % 4 == 1) {
            var x = Number((number + '')[d - 1 - place]);
            switch (x) {
                case 1: y = 'ヒャク'; break;
                case 2: y = 'ニヒャク'; break;
                case 3: y = 'サ＼ンビャク'; break;
                case 4: y = 'ヨ＼ンヒャク'; break;
                case 5: y = 'ゴヒャク'; break;
                case 6: y = 'ロッピャク'; break;
                case 7: y = 'ナナ＼ヒャク'; break;
                case 8: y = 'ハッピャク'; break;
                case 9: y = 'キュ＼ーヒャク'; break;
                default:
                    break;
            }
            place += 1;
        } else if (place % 4 == 2) {
            var x = Number((number + '')[d - 1 - place]);
            switch (x) {
                case 1: y = number > 10000 ? 'イッセ＼ン' : 'セ＼ン'; break;
                case 2: y = 'ニセ＼ン'; break;
                case 3: y = 'サンゼ＼ン'; break;
                case 4: y = 'ヨンセ＼ン'; break;
                case 5: y = 'ゴセ＼ン'; break;
                case 6: y = 'ロクセ＼ン'; break;
                case 7: y = 'ナナセ＼ン'; break;
                case 8: y = 'ハッセ＼ン'; break;
                case 9: y = 'キューセ＼ン'; break;
                default:
                    break;
            }
            place += 1;
        } else if (place % 4 == 3) {
            var x = Number((number + '')[d - 1 - place]);
            if (place == 3) {
                switch (x) {
                    case 1: y = 'イチマ＼ン'; break;
                    case 2: y = 'ニマ＼ン'; break;
                    case 3: y = 'サンマ＼ン'; break;
                    case 4: y = 'ヨンマ＼ン'; break;
                    case 5: y = 'ゴマ＼ン'; break;
                    case 6: y = 'ロクマ＼ン'; break;
                    case 7: y = 'ナナマ＼ン'; break;
                    case 8: y = 'ハチマ＼ン'; break;
                    case 9: y = 'キューマ＼ン'; break;
                    default:
                        break;
                }
            } else if (place == 7) {
                switch (x) {
                    case 1: y = 'イチ＼オク'; break;
                    case 2: y = 'ニ＼オク'; break;
                    case 3: y = 'サ＼ンオク'; break;
                    case 4: y = 'ヨ＼ンオク'; break;
                    case 5: y = 'ゴ＼オク'; break;
                    case 6: y = 'ロク＼オク'; break;
                    case 7: y = 'ナナ＼オク'; break;
                    case 8: y = 'ハチ＼オク'; break;
                    case 9: y = 'キュ＼ーオク'; break;
                    default:
                        break;
                }
            }
            place += 1;
        }

        yArr.unshift(y);
    }

    return yArr;
}

module.exports = (parser, utilities) => {
    if (!parser.textArray.length) {
        return 0;
    }

    var foundException = false;


    var word = parser.textArray.shift();
    var nextWord = parser.textArray.shift();
    if (word.lexical == '名詞' && word.compound == '数') {
        if (word.kanji == '何') {
            word.result = 'ナン';
        } else {
            if ('一二三四五六七八九〇'.split('').some(x => word.kanji.includes(x))) {
                word.kanji = ja2num(word.kanji) + '';
            }
            word.result = guessBaseNumber(word.kanji, nextWord && nextWord.lexical == '名詞' && nextWord.compound2 == '助数詞').join('');
        }
        parser.insertResult(word);
        foundException = true;
    }

    if (typeof nextWord !== 'undefined') {
        parser.textArray.unshift(nextWord);
    }

    if (!foundException) {
        parser.textArray.unshift(word);
    }

    return foundException ? 0 : 0;
}
