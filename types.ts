export enum GameScreen {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum Topic {
  DATA_TYPES = 'データの種類',
  CENTRAL_TENDENCY = '代表値',
  VARIANCE_SPREAD = '分散・標準偏差',
  VISUALIZATION = 'データの可視化',
}

export interface Question {
  id: string;
  topic: Topic;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string; // Static explanation
  dataVisualization?: {
    type: 'bar' | 'histogram' | 'boxplot';
    data: any[];
  };
}

export interface GameState {
  screen: GameScreen;
  currentScore: number;
  currentQuestionIndex: number;
  lives: number;
  selectedTopic: Topic | 'ALL';
  questions: Question[];
  streak: number;
}