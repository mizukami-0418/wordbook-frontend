// app/layout.tsx
import "@/app/globals.css";
// import Header from "@/components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {/* <Header /> */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
