// src/lib/supabase/server.ts
// サーバー用 Supabase クライアント（Server Components / Route Handlers / Server Actions）

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
                path: "/",
                maxAge: options?.maxAge ?? 60 * 60 * 24 * 7, // 7日
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                // クライアントで getSession() するため JS から読めるようにする
                httpOnly: false,
              });
            });
          } catch {
            // Server Component 内で set するとエラーになることがある（ミドルウェアで更新される）
          }
        },
      },
    },
  );
}
