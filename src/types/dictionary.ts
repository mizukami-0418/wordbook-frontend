// src/types/dictionary.ts
// Dictionary（辞書）関連の型定義

export interface PartOfSpeech {
  id: number;
  name: string;
}

export interface Level {
  id: number;
  name: string;
  description: string | null;
  word_count: number;
}

export interface Word {
  id: number;
  english: string;
  japanese: string;
  part_of_speech: string | PartOfSpeech; // 一覧では文字列、詳細ではオブジェクト
  level: string | Level;
}

export interface WordDetail extends Word {
  phrase: string | null;
  part_of_speech: PartOfSpeech;
  level: Level;
}

export interface SearchResult {
  query: string;
  count: number;
  results: Word[];
}

export interface RandomWordsResult {
  count: number;
  words: Word[];
}
