// src/app/(protected)/dictionary/search/page.tsx
// 単語検索ページ - レスポンシブ・ダークモード対応

"use client";

import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { searchWords } from "@/lib/api/dictionary";
import type { Word } from "@/types/dictionary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  BookOpen,
  Tag,
  Layers,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function DictionarySearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

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
    <div className="space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            単語検索
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            英語または日本語で検索できます
          </p>
        </div>
      </div>

      {/* 検索フォーム */}
      <Card className="border-2 border-border shadow-lg">
        <CardContent className="pt-6 p-4 sm:p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="例: apple, りんご"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                className="pl-12 h-12 sm:h-14 text-base sm:text-lg border-2 focus:border-primary transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              {loading ? (
                "検索中..."
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  検索
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="flex items-start gap-2 p-3 sm:p-4 mt-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 検索結果 */}
      {searched && (
        <Card className="border-2 border-border shadow-lg">
          <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2 flex-wrap">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span>検索結果: 「{query}」</span>
              <span className="text-muted-foreground">
                ({results.length}件)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {results.length === 0 ? (
              <div className="text-center py-12 sm:py-16 space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  該当する単語が見つかりませんでした
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {results.map((word) => (
                  <div
                    key={word.id}
                    className="p-4 sm:p-5 border-2 border-border rounded-lg hover:border-primary/50 dark:hover:border-primary hover:shadow-md transition-all bg-card"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div>
                          <h3 className="font-bold text-lg sm:text-xl text-foreground">
                            {word.english}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            {word.japanese}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium">
                            <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                            {typeof word.part_of_speech === "string"
                              ? word.part_of_speech
                              : word.part_of_speech.name}
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium">
                            <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                            {typeof word.level === "string"
                              ? word.level
                              : word.level.name}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/dictionary/words/${word.id}`}
                        className="text-sm text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                      >
                        詳細
                        <Sparkles className="w-3 h-3" />
                      </Link>
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
