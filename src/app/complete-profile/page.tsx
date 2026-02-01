// src/app/complete-profile/page.tsx
// 初回登録後のusername設定ページ
// ProtectedLayoutからのリダイレクト先

"use client";

import { useAuth } from "@/hooks/useAuth";
import CompleteProfileForm from "@/components/auth/CompleteProfileForm";

export default function CompleteProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <CompleteProfileForm email={user.email ?? ""} />
    </div>
  );
}
