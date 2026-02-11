// src/app/debug-token/page.tsx
// トークン表示用の一時デバッグページ

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugTokenPage() {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getToken() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setToken(session?.access_token || null);
    }
    getToken();
  }, [supabase]);

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Supabase Access Token デバッグ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {token ? (
            <>
              <div className="bg-gray-100 p-4 rounded border overflow-auto">
                <code className="text-xs break-all">{token}</code>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToken}>
                  {copied ? "コピーしました！" : "トークンをコピー"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://jwt.io/#debugger-io?token=${token}`,
                      "_blank",
                    )
                  }
                >
                  JWT.io で確認
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                <p>このトークンを使ってDjangoでデバッグしてください：</p>
                <code className="block mt-2 bg-gray-100 p-2 rounded">
                  python manage.py debug_jwt "{token.substring(0, 50)}..."
                </code>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              ログインしていないか、セッションが存在しません。
              <a href="/login" className="text-blue-600 hover:underline ml-1">
                ログインページへ
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
