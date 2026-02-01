// src/components/auth/SetPasswordForm.tsx
// パスワード設定フォーム: メール確認リンクからの初期パスワード設定

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { setPasswordSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // バリデーション
      const result = setPasswordSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // 現在のセッション確認
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError(
          "セッションが無効です。メールのリンクを再度クリックしてください。",
        );
        return;
      }

      // パスワード更新
      const { error: supabaseError } = await supabase.auth.updateUser({
        password,
      });

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      // パスワード設定完了 → username設定ページにリダイレクト
      // (username設定が必要か確認してからダッシュボードまたはプロフィール設定に遷移)
      router.push("/dashboard");
    } catch {
      setError("予期しないエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">パスワード設定</CardTitle>
          <CardDescription>
            アカウントのパスワードを設定してください
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500">
                8文字以上、大文字・小文字・数字を含む必要があります
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            {/* エラーメッセージ */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "設定中..." : "パスワードを設定"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
