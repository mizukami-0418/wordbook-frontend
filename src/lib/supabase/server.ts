// src/lib/supabase/server.ts
// サーバーサイドSupabaseクライアント（モバイル対応）

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                // モバイルブラウザ対応の設定
                sameSite: "lax", // 'strict'より緩く、モバイルで動作しやすい
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7日間
              });
            });
          } catch (error) {
            // Server Componentからsetを呼ぶとエラーになる場合がある
            // その場合はミドルウェアで処理される
            console.error(
              "Cookie set error (expected in some contexts):",
              error,
            );
          }
        },
      },
    },
  );
}
