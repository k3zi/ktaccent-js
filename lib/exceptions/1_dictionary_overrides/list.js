module.exports = [
    { kanji: 'いえいえ', lexical: '感動詞', pronunciation: 'イエ＼イエ' },

    // warning: there is another one that's flat
    { kanji: 'ええ', lexical: '感動詞', pronunciation: 'エ＼ー' },

    // MeCab wants to return this as a whole instead of すみ＋ませ＋ん
    { kanji: 'すみません', lexical: '感動詞', pronunciation: 'スミマセ＼ン' },

    { kanji: 'どういたしまして', lexical: '感動詞', pronunciation: 'ド＼ーイタシマシテ' },

    { kanji: 'ねえ', lexical: '助詞', pronunciation: 'ネ＼ー' },
    { kanji: 'はい', lexical: '感動詞', pronunciation: 'ハ＼イ' },
    { kanji: 'よく', lexical: '副詞', pronunciation: 'ヨ＼ク' },
];
