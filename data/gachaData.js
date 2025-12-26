
export const GACHA_CARDS = [
  // --- STAGE 1 (Requested Set) ---
  
  // UR (1枚): 比例尺度
  { 
    id: 'ur-s1-1', stage: 1, icon: 'percent',
    rarity: 'UR', type: 'STAT', name: '比例尺度 (Ratio Scale)', 
    desc: '絶対的な「0」があり、比率計算ができる最強の尺度。「0cm」は長さが無いことを意味し、「200万円」は「100万円」の2倍の価値がある。四則演算すべてが可能で、情報量が最も多い王様。' 
  },

  // SR (2枚): 間隔尺度, 順序尺度
  { 
    id: 'sr-s1-1', stage: 1, icon: 'thermometer',
    rarity: 'SR', type: 'STAT', name: '間隔尺度 (Interval Scale)', 
    desc: '目盛りの間隔は等しいが、絶対的な「0」がない尺度。気温0℃や西暦0年は「無」を意味しない。足し引きはできるが、「20℃は10℃の2倍暑い」とは言えない不思議な世界。' 
  },
  { 
    id: 'sr-s1-2', stage: 1, icon: 'list-ordered',
    rarity: 'SR', type: 'STAT', name: '順序尺度 (Ordinal Scale)', 
    desc: '順位や大小関係に意味があるデータ。「1位、2位」「Sサイズ、Mサイズ」など。並べ替えはできるが、1位と2位の差が、2位と3位の差と同じとは限らないため、足し算はできない。' 
  },

  // R (4枚): 名義尺度, 質的データ, 量的データ, 外れ値
  { 
    id: 'r-s1-1', stage: 1, icon: 'tag',
    rarity: 'R', type: 'DATA', name: '名義尺度 (Nominal Scale)', 
    desc: '他と区別するためのラベル。「血液型」や「電話番号」がこれ。数字であっても計算には意味がない。「背番号10」と「背番号20」を足しても30番の選手にはならない。' 
  },
  { 
    id: 'r-s1-2', stage: 1, icon: 'shapes',
    rarity: 'R', type: 'DATA', name: '質的データ', 
    desc: '分類や種類を表すデータ。「犬派・猫派」「好き・嫌い」など。計算はできないが、世界を色鮮やかに分類する言葉たち。名義尺度と順序尺度がここに含まれる。' 
  },
  { 
    id: 'r-s1-3', stage: 1, icon: 'ruler',
    rarity: 'R', type: 'DATA', name: '量的データ', 
    desc: '数値の大きさに意味があるデータ。「身長」「体重」「金額」など。足したり平均をとったりできる、分析の主役。間隔尺度と比例尺度がここに含まれる。' 
  },
  { 
    id: 'r-s1-4', stage: 1, icon: 'ghost',
    rarity: 'R', type: 'DATA', name: '外れ値', 
    desc: '他の値から極端に離れた値。平均値を狂わせる困ったちゃん。単なる入力ミスの可能性も高いが、稀にノーベル賞級の大発見や、世紀の天才が隠れていることもある。無視して消すか、仲間に入れてあげるか、それが問題だ。' 
  },

  // N (3枚): 平均値, 中央値, 最頻値
  { 
    id: 'n-s1-1', stage: 1, icon: 'scale',
    rarity: 'N', type: 'STAT', name: '平均値 (Mean)', 
    desc: 'データの合計を個数で割った値。みんな大好き「平均点」。全体のバランスを見る優等生だが、一人の大富豪がいるだけで平均年収が跳ね上がるように、極端な奴（外れ値）に振り回されやすいお人好し。' 
  },
  { 
    id: 'n-s1-2', stage: 1, icon: 'arrow-down-up',
    rarity: 'N', type: 'STAT', name: '中央値 (Median)', 
    desc: 'データを順に並べたときに中央に来る値。外れ値（変な奴）がいても動じない頑固者。「平均年収より私の年収が低いのはなぜ？」と思ったら、平均値ではなくこの中央値を見るべきだ。' 
  },
  { 
    id: 'n-s1-3', stage: 1, icon: 'crown',
    rarity: 'N', type: 'STAT', name: '最頻値 (Mode)', 
    desc: 'データの中で最も頻繁に現れる値。多数決の勝者であり、いわゆる「流行」。クラスで一番多い名字とか、売れ筋No.1商品とか。「普通はこうだよね」という感覚に一番近いかもしれない。' 
  },


  // --- STAGE 2 (Advanced / Others) ---
  
  // UR
  { 
    id: 'ur-2', stage: 2, icon: 'brain-circuit',
    rarity: 'UR', type: 'AI', name: '深層学習 (Deep Learning)', 
    desc: '多層のニューラルネットワークを用いた機械学習の手法。人間の脳を模倣したその構造は、時に開発者ですら理解不能な『神の一手』を繰り出すことがある。' 
  },
  { 
    id: 'ur-3', stage: 2, icon: 'database-zap',
    rarity: 'UR', type: 'DATA', name: 'ビッグデータ', 
    desc: '巨大で複雑なデータ群。Volume(量)、Variety(多様性)、Velocity(速度)の3Vが特徴。普通のPCで開こうとするとフリーズして悲鳴を上げる。' 
  },
  { 
    id: 'ur-4', stage: 2, icon: 'blocks',
    rarity: 'UR', type: 'NET', name: 'ブロックチェーン', 
    desc: '分散型台帳技術。取引履歴を鎖状につなぐことで改ざんを不可能にする。一度記録されたら二度と消せない、デジタル界の石碑。' 
  },
  { 
    id: 'ur-5', stage: 2, icon: 'activity',
    rarity: 'UR', type: 'STAT', name: '正規分布', 
    desc: '平均値をピークに左右対称な釣鐘型の分布。身長やテストの点数など、自然界のあらゆる事象がこの形に収束していくという「神の曲線」。' 
  },

  // SR
  { 
    id: 'sr-1', stage: 2, icon: 'git-commit-horizontal',
    rarity: 'SR', type: 'STAT', name: '相関係数 (r)', 
    desc: '2つのデータの関係の強さを表す指標。-1から1の値をとる。1に近いほど強い正の相関（片方が増えればもう片方も増える）がある。' 
  },
  { 
    id: 'sr-2', stage: 2, icon: 'trending-up',
    rarity: 'SR', type: 'DATA', name: '回帰分析', 
    desc: 'データ間の関係を数式でモデル化し、未来を予測する手法。過去のデータから直線を引いて「来月はこうなる！」と予言する。' 
  },
  { 
    id: 'sr-7', stage: 2, icon: 'bar-chart-horizontal',
    rarity: 'SR', type: 'STAT', name: '標準偏差 (σ)', 
    desc: 'データのばらつきを表す指標。平均値からの距離を測る。平均点が同じでも、全員平均点なのと、0点と100点が半々なのとでは状況が大違い。' 
  },
  { 
    id: 'sr-5', stage: 2, icon: 'pickaxe',
    rarity: 'SR', type: 'DATA', name: 'データマイニング', 
    desc: '大量のデータから有用な知識やパターンを発掘する技術。「おむつを買う客はビールも一緒に買う」などの法則を見つける。' 
  },

  // R
  { 
    id: 'r-1', stage: 2, icon: 'table-2',
    rarity: 'R', type: 'DATA', name: 'クロス集計', 
    desc: '2つ以上の項目を組み合わせて集計し、表にする手法。「性別」×「好きなアイス」のように掛け合わせると、意外な真実が見えてくる。' 
  },
  { 
    id: 'r-2', stage: 2, icon: 'candlestick-chart',
    rarity: 'R', type: 'STAT', name: '箱ひげ図', 
    desc: '四分位数を用いてデータのばらつきを可視化するグラフ。箱からヒゲが伸びている。最大・最小・中央値を一目で把握できる。' 
  },
  { 
    id: 'r-3', stage: 2, icon: 'grip',
    rarity: 'R', type: 'STAT', name: '散布図', 
    desc: '2つのデータの関係を点の集まりで表現したグラフ。点が右上がりに並べば正の相関。相性を視覚的に確認できる。' 
  },
  { 
    id: 'r-8', stage: 2, icon: 'shuffle',
    rarity: 'R', type: 'SIM', name: '乱数', 
    desc: '規則性がなく、予測不可能な数値の並び。シミュレーションや暗号鍵の生成に使われる。' 
  },

  // N
  { 
    id: 'n-4', stage: 2, icon: 'file-spreadsheet',
    rarity: 'N', type: 'DATA', name: 'CSV', 
    desc: 'カンマで区切られたテキストデータ形式。シンプルで互換性が高く、Excelでもメモ帳でも開ける八方美人。' 
  },
  { 
    id: 'n-5', stage: 2, icon: 'bar-chart-4',
    rarity: 'N', type: 'DATA', name: 'ヒストグラム', 
    desc: '度数分布表を棒グラフ状に表したもの。データの散らばり具合（分布の形）が一目瞭然になる。' 
  },
  { 
    id: 'n-9', stage: 2, icon: 'git-branch',
    rarity: 'N', type: 'SIM', name: 'アルゴリズム', 
    desc: '問題を解決するための手順や計算方法。料理のレシピのようなもの。' 
  },
];
