import React, { useState, useEffect, useMemo } from 'react';
import { GameScreen, GameState, Topic, Question } from './types';
import { STATIC_QUESTIONS, INITIAL_LIVES, POINTS_PER_QUESTION, STREAK_BONUS } from './constants';
import { Button } from './components/Button';
import { QuizCard } from './components/QuizCard';
import { getGeminiDeepDive } from './services/geminiService';
import { Trophy, BarChart2, AlertCircle, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: GameScreen.MENU,
    currentScore: 0,
    currentQuestionIndex: 0,
    lives: INITIAL_LIVES,
    selectedTopic: 'ALL',
    questions: [],
    streak: 0,
  });

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  // Initialize game with shuffled questions
  const startGame = (topic: Topic | 'ALL') => {
    let filtered = topic === 'ALL' 
      ? STATIC_QUESTIONS 
      : STATIC_QUESTIONS.filter(q => q.topic === topic);
    
    // Simple shuffle
    filtered = [...filtered].sort(() => Math.random() - 0.5);

    setGameState({
      screen: GameScreen.PLAYING,
      currentScore: 0,
      currentQuestionIndex: 0,
      lives: INITIAL_LIVES,
      selectedTopic: topic,
      questions: filtered,
      streak: 0,
    });
    setLastAnswerCorrect(null);
    setAiExplanation(null);
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    
    // Deep dive generation for learning (triggered immediately for seamless UI, shown if user wants)
    if (!isCorrect) {
       setLoadingExplanation(true);
       getGeminiDeepDive(currentQuestion.text, currentQuestion.correctAnswer).then(text => {
         setAiExplanation(text);
         setLoadingExplanation(false);
       });
    } else {
        setAiExplanation(null);
    }

    if (isCorrect) {
      const bonus = gameState.streak * 10;
      setGameState(prev => ({
        ...prev,
        currentScore: prev.currentScore + POINTS_PER_QUESTION + bonus,
        streak: prev.streak + 1
      }));
      // Auto advance after short delay if correct
      setTimeout(() => nextQuestion(true), 1500);
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0
      }));
      // If lives empty, go to result handled in UI render or effect
    }
  };

  const nextQuestion = (wasCorrect: boolean) => {
    setLastAnswerCorrect(null);
    setAiExplanation(null);

    // Check game over condition (lives)
    if (!wasCorrect && gameState.lives <= 1) { // 1 because we haven't updated state fully in this closure yet if we used prev, but logic holds
        finishGame();
        return;
    }

    if (gameState.currentQuestionIndex >= gameState.questions.length - 1) {
      finishGame();
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const finishGame = () => {
    setGameState(prev => ({ ...prev, screen: GameScreen.RESULT }));
  };

  // --- RENDER HELPERS ---

  const renderMenu = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4 tracking-tight">
          DATA DETECTIVE
        </h1>
        <p className="text-slate-400 text-lg">情報I：データ分析マスターへの道</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <button 
          onClick={() => startGame('ALL')}
          className="col-span-1 md:col-span-2 p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all group flex flex-col items-center"
        >
          <Trophy className="w-12 h-12 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold text-white">総合演習 (Challenge Mode)</h3>
          <p className="text-slate-400 mt-2">全範囲からランダムに出題。ハイスコアを目指せ！</p>
        </button>

        {Object.values(Topic).map((topic) => (
          <button
            key={topic}
            onClick={() => startGame(topic)}
            className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-500 transition-all text-left flex items-start gap-4"
          >
            <div className="bg-slate-900 p-3 rounded-lg">
               <BarChart2 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-100">{topic}</h4>
              <p className="text-slate-500 text-sm mt-1">
                {topic === Topic.DATA_TYPES && '尺度、量的・質的データ'}
                {topic === Topic.CENTRAL_TENDENCY && '平均値、中央値、最頻値'}
                {topic === Topic.VARIANCE_SPREAD && '分散、標準偏差、範囲'}
                {topic === Topic.VISUALIZATION && 'ヒストグラム、箱ひげ図'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPlaying = () => {
    if (!currentQuestion) return <div>Loading...</div>;

    // Overlay for feedback
    if (lastAnswerCorrect !== null) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fadeIn">
          <div className={`text-center p-8 rounded-3xl max-w-2xl w-full border ${lastAnswerCorrect ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-rose-900/20 border-rose-500/50'}`}>
            <div className="mb-6">
              {lastAnswerCorrect ? (
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/40">
                  <span className="text-4xl">🎉</span>
                </div>
              ) : (
                <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/40">
                  <span className="text-4xl">😢</span>
                </div>
              )}
              <h2 className={`text-3xl font-bold mb-2 ${lastAnswerCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {lastAnswerCorrect ? '正解！ Excellent!' : '不正解...'}
              </h2>
            </div>
            
            <div className="bg-slate-900/80 p-6 rounded-xl text-left mb-6 border border-slate-700">
               <p className="text-slate-400 text-xs uppercase font-bold mb-2">解説</p>
               <p className="text-slate-200 leading-relaxed text-lg">
                 {currentQuestion.explanation}
               </p>
               
               {/* AI Deep Dive for incorrect answers */}
               {!lastAnswerCorrect && (
                 <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-purple-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
                      <BookOpen className="w-3 h-3" /> AI先生の補足
                    </p>
                    {loadingExplanation ? (
                      <p className="text-slate-500 text-sm animate-pulse">AIが解説を生成中...</p>
                    ) : aiExplanation ? (
                      <p className="text-purple-100 text-sm">{aiExplanation}</p>
                    ) : (
                      <p className="text-slate-500 text-sm">解説を読み込み中...</p>
                    )}
                 </div>
               )}
            </div>

            <Button 
              onClick={() => nextQuestion(lastAnswerCorrect)}
              variant={lastAnswerCorrect ? 'primary' : 'secondary'}
              size="lg"
              className="w-full"
            >
              {gameState.lives <= 0 && !lastAnswerCorrect ? '結果を見る' : '次の問題へ'} <ArrowRight className="inline ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col p-4 max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-4 mb-8">
           <Button variant="ghost" size="sm" onClick={() => setGameState(prev => ({...prev, screen: GameScreen.MENU}))}>
             中断して戻る
           </Button>
           <div className="text-emerald-400 font-mono text-xl font-bold">
             SCORE: {gameState.currentScore}
           </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col justify-center">
          <QuizCard 
            question={currentQuestion}
            onAnswer={handleAnswer}
            lives={gameState.lives}
            streak={gameState.streak}
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-8 mb-4">
          <div className="flex justify-between text-slate-500 text-xs mb-1">
             <span>PROGRESS</span>
             <span>{gameState.currentQuestionIndex + 1} / {gameState.questions.length}</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl">
         <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
         <h2 className="text-4xl font-bold text-white mb-2">Game Over</h2>
         <p className="text-slate-400 mb-8">お疲れ様でした！</p>

         <div className="bg-slate-900 rounded-xl p-6 mb-8 border border-slate-700">
           <div className="text-sm text-slate-500 mb-1">FINAL SCORE</div>
           <div className="text-5xl font-mono font-bold text-emerald-400">{gameState.currentScore}</div>
         </div>

         <div className="flex flex-col gap-3">
           <Button onClick={() => startGame(gameState.selectedTopic)} variant="primary" size="lg" className="w-full flex justify-center items-center gap-2">
             <RotateCcw className="w-5 h-5" /> もう一度挑戦
           </Button>
           <Button onClick={() => setGameState(prev => ({...prev, screen: GameScreen.MENU}))} variant="ghost" className="w-full">
             メニューに戻る
           </Button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-emerald-500/30">
      {gameState.screen === GameScreen.MENU && renderMenu()}
      {gameState.screen === GameScreen.PLAYING && renderPlaying()}
      {gameState.screen === GameScreen.RESULT && renderResult()}
    </div>
  );
};

export default App;