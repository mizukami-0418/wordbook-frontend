// src/hooks/useUser.ts
// DRF APIからユーザー情報を取得するカスタムフック

"use client";

import { useEffect, useState } from "react";
import { getUserProfile, checkProfileCompletion } from "@/lib/api/user";
import type { User, ProfileCompletionStatus } from "@/types/user";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "@/lib/utils";

export function useUser() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [profileStatus, setProfileStatus] =
    useState<ProfileCompletionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // ユーザープロフィールを取得
        const userData = await getUserProfile();
        setUser(userData);

        // プロフィール設定状態を確認
        const status = await checkProfileCompletion();
        setProfileStatus(status);
      } catch (err: unknown) {
        console.error("ユーザー情報の取得に失敗:", err);
        setError(getErrorMessage(err, "ユーザー情報の取得に失敗しました"));
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchUser();
    }
  }, [isAuthenticated, authLoading]);

  const refetch = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const userData = await getUserProfile();
      setUser(userData);
      const status = await checkProfileCompletion();
      setProfileStatus(status);
    } catch (err: unknown) {
      console.error("ユーザー情報の取得に失敗:", err);
      setError(getErrorMessage(err, "ユーザー情報の取得に失敗しました"));
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    profileStatus,
    loading: authLoading || loading,
    error,
    refetch,
    needsUsername: profileStatus?.needs_username ?? false,
  };
}
