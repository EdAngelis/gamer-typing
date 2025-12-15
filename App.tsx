import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { ActiveGame } from './components/ActiveGame';
import { GameOverScreen } from './components/GameOverScreen';
import { GameState, Score } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [finalScore, setFinalScore] = useState<Score>({ correct: 0, wrong: 0 });

  const handleStartGame = () => {
    setGameState('PLAYING');
  };

  const handleGameOver = (score: Score) => {
    setFinalScore(score);
    setGameState('GAME_OVER');
  };

  const handleRestart = () => {
    setGameState('START');
    setFinalScore({ correct: 0, wrong: 0 });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
      
      {gameState === 'START' && (
        <StartScreen onStart={handleStartGame} />
      )}

      {gameState === 'PLAYING' && (
        <ActiveGame onGameOver={handleGameOver} />
      )}

      {gameState === 'GAME_OVER' && (
        <GameOverScreen score={finalScore} onRestart={handleRestart} />
      )}
      
      {/* Footer */}
      <footer className="fixed bottom-4 text-slate-600 text-xs text-center pointer-events-none">
        <p>SpeedKey Trainer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;