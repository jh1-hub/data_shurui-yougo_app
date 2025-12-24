
import { state } from '../gameState.js';

// Central definition of tools
export const TOOLS = {
  MEAN: { 
    id: 'MEAN', 
    jpName: '平均値', 
    enName: 'MEAN',
    icon: 'scale', 
    color: 'indigo', 
    desc: 'バランス・合計' 
  },
  MEDIAN: { 
    id: 'MEDIAN', 
    jpName: '中央値', 
    enName: 'MEDIAN',
    icon: 'scissors', // Changed to scissors/shield concept 
    color: 'emerald', 
    desc: '順位・真ん中' 
  },
  MODE: { 
    id: 'MODE', 
    jpName: '最頻値', 
    enName: 'MODE',
    icon: 'crown', 
    color: 'amber', 
    desc: '多数決・流行' 
  }
};

export const renderToolBar = () => {
  const currentPhase = state.phase; // 'SELECTION' or 'EXECUTION'
  const correctToolId = state.questions[state.currentQuestionIndex]?.correctTool;

  return `
    <div class="w-full max-w-lg mx-auto mb-6 px-4">
       <div class="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200 flex justify-between items-center gap-2">
          ${Object.values(TOOLS).map(tool => {
            // Logic for visual state
            let opacityClass = 'opacity-100';
            let scaleClass = 'hover:scale-105 active:scale-95';
            let bgClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500';
            let labelClass = 'text-slate-400';
            
            // If in Execution phase, highlight the correct one and dim others
            if (currentPhase === 'EXECUTION') {
               if (tool.id === correctToolId) {
                  bgClass = `bg-${tool.color}-100 border-${tool.color}-300 text-${tool.color}-600 ring-2 ring-${tool.color}-400 ring-offset-2`;
                  labelClass = `text-${tool.color}-600`;
                  scaleClass = ''; // No scaling
               } else {
                  opacityClass = 'opacity-30 grayscale';
                  scaleClass = ''; // No interaction
               }
            } else {
               // Selection Phase: Interactive styles
               bgClass = `bg-white hover:bg-${tool.color}-50 border-slate-200 hover:border-${tool.color}-200 text-slate-600 hover:text-${tool.color}-600 shadow-sm`;
            }

            const onClick = (currentPhase === 'SELECTION') 
              ? `onclick="window.app.handleToolSelect('${tool.id}')"` 
              : '';

            return `
            <button ${onClick} class="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 transition-all duration-200 ${bgClass} ${opacityClass} ${scaleClass} touch-manipulation h-20 md:h-24 group">
               <i data-lucide="${tool.icon}" class="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 transition-transform group-hover:scale-110"></i>
               <span class="text-sm md:text-lg font-black leading-none ${labelClass} mb-0.5">${tool.jpName}</span>
               <span class="text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-wider hidden md:block">${tool.enName}</span>
            </button>
            `;
          }).join('')}
       </div>
       ${currentPhase === 'SELECTION' ? 
         `<div class="text-center mt-2 text-xs font-bold text-slate-500 animate-pulse">
            <i data-lucide="search" class="w-3 h-3 inline mr-1"></i>適切な分析ツールを選択してください
          </div>` : ''}
    </div>
  `;
};
