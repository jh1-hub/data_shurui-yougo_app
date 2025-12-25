
// Tutorial Content for "DATA TYPES"

export const typesContent = {
  maxPages: 4, // 0 to 4

  validate: (page, action, value) => {
    if (page === 0 && action === 'choose_type') return value === 'QUALITATIVE';
    if (page === 1 && action === 'check_order') return value === 'YES';
    if (page === 2 && action === 'check_zero') return value === 'NO';
    if (page === 3 && action === 'check_ratio') return value === 'MONEY';
    return false;
  },

  getSuccessExplanation: (page) => {
    if (page === 0) return `<p class="text-slate-700 text-sm font-bold mb-2">電話番号は「名義尺度」です！</p><p class="text-slate-600 text-sm">見た目は数字ですが、足し算や引き算をしても意味がありません。単に個人を識別するための「ラベル」なので、<strong>質的データ</strong>です。</p>`;
    if (page === 1) return `<p class="text-slate-700 text-sm font-bold mb-2">サイズは「順序尺度」です！</p><p class="text-slate-600 text-sm">S・M・Lには明確な「大小関係（順序）」があります。しかし、間隔が等しいとは限らないため、<strong>質的データ</strong>として扱います。</p>`;
    if (page === 2) return `<p class="text-slate-700 text-sm font-bold mb-2">摂氏温度は「間隔尺度」です！</p><p class="text-slate-600 text-sm">0℃は絶対的な「無」ではなく基準点にすぎないため、比率の計算（2倍など）はできません。</p>`;
    if (page === 3) return `<p class="text-slate-700 text-sm font-bold mb-2">金額は「比例尺度」です！</p><p class="text-slate-600 text-sm">0円は「無」を意味し、2000円は1000円の2倍です。西暦は間隔尺度です。</p>`;
    return '';
  },

  renderPage: (page, step, renderCard) => {
    // Page 0: Qualitative vs Quantitative
    if (page === 0) {
      const isDone = step === 1;
      const gameContent = isDone ? '' : `
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center mb-6">
            <div class="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">TARGET DATA</div>
            <div class="text-3xl font-black text-slate-800 mb-1">電話番号</div>
            <div class="text-slate-500 font-mono">090-1234-5678</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('choose_type', 'QUALITATIVE')" 
             class="h-20 rounded-xl bg-white border-b-4 border-pink-200 text-pink-500 hover:bg-pink-50 transition-all font-bold text-lg flex flex-col items-center justify-center"><i data-lucide="tag" class="w-6 h-6 mb-1"></i> 質的データ</button>
           <button onclick="window.app.handleTutorialAction('choose_type', 'QUANTITATIVE')"
             class="h-20 rounded-xl bg-white border-b-4 border-cyan-200 text-cyan-500 hover:bg-cyan-50 transition-all font-bold text-lg flex flex-col items-center justify-center"><i data-lucide="ruler" class="w-6 h-6 mb-1"></i> 量的データ</button>
        </div>`;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 1</span><h3 class="text-2xl font-bold text-slate-700">データの分類</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-white rounded-3xl p-6 border-l-8 border-pink-400 shadow-sm"><h4 class="text-xl font-black text-pink-500 mb-2">質的データ</h4><p class="text-slate-700 text-sm">大きさや量に意味がないデータ。</p></div><div class="bg-white rounded-3xl p-6 border-l-8 border-cyan-400 shadow-sm"><h4 class="text-xl font-black text-cyan-500 mb-2">量的データ</h4><p class="text-slate-700 text-sm">大きさに意味があるデータ。</p></div></div>${renderCard("search", "直感トレーニング", "「電話番号」は数字だけど、計算に意味はある？", gameContent)}</div>`;
    }

    // Page 1: Ordinal
    if (page === 1) {
      const isDone = step === 1;
      const gameContent = isDone ? '' : `
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center mb-6">
            <div class="text-3xl font-black text-slate-800 mb-1">S・M・L</div>
            <div class="text-slate-500 font-bold">Tシャツのサイズ</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('check_order', 'YES')" class="h-24 rounded-xl bg-white border-b-4 border-blue-200 text-blue-600 font-bold p-2"><i data-lucide="list-ordered" class="w-6 h-6 mx-auto mb-1"></i>順序ある</button>
           <button onclick="window.app.handleTutorialAction('check_order', 'NO')" class="h-24 rounded-xl bg-white border-b-4 border-violet-200 text-violet-600 font-bold p-2"><i data-lucide="shuffle" class="w-6 h-6 mx-auto mb-1"></i>順序なし</button>
        </div>`;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 2</span><h3 class="text-2xl font-bold text-slate-700">質的データの分類</h3></div><div class="space-y-4 mb-8"><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">名義尺度</h4><p class="text-sm text-slate-600">区別するだけのラベル。</p></div><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">順序尺度</h4><p class="text-sm text-slate-600">順序に意味がある。</p></div></div>${renderCard("shirt", "順序チェック", "「S・M・L」サイズ。並べ替える意味はある？", gameContent)}</div>`;
    }

    // Page 2: Interval (Zero concept)
    if (page === 2) {
      const isDone = step === 1;
      const gameContent = isDone ? '' : `
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center mb-6">
            <div class="text-3xl font-black text-slate-800 mb-1">0 ℃</div>
            <div class="text-slate-500 font-bold">摂氏温度のゼロ</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('check_zero', 'YES')" class="h-28 rounded-xl bg-white border-b-4 border-orange-200 text-orange-600 font-bold p-2 text-sm">熱が「無い」<br>絶対原点</button>
           <button onclick="window.app.handleTutorialAction('check_zero', 'NO')" class="h-28 rounded-xl bg-white border-b-4 border-emerald-200 text-emerald-600 font-bold p-2 text-sm">ただの基準<br>相対的</button>
        </div>`;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 3</span><h3 class="text-2xl font-bold text-slate-700">量的データの分類</h3></div><div class="space-y-4 mb-8"><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">間隔尺度</h4><p class="text-sm text-slate-600">0が「無」ではない。</p></div><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">比例尺度</h4><p class="text-sm text-slate-600">0が「無」を表す。</p></div></div>${renderCard("snowflake", "ゼロの正体", "0℃は熱エネルギーが完全に無い？", gameContent)}</div>`;
    }

    // Page 3: Ratio (Calculation)
    if (page === 3) {
      const isDone = step === 1;
      const gameContent = isDone ? '' : `
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('check_ratio', 'YEAR')" class="h-32 rounded-xl bg-white border-b-4 border-emerald-200 text-emerald-600 font-bold flex flex-col items-center justify-center p-2"><div class="text-2xl mb-1">📅</div><span class="text-sm">西暦2000年は<br>1000年の2倍？</span></button>
           <button onclick="window.app.handleTutorialAction('check_ratio', 'MONEY')" class="h-32 rounded-xl bg-white border-b-4 border-orange-200 text-orange-600 font-bold flex flex-col items-center justify-center p-2"><div class="text-2xl mb-1">💰</div><span class="text-sm">2000円は<br>1000円の2倍？</span></button>
        </div>`;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 4</span><h3 class="text-2xl font-bold text-slate-700">間隔 vs 比例 (応用)</h3></div><div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6"><p class="text-indigo-900 text-sm font-bold">倍率（× ÷）が使えるのは比例尺度だけです。</p></div>${renderCard("divide", "倍率チェック", "「AはBの2倍」と言えるのはどっち？", gameContent)}</div>`;
    }

    // Page 4: Summary
    if (page === 4) {
      return `
        <div class="animate-fadeIn w-full max-w-4xl mx-auto pb-8">
           <div class="bg-white text-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 mb-8 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <h3 class="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3 text-slate-800">
                 <i data-lucide="check-circle-2" class="w-8 h-8 text-emerald-500"></i>
                 学習完了！データの種類まとめ
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
                 <!-- Qualitative -->
                 <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div class="flex items-center gap-2 mb-3 text-pink-500 font-bold text-lg">
                       <i data-lucide="tag" class="w-5 h-5"></i> 質的データ
                    </div>
                    <p class="text-slate-600 text-sm mb-4">分類や種類を表すデータ。計算しても意味がない。</p>
                    <div class="space-y-3">
                       <div class="bg-white p-3 rounded-lg border-l-4 border-pink-400 shadow-sm">
                          <span class="block text-xs text-slate-400 font-bold">区別するだけ</span>
                          <span class="font-bold text-slate-700">名義尺度</span>
                          <div class="text-xs text-slate-500 mt-1">例：電話番号、血液型</div>
                       </div>
                       <div class="bg-white p-3 rounded-lg border-l-4 border-pink-400 shadow-sm">
                          <span class="block text-xs text-slate-400 font-bold">順序がある</span>
                          <span class="font-bold text-slate-700">順序尺度</span>
                          <div class="text-xs text-slate-500 mt-1">例：S・M・L、ランキング</div>
                       </div>
                    </div>
                 </div>

                 <!-- Quantitative -->
                 <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div class="flex items-center gap-2 mb-3 text-cyan-600 font-bold text-lg">
                       <i data-lucide="ruler" class="w-5 h-5"></i> 量的データ
                    </div>
                    <p class="text-slate-600 text-sm mb-4">数値の大きさに意味があるデータ。計算ができる。</p>
                    <div class="space-y-3">
                       <div class="bg-white p-3 rounded-lg border-l-4 border-cyan-500 shadow-sm">
                          <span class="block text-xs text-slate-400 font-bold">目盛りの間隔</span>
                          <span class="font-bold text-slate-700">間隔尺度</span>
                          <div class="text-xs text-slate-500 mt-1">例：気温(℃)、西暦、偏差値</div>
                       </div>
                       <div class="bg-white p-3 rounded-lg border-l-4 border-cyan-500 shadow-sm">
                          <span class="block text-xs text-slate-400 font-bold">比率・倍率</span>
                          <span class="font-bold text-slate-700">比例尺度</span>
                          <div class="text-xs text-slate-500 mt-1">例：身長、重さ、金額、時間</div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- Scales Comparison Table -->
              <div class="mb-8 relative z-10 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                 <div class="bg-slate-100 p-3 border-b border-slate-200 font-bold text-slate-700 text-center text-sm">
                    <i data-lucide="table-2" class="w-4 h-4 inline mr-1"></i>
                    尺度と計算の可否まとめ
                 </div>
                 <table class="w-full text-sm text-center bg-white">
                    <thead>
                       <tr class="text-xs text-slate-500 border-b border-slate-100 bg-slate-50/50">
                          <th class="py-2 px-1 w-1/4">尺度名</th>
                          <th class="py-2 px-1">特徴</th>
                          <th class="py-2 px-1 text-xs">大小<br><span class="scale-75 inline-block">(＞＜)</span></th>
                          <th class="py-2 px-1 text-xs">差<br><span class="scale-75 inline-block">(＋－)</span></th>
                          <th class="py-2 px-1 text-xs">比<br><span class="scale-75 inline-block">(×÷)</span></th>
                       </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                       <tr class="group hover:bg-pink-50 transition-colors">
                          <td class="py-3 px-2 font-bold text-pink-600 bg-pink-50/30">名義尺度</td>
                          <td class="py-3 px-2 text-left text-xs text-slate-600">区別するだけ</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                       </tr>
                       <tr class="group hover:bg-pink-50 transition-colors">
                          <td class="py-3 px-2 font-bold text-pink-600 bg-pink-50/30">順序尺度</td>
                          <td class="py-3 px-2 text-left text-xs text-slate-600">順序がある</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                       </tr>
                       <tr class="group hover:bg-cyan-50 transition-colors">
                          <td class="py-3 px-2 font-bold text-cyan-600 bg-cyan-50/30">間隔尺度</td>
                          <td class="py-3 px-2 text-left text-xs text-slate-600">間隔が等しい</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                          <td class="py-3 px-2 text-slate-300 font-bold">×</td>
                       </tr>
                       <tr class="group hover:bg-cyan-50 transition-colors">
                          <td class="py-3 px-2 font-bold text-cyan-600 bg-cyan-50/30">比例尺度</td>
                          <td class="py-3 px-2 text-left text-xs text-slate-600">0が「無」を表す</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                          <td class="py-3 px-2 text-emerald-500 font-bold">○</td>
                       </tr>
                    </tbody>
                 </table>
              </div>

              <!-- Optional Challenge Button for Normal Mode -->
              <div class="text-center">
                <button onclick="window.app.markTutorialAndPlay('TYPES', 'NORMAL')" 
                  class="bg-indigo-50 border-2 border-indigo-100 hover:bg-indigo-100 text-indigo-700 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 mx-auto"
                >
                   <div class="bg-indigo-200 w-8 h-8 rounded-full flex items-center justify-center">
                      <i data-lucide="dumbbell" class="w-4 h-4"></i>
                   </div>
                   <span>練習：仕分けゲームに挑戦 (Normal Mode)</span>
                </button>
                <p class="text-xs text-slate-400 mt-2">※ここから始めると本番モードが解放されます</p>
              </div>

           </div>
        </div>
      `;
    }
    return '';
  }
};
