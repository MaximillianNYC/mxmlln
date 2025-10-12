'use client'

import { useState } from 'react'
import { ArticleContent } from './components/ArticleContent'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeButton, setActiveButton] = useState<'expand' | 'contract' | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [lastOperation, setLastOperation] = useState<{
    type: 'expand' | 'contract'
    beforeCount: number
    afterCount: number
  } | null>(null)

  const handleLoadingStateChange = (loading: boolean, button: 'expand' | 'contract' | null, operationSummary?: { beforeCount: number, afterCount: number }) => {
    setIsLoading(loading)
    setActiveButton(button)
    
    // If operation completed and we have summary data, store it
    if (!loading && button && operationSummary) {
      setLastOperation({
        type: button,
        beforeCount: operationSummary.beforeCount,
        afterCount: operationSummary.afterCount
      })
    }
  }

  const getTitleText = () => {
    if (isLoading && activeButton === 'contract') {
      return 'Zooming in...'
    }
    if (isLoading && activeButton === 'expand') {
      return 'Zooming out...'
    }
    if (lastOperation) {
      if (lastOperation.type === 'contract') {
        return `${lastOperation.beforeCount} words zoomed to ${lastOperation.afterCount} words`
      } else {
        return `${lastOperation.beforeCount} words zoomed to ${lastOperation.afterCount} words`
      }
    }
    return 'Welcome to Zoomer'
  }

  // Calculate dynamic font size for header (same logic as textarea)
  // 0-5 words: 28px (no change), 6-50 words: scale to 24px, 51-100 words: scale to 18px, 100+: 18px
  const getHeaderFontSize = (): number => {
    if (wordCount <= 5) {
      // Stay at 28px for first 5 words to prevent visual shift
      return 28
    } else if (wordCount <= 50) {
      // Scale from 28px at 6 words to 24px at 50 words
      return Math.max(24, 28 - (((wordCount - 5) / 45) * 4))
    } else if (wordCount <= 100) {
      // Scale from 24px at 51 words to 18px at 100 words
      return Math.max(18, 24 - (((wordCount - 50) / 50) * 6))
    } else {
      // 100+ words: stay at 18px
      return 18
    }
  }

  return (
    <main className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto px-4 py-12">
        <h1 
          className="font-bold text-left text-[#06b6d4]"
          style={{ 
            fontSize: `${getHeaderFontSize()}px`,
            lineHeight: `${getHeaderFontSize() * 1.625}px`,
            letterSpacing: '0px'
          }}
        >
          {getTitleText()}
        </h1>
        <ArticleContent 
          initialContent="" 
          onLoadingStateChange={handleLoadingStateChange}
          onWordCountChange={setWordCount}
        />
      </div>
    </main>
  )
}
