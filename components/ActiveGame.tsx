import React, { useState, useEffect, useCallback } from "react";
import { TARGET_KEYS, GAME_DURATION } from "../src/constants";
import { Score, FeedbackStatus } from "../src/types";
import { Timer, XCircle, CheckCircle2 } from "lucide-react";

interface ActiveGameProps {
  onGameOver: (finalScore: Score) => void;
}

export const ActiveGame: React.FC<ActiveGameProps> = ({ onGameOver }) => {
  const [currentKey, setCurrentKey] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState<Score>({ correct: 0, wrong: 0 });
  const [feedback, setFeedback] = useState<FeedbackStatus>("IDLE");

  const generateNewKey = useCallback((previousKey?: string) => {
    let newKey;
    do {
      const randomIndex = Math.floor(Math.random() * TARGET_KEYS.length);
      newKey = TARGET_KEYS[randomIndex];
    } while (newKey === previousKey && TARGET_KEYS.length > 1);
    return newKey;
  }, []);

  // Initialization
  useEffect(() => {
    setCurrentKey(generateNewKey());
  }, [generateNewKey]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameOver(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onGameOver, score]);

  // Feedback Reset
  useEffect(() => {
    if (feedback !== "IDLE") {
      const timeout = setTimeout(() => {
        setFeedback("IDLE");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  // Key Down Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (timeLeft <= 0) return;

      // Prevent browser default for game keys to ensure focus/no unexpected behavior
      if (["Tab", "Alt"].includes(e.key) || e.code === "Space") {
        e.preventDefault();
      }

      // Special handling for meta keys (CMD/Windows) and CapsLock - ignore them
      if (["Meta", "CapsLock", "ContextMenu"].includes(e.key)) return;

      const modifierTargets = ["LEFT-SHIFT", "LEFT-CONTROL", "LEFT-ALT"];
      const isModifierTarget = modifierTargets.includes(currentKey);

      // If the user presses a modifier key (Shift/Ctrl/Alt) but the target isn't a modifier,
      // we ignore it. This allows players to hold Shift to type capital letters if they want,
      // or just ignores accidental modifier presses.
      if (["Shift", "Control", "Alt"].includes(e.key) && !isModifierTarget) {
        return;
      }

      let isMatch = false;

      // Match logic based on key types
      switch (currentKey) {
        case "SPACE":
          isMatch = e.code === "Space";
          break;
        case "TAB":
          isMatch = e.code === "Tab";
          break;
        case "LEFT-SHIFT":
          isMatch = e.code === "ShiftLeft";
          break;
        case "LEFT-CONTROL":
          isMatch = e.code === "ControlLeft";
          break;
        case "LEFT-ALT":
          isMatch = e.code === "AltLeft";
          break;
        default:
          // Standard character comparison
          isMatch = e.key.toLowerCase() === currentKey.toLowerCase();
          break;
      }

      if (isMatch) {
        // Correct
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        setFeedback("CORRECT");
        setCurrentKey((prev) => generateNewKey(prev));
      } else {
        // Wrong
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
        setFeedback("WRONG");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentKey, timeLeft, generateNewKey]);

  // Dynamic Styles
  const getCardStyles = () => {
    if (feedback === "CORRECT")
      return "bg-green-500 border-green-400 shadow-[0_0_50px_rgba(34,197,94,0.4)] scale-105";
    if (feedback === "WRONG")
      return "bg-red-500 border-red-400 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-shake";
    return "bg-slate-800 border-slate-700 shadow-xl";
  };

  const getTextColor = () => {
    return "text-white";
  };

  // Helper to get display text
  const getDisplayKey = (key: string) => {
    switch (key) {
      case "LEFT-SHIFT":
        return "SHIFT";
      case "LEFT-CONTROL":
        return "CTRL";
      case "LEFT-ALT":
        return "ALT";
      default:
        return key;
    }
  };

  const displayKey = getDisplayKey(currentKey);

  // Adjust font size based on text length to prevent overflow
  const getFontSize = () => {
    if (displayKey.length > 5) return "text-4xl md:text-6xl";
    if (displayKey.length > 1) return "text-6xl md:text-8xl";
    return "text-[8rem] md:text-[10rem]";
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center space-y-12 animate-in fade-in duration-300">
      {/* Top Bar: Timer & Live Score */}
      <div className="w-full flex justify-between items-center px-6 py-4 bg-slate-800/50 rounded-full border border-slate-700/50 backdrop-blur-sm">
        <div
          className={`flex items-center space-x-2 font-mono text-xl font-bold ${
            timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-indigo-400"
          }`}
        >
          <Timer className="w-6 h-6" />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex space-x-6 text-sm font-medium">
          <div className="flex items-center space-x-1.5 text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{score.correct}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-red-400">
            <XCircle className="w-4 h-4" />
            <span>{score.wrong}</span>
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="relative group">
        <div
          className={`
            transition-bg duration-100 ease-out
            w-64 h-64 md:w-80 md:h-80 
            rounded-3xl border-4 
            flex items-center justify-center 
            transform transition-transform
            ${getCardStyles()}
        `}
        >
          <span
            className={`${getFontSize()} font-mono font-bold leading-none select-none ${getTextColor()} text-center break-words px-2`}
          >
            {displayKey}
          </span>
        </div>

        {/* Helper text */}
        <div className="absolute -bottom-10 left-0 right-0 text-center text-slate-500 text-sm font-medium">
          Press the key to continue
        </div>
      </div>
    </div>
  );
};
