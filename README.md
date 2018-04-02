# ktaccent ([日本語版](#ktaccent-アクセントを推測しようとするライブラリ))
[![Build Status](https://img.shields.io/travis/k3zi/ktaccent/master.svg?style=flat-square)](https://travis-ci.org/k3zi/ktaccent)

## Overview
A library for guessing sentence pitch accent

## Prerequisites
1) MeCab
2) Node

## Usage
```
var string = '明日作りますよ';
ktaccent.parse(string, function (result) {
    console.log(result); // result: アシタツクリマ＼スヨ
});
```

## To Do:
* Organize tests into seperate folders
* Exapnding library: move slow and steady

---

# ktaccent
[![Build Status](https://img.shields.io/travis/k3zi/ktaccent/master.svg?style=flat-square)](https://travis-ci.org/k3zi/ktaccent)

## ktaccentとは？
アクセントを推測するライブラリで、ktaccentは高低アクセントのことです

## 動作に必要なもの
1) MeCab
2) Node

## 使い方
```
var string = '明日作りますよ';
ktaccent.parse(string, function (result) {
    console.log(result); // result: アシタツクリマ＼スヨ
});
```

## やることリスト:
* テストをフォルダに分ける
* ライブラリを広げる：一定のペースで
