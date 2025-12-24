
import { TOPIC } from '../constants.js';

export const scaleQuestionsPart3 = [
  // --- Nominal Scale (名義尺度) ---
  {
    id: 'dt-scale-3-1',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'ドメイン名 (.com, .jp)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: 'インターネット上の住所の一部であり、種類を表すラベルです。',
    hint: '組織の種類や国を表す名前です。'
  },
  {
    id: 'dt-scale-3-2',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'メーカー名 (Toyota, Sony...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '企業やブランドを識別する名前です。',
    hint: '会社の名前です。'
  },
  {
    id: 'dt-scale-3-3',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'QRコードの内容',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '情報を符号化したものであり、数値としての大小はありません。',
    hint: 'URLやIDなどの情報ラベルです。'
  },
  {
    id: 'dt-scale-3-4',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'ログインID',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: 'ユーザーを特定するための識別子です。',
    hint: '個人を区別する名前です。'
  },
  {
    id: 'dt-scale-3-5',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '最寄り駅',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '名義尺度',
    explanation: '場所を示す名前（ラベル）です。',
    hint: '駅の名前です。'
  },

  // --- Ordinal Scale (順序尺度) ---
  {
    id: 'dt-scale-3-6',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'ミシュランの星 (★1〜★3)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '評価の高さ（順序）を表しますが、★3が★1の3倍美味しいと数値化できるわけではありません。',
    hint: '格付けのランクです。'
  },
  {
    id: 'dt-scale-3-7',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '災害の警戒レベル (1〜5)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '危険度の段階を表します。数字は順序を示すための便宜的なものです。',
    hint: '危険さの段階です。'
  },
  {
    id: 'dt-scale-3-8',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '将棋の段位 (初段, 二段...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '実力の序列を表します。',
    hint: '強さのランクです。'
  },
  {
    id: 'dt-scale-3-9',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '肉の等級 (A5, A4...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '品質のランク付けです。',
    hint: '品質のランクです。'
  },
  {
    id: 'dt-scale-3-10',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '運転免許の色 (金, 青, 緑)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '順序尺度',
    explanation: '優良講習区分などの序列（優良＞一般＞初回等）に対応しており、順序性があります。',
    hint: 'ドライバーのランクを表します。'
  },

  // --- Interval Scale (間隔尺度) ---
  {
    id: 'dt-scale-3-11',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '華氏温度 (°F)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '摂氏と同じく、0度が熱エネルギーの欠如を意味しない温度目盛りです。',
    hint: 'アメリカなどで使われる温度です。'
  },
  {
    id: 'dt-scale-3-12',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'テストの合成得点',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '特定の基準に基づいて算出されたスコア（TOEICの一部など）は、0点が「能力なし」を意味しない場合、間隔尺度として扱われます。',
    hint: '偏差値に近い性質のスコアです。'
  },
  {
    id: 'dt-scale-3-13',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: 'カレンダーの日付 (1日, 2日...)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '月内の位置を表します。間隔（あと何日）には意味がありますが、比率には意味がありません。',
    hint: '10日は5日の2倍の日付ですか？'
  },
  {
    id: 'dt-scale-3-14',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '海抜 (m)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '特定の海面を基準(0)とした高さです。基準が変われば値が変わります。',
    hint: '標高と同じです。'
  },
  {
    id: 'dt-scale-3-15',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '知能指数 (IQ)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '間隔尺度',
    explanation: '平均を100とする相対的な指標です。',
    hint: '偏差値と同じ仲間です。'
  },

  // --- Ratio Scale (比例尺度) ---
  {
    id: 'dt-scale-3-16',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '降水量 (mm)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '雨の量は0が「降っていない」ことを意味し、比率計算が可能です。',
    hint: '雨の量です。'
  },
  {
    id: 'dt-scale-3-17',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '歩数 (歩)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '回数・個数データは比例尺度です。',
    hint: '歩いた数です。'
  },
  {
    id: 'dt-scale-3-18',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '脈拍数 (回/分)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '1分あたりの回数です。0は停止を意味します。',
    hint: '心臓が動いた回数です。'
  },
  {
    id: 'dt-scale-3-19',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '濃度 (%)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '成分の割合です。0%は成分が含まれていないことを意味します。',
    hint: '食塩水の濃さなどです。'
  },
  {
    id: 'dt-scale-3-20',
    topic: TOPIC.DATA_TYPES,
    mode: 'stream',
    text: '売上高 (円)',
    options: ['名義尺度', '順序尺度', '間隔尺度', '比例尺度'],
    correctAnswer: '比例尺度',
    explanation: '金額データは比例尺度です。',
    hint: 'お店の収入です。'
  }
];
