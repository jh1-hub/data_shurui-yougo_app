
import { state } from '../gameState.js';
import { GACHA_CARDS } from '../data/gachaData.js';
import { escapeHtml } from '../utils.js';

export const renderCollection = () => {
    // Only show cards available in the current stage
    // Stage 1: Only Stage 1 cards
    // Stage 2: Stage 1 + Stage 2 cards
    const availableCards = GACHA_CARDS.filter(c => c.stage <= state.stage);

    // Sort cards by rarity (UR -> SR -> R -> N) then by ID
    const rarityOrder = { 'UR': 0, 'SR': 1, 'R': 2, 'N': 3 };
    const sortedCards = [...availableCards].sort((a, b) => {
        if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        }
        return a.id.localeCompare(b.id);
    });

    const collectedIds = state.collection || [];
    const collectedCounts = state.collectionCounts || {};
    const total = sortedCards.length;
    // Count collected cards that are visible in this stage
    const collectedCount = sortedCards.filter(c => collectedIds.includes(c.id)).length;
    const progress = Math.round((collectedCount / total) * 100);

    return `
      <div class="min-h-screen bg-slate-50 flex flex-col relative">
         <!-- Modal Overlay (Initially Hidden) -->
         <div id="card-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-fadeIn">
             <div id="card-modal-content" class="w-full max-w-md flex justify-center"></div>
         </div>

         <!-- Header -->
         <div class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
            <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
               <h2 class="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
                  <i data-lucide="library" class="w-6 h-6 text-indigo-500"></i>
                  <span>用語カード図鑑</span>
                  <span class="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-normal ml-2">STAGE ${state.stage}</span>
               </h2>
               <button onclick="window.app.resetGame()" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors">
                  <i data-lucide="x" class="w-4 h-4"></i> 閉じる
               </button>
            </div>
            
            <!-- Progress Bar -->
            <div class="max-w-5xl mx-auto px-4 pb-4">
                <div class="flex justify-between text-xs font-bold text-slate-500 mb-1">
                   <span>COLLECTION PROGRESS</span>
                   <span>${collectedCount} / ${total} (${progress}%)</span>
                </div>
                <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div class="h-full bg-indigo-500 transition-all duration-500" style="width: ${progress}%"></div>
                </div>
            </div>
         </div>

         <!-- Scrollable Grid -->
         <div class="flex-1 p-4 overflow-y-auto">
            <div class="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-20">
               
               ${sortedCards.map(card => {
                  const isCollected = collectedIds.includes(card.id);
                  const count = collectedCounts[card.id] || 0;
                  
                  // Style based on rarity
                  let borderColor = "border-slate-200";
                  let badgeColor = "bg-slate-500";
                  let bgGradient = "bg-white";
                  
                  if (isCollected) {
                      if (card.rarity === 'UR') { borderColor = "border-amber-400"; badgeColor = "bg-amber-500"; bgGradient = "bg-gradient-to-br from-amber-50 to-white"; }
                      else if (card.rarity === 'SR') { borderColor = "border-emerald-400"; badgeColor = "bg-emerald-500"; bgGradient = "bg-gradient-to-br from-emerald-50 to-white"; }
                      else if (card.rarity === 'R') { borderColor = "border-blue-400"; badgeColor = "bg-blue-500"; bgGradient = "bg-gradient-to-br from-blue-50 to-white"; }
                  }

                  if (!isCollected) {
                      return `
                        <div class="aspect-[2/3] bg-slate-100 rounded-xl border-2 border-slate-200 flex flex-col items-center justify-center p-2 text-center opacity-60">
                           <div class="text-2xl font-black text-slate-300 select-none mb-1">?</div>
                           <div class="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">${card.rarity}</div>
                        </div>
                      `;
                  }

                  const iconName = card.icon || 'file-question';

                  return `
                    <button onclick="window.app.openCardModal('${card.id}')"
                       class="aspect-[2/3] ${bgGradient} rounded-xl border-2 ${borderColor} shadow-sm p-2 flex flex-col relative group overflow-hidden transition-transform hover:scale-[1.05] active:scale-95 items-center text-center">
                       
                       <!-- Header -->
                       <div class="absolute top-2 right-2 flex gap-1">
                          ${count > 1 ? `<span class="text-[9px] font-black text-white bg-rose-500 px-1.5 py-0.5 rounded shadow-sm">x${count}</span>` : ''}
                          <span class="text-[10px] font-black text-white ${badgeColor} px-1.5 py-0.5 rounded shadow-sm">${card.rarity}</span>
                       </div>
                       
                       <!-- Icon (Centered) -->
                       <div class="flex-1 flex items-center justify-center mt-4 text-slate-700">
                          <i data-lucide="${iconName}" class="w-10 h-10 md:w-14 md:h-14 filter group-hover:drop-shadow-md transition-all"></i>
                       </div>
                       
                       <!-- Name (Bottom) -->
                       <div class="w-full mt-2 min-h-[2.5em] flex items-center justify-center">
                          <h3 class="font-bold text-slate-800 text-xs md:text-sm leading-tight line-clamp-2">
                            ${escapeHtml(card.name)}
                          </h3>
                       </div>
                       
                       <!-- Click Hint -->
                       <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i data-lucide="zoom-in" class="w-6 h-6 text-slate-600/50"></i>
                       </div>
                    </button>
                  `;
               }).join('')}

            </div>
         </div>
         
         <div class="p-4 text-center text-slate-400 text-xs font-bold bg-slate-50 border-t border-slate-200">
            カードをタップして詳細を確認できます
         </div>
      </div>
    `;
};
