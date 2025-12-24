
import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

export const renderResult = () => {
  const isGachaTime = state.isGachaAnimating;
  const gachaCard = state.gachaResult;
  const hasDrawn = state.hasDrawnGacha;
  const isPracticeMode = state.currentLevel === 'NORMAL'; // Check if this was a tutorial practice run

  // --- Gacha Animation View (Loading) ---
  if (isGachaTime) {
      return `
        <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 overflow-hidden relative">
           <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black"></div>
           
           <!-- Particle Stream Effect -->
           <div class="absolute inset-0 opacity-30">
              <div class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent animate-[fall_2s_linear_infinite]"></div>
              <div class="absolute top-0 left-2/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-[fall_3s_linear_infinite_0.5s]"></div>
              <div class="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-[fall_2.5s_linear_infinite_1s]"></div>
           </div>

           <div class="relative z-10 flex flex-col items-center">
              <div class="relative">
                  <div class="absolute inset-0 bg-emerald-500 blur-xl opacity-50 animate-pulse"></div>
                  <div class="w-32 h-48 bg-white/10 backdrop-blur-md rounded-xl border-2 border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-[spin_1s_linear_infinite]">
                     <i data-lucide="loader-2" class="w-12 h-12 text-white"></i>
                  </div>
              </div>
              <p class="text-white font-black text-2xl mt-8 tracking-[0.3em] animate-pulse text-shadow-glow">DATA ANALYZING...</p>
           </div>
           
           <style>
             @keyframes fall { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
             .text-shadow-glow { text-shadow: 0 0 10px rgba(255,255,255,0.8); }
           </style>
        </div>
      `;
  }

  // --- Gacha Result View (Card Reveal) ---
  if (gachaCard) {
      const isNew = state.collection.filter(id => id === gachaCard.id).length === 1;

      // Determine Styles based on Rarity
      let bgContainerClass = "bg-slate-800"; // Default background
      let raysHtml = "";
      let cardContainerClass = "bg-white";
      let cardBorderClass = "border-slate-300";
      let glowClass = "";
      let rarityBadgeClass = "bg-slate-600";
      let iconColor = "text-slate-700";
      let particlesHtml = "";

      if (gachaCard.rarity === 'UR') {
          // UR: Gold/Rainbow, God Rays, Intense Glow
          bgContainerClass = "bg-slate-950";
          raysHtml = `
             <div class="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-40">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-[conic-gradient(from_0deg,transparent_0deg,#fbbf24_20deg,transparent_40deg,#f59e0b_60deg,transparent_80deg,#fbbf24_100deg,transparent_120deg,#f59e0b_140deg,transparent_160deg,#fbbf24_180deg,transparent_200deg,#f59e0b_220deg,transparent_240deg,#fbbf24_260deg,transparent_280deg,#f59e0b_300deg,transparent_320deg,#fbbf24_340deg,transparent_360deg)]"></div>
             </div>
             <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.3)_0%,transparent_70%)] animate-pulse"></div>
          `;
          cardContainerClass = "bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200";
          cardBorderClass = "border-amber-400 border-4 shadow-[0_0_50px_rgba(245,158,11,0.6)]";
          glowClass = "shadow-[0_0_80px_rgba(251,191,36,0.8)]";
          rarityBadgeClass = "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg";
          iconColor = "text-amber-600";
          particlesHtml = `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
               ${Array(20).fill(0).map((_,i) => `<div class="absolute w-2 h-2 bg-yellow-300 rounded-full animate-[float_${2+Math.random()*3}s_linear_infinite]" style="top:${Math.random()*100}%; left:${Math.random()*100}%; animation-delay:${Math.random()*2}s"></div>`).join('')}
            </div>
          `;

      } else if (gachaCard.rarity === 'SR') {
          // SR: Emerald/Tech, Rotating Grid, Digital Glow
          bgContainerClass = "bg-slate-900";
          // FIXED: Use a larger container centered for the conic gradient to avoid cutting off corners
          raysHtml = `
             <div class="absolute inset-0 opacity-20 overflow-hidden">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] bg-[repeating-conic-gradient(#10b981_0deg,#10b981_10deg,transparent_10deg,transparent_20deg)] animate-[spin_60s_linear_infinite]"></div>
             </div>
             <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3)_0%,transparent_60%)]"></div>
          `;
          cardContainerClass = "bg-gradient-to-br from-emerald-50 via-white to-emerald-100";
          cardBorderClass = "border-emerald-400 border-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]";
          glowClass = "shadow-[0_0_50px_rgba(16,185,129,0.5)]";
          rarityBadgeClass = "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
          iconColor = "text-emerald-600";
          particlesHtml = `
             <div class="absolute inset-0 overflow-hidden pointer-events-none">
               ${Array(10).fill(0).map((_,i) => `<div class="absolute w-1 h-1 bg-emerald-400 rounded-full animate-[ping_${1+Math.random()}s_linear_infinite]" style="top:${Math.random()*100}%; left:${Math.random()*100}%; animation-delay:${Math.random()}s"></div>`).join('')}
             </div>
          `;

      } else if (gachaCard.rarity === 'R') {
          // R: Blue/Cool, Slight Glow
          bgContainerClass = "bg-slate-800";
          raysHtml = `
             <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]"></div>
             <div class="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)] bg-[length:200%_200%] animate-[shine_3s_infinite]"></div>
          `;
          cardContainerClass = "bg-gradient-to-br from-blue-50 to-white";
          cardBorderClass = "border-blue-400 border-2";
          glowClass = "shadow-[0_0_20px_rgba(59,130,246,0.3)]";
          rarityBadgeClass = "bg-blue-500 text-white";
          iconColor = "text-blue-600";

      } else {
          // N: Simple
          bgContainerClass = "bg-slate-100";
          cardContainerClass = "bg-white";
          cardBorderClass = "border-slate-300 border-2";
          rarityBadgeClass = "bg-slate-500 text-white";
          iconColor = "text-slate-600";
      }

      return `
        <div class="min-h-screen flex flex-col items-center justify-center p-4 ${bgContainerClass} relative overflow-hidden">
           <!-- Background Effects -->
           <div class="absolute inset-0 overflow-hidden pointer-events-none">
              ${raysHtml}
              ${particlesHtml}
           </div>

           <!-- Card Reveal Container -->
           <div class="relative z-10 w-full max-w-sm perspective-1000 animate-[popIn_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
              
              <!-- The Card -->
              <div class="relative group transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                 
                 <!-- Outer Glow -->
                 <div class="absolute inset-0 rounded-3xl ${glowClass} opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]"></div>
                 
                 <!-- Card Body -->
                 <div class="${cardContainerClass} ${cardBorderClass} rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden min-h-[440px] shadow-2xl">
                    
                    <!-- NEW Badge -->
                    ${isNew ? '<div class="absolute top-4 right-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full animate-bounce shadow-md z-20 border border-white">NEW!</div>' : ''}
                    
                    <!-- Rarity Watermark -->
                    <div class="text-[10rem] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none z-0 pointer-events-none ${iconColor}">
                       ${gachaCard.rarity}
                    </div>

                    <!-- Icon Circle -->
                    <div class="mt-8 mb-6 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner border-4 border-slate-50 relative z-10 animate-[float_4s_ease-in-out_infinite]">
                       <span class="text-6xl select-none filter drop-shadow-sm">
                          ${gachaCard.type === 'AI' ? '🧠' : 
                            gachaCard.type === 'NET' ? '🌐' : 
                            gachaCard.type === 'SIM' ? '🎲' : '📊'}
                       </span>
                    </div>
                    
                    <!-- Rarity Label -->
                    <div class="mb-3 relative z-10">
                       <span class="inline-block px-4 py-1.5 rounded-full text-sm font-black tracking-widest ${rarityBadgeClass} border border-white/20">
                          ${gachaCard.rarity}
                       </span>
                    </div>

                    <!-- Name -->
                    <h2 class="text-2xl md:text-3xl font-black text-slate-800 mb-4 leading-tight relative z-10 drop-shadow-sm">
                       ${gachaCard.name}
                    </h2>
                    
                    <!-- Description -->
                    <div class="relative z-10 w-full">
                       <div class="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm">
                         <p class="text-slate-700 text-sm font-medium leading-relaxed text-left">
                            ${escapeHtml(gachaCard.desc)}
                         </p>
                       </div>
                    </div>

                 </div>
              </div>
           </div>

           <!-- Return Button (Appears with delay) -->
           <div class="mt-10 relative z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_1.5s_forwards]">
              <button onclick="window.app.resetGame()" class="bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-slate-200">
                 <i data-lucide="home" class="w-5 h-5"></i> 完了してメニューへ
              </button>
           </div>
           
           <!-- CSS Animations specific to this view -->
           <style>
             @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
             @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
             @keyframes popIn { 0% { opacity: 0; transform: scale(0.5) translateY(50px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
             @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
             @keyframes shine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
           </style>
        </div>
      `;
  }

  // --- Standard Result View (Score Display Phase) ---
  return `
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div class="bg-white border border-slate-200 p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl relative overflow-hidden animate-fadeIn">
         <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
         
         <div class="flex justify-center mb-6">
           <div class="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center animate-bounce">
             <i data-lucide="trophy" class="w-12 h-12 text-amber-400"></i>
           </div>
         </div>
         <h2 class="text-3xl font-bold text-slate-800 mb-2">Game Clear!</h2>
         <p class="text-slate-500 mb-8">お疲れ様でした！今回のスコアは...</p>

         <div class="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
           <div class="text-sm text-slate-500 mb-1 font-bold tracking-widest">FINAL SCORE</div>
           <div class="text-5xl font-mono font-bold text-emerald-600">${state.currentScore}</div>
         </div>

         ${!hasDrawn && !isPracticeMode ? `
         <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-1 mb-6 shadow-lg animate-pulse scale-105 hover:scale-110 transition-transform">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white cursor-pointer" onclick="window.app.handleGachaDraw()">
                <p class="font-bold text-lg mb-4 text-center">✨ スコア報酬を獲得 ✨</p>
                <div class="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black text-lg py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md">
                    <i data-lucide="gift" class="w-6 h-6"></i> 用語カードを引く
                </div>
            </div>
         </div>
         <p class="text-xs text-slate-400 mt-4">※報酬を受け取るまで戻れません</p>
         ` : ''}
         
         ${isPracticeMode ? `
         <div class="mb-6 p-4 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 text-sm font-bold">
            <p>これは練習モードのため報酬はありません。</p>
            <p class="mt-1">メニューに戻って本番モードに挑戦しよう！</p>
         </div>
         <button onclick="window.app.resetGame()" class="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl border-2 border-slate-200 transition-all flex items-center justify-center gap-2">
            <i data-lucide="home" class="w-5 h-5"></i> メニューへ戻る
         </button>
         ` : ''}
      </div>
    </div>
  `;
};
