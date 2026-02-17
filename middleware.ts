// src/middleware.ts
// PKCE対応 - code_verifierをCookieに保存するために必須

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // リクエストのCookieを更新
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // レスポンスを再生成
          supabaseResponse = NextResponse.next({ request });
          // レスポンスのCookieを更新（PKCE code_verifierをここに保存）
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              sameSite: "lax", // モバイル対応
              secure: process.env.NODE_ENV === "production",
              httpOnly: true,
              path: "/",
            }),
          );
        },
      },
    },
  );

  // 重要: getUser()を呼ぶことでセッションとCookieを更新
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
