// src/types/contact.ts
// Contact（お問い合わせ）関連の型定義

export interface Inquiry {
  id: number;
  subject: string;
  context: string;
  created_at: string;
  user_email: string;
}

export interface InquiryCreateRequest {
  subject: string;
  context: string;
}
