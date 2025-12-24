
import { TOPIC } from '../constants.js';
import { createModeQuestion } from './helpers.js';

export const modeQuestions = [
  // ==========================================
  // TYPE 4: TREND HUNTER (MODE) - Visual Frequency
  // ==========================================
  createModeQuestion(
    'ct-mode-1',
    'ランチの注文数',
    { '🍔': 6, '🍣': 4, '🍜': 3 },
    'ハンバーガーが一番多いです。'
  ),
  createModeQuestion(
    'ct-mode-2',
    '好きな科目アンケート',
    { '数学': 2, '英語': 3, '情報': 8, '国語': 4 },
    '「情報」が圧倒的人気です。'
  ),
  createModeQuestion(
    'ct-mode-3',
    '接戦！僅差を見極めろ',
    { 'A': 10, 'B': 11, 'C': 9 },
    'Bがわずかに多いです。グラフの微妙な高さを読み取るような感覚が必要です。'
  ),
  createModeQuestion(
    'ct-mode-4',
    '在庫管理：Tシャツの色',
    { '白': 4, '黒': 4, '青': 6, '赤': 2 },
    '青が一番売れています。次に多く発注すべきは青です。'
  ),
  createModeQuestion(
    'ct-mode-5',
    '同率1位：ダブルモード',
    { '🐶': 5, '🐱': 5, '🐰': 2 },
    '犬と猫、両方が最頻値です。分布の山が2つある状態です。'
  ),
  createModeQuestion(
    'ct-mode-6',
    '文字の出現頻度',
    { 'あ': 3, 'い': 1, 'う': 5, 'え': 2 },
    '暗号解読などでも使われる頻度分析。「う」が一番多いです。'
  ),
  createModeQuestion(
    'ct-mode-7',
    'サイコロの出目',
    { '1': 2, '2': 1, '3': 1, '6': 5 },
    '6がたくさん出ています。イカサマでしょうか？'
  ),
  createModeQuestion(
    'ct-mode-8',
    '天気の記録',
    { '晴': 15, '雨': 5, '曇': 10 },
    '晴れの日が一番多い月でした。'
  ),
  createModeQuestion(
    'ct-mode-9',
    '【新】果物の人気調査',
    { '🍎': 1, '🍌': 5, '🍒': 1 },
    'バナナが圧倒的です。一極集中型のデータです。'
  ),
  createModeQuestion(
    'ct-mode-10',
    '【新】価格帯の調査',
    { '100円': 3, '200円': 1, '300円': 1 },
    '100円の商品が最も多く並んでいます。'
  )
];
