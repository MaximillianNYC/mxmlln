'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContextMenu } from './ContextMenu'

interface ArticleContentProps {
  initialContent: string
}

interface Expansion {
  selectedText: string
  expandedContent: string
  position: number // Position in the original text where to insert
}

export const ArticleContent = ({ initialContent }: ArticleContentProps) => {
  const [selection, setSelection] = useState<{ text: string; range: Range } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expansions, setExpansions] = useState<Expansion[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      setSelection(null)
      return
    }

    const range = selection.getRangeAt(0)
    const text = range.toString().trim()
    
    if (text) {
      setSelection({ text, range })
    }
  }, [])

  const handleZoomIn = async () => {
    if (!selection) {
      console.warn('No selection available for zoom operation')
      return
    }
    
    if (!selection.text || selection.text.trim() === '') {
      console.warn('Selection text is empty')
      setError('Please select some text to expand.')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    console.log('Expanding text:', selection.text)
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: selection.text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const expandedContent = await response.text()
      
      // Add new expansion at the current selection point
      const newExpansion: Expansion = {
        selectedText: selection.text,
        expandedContent: expandedContent,
        position: selection.range.startOffset,
      }
      setExpansions(prev => [...prev, newExpansion].sort((a, b) => a.position - b.position))
      setSelection(null)
      
    } catch (error) {
      console.error('Error in zoom operation:', error)
      setError('Failed to zoom in. Please try again.')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseExpansion = (position: number) => {
    setExpansions(prev => prev.filter(exp => exp.position !== position))
  }

  // Split content and insert expansions
  const renderContent = () => {
    let lastIndex = 0
    const result = []

    expansions.forEach((expansion, index) => {
      // Add text before this expansion
      if (expansion.position > lastIndex) {
        result.push(
          <p key={`text-${index}`} className="text-lg leading-relaxed text-slate-900">
            {initialContent.slice(lastIndex, expansion.position)}
          </p>
        )
      }

      // Add the expansion
      result.push(
        <motion.div
          key={`expansion-${index}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="my-4 p-4 border border-slate-200 rounded-lg bg-slate-50 relative"
        >
          <button
            onClick={() => handleCloseExpansion(expansion.position)}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
          >
            <span className="text-slate-500">×</span>
          </button>
          <div className="font-medium text-slate-900 mb-2 pb-2 border-b border-slate-200">
            {expansion.selectedText}
          </div>
          <div className="text-slate-700">
            {expansion.expandedContent}
          </div>
        </motion.div>
      )

      lastIndex = expansion.position + expansion.selectedText.length
    })

    // Add remaining text
    if (lastIndex < initialContent.length) {
      result.push(
        <p key="text-final" className="text-lg leading-relaxed text-slate-900">
          {initialContent.slice(lastIndex)}
        </p>
      )
    }

    return result
  }

  return (
    <div className="relative">
      <div 
        className="prose prose-slate max-w-none"
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        <AnimatePresence>
          {renderContent()}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow-lg border border-red-200"
        >
          {error}
        </motion.div>
      )}

      {selection && (
        <ContextMenu 
          onZoomIn={handleZoomIn}
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}

      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-800" />
          <span className="text-sm text-slate-600">Expanding text...</span>
        </div>
      )}
    </div>
  )
}
