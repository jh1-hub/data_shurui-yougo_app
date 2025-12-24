import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';
import { TOOLS } from '../games/raceGame.js'; // Import tool definitions

export const renderToolSelection = (question) => {
  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-900 select-none overflow-hidden relative text-white">
      <!-- High-tech Background -->
      <div class="absolute inset-0 z-0 opacity-20" 
           style="background-image: linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px); background-size: 40px 40px;">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none"></div>

      <!-- Header -->
      <div class="flex justify-between items-center py-4 px-2 mb-2 z-10 relative">
         <button onclick="window.app.resetGame()" class="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-1 bg-slate-800/80 px-3 py-2 rounded-full backdrop-blur-sm border border-slate-700">
           <i data-lucide="arrow-left" class="w-4 h-4"></i> ABORT MISSION
         </button>
         
         <div class="flex gap-3">
            <div class="bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700 text-rose-500 font-bold flex items-center gap-1">
               <i data-lucide="heart" class="w-4 h-4 fill-rose-500"></i> ${state.lives}
            </div>
            <div class="bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700 text-emerald-400 font-mono text-xl font-bold">
              SCORE: ${state.currentScore}
            </div>
         </div>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center relative z-10 animate-fadeIn">
        
        <!-- Mission Analysis Card -->
        <div class="w-full max-w-2xl bg-slate-800 border-2 border-slate-700 rounded-3xl p-8 shadow-2xl mb-8 relative overflow-hidden group">
           <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"></div>
           
           <!-- Blinking Indicator -->
           <div class="flex items-center gap-2 mb-4">
              <div class="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
              <span class="text-rose-400 font-mono text-xs font-bold tracking-[0.2em] uppercase">Incoming Data Stream</span>
           </div>

           <h2 class="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
             ${escapeHtml(question.text)}
           </h2>
           
           ${question.subText ? `
           <p class="text-slate-400 font-bold border-l-4 border-slate-600 pl-4 py-1">
             ${escapeHtml(question.subText)}
           </p>` : ''}

           <div class="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
              <i data-lucide="terminal" class="w-4 h-4"></i>
              <span>SYSTEM: Please select the appropriate analysis tool.</span>
           </div>
        </div>

        <!-- Tool Belt (Selection Area) -->
        <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            ${['MEAN', 'MEDIAN', 'MODE'].map(toolKey => {
               const tool = TOOLS[toolKey];
               return `
               <button onclick="window.app.handleToolSelect('${tool.id}')" 
                  class="group relative h-32 md:h-40 bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 hover:border-${tool.color}-500 rounded-2xl transition-all overflow-hidden flex flex-col items-center justify-center p-4 touch-manipulation shadow-lg hover:shadow-${tool.color}-500/20 hover:-translate-y-1"
               >
                  <!-- Glow Effect -->
                  <div class="absolute inset-0 bg-gradient-to-br from-${tool.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div class="relative z-10 flex items-center md:flex-col gap-4 md:gap-2 text-left md:text-center w-full md:w-auto px-4 md:px-0">
                     <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-600 group-hover:border-${tool.color}-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner shrink-0">
                       <i data-lucide="${tool.icon}" class="w-6 h-6 text-${tool.color}-400"></i>
                     </div>
                     <div>
                         <span class="block text-white font-black text-lg md:text-xl tracking-wide">${tool.jpName}</span>
                         <span class="block text-slate-400 text-[10px] font-bold tracking-widest uppercase group-hover:text-${tool.color}-300">${tool.enName}</span>
                         <span class="block md:hidden text-slate-500 text-xs mt-1">${tool.desc}</span>
                     </div>
                  </div>
                  
                  <!-- Desktop Description (Bottom) -->
                  <div class="hidden md:block absolute bottom-3 text-[10px] text-slate-500 group-hover:text-slate-300 font-mono tracking-wider">
                     ${tool.desc}
                  </div>
               </button>
               `;
            }).join('')}
        </div>

      </div>
    </div>
  `;
};
