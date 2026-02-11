// src/app/(protected)/dashboard/page.tsx
// ダッシュボードページ - レスポンシブ・ダークモード対応

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  BarChart3,
  Search,
  Mail,
  User,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Trophy,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <div className="bg-linear-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-background shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            ダッシュボード
          </h1>
        </div>
        <p className="text-background text-base sm:text-lg">
          ようこそ、<span className="font-semibold">{user?.username}</span>さん
        </p>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 単語検索 */}
        <ActionCard
          href="/dictionary/search"
          icon={<Search className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="単語検索"
          description="英語または日本語で単語を検索"
          color="blue"
          badge="人気"
        />

        {/* フラッシュカード */}
        <ActionCard
          href="/flashcard/start"
          icon={<Brain className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="フラッシュカード"
          description="ゲーム感覚で楽しく学習"
          color="purple"
          badge="おすすめ"
        />

        {/* 学習統計 */}
        <ActionCard
          href="/flashcard/statistics"
          icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="学習統計"
          description="進捗状況を確認"
          color="green"
        />

        {/* 単語一覧 */}
        <ActionCard
          href="/dictionary/words"
          icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="単語一覧"
          description="レベル別に単語を確認"
          color="orange"
        />

        {/* プロフィール */}
        <ActionCard
          href="/profile"
          icon={<User className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="プロフィール"
          description="アカウント情報を編集"
          color="indigo"
        />

        {/* お問い合わせ */}
        <ActionCard
          href="/contact"
          icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="お問い合わせ"
          description="ご質問・ご要望はこちら"
          color="pink"
        />
      </div>

      {/* アカウント情報 */}
      <Card className="shadow-lg border-border">
        <CardHeader className="bg-muted/50 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            アカウント情報
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <InfoRow
              label="メールアドレス"
              value={user?.email || ""}
              icon={<Mail className="w-4 h-4 text-muted-foreground" />}
            />
            <InfoRow
              label="ユーザー名"
              value={user?.username || ""}
              icon={<User className="w-4 h-4 text-muted-foreground" />}
            />
            <InfoRow
              label="アカウント状態"
              value="アクティブ"
              icon={
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
              }
              valueColor="text-green-600 dark:text-green-400"
            />
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <Button
              asChild
              className="w-full bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-sm sm:text-base"
            >
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2"
              >
                プロフィールを編集
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* クイックリンク */}
      <Card className="shadow-lg border-border">
        <CardHeader className="bg-primary/5 dark:bg-primary/10 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            クイックリンク
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <QuickLink
              href="/flashcard/paused"
              icon={<Brain className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="中断したクイズを再開"
            />
            <QuickLink
              href="/flashcard/incorrect"
              icon={<Trophy className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="間違えた単語を復習"
            />
            <QuickLink
              href="/contact/history"
              icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="お問い合わせ履歴"
            />
            <QuickLink
              href="/dictionary/search"
              icon={<Search className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="単語を検索"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// アクションカードコンポーネント
function ActionCard({
  href,
  icon,
  title,
  description,
  color,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "purple" | "green" | "orange" | "indigo" | "pink";
  badge?: string;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800",
    purple:
      "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800",
    green:
      "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800",
    orange:
      "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800",
    indigo:
      "from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 hover:from-indigo-600 hover:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800",
    pink: "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 hover:from-pink-600 hover:to-pink-700 dark:hover:from-pink-700 dark:hover:to-pink-800",
  };

  const badgeClasses = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    purple:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    orange:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    indigo:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  };

  return (
    <Link href={href}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-primary/50 dark:hover:border-primary h-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div
              className={`p-2 sm:p-3 rounded-xl bg-linear-to-br ${colorClasses[color]} text-white group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            {badge && (
              <span
                className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${badgeClasses[color]}`}
              >
                {badge}
              </span>
            )}
          </div>
          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">
            {description}
          </p>
          <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            <span>始める</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// 情報行コンポーネント
function InfoRow({
  label,
  value,
  icon,
  valueColor = "text-foreground",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-muted/50 dark:bg-muted/30 rounded-lg hover:bg-muted dark:hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <div className="shrink-0">{icon}</div>
        <span className="text-xs sm:text-sm text-muted-foreground truncate">
          {label}
        </span>
      </div>
      <span
        className={`text-xs sm:text-sm font-semibold ${valueColor} truncate max-w-[50%] sm:max-w-none ml-2`}
      >
        {value}
      </span>
    </div>
  );
}

// クイックリンクコンポーネント
function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-md dark:hover:shadow-primary/20 transition-all group">
        <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 flex-1">
          {label}
        </span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
      </div>
    </Link>
  );
}
