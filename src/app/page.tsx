// src/app/page.tsx
// ランディングページ - レスポンシブ・ダークモード対応

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Users,
  Award,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background via-muted/30 to-background">
        {/* ヒーローセクション */}
        <section className="relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-purple-500/10 to-transparent pointer-events-none" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            {/* テーマ切り替えボタン */}
            <div className="hidden max-[480px]:block">
              <ThemeToggle className="absolute top-4 right-4" />
            </div>
            <div className="block max-[480px]:hidden">
              <ThemeToggle
                variant="button"
                className="absolute top-6 right-6"
              />
            </div>
            <div className="text-center space-y-6 sm:space-y-8">
              {/* ロゴ */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="ことばポケット"
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                  />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                </div>
              </div>

              {/* メインタイトル */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-linear-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                    ことばポケット
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
                  単語学習を、もっと
                  <span className="text-primary font-semibold">楽しく</span>、
                  もっと
                  <span className="text-purple-600 font-semibold">身近に</span>
                </p>
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-6 px-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-base sm:text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link
                    href="/signup"
                    className="flex items-center justify-center gap-2"
                  >
                    無料で始める
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 border-2"
                >
                  <Link href="/login">ログイン</Link>
                </Button>
              </div>

              {/* 統計 */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto pt-8 sm:pt-12 px-4">
                <StatCard
                  icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
                  value="10years+"
                  label="ユーザー"
                />
                <StatCard
                  icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
                  value="5000+"
                  label="単語"
                />
                <StatCard
                  icon={<Award className="w-5 h-5 sm:w-6 sm:h-6" />}
                  value="何回でも"
                  label="学習回数"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 紹介文 */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Card className="border-2 border-border shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                <strong className="text-primary">「ことばポケット」</strong>
                は、英単語の学習を
                クイズ形式で楽しく体験できる単語帳アプリです。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 機能セクション */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                主な機能
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              あなたの学習をサポートする充実の機能
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* 辞書機能 */}
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="辞書機能"
              description="英和辞典や和英辞典の機能があります。シンプルで使いやすいインターフェースで、すぐに単語を検索できます。"
              color="blue"
              href="/about/dictionary"
              features={[
                { icon: <Search className="w-4 h-4" />, text: "高速検索" },
                { icon: <Target className="w-4 h-4" />, text: "レベル別表示" },
                { icon: <Sparkles className="w-4 h-4" />, text: "例文付き" },
              ]}
            />

            {/* フラッシュカード機能 */}
            <FeatureCard
              icon={<Brain className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="フラッシュカード"
              description="レベルを選んで、クイズ形式で回答します。途中で中断することも可能で、いつでも続きから学習を再開できます。"
              color="green"
              href="/about/flashcard"
              features={[
                { icon: <Zap className="w-4 h-4" />, text: "ゲーム感覚" },
                { icon: <TrendingUp className="w-4 h-4" />, text: "進捗管理" },
                { icon: <Award className="w-4 h-4" />, text: "統計分析" },
              ]}
            />
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="bg-muted/50 dark:bg-muted/20 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                なぜことばポケット？
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <BenefitCard
                icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8" />}
                title="楽しく学習"
                description="ゲーム感覚で楽しく単語を覚えられます"
                color="yellow"
              />
              <BenefitCard
                icon={<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />}
                title="効率的"
                description="あなたの弱点を分析して効率的に学習"
                color="blue"
              />
              <BenefitCard
                icon={<Target className="w-6 h-6 sm:w-8 sm:h-8" />}
                title="目標達成"
                description="統計機能で学習の成果を可視化"
                color="green"
              />
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Card className="border-2 border-primary/20 shadow-2xl bg-linear-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10">
            <CardContent className="p-8 sm:p-12 text-center space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  今すぐ始めよう
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  日々の単語学習を、もっと楽しく、もっと効率的にしてみませんか？
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-base sm:text-lg px-8 py-6"
                >
                  <Link
                    href="/signup"
                    className="flex items-center justify-center gap-2"
                  >
                    無料で始める
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}

// 統計カード
function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center space-y-1 sm:space-y-2">
      <div className="flex justify-center text-primary mb-1 sm:mb-2">
        {icon}
      </div>
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// 機能カード
function FeatureCard({
  icon,
  title,
  description,
  color,
  href,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "green";
  href: string;
  features: { icon: React.ReactNode; text: string }[];
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    green: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
  };

  const badgeClasses = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/50 dark:hover:border-primary overflow-hidden">
      <CardHeader className="bg-muted/50 dark:bg-muted/20 pb-4">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div
            className={`p-3 sm:p-4 rounded-2xl bg-linear-to-br ${colorClasses[color]} text-white group-hover:scale-110 transition-transform shadow-lg`}
          >
            {icon}
          </div>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${badgeClasses[color]}`}
            >
              {feature.icon}
              {feature.text}
            </div>
          ))}
        </div>

        <Link href={href}>
          <Button
            variant="ghost"
            className="w-full group-hover:bg-primary group-hover:text-white transition-all"
          >
            詳しく見る
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// 利点カード
function BenefitCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "yellow" | "blue" | "green";
}) {
  const colorClasses = {
    yellow:
      "from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600",
    blue: "from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600",
    green:
      "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
  };

  return (
    <Card className="text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-primary/50">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div
          className={`p-4 sm:p-5 rounded-2xl bg-linear-to-br ${colorClasses[color]} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground">
        {description}
      </p>
    </Card>
  );
}

// Search アイコンのインポート追加
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
