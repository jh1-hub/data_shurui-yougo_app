
import { TOPIC } from '../constants.js';

export const scaleQuestions = [
  // --- Nominal Scale (名義尺度) ---
  {
    id: 'dt-scale-post',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '郵便番号 (100-0001)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '数字ですが、地域を識別するためのラベル（名前）です。足し算や大小の比較に意味はありません。',
    hint: '「東京都千代田区」という名前の代わりについている番号です。'
  },
  {
    id: 'dt-scale-employee',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '社員番号 (No.005)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '個人を識別するためのラベルです。番号の大きさに意味はありません。',
    hint: '社員番号5番の人は、1番の人より5倍偉いですか？'
  },
  {
    id: 'dt-scale-weather',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '天気 (晴れ, 曇り, 雨)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '天候の状態を分類するラベルです。順序をつけることは一般的ではありません。',
    hint: '区別するための名前です。'
  },
  {
    id: 'dt-scale-jersey',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '選手の背番号 (10, 51, 99)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '選手を識別するためのラベルです。番号が大きいほど偉いわけでも、計算できるわけでもありません。',
    hint: '名前の代わりにつけている番号です。'
  },
  {
    id: 'dt-scale-blood',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '血液型 (A, B, O, AB)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '血液の種類を区別するカテゴリです。優劣や順序はありません。',
    hint: '区別するための種類です。'
  },

  // --- Ordinal Scale (順序尺度) ---
  {
    id: 'dt-scale-rank',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'テストの順位 (1位, 2位...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '順序（大小関係）には意味がありますが、1位と2位の差が、2位と3位の差と等しいとは限りません。',
    hint: '並び順に意味はありますが、点差（間隔）はバラバラかもしれません。'
  },
  {
    id: 'dt-scale-size',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '洋服のサイズ (S, M, L)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: 'SよりM、MよりLが大きいという順序関係はありますが、具体的な数値の間隔は定まっていません。',
    hint: '大きさの順序は決まっています。'
  },
  {
    id: 'dt-scale-likert',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '満足度アンケート (5:とても良い 〜 1:悪い)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '順序には意味がありますが、心理的な間隔が等しいとは限らないため、厳密には順序尺度として扱います。',
    hint: '順位付けに近い評価です。'
  },
  {
    id: 'dt-scale-medal',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'メダルの色 (金・銀・銅)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '1位、2位、3位という順序を表します。金と銀の差を計算することはできません。',
    hint: 'ランキングと同じ性質です。'
  },
  {
    id: 'dt-scale-spicy',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'カレーの辛さ (1辛〜10辛)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '辛さのレベル（順序）を表しますが、10辛に含まれるカプサイシンが1辛の正確に10倍とは限りません。',
    hint: 'お店が決めたレベルの順番です。'
  },

  // --- Interval Scale (間隔尺度) ---
  {
    id: 'dt-scale-temp-c',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '気温 (℃) - セルシウス度',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '目盛りの間隔は等しいですが、0℃は「熱がない」わけではなく、水が凍る点を便宜的に0としたものです。',
    hint: '0℃になったら、熱エネルギーは完全に消滅しますか？'
  },
  {
    id: 'dt-scale-year',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '西暦 (2024年)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '西暦1年は時間の始まり（絶対的な無）ではありません。年数の差（間隔）には意味がありますが、比率（2000年は1000年の2倍時間が経過した）とは言えません。',
    hint: '歴史的な基準点からの年数です。'
  },
  {
    id: 'dt-scale-dev',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '偏差値 (平均=50)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '偏差値は平均からの距離を表すため間隔に意味はありますが、偏差値0は「能力ゼロ」ではないため比率は使えません。',
    hint: '偏差値60は、偏差値30の「2倍」賢いわけではありません。'
  },
  {
    id: 'dt-scale-iq',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '知能指数 (IQ)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '検査結果の得点であり、間隔に意味はありますが、IQ=0が「知能ゼロ」という絶対的な無ではないため、間隔尺度です。',
    hint: '偏差値と同じ仲間です。'
  },
  {
    id: 'dt-scale-lat',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '緯度 (北緯35度)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '赤道を0度とした相対的な位置です。緯度0度が「場所がない」ことを意味するわけではありません。',
    hint: '位置を示す座標です。'
  },

  // --- Ratio Scale (比例尺度) ---
  {
    id: 'dt-scale-height',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '身長 (cm)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0cmは「高さが無い」ことを意味し、180cmは90cmの2倍という比率が成り立ちます。',
    hint: '0cmは完全に「無い」ことを意味しますか？'
  },
  {
    id: 'dt-scale-weight',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '体重 (kg)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0kgは「重さが無い」絶対原点です。50kgの2倍は100kgという計算ができます。',
    hint: '重さのデータです。'
  },
  {
    id: 'dt-scale-money',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '貯金額 (円)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '金額は0円が「お金が無い」状態を表し、倍率計算も可能です。',
    hint: 'お金は「2倍」とか「半分」とか言えますね。'
  },
  {
    id: 'dt-scale-time',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '50m走のタイム (秒)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '時間の長さ（時間量）は、0が「時間が無い」ことを意味し、比率計算ができるため比例尺度です。',
    hint: 'かかった時間の長さです。'
  },
  {
    id: 'dt-scale-rain-prob',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '降水確率 (0%, 50%...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0%は「降る可能性が無い」絶対的なゼロを表し、確率は比率としての計算が可能です。',
    hint: '0%は絶対的な「無」ですか？'
  },
  {
    id: 'dt-scale-kelvin',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '絶対温度 (ケルビン K)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0K（絶対零度）は熱エネルギーが完全に無い状態（絶対原点）を表すため、比率の計算が可能です。',
    hint: '物理学的に「0」が完全な「無」を意味します。'
  }
];
