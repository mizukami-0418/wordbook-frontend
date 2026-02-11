// src/lib/api/dictionary.ts
// Dictionary API関数

import apiClient from "./client";
import type {
  Word,
  WordDetail,
  Level,
  PartOfSpeech,
  SearchResult,
  RandomWordsResult,
} from "@/types/dictionary";

/**
 * 単語一覧を取得
 */
export async function getWords(params?: {
  level?: number;
  part_of_speech?: number;
  ordering?: string;
}): Promise<Word[]> {
  const response = await apiClient.get<Word[]>("/dictionary/words/", {
    params,
  });
  return response.data;
}

/**
 * 単語詳細を取得
 */
export async function getWordDetail(id: number): Promise<WordDetail> {
  const response = await apiClient.get<WordDetail>(`/dictionary/words/${id}/`);
  return response.data;
}

/**
 * 単語を検索
 */
export async function searchWords(params: {
  query: string;
  level?: number;
  part_of_speech?: number;
  limit?: number;
}): Promise<SearchResult> {
  const response = await apiClient.get<SearchResult>("/dictionary/search/", {
    params,
  });
  return response.data;
}

/**
 * ランダムに単語を取得
 */
export async function getRandomWords(params?: {
  count?: number;
  level?: number;
  part_of_speech?: number;
}): Promise<RandomWordsResult> {
  const response = await apiClient.get<RandomWordsResult>(
    "/dictionary/words/random/",
    { params },
  );
  return response.data;
}

/**
 * 難易度一覧を取得
 */
export async function getLevels(): Promise<Level[]> {
  const response = await apiClient.get<Level[]>("/dictionary/levels/");
  return response.data;
}

/**
 * 品詞一覧を取得
 */
export async function getPartsOfSpeech(): Promise<PartOfSpeech[]> {
  const response = await apiClient.get<PartOfSpeech[]>(
    "/dictionary/parts-of-speech/",
  );
  return response.data;
}
