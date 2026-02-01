// src/lib/api/user.ts
// ユーザー関連のAPI呼び出し関数

import apiClient from "./client";
import type { User, UserDetail, ProfileCompletionStatus } from "@/types/user";

/**
 * 現在のユーザープロフィールを取得
 */
export async function getUserProfile(): Promise<User> {
  const response = await apiClient.get<User>("/accounts/profile/");
  return response.data;
}

/**
 * ユーザープロフィールを更新（usernameのみ）
 */
export async function updateUserProfile(username: string): Promise<User> {
  const response = await apiClient.patch<User>("/accounts/profile/", {
    username,
  });
  return response.data;
}

/**
 * ユーザー詳細情報と学習統計を取得
 */
export async function getUserDetail(): Promise<UserDetail> {
  const response = await apiClient.get<UserDetail>("/accounts/detail/");
  return response.data;
}

/**
 * 初回登録時のusername設定
 */
export async function completeProfile(username: string): Promise<{
  message: string;
  user: User;
}> {
  const response = await apiClient.post<{ message: string; user: User }>(
    "/accounts/complete-profile/",
    { username },
  );
  return response.data;
}

/**
 * プロフィール設定状態を確認
 */
export async function checkProfileCompletion(): Promise<ProfileCompletionStatus> {
  const response = await apiClient.get<ProfileCompletionStatus>(
    "/accounts/check-profile/",
  );
  return response.data;
}
