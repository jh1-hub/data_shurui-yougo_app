import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

// --- Renderer ---

const renderHeader = () => `
  <div class="flex justify-between items-center py-4 px-2 mb-2 z-10 relative">
     <button onclick="window.app.resetGame()" class="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 bg-white/80 px-3 py-2 rounded-full backdrop-blur-sm shadow-sm touch-manipulation">
       <i data-lucide="arrow-left" class="w-4 h-4"></i> MENU
     </button>
     
     <div class="flex gap-3">
        <div class="bg-white/90 px-3 py-1 rounded-full shadow-sm border border-slate-200 text-rose-500 font-bold flex items-center gap-1">
           <i data-lucide="heart" class="w-4 h-4 fill-rose-500"></i> ${state.lives}
        </div>
        <div class="bg-white/90 px-3 py-1 rounded-full shadow-sm border border-slate-200 text-emerald-600 font-mono text-xl font-bold">
          ${state.currentScore}
        </div>
     </div>
  </div>
`;

export const renderScoutGame = (question) => {
  return `
    <div class="min-h-screen flex flex-col p-4 max-w-5xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Map Pattern -->
      <div class="absolute inset-0 z-0 opacity-10" style="background-image: radial-gradient(#64748b 1px, transparent 1px); background-size: 24px 24px;"></div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Mission File Header -->
        <div class="w-full max-w-3xl mb-6 flex flex-col items-center">
           <div class="bg-white border-2 border-slate-800 rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] w-full text-center relative transform -rotate-1">
              <!-- Stamp -->
              <div class="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded rotate-12 shadow-sm uppercase tracking-widest border border-red-800">
                WANTED
              </div>
              
              <div class="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                 <i data-lucide="search" class="w-4 h-4"></i> DATA SCOUT MISSION
              </div>
              <h2 class="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-2">
                ${escapeHtml(question.text)}
              </h2>
              <div class="bg-slate-100 text-slate-700 font-mono text-sm md:text-base font-bold py-2 px-4 rounded border border-slate-200 inline-block">
                Condition: ${escapeHtml(question.conditionText)}
              </div>
           </div>
        </div>

        <!-- Data Grid -->
        <div class="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-8">
            ${question.items.map((item, idx) => {
              // Delay animation for staggering effect
              const delay = idx * 0.05;
              
              return `
              <button onclick="window.app.handleAnswer('${item.id}')"
                 class="group bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-400 rounded-xl p-3 md:p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left relative overflow-hidden animate-fadeIn flex flex-col gap-2"
                 style="animation-delay: ${delay}s"
              >
                 <!-- Header: Icon & Label -->
                 <div class="flex items-center gap-2 border-b border-slate-100 pb-2 mb-1 w-full">
                    <div class="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition-colors">
                       <i data-lucide="${item.icon || 'file'}" class="w-4 h-4"></i>
                    </div>
                    <span class="font-bold text-slate-700 text-sm md:text-base">${escapeHtml(item.label)}</span>
                 </div>

                 <!-- Stats Grid -->
                 <div class="grid grid-cols-1 gap-1 w-full">
                    ${Object.entries(item.stats).map(([key, val]) => `
                       <div class="flex justify-between items-center bg-slate-50 px-2 py-1.5 rounded group-hover:bg-white transition-colors">
                          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${key}</span>
                          <span class="text-sm font-mono font-bold text-slate-800">${val}</span>
                       </div>
                    `).join('')}
                 </div>
                 
                 <!-- Selection Highlight -->
                 <div class="absolute inset-0 border-2 border-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </button>
              `;
            }).join('')}
        </div>
        
        <div class="text-center text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 opacity-70">
           <i data-lucide="mouse-pointer-2" class="w-3 h-3 inline"></i> TAP THE MATCHING CARD
        </div>

      </div>
    </div>
  `;
};
