// src/app/(protected)/flashcard/start/page.tsx
// クイズ開始ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLevels } from "@/lib/api/dictionary";
import { getProgressList } from "@/lib/api/flashcard";
import type { Level } from "@/types/dictionary";
import type { UserProgress } from "@/types/flashcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, RotateCcw, Zap, Pause, Play, Sparkles } from "lucide-react";

export default function FlashcardStartPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [pausedProgress, setPausedProgress] = useState<UserProgress[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<"en" | "jp" | null>(null);
  const [selectedQuizMode, setSelectedQuizMode] = useState<
    "normal" | "test" | "replay"
  >("normal");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [levelsData, pausedData] = await Promise.all([
          getLevels(),
          getProgressList({ is_paused: true }),
        ]);
        setLevels(levelsData);
        setPausedProgress(pausedData);
      } catch (err: unknown) {
        console.error("データ取得エラー:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStart = () => {
    if (!selectedLevel || !selectedMode) return;

    const params = new URLSearchParams({
      level: selectedLevel.toString(),
      mode: selectedMode,
      quiz_mode: selectedQuizMode,
    });

    router.push(`/flashcard/quiz?${params}`);
  };

  const handleResume = (progressId: number) => {
    router.push(`/flashcard/resume/${progressId}`);
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
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          フラッシュカード学習
        </span>
      </h1>

      {/* 中断データがある場合 */}
      {pausedProgress.length > 0 && (
        <Card className="border-2 border-yellow-500/50 bg-yellow-500/5 dark:bg-yellow-500/10 shadow-lg">
          <CardHeader className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 border-b border-border">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Pause className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              続きから再開
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3">
            {pausedProgress.map((progress) => (
              <div
                key={progress.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-card rounded-lg shadow border-2 border-border hover:border-primary/50 transition-all"
              >
                <div className="flex-1">
                  <p className="font-bold text-base sm:text-lg text-foreground">
                    {progress.level.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {progress.mode === "en" ? "日本語 → 英語" : "英語 → 日本語"}{" "}
                    | 進捗: {progress.current_question_index} /{" "}
                    {progress.total_questions}
                  </p>
                </div>
                <Button
                  onClick={() => handleResume(progress.id)}
                  className="w-full sm:w-auto bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  再開
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 新規開始 */}
      <Card className="shadow-xl border-2 border-border">
        <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <CardTitle className="text-2xl sm:text-3xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            新しく始める
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* クイズモード選択 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
              クイズモード
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  value: "normal",
                  label: "通常",
                  desc: "全問題",
                  icon: <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />,
                },
                {
                  value: "test",
                  label: "テスト",
                  desc: "ランダム100問",
                  icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10" />,
                },
                {
                  value: "replay",
                  label: "リプレイ",
                  desc: "間違えた問題",
                  icon: <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10" />,
                },
              ].map((mode) => (
                <button
                  key={mode.value}
                  onClick={() =>
                    setSelectedQuizMode(
                      mode.value as "normal" | "test" | "replay",
                    )
                  }
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                    selectedQuizMode === mode.value
                      ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-lg scale-105"
                      : "border-border hover:border-primary/50 dark:hover:border-primary bg-card"
                  }`}
                >
                  <div className="flex justify-center mb-2 sm:mb-3 text-primary">
                    {mode.icon}
                  </div>
                  <div className="font-bold text-base sm:text-lg text-foreground">
                    {mode.label}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {mode.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 難易度選択 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
              難易度
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                    selectedLevel === level.id
                      ? "border-purple-600 bg-purple-500/10 dark:bg-purple-500/20 shadow-lg scale-105"
                      : "border-border hover:border-purple-500/50 dark:hover:border-purple-500 bg-card"
                  }`}
                >
                  <div className="font-bold text-base sm:text-lg text-foreground">
                    {level.name}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {level.word_count}問
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* モード選択 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
              出題モード
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => setSelectedMode("en")}
                className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                  selectedMode === "en"
                    ? "border-green-600 bg-green-500/10 dark:bg-green-500/20 shadow-lg scale-105"
                    : "border-border hover:border-green-500/50 dark:hover:border-green-500 bg-card"
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🇯🇵 → 🇬🇧</div>
                <div className="font-bold text-base sm:text-lg text-foreground">
                  日本語 → 英語
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  英訳問題
                </div>
              </button>

              <button
                onClick={() => setSelectedMode("jp")}
                className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                  selectedMode === "jp"
                    ? "border-green-600 bg-green-500/10 dark:bg-green-500/20 shadow-lg scale-105"
                    : "border-border hover:border-green-500/50 dark:hover:border-green-500 bg-card"
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🇬🇧 → 🇯🇵</div>
                <div className="font-bold text-base sm:text-lg text-foreground">
                  英語 → 日本語
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  和訳問題
                </div>
              </button>
            </div>
          </div>

          {/* 開始ボタン */}
          <Button
            onClick={handleStart}
            disabled={!selectedLevel || !selectedMode}
            className="w-full h-14 sm:h-16 text-lg sm:text-2xl bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
          >
            {!selectedLevel || !selectedMode ? (
              "難易度とモードを選択してください"
            ) : (
              <>スタート 🚀</>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
