// src/app/(protected)/dictionary/words/page.tsx
// 単語一覧ページ

"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getWords, getLevels } from "@/lib/api/dictionary";
import type { Word, Level } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WordsListPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [wordsData, levelsData] = await Promise.all([
          getWords(),
          getLevels(),
        ]);
        setWords(wordsData);
        setLevels(levelsData);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.detail || "データの取得に失敗しました");
        } else {
          setError("データの取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleLevelFilter = async (levelId: number | null) => {
    setSelectedLevel(levelId);
    setLoading(true);
    setError(null);

    try {
      const params = levelId ? { level: levelId } : undefined;
      const data = await getWords(params);
      setWords(data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.detail || "データの取得に失敗しました");
      } else {
        setError("データの取得に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && words.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">単語一覧</h1>
        <p className="text-gray-500 mt-1">登録されている単語の一覧です</p>
      </div>

      {/* レベルフィルター */}
      <Card>
        <CardHeader>
          <CardTitle>難易度で絞り込み</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLevel === null ? "default" : "outline"}
              onClick={() => handleLevelFilter(null)}
              size="sm"
            >
              すべて
            </Button>
            {levels.map((level) => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "outline"}
                onClick={() => handleLevelFilter(level.id)}
                size="sm"
              >
                {level.name} ({level.word_count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* エラー表示 */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* 単語一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedLevel
              ? `${levels.find((l) => l.id === selectedLevel)?.name} (${words.length}件)`
              : `全単語 (${words.length}件)`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500 text-center py-8">読み込み中...</p>
          ) : words.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              単語が見つかりませんでした
            </p>
          ) : (
            <div className="grid gap-3">
              {words.map((word) => (
                <div
                  key={word.id}
                  className="p-4 border rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{word.english}</h3>
                      <p className="text-gray-600">{word.japanese}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {typeof word.part_of_speech === "string"
                            ? word.part_of_speech
                            : word.part_of_speech.name}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                          {typeof word.level === "string"
                            ? word.level
                            : word.level.name}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/dictionary/words/${word.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      詳細 →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
