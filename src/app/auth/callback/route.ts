// src/app/auth/callback/route.ts
// OAuth/Email認証後のコールバック処理

// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next");

//   console.log("🔄 Auth callback triggered");
//   console.log("📍 Origin:", origin);
//   console.log("🔑 Code:", code ? "present" : "missing");
//   console.log("➡️  Next param:", next);

//   if (code) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       // ユーザー情報を取得
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       console.log("👤 User authenticated");
//       console.log("🔐 Provider:", user?.app_metadata?.provider);
//       console.log("📧 Email:", user?.email);

//       // Google OAuth認証の場合
//       if (user?.app_metadata?.provider === "google") {
//         console.log("🔵 Google OAuth detected");

//         try {
//           // DRF APIでプロフィールチェック
//           const session = await supabase.auth.getSession();
//           const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//           const response = await fetch(`${apiUrl}/accounts/profile/`, {
//             headers: {
//               Authorization: `Bearer ${session.data.session?.access_token}`,
//             },
//           });

//           console.log("📊 Profile check status:", response.status);

//           if (response.ok) {
//             const profile = await response.json();
//             console.log("✅ Profile exists:", !!profile.username);

//             if (profile.username) {
//               // プロフィール完成済み → ダッシュボードへ
//               console.log("➡️  Redirecting to: /dashboard");
//               return NextResponse.redirect(`${origin}/dashboard`);
//             }
//           }
//         } catch (err) {
//           console.error("❌ Profile check error:", err);
//         }

//         // プロフィール未完成 → complete-profileへ
//         console.log("➡️  Redirecting to: /complete-profile");
//         return NextResponse.redirect(`${origin}/complete-profile`);
//       }

//       // Email認証の場合（パスワード設定が必要）
//       console.log("📧 Email authentication detected");

//       // redirect_to パラメータがあればそれを優先
//       if (next) {
//         const isRelativePath = next.startsWith("/") && !next.startsWith("//");
//         if (isRelativePath) {
//           console.log("➡️  Redirecting to:", next);
//           return NextResponse.redirect(`${origin}${next}`);
//         }
//       }

//       // デフォルト: パスワード設定ページへ
//       console.log("➡️  Redirecting to: /set-password");
//       return NextResponse.redirect(`${origin}/set-password`);
//     }

//     console.error("❌ Auth error:", error);
//   }

//   // エラー時はログインページへ
//   console.log("➡️  Redirecting to: /login (error)");
//   return NextResponse.redirect(`${origin}/login`);
// }

// src/app/auth/callback/route.ts
// OAuth/Email認証後のコールバック処理
// エラーハンドリング強化版

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const error = searchParams.get("error");
  const error_code = searchParams.get("error_code");
  const error_description = searchParams.get("error_description");

  console.log("=== 🔄 Auth Callback Debug ===");
  console.log("📍 Origin:", origin);
  console.log("🔑 Code:", code ? "present" : "missing");
  console.log("➡️  Next:", next);
  console.log("❌ Error:", error);
  console.log("🔢 Error Code:", error_code);
  console.log("📝 Description:", error_description);

  // Supabaseからエラーが返された場合
  if (error) {
    console.error("❌ Supabase returned error:", {
      error,
      error_code,
      error_description,
    });

    // ログインページにエラーメッセージ付きでリダイレクト
    const errorMessage = error_description || error || "認証に失敗しました";
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorMessage)}`,
    );
  }

  // codeが存在しない場合
  if (!code) {
    console.error("❌ No code parameter found");
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("認証コードが見つかりません")}`,
    );
  }

  try {
    const supabase = await createClient();

    console.log("🔄 Exchanging code for session...");
    const { data: sessionData, error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("❌ Session exchange error:", sessionError);

      // セッション無効エラーの場合
      if (
        sessionError.message?.includes("invalid") ||
        sessionError.message?.includes("expired")
      ) {
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent("認証リンクの有効期限が切れています。再度お試しください。")}`,
        );
      }

      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(sessionError.message || "認証に失敗しました")}`,
      );
    }

    console.log("✅ Session created successfully");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("❌ No user found after session creation");
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent("ユーザー情報の取得に失敗しました")}`,
      );
    }

    console.log("👤 User Info:");
    console.log("   ID:", user.id);
    console.log("   Email:", user.email);
    console.log("   Provider:", user.app_metadata?.provider);
    console.log("   Email Confirmed:", user.email_confirmed_at ? "✓" : "✗");

    // Google OAuth認証の場合
    if (user.app_metadata?.provider === "google") {
      console.log("🔵 Google OAuth detected");

      try {
        const session = await supabase.auth.getSession();
        // 環境変数に /api まで含めることを推奨
        // 例: NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
        const apiUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
        const profileUrl = `${apiUrl}/accounts/profile/`;

        console.log("📡 Checking profile at:", profileUrl);
        console.log(
          "🔑 Access token:",
          session.data.session?.access_token ? "present" : "missing",
        );

        const response = await fetch(profileUrl, {
          headers: {
            Authorization: `Bearer ${session.data.session?.access_token}`,
          },
        });

        console.log("📊 Profile check status:", response.status);
        console.log(
          "📊 Response headers:",
          Object.fromEntries(response.headers.entries()),
        );

        if (response.ok) {
          const profile = await response.json();
          console.log("👤 Profile:", profile);

          if (profile.username) {
            console.log("✅ Username exists:", profile.username);
            console.log("➡️  Redirecting to: /dashboard");
            return NextResponse.redirect(`${origin}/dashboard`);
          }
        } else {
          // エラー詳細をログ
          const errorText = await response.text();
          console.log("❌ Profile check error response:", errorText);

          if (response.status === 404) {
            console.log("ℹ️  Profile not found (expected for new users)");

            // TEMPORARY: 既存のGoogleユーザーの場合、とりあえずdashboardへ
            // （プロフィールが存在するがAPIが404を返す問題の回避策）
            if (user?.email === "ff10mm11yy23tamk@gmail.com") {
              console.log(
                "⚠️  Known user - redirecting to dashboard despite 404",
              );
              return NextResponse.redirect(`${origin}/dashboard`);
            }
          } else if (response.status === 401) {
            console.error("❌ Unauthorized - JWT may be invalid");
          } else if (response.status === 500) {
            console.error("❌ Server error in profile API");
          } else {
            console.warn(
              "⚠️  Unexpected profile check status:",
              response.status,
            );
          }
        }
      } catch (err) {
        console.error("❌ Profile check error:", err);
        if (err instanceof Error) {
          console.error("   Error message:", err.message);
          console.error("   Error stack:", err.stack);
        }
      }

      console.log("➡️  Redirecting to: /complete-profile");
      return NextResponse.redirect(`${origin}/complete-profile`);
    }

    // Email認証の場合
    console.log("📧 Email authentication detected");

    // redirect_to パラメータがあればそれを優先
    if (next) {
      const isRelativePath = next.startsWith("/") && !next.startsWith("//");
      if (isRelativePath) {
        console.log("➡️  Redirecting to:", next);
        return NextResponse.redirect(`${origin}${next}`);
      } else {
        console.warn("⚠️  Invalid redirect path:", next);
      }
    }

    // デフォルト: パスワード設定ページへ
    console.log("➡️  Redirecting to: /set-password");
    return NextResponse.redirect(`${origin}/set-password`);
  } catch (err) {
    console.error("❌ Unexpected error in callback:", err);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("予期しないエラーが発生しました")}`,
    );
  }
}
