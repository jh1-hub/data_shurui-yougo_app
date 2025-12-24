
import { meanQuestions } from './centralTendency_mean.js';
import { medianQuestions } from './centralTendency_median.js';
import { modeQuestions } from './centralTendency_mode.js';
import { outlierQuestions } from './centralTendency_outlier.js';
import { raceQuestions } from './centralTendency_race.js';

export const centralTendencyQuestions = [
  ...meanQuestions,
  ...medianQuestions,
  ...modeQuestions,
  ...outlierQuestions,
  ...raceQuestions,
];
