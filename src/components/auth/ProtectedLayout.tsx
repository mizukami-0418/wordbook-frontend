// src/components/auth/ProtectedLayout.tsx
// 保護ページの共通レイアウト（クライアント側）
// プロフィール完了確認とナビゲーション

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

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
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  // プロフィール未完了の場合はリダイレクト中なので何も表示しない
  if (needsUsername) {
    return null;
  }

  // 通常のレイアウト
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/dashboard" className="text-lg font-semibold">
              Home
            </a>
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ダッシュボード
              </a>
              <a
                href="/profile"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                プロフィール
              </a>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* コンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

// ログアウトボタン
function LogoutButton() {
  const { loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return null;

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:text-red-700"
    >
      ログアウト
    </button>
  );
}
