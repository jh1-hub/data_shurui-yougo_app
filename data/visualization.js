import { TOPIC } from '../constants.js';
import { createScoutQuestion, createBoxPlotQuestion, createAnatomyQuestion } from './helpers.js';

export const visualizationQuestions = [
  // --- Graph Anatomy (Idea 3) ---
  createAnatomyQuestion(
    'vis-anat-1',
    'グラフの各部の名称を答えよ',
    '中央値 (第2四分位数)',
    'q2',
    { min: 10, q1: 30, q2: 55, q3: 75, max: 90, outliers: [] },
    '箱の中にある線が「中央値（第2四分位数）」です。データのちょうど真ん中の値を表します。'
  ),
  createAnatomyQuestion(
    'vis-anat-2',
    'グラフの各部の名称を答えよ',
    '第3四分位数 (Q3)',
    'q3',
    { min: 15, q1: 35, q2: 50, q3: 65, max: 85, outliers: [] },
    '箱の右端（値が大きい方）が「第3四分位数（Q3）」です。データを小さい順に並べたとき、75%の位置にある値です。'
  ),
  createAnatomyQuestion(
    'vis-anat-3',
    'グラフの各部の名称を答えよ',
    '第1四分位数 (Q1)',
    'q1',
    { min: 5, q1: 25, q2: 45, q3: 70, max: 95, outliers: [] },
    '箱の左端（値が小さい方）が「第1四分位数（Q1）」です。データを小さい順に並べたとき、25%の位置にある値です。'
  ),
  createAnatomyQuestion(
    'vis-anat-4',
    '特殊なデータの判別',
    '外れ値',
    'outlier',
    { min: 20, q1: 40, q2: 50, q3: 60, max: 80, outliers: [5, 98] }, // 98 and 5 are outliers
    'ヒゲ（最小・最大）から大きく離れてポツンとある点が「外れ値」です。分析結果に大きな影響を与えるため注意が必要です。'
  ),
  createAnatomyQuestion(
    'vis-anat-5',
    'データの範囲',
    '最大値 (Max)',
    'max',
    { min: 10, q1: 30, q2: 50, q3: 70, max: 90, outliers: [] },
    'ヒゲの右端（一番大きい値）が「最大値」です。ただし、外れ値がある場合は、外れ値を除いた中での最大値までヒゲが伸びます。'
  ),

  // --- Box Plot Builder (New Idea 1) ---
  createBoxPlotQuestion(
    'vis-box-1',
    '箱ひげ図を完成させよう',
    [10, 20, 30, 40, 50, 60, 70], // Median=40
    'Q2',
    'データは7個（奇数）なので、ど真ん中の「40」が中央値（第2四分位数）になります。箱ひげ図の中央の線をここに合わせます。'
  ),
  createBoxPlotQuestion(
    'vis-box-2',
    'データの散らばりを箱で表現',
    [10, 20, 30, 40, 50, 60, 70], // Lower: 10,20,30 -> Median=20 (Q1)
    'Q1',
    '中央値(40)より小さいデータ「10, 20, 30」の中央値が第1四分位数(Q1)です。正解は「20」で、これが箱の左端になります。'
  ),
  createBoxPlotQuestion(
    'vis-box-3',
    '偶数個のデータの場合',
    [10, 20, 30, 70, 80, 90], // Median=(30+70)/2=50. Upper: 70,80,90 -> Median=80 (Q3)
    'Q3',
    '中央値(50)より大きいデータ「70, 80, 90」の中央値が第3四分位数(Q3)です。正解は「80」で、これが箱の右端になります。'
  ),
  createBoxPlotQuestion(
    'vis-box-4',
    '少し複雑な分布',
    [15, 25, 30, 35, 40, 65, 80, 90], // n=8. Median=(35+40)/2=37.5. Upper: 40,65,80,90 -> (65+80)/2=72.5
    'Q3',
    'データ後半「40, 65, 80, 90」の中央値をとります。(65+80)÷2 = 72.5 が第3四分位数です。'
  ),

  // --- Data Scout Games ---
  
  createScoutQuestion(
    'vis-scout-1',
    '【データ探索】優秀なスカウトになれ！',
    '「数学」と「英語」が共に80点以上の生徒を探せ',
    [
      { id: 's1', icon: 'user', label: 'Aさん', stats: { '数学': 70, '英語': 85 } },
      { id: 's2', icon: 'user', label: 'Bさん', stats: { '数学': 90, '英語': 60 } },
      { id: 's3', icon: 'user', label: 'Cさん', stats: { '数学': 85, '英語': 92 } }, // Correct
      { id: 's4', icon: 'user', label: 'Dさん', stats: { '数学': 60, '英語': 50 } },
      { id: 's5', icon: 'user', label: 'Eさん', stats: { '数学': 95, '英語': 78 } },
      { id: 's6', icon: 'user', label: 'Fさん', stats: { '数学': 80, '英語': 79 } },
    ],
    's3',
    '2つの変数の両方が条件（80点以上）を満たしているのはCさんだけです。データを複合的に見る力（AND条件のフィルタリング）が必要です。'
  ),

  createScoutQuestion(
    'vis-scout-2',
    '【相関の例外】努力が報われていない！？',
    '「勉強時間」が長いのに、「成績」が低い（外れ値の）生徒を探せ',
    [
      { id: 'p1', icon: 'book', label: 'No.1', stats: { '勉強': '2h', '成績': 40 } },
      { id: 'p2', icon: 'book', label: 'No.2', stats: { '勉強': '5h', '成績': 80 } },
      { id: 'p3', icon: 'book', label: 'No.3', stats: { '勉強': '6h', '成績': 90 } },
      { id: 'p4', icon: 'book', label: 'No.4', stats: { '勉強': '1h', '成績': 30 } },
      { id: 'p5', icon: 'book', label: 'No.5', stats: { '勉強': '8h', '成績': 35 } }, // Correct (Outlier)
      { id: 'p6', icon: 'book', label: 'No.6', stats: { '勉強': '4h', '成績': 70 } },
    ],
    'p5',
    '一般的に勉強時間と成績には「正の相関」がありますが、No.5のデータだけはその傾向から大きく外れています。これを「外れ値」と呼び、分析の際は注意が必要です。'
  ),
  
  createScoutQuestion(
    'vis-scout-3',
    '【最大値探索】一番のベテランを探せ',
    '「年齢」が最も高く、かつ「経験年数」も10年以上の人',
    [
      { id: 'e1', icon: 'briefcase', label: '田中', stats: { '年齢': 25, '経験': '2年' } },
      { id: 'e2', icon: 'briefcase', label: '鈴木', stats: { '年齢': 40, '経験': '15年' } },
      { id: 'e3', icon: 'briefcase', label: '佐藤', stats: { '年齢': 55, '経験': '5年' } }, // Trap: Old but low exp
      { id: 'e4', icon: 'briefcase', label: '高橋', stats: { '年齢': 52, '経験': '25年' } }, // Correct
      { id: 'e5', icon: 'briefcase', label: '伊藤', stats: { '年齢': 30, '経験': '8年' } },
      { id: 'e6', icon: 'briefcase', label: '渡辺', stats: { '年齢': 45, '経験': '12年' } },
    ],
    'e4',
    '佐藤さんは年齢は高いですが経験年数が条件を満たしません。複数の量的データを比較し、条件に合致する最大値を見つける練習です。'
  ),

  // --- Standard Quiz ---
  {
    id: 'vis-1',
    topic: TOPIC.VISUALIZATION,
    text: 'ヒストグラムにおいて、柱の幅（区間）のことを何と呼ぶ？',
    options: ['度数', '階級', '累積度数', '相対度数'],
    correctAnswer: '階級',
    explanation: 'データを区切る区間のことを「階級」と呼び、その幅を「階級の幅」と言います。',
  },
  {
    id: 'vis-2',
    topic: TOPIC.VISUALIZATION,
    text: '箱ひげ図において、箱の中にある線は何を表している？',
    options: ['平均値', '中央値', '最大値', '最頻値'],
    correctAnswer: '中央値',
    explanation: '箱ひげ図の箱の中央にある線は「第2四分位数」、つまり中央値を表します。',
  },
  {
    id: 'vis-3',
    topic: TOPIC.VISUALIZATION,
    text: '箱ひげ図の箱の長さ（第3四分位数 - 第1四分位数）が表すものは？',
    options: ['四分位範囲 (IQR)', '標準偏差', '分散', '全範囲'],
    correctAnswer: '四分位範囲 (IQR)',
    explanation: '箱の長さは、データの真ん中50%が含まれる範囲（四分位範囲）を表し、データの散らばりの目安になります。',
  },
];
