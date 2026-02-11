// src/app/(protected)/flashcard/paused/page.tsx
// 中断データ一覧ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getProgressList, deleteProgress } from "@/lib/api/flashcard";
import type { UserProgress } from "@/types/flashcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pause,
  Play,
  Trash2,
  Plus,
  Home,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default function FlashcardPausedPage() {
  const router = useRouter();
  const [pausedProgress, setPausedProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPausedProgress();
  }, []);

  async function fetchPausedProgress() {
    try {
      setLoading(true);
      const data = await getProgressList({ is_paused: true });
      setPausedProgress(data);
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

  const handleResume = (progressId: number) => {
    router.push(`/flashcard/resume/${progressId}`);
  };

  const handleDelete = async (progressId: number) => {
    if (!confirm("この中断データを削除してもよろしいですか？")) {
      return;
    }

    try {
      await deleteProgress(progressId);
      await fetchPausedProgress();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.detail || "削除に失敗しました");
      } else {
        alert("削除に失敗しました");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
          <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            中断したクイズ
          </span>
        </h1>
        <Button
          onClick={() => router.push("/flashcard/start")}
          className="w-full sm:w-auto bg-linear-to-r from-primary to-purple-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          新しく始める
        </Button>
      </div>

      {/* エラー */}
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

      {/* データなし */}
      {pausedProgress.length === 0 ? (
        <Card className="shadow-lg border-2 border-border">
          <CardContent className="py-12 sm:py-16 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                中断データがありません
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                新しくクイズを始めましょう！
              </p>
            </div>
            <Button
              onClick={() => router.push("/flashcard/start")}
              className="bg-linear-to-r from-primary to-purple-600"
            >
              クイズを始める
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* 中断データ一覧 */
        <div className="grid gap-4 sm:gap-6">
          {pausedProgress.map((progress) => (
            <Card
              key={progress.id}
              className="hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-primary/50 dark:hover:border-primary"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 space-y-4">
                    {/* ヘッダー */}
                    <div className="flex items-start gap-3">
                      <div className="text-2xl sm:text-3xl shrink-0">
                        {progress.mode === "en" ? "🇯🇵 → 🇬🇧" : "🇬🇧 → 🇯🇵"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          {progress.level.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {progress.mode === "en"
                            ? "日本語 → 英語"
                            : "英語 → 日本語"}
                        </p>
                      </div>
                    </div>

                    {/* 進捗情報 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">進捗</span>
                        <span className="font-bold text-foreground">
                          {progress.current_question_index} /{" "}
                          {progress.total_questions} 問
                        </span>
                      </div>

                      {/* 進捗バー */}
                      <div className="h-2 sm:h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-primary to-purple-600 transition-all"
                          style={{
                            width: `${(progress.current_question_index / progress.total_questions) * 100}%`,
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">
                            現在のスコア
                          </p>
                          <p className="font-bold text-base sm:text-lg text-primary">
                            {progress.score} / {progress.current_question_index}
                          </p>
                        </div>
                        {progress.current_question_index > 0 && (
                          <div className="p-3 bg-green-500/5 dark:bg-green-500/10 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">
                              正答率
                            </p>
                            <p className="font-bold text-base sm:text-lg text-green-600 dark:text-green-400">
                              {progress.correct_rate.toFixed(1)}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 中断日時 */}
                    <p className="text-xs text-muted-foreground">
                      中断日時:{" "}
                      {new Date(progress.completed_at).toLocaleString("ja-JP")}
                    </p>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex lg:flex-col gap-2 sm:gap-3">
                    <Button
                      onClick={() => handleResume(progress.id)}
                      className="flex-1 lg:flex-none lg:min-w-32 bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      再開
                    </Button>
                    <Button
                      onClick={() => handleDelete(progress.id)}
                      variant="outline"
                      className="flex-1 lg:flex-none lg:min-w-32 text-destructive border-destructive/50 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      削除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* フッター */}
      <div className="text-center pt-4">
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Home className="w-4 h-4 mr-2" />
          ダッシュボードに戻る
        </Button>
      </div>
    </div>
  );
}
