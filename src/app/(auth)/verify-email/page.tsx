// src/app/(auth)/verify-email/page.tsx
// メール確認ページ - レスポンシブ・ダークモード対応

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md mx-auto py-6">
      <Card className="border-2 border-border shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 bg-linear-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          {/* アイコン */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              メール確認
            </span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            送信されたメールを確認してください
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* 成功メッセージ */}
          <div className="flex items-start gap-3 p-4 bg-green-500/10 dark:bg-green-500/20 border-2 border-green-500/20 rounded-lg">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-semibold text-green-700 dark:text-green-300">
                確認メールを送信しました
              </p>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                メールボックスをご確認ください
              </p>
            </div>
          </div>

          {/* 説明 */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs sm:text-sm font-bold text-primary">
                  1
                </span>
              </div>
              <p className="text-sm sm:text-base text-foreground">
                メールボックスを確認してください
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs sm:text-sm font-bold text-primary">
                  2
                </span>
              </div>
              <p className="text-sm sm:text-base text-foreground">
                受信したメール内のリンクをクリック
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs sm:text-sm font-bold text-primary">
                  3
                </span>
              </div>
              <p className="text-sm sm:text-base text-foreground">
                パスワードを設定して登録を完了
              </p>
            </div>
          </div>

          {/* スパム対策の案内 */}
          <div className="flex items-start gap-2 p-3 sm:p-4 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              メールが届かない場合は、
              <span className="font-semibold text-foreground">
                迷惑メールフォルダ
              </span>
              を確認してください
            </p>
          </div>

          {/* ログインページに戻るボタン */}
          <div className="pt-4 border-t border-border">
            <Button
              asChild
              variant="outline"
              className="w-full h-11 sm:h-12 text-sm sm:text-base border-2"
            >
              <Link
                href="/login"
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                ログインページに戻る
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ホームへ戻るリンク */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
