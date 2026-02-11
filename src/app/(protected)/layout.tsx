// src/app/(protected)/layout.tsx
// 保護ページ共通レイアウト
// 認証チェック + プロフィール完了チェック

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProtectedLayout from "@/components/auth/ProtectedLayout";

export default async function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
}
