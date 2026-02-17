// src/lib/supabase/client.ts
// ブラウザ（クライアントコンポーネント）で使用するSupabaseクライアント

// import { createBrowserClient } from "@supabase/ssr";

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );
// }

// src/lib/supabase/client.ts
// クライアントサイドSupabaseクライアント
// PKCEのcode_verifierをCookieに保存するための設定

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // PKCEのcode_verifierをCookieに保存
        // これによりスマホでのクロスデバイス問題を解決
        flowType: "pkce",
        storage: {
          // localStorageの代わりにCookieを使用
          getItem: (key: string) => {
            if (typeof document === "undefined") return null;
            const cookies = document.cookie.split("; ");
            const cookie = cookies.find((c) => c.startsWith(`${key}=`));
            return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
          },
          setItem: (key: string, value: string) => {
            if (typeof document === "undefined") return;
            const maxAge = 60 * 60; // 1時間
            document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; ${
              window.location.protocol === "https:" ? "Secure;" : ""
            }`;
          },
          removeItem: (key: string) => {
            if (typeof document === "undefined") return;
            document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax;`;
          },
        },
      },
    },
  );
}
