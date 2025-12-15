import React from "react";
import { RefreshCw, Trophy, Target, XOctagon } from "lucide-react";
import { Button } from "./Button";
import { Score } from "../src/types";

interface GameOverScreenProps {
  score: Score;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
}) => {
  const total = score.correct + score.wrong;
  const accuracy = total > 0 ? Math.round((score.correct / total) * 100) : 0;

  // Calculate a simple "Speed Rank" based on correct answers per minute
  const getRank = (score: number) => {
    if (score >= 60) return { label: "Grandmaster", color: "text-yellow-400" };
    if (score >= 40) return { label: "Pro Typist", color: "text-purple-400" };
    if (score >= 20) return { label: "Fast Fingers", color: "text-blue-400" };
    return { label: "Apprentice", color: "text-slate-400" };
  };

  const rank = getRank(score.correct);

  return (
    <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full mb-4 ring-4 ring-slate-700">
          <Trophy className={`w-8 h-8 ${rank.color}`} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Time's Up!</h2>
        <p className={`text-lg font-medium ${rank.color}`}>
          Rank: {rank.label}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-400 mb-1 text-sm">
            <Target className="w-4 h-4" />
            <span>Accuracy</span>
          </div>
          <span
            className={`text-3xl font-bold font-mono ${
              accuracy >= 90
                ? "text-green-400"
                : accuracy >= 70
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {accuracy}%
          </span>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-700/50">
          <div className="flex items-center space-x-2 text-slate-400 mb-1 text-sm">
            <div className="w-4 h-4 font-mono font-bold flex items-center justify-center border border-slate-600 rounded text-[10px]">
              K
            </div>
            <span>Correct</span>
          </div>
          <span className="text-3xl font-bold text-white font-mono">
            {score.correct}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-slate-500 px-2">
          <span>Total Keystrokes</span>
          <span>{total}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-500 px-2">
          <span>Errors</span>
          <span className="text-red-400">{score.wrong}</span>
        </div>

        <div className="pt-4">
          <Button onClick={onRestart} fullWidth>
            <RefreshCw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};
