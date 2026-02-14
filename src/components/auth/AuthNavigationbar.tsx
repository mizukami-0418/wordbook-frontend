import Image from "next/image";
import { ThemeToggle } from "../common/ThemeToggle";
import Link from "next/link";

export default function AuthNavigationBar() {
  return (
    // ナビゲーション
    <nav className="bg-muted  shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link
            href="/"
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
          </Link>
          {/* テーマ切り替えボタン */}
          <div className="top-6 right-6 bottom-6 z-10">
            <ThemeToggle variant="button" className="rounded-md" />
          </div>
        </div>
      </div>
    </nav>
  );
}
