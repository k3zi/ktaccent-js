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
            describe('です', function () {
                var basicAccentTests = {
                    '箸です': 'ハ＼シデス',
                    '橋です': 'ハシ＼デス',
                    // skip: '本です': 'ホ＼ンデス',
                    '本当です': 'ホントーデ＼ス',
                    'お小遣いです': 'オコ＼ズカイデス',
                };

                checkSet(basicAccentTests);
            });

            describe('だ', function () {
                var basicAccentTests = {
                    '箸だ': 'ハ＼シダ',
                    '橋だ': 'ハシ＼ダ',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当だ': 'ホントーダ',
                    'お小遣いだ': 'オコ＼ズカイダ',
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
                // skip: 'ええ、わかります': 'エ＼ー、ワカリマ＼ス',

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
                // 'ええ、つまらなかったですねえ': 'エ＼ー、ツマラ＼ナカッタデスネ＼ー',

                'よくできました': 'ヨ＼クデキマ＼シタ',
                'いえいえ、どういたしまして': 'イエ＼イエ、ド＼ーイタシマシテ',

                'なんですか': 'ナ＼ンデスカ',
                '手紙です': 'テガミデ＼ス',

                '鈴木さん': 'スズキサン',
                '何ですか': 'ナ＼ンデスカ',
                'お電話です': 'オデ＼ンワデス',
                'あ、どうも': 'ア、ド＼ーモ',
            };

            checkSet(basicAccentTests);
        });
    });
});
