
import { TOPIC } from '../constants.js';

export const scaleQuestionsPart2 = [
  // --- Nominal Scale (名義尺度) ---
  {
    id: 'dt-scale-2-1',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '車のナンバープレート (品川 300...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '個々の車を識別するための記号・番号です。数字の大きさに意味はありません。',
    hint: '足し算して意味がありますか？'
  },
  {
    id: 'dt-scale-2-2',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '口座番号',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '銀行口座を特定するためのIDです。',
    hint: '口座の残高ではなく、番号そのものです。'
  },
  {
    id: 'dt-scale-2-3',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '商品カテゴリ (食品, 衣類, 家電)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '種類を区別するためのラベルです。順序はありません。',
    hint: '分類するための名前です。'
  },
  {
    id: 'dt-scale-2-4',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'プロ野球のチーム名',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: 'チームを区別する名前です。',
    hint: '名前ラベルです。'
  },
  {
    id: 'dt-scale-2-5',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '電話の市外局番 (03, 06...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '地域を表すコード番号です。03が06の半分という意味はありません。',
    hint: '場所を表す番号です。'
  },
  {
    id: 'dt-scale-2-6',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '性別 (男性, 女性, その他)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '属性を区別するためのカテゴリです。',
    hint: '区別するためのラベルです。'
  },
  {
    id: 'dt-scale-2-7',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'パスポート番号',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '個人を特定するIDです。',
    hint: 'マイナンバーと同じくIDです。'
  },

  // --- Ordinal Scale (順序尺度) ---
  {
    id: 'dt-scale-2-8',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '相撲の番付 (横綱, 大関...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '明確な階級の順序がありますが、強さの数値的な間隔は一定ではありません。',
    hint: '強さのランキングです。'
  },
  {
    id: 'dt-scale-2-9',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '肉の焼き加減 (レア, ミディアム...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '火の通り具合による順序があります。',
    hint: '焼き具合の段階です。'
  },
  {
    id: 'dt-scale-2-10',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '英検の級 (1級, 2級...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '難易度の順序を表します。',
    hint: 'レベルの順序です。'
  },
  {
    id: 'dt-scale-2-11',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '地震の震度 (1, 2...7)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '揺れの強さを段階的に表したものです。物理量（ガル）とは異なり、階級としての性質が強いです。',
    hint: '揺れのレベル分けです。'
  },
  {
    id: 'dt-scale-2-12',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '検索結果の表示順',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '関連度が高い順に並んでいますが、1位と2位の差が数値で定義されているわけではありません。',
    hint: 'ランキングです。'
  },
  {
    id: 'dt-scale-2-13',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'がんのステージ (I期, II期...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '進行度合いを示す段階的な指標です。',
    hint: '病気の進行レベルです。'
  },
  {
    id: 'dt-scale-2-14',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '会社の役職 (社長, 部長, 課長)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '組織内の序列を表します。',
    hint: '偉さの順番です。'
  },

  // --- Interval Scale (間隔尺度) ---
  {
    id: 'dt-scale-2-15',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'ゴルフのスコア (パーに対する±)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '基準（パー）からの差を表します。0は「打数ゼロ」ではなく基準通りという意味です。',
    hint: '基準点からのプラスマイナスです。'
  },
  {
    id: 'dt-scale-2-16',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '時刻 (13:00, 14:00)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '時点を表します。14:00は13:00より1時間後という間隔に意味はありますが、比率（14時は7時の2倍）は無意味です。',
    hint: '時間の「長さ」ではなく「時点」です。'
  },
  {
    id: 'dt-scale-2-17',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'テストの点数 (※教育測定における解釈)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '厳密には0点が「能力ゼロ」を意味しないため間隔尺度とされることが多いですが、一般的には比例尺度のように扱われることもあります。情報Iの文脈では間隔尺度（あるいは比例尺度）の理解が問われますが、0の意味に着目すると間隔尺度的性質が見えます。',
    hint: '0点は知識が完全にゼロであることを証明しますか？'
  },
  {
    id: 'dt-scale-2-18',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '水温 (℃)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: 'セルシウス温度は0が相対的な基準点です。',
    hint: '気温と同じです。'
  },
  {
    id: 'dt-scale-2-19',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '標高 (m)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '平均海水面を0mとした相対的な高さです。基準が変われば値も変わります。',
    hint: '海面を基準にした高さです。'
  },

  // --- Ratio Scale (比例尺度) ---
  {
    id: 'dt-scale-2-20',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '月収 (円)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0円は収入が無いことを示し、20万円は10万円の2倍です。',
    hint: 'お金の量です。'
  },
  {
    id: 'dt-scale-2-21',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '年齢 (歳)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0歳は生まれてからの時間が0であることを意味し、20歳は10歳の2倍生きています。',
    hint: '生きてきた時間の長さです。'
  },
  {
    id: 'dt-scale-2-22',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '速度 (km/h)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0km/hは停止（速度なし）を意味します。',
    hint: '物理的な速さです。'
  },
  {
    id: 'dt-scale-2-23',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '肺活量 (cc)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '空気の体積であり、0は空気が無いことを意味します。',
    hint: '体積（量）です。'
  },
  {
    id: 'dt-scale-2-24',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '人口 (人)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '人数のカウントデータです。0人は誰もいないことを意味します。',
    hint: '人数の多さです。'
  },
  {
    id: 'dt-scale-2-25',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'アクセス数 (PV)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '回数データです。比率計算が可能です。',
    hint: '回数です。'
  },
  {
    id: 'dt-scale-2-26',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '絶対温度 (K)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '0K（絶対零度）は熱運動が止まる完全な無を表します。',
    hint: '物理学的な温度です。'
  },
  {
    id: 'dt-scale-2-27',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '距離 (km)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '長さ、距離は比例尺度です。',
    hint: '長さです。'
  },
  {
    id: 'dt-scale-2-28',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'データのファイルサイズ (KB)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '情報量です。0KBはデータが空です。',
    hint: '情報の量です。'
  },
  {
    id: 'dt-scale-2-29',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '店舗の面積 (㎡)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '面積は0が「広さなし」を意味します。',
    hint: '広さです。'
  },
  {
    id: 'dt-scale-2-30',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '労働時間 (時間)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '時間の長さ（期間）は比例尺度です。',
    hint: '働いた時間の長さです。'
  }
];
