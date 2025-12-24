import { TOPIC } from '../constants.js';
import { createVarianceQuestion, createSigmaSliderQuestion } from './helpers.js';

export const varianceQuestions = [
  // --- Game 1: Variance Buster (Click to remove) ---
  createVarianceQuestion(
    'var-bust-1',
    '【整理】外れ値を消去せよ',
    'LOWER',
    8.0,
    '標準偏差を小さくするには、平均（中心）から遠く離れたデータを取り除くのが基本です。'
  ),
  
  // --- Game 2: Sigma Slider (Scale data) ---
  createSigmaSliderQuestion(
    'var-slider-1',
    '【感覚】標準偏差 15.0 を作れ！',
    15.0,
    '標準偏差15は、データが平均を中心にそこそこ広がっている状態です。スライダーを動かして、直感的な広がりをつかみましょう。'
  ),
  createSigmaSliderQuestion(
    'var-slider-2',
    '【感覚】標準偏差 5.0 に凝縮せよ！',
    5.0,
    '標準偏差5は、データが平均付近にギュッと集まっている状態です。スライダーを左に動かして、バラつきを極限まで減らしてください。'
  ),
  createSigmaSliderQuestion(
    'var-slider-3',
    '【感覚】標準偏差 25.0 まで拡散せよ！',
    25.0,
    '標準偏差25は、データがかなり広範囲に散らばっている状態です。全体の幅を大きく広げる必要があります。'
  ),

  // --- Game 3: Variance Buster (Raise) ---
  createVarianceQuestion(
    'var-bust-2',
    '【応用】分散を最大化せよ',
    'RAISE',
    35.0,
    '逆に「バラつき」を大きくするには、平均に近い平凡なデータを消し、極端な値（両端）だけを残します。'
  ),

  // --- Standard Quiz ---
  {
    id: 'vs-quiz-1',
    topic: TOPIC.VARIANCE_SPREAD,
    text: '分散の正の平方根をとったものは何？',
    options: ['共分散', '標準偏差', '四分位偏差', '変動係数'],
    correctAnswer: '標準偏差',
    explanation: '分散は単位が2乗になってしまうため、元のデータと単位を合わせるために平方根をとったものが標準偏差です。',
  },
  {
    id: 'vs-quiz-2',
    topic: TOPIC.VARIANCE_SPREAD,
    text: '偏差（各データ - 平均値）の合計は常にいくつになる？',
    options: ['0', '1', 'データの個数', '平均値と同じ'],
    correctAnswer: '0',
    explanation: '平均値の定義から、平均値からの距離（偏差）をすべて足し合わせると、プラスとマイナスが打ち消し合って必ず0になります。',
  },
];
