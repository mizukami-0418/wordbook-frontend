// src/app/(protected)/contact/success/page.tsx
// お問い合わせ完了ページ - レスポンシブ・ダークモード対応

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, History, Home } from "lucide-react";

export default function ContactSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl w-full shadow-2xl border-2 border-border">
        <CardContent className="p-8 sm:p-12 text-center space-y-6 sm:space-y-8">
          {/* アイコン */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* タイトル */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                送信完了
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground font-medium">
              お問い合わせいただきありがとうございます
            </p>
          </div>

          {/* 説明 */}
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            <p className="leading-relaxed">確認メールを送信いたしました。</p>
            <p className="leading-relaxed">
              内容を確認の上、順次ご対応させていただきます。
            </p>
          </div>

          {/* 成功メッセージ */}
          <div className="flex items-start gap-3 p-4 sm:p-5 bg-green-500/10 dark:bg-green-500/20 border-2 border-green-500/20 rounded-lg max-w-lg mx-auto">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="text-left space-y-1">
              <p className="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">
                お問い合わせを受け付けました
              </p>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                メールボックスをご確認ください
              </p>
            </div>
          </div>

          {/* ボタン */}
          <div className="space-y-3 sm:space-y-4 max-w-md mx-auto pt-4">
            <Button
              onClick={() => router.push("/contact/history")}
              className="w-full h-12 sm:h-14 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              <History className="w-5 h-5 mr-2" />
              お問い合わせ履歴を見る
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full h-12 sm:h-14 text-base sm:text-lg border-2"
            >
              <Home className="w-5 h-5 mr-2" />
              ダッシュボードに戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
