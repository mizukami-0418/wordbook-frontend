// src/app/(protected)/flashcard/result/[id]/page.tsx
// クイズ結果ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getProgressDetail } from "@/lib/api/flashcard";
import type { UserProgress } from "@/types/flashcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Trophy,
  PartyPopper,
  ThumbsUp,
  Frown,
  RotateCcw,
  BarChart3,
  Home,
  AlertCircle,
} from "lucide-react";

export default function FlashcardResultPage() {
  const params = useParams();
  const router = useRouter();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResult() {
      const id = params.id as string;
      if (!id) return;

      try {
        const data = await getProgressDetail(Number(id));
        setProgress(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.detail || "結果の取得に失敗しました");
        } else {
          setError("結果の取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary via-purple-500 to-pink-500">
        <div className="text-white text-xl sm:text-2xl font-bold animate-pulse">
          結果を集計中...
        </div>
      </div>
    );
  }

  if (error || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary via-purple-500 to-pink-500 p-4">
        <Card className="p-6 sm:p-8 max-w-md w-full">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-2">
                エラー
              </h2>
              <p className="text-foreground">
                {error || "結果が見つかりません"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/flashcard/start")}
            className="w-full"
          >
            戻る
          </Button>
        </Card>
      </div>
    );
  }

  const correctRate = progress.correct_rate;
  const isExcellent = correctRate >= 90;
  const isGood = correctRate >= 70;
  const isPassing = correctRate >= 60;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .confetti {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #fbbf24;
          animation: confetti 3s linear infinite;
        }

        @keyframes scoreReveal {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }

        .score-reveal {
          animation: scoreReveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* 紙吹雪（高得点の場合） */}
        {isExcellent && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  background: [
                    "#fbbf24",
                    "#f59e0b",
                    "#ef4444",
                    "#3b82f6",
                    "#8b5cf6",
                  ][i % 5],
                }}
              />
            ))}
          </>
        )}

        <Card className="shadow-2xl overflow-hidden border-2 border-white/20">
          {/* ヘッダー */}
          <div
            className={`p-8 sm:p-12 text-center ${
              isExcellent
                ? "bg-linear-to-br from-yellow-400 to-orange-500"
                : isGood
                  ? "bg-linear-to-br from-green-400 to-blue-500"
                  : isPassing
                    ? "bg-linear-to-br from-blue-400 to-purple-500"
                    : "bg-linear-to-br from-gray-400 to-gray-600"
            }`}
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              {isExcellent ? (
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-white animate-bounce" />
              ) : isGood ? (
                <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20 text-white animate-bounce" />
              ) : isPassing ? (
                <ThumbsUp className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              ) : (
                <Frown className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              {isExcellent
                ? "素晴らしい！"
                : isGood
                  ? "よくできました！"
                  : isPassing
                    ? "合格！"
                    : "もう一息！"}
            </h1>
          </div>

          <CardContent className="p-6 sm:p-12">
            {/* スコア */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block score-reveal">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  {correctRate.toFixed(1)}%
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                {progress.score} / {progress.total_questions} 問正解
              </p>
            </div>

            {/* 詳細 */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-between p-4 sm:p-5 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border">
                <span className="text-sm sm:text-base text-muted-foreground">
                  難易度
                </span>
                <span className="font-bold text-lg sm:text-xl text-foreground">
                  {progress.level.name}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 sm:p-5 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border">
                <span className="text-sm sm:text-base text-muted-foreground">
                  モード
                </span>
                <span className="font-bold text-lg sm:text-xl text-foreground">
                  {progress.mode === "en" ? "日本語 → 英語" : "英語 → 日本語"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 sm:p-5 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border">
                <span className="text-sm sm:text-base text-muted-foreground">
                  問題数
                </span>
                <span className="font-bold text-lg sm:text-xl text-foreground">
                  {progress.total_questions}問
                </span>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={() => router.push("/flashcard/start")}
                className="w-full py-4 sm:py-6 text-base sm:text-xl bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                もう一度挑戦
              </Button>

              <Button
                onClick={() => router.push("/flashcard/statistics")}
                variant="outline"
                className="w-full py-4 sm:py-6 text-base sm:text-xl border-2"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                統計を見る
              </Button>

              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                className="w-full py-4 sm:py-6 text-base sm:text-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                ダッシュボードへ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
