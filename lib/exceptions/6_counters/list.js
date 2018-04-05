module.exports = [
    {
        counter: ['位'],
        pronunciation: 'イ',
        type: 'before_fall',
        pronunciations: [
        ]
    },


    {
        counter: ['円'],
        pronunciation: 'エン',
        type: 'before_fall',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イチエン' },
            { number: 2, before: 'ニ', after: 'ニエン' },
            { number: 3, before: 'サン', after: 'サンエン' },
            { number: 4, before: 'ヨン', after: 'ヨ＼エン' },
            { number: 6, before: 'ロク', after: 'ロクエン' },
            { number: 7, before: 'シチ', after: 'ナナ＼エン' },
            { number: 8, before: 'ハチ', after: 'ハチエン' },
            { number: 10, before: 'ジュー', after: 'ジューエン' },
            { number: 14, before: 'ジューヨン', after: 'ジューヨ＼エン' },
            { number: 19, before: 'ジューク', after: 'ジューキュ＼ーエン' },
            { number: 100, before: 'ヒャク', after: 'ヒャクエン' },
            { number: 1000, before: 'セ＼ン', after: 'センエン' },
            { number: 10000, before: 'イチマ＼ン', after: 'イチマンエン' },
        ]
    },

    {
        counter: ['円玉'],
        pronunciation: 'エンダマ',
        type: 'on_counter',
        pronunciations: [
        ]
    },


    {
        counter: ['階'],
        pronunciation: 'カイ',
        type: 'on_counter',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イッカイ' },
            { number: 3, before: 'サン', after: 'サンガイ' },
            { number: 6, before: 'ロク', after: 'ロッカイ' },
            { number: '*', before: 'ジュー', after: 'ジュッカイ' },
        ]
    },


    {
        counter: ['才', '歳'],
        pronunciation: 'サイ',
        type: 'before_fall',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イ＼ッサイ' },
            { number: 8, before: 'ハチ', after: 'ハ＼ッサイ' },
            { number: '*', before: 'ジュー', after: 'ジュ＼ッサイ' },
            { number: 20, before: 'ニジュー', after: 'ハ＼タチ' },
        ]
    },


    {
        counter: ['時'],
        pronunciation: 'ジ',
        type: 'before_fall',
        pronunciations: [
            { number: 4, before: 'ヨン', after: 'ヨ＼ジ' },
            { number: 9, before: 'キュー', after: 'ク＼ジ' },
        ]
    },


    {
        counter: ['時間'],
        pronunciation: 'ジ＼カン',
        type: 'on_counter',
        pronunciations: [
            { number: 4, before: 'ヨン', after: 'ヨジ＼カン' },
            { number: 9, before: 'キュー', after: 'クジ＼カン' },
        ]
    },


    {
        counter: ['週間'],
        pronunciation: 'シュ＼ーカン',
        type: 'on_counter',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イッシュ＼ーカン' },
            { number: 8, before: 'ハチ', after: 'ハッシュ＼ーカン' },
            { number: '*', before: 'ジュー', after: 'ジュッシュ＼ーカン' },
        ]
    },


    {
        counter: ['週'],
        pronunciation: 'シュー',
        type: 'on_counter',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イッシュー' },
            { number: 8, before: 'ハチ', after: 'ハッシュー' },
            { number: '*', before: 'ジュー', after: 'ジュッシュー' },
        ]
    },

/* Before completing this add: exact_number and end_number so numbers after 10 will count correctly
    {
        counter: ['日'],
        pronunciation: 'ニチ',
        type: 'before_fall',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イチニチ＼' },
            { number: 2, before: 'ニ', after: 'フツカ' },
            { number: 3, before: 'サン', after: 'ミッカ' },
            { number: 4, before: 'ヨン', after: 'ヨッカ' },
            { number: 5, before: 'ゴ', after: 'イツカ' },
            { number: 6, before: 'ロク', after: 'ムイカ' },
            { number: 7, before: 'シチ', after: 'ナノカ' },
            { number: 8, before: 'ハチ', after: 'ヨーカ' },
            { number: 9, before: 'キュー', after: 'ココノカ＼' },
            { number: 10, before: 'ジュー', after: 'トーカ' },
            { number: 14, before: 'ジューヨン', after: 'ジューヨ＼エン' },
            { number: 19, before: 'ジューク', after: 'ジューキュ＼ーエン' },
            { number: 100, before: 'ヒャク', after: 'ヒャクエン' },
            { number: 1000, before: 'セ＼ン', after: 'センエン' },
            { number: 10000, before: 'イチマ＼ン', after: 'イチマンエン' },
        ]
    },*/


    {
        counter: ['人前'],
        pronunciation: 'ニンマエ',
        type: 'on_counter',
        pronunciations: [
        ]
    },


    {
        counter: ['番'],
        pronunciation: 'バン',
        type: 'before_fall',
        pronunciations: [
            { number: 3, before: 'サン', after: 'サンバン' },
            { number: 5, before: 'ゴ', after: 'ゴバン' },
        ]
    },


    {
        counter: ['秒'],
        pronunciation: 'ビョー',
        type: 'before_fall',
        pronunciations: [
            { number: 7, before: 'シチ', after: 'ナナ＼ビョー' },
        ]
    },


    {
        counter: ['秒間'],
        pronunciation: 'ビョ＼ーカン',
        type: 'on_counter',
        pronunciations: [
            { number: 7, before: 'シチ', after: 'ナナビョ＼ーカン' },
        ]
    },


    {
        counter: ['分'],
        pronunciation: 'フン',
        type: 'before_fall',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イ＼ップン' },
            { number: 3, before: 'サン', after: 'サ＼ンプン' },
            { number: 4, before: 'ヨン', after: 'ヨ＼ンプン' },
            { number: 6, before: 'ロク', after: 'ロ＼ップン' },
        　　{ number: 7, before: 'シチ', after: 'ナナ＼フン' },
            { number: 8, before: 'ハチ', after: 'ハ＼ップン' },
            { number: '*', before: 'ジュー', after: 'ジュ＼ップン' },
            { number: '何', before: 'ナン', after: 'ナ＼ンプン' },
        ]
    },


    {
        counter: ['分間'],
        pronunciation: 'フ＼ンカン',
        type: 'on_counter',
        pronunciations: [
            { number: 1, before: 'イチ', after: 'イップ＼ンカン' },
            { number: 3, before: 'サン', after: 'サンプ＼ンカン' },
            { number: 4, before: 'ヨン', after: 'ヨンプ＼ンカン' },
            { number: 6, before: 'ロク', after: 'ロップ＼ンカン' },
        　　{ number: 7, before: 'シチ', after: 'ナナフ＼ンカン' },
            { number: 8, before: 'ハチ', after: 'ハップ＼ンカン' },
            { number: '*', before: 'ジュー', after: 'ジュップ＼ンカン' },
        ]
    },


    {
        counter: ['ページ'],
        pronunciation: 'ペ＼ージ',
        type: 'on_counter',
        pronunciations: [
            { number: '*', before: 'ジュー', after: 'ジュッペ＼ージ' },
        ]
    },


    {
        counter: ['名'],
        pronunciation: 'メー',
        type: 'before_fall',
        pronunciations: [
        ]
    },


    {
        counter: ['話'],
        pronunciation: 'ワ',
        type: 'before_fall',
        pronunciations: [
        ]
    },
];
