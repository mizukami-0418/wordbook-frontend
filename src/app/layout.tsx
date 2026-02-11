// app/layout.tsx
import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Kiwi_Maru, Kosugi_Maru } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header";

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-m-plus-rounded-1c",
});

const kiwiMaru = Kiwi_Maru({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-kiwi-maru",
});

const kosugiMaru = Kosugi_Maru({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kosugi-maru",
});

export const metadata: Metadata = {
  title: "ことばポケット - 英単語学習アプリ",
  description: "シンプルで使いやすい英単語学習アプリケーションです。",
  keywords: [
    "英単語",
    "単語帳",
    "語彙学習",
    "言語学習",
    "教育",
    "学習アプリ",
    "ことばポケット",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`
          ${mPlusRounded.variable}
          ${kiwiMaru.variable}
          ${kosugiMaru.variable}
          antialiased
          bg-background
          text-foreground`}
      >
        {/* <Header /> */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
