'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface ArticleContentProps {
  initialContent: string
}

export const ArticleContent = ({ initialContent }: ArticleContentProps) => {
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleExpand = async () => {
    if (!content.trim()) {
      setError('Please enter some text to expand.')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `Rewrite this text, but add only 5-10 additional words throughout to expand and add clarity or detail. Keep the expansion minimal and subtle - just enough to enhance the content. Maintain the exact same structure and flow. Return ONLY the rewritten text with no introduction, explanation, or quotes. Text: "${content}"` 
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newContent = await response.text()
      setContent(newContent)
      
    } catch (error) {
      console.error('Error expanding text:', error)
      setError('Failed to expand text. Please try again.')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-screen resize-none text-lg leading-relaxed text-slate-900 bg-transparent border-none outline-none pb-20"
        placeholder="Type or paste your content here..."
      />

      {/* Fixed expand button at bottom */}
      <button
        onClick={handleExpand}
        disabled={isLoading}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors text-sm font-medium shadow-lg z-50"
        style={{ zIndex: 9999 }}
      >
        {isLoading ? 'Expanding...' : 'Expand Text'}
      </button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow-lg border border-red-200 z-40"
        >
          {error}
        </motion.div>
      )}

      {isLoading && (
        <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 z-40">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-800" />
          <span className="text-sm text-slate-600">Rewriting with expansion...</span>
        </div>
      )}
    </div>
  )
}
