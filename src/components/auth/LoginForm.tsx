// src/components/auth/LoginForm.tsx
// ログインフォーム - レスポンシブ・ダークモード対応

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
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  LogIn,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

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
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <Card className="border-2 border-border shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 bg-linear-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-linear-to-br from-primary to-purple-600 rounded-2xl shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ログイン
            </span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            アカウント情報を入力してログインしてください
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* ログインフォーム */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* メールアドレス */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
                メールアドレス
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  className="pl-10 h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* パスワード */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                パスワード
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="current-password"
                  className="pl-10 h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* ログインボタン */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ログイン中...
                </>
              ) : (
                <>
                  ログイン
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* 区切り */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground px-2">または</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* OAuth認証 */}
          <OAuthButtons />

          {/* 新規登録へのリンク */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              アカウントをお持ちでない方は{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
              >
                新規登録
                <Sparkles className="w-3 h-3" />
              </Link>
            </p>
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
