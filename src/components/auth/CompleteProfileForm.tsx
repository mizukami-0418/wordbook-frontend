// src/components/auth/CompleteProfileForm.tsx
// プロフィール完成フォーム: 初回登録時のusername設定

// "use client";

// import { useState, type FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { completeProfile } from "@/lib/api/user";
// import { completeProfileSchema } from "@/lib/validations";
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

// export default function CompleteProfileForm({ email }: { email: string }) {
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       // バリデーション
//       const result = completeProfileSchema.safeParse({ username });
//       if (!result.success) {
//         setError(result.error.issues[0].message);
//         return;
//       }

//       // DRF APIでプロフィール設定
//       await completeProfile(username);

//       // 設定完了 → ダッシュボードにリダイレクト
//       router.push("/dashboard");
//     } catch (err: unknown) {
//       // DRF APIのエラーレスポンス
//       if (axios.isAxiosError<{ error?: string; username?: string[] }>(err)) {
//         const apiError = err.response?.data;
//         if (apiError?.error) {
//           setError(apiError.error);
//         } else if (apiError?.username) {
//           setError(apiError.username[0]);
//         } else {
//           setError("プロフィール設定に失敗しました。再度お試しください。");
//         }
//       } else {
//         setError("プロフィール設定に失敗しました。再度お試しください。");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">プロフィール設定</CardTitle>
//           <CardDescription>ユーザー名を設定してください</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* メールアドレス（読み取り専用） */}
//             <div className="space-y-2">
//               <Label>メールアドレス</Label>
//               <Input
//                 type="email"
//                 value={email}
//                 disabled
//                 className="bg-gray-50 text-gray-500"
//               />
//             </div>

//             {/* ユーザー名入力 */}
//             <div className="space-y-2">
//               <Label htmlFor="username">ユーザー名</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="your_username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={loading}
//                 autoComplete="off"
//               />
//               <p className="text-xs text-gray-500">
//                 英数字、アンダースコア（_）、ハイフン（-）のみ使用可能。2〜50文字。
//               </p>
//             </div>

//             {/* エラーメッセージ */}
//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "設定中..." : "プロフィールを設定"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src/components/auth/CompleteProfileForm.tsx
// プロフィール完成フォーム - レスポンシブ・ダークモード対応
// 初回登録時のusername設定

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { completeProfile } from "@/lib/api/user";
import { completeProfileSchema } from "@/lib/validations";
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
  UserPlus,
  Mail,
  User,
  AlertCircle,
  Info,
  ArrowRight,
} from "lucide-react";

export default function CompleteProfileForm({ email }: { email: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // バリデーション
      const result = completeProfileSchema.safeParse({ username });
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      // DRF APIでプロフィール設定
      await completeProfile(username);

      // 設定完了 → ダッシュボードにリダイレクト
      router.push("/dashboard");
    } catch (err: unknown) {
      // DRF APIのエラーレスポンス
      if (axios.isAxiosError<{ error?: string; username?: string[] }>(err)) {
        const apiError = err.response?.data;
        if (apiError?.error) {
          setError(apiError.error);
        } else if (apiError?.username) {
          setError(apiError.username[0]);
        } else {
          setError("プロフィール設定に失敗しました。再度お試しください。");
        }
      } else {
        setError("プロフィール設定に失敗しました。再度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="shadow-2xl border-2 border-border">
        <CardHeader className="text-center space-y-3 sm:space-y-4 p-6 sm:p-8 bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              プロフィール設定
            </span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            ユーザー名を設定してください
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* メールアドレス（読み取り専用） */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm sm:text-base font-semibold">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                メールアドレス
              </Label>
              <Input
                type="email"
                value={email}
                disabled
                className="bg-muted/50 dark:bg-muted/30 text-muted-foreground h-11 sm:h-12 border-2"
              />
            </div>

            {/* ユーザー名入力 */}
            <div className="space-y-3">
              <Label
                htmlFor="username"
                className="flex items-center gap-2 text-sm sm:text-base font-semibold"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                ユーザー名
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="off"
                className="h-11 sm:h-12 border-2 focus:border-primary text-base"
              />
              <div className="flex items-start gap-2 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  英数字、アンダースコア（_）、ハイフン（-）のみ使用可能。2〜50文字。
                </p>
              </div>
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
              className="w-full h-12 sm:h-14 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all group"
              disabled={loading || !username.trim()}
            >
              {loading ? (
                "設定中..."
              ) : (
                <>
                  プロフィールを設定
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
