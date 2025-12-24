import React, { useState } from 'react';
import { Question } from '../types';
import { Button } from './Button';
import { getGeminiHint } from '../services/geminiService';
import { BrainCircuit, Lightbulb, HelpCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  lives: number;
  streak: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, lives, streak }) => {
  const [loadingHint, setLoadingHint] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const handleGetHint = async () => {
    if (loadingHint || hint) return;
    setLoadingHint(true);
    const hintText = await getGeminiHint(question.text, question.topic);
    setHint(hintText);
    setLoadingHint(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-2xl">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-emerald-400 text-sm font-mono tracking-wider uppercase border border-emerald-400/30 px-2 py-1 rounded">
          {question.topic}
        </span>
        <div className="flex gap-4 text-sm font-bold">
           <div className="flex items-center text-rose-400 gap-1">
             <span className="text-lg">{'♥'.repeat(lives)}</span>
             <span className="text-slate-600 text-xs">LIVES</span>
           </div>
           {streak > 1 && (
             <div className="flex items-center text-amber-400 gap-1 animate-pulse">
               <span>🔥 {streak}</span>
               <span className="text-xs">COMBO</span>
             </div>
           )}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white leading-relaxed">
          {question.text}
        </h2>
        {question.dataVisualization && (
          <div className="mt-4 bg-slate-900/50 p-4 rounded-lg flex justify-center items-center h-48 border border-slate-700 border-dashed">
            <span className="text-slate-500 italic">
              {/* Future: Add Recharts visualization here based on dataVisualization prop */}
              [データ可視化パネル: {question.dataVisualization.type}]
            </span>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className="text-left px-6 py-4 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500/50 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white font-mono text-sm transition-colors">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-slate-100 group-hover:text-white font-medium">
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Hint Section */}
      <div className="pt-4 border-t border-slate-700/50 flex flex-col items-center">
        {!hint ? (
          <button 
            onClick={handleGetHint}
            disabled={loadingHint}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            {loadingHint ? (
              <BrainCircuit className="w-4 h-4 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4" />
            )}
            {loadingHint ? "AIが思考中..." : "AIヒントを使う"}
          </button>
        ) : (
          <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-lg w-full animate-fadeIn">
            <div className="flex items-start gap-3">
              <BrainCircuit className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-emerald-200 text-sm font-bold mb-1">AI先生からのヒント:</p>
                <p className="text-emerald-100/90 text-sm leading-relaxed">{hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};