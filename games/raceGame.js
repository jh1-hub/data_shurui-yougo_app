import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

// --- Assets & Config ---

// Tools (formerly Runners) - Representing the 3 Representative Values
export const TOOLS = {
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

// Obstacles - Visualizing the data distribution challenges
const OBSTACLE_VISUALS = {
  SWAMP: { 
    icon: 'skull', 
    color: 'text-purple-600', 
    bg: 'bg-purple-100', 
    borderColor: 'border-purple-200',
    label: 'OUTLIER DETECTED',
    // Visual: A cluster of dots and one far away
    renderVisual: (desc) => `
      <div class="flex flex-col items-center w-full">
         <div class="relative w-full h-16 bg-slate-100 rounded-lg mb-4 flex items-center px-4 overflow-hidden border border-slate-200">
            <!-- Normal Cluster -->
            <div class="flex -space-x-2 mr-auto">
               ${[1,1,1,1,1].map(() => `<div class="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>`).join('')}
            </div>
            <!-- The Pull Effect -->
            <div class="flex-1 border-t-2 border-dashed border-purple-300 mx-2 relative top-[1px]"></div>
            <!-- The Outlier -->
            <div class="w-10 h-10 rounded-full bg-purple-500 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs relative z-10 animate-bounce">!</div>
         </div>
         <div class="text-center text-sm font-bold text-purple-800 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200 w-full">
            ${escapeHtml(desc)}
         </div>
      </div>
    `
  },
  WALL: { 
    icon: 'brick-wall', 
    color: 'text-slate-600', 
    bg: 'bg-slate-200',
    borderColor: 'border-slate-300',
    label: 'CATEGORICAL DATA',
    // Visual: Non-numeric items
    renderVisual: (desc) => `
      <div class="flex flex-col items-center w-full">
         <div class="flex flex-wrap justify-center gap-2 mb-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 w-full">
            <span class="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center gap-1"><i data-lucide="dog" class="w-3 h-3"></i> 犬派</span>
            <span class="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center gap-1"><i data-lucide="cat" class="w-3 h-3"></i> 猫派</span>
            <span class="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center gap-1"><i data-lucide="dog" class="w-3 h-3"></i> 犬派</span>
         </div>
         <div class="text-center text-sm font-bold text-slate-700 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm w-full">
            ${escapeHtml(desc)}
         </div>
      </div>
    `
  },
  PLAIN: { 
    icon: 'sun', 
    color: 'text-sky-500', 
    bg: 'bg-sky-100', 
    borderColor: 'border-sky-200',
    label: 'SYMMETRIC DATA',
    // Visual: Bell curve
    renderVisual: (desc) => `
       <div class="flex flex-col items-center w-full">
          <div class="flex items-end justify-center gap-1 h-20 mb-4 w-full border-b-2 border-slate-200 pb-1">
             <div class="w-4 h-4 bg-sky-200 rounded-t"></div>
             <div class="w-4 h-8 bg-sky-300 rounded-t"></div>
             <div class="w-4 h-16 bg-sky-400 rounded-t shadow-sm"></div>
             <div class="w-4 h-8 bg-sky-300 rounded-t"></div>
             <div class="w-4 h-4 bg-sky-200 rounded-t"></div>
          </div>
          <div class="text-center text-sm font-bold text-sky-700 bg-sky-50 px-4 py-2 rounded-lg border border-sky-200 w-full">
            ${escapeHtml(desc)}
         </div>
       </div>
    `
  },
  CLIFF: { 
    icon: 'trending-up', 
    color: 'text-rose-500', 
    bg: 'bg-rose-100', 
    borderColor: 'border-rose-200',
    label: 'SKEWED DATA',
    // Visual: Skewed graph (Long tail)
    renderVisual: (desc) => `
       <div class="flex flex-col items-center w-full">
          <div class="flex items-end justify-center gap-1 h-20 mb-4 w-full border-b-2 border-slate-200 pb-1 relative">
             <div class="w-6 h-16 bg-rose-400 rounded-t shadow-sm"></div>
             <div class="w-6 h-8 bg-rose-300 rounded-t"></div>
             <div class="w-6 h-3 bg-rose-200 rounded-t"></div>
             <div class="w-6 h-1 bg-rose-100 rounded-t"></div>
             <div class="w-6 h-[2px] bg-rose-50 rounded-t"></div>
             <div class="w-6 h-[1px] bg-rose-50 rounded-t"></div>
             
             <!-- Annotations to emphasize drift -->
             <div class="absolute -bottom-6 left-2 text-[10px] text-slate-400 font-bold">多数派</div>
             <div class="absolute -bottom-6 right-2 text-[10px] text-slate-400 font-bold">一部の富裕層など</div>
          </div>
          <div class="text-center text-sm font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200 w-full mt-4">
            ${escapeHtml(desc)}
         </div>
       </div>
    `
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

export const renderRaceGame = (question) => {
  const obstacle = OBSTACLE_VISUALS[question.obstacleType] || OBSTACLE_VISUALS.PLAIN;

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 z-0 opacity-5" style="background-image: radial-gradient(#64748b 1px, transparent 1px); background-size: 20px 20px;"></div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Mission Header -->
        <div class="w-full max-w-2xl text-center mb-4">
           <div class="inline-flex items-center gap-2 px-4 py-1 bg-slate-800 text-white text-xs font-bold rounded-full mb-3 tracking-widest uppercase shadow-lg">
             <i data-lucide="flag" class="w-3 h-3"></i> ${escapeHtml(question.stageLabel || 'SELECT TOOL')}
           </div>
           <h2 class="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-2">
             ${escapeHtml(question.text)}
           </h2>
        </div>

        <!-- Battlefield (Data Visualization Area) -->
        <div class="w-full max-w-2xl flex-1 flex items-center justify-center mb-6">
           <div class="w-full bg-white/60 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-300 border-dashed relative min-h-[220px] flex flex-col items-center justify-center gap-4 shadow-xl">
              
              <!-- Obstacle Icon Badge -->
              <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border border-slate-200 shadow-md">
                  <div class="w-10 h-10 ${obstacle.bg} rounded-full flex items-center justify-center">
                    <i data-lucide="${obstacle.icon}" class="w-6 h-6 ${obstacle.color}"></i>
                  </div>
              </div>

              <!-- Visual Content -->
              <div class="mt-4 w-full max-w-md">
                 <div class="text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Data Condition</div>
                 ${obstacle.renderVisual(question.dataDescription)}
              </div>
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
           SITUATION ANALYSIS: CHOOSE THE MOST EFFECTIVE STATISTIC
        </div>

      </div>
    </div>
  `;
};