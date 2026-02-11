// src/app/complete-profile/page.tsx
// 初回登録後のusername設定ページ
// ProtectedLayoutからのリダイレクト先

// "use client";

// import { useAuth } from "@/hooks/useAuth";
// import CompleteProfileForm from "@/components/auth/CompleteProfileForm";

// export default function CompleteProfilePage() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500">読み込み中...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <CompleteProfileForm email={user.email ?? ""} />
//     </div>
//   );
// }

// src/app/complete-profile/page.tsx
// 初回登録後のusername設定ページ - レスポンシブ・ダークモード対応
// ProtectedLayoutからのリダイレクト先

"use client";

import { useAuth } from "@/hooks/useAuth";
import CompleteProfileForm from "@/components/auth/CompleteProfileForm";

export default function CompleteProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-muted-foreground text-base sm:text-lg">
          読み込み中...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 flex items-center justify-center px-4 py-8 sm:py-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        <CompleteProfileForm email={user.email ?? ""} />
      </div>
    </div>
  );
}
