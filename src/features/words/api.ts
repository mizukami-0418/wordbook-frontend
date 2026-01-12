import { apiFetch } from "@/lib/api";
import { Word } from "./types";

export const fetchWords = () => {
  return apiFetch<Word[]>("/api/words/");
};
