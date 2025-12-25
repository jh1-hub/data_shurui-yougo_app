
import { state } from '../gameState.js';
import { TOPIC } from '../constants.js';
import { typesContent } from './tutorials/typesContent.js';
import { cleaningContent } from './tutorials/cleaningContent.js';

export const renderTutorial = () => {
  const page = state.tutorialPage || 0;
  const step = state.tutorialStep || 0; // 0: Question, 1: Answered/Done
  const feedback = state.tutorialFeedback; // 'CORRECT', 'WRONG', null
  const module = state.tutorialModule || 'TYPES'; // 'TYPES' or 'CLEANING'

  // Select the appropriate content module
  const contentModule = module === 'TYPES' ? typesContent : cleaningContent;

  // -- Component Helper: Passed to content modules --
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
               ${contentModule.getSuccessExplanation(page)}
               <div class="mt-3 text-right">
                  <span class="text-xs text-slate-400 font-bold">下の「次へ」ボタンで進みましょう <i data-lucide="arrow-down" class="w-3 h-3 inline"></i></span>
               </div>
            </div>
          ` : ''}
       </div>
    </div>
  `;

  // Page Content Generation
  let contentHtml = contentModule.renderPage(page, step, renderMiniGameCard);
  
  let headerTitle = 'データ分析の基礎';
  if (module === 'CLEANING') headerTitle = '代表値とデータ整理';

  // Next Button Logic
  const canProceed = (page === contentModule.maxPages) || (step === 1);
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
              ${Array(contentModule.maxPages + 1).fill(0).map((_, i) => `
                 <div class="h-2 rounded-full transition-all duration-300 ${i === page ? 'bg-emerald-500 w-8' : 'bg-slate-300 w-2'}"></div>
              `).join('')}
           </div>

           <button onclick="${canProceed ? 'window.app.nextTutorialPage()' : ''}" 
             class="px-6 py-3 ${btnColor} text-white font-bold rounded-full flex items-center gap-2 transition-all active:scale-95">
             ${page === contentModule.maxPages ? '完了' : '次へ'} 
             <i data-lucide="${page === contentModule.maxPages ? 'check' : 'arrow-right'}" class="w-4 h-4"></i>
           </button>

        </div>
      </div>

    </div>
  `;
};
