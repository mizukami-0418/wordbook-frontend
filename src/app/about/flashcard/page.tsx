import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutFlashcardPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-lime-50 via-yellow-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* タイトル */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-linear-to-r from-lime-400 via-yellow-300 to-pink-300 bg-clip-text text-transparent drop-shadow-sm">
            フラッシュカード機能について
          </h1>
          <p className="text-lg text-gray-600">楽しく英単語を覚えよう！🎮</p>
        </div>

        {/* メインカード */}
        <Card className="border-2 border-lime-200 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-lime-600">
              🎯 ゲームモードの選び方
            </CardTitle>
            <CardDescription className="text-base text-gray-600 pt-2">
              下記からゲームを選択して、楽しく単語を覚えましょう
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 最初から */}
            <div className="bg-linear-to-r from-lime-100 to-lime-50 rounded-xl p-5 border-2 border-lime-200">
              <h2 className="text-2xl font-bold text-lime-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">🚀</span>
                最初から
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                新しいクイズを始めたいときに使います。
              </p>
              <div className="bg-white rounded-lg p-4 border border-lime-200 space-y-2">
                <p className="text-sm text-lime-600 font-semibold">使い方：</p>
                <ol className="space-y-2 text-sm text-lime-600 ml-4 list-decimal">
                  <li>4つの難易度から1つを選択します</li>
                  <li>モードを選択します（英訳 or 和訳）</li>
                  <li>クイズスタート！🎉</li>
                </ol>
              </div>
            </div>

            {/* 続きから */}
            <div className="bg-linear-to-r from-pink-100 to-pink-50 rounded-xl p-5 border-2 border-pink-200">
              <h2 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">📂</span>
                続きから
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                途中でやめたクイズを続けたいときに使います。
              </p>
              <div className="bg-white rounded-lg p-4 border border-pink-200 space-y-2">
                <p className="text-sm text-lime-600 font-semibold">使い方：</p>
                <ol className="space-y-2 text-sm text-lime-600 ml-4 list-decimal">
                  <li>セーブデータを選択します</li>
                  <li>
                    再開する場合は
                    <span className="font-semibold text-pink-600">restart</span>
                    ボタンをクリック
                  </li>
                  <li>
                    削除する場合は
                    <span className="font-semibold text-pink-600">delete</span>
                    ボタンをクリック
                  </li>
                </ol>
              </div>
            </div>

            {/* 復習モード */}
            <div className="bg-linear-to-r from-yellow-100 to-yellow-50 rounded-xl p-5 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">📚</span>
                復習モード
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                間違った単語をもう一度復習して、しっかり覚えましょう！
              </p>
              <div className="bg-white rounded-lg p-4 border border-yellow-200 space-y-2">
                <p className="text-sm text-lime-600 leading-relaxed">
                  <strong className="text-yellow-600">特徴：</strong>
                  間違った単語のみをモードごと（英訳or和訳）に実施します。難易度選択はありません。
                </p>
              </div>
            </div>

            {/* 復習モードの続きから */}
            <div className="bg-linear-to-r from-purple-100 to-purple-50 rounded-xl p-5 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">🔄</span>
                復習モードの続きから
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                復習モードを途中でやめた場合に、続きから再開できます。
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600">
                  復習モードのセーブデータを選択して、続きから学習を再開します
                  📖
                </p>
              </div>
            </div>

            {/* リプレイモード */}
            <div className="bg-linear-to-r from-blue-100 to-blue-50 rounded-xl p-5 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">🎬</span>
                リプレイモード
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                回答した問題をもう一度出題して、確実に覚えましょう！
              </p>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-blue-600">特徴：</strong>
                  回答した問題をもう一度出題します。最初からと同じように、難易度とモードを選択してスタートします。
                </p>
              </div>
            </div>

            {/* テストモード */}
            <div className="bg-linear-to-r from-green-100 to-green-50 rounded-xl p-5 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                テストモード
              </h2>
              <p className="text-lime-600 leading-relaxed text-base mb-3">
                100問のテストにチャレンジして、実力を試しましょう！
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-200 space-y-2">
                <p className="text-sm text-lime-600 leading-relaxed mb-2">
                  <strong className="text-green-600">特徴：</strong>
                  難易度とモードを選択し、ランダムで100問を出題します。
                </p>
                <p className="text-xs text-gray-500">
                  💪 集中力を試すチャレンジモードです！
                </p>
              </div>
            </div>

            {/* 使い方のまとめ */}
            <div className="bg-white rounded-xl p-5 border-2 border-lime-300 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">💡</span>
                モード選択の流れ
              </h2>
              <div className="space-y-3 text-lime-600 text-base">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-lime-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </span>
                  <span className="pt-1">下記からゲームを選択します</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </span>
                  <span className="pt-1">
                    モードによって、難易度やモード（英訳or和訳）を選択します
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </span>
                  <span className="pt-1">
                    クイズスタート！楽しく学習しましょう 🎉
                  </span>
                </div>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
              <h2 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                注意事項
              </h2>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-lime-600 leading-relaxed mb-2">
                    <strong className="text-orange-600">
                      💡 大文字・小文字について：
                    </strong>
                  </p>
                  <p className="text-sm text-lime-600 leading-relaxed">
                    国名などは最初の文字を大文字にしないと間違い判定になります。
                  </p>
                  <div className="mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                    <p className="text-xs text-gray-600">
                      <strong className="text-orange-600">例：</strong>
                      「Japan」は正解ですが、「japan」は間違いになります 🇯🇵
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-lime-600 leading-relaxed">
                    <strong className="text-orange-600">
                      💾 セーブデータについて：
                    </strong>
                  </p>
                  <p className="text-sm text-lime-600 leading-relaxed mt-1">
                    セーブデータは各ゲームモードごとに1個作成可能です。新しいゲームを始めると、前のセーブデータは上書きされます。
                  </p>
                </div>
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
