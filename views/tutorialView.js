
import { state } from '../gameState.js';
import { TOPIC } from '../constants.js';

export const renderTutorial = () => {
  const page = state.tutorialPage || 0;
  const step = state.tutorialStep || 0; // 0: Question, 1: Answered/Done
  const feedback = state.tutorialFeedback; // 'CORRECT', 'WRONG', null
  const module = state.tutorialModule || 'TYPES'; // 'TYPES' or 'CLEANING'

  // -- Component Helpers --
  const renderMiniGameCard = (icon, title, question, content, colorTheme = 'indigo') => `
    <div class="my-8 w-full bg-${colorTheme}-50 border-2 border-${colorTheme}-100 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-sm">
       <div class="absolute -right-10 -top-10 w-40 h-40 bg-${colorTheme}-100 rounded-full opacity-50 pointer-events-none"></div>
       
       <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
             <div class="w-10 h-10 bg-${colorTheme}-200 text-${colorTheme}-700 rounded-full flex items-center justify-center">
               <i data-lucide="${icon}" class="w-5 h-5"></i>
             </div>
             <h4 class="font-bold text-${colorTheme}-900 text-lg">${title}</h4>
          </div>
          
          <p class="text-${colorTheme}-800 font-bold mb-6 text-lg md:text-xl leading-relaxed">
             ${question}
          </p>

          ${content}
          
          ${feedback === 'WRONG' ? `
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white px-6 py-3 rounded-xl shadow-xl font-bold animate-bounce flex items-center gap-2 whitespace-nowrap z-20">
               <i data-lucide="x-circle" class="w-6 h-6"></i> 違うよ！
            </div>
          ` : ''}

          ${step === 1 ? `
            <div class="mt-6 bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm animate-fadeIn">
               <div class="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                 <i data-lucide="check-circle" class="w-5 h-5"></i> 正解！
               </div>
               ${getSuccessExplanation(module, page)}
               <div class="mt-3 text-right">
                  <span class="text-xs text-slate-400 font-bold">下の「次へ」ボタンで進みましょう <i data-lucide="arrow-down" class="w-3 h-3 inline"></i></span>
               </div>
            </div>
          ` : ''}
       </div>
    </div>
  `;

  // -- Explanation Text Generator --
  const getSuccessExplanation = (mod, currentPage) => {
     if (mod === 'TYPES') {
        if (currentPage === 0) return `<p class="text-slate-700 text-sm font-bold mb-2">電話番号は「名義尺度」です！</p><p class="text-slate-600 text-sm">見た目は数字ですが、足し算や引き算をしても意味がありません。単に個人を識別するための「ラベル」なので、<strong>質的データ</strong>です。</p>`;
        if (currentPage === 1) return `<p class="text-slate-700 text-sm font-bold mb-2">サイズは「順序尺度」です！</p><p class="text-slate-600 text-sm">S・M・Lには明確な「大小関係（順序）」があります。しかし、間隔が等しいとは限らないため、<strong>質的データ</strong>として扱います。</p>`;
        if (currentPage === 2) return `<p class="text-slate-700 text-sm font-bold mb-2">摂氏温度は「間隔尺度」です！</p><p class="text-slate-600 text-sm">0℃は絶対的な「無」ではなく基準点にすぎないため、比率の計算（2倍など）はできません。</p>`;
        if (currentPage === 3) return `<p class="text-slate-700 text-sm font-bold mb-2">金額は「比例尺度」です！</p><p class="text-slate-600 text-sm">0円は「無」を意味し、2000円は1000円の2倍です。西暦は間隔尺度です。</p>`;
     } 
     else if (mod === 'CLEANING') {
        if (currentPage === 0) return `
            <p class="text-slate-700 text-sm font-bold mb-2">よく気づきました！</p>
            <p class="text-slate-600 text-sm mb-2">「NULL（ヌル）」は<strong>値が存在しない</strong>（空っぽ）という状態を表す記号です。「0点」という点数があるのとは全く意味が違います。</p>
            <p class="text-slate-600 text-sm">また、あり得ない値や入力ミスは<strong>「異常値」</strong>と呼ばれます。分析の前にこれらを見つけて直す作業が「データクレンジング」です。</p>`;
        
        if (currentPage === 1) return `<p class="text-slate-700 text-sm font-bold mb-2">欠損値処理の基本です！</p><p class="text-slate-600 text-sm">データが十分に多ければ「削除」が安全ですが、データが少ない場合は平均値などで「埋める（代入）」こともあります。どちらも正解ですが、状況に応じて選びます。</p>`;
        
        if (currentPage === 2) return `
            <p class="text-slate-700 text-sm font-bold mb-2">これが「外れ値」です！</p>
            <p class="text-slate-600 text-sm mb-2">2500cm（25メートル）は人間としてあり得ないので、これは明らかに<strong>「異常値（入力ミス）」</strong>です。修正するか削除する必要があります。</p>
            
            <div class="my-3 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-end gap-2 h-24 justify-center">
                <div class="w-6 bg-slate-300 rounded-t h-[10%] relative group"><span class="absolute -top-4 left-0 text-[10px] w-full text-center text-slate-400">168</span></div>
                <div class="w-6 bg-slate-300 rounded-t h-[12%] relative group"><span class="absolute -top-4 left-0 text-[10px] w-full text-center text-slate-400">172</span></div>
                <div class="w-6 bg-slate-300 rounded-t h-[8%] relative group"><span class="absolute -top-4 left-0 text-[10px] w-full text-center text-slate-400">165</span></div>
                <div class="w-6 bg-rose-400 rounded-t h-full relative group"><span class="absolute top-1/2 left-0 -translate-y-1/2 text-[10px] font-bold w-full text-center text-white">2500</span></div>
                <div class="w-6 bg-slate-300 rounded-t h-[14%] relative group"><span class="absolute -top-4 left-0 text-[10px] w-full text-center text-slate-400">175</span></div>
            </div>
            <p class="text-slate-500 text-xs">一方、ミスでなくても「年収10億円」のように、他のデータと大きくかけ離れた値は<strong>「外れ値」</strong>と呼ばれます。</p>`;
        
        if (currentPage === 3) return `
            <p class="text-slate-700 text-sm font-bold mb-2">中央値（メジアン）は頑丈です！</p>
            <p class="text-slate-600 text-sm mb-2">極端な外れ値があると、平均値はその方向に引っ張られてズレてしまいますが、中央値はほとんど動きません。</p>
            
            <div class="my-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div class="relative h-16 w-full mt-6 mb-2">
                    <!-- Base Line -->
                    <div class="absolute top-1/2 left-0 right-0 h-1 bg-slate-300 rounded"></div>

                    <!-- Normal Data Cluster (Around Center/Median) -->
                    <!-- Median is centered at 50% visually -->
                    <div class="absolute top-1/2 -translate-y-1/2 left-[42%] w-3 h-3 bg-slate-400 rounded-full border border-white z-0"></div>
                    <div class="absolute top-1/2 -translate-y-1/2 left-[46%] w-3 h-3 bg-slate-400 rounded-full border border-white z-0"></div>
                    <!-- The Median Data Point -->
                    <div class="absolute top-1/2 -translate-y-1/2 left-[50%] w-4 h-4 bg-emerald-400 rounded-full border-2 border-white z-10 shadow-sm"></div> 
                    <div class="absolute top-1/2 -translate-y-1/2 left-[54%] w-3 h-3 bg-slate-400 rounded-full border border-white z-0"></div>
                    
                    <!-- Outlier (Far Right) -->
                    <div class="absolute top-1/2 -translate-y-1/2 right-[5%] w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-md animate-pulse z-0"></div>
                    
                    <!-- Median Marker (Stable Center) -->
                    <div class="absolute -top-3 bottom-0 left-[50%] w-[2px] bg-emerald-500 z-20"></div>
                    <div class="absolute -top-8 left-[50%] -translate-x-1/2 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20">
                       中央値
                    </div>
                    
                    <!-- Mean Marker (Pulled Right) -->
                    <div class="absolute -bottom-3 top-0 left-[70%] w-[2px] bg-rose-400 z-10 border-r border-rose-400 border-dashed"></div>
                     <div class="absolute -bottom-8 left-[70%] -translate-x-1/2 text-[10px] font-bold text-rose-500 flex flex-col items-center">
                        <span class="whitespace-nowrap">平均値</span>
                     </div>
                     
                    <!-- Pull Effect Visual -->
                    <div class="absolute top-1/2 left-[55%] right-[30%] h-[20px] pointer-events-none flex items-center">
                        <div class="w-full border-t-2 border-rose-300 border-dashed flex items-center justify-end">
                            <i data-lucide="arrow-right" class="w-4 h-4 text-rose-400 -mr-2"></i>
                        </div>
                    </div>
                    <div class="absolute top-[75%] left-[60%] text-[9px] text-rose-400 font-bold whitespace-nowrap">引っ張られる</div>
                </div>
            </div>
            <p class="text-slate-600 text-sm">このように、中央値はデータの中心（集団の実態）に留まりますが、平均値は外れ値の影響で実態から離れてしまうことがあります。</p>`;
     }
     return '';
  };

  // Page Content Logic
  let contentHtml = '';
  let headerTitle = 'データ分析の基礎';
  if (module === 'CLEANING') headerTitle = '代表値とデータ整理';
  
  if (module === 'TYPES') {
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
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 1</span><h3 class="text-2xl font-bold text-slate-700">データの分類</h3></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-white rounded-3xl p-6 border-l-8 border-pink-400 shadow-sm"><h4 class="text-xl font-black text-pink-500 mb-2">質的データ</h4><p class="text-slate-700 text-sm">大きさや量に意味がないデータ。</p></div><div class="bg-white rounded-3xl p-6 border-l-8 border-cyan-400 shadow-sm"><h4 class="text-xl font-black text-cyan-500 mb-2">量的データ</h4><p class="text-slate-700 text-sm">大きさに意味があるデータ。</p></div></div>${renderMiniGameCard("search", "直感トレーニング", "「電話番号」は数字だけど、計算に意味はある？", gameContent)}</div>`;
      } else if (page === 1) {
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
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 2</span><h3 class="text-2xl font-bold text-slate-700">質的データの分類</h3></div><div class="space-y-4 mb-8"><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">名義尺度</h4><p class="text-sm text-slate-600">区別するだけのラベル。</p></div><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">順序尺度</h4><p class="text-sm text-slate-600">順序に意味がある。</p></div></div>${renderMiniGameCard("shirt", "順序チェック", "「S・M・L」サイズ。並べ替える意味はある？", gameContent)}</div>`;
      } else if (page === 2) {
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
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 3</span><h3 class="text-2xl font-bold text-slate-700">量的データの分類</h3></div><div class="space-y-4 mb-8"><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">間隔尺度</h4><p class="text-sm text-slate-600">0が「無」ではない。</p></div><div class="bg-white p-4 rounded-2xl border border-slate-100"><h4 class="font-bold text-slate-800">比例尺度</h4><p class="text-sm text-slate-600">0が「無」を表す。</p></div></div>${renderMiniGameCard("snowflake", "ゼロの正体", "0℃は熱エネルギーが完全に無い？", gameContent)}</div>`;
      } else if (page === 3) {
          const isDone = step === 1;
          const gameContent = isDone ? '' : `
            <div class="grid grid-cols-2 gap-4">
               <button onclick="window.app.handleTutorialAction('check_ratio', 'YEAR')" class="h-32 rounded-xl bg-white border-b-4 border-emerald-200 text-emerald-600 font-bold flex flex-col items-center justify-center p-2"><div class="text-2xl mb-1">📅</div><span class="text-sm">西暦2000年は<br>1000年の2倍？</span></button>
               <button onclick="window.app.handleTutorialAction('check_ratio', 'MONEY')" class="h-32 rounded-xl bg-white border-b-4 border-orange-200 text-orange-600 font-bold flex flex-col items-center justify-center p-2"><div class="text-2xl mb-1">💰</div><span class="text-sm">2000円は<br>1000円の2倍？</span></button>
            </div>`;
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-emerald-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 4</span><h3 class="text-2xl font-bold text-slate-700">間隔 vs 比例 (応用)</h3></div><div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6"><p class="text-indigo-900 text-sm font-bold">倍率（× ÷）が使えるのは比例尺度だけです。</p></div>${renderMiniGameCard("divide", "倍率チェック", "「AはBの2倍」と言えるのはどっち？", gameContent)}</div>`;
      } else if (page === 4) {
          // --- Enhanced Summary for TYPES (White Theme) + Table ---
          contentHtml = `
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
  } 
  else if (module === 'CLEANING') {
      // ... (Existing CLEANING content remains unchanged) ...
      if (page === 0) {
          const isDone = step === 1;
          const gameContent = isDone ? '' : `<div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4 overflow-hidden"><table class="w-full text-sm text-center"><thead class="bg-slate-100 text-slate-500"><tr><th>ID</th><th>名前</th><th>点数</th></tr></thead><tbody class="divide-y divide-slate-100"><tr><td>001</td><td>山田</td><td>85</td></tr><tr onclick="window.app.handleTutorialAction('identify_bad', 1)" class="cursor-pointer hover:bg-slate-50 transition-colors"><td>002</td><td>佐藤</td><td>92</td></tr><tr onclick="window.app.handleTutorialAction('identify_bad', 2)" class="cursor-pointer hover:bg-slate-50 transition-colors"><td>003</td><td>鈴木</td><td class="font-bold font-mono text-slate-400">NULL</td></tr><tr><td>004</td><td>高橋</td><td>78</td></tr></tbody></table></div>`;
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 1</span><h3 class="text-2xl font-bold text-slate-700">データは汚れている？</h3></div><div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-2">オープンデータとは</h4><p class="text-slate-600 text-sm">空欄（欠損）やミスが含まれていることが多く、<strong>「データクレンジング」</strong>が必要です。</p></div>${renderMiniGameCard("trash-2", "バグ探し", "この表の中に、分析に使えない「汚れたデータ」があります。どれ？", gameContent, 'violet')}</div>`;
      } else if (page === 1) {
          const isDone = step === 1;
          const gameContent = isDone ? '' : `<div class="grid grid-cols-2 gap-4"><button onclick="window.app.handleTutorialAction('missing_strategy', 'DELETE')" class="h-24 rounded-xl bg-white border-b-4 border-rose-200 text-rose-600 font-bold p-2"><i data-lucide="trash" class="w-6 h-6 mx-auto mb-1"></i>行ごと削除</button><button onclick="window.app.handleTutorialAction('missing_strategy', 'FILL')" class="h-24 rounded-xl bg-white border-b-4 border-blue-200 text-blue-600 font-bold p-2"><i data-lucide="edit-3" class="w-6 h-6 mx-auto mb-1"></i>平均値で埋める</button></div>`;
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 2</span><h3 class="text-2xl font-bold text-slate-700">欠損値（けっそんち）</h3></div>${renderMiniGameCard("eraser", "どう処理する？", "鈴木さんの点数がわかりません。あなたならどうする？", gameContent, 'violet')}</div>`;
      } else if (page === 2) {
          // --- Updated Outlier Page: 5 Options, No Emphasis ---
          const isDone = step === 1;
          const buttons = [
              { val: 168, idx: 0 },
              { val: 172, idx: 1 },
              { val: 165, idx: 2 },
              { val: 2500, idx: 3 }, // Target (Index 3 matches logic in index.js)
              { val: 175, idx: 4 }
          ];
          const buttonsHtml = buttons.map(b => `
            <button onclick="window.app.handleTutorialAction('tap_outlier', ${b.idx})" 
              class="w-20 h-24 bg-white border-2 border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-colors shadow-sm text-slate-600 font-bold text-lg">
              ${b.val}
            </button>
          `).join('');

          const gameContent = isDone ? '' : `<div class="flex flex-wrap justify-center gap-4 mb-4">${buttonsHtml}</div>`;
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 3</span><h3 class="text-2xl font-bold text-slate-700">外れ値と異常値</h3></div>${renderMiniGameCard("alert-triangle", "異変を感知せよ", "身長のデータの中に、明らかに人間ではないデータが混ざっています...", gameContent, 'violet')}</div>`;
      } else if (page === 3) {
          const isDone = step === 1;
          const gameContent = isDone ? '' : `
            <div class="grid grid-cols-2 gap-4">
               <button onclick="window.app.handleTutorialAction('select_robust', 'MEAN')" 
                  class="h-24 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold p-2 hover:bg-slate-50 transition-colors">平均値</button>
               <button onclick="window.app.handleTutorialAction('select_robust', 'MEDIAN')" 
                  class="h-24 rounded-xl bg-white border-b-4 border-slate-200 text-slate-600 font-bold p-2 hover:bg-slate-50 transition-colors">中央値</button>
            </div>`;
          contentHtml = `<div class="animate-fadeIn w-full max-w-3xl mx-auto"><div class="flex items-center gap-3 mb-6"><span class="bg-violet-600 text-white font-bold px-3 py-1 rounded-full text-sm">STEP 4</span><h3 class="text-2xl font-bold text-slate-700">代表値の使い分け</h3></div>${renderMiniGameCard("shield", "どっちが強い？", "とてつもない外れ値が出現しました。影響を受けにくい（頑丈な）代表値はどっち？", gameContent, 'violet')}</div>`;
      } else if (page === 4) {
          // --- Enhanced Summary for CLEANING (White Theme) ---
          contentHtml = `
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
  }

  // Next Button Logic
  const canProceed = (page === 4) || (step === 1);
  const btnColor = canProceed ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg' : 'bg-slate-300 cursor-not-allowed shadow-none';

  // Common Header & Fixed Footer
  return `
    <div class="min-h-screen bg-slate-50 flex flex-col p-4 pb-24 md:p-8 overflow-y-auto relative">
      
      <!-- Header -->
      <div class="w-full max-w-4xl mx-auto flex justify-between items-center mb-8 sticky top-0 bg-slate-50/90 backdrop-blur-sm py-4 z-20 border-b border-slate-200">
        <h2 class="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
           <i data-lucide="book-open" class="w-6 h-6 md:w-8 md:h-8 text-emerald-500"></i>
           <span>${headerTitle}</span>
        </h2>
        <button onclick="window.app.resetGame()" class="bg-white hover:bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors shadow-sm border border-slate-200">
           <i data-lucide="x" class="w-4 h-4"></i> 閉じる
        </button>
      </div>

      <!-- Main Content Area -->
      ${contentHtml}

      <!-- Fixed Bottom Navigation -->
      <div class="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div class="max-w-2xl mx-auto flex items-center justify-between">
           
           <button onclick="window.app.prevTutorialPage()" 
             class="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors ${page === 0 ? 'opacity-0 pointer-events-none' : ''}">
             <i data-lucide="arrow-left" class="w-6 h-6"></i>
           </button>

           <div class="flex gap-2">
              ${[0,1,2,3,4].map(i => `
                 <div class="h-2 rounded-full transition-all duration-300 ${i === page ? 'bg-emerald-500 w-8' : 'bg-slate-300 w-2'}"></div>
              `).join('')}
           </div>

           <button onclick="${canProceed ? 'window.app.nextTutorialPage()' : ''}" 
             class="px-6 py-3 ${btnColor} text-white font-bold rounded-full flex items-center gap-2 transition-all active:scale-95">
             ${page === 4 ? '完了' : '次へ'} 
             <i data-lucide="${page === 4 ? 'check' : 'arrow-right'}" class="w-4 h-4"></i>
           </button>

        </div>
      </div>

    </div>
  `;
};
