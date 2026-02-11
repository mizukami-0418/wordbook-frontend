// src/lib/api/contact.ts
// Contact API関数

import apiClient from "./client";
import type { Inquiry, InquiryCreateRequest } from "@/types/contact";

/**
 * お問い合わせ履歴を取得
 */
export async function getInquiries(): Promise<Inquiry[]> {
  const response = await apiClient.get<Inquiry[]>("/contact/");
  return response.data;
}

/**
 * お問い合わせを送信
 */
export async function createInquiry(
  data: InquiryCreateRequest,
): Promise<Inquiry> {
  const response = await apiClient.post<Inquiry>("/contact/create/", data);
  return response.data;
}
