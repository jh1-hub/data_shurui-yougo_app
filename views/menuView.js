
import { TOPIC } from '../constants.js';
import { state } from '../gameState.js';
import { GACHA_CARDS } from '../data/gachaData.js';

export const renderMenu = () => {
  // --- Calculate Collection Stats ---
  const rarityCounts = { UR: 0, SR: 0, R: 0, N: 0 };
  const rarityTotals = { UR: 0, SR: 0, R: 0, N: 0 };
  
  GACHA_CARDS.forEach(card => {
      rarityTotals[card.rarity]++;
      if (state.collection.includes(card.id)) {
          rarityCounts[card.rarity]++;
      }
  });

  const collectedCount = state.collection.length;
  const totalCards = GACHA_CARDS.length;
  const collectionPercent = Math.round((collectedCount / totalCards) * 100);

  // --- Calculate Score Stats ---
  // Generate list of topics with their scores
  const topicStats = Object.entries(TOPIC).map(([key, label]) => {
      return {
          key,
          label,
          score: state.highScores[label] || 0
      };
  });
  const totalScore = topicStats.reduce((acc, curr) => acc + curr.score, 0);

  // Helper for Rarity Bar Height
  const getBarHeight = (count, total) => {
      if (total === 0) return 0;
      return Math.max(10, Math.round((count / total) * 100));
  };

  // Helper: Mapping Topics to Required Tutorials
  const requiredTutorials = {
      'DATA_TYPES': 'TYPES',
      'CENTRAL_TENDENCY': 'CLEANING'
  };

  // Helper: Render Tutorial Button with State Logic
  const renderTutorialButton = (moduleCode, title, baseColor) => {
      const isRead = state.tutorialsRead.includes(moduleCode);
      const isTypesRead = state.tutorialsRead.includes('TYPES');
      
      // Determine if this specific button should be emphasized
      // 1. Emphasize 'TYPES' if not read.
      // 2. Emphasize 'CLEANING' if 'TYPES' IS read but 'CLEANING' is NOT.
      let isRecommended = false;
      if (moduleCode === 'TYPES' && !isRead) isRecommended = true;
      if (moduleCode === 'CLEANING' && !isRead && isTypesRead) isRecommended = true;

      let wrapperClass = "relative group cursor-pointer transition-all duration-300 rounded-xl flex items-center gap-3 p-4 text-left w-full h-full";
      let iconClass = "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110";
      let statusText = "";
      let badgeHtml = "";

      if (isRead) {
          // READ STATE: Normal, subtle
          wrapperClass += ` bg-${baseColor}-50/50 border border-${baseColor}-100 hover:bg-${baseColor}-50 hover:border-${baseColor}-300 shadow-sm`;
          iconClass += ` bg-white text-${baseColor}-500 border border-${baseColor}-100`;
          statusText = `読了済み <span class="text-[10px] opacity-70 font-normal ml-1">復習する</span>`;
      } else if (isRecommended) {
          // RECOMMENDED STATE: Emphasized
          wrapperClass += ` bg-white border-4 border-amber-400 shadow-xl hover:bg-amber-50 scale-[1.02] z-10`;
          iconClass += ` bg-amber-100 text-amber-600 border border-amber-200`;
          statusText = `<span class="text-amber-600 font-bold">🔰 解説を読む (必須)</span>`;
          badgeHtml = `
            <div class="absolute -top-3 -right-2 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce border-2 border-white z-20">
               START!
            </div>
            <div class="absolute inset-0 border-4 border-amber-400 rounded-xl animate-pulse pointer-events-none"></div>
          `;
      } else {
          // UNREAD BUT NOT RECOMMENDED (e.g. Cleaning when Types is unread): Dimmed
          wrapperClass += ` bg-slate-50 border border-slate-200 opacity-60 hover:opacity-100 hover:bg-white`;
          iconClass += ` bg-slate-200 text-slate-400`;
          statusText = `<span class="text-slate-400">未読</span>`;
      }

      return `
        <button onclick="window.app.showTutorial('${moduleCode}')" class="${wrapperClass}">
            ${badgeHtml}
            <div class="${iconClass}">
                ${isRead ? '<i data-lucide="check" class="w-6 h-6"></i>' : (isRecommended ? '<i data-lucide="book-open-check" class="w-6 h-6"></i>' : '<i data-lucide="lock" class="w-5 h-5"></i>')}
            </div>
            <div>
                <h3 class="font-bold text-slate-800 text-sm leading-tight mb-1">${title}</h3>
                <div class="text-xs ${isRead ? `text-${baseColor}-400` : (isRecommended ? 'text-amber-600' : 'text-slate-400')} font-bold">
                    ${statusText}
                </div>
            </div>
        </button>
      `;
  };

  return `
    <div class="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      
      <!-- Background Decorations -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-60 pointer-events-none">
         <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-200/40 rounded-full blur-3xl"></div>
         <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-3xl"></div>
      </div>

      <!-- Title Section -->
      <div class="text-center mb-8 animate-fadeIn">
        <div class="inline-flex items-center justify-center p-2 bg-white rounded-xl shadow-sm mb-4 border border-slate-100">
           <i data-lucide="database" class="w-6 h-6 text-emerald-500 mr-2"></i>
           <span class="text-xs font-bold text-slate-500 tracking-wider">情報 I : データ分析</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold text-slate-800 mb-2 tracking-tight drop-shadow-sm">
          DATA <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">DETECTIVE</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium">データの基礎から活用まで、ゲームで完全攻略</p>
      </div>
      
      <!-- PLAYER RECORD DASHBOARD (New Prominent Display) -->
      <div class="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 mb-10 overflow-hidden animate-fadeIn relative" style="animation-delay: 0.1s">
          <!-- Dashboard Header -->
          <div class="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 p-4 flex items-center justify-between">
             <h2 class="font-black text-slate-700 flex items-center gap-2 text-sm md:text-base tracking-wide">
                <div class="bg-indigo-500 text-white p-1.5 rounded-lg"><i data-lucide="layout-dashboard" class="w-4 h-4"></i></div>
                PLAYER RECORD
             </h2>
             <div class="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm">
                <i data-lucide="save" class="w-3 h-3"></i> AUTO SAVE ACTIVE
             </div>
          </div>
          
          <div class="flex flex-col md:flex-row">
             
             <!-- LEFT: COLLECTION STATUS -->
             <div class="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center relative">
                 <div class="absolute top-4 left-4 text-slate-300">
                    <i data-lucide="library" class="w-12 h-12 opacity-20"></i>
                 </div>
                 
                 <div class="text-center mb-6 relative z-10">
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">COLLECTION RATE</div>
                    <div class="text-4xl md:text-5xl font-black text-slate-800 flex items-baseline justify-center gap-1">
                       ${collectionPercent}<span class="text-lg text-slate-400">%</span>
                    </div>
                    <div class="text-xs font-bold text-emerald-500 mt-1">${collectedCount} / ${totalCards} Cards</div>
                 </div>

                 <!-- Rarity Bars Visualization -->
                 <div class="flex gap-3 items-end h-28 w-full max-w-[280px] justify-between mb-4 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                    <!-- UR -->
                    <div class="flex flex-col items-center gap-1 flex-1 group">
                       <div class="w-full bg-amber-100 rounded-t relative overflow-hidden transition-all hover:bg-amber-200 h-16">
                          <div class="absolute bottom-0 w-full bg-amber-400 transition-all duration-1000" style="height: ${getBarHeight(rarityCounts.UR, rarityTotals.UR)}%"></div>
                       </div>
                       <span class="text-[9px] font-black text-amber-500">UR</span>
                       <span class="text-[9px] font-bold text-slate-400">${rarityCounts.UR}/${rarityTotals.UR}</span>
                    </div>
                    <!-- SR -->
                    <div class="flex flex-col items-center gap-1 flex-1 group">
                       <div class="w-full bg-emerald-100 rounded-t relative overflow-hidden transition-all hover:bg-emerald-200 h-16">
                          <div class="absolute bottom-0 w-full bg-emerald-400 transition-all duration-1000" style="height: ${getBarHeight(rarityCounts.SR, rarityTotals.SR)}%"></div>
                       </div>
                       <span class="text-[9px] font-black text-emerald-500">SR</span>
                       <span class="text-[9px] font-bold text-slate-400">${rarityCounts.SR}/${rarityTotals.SR}</span>
                    </div>
                    <!-- R -->
                    <div class="flex flex-col items-center gap-1 flex-1 group">
                       <div class="w-full bg-blue-100 rounded-t relative overflow-hidden transition-all hover:bg-blue-200 h-16">
                          <div class="absolute bottom-0 w-full bg-blue-400 transition-all duration-1000" style="height: ${getBarHeight(rarityCounts.R, rarityTotals.R)}%"></div>
                       </div>
                       <span class="text-[9px] font-black text-blue-500">R</span>
                       <span class="text-[9px] font-bold text-slate-400">${rarityCounts.R}/${rarityTotals.R}</span>
                    </div>
                    <!-- N -->
                    <div class="flex flex-col items-center gap-1 flex-1 group">
                       <div class="w-full bg-slate-200 rounded-t relative overflow-hidden transition-all hover:bg-slate-300 h-16">
                          <div class="absolute bottom-0 w-full bg-slate-400 transition-all duration-1000" style="height: ${getBarHeight(rarityCounts.N, rarityTotals.N)}%"></div>
                       </div>
                       <span class="text-[9px] font-black text-slate-400">N</span>
                       <span class="text-[9px] font-bold text-slate-400">${rarityCounts.N}/${rarityTotals.N}</span>
                    </div>
                 </div>

                 <button onclick="window.app.showCollection()" class="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm transition-all text-xs flex items-center justify-center gap-2 hover:border-indigo-300 hover:text-indigo-600">
                    <i data-lucide="book-image" class="w-4 h-4"></i> カード一覧を見る
                 </button>
             </div>

             <!-- RIGHT: HIGH SCORE STATUS -->
             <div class="flex-1 p-6 md:p-8 bg-slate-50/50 flex flex-col relative">
                 <div class="absolute top-4 right-4 text-slate-300">
                    <i data-lucide="trophy" class="w-12 h-12 opacity-20"></i>
                 </div>

                 <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">HIGH SCORES</div>
                 
                 <div class="space-y-3 flex-1">
                    ${topicStats.map(stat => {
                        const hasScore = stat.score > 0;
                        const scoreColor = hasScore ? 'text-indigo-600' : 'text-slate-300';
                        const scoreBg = hasScore ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-100';
                        return `
                        <div class="flex justify-between items-center p-3 rounded-xl border ${scoreBg} transition-colors">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full ${hasScore ? 'bg-white text-indigo-500 shadow-sm' : 'bg-slate-100 text-slate-300'} flex items-center justify-center">
                                    <i data-lucide="${stat.key === 'DATA_TYPES' ? 'split-square-horizontal' : 'bar-chart-2'}" class="w-4 h-4"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-600">${stat.label}</span>
                            </div>
                            <span class="font-mono font-black text-lg ${scoreColor}">${stat.score}</span>
                        </div>
                        `;
                    }).join('')}
                 </div>

                 <div class="mt-6 pt-4 border-t border-slate-200 flex justify-between items-end">
                    <div class="flex flex-col">
                       <span class="text-[10px] font-bold text-slate-400 uppercase">TOTAL SCORE</span>
                       <span class="text-xs text-indigo-400 font-bold">全トピック合計</span>
                    </div>
                    <span class="text-4xl font-black text-slate-800 tracking-tighter">${totalScore}</span>
                 </div>
             </div>
          </div>
      </div>

      <!-- GAME MODES GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl relative z-10 animate-fadeIn" style="animation-delay: 0.2s">
        
        <!-- Topic Buttons -->
        ${Object.entries(TOPIC).map(([key, label]) => {
          const reqModule = requiredTutorials[key];
          const isTutorialRead = state.tutorialsRead.includes(reqModule);
          const isCooldown = state.lastPlayedTopic === label;
          const isLocked = !isTutorialRead || isCooldown;
          
          let styleClass = 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer group';
          let iconColor = 'text-emerald-600 group-hover:scale-110 transition-transform';
          let bgIcon = 'bg-emerald-50 group-hover:bg-emerald-100 transition-colors';
          let overlayIcon = '<div class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 text-emerald-400"><i data-lucide="play-circle" class="w-8 h-8 fill-emerald-50"></i></div>';
          let lockMessage = '';

          if (isLocked) {
              styleClass = 'opacity-70 cursor-not-allowed bg-slate-100 border-slate-200';
              iconColor = 'text-slate-400';
              bgIcon = 'bg-slate-200';
              
              if (!isTutorialRead) {
                  lockMessage = '解説を読んで解放';
                  overlayIcon = '<div class="absolute right-4 bg-slate-200 text-slate-500 p-2 rounded-full"><i data-lucide="book-lock" class="w-4 h-4"></i></div>';
              } else if (isCooldown) {
                  lockMessage = '休憩中 (他のモードへ)';
                  overlayIcon = '<div class="absolute right-4 bg-rose-100 text-rose-500 p-2 rounded-full"><i data-lucide="lock" class="w-4 h-4"></i></div>';
              }
          }
          
          const clickAction = isLocked ? '' : `onclick="window.app.startGame('${label}')"`;
          
          return `
          <button ${clickAction}
            class="p-5 border-2 rounded-2xl transition-all text-left flex items-center gap-4 relative overflow-hidden ${styleClass}"
            ${isLocked ? 'disabled' : ''}
          >
            <!-- Icon -->
            <div class="${bgIcon} w-14 h-14 rounded-xl flex items-center justify-center ${iconColor} shrink-0 shadow-sm">
               ${key === 'DATA_TYPES' 
                 ? '<i data-lucide="split-square-horizontal" class="w-7 h-7"></i>' 
                 : '<i data-lucide="bar-chart-2" class="w-7 h-7"></i>'}
            </div>
            
            <!-- Text -->
            <div class="flex-1">
              <h4 class="text-lg font-black ${isLocked ? 'text-slate-500' : 'text-slate-700'}">${label}</h4>
              <p class="text-xs text-slate-400 font-bold mt-0.5">
                 ${isLocked ? `<span class="text-rose-500">${lockMessage}</span>` : (key === 'DATA_TYPES' ? '仕分けゲーム & 知識クイズ' : '平均・中央・最頻値バトル')}
              </p>
            </div>

            <!-- Lock Overlay -->
            ${overlayIcon}
          </button>
        `}).join('')}
        
        <!-- Tutorial Buttons Row -->
        <div class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <!-- Tutorial 1: Data Types -->
            ${renderTutorialButton('TYPES', '解説：データの種類と尺度', 'indigo')}

            <!-- Tutorial 2: Central Tendency & Cleaning -->
            ${renderTutorialButton('CLEANING', '解説：代表値とデータ整理', 'violet')}
        </div>

      </div>
    </div>
  `;
};
