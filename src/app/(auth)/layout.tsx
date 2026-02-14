// src/app/(auth)/layout.tsx
// 認証ページ共通レイアウト - レスポンシブ・ダークモード対応
import AuthLayout from "@/components/auth/AuthLayout";

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background flex items-center justify-center">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* コンテンツ */}
        {children}
      </main>
    </AuthLayout>
  );
}
