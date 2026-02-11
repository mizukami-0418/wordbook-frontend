// src/lib/api/flashcard.ts
// Flashcard API関数

import apiClient from "./client";
import type {
  UserProgress,
  UserWordStatus,
  StartQuizRequest,
  StartQuizResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  Statistics,
} from "@/types/flashcard";

/**
 * 進行状況一覧を取得
 */
export async function getProgressList(params?: {
  is_completed?: boolean;
  is_paused?: boolean;
}): Promise<UserProgress[]> {
  const response = await apiClient.get<UserProgress[]>("/flashcard/progress/", {
    params,
  });
  return response.data;
}

/**
 * 進行状況詳細を取得
 */
export async function getProgressDetail(id: number): Promise<UserProgress> {
  const response = await apiClient.get<UserProgress>(
    `/flashcard/progress/${id}/`,
  );
  return response.data;
}

/**
 * クイズを開始
 */
export async function startQuiz(
  data: StartQuizRequest,
): Promise<StartQuizResponse> {
  const response = await apiClient.post<StartQuizResponse>(
    "/flashcard/quiz/start/",
    data,
  );
  return response.data;
}

/**
 * 回答を送信
 */
export async function submitAnswer(
  data: SubmitAnswerRequest,
): Promise<SubmitAnswerResponse> {
  const response = await apiClient.post<SubmitAnswerResponse>(
    "/flashcard/quiz/answer/",
    data,
  );
  return response.data;
}

/**
 * クイズを中断
 */
export async function pauseQuiz(
  progressId: number,
): Promise<{ message: string; progress: UserProgress }> {
  const response = await apiClient.post(
    `/flashcard/progress/${progressId}/pause/`,
  );
  return response.data;
}

/**
 * クイズを再開
 */
export async function resumeQuiz(
  progressId: number,
): Promise<StartQuizResponse> {
  const response = await apiClient.post<StartQuizResponse>(
    `/flashcard/progress/${progressId}/resume/`,
  );
  return response.data;
}

/**
 * 進行状況を削除
 */
export async function deleteProgress(progressId: number): Promise<void> {
  await apiClient.delete(`/flashcard/progress/${progressId}/delete/`);
}

/**
 * 学習統計を取得
 */
export async function getStatistics(): Promise<Statistics> {
  const response = await apiClient.get<Statistics>("/flashcard/statistics/");
  return response.data;
}

/**
 * 間違えた単語を取得
 */
export async function getIncorrectWords(params?: {
  mode?: "en" | "jp";
  level?: number;
}): Promise<{ count: number; results: UserWordStatus[] }> {
  const response = await apiClient.get("/flashcard/incorrect-words/", {
    params,
  });
  return response.data;
}
