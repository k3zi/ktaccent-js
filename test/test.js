var fs = require('fs');
var expect = require('chai').expect;
var ktaccent = require('../lib/ktaccent');

function checkSet(tests) {
    for (let [key, value] of Object.entries(tests)) {
        it(`:string = ${key} (${value})`, function (done) {
            this.timeout(30 * 1000);
            ktaccent.parse(key, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });
    }
}

describe('exports', function () {
    describe('#parse(:string)', function () {
        describe('when dealing with だ', function () {
            describe('〜です', function () {
                var basicAccentTests = {
                    '箸です': 'ハ＼シ　デス',
                    '橋です': 'ハシ＼　デス',
                    // skip: '本です': 'ホ＼ン　デス',
                    '本当です': 'ホントー　デ＼ス',
                    'お小遣いです': 'オコ＼ズカイ　デス',
                };

                checkSet(basicAccentTests);
            });

            describe('〜だ', function () {
                var basicAccentTests = {
                    '箸だ': 'ハ＼シ　ダ',
                    '橋だ': 'ハシ＼　ダ',
                    // skip: '本だ': 'ホ＼ン　ダ',
                    '本当だ': 'ホントー　ダ',
                    'お小遣いだ': 'オコ＼ズカイ　ダ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃありません', function () {
                var basicAccentTests = {
                    '箸じゃありません': 'ハ＼シ　ジャ　アリマセ＼ン',
                    '橋じゃありません': 'ハシ＼　ジャ　アリマセ＼ン',
                    // skip: '本じゃありません': 'ホ＼ン　ジャ　アリマセ＼ン',
                    '本当じゃありません': 'ホントー　ジャ　アリマセ＼ン',
                    'お小遣いじゃありません': 'オコ＼ズカイ　ジャ　アリマセ＼ン',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃない', function () {
                var basicAccentTests = {
                    '箸じゃない': 'ハ＼シ　ジャ　ナ＼イ',
                    '橋じゃない': 'ハシ＼　ジャ　ナ＼イ',
                    // skip: '本じゃない': 'ホ＼ン　ジャ　ナ＼イ',
                    '本当じゃない': 'ホントー　ジャ　ナ＼イ',
                    'お小遣いじゃない': 'オコ＼ズカイ　ジャ　ナ＼イ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃなかった', function () {
                var basicAccentTests = {
                    '箸じゃなかった': 'ハ＼シ　ジャ　ナ＼カッタ',
                    '橋じゃなかった': 'ハシ＼　ジャ　ナ＼カッタ',
                    // skip: '本じゃなかった': 'ホ＼ン　　ジャ　ナ＼カッタ',
                    '本当じゃなかった': 'ホントー　ジャ　ナ＼カッタ',
                    'お小遣いじゃなかった': 'オコ＼ズカイ　ジャ　ナ＼カッタ',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('when dealing with 〜ます', function () {
            describe('〜ます', function () {
                var basicAccentTests = {
                    'わかります': 'ワカリマ＼ス',
                    'します': 'シマ＼ス',
                    '違います': 'チガイマ＼ス',
                    '来ます': 'キマ＼ス',
                };

                checkSet(basicAccentTests);
            });

            describe('〜ました', function () {
                var basicAccentTests = {
                    'わかりました': 'ワカリマ＼シタ',
                    '作りました': 'ツクリマ＼シタ',
                    'できました': 'デキマ＼シタ',
                    '行きました': 'イキマ＼シタ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜ません', function () {
                var basicAccentTests = {
                    'わかりません': 'ワカリマセ＼ン',
                    'しません': 'シマセ＼ン',
                    '違いません': 'チガイマセ＼ン',
                    '来ません': 'キマセ＼ン',
                };

                checkSet(basicAccentTests);
            });

            describe('〜ませんでした', function () {
                var basicAccentTests = {
                    'わかりませんでした': 'ワカリマセ＼ン　デシタ',
                    '作りませんでした': 'ツクリマセ＼ン　デシタ',
                    'できませんでした': 'デキマセ＼ン　デシタ',
                    '行きませんでした': 'イキマセ＼ン　デシタ',
                };

                checkSet(basicAccentTests);
            });
        });


        describe('when dealing with い-adjectives', function () {
            describe('〜い', function () {
                var basicAccentTests = {
                    'いい': 'イ＼イ', // MeCab is returning イイ for pronunciation
                    '高い': 'タカ＼イ',
                    '大きい': 'オーキ＼イ',
                    '甘い': 'アマイ',
                    '赤い': 'アカイ',
                    '青い': 'アオ＼イ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜かった', function () {
                var basicAccentTests = {
                    'よかった': 'ヨ＼カッタ',
                    '高かった': 'タカ＼カッタ',
                    '大きかった': 'オーキ＼カッタ',
                    '厚かった': 'アツ＼カッタ',
                    '青かった': 'ア＼オカッタ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜く', function () {
                var basicAccentTests = {
                    'よく': 'ヨ＼ク',
                    '高く': 'タカ＼ク',
                    '大きく': 'オーキ＼ク',
                    '厚く': 'アツク',
                    '赤く': 'アカク',
                    '青く': 'ア＼オク',
                };

                checkSet(basicAccentTests);
            });

            describe('〜くない', function () {
                var basicAccentTests = {
                    'よくない': 'ヨ＼ク　ナ＼イ',
                    '高くない': 'タカ＼ク　ナ＼イ',
                    '大きくない': 'オーキ＼ク　ナ＼イ',
                    '厚くない': 'アツク　ナ＼イ',
                    '赤くない': 'アカク　ナ＼イ',
                    '青くない': 'ア＼オク　ナ＼イ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜くありません', function () {
                var basicAccentTests = {
                    'よくありません': 'ヨ＼ク　アリマセ＼ン',
                    '高くありません': 'タカ＼ク　アリマセ＼ン',
                    '大きくありません': 'オーキ＼ク　アリマセ＼ン',
                    '厚くありません': 'アツク　アリマセ＼ン',
                    '赤くありません': 'アカク　アリマセ＼ン',
                    '青くありません': 'ア＼オク　アリマセ＼ン',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('when dealing with ichidan verbs', function () {
            describe('〜る', function () {
                var basicAccentTests = {
                    '食べる': 'タベ＼ル',
                    '付ける': 'ツケ＼ル',
                    '閉める': 'シメ＼ル',
                    '上げる': 'アゲル',
                    '見る': 'ミ＼ル',
                    '数える': 'カゾエ＼ル',
                    '存じる': 'ゾンジ＼ル',
                };

                checkSet(basicAccentTests);
            });

            describe('〜ない', function () {
                var basicAccentTests = {
                    '食べない': 'タベ＼ナイ',
                    '付けない': 'ツケ＼ナイ',
                    '閉めない': 'シメ＼ナイ',
                    '上げない': 'アゲナイ',
                    '見ない': 'ミ＼ナイ',
                    '数えない': 'カゾエ＼ナイ',
                    '存じない': 'ゾンジ＼ナイ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜なく', function () {
                var basicAccentTests = {
                    '食べなく': 'タベ＼ナク',
                    '付けなく': 'ツケ＼ナク',
                    '閉めなく': 'シメ＼ナク',
                    '上げなく': 'アゲナク',
                    '見なく': 'ミ＼ナク',
                    '数えなく': 'カゾエ＼ナク',
                    '存じなく': 'ゾンジ＼ナク',
                };

                checkSet(basicAccentTests);
            });

            describe('〜なかった', function () {
                var basicAccentTests = {
                    '食べなかった': 'タベ＼ナカッタ',
                    '付けなかった': 'ツケ＼ナカッタ',
                    '閉めなかった': 'シメ＼ナカッタ',
                    '上げなかった': 'アゲナ＼カッタ',
                    '見なかった': 'ミ＼ナカッタ',
                    '数えなかった': 'カゾエ＼ナカッタ',
                    '存じなかった': 'ゾンジ＼ナカッタ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜て', function () {
                var basicAccentTests = {
                    '食べて': 'タ＼ベテ',
                    '付けて': 'ツケ＼テ',
                    '閉めて': 'シ＼メテ',
                    '上げて': 'アゲテ',
                    '見て': 'ミ＼テ',
                    '数えて': 'カゾ＼エテ',
                    '存じて': 'ゾ＼ンジテ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜たら', function () {
                var basicAccentTests = {
                    '食べたら': 'タ＼ベタラ',
                    '付けたら': 'ツケ＼タラ',
                    '閉めたら': 'シ＼メタラ',
                    '上げたら': 'アゲタ＼ラ',
                    '見たら': 'ミ＼タラ',
                    '数えたら': 'カゾ＼エタラ',
                    '存じたら': 'ゾ＼ンジタラ',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('when dealing with numbers', function () {
            describe('1-10 numbers', function () {
                var basicAccentTests = {
                    '１': 'イチ＼',
                    '２': 'ニ＼',
                    '５': 'ゴ＼',
                    '１０': 'ジュ＼ー',
                };

                checkSet(basicAccentTests);
            });

            describe('11- numbers', function () {
                var basicAccentTests = {
                    '１５': 'ジュ＼ーゴ',
                    '１３': 'ジュ＼ーサン',
                    '６０': 'ロクジュ＼ー',
                    '５４５': 'ゴヒャクヨ＼ンジューゴ＼',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜円', function () {
                var basicAccentTests = {
                    '１円': 'イチエン',
                    '２円': 'ニエン',
                    '５円': 'ゴ＼エン',
                    '１０円': 'ジューエン',
                    '５０円': 'ゴジュ＼ーエン',
                    '１００円': 'ヒャクエン',
                    '１０００円': 'センエン',
                    '１００００円': 'イチマンエン',
                    '何円': 'ナ＼ンエン',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜名', function () {
                var basicAccentTests = {
                    '１名': 'イチ＼メー',
                    '２名': 'ニ＼メー',
                    '４名': 'ヨ＼ンメー',
                    '１４名': 'ジューヨ＼ンメー',
                    '５０名': 'ゴジュ＼ーメー',
                    '１００名': 'ヒャク＼メー',
                    '１０００名': 'セ＼ンメー',
                    '１００００名': 'イチマ＼ンメー',
                    '何名': 'ナ＼ンメー',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜人', function () {
                var basicAccentTests = {
                    '一人': 'ヒト＼リ',
                    '１人': 'ヒト＼リ',
                    '二人': 'フタリ＼',
                    '２人': 'フタリ＼',
                    '三人': 'サンニ＼ン',
                    '３人': 'サンニ＼ン',
                    '何人': 'ナ＼ンニン',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜歳', function () {
                var basicAccentTests = {
                    '１歳': 'イ＼ッサイ',
                    '２歳': 'ニ＼サイ',
                    '４歳': 'ヨ＼ンサイ',
                    '１８歳': 'ジューハ＼ッサイ',
                    '２０歳': 'ハ＼タチ',
                    '３０歳': 'サンジュ＼ッサイ',
                    '何歳': 'ナ＼ンサイ',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜週', function () {
                var basicAccentTests = {
                    '１週': 'イッシュー',
                    '２週': 'ニシュー',
                    '４週': 'ヨンシュー',
                    '１８週': 'ジューハッシュー',
                    '２０週': 'ニジュッシュー',
                    '３０週': 'サンジュッシュー',
                    '何週': 'ナンシュー',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜週間', function () {
                var basicAccentTests = {
                    '１週間': 'イッシュ＼ーカン',
                    '２週間': 'ニシュ＼ーカン',
                    '４週間': 'ヨンシュ＼ーカン',
                    '１８週間': 'ジューハッシュ＼ーカン',
                    '２０週間': 'ニジュッシュ＼ーカン',
                    '３０週間': 'サンジュッシュ＼ーカン',
                    '何週間': 'ナンシュ＼ーカン',
                };

                checkSet(basicAccentTests);
            });

            describe('Counter: 〜日', function () {
                var basicAccentTests = {
                    '１日': 'イチニチ＼',
                    '２日': 'フツカ',
                    '４日': 'ヨッカ',
                    '１８日': 'ジューハチニチ＼',
                    '２０日': 'ハツカ',
                    '２４日': 'ニ＼ジューヨッカ',
                    '何日': 'ナ＼ンニチ',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('when dealing with the extended predicate', function () {
            describe('〜んだ', function () {
                var basicAccentTests = {
                    'いいんだ': 'イ＼イ　ン　ダ', // MeCab is returning イイ for pronunciation
                    '赤いんだ': 'アカ＼イ　ン　ダ',
                    '青いんだ': 'アオ＼イ　ン　ダ',
                    '食べるんだ': 'タベ＼ル　ン　ダ',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('with random sentences', function () {
            var basicAccentTests = {
                'わかりますか': 'ワカリマ＼ス　カ',
                'ええ、わかります': 'エ＼ー、ワカリマ＼ス',

                '今日しますね': 'キョ＼ー　シマ＼ス　ネ',
                'いや、違います。明日しますよ': 'イヤ、チガイマ＼ス。アシタ　シマ＼ス　ヨ',

                '作りましたね': 'ツクリマ＼シタ　ネ',
                'はい。昨日作りました': 'ハ＼イ。キノー　ツクリマ＼シタ',

                '明日来ませんか': 'アシタ　キマセ＼ン　カ',
                'ちょっと。。。': 'チョ＼ット。。。',

                '行きましたね': 'イキマ＼シタ　ネ',
                'いいえ、行きませんでした': 'イーエ、イキマセ＼ン　デシタ',

                'すみません。わかりませんでした': 'スミマセ＼ン。ワカリマセ＼ン　デシタ',
                'わかりませんでしたか': 'ワカリマセ＼ン　デシタ　カ',
                'ええ。どうもすみません': 'エ＼ー。ド＼ーモ　スミマセ＼ン',

                'いいですか': 'イ＼イ　デス　カ',
                'いいですよ': 'イ＼イ　デス　ヨ',

                'いいですか': 'イ＼イ　デス　カ',
                '赤いですよ': 'アカ＼イ　デス　ヨ',

                'とても面白いですよ。しませんか': 'トテモ　オモシロ＼イ　デス　ヨ。シマセ＼ン　カ',
                // actually sounds like: アリ＼ガトウゴザイマス
                'ありがとうございます': 'アリ＼ガトー　ゴザイマ＼ス',

                '買いましたか': 'カイマ＼シタ　カ',
                'ええ。高かったですよ': 'エ＼ー。タカ＼カッタ　デス　ヨ',

                'あまり面白くなかったですねえ': 'アマリ　オモシロ＼ク　ナ＼カッタ　デス　ネ＼ー',
                'ええ、つまらなかったですねえ': 'エ＼ー、ツマラ＼ナカッタ　デス　ネ＼ー',

                'よくできました': 'ヨ＼ク　デキマ＼シタ',
                'いえいえ、どういたしまして': 'イエ＼イエ、ド＼ー　イタシマシテ',

                'なんですか': 'ナ＼ン　デス　カ',
                '手紙です': 'テガミ　デ＼ス',

                '鈴木さん': 'スズキサン',
                '何ですか': 'ナ＼ン　デス　カ',
                'お電話です': 'オデ＼ンワ　デス',
                'あ、どうも': 'ア、ド＼ーモ',

                'だめでしたねえ': 'ダメ＼　デシタ　ネ＼ー',

                '日本語じゃありませんよ': 'ニホンゴ　ジャ　アリマセ＼ン　ヨ',

                'あ、そうですか': 'ア、ソ＼ー　デス　カ',

                'はい、鈴木です。どうぞ': 'ハ＼イ、スズキ　デ＼ス。ド＼ーゾ',
            };

            checkSet(basicAccentTests);
        });

        describe('with advanced sentences', function () {
            var basicAccentTests = {
                '箸を洗っていると、電話が鳴った。「明日になったら、学校の近くの橋に来てください」と言われた。': 'ハ＼シ　ヲ　アラッテ　イル＼ト、デンワ　ガ　ナッタ。「アシタ＼　ニ　ナ＼ッタラ、ガッコー　ノ　チカ＼ク　ノ　ハシ＼　ニ　キ＼テ　クダサ＼イ」ト　イワレタ。',
                'ある日の暮方のことである。一人の下人が、羅生門の下で雨止みを待っていた。': 'ア＼ル　ヒ　ノ　クレガタ　ノ　コト＼　デ　ア＼ル。ヒト＼リ　ノ　ゲニン　ガ、ラショ＼ーモン　ノ　シタ＼　デ　アマヤミ　ヲ　マ＼ッテ　イタ。',
                '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです': 'ハジ　ノ　オ＼ーイ　ショ＼ーガイ　ヲ　オクッテ　キマ＼シタ。ジブン　ニ＼ワ、ニンゲン　ノ　セイカツ　トユウ　モノ＼　ガ、ケント＼ー　ツカ＼ナイ　ノ　デス',
            };

            checkSet(basicAccentTests);
        });
    });
});
