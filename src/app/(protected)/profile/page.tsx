// src/app/(protected)/profile/page.tsx

// "use client";

// import { useState, type FormEvent } from "react";
// import { useUser } from "@/hooks/useUser";
// import { updateUserProfile } from "@/lib/api/user";
// import { updateProfileSchema } from "@/lib/validations";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";

// export default function ProfilePage() {
//   const { user, loading, error, refetch } = useUser();
//   const [username, setUsername] = useState(user?.username ?? "");
//   const [updateError, setUpdateError] = useState<string | null>(null);
//   const [updating, setUpdating] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // userが取得されたら初期値をセット
//   // if (user && username === "") {
//   //   setUsername(user.username);
//   // }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setUpdateError(null);
//     setSuccessMessage(null);
//     setUpdating(true);

//     try {
//       // バリデーション
//       const result = updateProfileSchema.safeParse({ username });
//       if (!result.success) {
//         setUpdateError(result.error.issues[0].message);
//         return;
//       }

//       // DRF APIでプロフィール更新
//       await updateUserProfile(username);

//       setSuccessMessage("プロフィールを更新しました");
//       refetch(); // データを再取得
//     } catch (err: unknown) {
//       if (axios.isAxiosError<{ username?: string[] }>(err)) {
//         const apiError = err.response?.data;
//         if (apiError?.username) {
//           setUpdateError(apiError.username[0]);
//         } else {
//           setUpdateError(
//             "プロフィール更新に失敗しました。再度お試しください。",
//           );
//         }
//       } else {
//         setUpdateError("プロフィール更新に失敗しました。再度お試しください。");
//       }
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-gray-500">読み込み中...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="space-y-6 max-w-lg">
//       <div>
//         <h1 className="text-2xl font-bold">プロフィール</h1>
//         <p className="text-gray-500 mt-1">アカウント情報の編集</p>
//       </div>

//       <div className="bg-white rounded-lg border p-6">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* メールアドレス（読み取り専用） */}
//           <div className="space-y-2">
//             <Label>メールアドレス</Label>
//             <Input
//               type="email"
//               value={user?.email ?? ""}
//               disabled
//               className="bg-gray-50 text-gray-500"
//             />
//             <p className="text-xs text-gray-400">
//               メールアドレスの変更は現在対応していません
//             </p>
//           </div>

//           {/* ユーザー名 */}
//           <div className="space-y-2">
//             <Label htmlFor="username">ユーザー名：{user?.username}</Label>
//             <Input
//               id="username"
//               placeholder="更新するならこちらに入力"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               disabled={updating}
//             />
//           </div>

//           {/* エラーメッセージ */}
//           {updateError && <p className="text-sm text-red-500">{updateError}</p>}

//           {/* 成功メッセージ */}
//           {successMessage && (
//             <p className="text-sm text-green-600">{successMessage}</p>
//           )}

//           <Button type="submit" disabled={updating}>
//             {updating ? "更新中..." : "更新"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/app/(protected)/profile/page.tsx
// プロフィールページ - レスポンシブ・ダークモード対応

"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useUser } from "@/hooks/useUser";
import { updateUserProfile } from "@/lib/api/user";
import { updateProfileSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, CheckCircle, AlertCircle, Info } from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  const { user, loading, error, refetch } = useUser();
  const [username, setUsername] = useState("");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // userが取得されたら初期値をセット
  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setSuccessMessage(null);
    setUpdating(true);

    try {
      // バリデーション
      const result = updateProfileSchema.safeParse({ username });
      if (!result.success) {
        setUpdateError(result.error.issues[0].message);
        return;
      }

      // DRF APIでプロフィール更新
      await updateUserProfile(username);

      setSuccessMessage("プロフィールを更新しました");
      refetch(); // データを再取得
    } catch (err: unknown) {
      if (axios.isAxiosError<{ username?: string[] }>(err)) {
        const apiError = err.response?.data;
        if (apiError?.username) {
          setUpdateError(apiError.username[0]);
        } else {
          setUpdateError(
            "プロフィール更新に失敗しました。再度お試しください。",
          );
        }
      } else {
        setUpdateError("プロフィール更新に失敗しました。再度お試しください。");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        {/* ヘッダー */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            プロフィール
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            アカウント情報の編集
          </p>
        </div>

        {/* メインカード */}
        <Card className="shadow-xl border-2 border-border">
          <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
            <CardTitle className="text-lg sm:text-xl">アカウント情報</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* メールアドレス（読み取り専用） */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm sm:text-base">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  メールアドレス
                </Label>
                <Input
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="bg-muted/50 dark:bg-muted/30 text-muted-foreground h-11 sm:h-12 border-2"
                />
                <div className="flex items-start gap-2 p-3 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border">
                  <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    メールアドレスの変更は現在対応していません
                  </p>
                </div>
              </div>

              {/* ユーザー名 */}
              <div className="space-y-3">
                <Label
                  htmlFor="username"
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  ユーザー名
                </Label>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    現在:{" "}
                    <span className="font-semibold text-foreground">
                      {user?.username}
                    </span>
                  </p>
                  <Input
                    id="username"
                    placeholder="新しいユーザー名を入力"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={updating}
                    className="h-11 sm:h-12 border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* エラーメッセージ */}
              {updateError && (
                <div className="flex items-start gap-2 p-3 sm:p-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{updateError}</p>
                </div>
              )}

              {/* 成功メッセージ */}
              {successMessage && (
                <div className="flex items-start gap-2 p-3 sm:p-4 bg-green-500/10 dark:bg-green-500/20 border-2 border-green-500/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {successMessage}
                  </p>
                </div>
              )}

              {/* 更新ボタン */}
              <Button
                type="submit"
                disabled={updating || username === user?.username}
                className="w-full h-12 sm:h-14 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 disabled:opacity-50"
              >
                {updating ? "更新中..." : "更新"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 追加情報カード */}
        <Card className="border-2 border-border">
          <CardHeader className="bg-linear-to-r from-muted/30 to-muted/20 border-b border-border">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              アカウントについて
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  メール認証済み
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  アカウントは正常に認証されています
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  ユーザー名の変更
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  ユーザー名はいつでも変更できます
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
