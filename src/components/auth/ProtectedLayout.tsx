// src/components/auth/ProtectedLayout.tsx
// 保護ページの共通レイアウト（クライアント側）
// プロフィール完了確認とナビゲーション

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { Menu, X, LogOut, House } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "../common/ThemeToggle";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: authLoading } = useAuth();
  const { loading: userLoading, needsUsername } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // ロード完了後にプロフィール設定状態を確認
    if (!authLoading && !userLoading && needsUsername) {
      router.push("/complete-profile");
    }
  }, [authLoading, userLoading, needsUsername, router]);

  // モバイルメニューを閉じる
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
      {/* ナビゲーション */}
      <nav className="bg-muted  shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ロゴ */}
            <a
              href="/dashboard"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {/* ロゴ画像がある場合 */}
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />

              <span className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ことばポケット
              </span>
            </a>

            {/* デスクトップメニュー */}
            <div className="hidden sm:flex items-center gap-6 ">
              <NavLink href="/dashboard">
                <House className="inline w-4 h-4 mr-1" />
                ダッシュボード
              </NavLink>
              <LogoutButton />
              <ThemeToggle variant="icon" />
            </div>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-border transition-colors ml-auto"
              aria-label="メニュー"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-muted-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
            {/* <ThemeToggle className="sm:hidden" /> */}
            <ThemeToggle className="sm:hidden" />
          </div>
        </div>

        {/* モバイルメニュー */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t bg-background">
            <div className="px-4 py-2 space-y-1">
              <MobileNavLink href="/dashboard" onClick={closeMobileMenu}>
                ダッシュボード
              </MobileNavLink>
              <div className="pt-2 border-t">
                <LogoutButton mobile onLogout={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* コンテンツ */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* フッター（オプション） */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 ことばポケット. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// デスクトップナビゲーションリンク
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-foreground hover:bg-muted transition-colors rounded-lg px-2 py-1"
    >
      {children}
    </a>
  );
}

// モバイルナビゲーションリンク
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
    >
      {children}
    </a>
  );
}

// ログアウトボタン
function LogoutButton({
  mobile = false,
  onLogout,
}: {
  mobile?: boolean;
  onLogout?: () => void;
}) {
  const { loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    onLogout?.();
    router.push("/login");
  };

  if (loading) return null;

  if (mobile) {
    return (
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
      >
        ログアウト
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-foreground hover:bg-muted transition-colors rounded-sm px-2 py-1 cursor-pointer"
    >
      <LogOut className="inline w-4 h-4 mr-1" />
      ログアウト
    </button>
  );
}
