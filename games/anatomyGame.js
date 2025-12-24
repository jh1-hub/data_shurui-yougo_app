import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

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

export const renderAnatomyGame = (question) => {
  const { min, q1, q2, q3, max, outliers } = question.data;

  // Hitbox rendering helpers
  // We render a larger transparent div around the actual line to make it easier to tap
  const HITBOX_WIDTH = 12; // % width for vertical lines
  const HITBOX_HEIGHT = 40; // px height extra for horizontal lines

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-10" 
           style="background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 20px 20px;">
      </div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Instruction Banner -->
        <div class="w-full max-w-2xl text-center mb-8 animate-fadeIn">
           <div class="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full mb-3 tracking-wider shadow-sm">
             <i data-lucide="scan-search" class="w-3 h-3"></i> GRAPH ANATOMY
           </div>
           <h2 class="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-2">
             <span class="text-violet-600 underline decoration-4 decoration-violet-200 underline-offset-4">${escapeHtml(question.targetTerm)}</span>
           </h2>
           <p class="text-slate-500 font-bold">
             グラフ上の正しい位置をタップせよ！
           </p>
        </div>

        <!-- The Graph Area -->
        <div class="w-full max-w-3xl h-64 bg-white border-2 border-slate-200 rounded-3xl shadow-xl relative mt-4 overflow-visible">
            
            <!-- Number Line -->
            <div class="absolute bottom-6 left-6 right-6 h-[2px] bg-slate-400"></div>
            <!-- Axis Labels -->
            <div class="absolute bottom-2 left-6 -translate-x-1/2 text-[10px] text-slate-400 font-bold">0</div>
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">50</div>
            <div class="absolute bottom-2 right-6 translate-x-1/2 text-[10px] text-slate-400 font-bold">100</div>

            <!-- Box Plot Visuals -->
            <div class="absolute top-10 bottom-10 left-6 right-6 select-none pointer-events-none">
                <!-- Center Line (Whiskers) -->
                <div class="absolute top-1/2 h-[2px] bg-slate-400 -translate-y-1/2" 
                     style="left: ${min}%; right: ${100 - max}%"></div>
                
                <!-- Min Cap -->
                <div class="absolute top-1/2 h-4 w-[2px] bg-slate-600 -translate-y-1/2" style="left: ${min}%"></div>
                
                <!-- Max Cap -->
                <div class="absolute top-1/2 h-4 w-[2px] bg-slate-600 -translate-y-1/2" style="left: ${max}%"></div>

                <!-- The Box -->
                <div class="absolute top-1/2 -translate-y-1/2 h-16 border-2 border-slate-600 bg-slate-100/50 flex items-center justify-center"
                     style="left: ${q1}%; width: ${q3 - q1}%;">
                </div>

                <!-- Median Line -->
                <div class="absolute top-1/2 -translate-y-1/2 h-16 w-[2px] bg-slate-600 z-10"
                     style="left: ${q2}%;">
                </div>

                <!-- Outliers -->
                ${outliers ? outliers.map(val => `
                    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-slate-600 bg-white" style="left: ${val}%"></div>
                `).join('') : ''}
            </div>

            <!-- INTERACTIVE LAYER (Hitboxes) -->
            <div class="absolute top-10 bottom-10 left-6 right-6 z-20">
                
                <!-- Min Hitbox -->
                <button onclick="window.app.handleAnatomyAnswer('min')"
                   class="absolute top-1/2 -translate-y-1/2 h-full hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded cursor-pointer"
                   style="left: ${min - HITBOX_WIDTH/2}%; width: ${HITBOX_WIDTH}%;">
                </button>

                <!-- Max Hitbox -->
                <button onclick="window.app.handleAnatomyAnswer('max')"
                   class="absolute top-1/2 -translate-y-1/2 h-full hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded cursor-pointer"
                   style="left: ${max - HITBOX_WIDTH/2}%; width: ${HITBOX_WIDTH}%;">
                </button>

                <!-- Q1 Hitbox -->
                <button onclick="window.app.handleAnatomyAnswer('q1')"
                   class="absolute top-1/2 -translate-y-1/2 h-full hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded cursor-pointer"
                   style="left: ${q1 - HITBOX_WIDTH/2}%; width: ${HITBOX_WIDTH}%;">
                </button>

                <!-- Q3 Hitbox -->
                <button onclick="window.app.handleAnatomyAnswer('q3')"
                   class="absolute top-1/2 -translate-y-1/2 h-full hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded cursor-pointer"
                   style="left: ${q3 - HITBOX_WIDTH/2}%; width: ${HITBOX_WIDTH}%;">
                </button>

                <!-- Median Hitbox (Slightly narrower than quartiles to avoid overlap if tight) -->
                <button onclick="window.app.handleAnatomyAnswer('q2')"
                   class="absolute top-1/2 -translate-y-1/2 h-full hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded cursor-pointer"
                   style="left: ${q2 - HITBOX_WIDTH/2}%; width: ${HITBOX_WIDTH}%;">
                </button>

                <!-- Outlier Hitboxes -->
                ${outliers ? outliers.map(val => `
                    <button onclick="window.app.handleAnatomyAnswer('outlier')"
                        class="absolute top-1/2 -translate-y-1/2 w-8 h-8 -ml-4 hover:bg-emerald-500/20 active:bg-emerald-500/40 transition-colors rounded-full cursor-pointer"
                        style="left: ${val}%">
                    </button>
                `).join('') : ''}

            </div>

        </div>
        
        <div class="mt-8 text-center text-slate-400 text-xs font-mono animate-pulse">
           <i data-lucide="mouse-pointer-2" class="w-4 h-4 inline mr-1"></i>
           TAP THE TARGET
        </div>

      </div>
    </div>
  `;
};
