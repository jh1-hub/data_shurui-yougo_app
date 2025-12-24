import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

export const renderStandardGame = (question) => {
  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50">
      <div class="flex justify-between items-center py-4 mb-8">
         <button onclick="window.app.resetGame()" class="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1">
           <i data-lucide="arrow-left" class="w-4 h-4"></i> メニュー
         </button>
         <div class="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 text-emerald-600 font-mono text-xl font-bold">
           SCORE: ${state.currentScore}
         </div>
      </div>

      <div class="flex-1 flex flex-col justify-center">
        <div class="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-indigo-400"></div>
          
          <div class="flex justify-between items-center mb-6 pl-4">
            <span class="text-indigo-600 text-xs font-bold tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full">
              ${question.topic}
            </span>
            <div class="flex gap-4 text-sm font-bold">
               <div class="flex items-center text-rose-500 gap-1">
                 <i data-lucide="heart" class="w-4 h-4 fill-rose-500"></i>
                 <span>${state.lives}</span>
               </div>
               ${state.streak > 1 ? `
                 <div class="flex items-center text-amber-500 gap-1 animate-pulse">
                   <i data-lucide="flame" class="w-4 h-4 fill-amber-500"></i>
                   <span>${state.streak}</span>
                 </div>
               ` : ''}
            </div>
          </div>

          <div class="mb-8 pl-4">
            <h2 class="text-2xl font-bold text-slate-800 leading-relaxed">
              ${escapeHtml(question.text)}
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${question.options.map((option, idx) => `
              <button onclick="window.app.handleAnswer('${escapeHtml(option)}')"
                class="text-left px-6 py-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md rounded-xl transition-all duration-200 group w-full cursor-pointer relative"
              >
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 font-mono text-sm transition-colors shadow-sm">
                    ${String.fromCharCode(65 + idx)}
                  </span>
                  <span class="text-slate-700 group-hover:text-indigo-900 font-bold">
                    ${escapeHtml(option)}
                  </span>
                </div>
              </button>
            `).join('')}
          </div>

          <div class="pt-4 border-t border-slate-100 flex flex-col items-center">
            ${!state.hint ? `
              <button onclick="window.app.requestHint()" 
                class="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm font-bold"
              >
                <i data-lucide="lightbulb" class="w-4 h-4"></i>
                ヒントを見る
              </button>
            ` : `
              <div class="bg-amber-50 border border-amber-200 p-4 rounded-lg w-full animate-fadeIn">
                <div class="flex items-start gap-3">
                  <i data-lucide="lightbulb" class="w-5 h-5 text-amber-500 flex-shrink-0 mt-1 fill-amber-500"></i>
                  <div>
                    <p class="text-amber-700 text-sm font-bold mb-1">ヒント:</p>
                    <p class="text-amber-800/80 text-sm leading-relaxed">${escapeHtml(state.hint)}</p>
                  </div>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>

      <div class="mt-8 mb-4">
        <div class="flex justify-between text-slate-500 text-xs mb-1 font-bold">
           <span>PROGRESS</span>
           <span>${state.currentQuestionIndex + 1} / ${state.questions.length}</span>
        </div>
        <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 ease-out"
            style="width: ${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%"
          ></div>
        </div>
      </div>
    </div>
  `;
};