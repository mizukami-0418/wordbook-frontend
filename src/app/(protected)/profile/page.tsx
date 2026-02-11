// src/app/(protected)/profile/page.tsx

"use client";

import { useState, type FormEvent } from "react";
import { useUser } from "@/hooks/useUser";
import { updateUserProfile } from "@/lib/api/user";
import { updateProfileSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function ProfilePage() {
  const { user, loading, error, refetch } = useUser();
  const [username, setUsername] = useState(user?.username ?? "");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // userが取得されたら初期値をセット
  // if (user && username === "") {
  //   setUsername(user.username);
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setSuccessMessage(null);
    setUpdating(true);

    try {
      // バリデーション
      const result = updateProfileSchema.safeParse({ username });
      if (!result.success) {
        setUpdateError(result.error.issues[0].message);
        return;
      }

      // DRF APIでプロフィール更新
      await updateUserProfile(username);

      setSuccessMessage("プロフィールを更新しました");
      refetch(); // データを再取得
    } catch (err: unknown) {
      if (axios.isAxiosError<{ username?: string[] }>(err)) {
        const apiError = err.response?.data;
        if (apiError?.username) {
          setUpdateError(apiError.username[0]);
        } else {
          setUpdateError(
            "プロフィール更新に失敗しました。再度お試しください。",
          );
        }
      } else {
        setUpdateError("プロフィール更新に失敗しました。再度お試しください。");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold">プロフィール</h1>
        <p className="text-gray-500 mt-1">アカウント情報の編集</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* メールアドレス（読み取り専用） */}
          <div className="space-y-2">
            <Label>メールアドレス</Label>
            <Input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-400">
              メールアドレスの変更は現在対応していません
            </p>
          </div>

          {/* ユーザー名 */}
          <div className="space-y-2">
            <Label htmlFor="username">ユーザー名：{user?.username}</Label>
            <Input
              id="username"
              placeholder="更新するならこちらに入力"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={updating}
            />
          </div>

          {/* エラーメッセージ */}
          {updateError && <p className="text-sm text-red-500">{updateError}</p>}

          {/* 成功メッセージ */}
          {successMessage && (
            <p className="text-sm text-green-600">{successMessage}</p>
          )}

          <Button type="submit" disabled={updating}>
            {updating ? "更新中..." : "更新"}
          </Button>
        </form>
      </div>
    </div>
  );
}
