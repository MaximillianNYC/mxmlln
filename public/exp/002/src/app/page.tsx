'use client'

import { useState } from 'react'
import { ArticleContent } from './components/ArticleContent'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeButton, setActiveButton] = useState<'expand' | 'contract' | null>(null)

  const handleLoadingStateChange = (loading: boolean, button: 'expand' | 'contract' | null) => {
    setIsLoading(loading)
    setActiveButton(button)
  }

  const getTitleText = () => {
    if (isLoading && activeButton === 'contract') {
      return 'Zooming in...'
    }
    if (isLoading && activeButton === 'expand') {
      return 'Zooming out...'
    }
    return 'Welcome to Zoomer'
  }

  return (
    <main className="min-h-screen  bg-slate-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] mx-auto px-4 py-12">
        <h1 className="text-lg font-bold text-left">{getTitleText()}</h1>
        <ArticleContent 
          initialContent="" 
          onLoadingStateChange={handleLoadingStateChange}
        />
      </div>
    </main>
  )
}
