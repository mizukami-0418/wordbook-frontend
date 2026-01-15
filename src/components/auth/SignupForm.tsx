// components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 ここで後ほど Supabase にメール送信処理を追加
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center text-sm space-y-3">
        <p className="font-medium">メールを送信しました 📩</p>
        <p className="text-muted-foreground">
          届いたメールから
          <br />
          パスワード設定を行ってください
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        登録用メールを送信
      </Button>
    </form>
  );
}
