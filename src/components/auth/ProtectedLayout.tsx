// src/components/auth/ProtectedLayout.tsx
// 保護ページの共通レイアウト（クライアント側）
// プロフィール完了確認とナビゲーション

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import ProtectedNavigationBar from "./ProtectedNavigationbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: authLoading } = useAuth();
  const { loading: userLoading, needsUsername } = useUser();
  const router = useRouter();

  useEffect(() => {
    // ロード完了後にプロフィール設定状態を確認
    if (!authLoading && !userLoading && needsUsername) {
      router.push("/complete-profile");
    }
  }, [authLoading, userLoading, needsUsername, router]);

  // ロード中
  if (authLoading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  // プロフィール未完了の場合はリダイレクト中なので何も表示しない
  if (needsUsername) {
    return null;
  }

  // 通常のレイアウト
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ProtectedNavigationBar />

      {/* コンテンツ */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
