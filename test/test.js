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
                    '箸です': 'ハ＼シデス',
                    '橋です': 'ハシ＼デス',
                    // skip: '本です': 'ホ＼ンデス',
                    '本当です': 'ホントーデ＼ス',
                    'お小遣いです': 'オコ＼ズカイデス',
                };

                checkSet(basicAccentTests);
            });

            describe('〜だ', function () {
                var basicAccentTests = {
                    '箸だ': 'ハ＼シダ',
                    '橋だ': 'ハシ＼ダ',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当だ': 'ホントーダ',
                    'お小遣いだ': 'オコ＼ズカイダ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃありません', function () {
                var basicAccentTests = {
                    '箸じゃありません': 'ハ＼シジャアリマセ＼ン',
                    '橋じゃありません': 'ハシ＼ジャアリマセ＼ン',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当じゃありません': 'ホントージャアリマセ＼ン',
                    'お小遣いじゃありません': 'オコ＼ズカイジャアリマセ＼ン',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃない', function () {
                var basicAccentTests = {
                    '箸じゃない': 'ハ＼シジャナ＼イ',
                    '橋じゃない': 'ハシ＼ジャナ＼イ',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当じゃない': 'ホントージャナ＼イ',
                    'お小遣いじゃない': 'オコ＼ズカイジャナ＼イ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜じゃなかった', function () {
                var basicAccentTests = {
                    '箸じゃなかった': 'ハ＼シジャナ＼カッタ',
                    '橋じゃなかった': 'ハシ＼ジャナ＼カッタ',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当じゃなかった': 'ホントージャナ＼カッタ',
                    'お小遣いじゃなかった': 'オコ＼ズカイジャナ＼カッタ',
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
                    'わかりませんでした': 'ワカリマセ＼ンデシタ',
                    '作りませんでした': 'ツクリマセ＼ンデシタ',
                    'できませんでした': 'デキマセ＼ンデシタ',
                    '行きませんでした': 'イキマセ＼ンデシタ',
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
                    'よくない': 'ヨ＼クナ＼イ',
                    '高くない': 'タカ＼クナ＼イ',
                    '大きくない': 'オーキ＼クナ＼イ',
                    '厚くない': 'アツクナ＼イ',
                    '赤くない': 'アカクナ＼イ',
                    '青くない': 'ア＼オクナ＼イ',
                };

                checkSet(basicAccentTests);
            });

            describe('〜くありません', function () {
                var basicAccentTests = {
                    'よくありません': 'ヨ＼クアリマセ＼ン',
                    '高くありません': 'タカ＼クアリマセ＼ン',
                    '大きくありません': 'オーキ＼クアリマセ＼ン',
                    '厚くありません': 'アツクアリマセ＼ン',
                    '赤くありません': 'アカクアリマセ＼ン',
                    '青くありません': 'ア＼オクアリマセ＼ン',
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
        });

        describe('when dealing with the extended predicate', function () {
            describe('〜んだ', function () {
                var basicAccentTests = {
                    'いいんだ': 'イ＼インダ', // MeCab is returning イイ for pronunciation
                    '赤いんだ': 'アカ＼インダ',
                    '青いんだ': 'アオ＼インダ',
                    '食べるんだ': 'タベ＼ルンダ',
                };

                checkSet(basicAccentTests);
            });
        });

        describe('with random sentences', function () {
            var basicAccentTests = {
                'わかりますか': 'ワカリマ＼スカ',
                'ええ、わかります': 'エ＼ー、ワカリマ＼ス',

                '今日しますね': 'キョ＼ーシマ＼スネ',
                'いや、違います。明日しますよ': 'イヤ、チガイマ＼ス。アシタシマ＼スヨ',

                '作りましたね': 'ツクリマ＼シタネ',
                'はい。昨日作りました': 'ハ＼イ。キノーツクリマ＼シタ',

                '明日来ませんか': 'アシタキマセ＼ンカ',
                'ちょっと。。。': 'チョ＼ット。。。',

                '行きましたね': 'イキマ＼シタネ',
                'いいえ、行きませんでした': 'イーエ、イキマセ＼ンデシタ',

                'すみません。わかりませんでした': 'スミマセ＼ン。ワカリマセ＼ンデシタ',
                'わかりませんでしたか': 'ワカリマセ＼ンデシタカ',
                'ええ。どうもすみません': 'エ＼ー。ド＼ーモスミマセ＼ン',

                'いいですか': 'イ＼イデスカ',
                'いいですよ': 'イ＼イデスヨ',

                'いいですか': 'イ＼イデスカ',
                '赤いですよ': 'アカ＼イデスヨ',

                'とても面白いですよ。しませんか': 'トテモオモシロ＼イデスヨ。シマセ＼ンカ',
                // actually sounds like: アリ＼ガトウゴザイマス
                'ありがとうございます': 'アリ＼ガトーゴザイマ＼ス',

                '買いましたか': 'カイマ＼シタカ',
                'ええ。高かったですよ': 'エ＼ー。タカ＼カッタデスヨ',

                'あまり面白くなかったですねえ': 'アマリオモシロ＼クナ＼カッタデスネ＼ー',
                'ええ、つまらなかったですねえ': 'エ＼ー、ツマラ＼ナカッタデスネ＼ー',

                'よくできました': 'ヨ＼クデキマ＼シタ',
                'いえいえ、どういたしまして': 'イエ＼イエ、ド＼ーイタシマシテ',

                'なんですか': 'ナ＼ンデスカ',
                '手紙です': 'テガミデ＼ス',

                '鈴木さん': 'スズキサン',
                '何ですか': 'ナ＼ンデスカ',
                'お電話です': 'オデ＼ンワデス',
                'あ、どうも': 'ア、ド＼ーモ',

                'だめでしたねえ': 'ダメ＼デシタネ＼ー',

                '日本語じゃありませんよ': 'ニホンゴジャアリマセ＼ンヨ',

                'あ、そうですか': 'ア、ソ＼ーデスカ',

                'はい、鈴木です。どうぞ': 'ハ＼イ、スズキデ＼ス。ド＼ーゾ',
            };

            checkSet(basicAccentTests);
        });
    });
});
