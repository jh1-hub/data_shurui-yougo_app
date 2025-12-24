
import { TOPIC } from '../constants.js';

export const discreteQuestions = [
  // --- Discrete vs Continuous Variables ---
  {
      id: 'dt-cont-1',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: 'クラスの人数 (35人)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '離散データ',
      explanation: '人数は1人、2人と数えるもので、1.5人などの中間値はありません。とびとびの値をとる「離散データ」です。',
      hint: '人数に小数はありますか？'
  },
  {
      id: 'dt-cont-2',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: '50m走のタイム (7.53秒)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '連続データ',
      explanation: '時間は計測すればいくらでも細かく（7.531...秒）測ることができます。つながった値をとる「連続データ」です。',
      hint: '時間は細かく測れますか？'
  },
  {
      id: 'dt-cont-3',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: 'サイコロの出目 (1, 2...6)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '離散データ',
      explanation: 'サイコロの目は整数値しかとらず、1と2の間に値はありません。',
      hint: '1.5という目は出ますか？'
  },
  {
      id: 'dt-cont-4',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: '体重 (55.4kg)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '連続データ',
      explanation: '重さは連続的な量であり、測定精度によっていくらでも細かい値になります。',
      hint: '重さは量ですか？数ですか？'
  },
  {
      id: 'dt-cont-5',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: '本の冊数 (5冊)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '離散データ',
      explanation: '冊数は自然数で数えるものです。とびとびの値です。',
      hint: '個数を数えるデータです。'
  },
  {
      id: 'dt-cont-6',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: '気温 (25.4℃)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '連続データ',
      explanation: '温度は連続的に変化する量です。デジタル表示がとびとびでも、元の量は連続です。',
      hint: '温度はなめらかに変化しますか？'
  },
  {
      id: 'dt-cont-7',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: 'シュートの成功数 (10本中)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '離散データ',
      explanation: '成功数は0回、1回、2回...と整数でカウントします。',
      hint: '回数を数えるデータです。'
  },
  {
      id: 'dt-cont-8',
      topic: TOPIC.DATA_TYPES,
      mode: 'stream',
      text: '身長 (170cm)',
      options: ['離散データ', '連続データ'],
      correctAnswer: '連続データ',
      explanation: '長さは連続量です。どこまでも細かく測ることができます。',
      hint: '170.111...cmもあり得ますか？'
  }
];
