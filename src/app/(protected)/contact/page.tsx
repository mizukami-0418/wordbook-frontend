// src/app/(protected)/contact/page.tsx
// お問い合わせフォームページ - レスポンシブ・ダークモード対応

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { createInquiry } from "@/lib/api/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  Send,
  AlertCircle,
  Info,
  History,
} from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !context.trim()) {
      setError("すべての項目を入力してください");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createInquiry({
        subject: subject.trim(),
        context: context.trim(),
      });

      router.push("/contact/success");
    } catch (err: unknown) {
      if (
        isAxiosError<{
          subject?: string[];
          context?: string[];
          detail?: string;
        }>(err)
      ) {
        const apiError = err.response?.data;
        if (apiError?.subject) {
          setError(apiError.subject[0]);
        } else if (apiError?.context) {
          setError(apiError.context[0]);
        } else {
          setError(
            err.response?.data?.detail || "お問い合わせの送信に失敗しました",
          );
        }
      } else {
        setError("お問い合わせの送信に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12">
          <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            お問い合わせ
          </span>
        </h1>

        <Card className="shadow-2xl border-2 border-border">
          <CardHeader className="bg-linear-to-r from-primary to-purple-600 text-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
                お問い合わせフォーム
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              ご不明な点やご要望がございましたら、お気軽にお問い合わせください。
              内容を確認の上、順次ご対応させていただきます。
            </p>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-destructive/10 dark:bg-destructive/20 border-2 border-destructive/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 件名 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  件名 <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="例: ログインできない"
                  disabled={loading}
                  maxLength={50}
                  className="h-11 sm:h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground">
                  3〜50文字で入力してください（
                  <span className="font-semibold text-foreground">
                    {subject.length}
                  </span>
                  /50）
                </p>
              </div>

              {/* お問い合わせ内容 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  お問い合わせ内容 <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                  disabled={loading}
                  maxLength={500}
                  rows={8}
                  className="w-full p-4 border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  10〜500文字で入力してください（
                  <span className="font-semibold text-foreground">
                    {context.length}
                  </span>
                  /500）
                </p>
              </div>

              {/* 送信ボタン */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={loading || !subject.trim() || !context.trim()}
                  className="flex-1 h-12 sm:h-14 text-base sm:text-lg bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <>送信中...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/contact/history")}
                  variant="outline"
                  className="h-12 sm:h-14 text-base sm:text-lg border-2"
                >
                  <History className="w-5 h-5 mr-2" />
                  履歴を見る
                </Button>
              </div>
            </form>

            {/* 注意事項 */}
            <div className="p-4 sm:p-5 bg-primary/5 dark:bg-primary/10 rounded-lg border-2 border-primary/20">
              <div className="flex items-start gap-2 mb-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  ご注意
                </h3>
              </div>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 ml-7">
                <li>• お問い合わせ内容は管理者が確認いたします</li>
                <li>• 送信後、確認メールが自動送信されます</li>
                <li>• 返信までに数日かかる場合がございます</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
