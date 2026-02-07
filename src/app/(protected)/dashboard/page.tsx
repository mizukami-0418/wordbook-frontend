// src/app/(protected)/dashboard/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <p className="text-gray-500 mt-1">ようこそ、{user?.username}さん</p>
      </div>

      {/* ユーザー情報カード */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="font-semibold text-lg mb-4">アカウント情報</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-500">メールアドレス</span>
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm text-gray-500">ユーザー名</span>
            <span className="text-sm font-medium">{user?.username}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-500">アカウント状態</span>
            <span className="text-sm font-medium text-green-600">
              アクティブ
            </span>
          </div>
          <Button asChild variant="outline" className="w-full mt-4">
            <Link
              href="/dictionary/search"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              DICTIONARY MODEで始める
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full mt-4">
            <Link
              href="/dictionary/words"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              単語一覧を見る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
