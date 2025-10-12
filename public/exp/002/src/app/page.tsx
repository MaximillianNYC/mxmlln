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
        return `${lastOperation.beforeCount} ➾ ${lastOperation.afterCount} words`
      } else {
        return `${lastOperation.beforeCount} ➾ ${lastOperation.afterCount} words`
      }
    }
    return 'Welcome to Zoomer'
  }

  return (
    <main className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[650px] mx-auto px-4 py-12">
        <h1 className="text-xl leading-relaxed font-bold text-left text-[#06b6d4]" style={{ letterSpacing: '-0.01em' }}>
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
