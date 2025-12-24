import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';
import { renderToolBar } from '../views/components.js';

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

const renderMissionCard = (question, isSelectionPhase) => {
    return `
    <div class="w-full max-w-2xl px-2 mb-6 z-20">
       <div class="bg-white border-2 ${isSelectionPhase ? 'border-indigo-500 shadow-xl scale-105' : 'border-slate-200 shadow-sm'} rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden">
          
          ${isSelectionPhase ? `
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
          <div class="flex items-center gap-2 mb-3">
             <span class="bg-indigo-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
               <i data-lucide="search" class="w-3 h-3"></i> MISSION
             </span>
             <span class="text-indigo-600 text-xs font-bold animate-pulse">この分析を行うための道具を選べ！</span>
          </div>
          ` : ''}

          <h2 class="text-xl md:text-2xl font-black text-slate-800 leading-snug mb-2">
             ${escapeHtml(question.text)}
          </h2>
          
          ${question.dataDescription ? `
          <div class="mt-2 text-sm text-slate-500 bg-slate-50 px-3 py-2 rounded border border-slate-100 font-mono flex items-center gap-2">
             <i data-lucide="database" class="w-4 h-4"></i> ${escapeHtml(question.dataDescription)}
          </div>
          ` : ''}
       </div>
    </div>
    `;
};

export const renderMedianGame = (question) => {
  const getSizeClass = (val) => {
    const seed = val * 17; 
    const sizes = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
    return sizes[seed % sizes.length];
  };

  const colors = [
    'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
    'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
    'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200',
    'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200',
    'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200',
  ];

  const isSelectionPhase = state.phase === 'SELECTION';

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      ${renderHeader()}

      <div class="flex-1 flex flex-col justify-start items-center pt-2">
        
        <!-- Mission Card (Question) -->
        ${renderMissionCard(question, isSelectionPhase)}

        <!-- Tool Selection Bar (Always visible) -->
        ${renderToolBar()}

        <!-- Instruction Text (Visible in Phase 1 now) -->
        <div class="w-full max-w-lg text-center mb-4 transition-all duration-300 ${isSelectionPhase ? 'opacity-100 scale-100' : 'opacity-80'}">
           <div class="inline-block bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
             <p class="text-slate-600 text-sm md:text-base font-bold flex items-center gap-2 justify-center">
               <i data-lucide="arrow-down-up" class="w-4 h-4 text-emerald-500"></i>
               数字を小さい順に並べたとき、<br class="md:hidden">真ん中に来る数は？
             </p>
           </div>
        </div>

        <!-- Game Area Wrapper -->
        <div class="w-full flex-1 flex flex-col items-center justify-center relative transition-all duration-500 ${isSelectionPhase ? 'blur-md opacity-60 pointer-events-none grayscale-[50%]' : ''}">

             ${isSelectionPhase ? `
              <div class="absolute inset-0 z-10 flex items-start pt-10 justify-center">
                 <div class="bg-slate-800/90 text-white px-6 py-3 rounded-full backdrop-blur-md font-bold shadow-2xl border border-slate-600 flex items-center gap-2 animate-bounce">
                    <i data-lucide="lock" class="w-5 h-5 text-indigo-300"></i>
                    <span>上の指示に合うツールを選択！</span>
                 </div>
              </div>
            ` : ''}

            <div class="w-full max-w-lg p-6 bg-white/50 rounded-3xl border border-slate-200 shadow-xl relative min-h-[300px] flex flex-wrap content-center justify-center gap-4 md:gap-8 mb-8">
                <div class="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 via-transparent to-transparent"></div>
                ${question.numbers.map((num, idx) => {
                  const sizeClass = getSizeClass(num);
                  const colorClass = colors[idx % colors.length];
                  return `
                    <button onclick="window.app.handleAnswer('${num}')"
                       class="${colorClass} ${sizeClass} font-black w-20 h-20 md:w-24 md:h-24 rounded-full border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center animate-fadeIn cursor-pointer touch-manipulation transform hover:scale-105"
                       style="animation-delay: ${idx * 0.1}s;"
                    >
                      ${num}
                    </button>
                  `;
                }).join('')}
            </div>
            
            <div class="mb-4 text-slate-400 text-xs font-mono text-center opacity-70">
               <i data-lucide="scissors" class="w-4 h-4 inline mr-1"></i>
               MENTAL SORTING REQUIRED
            </div>

        </div>

      </div>
    </div>
  `;
};
