// src/lib/supabase/client.ts
// ブラウザ用 Supabase クライアント（公式 SSR パターン + PKCE を Cookie で保存）

import { createBrowserClient } from "@supabase/ssr";

/**
 * PKCE の code_verifier を Cookie に保存するストレージ。
 * OAuth コールバックがサーバーで実行されるため、サーバーから読めるよう Cookie を使用する。
 */
function createCookieStorage() {
  const maxAge = 60 * 60; // 1時間

  return {
    getItem: (key: string): string | null => {
      if (typeof document === "undefined") return null;
      const cookies = document.cookie.split("; ");
      const item = cookies.find((c) => c.startsWith(`${key}=`));
      if (!item) return null;
      const value = item.slice(key.length + 1).trim();
      return value ? decodeURIComponent(value) : null;
    },
    setItem: (key: string, value: string): void => {
      if (typeof document === "undefined") return;
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
    },
    removeItem: (key: string): void => {
      if (typeof document === "undefined") return;
      document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax`;
    },
  };
}

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (browserClient) return browserClient;

  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: "pkce",
        storage: createCookieStorage(),
      },
    },
  );

  return browserClient;
}
