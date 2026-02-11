// src/lib/validations.ts
// Zodバリデーションスキーマ

import { z } from "zod";

// サインアップ（メールアドレス入力）
export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email({ message: "有効なメールアドレスを入力してください" }),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// ログイン
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(1, "パスワードを入力してください"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// パスワード設定
export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "パスワードは8文字以上にしてください")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "パスワードは大文字、小文字、数字を含む必要があります",
      ),
    confirmPassword: z.string().min(1, "パスワード（確認）を入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

// プロフィール完成（username設定）
export const completeProfileSchema = z.object({
  username: z
    .string()
    .min(2, "ユーザー名は2文字以上にしてください")
    .max(50, "ユーザー名は50文字以内にしてください")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "ユーザー名は英数字、アンダースコア、ハイフンのみ使用できます",
    ),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

// プロフィール更新
export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(2, "ユーザー名は2文字以上にしてください")
    .max(50, "ユーザー名は50文字以内にしてください"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
