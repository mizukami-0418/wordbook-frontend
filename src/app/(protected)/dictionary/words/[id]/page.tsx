// src/app/(protected)/dictionary/words/[id]/page.tsx
// 単語詳細ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getWordDetail } from "@/lib/api/dictionary";
import type { WordDetail } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Tag,
  Layers,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function WordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [word, setWord] = useState<WordDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWord() {
      const id = params.id as string;
      if (!id) return;

      try {
        setLoading(true);
        const data = await getWordDetail(Number(id));
        setWord(data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("単語が見つかりませんでした");
          } else {
            setError(
              err.response?.data?.detail || "データの取得に失敗しました",
            );
          }
        } else {
          setError("データの取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWord();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
          <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-destructive">
                  {error || "単語が見つかりませんでした"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        {/* ヘッダー */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            単語詳細
          </h1>
        </div>

        {/* 単語カード */}
        <Card className="border-2 border-border shadow-2xl">
          <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary shrink-0 mt-1" />
              <div className="flex-1">
                <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground wrap-break-words">
                  {word.english}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* 日本語訳 */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                意味
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground pl-6 sm:pl-7">
                {word.japanese}
              </p>
            </div>

            {/* 品詞と難易度 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-muted-foreground flex items-center gap-2">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                  品詞
                </h3>
                <div className="pl-6 sm:pl-7">
                  <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg text-sm sm:text-base font-bold shadow-sm">
                    <Tag className="w-4 h-4" />
                    {word.part_of_speech.name}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                  難易度
                </h3>
                <div className="pl-6 sm:pl-7">
                  <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm sm:text-base font-bold shadow-sm">
                    <Layers className="w-4 h-4" />
                    {word.level.name}
                  </span>
                </div>
              </div>
            </div>

            {/* 成句・例文 */}
            {word.phrase && (
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-muted-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  成句・例文
                </h3>
                <div className="pl-6 sm:pl-7">
                  <div className="p-4 sm:p-6 bg-muted/30 dark:bg-muted/20 rounded-lg border-2 border-border">
                    <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap leading-relaxed">
                      {word.phrase}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
