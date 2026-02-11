// src/app/(auth)/set-password/page.tsx
// メールリンクからのパスワード設定ページ
// URLパラメータにSupabaseのセッション情報が含まれるため、クライアントコンポーネントとして実装

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import SetPasswordForm from "@/components/auth/SetPasswordForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, AlertCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SetPasswordPage() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkSession() {
      try {
        // URLのハッシュパラメータからセッションを復元
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setStatus("ready");
        } else {
          setError(
            "セッションが無効です。メールのリンクを再度クリックしてください。",
          );
          setStatus("error");
        }
      } catch {
        setError("セッション確認に失敗しました。");
        setStatus("error");
      }
    }

    checkSession();
  }, [supabase.auth]);

  // ローディング
  if (status === "loading") {
    return (
      <div className="w-full max-w-md mx-auto px-4 sm:px-0">
        <Card className="border-2 border-border shadow-2xl">
          <CardContent className="py-12 sm:py-16 text-center space-y-4">
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary animate-spin" />
            <p className="text-sm sm:text-base text-muted-foreground">
              セッション確認中...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // エラー
  if (status === "error") {
    return (
      <div className="w-full max-w-md mx-auto px-4 sm:px-0">
        <Card className="border-2 border-destructive/50 shadow-2xl">
          <CardHeader className="text-center space-y-3 pb-6 bg-destructive/5 dark:bg-destructive/10 border-b border-destructive/20">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-destructive/10 dark:bg-destructive/20 rounded-full">
                <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-destructive">
              エラー
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {error}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-2 p-3 sm:p-4 bg-muted/50 dark:bg-muted/30 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <p>以下をお試しください:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>メール内のリンクを再度クリック</li>
                  <li>新規登録からやり直す</li>
                  <li>時間をおいて再度お試しください</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full h-11 sm:h-12 bg-linear-to-r from-primary to-purple-600"
              >
                <Link href="/signup">新規登録ページに戻る</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full h-11 sm:h-12 border-2"
              >
                <Link href="/login">ログインページに戻る</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // パスワード設定フォーム
  return <SetPasswordForm />;
}
