import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-bold tracking-tight">
            ことばポケット
          </CardTitle>
          <p className="text-muted-foreground">
            単語学習を、もっと楽しく、もっと身近に
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4 text-sm leading-relaxed">
            <p>
              <strong>「ことばポケット」</strong>は、英単語の学習を
              クイズ形式で楽しく体験できる単語帳アプリです。
            </p>
            <hr className="border-muted" />
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">辞書機能</h2>
              </div>
              <p className="text-gray-600 mb-6">
                英和辞典や和英辞典の機能があります。とてもシンプルな機能です。
              </p>
              <Link
                href="/about/dictionary"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                詳しく見る
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <hr className="border-muted" />
            {/* 単語帳機能カード */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">単語帳機能</h2>
              </div>
              <p className="text-gray-600 mb-6">
                レベルを選んで、クイズ形式で回答します。途中で中断することも可能です。
              </p>
              <Link
                href="/about/flashcard"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                詳しく見る
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <hr className="border-muted" />
            <p>
              日々の単語学習を、もっと楽しく、もっと効率的にしてみませんか？
            </p>
            <p className="text-xs text-muted-foreground">
              ※ 音楽は右上のボタンから操作できます
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/signup">新規登録</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/login">ログイン</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
