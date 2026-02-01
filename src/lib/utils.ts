import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isAxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * エラーからメッセージを安全に取得する
 *
 * @param error - catch で受け取ったエラー（unknown）
 * @param fallback - エラーメッセージが取得できない場合のデフォルト文字列
 * @returns エラーメッセージ文字列
 */
export function getErrorMessage(
  error: unknown,
  fallback: string = "エラーが発生しました",
): string {
  // Axiosエラーレスポンス（DRF APIエラー）
  if (isAxiosError(error) && error.response?.data?.detail) {
    return error.response.data.detail;
  }

  // Errorオブジェクト
  if (error instanceof Error) {
    return error.message || fallback;
  }

  // 文字列のエラー
  if (typeof error === "string") {
    return error || fallback;
  }

  return fallback;
}
