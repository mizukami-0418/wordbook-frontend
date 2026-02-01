// src/components/auth/SignupForm.tsx
// サインアップフォーム: メールアドレス入力 → 確認メール送信

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signupSchema } from "@/lib/validations";
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

export default function SignupForm() {
  const [email, setEmail] = useState("");
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
      const result = signupSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // Supabaseで確認メールを送信
      // redirectTo: メールリンククリック後のリダイレクト先
      const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password: generateTemporaryPassword(), // 仮パスワード（後でset-passwordで上書き）
        options: {
          emailRedirectTo: `${getBaseUrl()}/set-password`,
          // data: 追加情報があればここで渡す
        },
      });

      if (supabaseError) {
        // 既に登録されているメールアドレス
        if (supabaseError.message.includes("already registered")) {
          setError(
            "このメールアドレスは既に登録されています。ログインページをお使いください。",
          );
          return;
        }
        setError(supabaseError.message);
        return;
      }

      // 確認メール送信完了ページにリダイレクト
      router.push("/verify-email");
    } catch (err) {
      console.error("Signup error:", err);
      setError("予期しないエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">新規登録</CardTitle>
          <CardDescription>
            メールアドレスを入力し、アカウントを作成してください
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* メール認証フォーム */}
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

            {/* エラーメッセージ */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "送信中..." : "確認メールを送信"}
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

          {/* ログインページへのリンク */}
          <p className="text-center text-sm text-gray-500">
            既にアカウントがありますか？{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              ログイン
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// 仮パスワード生成（メール確認後にset-passwordで上書き）
function generateTemporaryPassword(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 24; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ベースURL取得
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
