"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

export default function TestApiPage() {
  const {
    user: supabaseUser,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();
  const { user: drfUser, loading: userLoading, error, refetch } = useUser();

  if (authLoading || userLoading) {
    return <div className="p-8">読み込み中...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API接続テスト</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Supabase認証状態</h2>
          <p>認証済み: {isAuthenticated ? "はい" : "いいえ"}</p>
          {supabaseUser && (
            <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(supabaseUser, null, 2)}
            </pre>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">DRF APIユーザー情報</h2>
          {error && <p className="text-red-500">{error}</p>}
          {drfUser ? (
            <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(drfUser, null, 2)}
            </pre>
          ) : (
            <p>ユーザー情報がありません</p>
          )}
          <Button onClick={refetch} className="mt-2">
            再取得
          </Button>
        </div>
      </div>
    </div>
  );
}
