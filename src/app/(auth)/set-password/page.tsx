// src/app/(auth)/set-password/page.tsx
// メールリンクからのパスワード設定ページ
// URLパラメータにSupabaseのセッション情報が含まれる

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
        // Supabaseはメールリンクの遷移時にURLハッシュにトークンを付与する
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
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">セッション確認中...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // エラー
  if (status === "error") {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">エラー</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <a href="/signup" className="text-sm text-blue-600 hover:underline">
              新規登録ページに戻る
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // パスワード設定フォーム
  return <SetPasswordForm />;
}
