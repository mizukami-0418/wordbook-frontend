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
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next"); // redirect_to

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // redirect_to があればそれを優先（OAuth用）
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      // デフォルト（Email confirm用）
      return NextResponse.redirect(`${origin}/set-password`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
