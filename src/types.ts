export type GameState = 'START' | 'PLAYING' | 'GAME_OVER';

export interface Score {
  correct: number;
  wrong: number;
}

export type FeedbackStatus = 'IDLE' | 'CORRECT' | 'WRONG';