// src/app/(protected)/dictionary/words/[id]/page.tsx
// 単語詳細ページ

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getWordDetail } from "@/lib/api/dictionary";
import type { WordDetail } from "@/types/dictionary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">
              {error || "単語が見つかりませんでした"}
            </p>
          </CardContent>
        </Card>
        <Button onClick={() => router.back()}>← 戻る</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← 戻る
        </Button>
        <h1 className="text-2xl font-bold">単語詳細</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{word.english}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 日本語訳 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">意味</h3>
            <p className="text-xl">{word.japanese}</p>
          </div>

          {/* 品詞と難易度 */}
          <div className="flex gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">品詞</h3>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded">
                {word.part_of_speech.name}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                難易度
              </h3>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded">
                {word.level.name}
              </span>
            </div>
          </div>

          {/* 成句・例文 */}
          {word.phrase && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                成句・例文
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded border">
                {word.phrase}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
