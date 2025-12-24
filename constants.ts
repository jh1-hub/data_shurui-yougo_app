import { Topic, Question } from './types';

export const INITIAL_LIVES = 3;
export const POINTS_PER_QUESTION = 100;
export const STREAK_BONUS = 50;

// Helper to generate a random dataset
const generateRandomData = (count: number, min: number, max: number) => 
  Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

// Helper to calculate basic stats
const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

export const STATIC_QUESTIONS: Question[] = [
  // --- Data Types ---
  {
    id: 'dt-1',
    topic: Topic.DATA_TYPES,
    text: '次のうち、「質的データ」に分類されるものはどれ？',
    options: ['身長 (cm)', 'テストの点数 (点)', '血液型 (A, B, O, AB)', '気温 (℃)'],
    correctAnswer: '血液型 (A, B, O, AB)',
    explanation: '質的データは、分類や種類を表すデータです。身長や点数などの数値の大きさ自体に意味があるものは量的データです。',
  },
  {
    id: 'dt-2',
    topic: Topic.DATA_TYPES,
    text: '「名義尺度」に当てはまるデータは？',
    options: ['社員番号', 'テストの順位', '摂氏温度', '年収'],
    correctAnswer: '社員番号',
    explanation: '名義尺度は、他と区別するためだけのラベルです。順位は順序尺度、温度は間隔尺度、年収は比例尺度です。',
  },
  {
    id: 'dt-3',
    topic: Topic.DATA_TYPES,
    text: '「比例尺度（比率尺度）」の特徴として正しいものは？',
    options: ['大小関係がない', '0（ゼロ）が「無い」ことを意味する（絶対原点がある）', '間隔は等しいが絶対原点がない', '順序だけに意味がある'],
    correctAnswer: '0（ゼロ）が「無い」ことを意味する（絶対原点がある）',
    explanation: '比例尺度は、0が絶対的な「無」を表し、倍率（2倍など）の計算が可能です。例：身長、重さ。',
  },

  // --- Central Tendency ---
  {
    id: 'ct-1',
    topic: Topic.CENTRAL_TENDENCY,
    text: 'データ「1, 1, 3, 5, 10, 20」の中央値（メジアン）は？',
    options: ['3', '4', '5', '6.6'],
    correctAnswer: '4',
    explanation: 'データは6個（偶数）です。中央の2つ（3と5）の平均をとります。(3+5)/2 = 4。',
  },
  {
    id: 'ct-2',
    topic: Topic.CENTRAL_TENDENCY,
    text: '外れ値（極端に大きい値や小さい値）の影響を最も受けやすい代表値は？',
    options: ['平均値', '中央値', '最頻値', '四分位範囲'],
    correctAnswer: '平均値',
    explanation: '平均値は全てのデータを足して割るため、極端な値が一つあるだけで大きく変動します。',
  },
  {
    id: 'ct-3',
    topic: Topic.CENTRAL_TENDENCY,
    text: 'データの中で最も頻繁に出現する値を何と呼ぶ？',
    options: ['レンジ', 'メジアン', 'モード', 'アベレージ'],
    correctAnswer: 'モード',
    explanation: '最頻値（モード）は、データセット内で最も出現回数が多い値のことです。',
  },

  // --- Variance & Spread ---
  {
    id: 'vs-1',
    topic: Topic.VARIANCE_SPREAD,
    text: '分散の正の平方根をとったものは何？',
    options: ['共分散', '標準偏差', '四分位偏差', '変動係数'],
    correctAnswer: '標準偏差',
    explanation: '分散は単位が2乗になってしまうため、元のデータと単位を合わせるために平方根をとったものが標準偏差です。',
  },
  {
    id: 'vs-2',
    topic: Topic.VARIANCE_SPREAD,
    text: 'データが平均値の周りにどのように散らばっているかを表す指標ではないものは？',
    options: ['分散', '標準偏差', '範囲（レンジ）', '最頻値'],
    correctAnswer: '最頻値',
    explanation: '最頻値は代表値の一つで、散らばり具合（散布度）を表す指標ではありません。',
  },
   {
    id: 'vs-3',
    topic: Topic.VARIANCE_SPREAD,
    text: '偏差（各データ - 平均値）の合計は常にいくつになる？',
    options: ['0', '1', 'データの個数', '平均値と同じ'],
    correctAnswer: '0',
    explanation: '平均値の定義から、平均値からの距離（偏差）をすべて足し合わせると、プラスとマイナスが打ち消し合って必ず0になります。',
  },

  // --- Visualization ---
  {
    id: 'vis-1',
    topic: Topic.VISUALIZATION,
    text: 'ヒストグラムにおいて、柱の幅（区間）のことを何と呼ぶ？',
    options: ['度数', '階級', '累積度数', '相対度数'],
    correctAnswer: '階級',
    explanation: 'データを区切る区間のことを「階級」と呼び、その幅を「階級の幅」と言います。',
  },
  {
    id: 'vis-2',
    topic: Topic.VISUALIZATION,
    text: '箱ひげ図において、箱の中にある線は何を表している？',
    options: ['平均値', '中央値', '最大値', '最頻値'],
    correctAnswer: '中央値',
    explanation: '箱ひげ図の箱の中央にある線は「第2四分位数」、つまり中央値を表します。',
  },
  {
    id: 'vis-3',
    topic: Topic.VISUALIZATION,
    text: '箱ひげ図の箱の長さ（第3四分位数 - 第1四分位数）が表すものは？',
    options: ['四分位範囲 (IQR)', '標準偏差', '分散', '全範囲'],
    correctAnswer: '四分位範囲 (IQR)',
    explanation: '箱の長さは、データの真ん中50%が含まれる範囲（四分位範囲）を表し、データの散らばりの目安になります。',
  },
];
