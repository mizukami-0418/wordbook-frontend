// app/page.tsx
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
            <p>
              <strong>辞書機能</strong>では、英訳・和訳の両方に対応。
              例文付きで単語の使い方を確認でき、ちょっとした調べ物にも便利です。
            </p>
            <hr className="border-muted" />
            <p>
              <strong>単語帳機能</strong>はクイズ形式で回答していく学習モード。
              難易度別に分かれているので、初心者から上級者まで楽しめます。
            </p>
            <hr className="border-muted" />
            <p>
              日々の単語学習を、もっと楽しく、もっと効率的にしてみませんか？
            </p>
            <p className="text-xs text-muted-foreground">
              ※ 音楽は右上のボタンから操作できます
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
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
