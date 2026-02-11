// src/components/auth/CompleteProfileForm.tsx
// プロフィール完成フォーム: 初回登録時のusername設定

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { completeProfile } from "@/lib/api/user";
import { completeProfileSchema } from "@/lib/validations";
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

export default function CompleteProfileForm({ email }: { email: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // バリデーション
      const result = completeProfileSchema.safeParse({ username });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // DRF APIでプロフィール設定
      await completeProfile(username);

      // 設定完了 → ダッシュボードにリダイレクト
      router.push("/dashboard");
    } catch (err: unknown) {
      // DRF APIのエラーレスポンス
      if (axios.isAxiosError<{ error?: string; username?: string[] }>(err)) {
        const apiError = err.response?.data;
        if (apiError?.error) {
          setError(apiError.error);
        } else if (apiError?.username) {
          setError(apiError.username[0]);
        } else {
          setError("プロフィール設定に失敗しました。再度お試しください。");
        }
      } else {
        setError("プロフィール設定に失敗しました。再度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">プロフィール設定</CardTitle>
          <CardDescription>ユーザー名を設定してください</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* メールアドレス（読み取り専用） */}
            <div className="space-y-2">
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={email}
                disabled
                className="bg-gray-50 text-gray-500"
              />
            </div>

            {/* ユーザー名入力 */}
            <div className="space-y-2">
              <Label htmlFor="username">ユーザー名</Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="off"
              />
              <p className="text-xs text-gray-500">
                英数字、アンダースコア（_）、ハイフン（-）のみ使用可能。2〜50文字。
              </p>
            </div>

            {/* エラーメッセージ */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "設定中..." : "プロフィールを設定"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
