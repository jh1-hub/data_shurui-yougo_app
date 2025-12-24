
import { TOPIC } from '../constants.js';
import { createBalanceQuestion } from './helpers.js';

export const meanQuestions = [
  // ==========================================
  // TYPE 2: BALANCE GAME (MEAN) - Visual Puzzles
  // ==========================================
  createBalanceQuestion(
    'ct-bal-1',
    '基本：データの重心を探せ',
    [20, 80],
    '足して2で割る。(20+80)÷2 = 50。これが重心です。'
  ),
  createBalanceQuestion(
    'ct-bal-2',
    '引っかけ：重さに惑わされるな',
    [0, 10, 20, 90],
    '左に3つデータがありますが、右の「90」が非常に重いため、重心は右（30）に引っ張られます。'
  ),
  createBalanceQuestion(
    'ct-bal-3',
    '均等分布：シンメトリー',
    [20, 40, 60, 80],
    '左右対称に並んでいる場合、平均値は必ず真ん中になります。'
  ),
  createBalanceQuestion(
    'ct-bal-4',
    '一点集中：多数決ではない',
    [10, 10, 10, 90],
    '「10」がたくさんあっても、平均値は個数ではなく値の合計で決まります。重心は30になります。'
  ),
  createBalanceQuestion(
    'ct-bal-5',
    '遠くの小さな値 vs 近くの大きな値',
    [40, 45, 95],
    '計算してみましょう。(40+45+95)÷3 = 60。見た目よりも右側に重心があります。'
  ),
  createBalanceQuestion(
    'ct-bal-6',
    '両極端なデータ',
    [0, 100],
    '0点と100点の平均は50点。両端にデータがあっても重心は真ん中です。'
  ),
  createBalanceQuestion(
    'ct-bal-7',
    '密集地帯の罠',
    [10, 15, 20, 75],
    '左側にデータが密集していますが、右端の75が全体を右へ引っ張ります。平均は30です。'
  ),
  createBalanceQuestion(
    'ct-bal-8',
    '【新】完全対称',
    [30, 50, 70],
    '30と70は50から等距離にあります。重心は真ん中の50です。'
  ),
  createBalanceQuestion(
    'ct-bal-9',
    '【新】ゼロの力',
    [0, 0, 0, 100],
    '「0」も立派なデータです。(0+0+0+100)÷4 = 25。平均値はかなり左に寄ります。'
  ),
  createBalanceQuestion(
    'ct-bal-10',
    '【新】わずかなズレ',
    [49, 50, 51],
    '連続する整数の平均は、真ん中の数になります。'
  )
];
