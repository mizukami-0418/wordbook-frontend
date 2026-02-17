// src/components/auth/OAuthButtons.tsx
// OAuth認証ボタン: Google, X

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function OAuthButtons() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleOAuth = async (provider: "google" | "twitter") => {
    setLoading(provider);
    setError(null);

    // try {
    //   const { error: supabaseError } = await supabase.auth.signInWithOAuth({
    //     provider,
    //     options: {
    //       redirectTo: `${getBaseUrl()}/auth/callback`,
    //     },
    //   });
    try {
      const { error: supabaseError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${getBaseUrl()}/auth/callback`,
          // PKCEフローをスキップ（スマホ対応）
          // code_verifierをlocalStorageではなくCookieで管理
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          skipBrowserRedirect: false,
        },
      });

      if (supabaseError) {
        setError(supabaseError.message);
      }
      // 成功時はSupabaseが自動的にリダイレクトする
    } catch {
      setError("OAuth認証に失敗しました。再度お試しください。");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Google */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => handleOAuth("google")}
        disabled={loading !== null}
      >
        <GoogleIcon />
        <span>{loading === "google" ? "認証中..." : "Googleで続行"}</span>
      </Button>

      {/* X (Twitter) */}
      {/* <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => handleOAuth("twitter")}
        disabled={loading !== null}
      >
        <XIcon />
        <span>{loading === "twitter" ? "認証中..." : "Xで続行"}</span>
      </Button> */}
    </div>
  );
}

// ベースURL取得
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

// Google アイコン
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// X (Twitter) アイコン
// function XIcon() {
//   return (
//     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//     </svg>
//   );
// }
