import { state } from '../gameState.js';
import { escapeHtml } from '../utils.js';

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

export const renderBoxPlotGame = (question) => {
  const currentValue = state.balanceSliderValue;
  const targetParam = question.targetParam; // 'Q1', 'Q2', 'Q3'
  
  // Static parts (Ghost)
  // We use the correct calculated quartiles to show the "rest" of the box plot faintly
  // EXCEPT the part the user is manipulating, which uses the slider value.
  const { min, q1, q2, q3, max } = question.quartiles;

  // Determine positions (0-100 scale)
  const posMin = min;
  const posMax = max;
  
  // Dynamic positions based on target interaction
  let posQ1 = targetParam === 'Q1' ? currentValue : q1;
  let posQ2 = targetParam === 'Q2' ? currentValue : q2;
  let posQ3 = targetParam === 'Q3' ? currentValue : q3;

  // Visual Styling for the active part
  const activeColor = 'border-amber-500 bg-amber-400';
  const ghostColor = 'border-slate-300 bg-slate-100';

  return `
    <div class="min-h-screen flex flex-col p-4 max-w-4xl mx-auto bg-slate-50 select-none overflow-hidden relative">
      <!-- Background Grid -->
      <div class="absolute inset-0 z-0 opacity-10" 
           style="background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 20px 20px;">
      </div>

      ${renderHeader()}

      <div class="flex-1 flex flex-col items-center relative z-10">
        
        <!-- Header -->
        <div class="w-full max-w-2xl text-center mb-6">
           <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-2 tracking-wider">
             <i data-lucide="pen-tool" class="w-3 h-3"></i> BOX PLOT BUILDER
           </div>
           <h2 class="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-2">
             ${escapeHtml(question.text)}
           </h2>
           <p class="text-slate-500 font-bold bg-white/60 inline-block px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-200">
             ${escapeHtml(question.subText)}
           </p>
        </div>

        <!-- Data Set Display (Sorted) -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
           ${[...question.dataPoints].sort((a,b)=>a-b).map(val => `
             <div class="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-mono font-bold text-slate-600 shadow-sm text-sm">
               ${val}
             </div>
           `).join('')}
        </div>

        <!-- Construction Zone -->
        <div class="w-full max-w-3xl h-48 bg-white border border-slate-200 rounded-3xl shadow-lg relative mb-6 overflow-hidden">
            
            <!-- Number Line -->
            <div class="absolute bottom-6 left-6 right-6 h-[2px] bg-slate-400"></div>
            <!-- Axis Labels (0, 50, 100) -->
            <div class="absolute bottom-2 left-6 -translate-x-1/2 text-[10px] text-slate-400 font-bold">0</div>
            <div class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold">50</div>
            <div class="absolute bottom-2 right-6 translate-x-1/2 text-[10px] text-slate-400 font-bold">100</div>

            <!-- The Box Plot Visualization -->
            <div class="absolute top-10 bottom-10 left-6 right-6">
                <!-- Center Line (Whiskers) -->
                <div class="absolute top-1/2 h-[2px] bg-slate-300 -translate-y-1/2" 
                     style="left: ${posMin}%; right: ${100 - posMax}%"></div>
                
                <!-- Min Cap -->
                <div class="absolute top-1/2 h-4 w-[2px] bg-slate-400 -translate-y-1/2" style="left: ${posMin}%"></div>
                
                <!-- Max Cap -->
                <div class="absolute top-1/2 h-4 w-[2px] bg-slate-400 -translate-y-1/2" style="left: ${posMax}%"></div>

                <!-- The Box (Q1 to Q3) -->
                <!-- We calculate width/left based on dynamic Q1/Q3 -->
                <div class="absolute top-1/2 -translate-y-1/2 h-16 border-2 flex items-center justify-center transition-all duration-75
                            ${targetParam === 'Q1' || targetParam === 'Q3' ? 'border-amber-400 bg-amber-50 shadow-amber-200/50 shadow-lg' : 'border-slate-300 bg-white/50'}"
                     style="left: ${Math.min(posQ1, posQ3)}%; width: ${Math.abs(posQ3 - posQ1)}%;">
                </div>

                <!-- Median Line (Q2) -->
                <div class="absolute top-1/2 -translate-y-1/2 h-16 w-[4px] z-10 transition-all duration-75
                            ${targetParam === 'Q2' ? 'bg-amber-500 shadow-lg shadow-amber-500/50 scale-y-110' : 'bg-slate-300'}"
                     style="left: ${posQ2}%;">
                </div>
                
                <!-- Active Indicator Label -->
                <div class="absolute -top-6 -translate-x-1/2 text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded transition-all duration-75"
                     style="left: ${currentValue}%">
                   ${targetParam}
                </div>
            </div>

        </div>

        <!-- Slider Control -->
        <div class="w-full max-w-2xl px-8 relative mb-4">
           <input type="range" id="boxplot-slider" min="0" max="100" value="${currentValue}" 
                  class="w-full h-16 opacity-0 cursor-pointer absolute top-0 left-0 z-30 touch-manipulation">
           
           <!-- Visual Track -->
           <div class="w-full h-4 bg-slate-200 rounded-full overflow-hidden mt-6 relative shadow-inner">
               <!-- Fill -->
               <div class="absolute top-0 left-0 h-full bg-indigo-200" style="width: ${currentValue}%"></div>
           </div>
           
           <!-- Thumb -->
           <div class="absolute top-6 w-8 h-8 bg-white border-2 border-indigo-400 rounded-full shadow-lg pointer-events-none transition-all duration-75 z-20 flex items-center justify-center"
                style="left: calc(${currentValue}% - 16px + 2rem)"> <!-- approximate centering logic -->
                <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
           </div>

           <!-- Value Display -->
           <div class="text-center mt-6">
              <span class="text-slate-400 text-xs font-bold uppercase tracking-widest mr-2">VALUE</span>
              <span id="boxplot-value-display" class="text-4xl font-mono font-black text-indigo-600">${currentValue}</span>
           </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-2">
          <button onclick="window.app.handleBalanceSubmit()" 
            class="bg-slate-800 hover:bg-slate-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 touch-manipulation"
          >
            決定！ <i data-lucide="check" class="w-5 h-5"></i>
          </button>
        </div>

      </div>
    </div>
  `;
};

// --- Logic ---

export const setupBoxPlotSlider = (question) => {
  const slider = document.getElementById('boxplot-slider');
  const display = document.getElementById('boxplot-value-display');
  // We can also grab specific elements to update style directly for performance, 
  // but re-rendering the whole component via innerHTML in a loop might be heavy?
  // Current app re-renders full HTML on many interactions, but for smooth sliding we might want direct DOM manipulation.
  
  // For now, let's use a simpler approach: Update generic state and re-render only necessary parts 
  // OR just update CSS variables/styles.
  
  // Let's rely on simple DOM updates for the visual elements to keep it smooth without React
  const medianLine = document.querySelector('.h-16.w-\\[4px\\]'); 
  const box = document.querySelector('.border-2.flex.items-center');
  const indicator = document.querySelector('.absolute.-top-6');
  const trackFill = document.querySelector('.bg-indigo-200');
  const thumb = document.querySelector('.absolute.top-6.w-8');
  
  if (!slider) return;

  const { min, q1, q2, q3, max } = question.quartiles;
  const targetParam = question.targetParam;

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.balanceSliderValue = val;
    
    if (display) display.textContent = val;
    
    // Update Track
    if (trackFill) trackFill.style.width = `${val}%`;
    if (thumb) thumb.style.left = `calc(${val}% - 16px + 2rem)`;

    // Update Box Plot Parts based on target
    if (indicator) {
        indicator.style.left = `${val}%`;
        indicator.textContent = `${targetParam}: ${val}`;
    }

    if (targetParam === 'Q2') {
        if (medianLine) medianLine.style.left = `${val}%`;
    } else if (targetParam === 'Q1') {
        // Box left moves, width changes
        // Assuming Q3 is fixed at calculated q3
        const currentQ3 = q3;
        const newLeft = Math.min(val, currentQ3);
        const newWidth = Math.abs(currentQ3 - val);
        if (box) {
            box.style.left = `${newLeft}%`;
            box.style.width = `${newWidth}%`;
        }
    } else if (targetParam === 'Q3') {
        // Box right moves (width changes, left stays if val > q1)
        const currentQ1 = q1;
        const newLeft = Math.min(val, currentQ1);
        const newWidth = Math.abs(val - currentQ1);
        if (box) {
             box.style.left = `${newLeft}%`;
             box.style.width = `${newWidth}%`;
        }
    }
  });
};
