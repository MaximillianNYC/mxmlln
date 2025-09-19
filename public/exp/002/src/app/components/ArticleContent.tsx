'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ArticleContentProps {
  initialContent: string
}

export const ArticleContent = ({ initialContent }: ArticleContentProps) => {
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleRewrite = async (operation: 'expand' | 'contract') => {
    if (!content.trim()) {
      setError(`Please enter some text to ${operation}.`)
      setTimeout(() => setError(null), 3000)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `"${content}"`,
          operation
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const newContent = await response.text()
      setContent(newContent)
      
    } catch (error) {
      console.error(`Error ${operation}ing text:`, error)
      setError(`Failed to ${operation} text. Please try again.`)
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpand = () => handleRewrite('expand')
  const handleContract = () => handleRewrite('contract')

  const handleSliderDrag = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const sliderWidth = rect.width - 64 // Account for handle width (16 * 4 = 64px)
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const x = clientX - rect.left - 32 // Center the handle (16 * 2 = 32px)
    const position = Math.max(-sliderWidth / 2, Math.min(sliderWidth / 2, x - sliderWidth / 2))
    
    setSliderPosition(position)
  }, [isDragging])

  const handleSliderStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (isLoading) return
    setIsDragging(true)
    event.preventDefault()
  }, [isLoading])

  const handleSliderEnd = useCallback(() => {
    if (!isDragging) return
    
    const threshold = 50 // Minimum distance to trigger action
    
    if (Math.abs(sliderPosition) > threshold) {
      if (sliderPosition < -threshold) {
        handleContract()
      } else if (sliderPosition > threshold) {
        handleExpand()
      }
    }
    
    setIsDragging(false)
    setSliderPosition(0) // Snap back to center
  }, [isDragging, sliderPosition])

  // Add event listeners for mouse/touch move and end
  React.useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent | TouchEvent) => handleSliderDrag(e)
    const handleEnd = () => handleSliderEnd()

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleSliderDrag, handleSliderEnd])

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`w-full h-screen resize-none text-lg leading-relaxed bg-transparent border-none outline-none pb-20 ${
          isLoading ? 'loading-text' : 'text-slate-900'
        }`}
        placeholder="Type or paste your content here..."
        autoFocus
        disabled={isLoading}
      />

      {/* Fixed slider control at bottom */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out" 
        style={{ 
          zIndex: 9999,
          bottom: content.trim() ? '40px' : '-100px'
        }}
      >
        <div className="bg-white rounded-full shadow-lg border border-slate-200 p-2">
          <div 
            ref={sliderRef}
            className="relative w-64 h-20 bg-slate-100 rounded-full flex items-center justify-between px-6 cursor-pointer"
          >
            {/* Left label (Contract) */}
            <span className="text-4xl font-bold text-slate-900 select-none" style={{ fontFamily: 'Archivo, sans-serif' }}>−</span>
            
            {/* Center indicator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-slate-300 rounded-full"></div>
            
            {/* Right label (Expand) */}
            <span className="text-4xl font-bold text-slate-900 select-none" style={{ fontFamily: 'Archivo, sans-serif' }}>+</span>
            
            {/* Draggable handle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-16 h-14 bg-white rounded-full shadow-md border border-slate-300 cursor-grab active:cursor-grabbing flex items-center justify-center"
              style={{ 
                left: `calc(50% + ${sliderPosition}px - 32px)`,
                backgroundColor: sliderPosition < -50 ? '#ef4444' : sliderPosition > 50 ? '#3b82f6' : '#ffffff'
              }}
              animate={{ 
                scale: isDragging ? 1.1 : 1,
                x: isDragging ? 0 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onMouseDown={handleSliderStart}
              onTouchStart={handleSliderStart}
              whileTap={{ scale: 1.1 }}
            >
              {/* Handle icon */}
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>

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

    </div>
  )
}
