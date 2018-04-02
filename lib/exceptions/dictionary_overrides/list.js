module.exports = [
    // warning: there is another one that's flat
    { kanji: 'ええ', lexical: '感動詞', pronunciation: 'エ＼ー' },

    // MeCab wants to return this as a whole instead of すみ＋ませ＋ん
    { kanji: 'すみません', lexical: '感動詞', pronunciation: 'スミマセ＼ン' },

    { kanji: 'ない', lexical: '助動詞', pronunciation: 'ナ＼イ' },
    { kanji: 'はい', lexical: '感動詞', pronunciation: 'ハ＼イ' },
    { kanji: 'よく', lexical: '副詞', pronunciation: 'ヨ＼ク' },
];
