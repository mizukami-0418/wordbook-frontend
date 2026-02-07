// src/app/(protected)/dictionary/search/page.tsx
// 単語検索ページ

"use client";

import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { searchWords } from "@/lib/api/dictionary";
import type { Word } from "@/types/dictionary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DictionarySearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("検索ワードを入力してください");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(false);

    try {
      const data = await searchWords({ query: query.trim() });
      setResults(data.results);
      setSearched(true);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.detail || "検索に失敗しました");
      } else {
        setError("検索に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">単語検索</h1>
        <p className="text-gray-500 mt-1">英語または日本語で検索できます</p>
      </div>

      {/* 検索フォーム */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="例: apple, りんご"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "検索中..." : "検索"}
            </Button>
          </form>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* 検索結果 */}
      {searched && (
        <Card>
          <CardHeader>
            <CardTitle>
              検索結果: 「{query}」({results.length}件)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                該当する単語が見つかりませんでした
              </p>
            ) : (
              <div className="space-y-2">
                {results.map((word) => (
                  <div
                    key={word.id}
                    className="p-4 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {word.english}
                        </h3>
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
      )}
    </div>
  );
}
