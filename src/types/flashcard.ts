// src/types/flashcard.ts
// Flashcard（フラッシュカード学習）関連の型定義

import type { Word, Level } from "./dictionary";

export interface UserWordStatus {
  id: number;
  word: Word;
  is_correct: boolean;
  mode: "en" | "jp";
  last_attempted_at: string;
}

export interface UserProgress {
  id: number;
  level: Level;
  mode: "en" | "jp";
  score: number;
  total_questions: number;
  current_question_index: number;
  question_ids: number[];
  completed_at: string;
  is_completed: boolean;
  is_paused: boolean;
  correct_rate: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  question_number: number;
  total_questions: number;
}

export interface StartQuizRequest {
  level_id: number;
  mode: "en" | "jp";
  quiz_mode?: "normal" | "test" | "replay";
}

export interface StartQuizResponse {
  progress: UserProgress;
  current_question: QuizQuestion;
}

export interface SubmitAnswerRequest {
  progress_id: number;
  answer: string;
}

export interface SubmitAnswerResponse {
  is_correct: boolean;
  correct_answer: string;
  score: number;
  current_question_index: number;
  is_completed: boolean;
  correct_rate?: number;
  next_question: QuizQuestion | null;
}

export interface Statistics {
  total_words_attempted: number;
  total_correct: number;
  total_incorrect: number;
  correct_rate: number;
  by_level: LevelStatistics[];
  by_mode: ModeStatistics;
  recent_progress: RecentProgress[];
}

export interface LevelStatistics {
  level_id: number;
  level_name: string;
  correct: number;
  total: number;
  rate: number;
}

export interface ModeStatistics {
  en?: {
    correct: number;
    total: number;
    rate: number;
  };
  jp?: {
    correct: number;
    total: number;
    rate: number;
  };
}

export interface RecentProgress {
  id: number;
  level_name: string;
  mode: string;
  score: number;
  total_questions: number;
  correct_rate: number;
  completed_at: string;
}
