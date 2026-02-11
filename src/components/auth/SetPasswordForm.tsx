// src/components/auth/SetPasswordForm.tsx
// パスワード設定フォーム: メール確認リンクからの初期パスワード設定

// "use client";

// import { useState, type FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { setPasswordSchema } from "@/lib/validations";
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

// export default function SetPasswordForm() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
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
//       const result = setPasswordSchema.safeParse({ password, confirmPassword });
//       if (!result.success) {
//         setError(result.error.issues[0].message);
//         return;
//       }

//       // 現在のセッション確認
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (!user) {
//         setError(
//           "セッションが無効です。メールのリンクを再度クリックしてください。",
//         );
//         return;
//       }

//       // パスワード更新
//       const { error: supabaseError } = await supabase.auth.updateUser({
//         password,
//       });

//       if (supabaseError) {
//         setError(supabaseError.message);
//         return;
//       }

//       // パスワード設定完了 → username設定ページにリダイレクト
//       // (username設定が必要か確認してからダッシュボードまたはプロフィール設定に遷移)
//       router.push("/dashboard");
//     } catch {
//       setError("予期しないエラーが発生しました。再度お試しください。");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">パスワード設定</CardTitle>
//           <CardDescription>
//             アカウントのパスワードを設定してください
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="password">パスワード</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 autoComplete="new-password"
//               />
//               <p className="text-xs text-gray-500">
//                 8文字以上、大文字・小文字・数字を含む必要があります
//               </p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">パスワード（確認）</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="••••••••"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 disabled={loading}
//                 autoComplete="new-password"
//               />
//             </div>

//             {/* エラーメッセージ */}
//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "設定中..." : "パスワードを設定"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src/components/auth/SetPasswordForm.tsx
// パスワード設定フォーム - レスポンシブ・ダークモード対応

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { setPasswordSchema } from "@/lib/validations";
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
import {
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // パスワード強度チェック
  const passwordStrength = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // バリデーション
      const result = setPasswordSchema.safeParse({ password, confirmPassword });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // 現在のセッション確認
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError(
          "セッションが無効です。メールのリンクを再度クリックしてください。",
        );
        return;
      }

      // パスワード更新
      const { error: supabaseError } = await supabase.auth.updateUser({
        password,
      });

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      // パスワード設定完了 → ダッシュボードにリダイレクト
      router.push("/dashboard");
    } catch {
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
              <KeyRound className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              パスワード設定
            </span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            アカウントのパスワードを設定してください
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* パスワード */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                パスワード
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pl-10 pr-10 h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* パスワード強度インジケーター */}
              {password && (
                <div className="space-y-2 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground">
                    パスワード要件:
                  </p>
                  <div className="space-y-1">
                    <PasswordRequirement
                      met={passwordStrength.hasMinLength}
                      text="8文字以上"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasUpperCase}
                      text="大文字を含む"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasLowerCase}
                      text="小文字を含む"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasNumber}
                      text="数字を含む"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* パスワード（確認） */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                パスワード（確認）
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pl-10 pr-10 h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* 設定ボタン */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              disabled={
                loading || !isPasswordValid || password !== confirmPassword
              }
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  設定中...
                </>
              ) : (
                <>
                  パスワードを設定
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// パスワード要件コンポーネント
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
      )}
      <span
        className={`text-xs ${met ? "text-green-600 dark:text-green-400 font-medium" : "text-muted-foreground"}`}
      >
        {text}
      </span>
    </div>
  );
}
