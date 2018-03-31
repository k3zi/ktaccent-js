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
                };

                checkSet(basicAccentTests);
            });

            describe('だ', function () {
                var basicAccentTests = {
                    '箸だ': 'ハ＼シダ',
                    '橋だ': 'ハシ＼ダ',
                    // skip: '本だ': 'ホ＼ンダ',
                    '本当だ': 'ホントーダ',
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
        });

        describe('with conversations', function () {
            var basicAccentTests = {
                'わかりますか': 'ワカリマ＼スカ',
                // skip: 'ええ、わかります': 'エ＼ー、ワカリマ＼ス',

                '今日しますね': 'キョ＼ーシマ＼スネ',
                'いや、違います。明日しますよ': 'イヤ、チガイマ＼ス。アシタシマ＼スヨ',

                '作りましたね': 'ツクリマ＼シタネ',
                'はい。昨日作りました': 'ハ＼イ。キノーツクリマ＼シタ',
            };

            checkSet(basicAccentTests);
        });

        /*it('should find the screen span', function () {
            expect(this.calculator.display.getAttribute('id')).to.equal('screen');
        });

        it('should have correct properties', function () {
            expect(this.calculator.display.innerHTML).to.equal('0');
            expect(this.calculator.memNum).to.equal('0');
            expect(this.calculator.lastNum).to.be.a('null')
            expect(this.calculator.currentNumString).to.equal('');
            expect(this.calculator.lastOperator).to.be.an('undefined')
        });*/
    });
});
