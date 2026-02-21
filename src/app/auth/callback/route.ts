// src/app/auth/callback/route.ts
// OAuth / メール認証後のコールバック（公式: code をセッションに交換してリダイレクト）

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const isDev = process.env.NODE_ENV === "development";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  if (error) {
    const message = error_description || error || "認証に失敗しました";
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`,
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("認証コードが見つかりません")}`,
    );
  }

  try {
    const supabase = await createClient();
    const { error: sessionError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      if (
        sessionError.message?.includes("invalid") ||
        sessionError.message?.includes("expired")
      ) {
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent("認証リンクの有効期限が切れています。再度お試しください。")}`,
        );
      }
      if (isDev) console.error("[auth/callback] session error:", sessionError.message);
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(sessionError.message || "認証に失敗しました")}`,
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent("ユーザー情報の取得に失敗しました")}`,
      );
    }

    // Google OAuth: Django プロフィールを確認してリダイレクト先を決定
    if (user.app_metadata?.provider === "google") {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

      try {
        const { data: session } = await supabase.auth.getSession();
        const res = await fetch(`${apiUrl}/accounts/profile/`, {
          headers: {
            Authorization: `Bearer ${session.session?.access_token ?? ""}`,
          },
        });

        if (res.ok) {
          const profile = await res.json();
          if (profile?.username) {
            return NextResponse.redirect(`${origin}/dashboard`);
          }
        }
      } catch {
        // ネットワークエラー等は無視し、complete-profile へ
      }

      return NextResponse.redirect(`${origin}/complete-profile`);
    }

    // メール認証: next があればそこへ、なければ set-password へ
    if (next) {
      const isRelative = next.startsWith("/") && !next.startsWith("//");
      if (isRelative) return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/set-password`);
  } catch (err) {
    if (isDev && err instanceof Error) console.error("[auth/callback]", err.message);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("予期しないエラーが発生しました")}`,
    );
  }
}
