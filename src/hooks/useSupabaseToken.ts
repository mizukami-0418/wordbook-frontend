// src/hooks/useSupabaseToken.ts
// Supabaseアクセストークンを取得するカスタムフック

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSupabaseToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getToken() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setToken(session?.access_token ?? null);
      setLoading(false);
    }

    getToken();

    // トークンの変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setToken(session?.access_token ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return { token, loading };
}
