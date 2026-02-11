// src/app/(protected)/flashcard/resume/[id]/page.tsx
// クイズ再開ページ

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { isAxiosError } from "axios";
// import { resumeQuiz, submitAnswer } from "@/lib/api/flashcard";
// import type {
//   UserProgress,
//   QuizQuestion,
//   SubmitAnswerResponse,
// } from "@/types/flashcard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { pauseQuiz } from "@/lib/api/flashcard";

// export default function FlashcardResumePage() {
//   const params = useParams();
//   const router = useRouter();

//   const [progress, setProgress] = useState<UserProgress | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
//     null,
//   );
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState<SubmitAnswerResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [cardFlipped, setCardFlipped] = useState(false);

//   useEffect(() => {
//     async function resume() {
//       const id = params.id as string;
//       if (!id) return;

//       try {
//         setLoading(true);
//         const result = await resumeQuiz(Number(id));
//         setProgress(result.progress);
//         setCurrentQuestion(result.current_question);
//       } catch (err: unknown) {
//         if (isAxiosError(err)) {
//           setError(err.response?.data?.error || "クイズの再開に失敗しました");
//         } else {
//           setError("クイズの再開に失敗しました");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     resume();
//   }, [params.id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!progress || !answer.trim()) return;

//     try {
//       setLoading(true);
//       const result = await submitAnswer({
//         progress_id: progress.id,
//         answer: answer.trim(),
//       });

//       setFeedback(result);
//       setShowAnswer(true);
//       setCardFlipped(true);

//       setTimeout(() => {
//         if (result.is_completed) {
//           router.push(`/flashcard/result/${progress.id}`);
//         } else if (result.next_question) {
//           setCurrentQuestion(result.next_question);
//           setAnswer("");
//           setShowAnswer(false);
//           setCardFlipped(false);
//           setFeedback(null);
//         }
//       }, 2000);
//     } catch (err: unknown) {
//       if (isAxiosError(err)) {
//         setError(err.response?.data?.detail || "回答の送信に失敗しました");
//       } else {
//         setError("回答の送信に失敗しました");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePause = async () => {
//     if (!progress) return;

//     try {
//       await pauseQuiz(progress.id);
//       router.push("/flashcard/paused");
//     } catch (err: unknown) {
//       console.error("中断に失敗:", err);
//     }
//   };

//   if (loading && !currentQuestion) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
//         <div className="text-white text-2xl font-bold animate-pulse">
//           再開中...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
//         <Card className="p-8 max-w-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">エラー</h2>
//           <p className="text-gray-700 mb-4">{error}</p>
//           <Button onClick={() => router.push("/flashcard/paused")}>戻る</Button>
//         </Card>
//       </div>
//     );
//   }

//   if (!currentQuestion || !progress) return null;

//   const progressPercent =
//     (currentQuestion.question_number / currentQuestion.total_questions) * 100;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap");

//         .quiz-container {
//           font-family: "Fredoka", sans-serif;
//         }

//         .card-flip {
//           perspective: 1000px;
//         }

//         .card-inner {
//           transition: transform 0.6s;
//           transform-style: preserve-3d;
//         }

//         .card-inner.flipped {
//           transform: rotateY(360deg);
//         }

//         .card-front,
//         .card-back {
//           backface-visibility: hidden;
//         }

//         .card-back {
//           transform: rotateY(360deg);
//         }

//         @keyframes scoreUp {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.3);
//             color: #fbbf24;
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         .score-animation {
//           animation: scoreUp 0.5s ease;
//         }
//       `}</style>

//       <div className="max-w-4xl mx-auto quiz-container">
//         {/* ヘッダー */}
//         <div className="flex items-center justify-between mb-6">
//           <Button
//             variant="outline"
//             onClick={handlePause}
//             className="bg-white/20 hover:bg-white/30 text-white border-white/30"
//           >
//             中断
//           </Button>

//           <div className="text-white font-bold text-xl">
//             スコア:{" "}
//             <span
//               className={
//                 feedback?.is_correct ? "score-animation inline-block" : ""
//               }
//             >
//               {progress.score}
//             </span>{" "}
//             / {currentQuestion.question_number - 1}
//           </div>
//         </div>

//         {/* 進捗バー */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between text-white text-sm mb-2">
//             <span>
//               問題 {currentQuestion.question_number} /{" "}
//               {currentQuestion.total_questions}
//             </span>
//             <span>{Math.round(progressPercent)}%</span>
//           </div>
//           <div className="h-3 bg-white/20 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-linear-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
//               style={{ width: `${progressPercent}%` }}
//             />
//           </div>
//         </div>

//         {/* カード */}
//         <div className="card-flip mb-8">
//           <div className={`card-inner ${cardFlipped ? "flipped" : ""}`}>
//             <Card className="p-12 text-center bg-white shadow-2xl min-h-100 flex flex-col items-center justify-center">
//               {!showAnswer ? (
//                 <>
//                   <div className="text-6xl mb-8">
//                     {progress.mode === "en" ? "🇯🇵" : "🇬🇧"}
//                   </div>
//                   <p className="text-4xl font-bold text-gray-800 mb-12">
//                     {currentQuestion.question}
//                   </p>

//                   <form onSubmit={handleSubmit} className="w-full max-w-md">
//                     <Input
//                       type="text"
//                       value={answer}
//                       onChange={(e) => setAnswer(e.target.value)}
//                       placeholder="答えを入力..."
//                       disabled={loading || showAnswer}
//                       className="text-2xl p-6 text-center mb-6"
//                       autoFocus
//                     />
//                     <Button
//                       type="submit"
//                       disabled={loading || showAnswer || !answer.trim()}
//                       className="w-full text-xl py-6 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
//                     >
//                       {loading ? "送信中..." : "回答"}
//                     </Button>
//                   </form>
//                 </>
//               ) : (
//                 <div className="w-full">
//                   {feedback?.is_correct ? (
//                     <div className="text-center">
//                       <div className="text-8xl mb-6 animate-bounce">🎉</div>
//                       <h2 className="text-5xl font-bold text-green-600 mb-4">
//                         正解！
//                       </h2>
//                       <p className="text-3xl text-gray-600">
//                         {feedback.correct_answer}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <div className="text-8xl mb-6">😢</div>
//                       <h2 className="text-5xl font-bold text-red-600 mb-4">
//                         残念...
//                       </h2>
//                       <p className="text-xl text-gray-500 mb-2">
//                         あなたの答え: {answer}
//                       </p>
//                       <p className="text-3xl text-gray-800 font-bold">
//                         正解: {feedback?.correct_answer}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/(protected)/flashcard/resume/[id]/page.tsx
// クイズ再開ページ - レスポンシブ・ダークモード対応

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { resumeQuiz, submitAnswer, pauseQuiz } from "@/lib/api/flashcard";
import type {
  UserProgress,
  QuizQuestion,
  SubmitAnswerResponse,
} from "@/types/flashcard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pause, Trophy, AlertCircle, PartyPopper, Frown } from "lucide-react";

export default function FlashcardResumePage() {
  const params = useParams();
  const router = useRouter();

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null,
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<SubmitAnswerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  useEffect(() => {
    async function resume() {
      const id = params.id as string;
      if (!id) return;

      try {
        setLoading(true);
        const result = await resumeQuiz(Number(id));
        setProgress(result.progress);
        setCurrentQuestion(result.current_question);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.error || "クイズの再開に失敗しました");
        } else {
          setError("クイズの再開に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    }

    resume();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!progress || !answer.trim()) return;

    try {
      setLoading(true);
      const result = await submitAnswer({
        progress_id: progress.id,
        answer: answer.trim(),
      });

      setFeedback(result);
      setShowAnswer(true);
      setCardFlipped(true);

      setTimeout(() => {
        if (result.is_completed) {
          router.push(`/flashcard/result/${progress.id}`);
        } else if (result.next_question) {
          setCurrentQuestion(result.next_question);
          setAnswer("");
          setShowAnswer(false);
          setCardFlipped(false);
          setFeedback(null);
          setProgress((prev) =>
            prev ? { ...prev, score: result.score } : null,
          );
        }
      }, 2000);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.detail || "回答の送信に失敗しました");
      } else {
        setError("回答の送信に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePause = async () => {
    if (!progress) return;

    try {
      await pauseQuiz(progress.id);
      router.push("/flashcard/paused");
    } catch (err: unknown) {
      console.error("中断に失敗:", err);
    }
  };

  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary via-purple-500 to-pink-500">
        <div className="text-white text-xl sm:text-2xl font-bold animate-pulse">
          再開中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary via-purple-500 to-pink-500 p-4">
        <Card className="p-6 sm:p-8 max-w-md w-full">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-destructive mb-2">
                エラー
              </h2>
              <p className="text-foreground">{error}</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/flashcard/paused")}
            className="w-full"
          >
            戻る
          </Button>
        </Card>
      </div>
    );
  }

  if (!currentQuestion || !progress) return null;

  const progressPercent =
    (currentQuestion.question_number / currentQuestion.total_questions) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-purple-500 to-pink-500 p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .card-flip {
          perspective: 1000px;
        }

        .card-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card-inner.flipped {
          transform: rotateY(360deg);
        }

        @keyframes scoreUp {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        .score-animation {
          animation: scoreUp 0.5s ease;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={handlePause}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm w-full sm:w-auto"
            size="sm"
          >
            <Pause className="w-4 h-4 mr-2" />
            中断
          </Button>

          <div className="text-white font-bold text-base sm:text-xl flex items-center gap-2 w-full sm:w-auto justify-center">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            スコア:{" "}
            <span
              className={
                feedback?.is_correct ? "score-animation inline-block" : ""
              }
            >
              {progress.score}
            </span>{" "}
            / {currentQuestion.question_number - 1}
          </div>
        </div>

        {/* 進捗バー */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-white text-xs sm:text-sm mb-2">
            <span>
              問題 {currentQuestion.question_number} /{" "}
              {currentQuestion.total_questions}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-linear-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* カード */}
        <div className="card-flip mb-6 sm:mb-8">
          <div className={`card-inner ${cardFlipped ? "flipped" : ""}`}>
            <Card className="p-6 sm:p-12 text-center bg-card shadow-2xl min-h-75 sm:min-h-100 flex flex-col items-center justify-center">
              {!showAnswer ? (
                <>
                  <div className="text-5xl sm:text-6xl mb-6 sm:mb-8">
                    {progress.mode === "en" ? "🇯🇵" : "🇬🇧"}
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 sm:mb-12 px-4 wrap-break-words">
                    {currentQuestion.question}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md px-4"
                  >
                    <Input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="答えを入力..."
                      disabled={loading || showAnswer}
                      className="text-lg sm:text-2xl p-4 sm:p-6 text-center mb-4 sm:mb-6 border-2"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      disabled={loading || showAnswer || !answer.trim()}
                      className="w-full text-base sm:text-xl py-4 sm:py-6 bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
                    >
                      {loading ? "送信中..." : "回答"}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="w-full px-4">
                  {feedback?.is_correct ? (
                    <div className="text-center">
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 dark:text-green-400 animate-bounce" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400 mb-3 sm:mb-4">
                        正解！
                      </h2>
                      <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground wrap-break-words">
                        {feedback.correct_answer}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <Frown className="w-16 h-16 sm:w-20 sm:h-20 text-destructive" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-destructive mb-3 sm:mb-4">
                        残念...
                      </h2>
                      <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-2 wrap-break-words">
                        あなたの答え: {answer}
                      </p>
                      <p className="text-xl sm:text-2xl lg:text-3xl text-foreground font-bold wrap-break-words">
                        正解: {feedback?.correct_answer}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
