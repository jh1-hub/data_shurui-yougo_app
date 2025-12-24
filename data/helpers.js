
import { TOPIC } from '../constants.js';

// --- Math Helpers ---

const getMedian = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 
    ? sorted[mid] 
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Calculate Quartiles
const getQuartiles = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  
  let lowerHalf = [];
  let upperHalf = [];

  if (n % 2 === 0) {
    // Even: Split right down the middle
    lowerHalf = sorted.slice(0, mid);
    upperHalf = sorted.slice(mid);
  } else {
    // Odd: Exclude the exact middle element
    lowerHalf = sorted.slice(0, mid);
    upperHalf = sorted.slice(mid + 1);
  }

  const q1 = getMedian(lowerHalf);
  const q2 = getMedian(sorted);
  const q3 = getMedian(upperHalf);
  const min = sorted[0];
  const max = sorted[n - 1];

  return { min, q1, q2, q3, max };
};

// --- Question Generators ---

// Helper for stream questions (Data Types)
export const createStreamQuestion = (id, text, correctAnswer, category, detail, hint = "数字の大きさに意味があるか？計算ができるか？を考えよう。") => ({
  id,
  topic: TOPIC.DATA_TYPES,
  mode: 'stream',
  text: text,
  options: ['質的データ', '量的データ'],
  correctAnswer: correctAnswer,
  explanation: `【${category}】 ${detail}これは「${correctAnswer}」に分類されます。`,
  hint: hint
});

// Helper for balance questions (Mean)
export const createBalanceQuestion = (id, text, dataPoints, explanation) => {
  const sum = dataPoints.reduce((a, b) => a + b, 0);
  const mean = sum / dataPoints.length;
  return {
    id,
    topic: TOPIC.CENTRAL_TENDENCY,
    mode: 'balance',
    correctTool: 'MEAN', // New Property
    text: `【重心】${text}`, // Added tag
    dataPoints: dataPoints, // Array of numbers 0-100
    correctAnswer: mean,
    options: [], 
    explanation: explanation,
    hint: "シーソーが水平になる「重心」を探してください。"
  };
};

// Helper for median questions (Median Slicer)
export const createMedianQuestion = (id, text, numbers, explanation) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = getMedian(sorted);

  return {
    id,
    topic: TOPIC.CENTRAL_TENDENCY,
    mode: 'median',
    correctTool: 'MEDIAN', // New Property
    text: `【順位】${text}`, // Added tag
    numbers: numbers, // Displayed numbers
    correctAnswer: median.toString(), // Store as string for comparison logic
    options: [],
    explanation: `データを小さい順に並べ替えると【${sorted.join(', ')}】になります。ど真ん中にある「${median}」が中央値です。`,
    hint: "頭の中で、数字を小さい順に並べ替えましょう。"
  };
};

// Helper for outlier defense questions
export const createOutlierQuestion = (id, title, context, data, hasOutlier, explanation, hideVisual = false) => {
  // Logic: If there is an outlier, we want Median. If symmetric, Mean.
  // BUT: The game allows selecting any tool to answer. 
  // For the "Tool Selection Phase", we want the user to pick the *Best* tool.
  const idealTool = hasOutlier ? 'MEDIAN' : 'MEAN';
  
  return {
    id,
    topic: TOPIC.CENTRAL_TENDENCY,
    mode: 'outlier',
    correctTool: idealTool, // New Property for the Selection Phase
    text: title, 
    subText: context, 
    dataPoints: data, 
    correctAnswer: idealTool, // For the game phase logic
    options: ['MEAN', 'MEDIAN', 'MODE'],
    explanation: explanation,
    hideVisual: hideVisual, // New property to toggle visual assistance
    hint: hideVisual ? "数値をよく見てください。他と桁が違う値はありませんか？" : "極端に大きすぎる、あるいは小さすぎる値（外れ値）はありますか？"
  };
};

// Helper for mode questions
export const createModeQuestion = (id, text, distribution, explanation) => {
  // distribution example: { '🍔': 5, '🍣': 3, '🍜': 2 }
  let items = [];
  let maxCount = -1;
  
  // First pass: Determine max count
  Object.values(distribution).forEach(count => {
    if (count > maxCount) maxCount = count;
  });

  // Second pass: Identify valid answers (modes) and build item list
  const validAnswers = [];
  Object.entries(distribution).forEach(([item, count]) => {
    for (let i = 0; i < count; i++) {
      items.push(item);
    }
    if (count === maxCount) {
      validAnswers.push(item);
    }
  });

  // Shuffle items
  items.sort(() => Math.random() - 0.5);

  return {
    id,
    topic: TOPIC.CENTRAL_TENDENCY,
    mode: 'mode',
    correctTool: 'MODE', // New Property
    text: `【多数決】${text}`, // Added tag
    items: items, // Array of mixed items
    correctAnswer: validAnswers.join(' または '), // For display/hint purposes
    validAnswers: validAnswers, // For logic check (array)
    options: [], 
    explanation: explanation,
    hint: "一番数が多いアイテムを探しましょう。"
  };
};

// Helper for Race Game (New Idea 4)
export const createRaceQuestion = (id, stageLabel, questionText, obstacleType, dataDesc, bestRunner, explanation) => {
  return {
      id,
      topic: TOPIC.CENTRAL_TENDENCY,
      mode: 'race',
      correctTool: bestRunner, // For race, the answer IS the tool
      stageLabel: stageLabel,
      text: questionText,
      obstacleType: obstacleType, // 'SWAMP' (Outlier), 'WALL' (Categorical), 'PLAIN' (Symmetric), 'CLIFF' (Skewed)
      dataDescription: dataDesc,
      correctAnswer: bestRunner, // 'MEAN', 'MEDIAN', 'MODE'
      options: ['MEAN', 'MEDIAN', 'MODE'],
      explanation: explanation,
      hint: "データの形（分布）を見て、誰が一番得意か考えよう。外れ値がある？質的データ？"
  };
};

// Helper for Variance Buster
export const createVarianceQuestion = (id, text, missionType, threshold, explanation) => {
  return {
    id,
    topic: TOPIC.VARIANCE_SPREAD,
    mode: 'variance',
    missionType: missionType,
    text: text,
    threshold: threshold,
    correctAnswer: missionType === 'LOWER' ? `標準偏差 ${threshold} 以下` : `標準偏差 ${threshold} 以上`,
    options: [],
    explanation: explanation,
    hint: missionType === 'LOWER' ? "中心（平均）から遠い点を消してください。" : "中心（平均）に近い点を消してください。"
  };
};

// Helper for Sigma Slider
export const createSigmaSliderQuestion = (id, text, targetSD, explanation) => {
  return {
    id,
    topic: TOPIC.VARIANCE_SPREAD,
    mode: 'variance',
    missionType: 'MATCH_SD',
    text: text,
    targetSD: targetSD,
    correctAnswer: targetSD,
    options: [],
    explanation: explanation,
    hint: "山を広げると標準偏差は大きく、狭めると小さくなります。"
  };
};

// Helper for Data Scout
export const createScoutQuestion = (id, text, conditionText, items, correctId, explanation) => {
  return {
    id,
    topic: TOPIC.VISUALIZATION,
    mode: 'scout',
    text: text,
    conditionText: conditionText, // "Score > 80" etc.
    items: items, // Array of objects { id, label, ...values }
    correctAnswer: correctId, // The ID of the correct item
    options: [],
    explanation: explanation,
    hint: "条件に合うカードを一枚ずつ確認しましょう。"
  };
};

// Helper for Box Plot Builder
export const createBoxPlotQuestion = (id, text, dataPoints, targetParam, explanation) => {
  const quartiles = getQuartiles(dataPoints);
  const targetValue = quartiles[targetParam.toLowerCase()]; // q1, q2, q3

  let taskText = "";
  if (targetParam === 'Q2') taskText = "【中央値】の位置を決めろ！";
  else if (targetParam === 'Q1') taskText = "箱の【左端 (第1四分位数)】を決めろ！";
  else if (targetParam === 'Q3') taskText = "箱の【右端 (第3四分位数)】を決めろ！";

  return {
    id,
    topic: TOPIC.VISUALIZATION,
    mode: 'boxplot',
    text: text,
    subText: taskText,
    dataPoints: dataPoints,
    quartiles: quartiles, // Pre-calculated full stats
    targetParam: targetParam, // 'Q1', 'Q2', 'Q3'
    correctAnswer: targetValue,
    options: [],
    explanation: explanation,
    hint: "データを小さい順に並べ、真ん中（中央値）を見つけましょう。"
  };
};

// Helper for Graph Anatomy
export const createAnatomyQuestion = (id, text, targetTerm, targetPartId, data, explanation) => {
    return {
        id,
        topic: TOPIC.VISUALIZATION,
        mode: 'anatomy',
        graphType: 'boxplot', // Expandable to histogram later
        text: text,
        targetTerm: targetTerm,
        targetPartId: targetPartId, // 'min', 'q1', 'q2', 'q3', 'max', 'outlier'
        data: data,
        correctAnswer: targetTerm,
        options: [],
        explanation: explanation,
        hint: "用語の意味（四分位数、ヒゲなど）を思い出しましょう。"
    };
};
