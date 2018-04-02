# ktaccent: アクセントを推測しようとするライブラリ
[![Build Status](https://img.shields.io/travis/k3zi/ktaccent/master.svg?style=flat-square)](https://travis-ci.org/k3zi/ktaccent)

## Prerequisites
1) MeCab

## Usage
```
var string = '明日作りますよ';
ktaccent.parse(string, function (result) {
    console.log(result); // result: アシタツクリマ＼スヨ
});
```

## To Do:
* Organize tests into seperate folders
