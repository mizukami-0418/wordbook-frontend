// src/app/(protected)/flashcard/start/page.tsx
// クイズ開始ページ（レベル・モード選択）

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAxiosError } from 'axios'
import { getLevels } from '@/lib/api/dictionary'
import { getProgressList } from '@/lib/api/flashcard'
import type { Level } from '@/types/dictionary'
import type { UserProgress } from '@/types/flashcard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FlashcardStartPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<Level[]>([])
  const [pausedProgress, setPausedProgress] = useState<UserProgress[]>([])
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [selectedMode, setSelectedMode] = useState<'en' | 'jp' | null>(null)
  const [selectedQuizMode, setSelectedQuizMode] = useState<'normal' | 'test' | 'replay'>('normal')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [levelsData, pausedData] = await Promise.all([
          getLevels(),
          getProgressList({ is_paused: true }),
        ])
        setLevels(levelsData)
        setPausedProgress(pausedData)
      } catch (err: unknown) {
        console.error('データ取得エラー:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStart = () => {
    if (!selectedLevel || !selectedMode) return

    const params = new URLSearchParams({
      level: selectedLevel.toString(),
      mode: selectedMode,
      quiz_mode: selectedQuizMode,
    })

    router.push(`/flashcard/quiz?${params}`)
  }

  const handleResume = (progressId: number) => {
    router.push(`/flashcard/resume/${progressId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    )
  }

  return (
    // <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8">
    <div className="flex bg-linear-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');

        .start-container {
          font-family: 'Fredoka', sans-serif;
        }
      `}</style>

      {/* <div className="max-w-5xl mx-auto start-container"> */}
      <div className="max-w-5xl mx-auto start-container w-full">
        {/* <h1 className="text-5xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          フラッシュカード学習
        </h1>

        {/* 中断データがある場合 */}
        {pausedProgress.length > 0 && (
          <Card className="mb-8 border-2 border-yellow-400 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                ⏸️ 続きから再開
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pausedProgress.map((progress) => (
                <div
                  key={progress.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                >
                  <div>
                    <p className="font-bold text-lg">{progress.level.name}</p>
                    <p className="text-sm text-gray-600">
                      {progress.mode === 'en' ? '日本語 → 英語' : '英語 → 日本語'}
                      {' '}| 進捗: {progress.current_question_index} / {progress.total_questions}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleResume(progress.id)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    再開
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* 新規開始 */}
        {/* <Card> */}
        <Card className="flex w-full">
          <CardHeader>
            <CardTitle className="text-3xl">🆕 新しく始める</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* クイズモード選択 */}
            <div>
              <h3 className="text-xl font-bold mb-4">クイズモード</h3>
              {/* <div className="grid grid-cols-3 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: 'normal', label: '通常', desc: '全問題', icon: '📚' },
                  { value: 'test', label: 'テスト', desc: 'ランダム100問', icon: '📝' },
                  { value: 'replay', label: 'リプレイ', desc: '間違えた問題', icon: '🔄' },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setSelectedQuizMode(mode.value as any)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedQuizMode === mode.value
                        ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{mode.icon}</div>
                    <div className="font-bold text-lg">{mode.label}</div>
                    <div className="text-sm text-gray-600">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 難易度選択 */}
            <div>
              <h3 className="text-xl font-bold mb-4">難易度</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedLevel === level.id
                        ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-bold text-lg">{level.name}</div>
                    <div className="text-sm text-gray-600">
                      {level.word_count}問
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* モード選択 */}
            <div>
              <h3 className="text-xl font-bold mb-4">出題モード</h3>
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedMode('en')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedMode === 'en'
                      ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-4xl mb-2">🇯🇵 → 🇬🇧</div>
                  <div className="font-bold text-lg">日本語 → 英語</div>
                  <div className="text-sm text-gray-600">英訳問題</div>
                </button>

                <button
                  onClick={() => setSelectedMode('jp')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedMode === 'jp'
                      ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-4xl mb-2">🇬🇧 → 🇯🇵</div>
                  <div className="font-bold text-lg">英語 → 日本語</div>
                  <div className="text-sm text-gray-600">和訳問題</div>
                </button>
              </div>
            </div>

            {/* 開始ボタン */}
            <Button
              onClick={handleStart}
              disabled={!selectedLevel || !selectedMode}
              className="w-full py-8 text-2xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {!selectedLevel || !selectedMode
                ? '難易度とモードを選択してください'
                : 'スタート 🚀'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
