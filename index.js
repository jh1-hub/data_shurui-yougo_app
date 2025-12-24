
import { QUESTIONS_DATA } from './data.js';
import { GACHA_CARDS } from './data/gachaData.js';
import { POINTS_PER_QUESTION, TOPIC } from './constants.js';
import { state, resetState, saveCollection, saveHighScores, saveUserProgress } from './gameState.js';
import { escapeHtml } from './utils.js';

// Renderers
import { renderMenu } from './views/menuView.js';
import { renderResult } from './views/resultView.js';
import { renderTutorial } from './views/tutorialView.js';
import { renderCollection } from './views/collectionView.js';
// Removed renderToolSelection import as we integrate it into games
import { renderDataTypeGame, startStreamAnimation, stopStreamAnimation } from './games/dataTypeGame.js';
import { renderStandardGame } from './games/standardGame.js';
import { renderCentralTendencyGame, setupBalanceGame } from './games/centralTendencyGame.js';
import { renderMedianGame } from './games/medianGame.js';
import { renderOutlierGame } from './games/outlierGame.js';
import { renderModeGame } from './games/modeGame.js';
import { renderRaceGame } from './games/raceGame.js';

// --- Helper: Time Bonus Calculation ---
const calculateTimeBonus = () => {
  if (!state.questionStartTime) return 0;
  const elapsedSeconds = (Date.now() - state.questionStartTime) / 1000;
  const bonus = Math.max(0, Math.floor(50 - (elapsedSeconds * 2)));
  return bonus;
};

// --- Gacha Logic ---
const rollGacha = (score, topic) => {
    let prob = { UR: 0, SR: 0, R: 0, N: 100 };
    
    // Define Thresholds based on Topic Difficulty
    // Data Types (Stream) allows for high combos -> Higher thresholds
    // Central Tendency -> Lower thresholds (Harder)
    let sRank = 700;
    let aRank = 450;
    let bRank = 200;

    if (topic === TOPIC.DATA_TYPES) {
        sRank = 1200;
        aRank = 800;
        bRank = 400;
    }

    if (score >= sRank) { // Rank S
        prob = { UR: 15, SR: 35, R: 40, N: 10 };
    } else if (score >= aRank) { // Rank A
        prob = { UR: 5, SR: 20, R: 50, N: 25 };
    } else if (score >= bRank) { // Rank B
        prob = { UR: 1, SR: 5, R: 44, N: 50 };
    } else {
        prob = { UR: 0, SR: 1, R: 19, N: 80 };
    }

    const rand = Math.random() * 100;
    let selectedRarity = 'N';
    
    if (rand < prob.UR) selectedRarity = 'UR';
    else if (rand < prob.UR + prob.SR) selectedRarity = 'SR';
    else if (rand < prob.UR + prob.SR + prob.R) selectedRarity = 'R';
    
    // Pick a card of that rarity
    const pool = GACHA_CARDS.filter(c => c.rarity === selectedRarity);
    const card = pool[Math.floor(Math.random() * pool.length)];
    
    return card;
};

const handleGachaDraw = () => {
    if (state.hasDrawnGacha) return;
    
    state.isGachaAnimating = true;
    render();

    // Simulate animation delay (1.2s)
    setTimeout(() => {
        let card;
        let attempts = 0;
        const MAX_RETRIES = 3;

        // Reroll logic for duplicates
        do {
            card = rollGacha(state.currentScore, state.selectedTopic);
            attempts++;
            
            // Check if we already have this card
            const isDuplicate = state.collection.includes(card.id);
            
            if (!isDuplicate) {
                break; // New card found!
            }
            // If duplicate, loop again up to MAX_RETRIES
        } while (attempts <= MAX_RETRIES);

        state.gachaResult = card;
        state.isGachaAnimating = false;
        state.hasDrawnGacha = true;

        // Add to collection if new
        if (!state.collection.includes(card.id)) {
            state.collection.push(card.id);
            saveCollection();
        }

        render();
    }, 1200); 
};

// --- Actions ---

const showCollection = () => {
    state.screen = 'COLLECTION';
    render();
};

// New: Modal Actions for Collection
const openCardModal = (cardId) => {
    const modal = document.getElementById('card-modal');
    const content = document.getElementById('card-modal-content');
    const card = GACHA_CARDS.find(c => c.id === cardId);
    
    if (modal && content && card) {
        // Determine colors based on rarity
        let borderColor = "border-slate-300";
        let titleColor = "text-slate-800";
        let badgeBg = "bg-slate-500";
        
        if (card.rarity === 'UR') { borderColor = "border-amber-400"; titleColor = "text-amber-600"; badgeBg = "bg-amber-500"; }
        else if (card.rarity === 'SR') { borderColor = "border-emerald-400"; titleColor = "text-emerald-600"; badgeBg = "bg-emerald-500"; }
        else if (card.rarity === 'R') { borderColor = "border-blue-400"; titleColor = "text-blue-600"; badgeBg = "bg-blue-500"; }

        const icon = card.type === 'AI' ? '🧠' : card.type === 'NET' ? '🌐' : card.type === 'SIM' ? '🎲' : '📊';

        content.innerHTML = `
            <div class="bg-white rounded-3xl overflow-hidden border-4 ${borderColor} shadow-2xl max-w-sm w-full mx-4 relative animate-scaleIn">
                <!-- Close Button -->
                <button onclick="window.app.closeCardModal()" class="absolute top-3 right-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-2 z-10 transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>

                <div class="bg-slate-50 p-8 flex flex-col items-center border-b border-slate-100">
                    <div class="text-6xl mb-4 animate-bounce">${icon}</div>
                    <span class="${badgeBg} text-white px-4 py-1 rounded-full text-lg font-black shadow-sm mb-2">${card.rarity}</span>
                    <h3 class="text-2xl md:text-3xl font-black ${titleColor} text-center leading-tight">${escapeHtml(card.name)}</h3>
                </div>
                
                <div class="p-6 md:p-8">
                    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p class="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
                            ${escapeHtml(card.desc)}
                        </p>
                    </div>
                    <div class="mt-4 text-center">
                        <span class="text-xs text-slate-400 font-mono uppercase tracking-widest">ID: ${card.id}</span>
                    </div>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if(window.lucide) window.lucide.createIcons();
    }
};

const closeCardModal = () => {
    const modal = document.getElementById('card-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

const showTutorial = (module = 'TYPES') => {
    state.screen = 'TUTORIAL';
    state.tutorialModule = module;
    state.tutorialPage = 0; 
    state.tutorialStep = 0;
    state.tutorialFeedback = null;
    render();
};

// Helper to mark completion and start game immediately (for Practice button)
const markTutorialAndPlay = (module, level) => {
    if (!state.tutorialsRead.includes(module)) {
        state.tutorialsRead.push(module);
        saveUserProgress();
    }
    const topicLabel = module === 'TYPES' ? TOPIC.DATA_TYPES : TOPIC.CENTRAL_TENDENCY;
    startGame(topicLabel, level);
};

const nextTutorialPage = () => {
    let maxPages = 4;
    if (state.tutorialModule === 'CLEANING') {
        maxPages = 4;
    } 

    if (state.tutorialPage < maxPages) {
        state.tutorialPage++;
        state.tutorialStep = 0;
        state.tutorialFeedback = null;
        render();
    } else {
        // Tutorial Completed
        if (!state.tutorialsRead.includes(state.tutorialModule)) {
            state.tutorialsRead.push(state.tutorialModule);
            saveUserProgress(); // Save completion state
        }
        resetGame();
    }
};

const prevTutorialPage = () => {
    if (state.tutorialPage > 0) {
        state.tutorialPage--;
        state.tutorialStep = 0;
        state.tutorialFeedback = null;
        render();
    }
};

const handleTutorialAction = (action, value) => {
    if (state.tutorialFeedback === 'CORRECT') return;
    let isCorrect = false;

    if (state.tutorialModule === 'TYPES') {
        if (state.tutorialPage === 0 && action === 'choose_type') isCorrect = (value === 'QUALITATIVE');
        else if (state.tutorialPage === 1 && action === 'check_order') isCorrect = (value === 'YES');
        else if (state.tutorialPage === 2 && action === 'check_zero') isCorrect = (value === 'NO');
        else if (state.tutorialPage === 3 && action === 'check_ratio') isCorrect = (value === 'MONEY');
    } 
    else if (state.tutorialModule === 'CLEANING') {
        if (state.tutorialPage === 0 && action === 'identify_bad') isCorrect = (value === 2);
        else if (state.tutorialPage === 1 && action === 'missing_strategy') isCorrect = true; 
        else if (state.tutorialPage === 2 && action === 'tap_outlier') isCorrect = (value === 3);
        else if (state.tutorialPage === 3 && action === 'select_robust') isCorrect = (value === 'MEDIAN');
    }

    if (isCorrect) {
        state.tutorialFeedback = 'CORRECT';
        state.tutorialStep = 1;
    } else {
        state.tutorialFeedback = 'WRONG';
        setTimeout(() => {
            if (state.screen === 'TUTORIAL') {
                state.tutorialFeedback = null;
                render();
            }
        }, 1000);
    }
    render();
};

const startGame = (topic, level = null) => {
  resetState();
  state.currentLevel = level;

  let filtered = topic === 'ALL' 
    ? QUESTIONS_DATA 
    : QUESTIONS_DATA.filter(q => q.topic === topic);
  
  if (topic === TOPIC.DATA_TYPES) {
    if (level === 'NORMAL') {
      filtered = filtered.filter(q => q.options.length === 2);
    } else {
      filtered = filtered.filter(q => q.options.length === 4);
    }
  }

  // Set question count based on topic
  let questionCount = 5;
  if (topic === TOPIC.DATA_TYPES) {
      questionCount = 10;
  }

  filtered = [...filtered].sort(() => Math.random() - 0.5).slice(0, questionCount);

  state.screen = 'PLAYING';
  state.selectedTopic = topic;
  state.questions = filtered;
  state.balanceSliderValue = 50; 
  
  const firstQ = filtered[0];
  if (firstQ && firstQ.correctTool) {
      state.phase = 'SELECTION';
  } else {
      state.phase = 'EXECUTION';
  }

  state.questionStartTime = Date.now();
  render();
};

// --- Updated Tool Selection Logic ---
const handleToolSelect = (selectedTool) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    if (selectedTool === currentQuestion.correctTool) {
        // Correct Tool Selected
        
        // For interactive mini-games, we unlock Phase 2
        if (['balance', 'median', 'mode'].includes(currentQuestion.mode)) {
            state.phase = 'EXECUTION';
            render();
        } 
        // For multiple-choice style selection games (Race, Outlier), selection IS the answer
        else {
            handleAnswer(selectedTool);
        }
    } else {
        // Wrong Tool
        state.lives -= 1;
        state.streak = 0;
        
        if (state.lives <= 0) {
            processResult(false, 0);
        } else {
            // Shake effect or feedback could go here
            // For now, re-render to update lives
            render();
        }
    }
};

const handleAnswer = async (answer) => {
  if (state.lastAnswerCorrect !== null) return;
  const currentQuestion = state.questions[state.currentQuestionIndex];
  if (!currentQuestion) return;

  let isCorrect = false;
  if (currentQuestion.validAnswers && Array.isArray(currentQuestion.validAnswers)) {
      isCorrect = currentQuestion.validAnswers.includes(answer);
  } else {
      isCorrect = String(answer) === String(currentQuestion.correctAnswer);
  }
  
  state.lastAnswerCorrect = isCorrect;
  const bonus = isCorrect ? calculateTimeBonus() : 0;
  processResult(isCorrect, bonus); 
};

const handleStreamAnswer = (answer) => {
  if (state.lastAnswerCorrect !== null || state.isPaused) return;
  stopStreamAnimation();
  const currentQuestion = state.questions[state.currentQuestionIndex];
  if (!currentQuestion) return;

  const isCorrect = answer === currentQuestion.correctAnswer;
  state.lastAnswerCorrect = isCorrect;
  state.isPaused = true;

  if (!isCorrect) {
      // Slow down the stream for subsequent questions on mistake
      // Decrease by 0.05, minimum cap at 0.1
      state.streamSpeedBase = Math.max(0.1, state.streamSpeedBase - 0.05);
  }

  let timeBonus = 0;
  if (isCorrect) {
      timeBonus = Math.floor(state.streamPosition * 2); 
  }
  processResult(isCorrect, timeBonus);
};

const handleStreamTimeUp = () => {
  if (state.lastAnswerCorrect !== null) return;
  stopStreamAnimation();
  state.lastAnswerCorrect = false;
  state.isPaused = true;
  processResult(false, 0);
};

const handleBalanceSubmit = () => {
  if (state.lastAnswerCorrect !== null) return;
  const currentQuestion = state.questions[state.currentQuestionIndex];
  if (!currentQuestion) return;

  const userValue = state.balanceSliderValue;
  const targetValue = currentQuestion.correctAnswer;
  const margin = 3; 

  const diff = Math.abs(userValue - targetValue);
  const isCorrect = diff <= margin;

  state.lastAnswerCorrect = isCorrect;

  let bonus = 0;
  if (isCorrect) {
      const proximityBonus = Math.max(0, 50 - (diff * 10)); 
      bonus = proximityBonus + calculateTimeBonus();
  }
  processResult(isCorrect, bonus);
};

const processResult = (isCorrect, bonusPoints) => {
  state.explanation = null; 
  state.loadingExplanation = false;
  render(); 

  if (isCorrect) {
    const streakBonus = state.streak * 10;
    let pointsToAdd = POINTS_PER_QUESTION + bonusPoints + streakBonus;
    
    // Balance for Data Types (10 questions instead of 5): Halve the score
    if (state.selectedTopic === TOPIC.DATA_TYPES) {
        pointsToAdd = Math.round(pointsToAdd / 2);
    }

    state.currentScore += pointsToAdd;
    state.streak += 1;
    render();
  } else {
    state.lives -= 1;
    state.streak = 0;
    render();
  }
};

const nextQuestion = (wasCorrect) => {
  if (state.timeoutId) clearTimeout(state.timeoutId);
  state.timeoutId = null;

  state.lastAnswerCorrect = null;
  state.explanation = null;
  state.hint = null;
  state.isPaused = false;
  state.streamPosition = 100;
  state.balanceSliderValue = 50; 
  
  // Important: Reset to SELECTION phase for new question if applicable
  state.phase = 'SELECTION'; 

  if (!wasCorrect && state.lives <= 0) {
      finishGame();
      return;
  }

  if (state.currentQuestionIndex >= state.questions.length - 1) {
    finishGame();
  } else {
    state.currentQuestionIndex += 1;
    const nextQ = state.questions[state.currentQuestionIndex];
    if (nextQ && nextQ.correctTool) {
        state.phase = 'SELECTION';
    } else {
        state.phase = 'EXECUTION';
    }
    state.questionStartTime = Date.now();
    render();
  }
};

const finishGame = () => {
  stopStreamAnimation();
  if (state.timeoutId) clearTimeout(state.timeoutId);
  
  // Only update high scores and lock topic if NOT practice mode
  if (state.currentLevel !== 'NORMAL') {
      const currentTopic = state.selectedTopic;
      const currentScore = state.currentScore;
      const oldHigh = state.highScores[currentTopic] || 0;
      
      if (currentScore > oldHigh) {
          state.highScores[currentTopic] = currentScore;
          saveHighScores();
      }
      
      // Lock the current topic
      state.lastPlayedTopic = state.selectedTopic;
      saveUserProgress();
  }
  
  state.screen = 'RESULT';
  render();
};

const requestHint = async () => {
  if (state.hint) return;
  const currentQuestion = state.questions[state.currentQuestionIndex];
  state.hint = currentQuestion.hint || "よく問題を読んで考えよう！";
  render();
};

const resetGame = () => {
  stopStreamAnimation();
  resetState(); 
  state.screen = 'MENU';
  render();
};

// --- View Router ---

const renderFeedbackOverlay = () => {
   const isCorrect = state.lastAnswerCorrect;
   const question = state.questions[state.currentQuestionIndex];

   return `
      <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-900/50 animate-fadeIn">
        <div class="bg-white p-6 md:p-8 rounded-3xl max-w-2xl w-full border ${isCorrect ? 'border-emerald-200' : 'border-rose-200'} shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}"></div>

          <div class="mb-4 text-center">
            <div class="w-16 h-16 md:w-20 md:h-20 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'} rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <span class="text-3xl md:text-4xl">${isCorrect ? '🎉' : '😢'}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
              ${isCorrect ? '正解！' : 'Time Up / Failed...'}
            </h2>
          </div>
          
          <!-- Question Context Section (Added for clarity) -->
          <div class="mb-4 text-center border-b border-slate-100 pb-4">
             <span class="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">問題</span>
             <h3 class="text-lg md:text-xl font-black text-slate-800 mt-2 leading-snug">
               ${escapeHtml(question.text)}
             </h3>
             ${question.dataDescription ? `<p class="text-sm text-slate-500 mt-1 font-mono">${escapeHtml(question.dataDescription)}</p>` : ''}
          </div>
          
          <div class="bg-slate-50 p-4 md:p-6 rounded-xl text-left mb-6 border border-slate-100 max-h-[30vh] overflow-y-auto">
             <p class="text-slate-400 text-xs uppercase font-bold mb-2 tracking-wider">解説</p>
             <p class="text-slate-700 leading-relaxed text-base md:text-lg mb-4">
               ${escapeHtml(question.explanation)}
             </p>
          </div>

          <button id="feedback-next-btn" onclick="window.app.nextQuestion(${isCorrect})" 
            class="w-full ${isCorrect ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-700 hover:bg-slate-800'} text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg touch-manipulation"
          >
            ${state.lives <= 0 && !isCorrect ? '結果を見る' : '次の問題へ'} <i data-lucide="arrow-right" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
   `;
};

// Logic to handle countdown timer for incorrect answers
const startFeedbackTimer = () => {
    const btn = document.getElementById('feedback-next-btn');
    if (!btn) return;
    
    // Only lock button if answer was WRONG
    if (state.lastAnswerCorrect === false) {
        let count = 10;
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        
        // Use the original text structure but add count
        const baseText = state.lives <= 0 ? '結果を見る' : '次の問題へ';
        
        const updateText = () => {
             btn.innerHTML = `${baseText} (${count}) <i data-lucide="arrow-right" class="w-5 h-5 ml-2"></i>`;
             if(window.lucide) window.lucide.createIcons();
        };

        updateText();
        
        const timer = setInterval(() => {
            count--;
            if (count <= 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
                btn.innerHTML = `${baseText} <i data-lucide="arrow-right" class="w-5 h-5 ml-2"></i>`;
                if(window.lucide) window.lucide.createIcons();
            } else {
                updateText();
            }
        }, 1000);
    }
};

const render = () => {
  const root = document.getElementById('root');
  if (!root) return;

  stopStreamAnimation();

  let html = '';
  const question = state.questions[state.currentQuestionIndex];
  
  if (state.screen === 'MENU') {
    html = renderMenu();
  } else if (state.screen === 'RESULT') {
    html = renderResult();
  } else if (state.screen === 'TUTORIAL') {
    html = renderTutorial(); 
  } else if (state.screen === 'COLLECTION') {
    html = renderCollection();
  } else if (state.screen === 'PLAYING') {
    if (!question) {
        html = '<div>Loading...</div>';
    } else {
        // Updated Routing: Always pass through to specific game renderers
        // They now handle the 'SELECTION' phase visually internally
        if (question.mode === 'stream') {
            html = renderDataTypeGame(question);
        } else if (question.mode === 'balance') {
            html = renderCentralTendencyGame(question);
        } else if (question.mode === 'median') {
            html = renderMedianGame(question);
        } else if (question.mode === 'outlier') {
            html = renderOutlierGame(question);
        } else if (question.mode === 'mode') {
            html = renderModeGame(question);
        } else if (question.mode === 'race') {
            html = renderRaceGame(question);
        } else {
            html = renderStandardGame(question);
        }

        if (state.lastAnswerCorrect !== null) {
            html += renderFeedbackOverlay();
        }
    }
  }
  
  root.innerHTML = html;
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Post-render hooks
  if (state.screen === 'PLAYING') {
      if (state.phase === 'EXECUTION' && state.lastAnswerCorrect === null) {
          if (question?.mode === 'stream') {
            startStreamAnimation();
          } else if (question?.mode === 'balance') {
            setupBalanceGame(question);
          }
      }
      // Start feedback timer if overlay is present and answer was wrong
      if (state.lastAnswerCorrect === false) {
          startFeedbackTimer();
      }
  }
};

window.app = {
  startGame,
  markTutorialAndPlay,
  showTutorial,
  nextTutorialPage,
  prevTutorialPage,
  handleTutorialAction, 
  handleAnswer,
  handleStreamAnswer,
  handleStreamTimeUp,
  handleBalanceSubmit, 
  handleToolSelect,
  handleGachaDraw,
  showCollection,
  openCardModal,
  closeCardModal,
  nextQuestion,
  requestHint,
  resetGame,
  retryGame: () => startGame(state.selectedTopic, state.currentLevel)
};

render();
