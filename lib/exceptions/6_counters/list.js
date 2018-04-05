module.exports = [
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
            { number: 8, before: 'ハチ', after: 'ハチエン' },
            { number: 10, before: 'ジュー', after: 'ジューエン' },
            { number: 100, before: 'ヒャク', after: 'ヒャクエン' },
            { number: 1000, before: 'セ＼ン', after: 'センエン' },
            { number: 10000, before: 'イチマ＼ン', after: 'イチマンエン' },
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
];
