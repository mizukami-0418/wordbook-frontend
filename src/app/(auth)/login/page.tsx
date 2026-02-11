// src/app/(auth)/login/page.tsx
// ログインページ - レスポンシブ・ダークモード対応

import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative w-full max-w-md">
        {/* ロゴ */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ことばポケット"
              width={120}
              height={120}
              className="w-12 h-12 sm:w-14 sm:h-14"
            />

            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ことばポケット
            </h1>
          </div>
        </div>

        {/* ログインフォーム */}
        <LoginForm />
      </div>
    </main>
  );
}
