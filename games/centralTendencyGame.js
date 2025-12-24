import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';
import { renderToolBar } from '../views/components.js';

// --- Logic ---
const calculateTilt = (dataPoints, fulcrumPos) => {
  const netTorque = dataPoints.reduce((acc, point) => acc + (point - fulcrumPos), 0);
  const maxTiltDeg = 20;
  let tilt = (netTorque / 100) * maxTiltDeg;
  tilt = Math.max(-maxTiltDeg, Math.min(maxTiltDeg, tilt));
  return tilt;
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

export const renderCentralTendencyGame = (question) => {
  const tilt = calculateTilt(question.dataPoints, state.balanceSliderValue);
  const isSelectionPhase = state.phase === 'SELECTION';
  
  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-x-hidden relative">
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
               <i data-lucide="scale" class="w-4 h-4 text-indigo-500"></i>
               ▲ をスライドさせて、シーソーが水平になる<br class="md:hidden">「重心」を見つけよう！
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

            <!-- The Balance Scale Game -->
            <div class="w-full h-64 md:h-80 relative flex items-center justify-center mb-8">
                
                <input type="range" id="balance-slider-direct" min="0" max="100" value="${state.balanceSliderValue}" 
                       class="absolute w-[95%] max-w-2xl h-32 opacity-0 cursor-pointer z-30 touch-manipulation"
                       style="top: 50%; transform: translateY(-50%);"
                >

                <div id="balance-beam" 
                     class="w-[95%] max-w-2xl h-2 bg-slate-700 relative transition-transform duration-200 ease-out origin-center pointer-events-none"
                     style="transform: rotate(${tilt}deg);"
                >
                   <div class="absolute top-0 left-0 w-full h-full opacity-30 flex justify-between px-2">
                     <div class="w-[1px] h-3 bg-white mt-[-4px]"></div>
                     <div class="w-[1px] h-3 bg-white mt-[-4px]"></div>
                     <div class="w-[1px] h-3 bg-white mt-[-4px]"></div>
                   </div>

                   ${question.dataPoints.map(val => `
                     <div class="absolute bottom-4 -translate-x-1/2 flex flex-col items-center" style="left: ${val}%">
                        <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg flex items-center justify-center text-white font-bold text-[10px] md:text-xs border-2 border-white z-10">
                          ${val}
                        </div>
                        <div class="w-[2px] h-4 bg-slate-400"></div>
                     </div>
                   `).join('')}
                </div>

                <div id="balance-fulcrum-visual"
                     class="absolute top-1/2 mt-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-amber-500 transition-all duration-75 pointer-events-none drop-shadow-md z-20"
                     style="left: ${state.balanceSliderValue}%; transform: translateX(-50%);"
                ></div>
                
                <div class="absolute top-1/2 mt-[26px] w-[95%] max-w-2xl h-1 bg-slate-200 rounded-full"></div>
            </div>

            <!-- Slider Control -->
            <div class="w-full max-w-2xl px-4 relative mb-4 mx-auto">
               <input type="range" id="balance-slider" min="0" max="100" value="${state.balanceSliderValue}" 
                      class="w-full h-16 opacity-0 cursor-pointer absolute top-0 left-0 z-30 touch-manipulation"
               >
               <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden mt-6">
                  <div id="balance-track-fill" class="h-full bg-amber-200" style="width: ${state.balanceSliderValue}%"></div>
               </div>
               <div class="text-center mt-4">
                  <span class="text-slate-400 text-xs font-bold uppercase tracking-widest mr-2">POSITION</span>
                  <span id="balance-value-display" class="text-3xl font-mono font-bold text-amber-500">${state.balanceSliderValue}</span>
               </div>
            </div>

            <div class="mt-4 text-center pb-8">
              <button onclick="window.app.handleBalanceSubmit()" 
                class="bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 inline-flex items-center gap-2 touch-manipulation"
              >
                決定！ <i data-lucide="check-circle" class="w-5 h-5"></i>
              </button>
            </div>

        </div>

      </div>
    </div>
  `;
};

export const setupBalanceGame = (question) => {
  const slider = document.getElementById('balance-slider');
  const sliderDirect = document.getElementById('balance-slider-direct');
  const beam = document.getElementById('balance-beam');
  const fulcrum = document.getElementById('balance-fulcrum-visual');
  const display = document.getElementById('balance-value-display');
  const trackFill = document.getElementById('balance-track-fill');

  if (!question) return;

  const updateVisuals = (val) => {
    const intVal = parseInt(val);
    state.balanceSliderValue = intVal;
    if(slider) slider.value = val;
    if(sliderDirect) sliderDirect.value = val;
    if(display) display.textContent = val;
    if(trackFill) trackFill.style.width = `${val}%`;
    if(fulcrum) fulcrum.style.left = `${val}%`; 
    if (beam) {
        const tilt = calculateTilt(question.dataPoints, intVal);
        beam.style.transform = `rotate(${tilt}deg)`;
    }
  };

  if (slider) slider.addEventListener('input', (e) => updateVisuals(e.target.value));
  if (sliderDirect) sliderDirect.addEventListener('input', (e) => updateVisuals(e.target.value));
};
