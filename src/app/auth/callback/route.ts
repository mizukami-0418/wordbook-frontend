// src/app/auth/callback/route.ts
// OAuth認証後のコールバック処理
// Supabaseが認証成功時にこのURLにリダイレクトする

// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/";

//   if (code) {
//     const supabase = await createClient();

//     // 認証コードをセッションに交換
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       // 認証成功 → ダッシュボードにリダイレクト
//       // (ダッシュボード側でprofileの完了確認を行う)
//       return NextResponse.redirect(`${origin}/dashboard`);
//     }
//   }

//   // 認証に失敗した場合はログインページにリダイレクト
//   return NextResponse.redirect(`${origin}/login`);
// }

// src/app/auth/callback/route.ts
// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next"); // redirect_to

//   if (code) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       // redirect_to があればそれを優先（OAuth用）
//       if (next) {
//         return NextResponse.redirect(`${origin}${next}`);
//       }

//       // デフォルト（Email confirm用）
//       return NextResponse.redirect(`${origin}/set-password`);
//     }
//   }

//   return NextResponse.redirect(`${origin}/login`);
// }

// src/app/auth/callback/route.ts
// OAuth/Email認証後のコールバック処理

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  console.log("🔄 Auth callback triggered");
  console.log("📍 Origin:", origin);
  console.log("🔑 Code:", code ? "present" : "missing");
  console.log("➡️  Next param:", next);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // ユーザー情報を取得
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("👤 User authenticated");
      console.log("🔐 Provider:", user?.app_metadata?.provider);
      console.log("📧 Email:", user?.email);

      // Google OAuth認証の場合
      if (user?.app_metadata?.provider === "google") {
        console.log("🔵 Google OAuth detected");

        try {
          // DRF APIでプロフィールチェック
          const session = await supabase.auth.getSession();
          const apiUrl =
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

          const response = await fetch(`${apiUrl}/api/user/profile/`, {
            headers: {
              Authorization: `Bearer ${session.data.session?.access_token}`,
            },
          });

          console.log("📊 Profile check status:", response.status);

          if (response.ok) {
            const profile = await response.json();
            console.log("✅ Profile exists:", !!profile.username);

            if (profile.username) {
              // プロフィール完成済み → ダッシュボードへ
              console.log("➡️  Redirecting to: /dashboard");
              return NextResponse.redirect(`${origin}/dashboard`);
            }
          }
        } catch (err) {
          console.error("❌ Profile check error:", err);
        }

        // プロフィール未完成 → complete-profileへ
        console.log("➡️  Redirecting to: /complete-profile");
        return NextResponse.redirect(`${origin}/complete-profile`);
      }

      // Email認証の場合（パスワード設定が必要）
      console.log("📧 Email authentication detected");

      // redirect_to パラメータがあればそれを優先
      if (next) {
        const isRelativePath = next.startsWith("/") && !next.startsWith("//");
        if (isRelativePath) {
          console.log("➡️  Redirecting to:", next);
          return NextResponse.redirect(`${origin}${next}`);
        }
      }

      // デフォルト: パスワード設定ページへ
      console.log("➡️  Redirecting to: /set-password");
      return NextResponse.redirect(`${origin}/set-password`);
    }

    console.error("❌ Auth error:", error);
  }

  // エラー時はログインページへ
  console.log("➡️  Redirecting to: /login (error)");
  return NextResponse.redirect(`${origin}/login`);
}
