// src/components/auth/ProtectedLayout.tsx
// 保護ページの共通レイアウト（クライアント側）
// プロフィール完了確認とナビゲーション

"use client";

import AuthNavigationBar from "./AuthNavigationbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthNavigationBar />

      {/* コンテンツ */}
      {/* <main className="flex-1 max-w-7xl mx-auto w-full">
        {children}
      </main> */}

      {children}
    </div>
  );
}
