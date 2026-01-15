// app/signup/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-md rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Let's Make an Account!
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            ことばポケットへようこそ！
            <br />
            メールアドレスを入力してください 🌸
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <SignupForm />

          <div className="text-center text-sm space-y-2">
            <p>
              登録済みの方は{" "}
              <Link href="/login" className="text-primary underline">
                こちら
              </Link>
            </p>
            <p>
              <Link href="/" className="underline">
                トップページへ戻る
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
