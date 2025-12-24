import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

// Calculate Standard Deviation based on distance from fixed center (50)
export const calculateVisualSD = (dataPoints) => {
  if (dataPoints.length === 0) return 0;
  const fixedMean = 50; // Visual center line
  // Variance = sum((x - mean)^2) / N
  const variance = dataPoints.reduce((acc, val) => acc + Math.pow(val - fixedMean, 2), 0) / dataPoints.length;
  return Math.sqrt(variance);
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

// Render the slider UI for MATCH_SD mode
const renderSigmaSliderControls = (currentSD, targetSD) => {
    // Determine closeness for feedback colors
    const diff = Math.abs(currentSD - targetSD);
    let colorClass = "text-slate-700";
    if (diff < 1.5) colorClass = "text-emerald-500";
    else if (diff < 5.0) colorClass = "text-amber-500";

    return `
      <!-- Slider Controls -->
      <div class="w-full max-w-2xl px-4 relative mb-6">
         <div class="flex justify-between items-end mb-2">
            <div>
               <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">CURRENT SD</div>
               <div class="text-3xl font-mono font-black ${colorClass}">${currentSD.toFixed(1)}</div>
            </div>
            <div class="text-right">
               <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">TARGET</div>
               <div class="text-3xl font-mono font-black text-slate-800">${targetSD.toFixed(1)}</div>
            </div>
         </div>
         
         <!-- Slider -->
         <div class="relative h-12 flex items-center">
            <input type="range" id="sigma-slider" min="0.1" max="4.0" step="0.1" value="${state.varianceScale}" 
                   class="w-full h-12 opacity-0 cursor-pointer absolute top-0 left-0 z-20 touch-manipulation">
            
            <div class="w-full h-4 bg-slate-200 rounded-full overflow-hidden relative">
               <div class="h-full bg-gradient-to-r from-blue-300 to-indigo-400" style="width: ${(state.varianceScale / 4.0) * 100}%"></div>
            </div>
            <div class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none w-8 h-8 bg-white border-2 border-slate-300 rounded-full shadow-md z-10 transition-all"
                 style="left: calc(${(state.varianceScale / 4.0) * 100}% - 16px)">
            </div>
         </div>
         
         <div class="text-center mt-2 text-xs text-slate-400">
           <i data-lucide="move-horizontal" class="w-3 h-3 inline"></i> DRAG TO SCALE
         </div>

         <!-- Submit Button -->
         <div class="mt-4 flex justify-center">
            <button onclick="window.app.handleVarianceSliderSubmit()" 
              class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              確定する <i data-lucide="check" class="w-4 h-4"></i>
            </button>
         </div>
      </div>
    `;
};

export const renderVarianceGame = (question) => {
  const currentSD = calculateVisualSD(state.varianceData);
  const isSliderMode = question.missionType === 'MATCH_SD';
  const isLowerMission = question.missionType === 'LOWER';
  
  // Progress Logic (Buster Mode)
  let meterColor = 'bg-slate-300';
  let goalReached = false;
  let meterWidth = 0;
  
  if (!isSliderMode) {
      if (isLowerMission) {
        if (currentSD <= question.threshold) {
            meterColor = 'bg-emerald-500';
            goalReached = true;
        } else {
            meterColor = 'bg-rose-400';
        }
      } else {
        if (currentSD >= question.threshold) {
            meterColor = 'bg-emerald-500';
            goalReached = true;
        } else {
            meterColor = 'bg-blue-400';
        }
      }
      meterWidth = Math.min(100, (currentSD / 50) * 100);
  }

  // Instructions
  let missionTitle = "";
  let missionDesc = "";
  let iconName = "";
  
  if (isSliderMode) {
     missionTitle = "SIGMA SLIDER";
     missionDesc = "スライダーを動かして、データの散らばりを調整し、<strong>目標の標準偏差(SD)</strong>に合わせてください。";
     iconName = "sliders-horizontal";
  } else {
     missionTitle = isLowerMission ? "バラつきを抑えろ！" : "バラつきを作れ！";
     missionDesc = isLowerMission 
        ? "平均（中心）から<strong>遠いデータ</strong>をタップして消し、集団をまとめよう。" 
        : "平均（中心）に<strong>近いデータ</strong>をタップして消し、両極端な集団にしよう。";
     iconName = isLowerMission ? "shrink" : "expand";
  }

  // Check data count for warning (Buster Mode)
  const dataCount = state.varianceData.length;
  const isLowData = dataCount <= 5;

  // --- Dot Plot Positioning Logic ---
  const points = state.varianceData.map((val, idx) => ({ val, originalIdx: idx }));
  points.sort((a, b) => a.val - b.val);

  // Calculate stack levels
  const rows = []; 
  const separationThreshold = 6; 

  points.forEach(p => {
    let placed = false;
    let y = 0;
    while (!placed) {
        const lastValInRow = rows[y];
        if (lastValInRow === undefined || (p.val - lastValInRow) >= separationThreshold) {
            rows[y] = p.val; 
            p.yLevel = y;
            placed = true;
        } else {
            y++; 
        }
    }
  });

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-10" 
           style="background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 40px 40px;">
      </div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Mission Header -->
        <div class="w-full max-w-2xl bg-white/80 backdrop-blur rounded-2xl p-4 mb-4 shadow-sm border border-slate-200 text-center">
           <div class="inline-flex items-center gap-2 px-3 py-1 ${isSliderMode ? 'bg-indigo-100 text-indigo-700' : (isLowerMission ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700')} text-xs font-bold rounded-full mb-2 tracking-wider">
             <i data-lucide="${iconName}" class="w-3 h-3"></i> ${missionTitle}
           </div>
           <h2 class="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-2">
             ${escapeHtml(question.text)}
           </h2>
           <p class="text-slate-500 text-xs md:text-sm">
             ${missionDesc}
           </p>
        </div>

        <!-- Mode Specific Controls -->
        ${!isSliderMode ? `
        <!-- Meter (Buster Mode) -->
        <div class="flex items-center gap-4 w-full max-w-md bg-white p-3 rounded-xl shadow-md border border-slate-200 mb-6 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full ${goalReached ? 'bg-emerald-500' : 'bg-slate-300'}"></div>
            <div class="flex-1">
                <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
                  <span>Standard Deviation</span>
                  <span>Goal: ${isLowerMission ? 'UNDER' : 'OVER'} ${question.threshold}</span>
                </div>
                <div class="h-6 bg-slate-100 rounded-full overflow-hidden relative">
                    <div class="h-full ${meterColor} transition-all duration-300 ease-out flex items-center justify-end px-2" style="width: ${meterWidth}%">
                    </div>
                    <!-- Threshold Line -->
                    <div class="absolute top-0 bottom-0 w-[2px] bg-slate-800/50 z-10 dashed" style="left: ${(question.threshold / 50) * 100}%"></div>
                </div>
            </div>
            <div class="text-2xl font-mono font-black w-16 text-right ${goalReached ? 'text-emerald-500' : 'text-slate-700'}">
                ${currentSD.toFixed(1)}
            </div>
        </div>
        ` : renderSigmaSliderControls(currentSD, question.targetSD)}

        <!-- Game Area (Dot Plot) -->
        <div class="w-full max-w-2xl flex-1 relative bg-white/50 rounded-3xl border border-slate-200 shadow-inner overflow-hidden mb-4 min-h-[250px] transition-all">
            
            <!-- Number Line (Axis) -->
            <div class="absolute bottom-8 left-0 w-full h-[2px] bg-slate-400 z-0"></div>
            
            <!-- Axis Labels -->
            <div class="absolute bottom-2 left-[5%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">0</div>
            <div class="absolute bottom-2 left-[50%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">50</div>
            <div class="absolute bottom-2 left-[95%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">100</div>

            <!-- Central Mean Line -->
            <div class="absolute top-0 bottom-8 left-1/2 w-[2px] bg-slate-800/10 -translate-x-1/2 z-0 flex flex-col items-center justify-start pt-2">
               <span class="text-[10px] font-bold text-slate-400 bg-white/80 px-1 rounded shadow-sm border border-slate-200">MEAN</span>
            </div>
            
            <!-- Count Indicator (Only for Buster) -->
            ${!isSliderMode ? `
            <div class="absolute top-4 right-4 z-0">
               <div class="flex items-center gap-2 px-3 py-1 rounded-full ${isLowData ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'} font-bold text-xs border border-white/50">
                  <i data-lucide="layers" class="w-3 h-3"></i> 残りデータ: ${dataCount} (Min 4)
               </div>
            </div>` : ''}

            <!-- Particles -->
            ${points.map((p) => {
              const val = p.val;
              const idx = p.originalIdx;
              
              // Visuals
              const dist = Math.abs(val - 50);
              const isFar = dist > 25;
              const isClose = dist < 10;
              
              let colorClass = 'bg-blue-500 border-blue-600 shadow-blue-500/30';
              let lineClass = 'bg-blue-400/30';
              
              if (isFar) {
                 colorClass = 'bg-rose-500 border-rose-600 shadow-rose-500/30';
                 lineClass = 'bg-rose-400/30';
              } else if (isClose) {
                 colorClass = 'bg-emerald-500 border-emerald-600 shadow-emerald-500/30';
                 lineClass = 'bg-emerald-400/30';
              }

              const bottomBase = 12; 
              const stackStep = 12; 
              const bottomPos = bottomBase + (p.yLevel * stackStep);
              const lineLeft = Math.min(val, 50);
              const lineWidth = dist;

              // Interaction: Click only works in Buster mode
              const clickAttr = !isSliderMode ? `onclick="window.app.handleVarianceTap(${idx})"` : '';
              const cursorClass = !isSliderMode ? 'cursor-pointer hover:scale-110 active:scale-95' : '';
              const xIcon = !isSliderMode ? `
                  <div class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                     <i data-lucide="x" class="w-5 h-5 text-white"></i>
                  </div>` : '';

              return `
                <div class="absolute h-[2px] ${lineClass} z-0 pointer-events-none transition-all duration-75"
                     style="left: ${lineLeft}%; bottom: ${bottomPos + 5}%; width: ${lineWidth}%;">
                </div>

                <button ${clickAttr}
                   class="absolute w-10 h-10 md:w-12 md:h-12 rounded-full ${colorClass} shadow-lg border-b-4 ${!isSliderMode ? 'active:border-b-0 active:translate-y-[2px]' : ''} flex flex-col items-center justify-center text-white transition-all duration-200 z-10 touch-manipulation group ${cursorClass}"
                   style="left: ${val}%; bottom: ${bottomPos}%; transform: translateX(-50%);"
                >
                  <span class="text-xs md:text-sm font-bold leading-none">${Math.round(val)}</span>
                  ${xIcon}
                </button>
              `;
            }).join('')}

        </div>
        
        <!-- Legend -->
        <div class="flex gap-4 justify-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
           <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-emerald-500"></div>影響：小</div>
           <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-blue-500"></div>影響：中</div>
           <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bg-rose-500"></div>影響：大</div>
        </div>

      </div>
    </div>
  `;
};

// --- Event Handlers for Slider ---

export const setupVarianceSlider = () => {
    const slider = document.getElementById('sigma-slider');
    if (!slider) return;

    slider.addEventListener('input', (e) => {
        const scale = parseFloat(e.target.value);
        state.varianceScale = scale;
        
        // Recalculate positions based on baseData
        // val = 50 + (baseVal * scale)
        // Clamp between 2 and 98 to stay inside graph
        state.varianceData = state.varianceBaseData.map(v => Math.max(2, Math.min(98, 50 + v * scale)));
        
        // Force Re-render to update dots
        if (window.app.renderVarianceGameForUpdate) {
            window.app.renderVarianceGameForUpdate();
        }
    });
};

// Lightweight update function for smooth slider interaction
export const renderVarianceGameForUpdate = () => {
    const root = document.getElementById('root');
    // We need a way to update positions WITHOUT destroying the DOM to keep focus.
    
    const currentSD = calculateVisualSD(state.varianceData);
    const question = state.questions[state.currentQuestionIndex];

    // 1. Update SD Display Text and Color
    const sdDisplay = document.querySelector('.text-3xl.font-mono.font-black.text-slate-700, .text-3xl.font-mono.font-black.text-emerald-500, .text-3xl.font-mono.font-black.text-amber-500');
    if (sdDisplay) {
        sdDisplay.innerText = currentSD.toFixed(1);
        const targetSD = question.targetSD;
        const diff = Math.abs(currentSD - targetSD);
        sdDisplay.className = `text-3xl font-mono font-black ${diff < 1.5 ? 'text-emerald-500' : (diff < 5.0 ? 'text-amber-500' : 'text-slate-700')}`;
    }

    // 2. Update Dots Visualization
    // Recalculate stacking logic
    const points = state.varianceData.map((val, idx) => ({ val, originalIdx: idx }));
    points.sort((a, b) => a.val - b.val);
    const rows = [];
    const separationThreshold = 6;
    points.forEach(p => {
        let placed = false;
        let y = 0;
        while (!placed) {
            const lastValInRow = rows[y];
            if (lastValInRow === undefined || (p.val - lastValInRow) >= separationThreshold) {
                rows[y] = p.val;
                p.yLevel = y;
                placed = true;
            } else { y++; }
        }
    });

    // Find the Game Area container
    const gameArea = document.querySelector('.bg-white\\/50.rounded-3xl');
    if (gameArea) {
        const dotsHtml = `
            <!-- Number Line (Axis) -->
            <div class="absolute bottom-8 left-0 w-full h-[2px] bg-slate-400 z-0"></div>
            <!-- Axis Labels -->
            <div class="absolute bottom-2 left-[5%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">0</div>
            <div class="absolute bottom-2 left-[50%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">50</div>
            <div class="absolute bottom-2 left-[95%] -translate-x-1/2 text-[10px] text-slate-400 font-bold">100</div>
            <!-- Central Mean Line -->
            <div class="absolute top-0 bottom-8 left-1/2 w-[2px] bg-slate-800/10 -translate-x-1/2 z-0 flex flex-col items-center justify-start pt-2">
               <span class="text-[10px] font-bold text-slate-400 bg-white/80 px-1 rounded shadow-sm border border-slate-200">MEAN</span>
            </div>
            
            ${points.map((p) => {
              const val = p.val;
              const dist = Math.abs(val - 50);
              const isFar = dist > 25;
              const isClose = dist < 10;
              let colorClass = 'bg-blue-500 border-blue-600 shadow-blue-500/30';
              let lineClass = 'bg-blue-400/30';
              if (isFar) { colorClass = 'bg-rose-500 border-rose-600 shadow-rose-500/30'; lineClass = 'bg-rose-400/30'; } 
              else if (isClose) { colorClass = 'bg-emerald-500 border-emerald-600 shadow-emerald-500/30'; lineClass = 'bg-emerald-400/30'; }
              
              const bottomPos = 12 + (p.yLevel * 12);
              const lineLeft = Math.min(val, 50);
              const lineWidth = dist;

              return `
                <div class="absolute h-[2px] ${lineClass} z-0 pointer-events-none transition-all duration-75"
                     style="left: ${lineLeft}%; bottom: ${bottomPos + 5}%; width: ${lineWidth}%;"></div>
                <button class="absolute w-10 h-10 md:w-12 md:h-12 rounded-full ${colorClass} shadow-lg border-b-4 flex flex-col items-center justify-center text-white transition-all duration-200 z-10"
                   style="left: ${val}%; bottom: ${bottomPos}%; transform: translateX(-50%);">
                  <span class="text-xs md:text-sm font-bold leading-none">${Math.round(val)}</span>
                </button>
              `;
            }).join('')}
        `;
        gameArea.innerHTML = dotsHtml;
    }
    
    // 3. Update Progress Bar
    const trackBar = document.querySelector('.bg-gradient-to-r');
    if (trackBar) trackBar.style.width = `${(state.varianceScale / 4.0) * 100}%`;
    const knob = document.querySelector('.absolute.left-0.top-1\\/2.-translate-y-1\\/2');
    if (knob) knob.style.left = `calc(${(state.varianceScale / 4.0) * 100}% - 16px)`;
};
