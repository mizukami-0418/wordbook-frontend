// src/app/(protected)/contact/history/page.tsx
// お問い合わせ履歴ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getInquiries } from "@/lib/api/contact";
import type { Inquiry } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Plus,
  AlertCircle,
  MessageSquare,
  Calendar,
  Hash,
  Home,
  Inbox,
} from "lucide-react";

export default function ContactHistoryPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const data = await getInquiries();
        setInquiries(data);
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

    fetchInquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              お問い合わせ履歴
            </span>
          </h1>
          <Button
            onClick={() => router.push("/contact")}
            className="w-full sm:w-auto bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            新規お問い合わせ
          </Button>
        </div>

        {/* エラー */}
        {error && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-destructive">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* データなし */}
        {inquiries.length === 0 ? (
          <Card className="shadow-xl border-2 border-border">
            <CardContent className="py-12 sm:py-16 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center">
                  <Inbox className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  お問い合わせ履歴がありません
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  ご不明な点がございましたら、お気軽にお問い合わせください
                </p>
              </div>
              <Button
                onClick={() => router.push("/contact")}
                className="bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
              >
                <Mail className="w-5 h-5 mr-2" />
                お問い合わせする
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* お問い合わせ一覧 */
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card
                key={inquiry.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-primary/50 dark:hover:border-primary"
              >
                <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <CardTitle className="text-lg sm:text-xl wrap-break-words">
                          {inquiry.subject}
                        </CardTitle>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(inquiry.created_at).toLocaleDateString(
                              "ja-JP",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Hash className="w-4 h-4" />
                          <span>{inquiry.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-bold self-start">
                      #{inquiry.id}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                  <div className="whitespace-pre-wrap text-sm sm:text-base text-foreground bg-muted/30 dark:bg-muted/20 p-4 sm:p-5 rounded-lg border border-border leading-relaxed">
                    {inquiry.context}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* フッターボタン */}
        <div className="mt-8 text-center">
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
    </div>
  );
}
