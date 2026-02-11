// src/app/(protected)/flashcard/incorrect/page.tsx
// 間違えた単語一覧ページ - レスポンシブ・ダークモード対応

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { isAxiosError } from "axios";
// import { getIncorrectWords } from "@/lib/api/flashcard";
// import { getLevels } from "@/lib/api/dictionary";
// import type { UserWordStatus } from "@/types/flashcard";
// import type { Level } from "@/types/dictionary";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   XCircle,
//   Filter,
//   RotateCcw,
//   Home,
//   Tag,
//   Layers,
//   Calendar,
//   ArrowRight,
//   PartyPopper,
//   AlertCircle,
// } from "lucide-react";
// import Link from "next/link";

// export default function FlashcardIncorrectWordsPage() {
//   const router = useRouter();
//   const [incorrectWords, setIncorrectWords] = useState<UserWordStatus[]>([]);
//   const [levels, setLevels] = useState<Level[]>([]);
//   const [selectedMode, setSelectedMode] = useState<"en" | "jp" | "all">("all");
//   const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const levelsData = await getLevels();
//         setLevels(levelsData);
//       } catch (err: unknown) {
//         console.error("レベルデータ取得エラー:", err);
//       }
//     }
//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   fetchIncorrectWords();
//   // }, [selectedMode, selectedLevel]);

//   // async function fetchIncorrectWords() {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);

//   //     const params: { mode?: "en" | "jp"; level?: number } = {};
//   //     if (selectedMode !== "all") {
//   //       params.mode = selectedMode;
//   //     }
//   //     if (selectedLevel) {
//   //       params.level = selectedLevel;
//   //     }

//   //     const data = await getIncorrectWords(params);
//   //     setIncorrectWords(data.results);
//   //   } catch (err: unknown) {
//   //     if (isAxiosError(err)) {
//   //       setError(err.response?.data?.detail || "データの取得に失敗しました");
//   //     } else {
//   //       setError("データの取得に失敗しました");
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   useEffect(() => {
//     const fetchIncorrectWords = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const params: { mode?: "en" | "jp"; level?: number } = {};
//         if (selectedMode !== "all") params.mode = selectedMode;
//         if (selectedLevel) params.level = selectedLevel;

//         const data = await getIncorrectWords(params);
//         setIncorrectWords(data.results);
//       } catch (err: unknown) {
//         if (isAxiosError(err)) {
//           setError(err.response?.data?.detail || "データの取得に失敗しました");
//         } else {
//           setError("データの取得に失敗しました");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIncorrectWords();
//   }, [selectedMode, selectedLevel]);

//   if (loading && incorrectWords.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-100">
//         <p className="text-muted-foreground">読み込み中...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       {/* ヘッダー */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
//           <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
//           <span className="bg-linear-to-r from-destructive to-orange-600 bg-clip-text text-transparent">
//             間違えた単語
//           </span>
//         </h1>
//         <Button
//           onClick={() => router.push("/flashcard/statistics")}
//           variant="outline"
//           className="w-full sm:w-auto"
//         >
//           <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
//           統計に戻る
//         </Button>
//       </div>

//       {/* フィルター */}
//       <Card className="border-2 border-border shadow-lg">
//         <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
//           <CardTitle className="text-base sm:text-lg flex items-center gap-2">
//             <Filter className="w-5 h-5 text-primary" />
//             絞り込み
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 sm:p-6 space-y-6">
//           {/* モードフィルター */}
//           <div className="space-y-3">
//             <h3 className="font-bold text-sm sm:text-base text-foreground">
//               モード
//             </h3>
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//               <Button
//                 variant={selectedMode === "all" ? "default" : "outline"}
//                 onClick={() => setSelectedMode("all")}
//                 className={`flex-1 ${selectedMode === "all" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
//               >
//                 すべて
//               </Button>
//               <Button
//                 variant={selectedMode === "en" ? "default" : "outline"}
//                 onClick={() => setSelectedMode("en")}
//                 className={`flex-1 ${selectedMode === "en" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
//               >
//                 🇯🇵 → 🇬🇧 日本語→英語
//               </Button>
//               <Button
//                 variant={selectedMode === "jp" ? "default" : "outline"}
//                 onClick={() => setSelectedMode("jp")}
//                 className={`flex-1 ${selectedMode === "jp" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
//               >
//                 🇬🇧 → 🇯🇵 英語→日本語
//               </Button>
//             </div>
//           </div>

//           {/* レベルフィルター */}
//           <div className="space-y-3">
//             <h3 className="font-bold text-sm sm:text-base text-foreground">
//               難易度
//             </h3>
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <Button
//                 variant={selectedLevel === null ? "default" : "outline"}
//                 onClick={() => setSelectedLevel(null)}
//                 size="sm"
//                 className={
//                   selectedLevel === null
//                     ? "bg-linear-to-r from-primary to-purple-600"
//                     : ""
//                 }
//               >
//                 すべて
//               </Button>
//               {levels.map((level) => (
//                 <Button
//                   key={level.id}
//                   variant={selectedLevel === level.id ? "default" : "outline"}
//                   onClick={() => setSelectedLevel(level.id)}
//                   size="sm"
//                   className={
//                     selectedLevel === level.id
//                       ? "bg-linear-to-r from-primary to-purple-600"
//                       : ""
//                   }
//                 >
//                   {level.name}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* エラー表示 */}
//       {error && (
//         <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
//           <CardContent className="pt-6">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
//               <p className="text-destructive">{error}</p>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* 結果 */}
//       {incorrectWords.length === 0 ? (
//         <Card className="shadow-lg border-2 border-border">
//           <CardContent className="py-12 sm:py-16 text-center space-y-6">
//             <div className="flex justify-center">
//               <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center">
//                 <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//             <div className="space-y-3">
//               <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
//                 素晴らしい！
//               </h2>
//               <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
//                 {selectedMode !== "all" || selectedLevel
//                   ? "この条件では間違えた単語がありません"
//                   : "間違えた単語がありません"}
//               </p>
//             </div>
//             <Button
//               onClick={() => router.push("/flashcard/start")}
//               className="bg-linear-to-r from-primary to-purple-600"
//             >
//               学習を続ける
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           {/* ヘッダー */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 bg-destructive/5 dark:bg-destructive/10 rounded-lg border-2 border-destructive/20">
//             <p className="text-sm sm:text-base text-foreground">
//               <span className="font-bold text-2xl sm:text-3xl text-destructive">
//                 {incorrectWords.length}
//               </span>{" "}
//               件の間違えた単語
//             </p>
//             <Button
//               onClick={() => {
//                 const params = new URLSearchParams({
//                   level: selectedLevel?.toString() || "",
//                   mode: selectedMode === "all" ? "en" : selectedMode,
//                   quiz_mode: "replay",
//                 });
//                 router.push(`/flashcard/quiz?${params}`);
//               }}
//               className="w-full sm:w-auto bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
//             >
//               <RotateCcw className="w-5 h-5 mr-2" />
//               リプレイモードで復習
//             </Button>
//           </div>

//           {/* 単語リスト */}
//           <div className="grid gap-3 sm:gap-4">
//             {incorrectWords.map((wordStatus) => (
//               <Card
//                 key={wordStatus.id}
//                 className="hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-destructive/30"
//               >
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-start gap-3">
//                         <div className="text-2xl sm:text-3xl shrink-0">
//                           {wordStatus.mode === "en" ? "🇯🇵 → 🇬🇧" : "🇬🇧 → 🇯🇵"}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="text-xl sm:text-2xl font-bold text-foreground wrap-break-words">
//                             {wordStatus.word.english}
//                           </h3>
//                           <p className="text-base sm:text-lg text-muted-foreground mt-1">
//                             {wordStatus.word.japanese}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
//                         <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium">
//                           <Tag className="w-3 h-3" />
//                           {typeof wordStatus.word.part_of_speech === "string"
//                             ? wordStatus.word.part_of_speech
//                             : wordStatus.word.part_of_speech.name}
//                         </div>
//                         <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium">
//                           <Layers className="w-3 h-3" />
//                           {typeof wordStatus.word.level === "string"
//                             ? wordStatus.word.level
//                             : wordStatus.word.level.name}
//                         </div>
//                         <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                           <Calendar className="w-3 h-3" />
//                           最終挑戦:{" "}
//                           {new Date(
//                             wordStatus.last_attempted_at,
//                           ).toLocaleDateString("ja-JP")}
//                         </div>
//                       </div>
//                     </div>

//                     <Link
//                       href={`/dictionary/words/${wordStatus.word.id}`}
//                       className="text-sm text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
//                     >
//                       詳細
//                       <ArrowRight className="w-3 h-3" />
//                     </Link>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       {/* フッター */}
//       <div className="text-center pt-4">
//         <Button
//           onClick={() => router.push("/dashboard")}
//           variant="ghost"
//           className="text-muted-foreground hover:text-foreground"
//         >
//           <Home className="w-4 h-4 mr-2" />
//           ダッシュボードに戻る
//         </Button>
//       </div>
//     </div>
//   );
// }

// src/app/(protected)/flashcard/incorrect/page.tsx
// 間違えた単語一覧ページ - レスポンシブ・ダークモード対応（ページネーション付き）

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getIncorrectWords } from "@/lib/api/flashcard";
import { getLevels } from "@/lib/api/dictionary";
import type { UserWordStatus } from "@/types/flashcard";
import type { Level } from "@/types/dictionary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XCircle,
  Filter,
  RotateCcw,
  Home,
  Tag,
  Layers,
  Calendar,
  ArrowRight,
  PartyPopper,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 30;

export default function FlashcardIncorrectWordsPage() {
  const router = useRouter();
  const [incorrectWords, setIncorrectWords] = useState<UserWordStatus[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedMode, setSelectedMode] = useState<"en" | "jp" | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const levelsData = await getLevels();
        setLevels(levelsData);
      } catch (err: unknown) {
        console.error("レベルデータ取得エラー:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchIncorrectWords = async () => {
      try {
        setLoading(true);
        setError(null);
        setCurrentPage(1); // フィルター変更時はページをリセット

        const params: { mode?: "en" | "jp"; level?: number } = {};
        if (selectedMode !== "all") params.mode = selectedMode;
        if (selectedLevel) params.level = selectedLevel;

        const data = await getIncorrectWords(params);
        setIncorrectWords(data.results);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.detail || "データの取得に失敗しました");
        } else {
          setError("データの取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncorrectWords();
  }, [selectedMode, selectedLevel]);

  // ページネーション計算
  const totalPages = Math.ceil(incorrectWords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWords = incorrectWords.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // ページ番号ボタンの生成
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (loading && incorrectWords.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
          <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
          <span className="bg-linear-to-r from-destructive to-orange-600 bg-clip-text text-transparent">
            間違えた単語
          </span>
        </h1>
        <Button
          onClick={() => router.push("/flashcard/statistics")}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          統計に戻る
        </Button>
      </div>

      {/* フィルター */}
      <Card className="border-2 border-border shadow-lg">
        <CardHeader className="bg-linear-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 border-b border-border">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            絞り込み
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* モードフィルター */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              モード
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant={selectedMode === "all" ? "default" : "outline"}
                onClick={() => setSelectedMode("all")}
                className={`flex-1 ${selectedMode === "all" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
              >
                すべて
              </Button>
              <Button
                variant={selectedMode === "en" ? "default" : "outline"}
                onClick={() => setSelectedMode("en")}
                className={`flex-1 ${selectedMode === "en" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
              >
                🇯🇵 → 🇬🇧 日本語→英語
              </Button>
              <Button
                variant={selectedMode === "jp" ? "default" : "outline"}
                onClick={() => setSelectedMode("jp")}
                className={`flex-1 ${selectedMode === "jp" ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
              >
                🇬🇧 → 🇯🇵 英語→日本語
              </Button>
            </div>
          </div>

          {/* レベルフィルター */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              難易度
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant={selectedLevel === null ? "default" : "outline"}
                onClick={() => setSelectedLevel(null)}
                size="sm"
                className={
                  selectedLevel === null
                    ? "bg-linear-to-r from-primary to-purple-600"
                    : ""
                }
              >
                すべて
              </Button>
              {levels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? "default" : "outline"}
                  onClick={() => setSelectedLevel(level.id)}
                  size="sm"
                  className={
                    selectedLevel === level.id
                      ? "bg-linear-to-r from-primary to-purple-600"
                      : ""
                  }
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* エラー表示 */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 結果 */}
      {incorrectWords.length === 0 ? (
        <Card className="shadow-lg border-2 border-border">
          <CardContent className="py-12 sm:py-16 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/10 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                素晴らしい！
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                {selectedMode !== "all" || selectedLevel
                  ? "この条件では間違えた単語がありません"
                  : "間違えた単語がありません"}
              </p>
            </div>
            <Button
              onClick={() => router.push("/flashcard/start")}
              className="bg-linear-to-r from-primary to-purple-600"
            >
              学習を続ける
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ヘッダー */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 bg-destructive/5 dark:bg-destructive/10 rounded-lg border-2 border-destructive/20">
            <p className="text-sm sm:text-base text-foreground">
              <span className="font-bold text-2xl sm:text-3xl text-destructive">
                {incorrectWords.length}
              </span>{" "}
              件の間違えた単語
              {totalPages > 1 && (
                <span className="text-muted-foreground ml-2">
                  (ページ {currentPage} / {totalPages})
                </span>
              )}
            </p>
            <Button
              onClick={() => {
                const params = new URLSearchParams({
                  level: selectedLevel?.toString() || "",
                  mode: selectedMode === "all" ? "en" : selectedMode,
                  quiz_mode: "replay",
                });
                router.push(`/flashcard/quiz?${params}`);
              }}
              className="w-full sm:w-auto bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              リプレイモードで復習
            </Button>
          </div>

          {/* 単語リスト */}
          <div className="grid gap-3 sm:gap-4">
            {currentWords.map((wordStatus) => (
              <Card
                key={wordStatus.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-destructive/30"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl sm:text-3xl shrink-0">
                          {wordStatus.mode === "en" ? "🇯🇵 → 🇬🇧" : "🇬🇧 → 🇯🇵"}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                            {wordStatus.word.english}
                          </h3>
                          <p className="text-base sm:text-lg text-muted-foreground mt-1">
                            {wordStatus.word.japanese}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium">
                          <Tag className="w-3 h-3" />
                          {typeof wordStatus.word.part_of_speech === "string"
                            ? wordStatus.word.part_of_speech
                            : wordStatus.word.part_of_speech.name}
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs sm:text-sm font-medium">
                          <Layers className="w-3 h-3" />
                          {typeof wordStatus.word.level === "string"
                            ? wordStatus.word.level
                            : wordStatus.word.level.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          最終挑戦:{" "}
                          {new Date(
                            wordStatus.last_attempted_at,
                          ).toLocaleDateString("ja-JP")}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/dictionary/words/${wordStatus.word.id}`}
                      className="text-sm text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                    >
                      詳細
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              {/* 前へボタン */}
              <Button
                variant="outline"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                前へ
              </Button>

              {/* ページ番号 */}
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 text-muted-foreground"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => goToPage(page as number)}
                      size="sm"
                      className={`w-10 h-10 ${currentPage === page ? "bg-linear-to-r from-primary to-purple-600" : ""}`}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>

              {/* 次へボタン */}
              <Button
                variant="outline"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                次へ
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* フッター */}
      <div className="text-center pt-4">
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Home className="w-4 h-4 mr-2" />
          ダッシュボードに戻る
        </Button>
      </div>
    </div>
  );
}
