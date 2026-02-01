// src/components/auth/LoginForm.tsx
// ログインフォーム: メールアドレス + パスワード認証

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loginSchema } from "@/lib/validations";
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
import OAuthButtons from "./OAuthButtons";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // Supabaseでログイン
      const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        if (supabaseError.message.includes("Invalid login credentials")) {
          setError("メールアドレスまたはパスワードが正しくありません");
          return;
        }
        if (supabaseError.message.includes("Email not confirmed")) {
          setError(
            "メールアドレスの認証が完了していません。確認メールを確認してください。",
          );
          return;
        }
        setError(supabaseError.message);
        return;
      }

      // ログイン成功 → ダッシュボードにリダイレクト
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
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>
            アカウント情報を入力してログインしてください
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ログインフォーム */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* エラーメッセージ */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>

          {/* 区切り */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">または</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OAuth認証 */}
          <OAuthButtons />

          {/* 新規登録へのリンク */}
          <p className="text-center text-sm text-gray-500">
            アカウントがありませんか？{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              新規登録
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
