
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

// Load collection counts from local storage
const loadCollectionCounts = (existingCollection) => {
  try {
    const saved = localStorage.getItem('dd_collection_counts');
    if (saved) {
      return JSON.parse(saved);
    } else {
      // Migration: Initialize counts to 1 for existing items
      const counts = {};
      if (Array.isArray(existingCollection)) {
        existingCollection.forEach(id => {
          counts[id] = 1;
        });
      }
      return counts;
    }
  } catch (e) {
    console.error("Failed to load collection counts", e);
    return {};
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

// New: Load User Progress (Last topic, Read tutorials, Stage)
const loadUserProgress = () => {
  try {
    const saved = localStorage.getItem('dd_progress');
    // Default stage is 1
    return saved ? { stage: 1, ...JSON.parse(saved) } : { lastPlayedTopic: null, tutorialsRead: [], stage: 1 };
  } catch (e) {
    console.error("Failed to load progress", e);
    return { lastPlayedTopic: null, tutorialsRead: [], stage: 1 };
  }
};

// Load persistent gacha stats
const loadGachaStats = () => {
    try {
        const saved = localStorage.getItem('dd_gacha_stats');
        return saved ? JSON.parse(saved) : { consecutiveDupes: 0 };
    } catch(e) {
        return { consecutiveDupes: 0 };
    }
};

const progress = loadUserProgress();
const initialCollection = loadCollection();
const gachaStats = loadGachaStats();

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
  stage: progress.stage || 1, // 1: Initial (10 cards), 2: Expanded (30 cards)
  
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
  activeModal: null, // null, 'LEVEL_SELECT', 'STAGE_CLEAR'
  questionStartTime: null, // Timestamp when the current question started
  tutorialPage: 0, // Current page index for the tutorial wizard
  
  // Tutorial Interactive State
  tutorialModule: 'TYPES', // 'TYPES' (Data Types) or 'CLEANING' (Central Tendency & Cleaning)
  tutorialStep: 0, // Tracks progress within a tutorial page (0: init, 1: answered)
  tutorialFeedback: null, // 'CORRECT', 'WRONG', null

  // Collection / Gacha State
  collection: initialCollection, // Array of collected card IDs (Unique)
  collectionCounts: loadCollectionCounts(initialCollection), // Object { id: count }
  gachaResult: null, // The card object currently being viewed
  isGachaAnimating: false,
  hasDrawnGacha: false, // Prevents multiple draws per game
  consecutiveDupes: gachaStats.consecutiveDupes || 0, // Pity counter
  
  // Gacha Reroll Logic
  gachaState: 'IDLE', // 'IDLE', 'ANIMATING', 'RESULT_NEW', 'RESULT_DUPLICATE'
  rerollCount: 0,
  maxRerolls: 0,

  // High Scores
  highScores: loadHighScores() // { 'TOPIC_NAME': score, ... }
};

export const saveCollection = () => {
  try {
    localStorage.setItem('dd_collection', JSON.stringify(state.collection));
    localStorage.setItem('dd_collection_counts', JSON.stringify(state.collectionCounts));
  } catch (e) {
    console.error("Failed to save collection", e);
  }
};

export const saveGachaStats = () => {
    try {
        localStorage.setItem('dd_gacha_stats', JSON.stringify({ consecutiveDupes: state.consecutiveDupes }));
    } catch (e) {
        console.error("Failed to save gacha stats", e);
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
        tutorialsRead: state.tutorialsRead,
        stage: state.stage
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
  
  // Reset Gacha Session State
  state.gachaResult = null;
  state.isGachaAnimating = false;
  state.hasDrawnGacha = false;
  state.gachaState = 'IDLE';
  state.rerollCount = 0;
  state.maxRerolls = 0;
  
  // Note: state.lastPlayedTopic, state.tutorialsRead, and state.stage are NOT reset here
  // Note: state.collection, highScores, and consecutiveDupes persist
};
