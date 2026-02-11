// src/lib/api/client.ts
// DRF APIクライアント: Supabase JWTを自動的にヘッダーに付与

import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { createClient } from "@/lib/supabase/client";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Axiosインスタンスを作成
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS対応
});

// リクエストインターセプター: Supabase JWTを自動付与
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const supabase = createClient();

    // 現在のセッションからアクセストークンを取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("Current Supabase session:", session);

    if (session?.access_token) {
      // AuthorizationヘッダーにSupabase JWTを設定
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター: エラーハンドリング
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      // サーバーからのエラーレスポンス
      const status = error.response.status;

      if (status === 401) {
        // 認証エラー: セッションが切れている可能性
        console.error("認証エラー: ログインが必要です");

        // オプション: 自動的にログインページにリダイレクト
        // if (typeof window !== 'undefined') {
        //   window.location.href = '/login'
        // }
      } else if (status === 403) {
        // 権限エラー
        console.error("権限エラー: アクセスが拒否されました");
      } else if (status >= 500) {
        // サーバーエラー
        console.error("サーバーエラーが発生しました");
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error("ネットワークエラー: サーバーに接続できません");
    } else {
      // その他のエラー
      console.error("エラー:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
