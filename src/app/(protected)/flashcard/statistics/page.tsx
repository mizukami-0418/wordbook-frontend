// src/app/(protected)/flashcard/statistics/page.tsx
// 学習統計ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getStatistics } from "@/lib/api/flashcard";
import type { Statistics } from "@/types/flashcard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Play,
  Eye,
} from "lucide-react";

export default function FlashcardStatisticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.detail || "統計の取得に失敗しました");
        } else {
          setError("統計の取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="space-y-6">
        <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive">
                {error || "データが見つかりません"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (stats.total_words_attempted === 0) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-2 border-border">
          <CardContent className="py-12 sm:py-16 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                まだ学習していません
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                フラッシュカードで学習を始めましょう！
              </p>
            </div>
            <Button
              onClick={() => router.push("/flashcard/start")}
              className="bg-linear-to-r from-primary to-purple-600"
            >
              学習を始める
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          学習統計
        </span>
      </h1>

      {/* 全体統計 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-linear-to-br from-primary to-blue-600 text-white shadow-lg">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <Target className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
              {stats.total_words_attempted}
            </div>
            <div className="text-xs sm:text-sm text-blue-100">挑戦した単語</div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
              {stats.total_correct}
            </div>
            <div className="text-xs sm:text-sm text-green-100">
              正解した単語
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-red-500 to-red-600 text-white shadow-lg">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <XCircle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
              {stats.total_incorrect}
            </div>
            <div className="text-xs sm:text-sm text-red-100">間違えた単語</div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-500 to-purple-600 text-white shadow-lg">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2" />
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
              {stats.correct_rate.toFixed(1)}%
            </div>
            <div className="text-xs sm:text-sm text-purple-100">全体正答率</div>
          </CardContent>
        </Card>
      </div>

      {/* レベル別統計 */}
      <Card className="shadow-lg border-2 border-border">
        <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl">
            レベル別統計
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {stats.by_level.map((level) => (
              <div key={level.level_id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-base sm:text-lg text-foreground">
                    {level.level_name}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {level.correct} / {level.total} 問正解
                  </span>
                </div>
                <div className="relative h-3 sm:h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full rounded-full transition-all ${
                      level.rate >= 80
                        ? "bg-linear-to-r from-green-500 to-green-600"
                        : level.rate >= 60
                          ? "bg-linear-to-r from-primary to-blue-600"
                          : "bg-linear-to-r from-orange-500 to-red-600"
                    }`}
                    style={{ width: `${level.rate}%` }}
                  />
                </div>
                <div className="text-right text-sm sm:text-base font-bold text-foreground">
                  {level.rate.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* モード別統計 */}
      {(stats.by_mode.en || stats.by_mode.jp) && (
        <Card className="shadow-lg border-2 border-border">
          <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              モード別統計
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {stats.by_mode.en && (
                <div className="p-4 sm:p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border-2 border-primary/20">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    🇯🇵 → 🇬🇧
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
                    日本語 → 英語
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                    {stats.by_mode.en.rate.toFixed(1)}%
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stats.by_mode.en.correct} / {stats.by_mode.en.total} 問正解
                  </p>
                </div>
              )}

              {stats.by_mode.jp && (
                <div className="p-4 sm:p-6 bg-green-500/5 dark:bg-green-500/10 rounded-lg border-2 border-green-500/20">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    🇬🇧 → 🇯🇵
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">
                    英語 → 日本語
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {stats.by_mode.jp.rate.toFixed(1)}%
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stats.by_mode.jp.correct} / {stats.by_mode.jp.total} 問正解
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 最近の学習履歴 */}
      {stats.recent_progress.length > 0 && (
        <Card className="shadow-lg border-2 border-border">
          <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">
              最近の学習履歴
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              {stats.recent_progress.map((progress) => (
                <div
                  key={progress.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-muted/30 dark:bg-muted/20 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors border border-border"
                >
                  <div className="flex-1">
                    <p className="font-bold text-base text-foreground">
                      {progress.level_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {progress.mode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(progress.completed_at).toLocaleString("ja-JP")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {progress.correct_rate.toFixed(1)}%
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {progress.score} / {progress.total_questions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
        <Button
          onClick={() => router.push("/flashcard/start")}
          className="w-full sm:w-auto bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-xl"
        >
          <Play className="w-5 h-5 mr-2" />
          学習を続ける
        </Button>

        <Button
          onClick={() => router.push("/flashcard/incorrect")}
          variant="outline"
          className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-xl border-2"
        >
          <Eye className="w-5 h-5 mr-2" />
          間違えた単語を見る
        </Button>
      </div>
    </div>
  );
}
