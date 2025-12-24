
import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

// Reuse TOOLS definitions from raceGame style for consistency
// Ideally this would be shared, but for now we define it here to match
const TOOLS = {
  MEAN: { 
    id: 'MEAN', 
    jpName: '平均値', 
    enName: 'MEAN',
    icon: 'scale', 
    color: 'indigo', 
    bgGradient: 'from-indigo-50 to-white',
    desc: 'バランスの王者' 
  },
  MEDIAN: { 
    id: 'MEDIAN', 
    jpName: '中央値', 
    enName: 'MEDIAN',
    icon: 'shield', 
    color: 'emerald', 
    bgGradient: 'from-emerald-50 to-white',
    desc: '外れ値に強い' 
  },
  MODE: { 
    id: 'MODE', 
    jpName: '最頻値', 
    enName: 'MODE',
    icon: 'crown', 
    color: 'amber', 
    bgGradient: 'from-amber-50 to-white',
    desc: '多数決のプロ' 
  }
};

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

export const renderOutlierGame = (question) => {
  // Logic to identify outlier for visualization (simple heuristic: max value if much larger than others)
  const sorted = [...question.dataPoints].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q3 = sorted[Math.floor(sorted.length * 3 / 4)];
  const iqr = q3 - q1;
  // Simple check: is max > q3 + 1.5 * IQR? (or just visual logic since data is preset)
  // For visual drama, let's just highlight the Max if it's way bigger, or Min if way smaller.
  const isHighOutlier = sorted[sorted.length - 1] > q3 + 1.5 * iqr && iqr > 0;
  const isLowOutlier = sorted[0] < q1 - 1.5 * iqr && iqr > 0;
  
  // Just for rendering, we classify numbers as "Normal Citizen" or "Outlier Monster"
  // If no outlier calculated but question says hasOutlier, we assume the extreme value is it.
  
  const renderDataPoint = (val) => {
    // Check if this specific value is the outlier
    const isOutlierValue = (isHighOutlier && val === sorted[sorted.length-1]) || (isLowOutlier && val === sorted[0]);
    
    // Check if we should reveal it visually
    const showVisualCue = isOutlierValue && !question.hideVisual;
    
    if (showVisualCue) {
      return `
        <div class="flex flex-col items-center animate-bounce">
           <div class="w-16 h-16 bg-rose-500 rounded-xl shadow-lg shadow-rose-500/40 flex items-center justify-center border-4 border-rose-700 transform rotate-3">
             <i data-lucide="ghost" class="w-10 h-10 text-white"></i>
           </div>
           <div class="mt-2 bg-rose-100 text-rose-800 font-black px-2 py-1 rounded text-xs shadow-sm">${val}</div>
           <div class="text-[10px] text-rose-500 font-bold mt-1">OUTLIER!</div>
        </div>
      `;
    } else {
      return `
        <div class="flex flex-col items-center">
           <div class="w-12 h-12 bg-slate-200 rounded-full shadow-sm flex items-center justify-center border-2 border-slate-300">
             <i data-lucide="user" class="w-6 h-6 text-slate-400"></i>
           </div>
           <div class="mt-2 bg-white text-slate-600 font-bold px-2 py-1 rounded text-xs shadow-sm border border-slate-100">${val}</div>
        </div>
      `;
    }
  };

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-5" style="background-image: radial-gradient(#64748b 1px, transparent 1px); background-size: 20px 20px;"></div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Mission Brief -->
        <div class="w-full max-w-2xl mb-6 text-center">
           <div class="inline-flex items-center gap-2 px-4 py-1 bg-slate-800 text-white text-xs font-bold rounded-full mb-3 tracking-widest uppercase shadow-lg">
             <i data-lucide="shield-alert" class="w-3 h-3"></i> Defense Mission
           </div>
           <h2 class="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-2">
             ${escapeHtml(question.text)}
           </h2>
           <p class="text-slate-500 text-sm md:text-base bg-white/50 inline-block px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-100">
             ${escapeHtml(question.subText)}
           </p>
        </div>

        <!-- Battlefield (Data Visualization) -->
        <div class="w-full max-w-3xl flex-1 flex items-center justify-center mb-4">
           <div class="w-full bg-slate-200/50 rounded-3xl p-8 border-2 border-slate-300 border-dashed relative min-h-[200px] flex flex-wrap justify-center items-end gap-4 md:gap-8 shadow-inner">
              <div class="absolute -top-3 left-8 bg-slate-300 text-slate-600 px-3 py-1 text-xs font-bold rounded tracking-wider">DATA SET</div>
              ${question.dataPoints.map(renderDataPoint).join('')}
           </div>
        </div>
        
        <!-- Weapon Selection (The 3 Options) -->
        <div class="w-full max-w-3xl grid grid-cols-3 gap-3 md:gap-6 mb-8">
            ${['MEAN', 'MEDIAN', 'MODE'].map(toolKey => {
               const tool = TOOLS[toolKey];
               return `
               <button onclick="window.app.handleAnswer('${tool.id}')" 
                  class="group relative h-36 md:h-44 bg-white border-2 border-${tool.color}-100 rounded-2xl shadow-lg hover:border-${tool.color}-500 hover:shadow-${tool.color}-500/20 hover:-translate-y-1 transition-all overflow-hidden flex flex-col items-center justify-center p-2 touch-manipulation"
               >
                  <!-- Background Gradient -->
                  <div class="absolute inset-0 bg-gradient-to-br ${tool.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div class="relative z-10 flex flex-col items-center text-center">
                     <div class="w-12 h-12 md:w-14 md:h-14 bg-${tool.color}-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                       <i data-lucide="${tool.icon}" class="w-6 h-6 md:w-8 md:h-8 text-${tool.color}-600"></i>
                     </div>
                     <span class="text-${tool.color}-900 font-black text-sm md:text-lg leading-none mb-1">${tool.jpName}</span>
                     <span class="text-${tool.color}-400 text-[10px] md:text-xs font-bold tracking-wider uppercase opacity-80">${tool.desc}</span>
                  </div>
               </button>
               `;
            }).join('')}
        </div>

        <div class="text-center text-slate-400 text-xs font-mono">
           CHOOSE THE MOST ROBUST STATISTIC!
        </div>

      </div>
    </div>
  `;
};
