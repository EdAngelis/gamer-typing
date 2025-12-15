import React from "react";
import { Keyboard, Zap, Timer } from "lucide-react";
import { Button } from "./Button";
import { TARGET_KEYS } from "../src/constants";

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-500">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-2xl shadow-2xl shadow-black/50 mb-4 ring-1 ring-white/10">
          <Keyboard className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            SpeedKey
          </span>{" "}
          Trainer
        </h1>
        <p className="text-lg text-slate-400 max-w-md mx-auto">
          Master your keystrokes. Improve your reflexes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl flex flex-col items-center">
          <Zap className="w-8 h-8 text-yellow-400 mb-3" />
          <h3 className="font-semibold text-white">Reaction</h3>
          <p className="text-sm text-slate-400 mt-1">
            Instant feedback on every keystroke
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl flex flex-col items-center">
          <Timer className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="font-semibold text-white">60 Seconds</h3>
          <p className="text-sm text-slate-400 mt-1">Race against the clock</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center font-mono font-bold text-xl text-green-400 mb-3 border border-green-400/30 rounded bg-green-400/10">
            A
          </div>
          <h3 className="font-semibold text-white">Accuracy</h3>
          <p className="text-sm text-slate-400 mt-1">Precision over speed</p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
          Training Keys
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {TARGET_KEYS.slice(0, 10).map((k) => (
            <span
              key={k}
              className="inline-flex items-center justify-center min-w-[2rem] px-2 h-8 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold"
            >
              {k}
            </span>
          ))}
          <span className="inline-flex items-center justify-center w-8 h-8 text-slate-600">
            ...
          </span>
        </div>
      </div>

      <Button
        onClick={onStart}
        className="w-full md:w-auto min-w-[200px] text-lg"
      >
        Start Game
      </Button>
    </div>
  );
};
