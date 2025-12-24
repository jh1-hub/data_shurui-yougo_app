
import { streamQuestions } from './dataTypes_stream.js';
import { extraStreamQuestions } from './dataTypes_stream_2.js';
import { streamQuestionsPart3 } from './dataTypes_stream_3.js';
import { scaleQuestions } from './dataTypes_scales.js';
import { scaleQuestionsPart2 } from './dataTypes_scales_2.js';
import { scaleQuestionsPart3 } from './dataTypes_scales_3.js';

// Combine all sub-modules for Data Types
// Note: discreteQuestions removed as they are not currently covered in the tutorial
export const dataTypeQuestions = [
  ...streamQuestions,
  ...extraStreamQuestions,
  ...streamQuestionsPart3,
  ...scaleQuestions,
  ...scaleQuestionsPart2,
  ...scaleQuestionsPart3
];
