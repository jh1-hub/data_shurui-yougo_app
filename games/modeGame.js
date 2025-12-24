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

export const renderModeGame = (question) => {
  const getTheme = (idx) => {
    const themes = [
      'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
      'bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200',
      'bg-lime-100 text-lime-700 border-lime-200 hover:bg-lime-200',
      'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-200',
    ];
    return themes[idx % themes.length];
  };
  
  const uniqueItems = [...new Set(question.items)];
  const itemColorMap = {};
  uniqueItems.forEach((item, idx) => {
      itemColorMap[item] = getTheme(idx);
  });

  const isResultPhase = state.lastAnswerCorrect !== null;
  const isSelectionPhase = state.phase === 'SELECTION';

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <div class="absolute inset-0 z-0 opacity-10" style="background-image: radial-gradient(#cbd5e1 2px, transparent 2px); background-size: 30px 30px;"></div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col justify-start items-center relative z-10 pt-2">
        
        <!-- Mission Card (Question) -->
        ${renderMissionCard(question, isSelectionPhase)}

        <!-- Tool Selection Bar (Always visible) -->
        ${renderToolBar()}

        <!-- Instruction Text (Visible in Phase 1 now) -->
        <div class="w-full max-w-lg text-center mb-4 transition-all duration-300 ${isSelectionPhase ? 'opacity-100 scale-100' : 'opacity-80'}">
           <div class="inline-block bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
             <p class="text-slate-600 text-sm md:text-base font-bold flex items-center gap-2 justify-center">
               <i data-lucide="users" class="w-4 h-4 text-amber-500"></i>
               一番多く登場する（流行している）<br class="md:hidden">アイテムは？
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

            <!-- Game Area: Cloud of Items -->
            <div class="w-full max-w-lg p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl relative min-h-[350px] flex flex-wrap content-center justify-center gap-3 md:gap-4 animate-fadeIn mb-8">
                
                ${question.items.map((item, idx) => {
                  const rotate = (Math.random() * 20) - 10; 
                  const colorClass = itemColorMap[item];
                  const isModeItem = question.validAnswers.includes(item);
                  const showStamp = isResultPhase && isModeItem;

                  return `
                    <button onclick="window.app.handleAnswer('${escapeHtml(item)}')"
                       class="${colorClass} px-4 py-3 md:px-5 md:py-4 rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-sm flex items-center justify-center cursor-pointer touch-manipulation transform hover:scale-110 active:scale-95 relative group overflow-hidden"
                       style="transform: rotate(${rotate}deg); animation: float ${3 + Math.random()}s ease-in-out infinite; animation-delay: ${Math.random()}s;"
                    >
                      <span class="text-2xl md:text-3xl font-black relative z-10">${escapeHtml(item)}</span>
                      
                      ${showStamp ? `
                        <div class="absolute inset-0 z-20 flex items-center justify-center animate-stampIn pointer-events-none">
                            <div class="border-4 border-rose-600 text-rose-600 font-black px-2 py-1 transform -rotate-12 bg-white/90 backdrop-blur-sm rounded shadow-lg flex flex-col items-center justify-center">
                                <span class="text-sm md:text-base whitespace-nowrap">最頻値</span>
                                <span class="text-[8px] md:text-[10px] leading-none tracking-widest">MODE</span>
                            </div>
                        </div>
                      ` : ''}
                    </button>
                  `;
                }).join('')}

            </div>
            
            <div class="mb-4 text-slate-400 text-xs font-mono text-center flex items-center gap-2 opacity-70">
               <i data-lucide="eye" class="w-4 h-4"></i>
               OBSERVE THE CROWD
            </div>
        
        </div>

      </div>
      
      <style>
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-5px) rotate(var(--tw-rotate)); }
          100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
        }
        @keyframes stampIn {
          0% { opacity: 0; transform: scale(2) rotate(-12deg); }
          50% { opacity: 1; transform: scale(0.9) rotate(-12deg); }
          75% { transform: scale(1.1) rotate(-12deg); }
          100% { opacity: 1; transform: scale(1) rotate(-12deg); }
        }
        .animate-stampIn {
          animation: stampIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      </style>
    </div>
  `;
};
