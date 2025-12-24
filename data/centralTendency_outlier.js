
import { TOPIC } from '../constants.js';
import { createOutlierQuestion } from './helpers.js';

export const outlierQuestions = [
  // ==========================================
  // TYPE 5: OUTLIER DEFENSE (SELECTION LOGIC)
  // ==========================================
  createOutlierQuestion(
    'ct-out-1',
    '0点の衝撃',
    'ほとんど80点台なのに、一人だけ0点だった。クラスの実力（中心）を表すには？',
    [80, 82, 85, 88, 0],
    true, // Has Outlier -> Median
    '「0点」に平均値は大きく引き下げられます。外れ値に強い中央値を選びましょう。'
  ),
  createOutlierQuestion(
    'ct-out-2',
    '平和なデータ',
    'お小遣いはみんな3000円前後。飛び抜けた人はいない。',
    [2800, 3000, 3200, 2900, 3100],
    false, // No Outlier -> Mean
    '外れ値がない左右対称なデータでは、全ての情報を加味できる平均値が最も信頼できます。'
  ),
  createOutlierQuestion(
    'ct-out-3',
    '億万長者の来訪',
    '平均年収が急上昇した！？実は大金持ちが一人引っ越してきただけだった。',
    [400, 450, 500, 420, 100000], 
    true, // Has Outlier -> Median
    '平均値は合計を使うため、一人の大金持ちの影響をモロに受けます。実感に近いのは中央値です。'
  ),
  createOutlierQuestion(
    'ct-out-4',
    'マラソンのタイム',
    '全員が4時間前後で完走したが、一人だけ怪我で10時間かかった人がいた。',
    [4.0, 4.2, 3.9, 4.1, 10.0],
    true, // Has Outlier -> Median
    '怪我という特殊事情（外れ値）を除いて、みんなの一般的なタイムを知るには中央値が良いでしょう。'
  ),
  
  // ==========================================
  // TYPE 5.5: HIDDEN OUTLIER (HARD MODE)
  // ==========================================
  createOutlierQuestion(
    'ct-out-hidden-1',
    '【難】潜む外れ値',
    '警告：このデータには外れ値が含まれている可能性がありますが、見た目では強調されません。数値を確認せよ！',
    [50, 52, 51, 53, 500],
    true, // Has Outlier
    '数値を見ると「500」だけが一桁違います。これが外れ値です！視覚的な強調がなくても、数値自体を確認する癖をつけましょう。',
    true // Hide Visual Check
  ),
  createOutlierQuestion(
    'ct-out-hidden-2',
    '【難】入力ミス？',
    '身長のデータ：[170, 168, 172, 175, 17] ...おや、一人だけ小人さんがいる？',
    [170, 168, 172, 175, 17],
    true, // Has Outlier
    '「17cm」は明らかに異常値（入力ミス）の可能性が高い外れ値です。平均値を使うと大きくズレてしまいます。',
    true // Hide Visual Check
  ),
  createOutlierQuestion(
    'ct-out-hidden-3',
    '【難】普通に見えるけれど...',
    'テストの点数分布。パッと見はバラバラに見えるが、極端な値はあるか？',
    [10, 80, 85, 90, 95], // 10 is outlier
    true, // Has Outlier
    'みんな80点以上なのに、一人だけ10点がいます。これが平均値を押し下げる外れ値です。',
    true // Hide Visual Check
  ),
  createOutlierQuestion(
    'ct-out-hidden-4',
    '【新】センサー異常',
    '温度センサーのログデータ。[25, 26, 25, 120, 24]。何かがおかしい？',
    [25, 26, 25, 120, 24],
    true, // Has Outlier
    '120℃は明らかに異常です。平均値は使えません。',
    true
  ),
  createOutlierQuestion(
    'ct-out-hidden-5',
    '【新】年齢データ',
    'アンケート回答者の年齢。[18, 17, 18, 180, 19]。',
    [18, 17, 18, 180, 19],
    true, // Has Outlier
    '180歳はおそらく入力ミスでしょう。平均年齢が跳ね上がってしまいます。',
    true
  )
];
