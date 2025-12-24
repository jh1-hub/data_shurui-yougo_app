
import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

// Configuration
// STREAM_SPEED is now managed in gameState.js as state.streamSpeedBase

// Helper to determine button style based on option text
const getOptionStyle = (text) => {
  if (text.includes('質的')) return { colorClass: 'pink', icon: 'tag', label: 'QUALITATIVE' };
  if (text.includes('量的')) return { colorClass: 'cyan', icon: 'ruler', label: 'QUANTITATIVE' };
  if (text.includes('名義')) return { colorClass: 'violet', icon: 'hash', label: 'NOMINAL' };
  if (text.includes('順序')) return { colorClass: 'blue', icon: 'list-ordered', label: 'ORDINAL' };
  if (text.includes('間隔')) return { colorClass: 'emerald', icon: 'thermometer', label: 'INTERVAL' };
  if (text.includes('比例') || text.includes('比率')) return { colorClass: 'orange', icon: 'scale', label: 'RATIO' };
  return { colorClass: 'slate', icon: 'circle', label: 'OPTION' };
};

// --- Game Loop Logic ---

export const startStreamAnimation = () => {
  if (state.isPaused) return;
  
  const element = document.getElementById('stream-item');
  const track = document.getElementById('stream-track');
  
  if (!element || !track) return;

  const loop = () => {
    if (state.isPaused) return;

    // Use state.streamSpeedBase which is modified on wrong answers
    state.streamPosition -= state.streamSpeedBase + (state.streak * 0.02); 

    if (state.streamPosition <= 0) {
       window.app.handleStreamTimeUp();
       return;
    }

    element.style.left = `${state.streamPosition}%`;
    
    if (state.streamPosition < 30) {
      element.classList.add('border-rose-500', 'shadow-rose-500/50');
      element.classList.remove('border-slate-300');
    }

    state.animationFrameId = requestAnimationFrame(loop);
  };

  if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId);
  state.animationFrameId = requestAnimationFrame(loop);
};

export const stopStreamAnimation = () => {
  if (state.animationFrameId) {
    cancelAnimationFrame(state.animationFrameId);
    state.animationFrameId = null;
  }
};

// --- Renderer ---

const renderHeader = () => `
  <div class="flex justify-between items-center py-4 mb-2 z-10 relative">
     <button onclick="window.app.resetGame()" class="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
       <i data-lucide="arrow-left" class="w-4 h-4"></i> MENU
     </button>
     
     <div class="flex gap-4">
        <div class="bg-white/90 px-4 py-1 rounded-full shadow-sm border border-slate-200 text-rose-500 font-bold flex items-center gap-2">
           <i data-lucide="heart" class="w-4 h-4 fill-rose-500"></i> ${state.lives}
        </div>
        <div class="bg-white/90 px-4 py-1 rounded-full shadow-sm border border-slate-200 text-emerald-600 font-mono text-xl font-bold">
          ${state.currentScore}
        </div>
     </div>
  </div>
`;

// Render buttons for the stream game
const renderStreamControls = (options) => {
  const isFourOptions = options.length > 2;
  const gridClass = isFourOptions ? 'grid-cols-2 gap-4' : 'grid-cols-2 gap-8';
  const buttonHeight = isFourOptions ? 'h-32' : 'h-40';

  return `
    <div class="grid ${gridClass} w-full max-w-2xl mx-auto">
      ${options.map(option => {
        const style = getOptionStyle(option);
        // Map color names to Tailwind classes dynamically
        const colors = {
          pink: 'bg-pink-100/30 text-pink-500 border-pink-200 hover:bg-pink-50',
          cyan: 'bg-cyan-100/30 text-cyan-500 border-cyan-200 hover:bg-cyan-50',
          violet: 'bg-violet-100/30 text-violet-500 border-violet-200 hover:bg-violet-50',
          blue: 'bg-blue-100/30 text-blue-500 border-blue-200 hover:bg-blue-50',
          emerald: 'bg-emerald-100/30 text-emerald-500 border-emerald-200 hover:bg-emerald-50',
          orange: 'bg-orange-100/30 text-orange-500 border-orange-200 hover:bg-orange-50',
          slate: 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-50',
        };
        const activeColor = colors[style.colorClass] || colors.slate;
        
        // Extract text color for spans
        const textColorClass = `text-${style.colorClass}-600`;
        const subTextColorClass = `text-${style.colorClass}-400`;

        return `
          <button onclick="window.app.handleStreamAnswer('${escapeHtml(option)}')"
            class="group relative ${buttonHeight} rounded-2xl bg-white border-b-4 ${activeColor.split(' ')[2]} active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center justify-center gap-1 overflow-hidden shadow-sm"
          >
            <div class="absolute inset-0 scale-0 group-hover:scale-100 rounded-2xl transition-transform origin-center ${activeColor.split(' ')[0]}"></div>
            
            <i data-lucide="${style.icon}" class="w-8 h-8 ${textColorClass} relative z-10 mb-1"></i>
            <span class="text-lg font-bold ${textColorClass} relative z-10 leading-none">${escapeHtml(option)}</span>
            <span class="text-[10px] ${subTextColorClass} font-bold relative z-10 tracking-wider">${style.label}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;
};

export const renderDataTypeGame = (question) => {
  const isStreamMode = question.mode === 'stream';

  if (isStreamMode) {
    // === SCROLLING STREAM GAME ===
    const currentSpeedDisplay = Math.round((state.streamSpeedBase + (state.streak * 0.02)) * 100);
    
    return `
      <div class="h-screen flex flex-col p-4 max-w-6xl mx-auto overflow-hidden relative">
        ${renderHeader()}

        <!-- Background Decor -->
        <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div class="absolute top-[20%] left-0 w-full h-[1px] bg-slate-300"></div>
            <div class="absolute top-[80%] left-0 w-full h-[1px] bg-slate-300"></div>
            <div class="grid grid-cols-12 h-full w-full">
                ${Array(12).fill(0).map(() => `<div class="border-r border-slate-200 h-full"></div>`).join('')}
            </div>
        </div>

        <div class="flex-1 flex flex-col justify-center relative z-10">
          
          <!-- Instructions / Zone Labels -->
          <div class="flex justify-between w-full mb-4 px-10 text-slate-300 font-black text-6xl opacity-20 select-none pointer-events-none">
             <span>DEADLINE</span>
             <span>DATA</span>
          </div>

          <!-- The Stream Track -->
          <div id="stream-track" class="relative w-full h-48 bg-slate-100/50 border-y-2 border-slate-300 mb-8 flex items-center overflow-hidden">
             <!-- Danger Zone Indicator -->
             <div class="absolute left-0 top-0 h-full w-[20%] bg-gradient-to-r from-rose-100/50 to-transparent pointer-events-none"></div>

             <!-- The Item (Absolute positioned) -->
             <div id="stream-item" 
                  class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-80 bg-white border-2 border-slate-300 shadow-xl rounded-xl p-6 flex flex-col items-center justify-center transition-colors"
                  style="left: ${state.streamPosition}%; will-change: left;"
             >
                <div class="text-xs font-bold text-slate-400 mb-2 tracking-widest uppercase">Classify This</div>
                <h3 class="text-2xl font-black text-slate-800 text-center leading-tight">
                  ${escapeHtml(question.text)}
                </h3>
             </div>
          </div>

          <!-- Controls -->
          ${renderStreamControls(question.options)}
          
          <div class="mt-8 text-center">
             <div class="inline-block bg-slate-800 text-white text-xs px-4 py-2 rounded-full font-mono">
               SPEED: ${currentSpeedDisplay}%
             </div>
          </div>

        </div>

        <!-- Combo Counter -->
        ${state.streak > 1 ? `
        <div class="absolute bottom-10 right-10 flex flex-col items-end animate-bounce">
           <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-t from-amber-500 to-yellow-300 drop-shadow-sm">
             ${state.streak}
           </div>
           <div class="text-amber-500 font-bold tracking-widest text-sm">COMBO</div>
        </div>
        ` : ''}
      </div>
    `;
  } else {
    // === STANDARD QUIZ UI ===
    return `
      <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50">
        ${renderHeader()}

        <div class="flex-1 flex flex-col justify-center">
          <div class="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
            
            <div class="flex justify-between items-center mb-6 pl-4">
              <span class="text-emerald-600 text-xs font-bold tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full">
                ${question.topic}
              </span>
            </div>

            <div class="mb-8 pl-4">
              <h2 class="text-2xl font-bold text-slate-800 leading-relaxed">
                ${escapeHtml(question.text)}
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              ${question.options.map((option, idx) => `
                <button onclick="window.app.handleAnswer('${escapeHtml(option)}')"
                  class="text-left px-6 py-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md rounded-xl transition-all duration-200 group w-full cursor-pointer relative"
                >
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 font-mono text-sm transition-colors shadow-sm">
                      ${String.fromCharCode(65 + idx)}
                    </span>
                    <span class="text-slate-700 group-hover:text-emerald-900 font-bold">
                      ${escapeHtml(option)}
                    </span>
                  </div>
                </button>
              `).join('')}
            </div>
            
            <div class="text-center">
              <button onclick="window.app.requestHint()" ${state.hint ? 'disabled' : ''} class="text-slate-400 hover:text-emerald-600 text-sm font-bold flex items-center gap-2 mx-auto disabled:opacity-50">
                 <i data-lucide="lightbulb"></i> ヒントを見る
              </button>
              ${state.hint ? `<div class="mt-4 p-4 bg-amber-50 text-amber-800 text-sm rounded text-left border border-amber-200">${escapeHtml(state.hint)}</div>` : ''}
            </div>

          </div>
        </div>
      </div>
    `;
  }
};
