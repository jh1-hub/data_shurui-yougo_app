
// Tutorial Content for "CLEANING & CENTRAL TENDENCY"

export const cleaningContent = {
  maxPages: 7, // 0 to 7 (Added 3 pages: Mean, Median, Mode)

  validate: (page, action, value) => {
    // 0: Bad Data (Null)
    if (page === 0 && action === 'identify_bad') return value === 2;
    // 1: Missing Data Strategy (Any is OK)
    if (page === 1 && action === 'missing_strategy') return true;
    // 2: Outliers (Extreme value)
    if (page === 2 && action === 'tap_outlier') return value === 3;
    // 3: MEAN (New) - Calculate Average
    if (page === 3 && action === 'check_mean') return value === 5;
    // 4: MEDIAN (New) - Find Middle
    if (page === 4 && action === 'check_median') return value === 8;
    // 5: MODE (New) - Find Most Frequent
    if (page === 5 && action === 'check_mode') return value === 'BURGER';
    // 6: Robustness (Mean vs Median)
    if (page === 6 && action === 'select_robust') return value === 'MEDIAN';
    
    return false;
  },

  getSuccessExplanation: (page) => {
    if (page === 0) return `
        <p class="text-slate-700 text-sm font-bold mb-2">よく気づきました！</p>
        <p class="text-slate-600 text-sm mb-2">「NULL（ヌル）」は<strong>値が存在しない</strong>（空っぽ）という状態を表す記号です。「0点」という点数があるのとは全く意味が違います。</p>
        <p class="text-slate-600 text-sm">また、あり得ない値や入力ミスは<strong>「異常値」</strong>と呼ばれます。分析の前にこれらを見つけて直す作業が「データクレンジング」です。</p>`;
    
    if (page === 1) return `<p class="text-slate-700 text-sm font-bold mb-2">欠損値処理の基本です！</p><p class="text-slate-600 text-sm">データが十分に多ければ「削除」が安全ですが、データが少ない場合は平均値などで「埋める（代入）」こともあります。どちらも正解ですが、状況に応じて選びます。</p>`;
    
    if (page === 2) return `
        <p class="text-slate-700 text-sm font-bold mb-2">これが「外れ値」です！</p>
        <p class="text-slate-600 text-sm mb-2">2500cm（25メートル）は人間としてあり得ないので、これは明らかに<strong>「異常値（入力ミス）」</strong>です。修正するか削除する必要があります。</p>
        <div class="bg-white p-2 rounded border border-slate-200 text-xs text-slate-500 mt-2">一方、ミスでなくても「年収10億円」のように、他のデータと大きくかけ離れた値は<strong>「外れ値」</strong>と呼ばれます。</div>`;

    // New Mean Explanation
    if (page === 3) return `
        <p class="text-slate-700 text-sm font-bold mb-2">正解！平均値は「5」です。</p>
        <p class="text-slate-600 text-sm">平均値は、デコボコしたデータを<strong>平らにならす（平準化する）</strong>と考えましょう。すべての値を足して、個数で割ると求められます。</p>
        <p class="text-slate-500 text-xs mt-1 bg-slate-50 p-2 rounded">合計15 ÷ 3個 = 5</p>`;

    // New Median Explanation
    if (page === 4) return `
        <p class="text-slate-700 text-sm font-bold mb-2">正解！中央値は「8」です。</p>
        <p class="text-slate-600 text-sm">データを<strong>小さい順に並べたとき、真ん中に来る値</strong>が中央値（メジアン）です。外れ値（100）に惑わされず、ど真ん中を選ぶのがポイントです。</p>
        <p class="text-slate-500 text-xs mt-1 bg-slate-50 p-2 rounded">並び順：2, 5, <span class="font-bold text-emerald-600">8</span>, 50, 100</p>`;

    // New Mode Explanation
    if (page === 5) return `
        <p class="text-slate-700 text-sm font-bold mb-2">正解！最頻値はハンバーガーです。</p>
        <p class="text-slate-600 text-sm">データの中で<strong>最も回数が多い（頻出する）値</strong>が最頻値（モード）です。多数決で勝ったもの、あるいは「流行」と考えると分かりやすいです。</p>`;

    if (page === 6) return `
        <p class="text-slate-700 text-sm font-bold mb-2">中央値（メジアン）は頑丈です！</p>
        <p class="text-slate-600 text-sm mb-2">極端な外れ値があると、平均値はその方向に引っ張られてズレてしまいますが、中央値はほとんど動きません。</p>
        <p class="text-slate-600 text-sm">グラフを見ると、中央値はまだ「一般の人々」の中にいますが、平均値は誰もいない場所に移動してしまっていることがわかります。</p>`;

    return '';
  },

  renderPage: (page, step, renderCard) => {
    const isDone = step === 1;

    // Page 0: Bad Data
    if (page === 0) {
      // Table always visible
      const visualContent = `<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4 overflow-hidden"><table class="w-full text-sm text-center"><thead class="bg-slate-100 text-slate-500"><tr><th>ID</th><th>名前</th><th>点数</th></tr></thead><tbody class="divide-y divide-slate-100"><tr><td>001</td><td>山田</td><td>85</td></tr><tr onclick="window.app.handleTutorialAction('identify_bad', 1)" class="cursor-pointer hover:bg-slate-50 transition-colors"><td>002</td><td>佐藤</td><td>92</td></tr><tr onclick="window.app.handleTutorialAction('identify_bad', 2)" class="cursor-pointer hover:bg-slate-50 transition-colors"><td>003</td><td>鈴木</td><td class="font-bold font-mono text-slate-400">NULL</td></tr><tr><td>004</td><td>高橋</td><td>78</td></tr></tbody></table></div>`;
      const gameContent = visualContent;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 1</span><h3 class="text-2xl font-bold text-slate-700">データは汚れている？</h3></div><div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-2">オープンデータとは</h4><p class="text-slate-600 text-sm">空欄（欠損）やミスが含まれていることが多く、<strong>「データクレンジング」</strong>が必要です。</p></div>${renderCard("trash-2", "バグ探し", "この表の中に、分析に使えない「汚れたデータ」があります。どれ？", gameContent, 'violet')}</div>`;
    }

    // Page 1: Missing Data Strategy (Buttons only)
    if (page === 1) {
      const gameContent = isDone ? '' : `<div class="grid grid-cols-2 gap-4"><button onclick="window.app.handleTutorialAction('missing_strategy', 'DELETE')" class="h-24 rounded-xl bg-white border-b-4 border-rose-200 text-rose-600 font-bold p-2"><i data-lucide="trash" class="w-6 h-6 mx-auto mb-1"></i>行ごと削除</button><button onclick="window.app.handleTutorialAction('missing_strategy', 'FILL')" class="h-24 rounded-xl bg-white border-b-4 border-blue-200 text-blue-600 font-bold p-2"><i data-lucide="edit-3" class="w-6 h-6 mx-auto mb-1"></i>平均値で埋める</button></div>`;
      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 2</span><h3 class="text-2xl font-bold text-slate-700">欠損値（けっそんち）</h3></div>${renderCard("eraser", "どう処理する？", "鈴木さんの点数がわかりません。あなたならどうする？", gameContent, 'violet')}</div>`;
    }

    // Page 2: Outliers (Graph + Buttons)
    if (page === 2) {
      const buttons = [{ val: 168, idx: 0 }, { val: 172, idx: 1 }, { val: 165, idx: 2 }, { val: 2500, idx: 3 }, { val: 175, idx: 4 }];
      const buttonsHtml = buttons.map(b => `
        <button onclick="window.app.handleTutorialAction('tap_outlier', ${b.idx})" class="w-20 h-24 bg-white border-2 border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-colors shadow-sm text-slate-600 font-bold text-lg hover:shadow-md hover:-translate-y-1">${b.val}</button>
      `).join('');
      
      const visualContent = `
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 flex items-center justify-center h-28 relative">
            <div class="absolute bottom-4 left-4 right-4 h-0.5 bg-slate-300"></div>
            <!-- Normal values visual -->
            <div class="absolute bottom-4 left-[20%] flex gap-1 items-end">
               <div class="w-3 h-8 bg-violet-300 rounded-t"></div>
               <div class="w-3 h-10 bg-violet-300 rounded-t"></div>
               <div class="w-3 h-7 bg-violet-300 rounded-t"></div>
               <div class="w-3 h-9 bg-violet-300 rounded-t"></div>
            </div>
            <!-- The outlier visual -->
            <div class="absolute bottom-4 right-[20%] w-3 h-20 bg-slate-300 rounded-t border border-dashed border-slate-400 opacity-50"></div>
            <div class="absolute top-2 right-[15%] text-[10px] text-slate-400 font-bold bg-white px-2 rounded shadow-sm">？</div>
        </div>`;
        
      const gameContent = visualContent + (isDone ? '' : `<div class="flex flex-wrap justify-center gap-4 mb-4">${buttonsHtml}</div>`);

      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 3</span><h3 class="text-2xl font-bold text-slate-700">外れ値と異常値</h3></div>${renderCard("alert-triangle", "異変を感知せよ", "身長のデータの中に、明らかに人間ではないデータが混ざっています...", gameContent, 'violet')}</div>`;
    }

    // Page 3: Mean (Visual + Buttons)
    if (page === 3) {
      const visualContent = `
        <div class="flex justify-center items-end gap-4 h-32 mb-6 border-b-2 border-slate-200 pb-1">
            <div class="w-16 bg-indigo-300 rounded-t flex items-end justify-center pb-2 text-white font-bold text-xl h-[20%]">2</div>
            <div class="w-16 bg-indigo-500 rounded-t flex items-end justify-center pb-2 text-white font-bold text-xl h-[100%] shadow-lg">10</div>
            <div class="w-16 bg-indigo-300 rounded-t flex items-end justify-center pb-2 text-white font-bold text-xl h-[30%]">3</div>
        </div>
        <p class="text-center text-sm text-slate-500 mb-4 font-bold">デコボコを平らにならすと？ (合計15)</p>`;
        
      const buttonsHtml = `
        <div class="grid grid-cols-3 gap-2">
           <button onclick="window.app.handleTutorialAction('check_mean', 4)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">4</button>
           <button onclick="window.app.handleTutorialAction('check_mean', 5)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">5</button>
           <button onclick="window.app.handleTutorialAction('check_mean', 6)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">6</button>
        </div>`;

      const gameContent = visualContent + (isDone ? '' : buttonsHtml);

      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-indigo-500 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 4</span><h3 class="text-2xl font-bold text-slate-700">代表値 ① 平均値 (Mean)</h3></div>${renderCard("scale", "平らにならせ！", "3つのデータの高さを揃えると、いくつになる？", gameContent, 'indigo')}</div>`;
    }

    // Page 4: Median (Visual + Buttons)
    if (page === 4) {
      const visualContent = `
        <div class="flex justify-center gap-2 mb-2">
            <div class="bg-slate-100 p-2 rounded text-xs text-slate-400 font-bold">バラバラのデータ</div>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
            <div class="w-12 h-16 bg-white border border-slate-300 rounded flex items-center justify-center font-bold text-slate-400">8</div>
            <div class="w-12 h-16 bg-white border border-slate-300 rounded flex items-center justify-center font-bold text-rose-400">100</div>
            <div class="w-12 h-16 bg-white border border-slate-300 rounded flex items-center justify-center font-bold text-slate-400">5</div>
            <div class="w-12 h-16 bg-white border border-slate-300 rounded flex items-center justify-center font-bold text-slate-400">2</div>
            <div class="w-12 h-16 bg-white border border-slate-300 rounded flex items-center justify-center font-bold text-slate-400">50</div>
        </div>
        <p class="text-center text-sm text-slate-500 mb-4 font-bold">小さい順に並べたとき、真ん中に来るのは？</p>`;
        
      const buttonsHtml = `
        <div class="grid grid-cols-3 gap-2">
           <button onclick="window.app.handleTutorialAction('check_median', 5)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">5</button>
           <button onclick="window.app.handleTutorialAction('check_median', 8)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">8</button>
           <button onclick="window.app.handleTutorialAction('check_median', 50)" class="h-16 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-xl hover:bg-slate-50 transition-colors">50</button>
        </div>`;

      const gameContent = visualContent + (isDone ? '' : buttonsHtml);

      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-500 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 5</span><h3 class="text-2xl font-bold text-slate-700">代表値 ② 中央値 (Median)</h3></div>${renderCard("arrow-down-up", "整列せよ！", "データを並び替えて、真ん中を見つけよう。", gameContent, 'emerald')}</div>`;
    }

    // Page 5: Mode (Visual + Buttons)
    if (page === 5) {
      const visualContent = `
        <div class="grid grid-cols-4 gap-2 mb-6 p-4 bg-slate-50 rounded-xl">
            <div class="text-3xl text-center">🍔</div>
            <div class="text-3xl text-center">🍟</div>
            <div class="text-3xl text-center">🍔</div>
            <div class="text-3xl text-center">🍕</div>
            <div class="text-3xl text-center">🍔</div>
            <div class="text-3xl text-center">🍟</div>
            <div class="text-3xl text-center">🍔</div>
            <div class="text-3xl text-center">🌭</div>
        </div>`;
      
      const buttonsHtml = `
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('check_mode', 'BURGER')" class="h-20 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-3xl flex items-center justify-center hover:bg-slate-50 transition-colors">🍔</button>
           <button onclick="window.app.handleTutorialAction('check_mode', 'FRIES')" class="h-20 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold text-3xl flex items-center justify-center hover:bg-slate-50 transition-colors">🍟</button>
        </div>`;

      const gameContent = visualContent + (isDone ? '' : buttonsHtml);

      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-amber-500 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 6</span><h3 class="text-2xl font-bold text-slate-700">代表値 ③ 最頻値 (Mode)</h3></div>${renderCard("crown", "流行を探せ！", "一番たくさんあるデータ（多数派）はどれ？", gameContent, 'amber')}</div>`;
    }

    // Page 6: Robustness (Mean vs Median) - Was Page 3
    if (page === 6) {
      // Hide the hint until step is completed (isDone)
      const resultVisuals = isDone ? `
            <!-- Result Indicators -->
            <!-- Median Marker -->
            <div class="absolute bottom-12 left-[18%] h-32 w-[2px] bg-emerald-400 z-0 opacity-0 animate-fadeIn" style="animation-delay: 0.1s; animation-fill-mode: forwards;"></div>
            <div class="absolute bottom-44 left-[18%] -translate-x-1/2 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded shadow-sm opacity-0 animate-fadeIn whitespace-nowrap" style="animation-delay: 0.2s; animation-fill-mode: forwards;">
               中央値<br><span class="text-[10px] font-normal">(動かない)</span>
            </div>

            <!-- Mean Marker -->
            <div class="absolute bottom-12 left-[50%] h-32 w-[2px] bg-rose-400 z-0 opacity-0 animate-fadeIn" style="animation-delay: 0.4s; animation-fill-mode: forwards;"></div>
            <div class="absolute bottom-44 left-[50%] -translate-x-1/2 bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-1 rounded shadow-sm opacity-0 animate-fadeIn whitespace-nowrap" style="animation-delay: 0.5s; animation-fill-mode: forwards;">
               平均値<br><span class="text-[10px] font-normal">(ズレる)</span>
            </div>

            <!-- Pull Arrow -->
            <div class="absolute bottom-28 left-[20%] w-[28%] h-12 border-b-2 border-dashed border-rose-300 flex items-end justify-end opacity-0 animate-fadeIn" style="animation-delay: 0.8s; animation-fill-mode: forwards;">
               <i data-lucide="chevron-right" class="w-5 h-5 text-rose-400 -mb-2.5 -mr-2"></i>
               <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-rose-400 font-bold whitespace-nowrap bg-white/80 px-1 rounded">引っ張られる！</span>
            </div>` : '';

      const visualContent = `
        <!-- Robustness Visualization -->
        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 relative h-64 select-none overflow-hidden shadow-inner flex flex-col justify-end pb-12">
            <div class="absolute bottom-12 left-4 right-4 h-1 bg-slate-300 rounded"></div>
            
            <!-- Normal Group -->
            <div class="absolute bottom-[52px] left-[10%] flex gap-1">
                <div class="w-8 h-8 bg-indigo-300 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-white font-bold">1</div>
                <div class="w-8 h-8 bg-indigo-300 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-white font-bold">2</div>
                <div class="w-8 h-8 bg-indigo-300 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-white font-bold">3</div>
            </div>
            <div class="absolute bottom-4 left-[10%] text-xs font-bold text-indigo-400 whitespace-nowrap">一般の人々</div>
            
            <!-- The Outlier -->
            <div class="absolute bottom-[52px] right-[10%] w-10 h-10 bg-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
                <span class="text-white font-bold text-xs">外</span>
            </div>
            <div class="absolute bottom-4 right-[8%] text-xs font-bold text-rose-500 whitespace-nowrap">超・富裕層</div>

            ${resultVisuals}
        </div>`;

      const buttonsHtml = `
        <div class="grid grid-cols-2 gap-4">
           <button onclick="window.app.handleTutorialAction('select_robust', 'MEAN')" 
              class="h-24 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold p-2 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1">
              <span class="text-lg">平均値</span>
              <span class="text-[10px] text-slate-400 font-normal">全員の合計で計算</span>
           </button>
           <button onclick="window.app.handleTutorialAction('select_robust', 'MEDIAN')" 
              class="h-24 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold p-2 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1">
              <span class="text-lg">中央値</span>
              <span class="text-[10px] text-slate-400 font-normal">真ん中の人を選ぶ</span>
           </button>
        </div>`;

      const gameContent = visualContent + (isDone ? '' : buttonsHtml);

      return `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-rose-500 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 7</span><h3 class="text-2xl font-bold text-slate-700">代表値の使い分け</h3></div>${renderCard("shield", "どっちが強い？", "とてつもない外れ値が出現しました。影響を受けにくい（頑丈な）代表値はどっち？", gameContent, 'rose')}</div>`;
    }

    // Page 7: Summary - Was Page 4
    if (page === 7) {
      return `
        <div class="animate-fadeIn w-full max-w-4xl mx-auto pb-8">
           <div class="bg-white text-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 mb-8 relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <h3 class="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3 text-slate-800">
                 <i data-lucide="check-circle-2" class="w-8 h-8 text-violet-500"></i>
                 学習完了！データ整理まとめ
              </h3>
              
              <div class="space-y-6 relative z-10">
                 <!-- 1. Cleaning -->
                 <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h4 class="font-bold text-lg text-rose-600 mb-3 flex items-center gap-2"><i data-lucide="trash-2" class="w-5 h-5"></i> 汚れたデータ</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                            <span class="text-xs font-bold text-slate-400 block mb-1">欠損値 (NULL)</span>
                            <p class="text-sm text-slate-700">値が空っぽの状態。行ごと削除するか、平均値などで埋める。</p>
                        </div>
                         <div class="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                            <span class="text-xs font-bold text-slate-400 block mb-1">異常値と外れ値</span>
                            <p class="text-sm text-slate-700">
                               <span class="font-bold text-rose-500">異常値</span>：入力ミスなど。修正か削除。<br>
                               <span class="font-bold text-amber-500">外れ値</span>：極端だが正しい値。分析に含めるか検討。
                            </p>
                        </div>
                    </div>
                 </div>

                 <!-- 2. Mean vs Median vs Mode Comparison Table -->
                 <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h4 class="font-bold text-lg text-emerald-600 mb-3 flex items-center gap-2"><i data-lucide="scale" class="w-5 h-5"></i> 代表値の比較</h4>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr class="text-slate-500 border-b border-slate-200 bg-slate-100">
                                    <th class="p-3 w-1/5 font-bold"></th>
                                    <th class="p-3 font-bold text-slate-700 w-1/4">特徴</th>
                                    <th class="p-3 font-bold text-emerald-600 w-1/4">メリット</th>
                                    <th class="p-3 font-bold text-rose-500 w-1/4">デメリット</th>
                                </tr>
                            </thead>
                            <tbody class="text-slate-700">
                                <!-- Mean Row -->
                                <tr class="border-b border-slate-200 bg-white">
                                    <td class="p-3 font-bold text-slate-700 bg-slate-50">平均値<br><span class="text-xs text-slate-400 font-normal">(Mean)</span></td>
                                    <td class="p-3">データの合計 ÷ 個数。<br>すべてのデータを考慮する。</td>
                                    <td class="p-3">全体の変化を敏感に反映する。<br>数学的に扱いやすい。</td>
                                    <td class="p-3"><span class="font-bold text-rose-500">外れ値に弱い</span>（引っ張られる）。</td>
                                </tr>
                                <!-- Median Row -->
                                <tr class="border-b border-slate-200 bg-slate-50/50">
                                    <td class="p-3 font-bold text-slate-700 bg-slate-50">中央値<br><span class="text-xs text-slate-400 font-normal">(Median)</span></td>
                                    <td class="p-3">順位が真ん中の値。<br>データの位置だけを見る。</td>
                                    <td class="p-3"><span class="font-bold text-emerald-600">外れ値の影響を受けない。</span><br>「普通の感覚」に近い。</td>
                                    <td class="p-3">全体の変動を捉えにくい。<br>数学的な計算が難しい。</td>
                                </tr>
                                <!-- Mode Row -->
                                <tr class="bg-white">
                                    <td class="p-3 font-bold text-slate-700 bg-slate-50">最頻値<br><span class="text-xs text-slate-400 font-normal">(Mode)</span></td>
                                    <td class="p-3">最も頻繁に出現する値。<br>多数決の勝者。</td>
                                    <td class="p-3"><span class="font-bold text-emerald-600">質的データ</span>にも使える。<br>もっとも一般的。</td>
                                    <td class="p-3">データが少ないと意味がない。<br>山の頂上が複数あることも。</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      `;
    }
    return '';
  }
};
