// src/lib/supabase/client.ts
// ブラウザ（クライアントコンポーネント）で使用するSupabaseクライアント

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// src/lib/supabase/client.ts
// クライアントサイドSupabaseクライアント（モバイル対応）

// import { createBrowserClient } from "@supabase/ssr";

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       // Cookie設定（モバイル対応）
//       cookieOptions: {
//         name: "sb",
//         lifetime: 60 * 60 * 24 * 7, // 7日間
//         domain: undefined, // 自動検出
//         path: "/",
//         sameSite: "lax", // モバイル対応
//       },
//     },
//   );
// }
