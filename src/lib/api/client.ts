// src/lib/api/client.ts
// DRF APIクライアント: Supabase JWTを自動的にヘッダーに付与

import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { createClient } from "@/lib/supabase/client";

// リトライ済みフラグ用の型拡張
interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

// レスポンスインターセプター: エラーハンドリング + 401時のトークンリフレッシュとリトライ
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // 認証エラー: トークンリフレッシュを試行してリトライ
      originalRequest._retry = true;

      const supabase = createClient();
      const { data: { session }, error: refreshError } =
        await supabase.auth.refreshSession();

      if (!refreshError && session?.access_token) {
        // リフレッシュ成功: 新しいトークンでリクエストを再実行
        originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
        return apiClient(originalRequest);
      }

      // リフレッシュ失敗: セッション切れ
      if (typeof window !== "undefined") {
        console.error("認証エラー: セッションが切れました。再ログインしてください。");
      }
    } else if (error.response) {
      const status = error.response.status;

      if (status === 403) {
        console.error("権限エラー: アクセスが拒否されました");
      } else if (status >= 500) {
        console.error("サーバーエラーが発生しました");
      }
    } else if (error.request) {
      console.error("ネットワークエラー: サーバーに接続できません");
    } else {
      console.error("エラー:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
