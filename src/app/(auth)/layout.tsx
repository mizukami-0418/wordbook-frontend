// src/app/(auth)/layout.tsx
// 認証ページ共通レイアウト - レスポンシブ・ダークモード対応
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background flex items-center justify-center px-4 py-8 sm:py-12 relative">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* テーマ切り替えボタン */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <ThemeToggle variant="button" className="rounded-md" />
      </div>

      {/* コンテンツ */}
      <div className="w-full max-w-md relative">{children}</div>
    </div>
  );
}
