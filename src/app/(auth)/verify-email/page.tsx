// src/app/(auth)/verify-email/page.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">メール確認</CardTitle>
          <CardDescription>送信されたメールを確認してください</CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          {/* アイコン */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* 説明 */}
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              確認メールを送信しました
            </p>
            <p className="text-sm text-gray-500">
              メールボックスを確認し、受信したメールの中のリンクをクリックしてください。
              そこからパスワードを設定し、登録を完了させてください。
            </p>
          </div>

          {/* スパム対策の案内 */}
          <p className="text-xs text-gray-400">
            メールが届かない場合は、迷彼メールフォルダを確認してください
          </p>

          {/* ログインページに戻るリンク */}
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            ログインページに戻る
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
