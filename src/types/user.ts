// src/types/user.ts
// ユーザー関連の型定義

export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  supabase_id: string | null;
}

export interface UserDetail extends User {
  levels: LevelData[];
}

export interface LevelData {
  id: number;
  name: string;
  total_count: number;
  modes: ModeData[];
}

export interface ModeData {
  mode: string;
  mode_display: string;
  count: number;
  correct: number;
  accuracy: number;
}

export interface ProfileCompletionStatus {
  is_complete: boolean;
  needs_username: boolean;
  user: User;
}
