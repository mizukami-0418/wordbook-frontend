// src/middleware.ts
// モバイルブラウザ対応のSupabase認証ミドルウェア

// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             request.cookies.set(name, value);
//             response.cookies.set(name, value, {
//               ...options,
//               // モバイルブラウザ対応の重要な設定
//               sameSite: "lax", // laxに設定（スマホで動作しやすい）
//               secure: process.env.NODE_ENV === "production", // 本番ではHTTPSのみ
//               httpOnly: true, // XSS対策
//               path: "/", // すべてのパスで有効
//               maxAge: 60 * 60 * 24 * 7, // 7日間
//             });
//           });
//         },
//       },
//     },
//   );

//   // セッション更新を試みる（重要: これがないとセッションが失われる）
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // デバッグログ（開発時のみ）
//   if (process.env.NODE_ENV === "development") {
//     console.log("🔒 Middleware - Path:", request.nextUrl.pathname);
//     console.log("🔒 Middleware - Has session:", !!session);
//     console.log(
//       "🔒 Middleware - User Agent:",
//       request.headers.get("user-agent")?.substring(0, 50),
//     );
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// src/lib/supabase/middleware.ts
// ミドルウェア専用のSupabaseヘルパー（Next.js 15対応）

// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value),
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, {
//               ...options,
//               // モバイルブラウザ対応の設定
//               sameSite: "lax",
//               secure: process.env.NODE_ENV === "production",
//               httpOnly: true,
//               path: "/",
//               maxAge: 60 * 60 * 24 * 7, // 7日間
//             }),
//           );
//         },
//       },
//     },
//   );

//   // セッション更新を試みる
//   // これを呼ばないとセッションが失われる可能性がある
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // デバッグログ（開発時のみ）
//   if (process.env.NODE_ENV === "development") {
//     console.log("🔒 Middleware - Path:", request.nextUrl.pathname);
//     console.log("🔒 Middleware - Has user:", !!user);
//   }

//   return supabaseResponse;
// }

// src/middleware.ts
// Next.js 15 Turbopack対応 - 最小限のミドルウェア

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 何もせずに次へ進む（ビルドエラー回避）
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
