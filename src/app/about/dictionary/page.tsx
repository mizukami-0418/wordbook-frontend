import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutDictionaryPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-lime-50 via-yellow-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* タイトル */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-linear-to-r from-lime-400 via-yellow-300 to-pink-300 bg-clip-text text-transparent drop-shadow-sm">
            辞典機能について
          </h1>
          <p className="text-lg text-gray-600">
            英語と日本語の橋渡しをサポートします 📚
          </p>
        </div>

        {/* メインカード */}
        <Card className="border-2 border-lime-200 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-lime-600">
              🎯 辞典の使い方
            </CardTitle>
            <CardDescription className="text-base text-gray-600 pt-2">
              この辞典は、英和辞典と和英辞典の2つの機能があります
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 英和辞典機能 */}
            <div className="bg-linear-to-r from-lime-100 to-lime-50 rounded-xl p-5 border-2 border-lime-200">
              <h2 className="text-2xl font-bold text-lime-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">🇬🇧</span>
                英和辞典機能
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                英語の単語を入力すると、その意味を日本語で表示します。英語のスペルがわからないときも、音がわかれば検索できます！
              </p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-lime-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-lime-600">例：</strong> 「apple」
                  と入力すると「りんご」が表示されます 🍎
                </p>
              </div>
            </div>

            {/* 和英辞典機能 */}
            <div className="bg-linear-to-r from-pink-100 to-pink-50 rounded-xl p-5 border-2 border-pink-200">
              <h2 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">🇯🇵</span>
                和英辞典機能
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                日本語の単語を入力すると、その意味を英語で表示します。ひらがなで入力しても大丈夫です！
              </p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-pink-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-pink-600">例：</strong> 「りんご」 や
                  「リンゴ」 と入力すると「apple」が表示されます 🍎
                </p>
              </div>
            </div>

            {/* ひらがな入力対応 */}
            <div className="bg-linear-to-r from-yellow-100 to-yellow-50 rounded-xl p-5 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">✨</span>
                ひらがな入力にも対応
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                簡単な単語は、ひらがなで入力しても検索できます。まだ漢字が難しい小さいお友達でも安心して使えます！
              </p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-yellow-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-yellow-600">例：</strong> 「あか」
                  と入力しても「赤」を検索できます ❤️
                </p>
              </div>
            </div>

            {/* 使い方 */}
            <div className="bg-white rounded-xl p-5 border-2 border-lime-300 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                使い方
              </h2>
              <ol className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </span>
                  <span className="pt-1">
                    検索バーに日本語か英語で単語を入力します
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </span>
                  <span className="pt-1">
                    <span className="bg-linear-to-r from-lime-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
                      「検索結果を表示」
                    </span>
                    ボタンをクリックします
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </span>
                  <span className="pt-1">検索結果が表示されます 🎉</span>
                </li>
              </ol>
            </div>

            {/* 注意事項 */}
            <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
              <h2 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                注意事項
              </h2>
              <p className="text-gray-700 leading-relaxed text-base mb-3">
                和英辞典の機能を使用する場合、下記のような事例が発生しますので、ご了承ください。
              </p>
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-orange-600">例：</strong>
                  「赤」と入力すると、「赤」だけでなく「赤ちゃん」など「赤」という文字を含む単語も一緒に表示されます。
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  💡 これは、関連する単語を見つけるのに役立ちます！
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 戻るボタン */}
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            className="bg-white hover:bg-lime-50 border-2 border-lime-300 text-lime-700 font-semibold px-8 py-6 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/">🏠 トップページに戻る</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
