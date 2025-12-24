import { dataTypeQuestions } from './data/dataTypes.js';
import { centralTendencyQuestions } from './data/centralTendency.js';

// Combine all questions into a single export
export const QUESTIONS_DATA = [
  ...dataTypeQuestions,
  ...centralTendencyQuestions,
];