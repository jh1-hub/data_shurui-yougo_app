
import { INITIAL_LIVES, INITIAL_STREAM_SPEED } from './constants.js';

// Load collection from local storage
const loadCollection = () => {
  try {
    const saved = localStorage.getItem('dd_collection');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to load collection", e);
    return [];
  }
};

// Load high scores from local storage
const loadHighScores = () => {
  try {
    const saved = localStorage.getItem('dd_highscores');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error("Failed to load highscores", e);
    return {};
  }
};

// New: Load User Progress (Last topic, Read tutorials)
const loadUserProgress = () => {
  try {
    const saved = localStorage.getItem('dd_progress');
    return saved ? JSON.parse(saved) : { lastPlayedTopic: null, tutorialsRead: [] };
  } catch (e) {
    console.error("Failed to load progress", e);
    return { lastPlayedTopic: null, tutorialsRead: [] };
  }
};

const progress = loadUserProgress();

export const state = {
  screen: 'MENU', // MENU, PLAYING, RESULT, TUTORIAL, COLLECTION
  phase: 'SELECTION', // 'SELECTION' (Choose Tool) or 'EXECUTION' (Play Minigame)
  currentScore: 0,
  currentQuestionIndex: 0,
  lives: INITIAL_LIVES,
  selectedTopic: 'ALL',
  
  // Persistent State
  lastPlayedTopic: progress.lastPlayedTopic, // Persisted lock
  tutorialsRead: progress.tutorialsRead || [], // Persisted tutorial completion ['TYPES', 'CLEANING'...]
  
  currentLevel: null, // 'NORMAL' or null (Standard/Professional)
  questions: [],
  streak: 0,
  lastAnswerCorrect: null, // null, true, false
  explanation: null,
  loadingExplanation: false,
  loadingHint: false,
  hint: null,
  animationFrameId: null, // For the scrolling game loop
  streamPosition: 100, // 100% (right) to 0% (left)
  streamSpeedBase: INITIAL_STREAM_SPEED, // Base speed for the stream game
  balanceSliderValue: 50, // For central tendency game (0-100)
  varianceData: [], // For variance game: current array of numbers (0-100)
  varianceBaseData: [], // For variance slider game: relative positions [-10, 5, 20...]
  varianceScale: 1.0, // Current scale factor for slider game
  isPaused: false,
  timeoutId: null, // For auto-advance timer
  activeModal: null, // null, 'LEVEL_SELECT'
  questionStartTime: null, // Timestamp when the current question started
  tutorialPage: 0, // Current page index for the tutorial wizard
  
  // Tutorial Interactive State
  tutorialModule: 'TYPES', // 'TYPES' (Data Types) or 'CLEANING' (Central Tendency & Cleaning)
  tutorialStep: 0, // Tracks progress within a tutorial page (0: init, 1: answered)
  tutorialFeedback: null, // 'CORRECT', 'WRONG', null

  // Collection / Gacha State
  collection: loadCollection(), // Array of collected card IDs
  gachaResult: null, // The card object obtained from the gacha
  isGachaAnimating: false,
  hasDrawnGacha: false, // Prevents multiple draws per game

  // High Scores
  highScores: loadHighScores() // { 'TOPIC_NAME': score, ... }
};

export const saveCollection = () => {
  try {
    localStorage.setItem('dd_collection', JSON.stringify(state.collection));
  } catch (e) {
    console.error("Failed to save collection", e);
  }
};

export const saveHighScores = () => {
  try {
    localStorage.setItem('dd_highscores', JSON.stringify(state.highScores));
  } catch (e) {
    console.error("Failed to save highscores", e);
  }
};

export const saveUserProgress = () => {
  try {
    const data = {
        lastPlayedTopic: state.lastPlayedTopic,
        tutorialsRead: state.tutorialsRead
    };
    localStorage.setItem('dd_progress', JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const resetState = () => {
  if (state.animationFrameId) {
    cancelAnimationFrame(state.animationFrameId);
  }
  if (state.timeoutId) {
    clearTimeout(state.timeoutId);
  }
  state.currentScore = 0;
  state.currentQuestionIndex = 0;
  state.lives = INITIAL_LIVES;
  state.streak = 0;
  state.lastAnswerCorrect = null;
  state.explanation = null;
  state.hint = null;
  state.loadingHint = false;
  state.loadingExplanation = false;
  state.animationFrameId = null;
  state.streamPosition = 100;
  state.streamSpeedBase = INITIAL_STREAM_SPEED; // Reset speed
  state.balanceSliderValue = 50;
  state.varianceData = [];
  state.varianceBaseData = [];
  state.varianceScale = 1.0;
  state.isPaused = false;
  state.timeoutId = null;
  state.activeModal = null;
  state.questionStartTime = null;
  state.tutorialPage = 0;
  state.tutorialModule = 'TYPES';
  state.tutorialStep = 0;
  state.tutorialFeedback = null;
  state.currentLevel = null;
  state.phase = 'SELECTION'; // Reset phase
  state.gachaResult = null;
  state.isGachaAnimating = false;
  state.hasDrawnGacha = false;
  // Note: state.lastPlayedTopic and state.tutorialsRead are NOT reset here
  // Note: state.collection and highScores persist
};
