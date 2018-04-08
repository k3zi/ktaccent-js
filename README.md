# ktaccent ([日本語版](#ktaccent))
[![Build Status][travis-image]][travis-url]
[![Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]

## Overview
A library for guessing sentence pitch accent

## Prerequisites
1) MeCab  
2) Node

## Usage
```js
// string: 箸を洗っていると、電話が鳴った。
//「明日になったら、学校の近くの橋に
// 来てください」と言われた。
ktaccent.parse(string, function (result) {
    console.log(result);
    // result: ハ＼シヲ　アラッテ　イル＼ト、デンワガ　ナッタ。
    //「アシタ＼ニ　ナ＼ッタラ、ガッコー　ノ　チカ＼ク　ノ　ハシ＼ニ　
    // キ＼テ　クダサ＼イ」ト　イワレタ。
});
```

## To Do:
* Organize tests into seperate folders
* Exapnding library: move slow and steady

---

# ktaccent
[![Build Status][travis-image]][travis-url]
[![Coverage][coverage-image]](coverage-url)
[![License][license-image]][license-url]

## ktaccentとは？
アクセントを推測するライブラリで、ktaccentは高低アクセントのことです

## 動作に必要なもの
1) MeCab  
2) Node

## 使い方
```js
// string: 箸を洗っていると、電話が鳴った。
//「明日になったら、学校の近くの橋に
// 来てください」と言われた。
ktaccent.parse(string, function (result) {
    console.log(result);
    // result: ハ＼シヲ　アラッテ　イル＼ト、デンワガ　ナッタ。
    //「アシタ＼ニ　ナ＼ッタラ、ガッコー　ノ　チカ＼ク　ノ　ハシ＼ニ　
    // キ＼テ　クダサ＼イ」ト　イワレタ。
});
```

## やることリスト
* テストをフォルダに分ける
* ライブラリを広げる：一定のペースで

[travis-url]: https://travis-ci.org/k3zi/ktaccent
[travis-image]: https://img.shields.io/travis/k3zi/ktaccent/master.svg?style=flat-square

[coverage-url]: https://codecov.io/gh/k3zi/ktaccent
[coverage-image]: https://img.shields.io/codecov/c/github/k3zi/ktaccent/master.svg?style=flat-square

[license-url]: https://github.com/k3zi/ktaccent/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat-square
