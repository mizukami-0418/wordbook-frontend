// src/app/(auth)/signup/page.tsx
// サインアップページ - レスポンシブ・ダークモード対応

import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <>
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative w-full max-w-md py-6">

        {/* サインアップフォーム */}
        <SignupForm />
      </div>
    </>
  );
}
