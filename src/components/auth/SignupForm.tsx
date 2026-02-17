// src/components/auth/SignupForm.tsx
// サインアップフォーム: メールアドレス入力 → 確認メール送信

// "use client";

// import { useState, type FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { signupSchema } from "@/lib/validations";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import OAuthButtons from "./OAuthButtons";

// export default function SignupForm() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const supabase = createClient();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       // バリデーション
//       const result = signupSchema.safeParse({ email });
//       if (!result.success) {
//         setError(result.error.issues[0].message);
//         return;
//       }

//       // Supabaseで確認メールを送信
//       // redirectTo: メールリンククリック後のリダイレクト先
//       const { error: supabaseError } = await supabase.auth.signUp({
//         email,
//         password: generateTemporaryPassword(), // 仮パスワード（後でset-passwordで上書き）
//         options: {
//           emailRedirectTo: `${getBaseUrl()}/set-password`,
//           // data: 追加情報があればここで渡す
//         },
//       });

//       if (supabaseError) {
//         // 既に登録されているメールアドレス
//         if (supabaseError.message.includes("already registered")) {
//           setError(
//             "このメールアドレスは既に登録されています。ログインページをお使いください。",
//           );
//           return;
//         }
//         setError(supabaseError.message);
//         return;
//       }

//       // 確認メール送信完了ページにリダイレクト
//       router.push("/verify-email");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("予期しないエラーが発生しました。再度お試しください。");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">新規登録</CardTitle>
//           <CardDescription>
//             メールアドレスを入力し、アカウントを作成してください
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* メール認証フォーム */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">メールアドレス</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//                 autoComplete="email"
//               />
//             </div>

//             {/* エラーメッセージ */}
//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "送信中..." : "確認メールを送信"}
//             </Button>
//           </form>

//           {/* 区切り */}
//           <div className="flex items-center gap-4">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-sm text-gray-500">または</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>

//           {/* OAuth認証 */}
//           <OAuthButtons />

//           {/* ログインページへのリンク */}
//           <p className="text-center text-sm text-gray-500">
//             既にアカウントがありますか？{" "}
//             <a href="/login" className="text-blue-600 hover:underline">
//               ログイン
//             </a>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // 仮パスワード生成（メール確認後にset-passwordで上書き）
// function generateTemporaryPassword(): string {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let password = "";
//   for (let i = 0; i < 24; i++) {
//     password += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return password;
// }

// // ベースURL取得
// function getBaseUrl(): string {
//   if (typeof window !== "undefined") {
//     return window.location.origin;
//   }
//   return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// }

// src/components/auth/SignupForm.tsx
// サインアップフォーム - レスポンシブ・ダークモード対応

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signupSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import OAuthButtons from "./OAuthButtons";
import {
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  UserPlus,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // バリデーション
      const result = signupSchema.safeParse({ email });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // Supabaseで確認メールを送信
      const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password: generateTemporaryPassword(),
        options: {
          emailRedirectTo: `${getBaseUrl()}/set-password`,
        },
      });

      if (supabaseError) {
        if (supabaseError.message.includes("already registered")) {
          setError(
            "このメールアドレスは既に登録されています。ログインページをお使いください。",
          );
          return;
        }
        setError(supabaseError.message);
        return;
      }

      // 確認メール送信完了ページにリダイレクト
      router.push("/verify-email");
    } catch (err) {
      console.error("Signup error:", err);
      setError("予期しないエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <Card className="border-2 border-border shadow-2xl">
        <CardHeader className="text-center space-y-3 pb-6 bg-linear-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-linear-to-br from-primary to-purple-600 rounded-2xl shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              新規登録
            </span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            メールアドレスを入力してアカウントを作成
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* メール認証フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* メールアドレス */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-muted-foreground" />
                メールアドレス
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  className="pl-10 h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* 注意事項 */}
            <div className="flex items-start gap-2 p-3 sm:p-4 bg-primary/5 dark:bg-primary/10 border-2 border-primary/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-foreground">
                入力したメールアドレスに確認メールを送信します。メール内のリンクからパスワードを設定してください。
              </p>
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* 送信ボタン */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  送信中...
                </>
              ) : (
                <>
                  確認メールを送信
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* 区切り */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground px-2">または</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* OAuth認証 */}
          <OAuthButtons />

          {/* ログインページへのリンク */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              既にアカウントをお持ちの方は{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
              >
                ログイン
                <Sparkles className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ホームへ戻るリンク */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}

// 仮パスワード生成
function generateTemporaryPassword(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 24; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ベースURL取得
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
