// src/app/(protected)/dictionary/words/page.tsx
// 単語一覧ページ - レスポンシブ・ダークモード対応（ページネーション付き）

"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getWords, getLevels } from "@/lib/api/dictionary";
import type { Word, Level } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Tag,
  Layers,
  AlertCircle,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 50;

export default function WordsListPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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
    setCurrentPage(1); // ページをリセット
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

  // ページネーション計算
  const totalPages = Math.ceil(words.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWords = words.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // ページ番号ボタンの生成
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // 全ページ表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 省略表示
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (loading && words.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

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
            単語一覧
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            登録されている単語の一覧です
          </p>
        </div>
      </div>

      {/* レベルフィルター */}
      <Card className="border-2 border-border shadow-lg">
        <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            難易度で絞り込み
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              variant={selectedLevel === null ? "default" : "outline"}
              onClick={() => handleLevelFilter(null)}
              size="sm"
              className={
                selectedLevel === null
                  ? "bg-linear-to-r from-primary to-purple-600"
                  : ""
              }
            >
              すべて
            </Button>
            {levels.map((level) => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "outline"}
                onClick={() => handleLevelFilter(level.id)}
                size="sm"
                className={
                  selectedLevel === level.id
                    ? "bg-linear-to-r from-primary to-purple-600"
                    : ""
                }
              >
                {level.name}{" "}
                <span className="ml-1 text-xs">({level.word_count})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* エラー表示 */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 単語一覧 */}
      <Card className="border-2 border-border shadow-lg">
        <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2 flex-wrap">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span>
                {selectedLevel
                  ? `${levels.find((l) => l.id === selectedLevel)?.name}`
                  : "全単語"}
              </span>
              <span className="text-muted-foreground">({words.length}件)</span>
            </CardTitle>
            {totalPages > 1 && (
              <p className="text-sm text-muted-foreground">
                ページ {currentPage} / {totalPages}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <p className="text-muted-foreground text-center py-12">
              読み込み中...
            </p>
          ) : words.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              単語が見つかりませんでした
            </p>
          ) : (
            <>
              <div className="grid gap-3 sm:gap-4">
                {currentWords.map((word) => (
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

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* 前へボタン */}
                  <Button
                    variant="outline"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    前へ
                  </Button>

                  {/* ページ番号 */}
                  <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => goToPage(page as number)}
                          size="sm"
                          className={`w-10 h-10 ${currentPage === page ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>

                  {/* 次へボタン */}
                  <Button
                    variant="outline"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="w-full sm:w-auto"
                  >
                    次へ
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
