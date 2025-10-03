'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Microscope, Telescope, MoveHorizontal } from 'lucide-react'

interface ArticleContentProps {
  initialContent: string
}

export const ArticleContent = ({ initialContent }: ArticleContentProps) => {
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeButton, setActiveButton] = useState<'expand' | 'contract' | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const glassHandleRef = useRef<any>(null)

  const handleRewrite = async (operation: 'expand' | 'contract') => {
    if (!content.trim()) {
      setError(`Please enter some text to ${operation}.`)
      setTimeout(() => setError(null), 3000)
      return
    }
    
    setIsLoading(true)
    setError(null)
    setActiveButton(operation)
    
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

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let result = ''
      
      // Clear content and start streaming
      setContent('')
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setContent(result)
      }
      
    } catch (error) {
      console.error(`Error ${operation}ing text:`, error)
      setError(`Failed to ${operation} text. Please try again.`)
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
      setActiveButton(null)
      setSliderPosition(0) // Snap back to center when done loading
    }
  }

  const handleExpand = () => handleRewrite('expand')
  const handleContract = () => handleRewrite('contract')

  // Auto-resize textarea based on content
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [])

  // Update textarea height when content changes
  React.useEffect(() => {
    autoResize()
  }, [content, autoResize])

  // Build and inject displacement map
  React.useEffect(() => {
    const buildDisplacementImage = () => {
      const config = {
        width: 64,
        height: 64,
        radius: 32,
        border: 0.07,
        lightness: 50,
        alpha: 0.93,
        blur: 11,
        blend: 'difference'
      }
      
      const border = Math.min(config.width, config.height) * (config.border * 0.5)
      const svgContent = `
        <svg viewBox="0 0 ${config.width} ${config.height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="red"/>
            </linearGradient>
            <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="black"/>
          <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#red)" />
          <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
          <rect x="${border}" y="${border}" width="${config.width - border * 2}" height="${config.height - border * 2}" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
        </svg>
      `
      
      const encoded = encodeURIComponent(svgContent)
      const dataUri = `data:image/svg+xml,${encoded}`
      
      const feImage = document.querySelector('#glass-displacement feImage')
      if (feImage) {
        feImage.setAttribute('href', dataUri)
        console.log('Displacement map injected:', dataUri.substring(0, 100) + '...')
        console.log('feImage href attribute:', feImage.getAttribute('href'))
      } else {
        console.error('feImage element not found')
      }
    }
    
    buildDisplacementImage()
  }, [])


  // Update light position based on slider position
  React.useEffect(() => {
    const updateLightPosition = () => {
      const pointLight = document.getElementById('point-light')
      const sliderLight = document.getElementById('slider-light')
      
      if (pointLight && sliderLight) {
        // Calculate light position based on slider position
        const lightX = 128 + sliderPosition * 1.5 // Adjust multiplier for sensitivity
        
        pointLight.setAttribute('x', lightX.toString())
        sliderLight.setAttribute('lightingColor', '#06b6d4')
      }
    }
    
    updateLightPosition()
  }, [sliderPosition])

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
    if (isLoading || activeButton) return
    setIsDragging(true)
    event.preventDefault()
  }, [isLoading, activeButton])

  const handleSliderEnd = useCallback(() => {
    if (!isDragging) return
    
    const threshold = 50 // Minimum distance to trigger action
    
      if (Math.abs(sliderPosition) > threshold) {
      if (sliderPosition < -threshold) {
        handleContract()
        setSliderPosition(-82) // Center over contract icon (Microscope at 48px center)
      } else if (sliderPosition > threshold) {
        handleExpand()
        setSliderPosition(82) // Center over expand icon (Telescope at 216px center)
      }
    } else {
      // If not enough distance, reset to center
      setSliderPosition(0)
    }
    
    setIsDragging(false)
    // Don't snap back to center - stay positioned
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
        className={`w-full min-h-[200px] resize-none text-lg leading-relaxed bg-transparent border-none outline-none pb-20 ${
          isLoading ? 'loading-text' : 'text-slate-900'
        }`}
        placeholder="Type or paste text to apply semantic zoom..."
        autoFocus
        disabled={isLoading}
        style={{ height: 'auto' }}
      />

      {/* SVG Lighting Filter Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="lighting" x="-50%" y="-50%" width="200%" height="200%">
            <feSpecularLighting
              id="slider-light"
              specularConstant="8"
              specularExponent="120"
              surfaceScale="2"
              lightingColor="#06b6d4"
            >
              <fePointLight
                id="point-light"
                x="128"
                y="48"
                z="100"
              />
            </feSpecularLighting>
            <feComposite
              in="SourceGraphic"
              in2="specOut"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
            />
          </filter>
          
          {/* Glass Displacement Filter */}
          <filter id="glass-displacement" colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="map"
            />
            {/* RED channel with strongest displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispRed"
              scale="0"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />
            {/* GREEN channel (reference / least displaced) */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispGreen"
              scale="10"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />
            {/* BLUE channel with medium displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              xChannelSelector="R"
              yChannelSelector="G"
              result="dispBlue"
              scale="20"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />
            {/* Blend channels back together */}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            {/* output blend */}
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
          
        </defs>
      </svg>

      {/* Fixed slider control at bottom */}
      <div 
        className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out" 
        style={{ 
          zIndex: 9999,
          bottom: content.trim() ? '40px' : '-100px'
        }}
      >
        <div 
          ref={sliderRef}
          className={`glass-container relative w-[264px] h-24 rounded-full flex items-center justify-between px-4 bg-white border border-slate-200 ${
            isLoading || activeButton ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{
            '--border': '2',
            position: 'relative'
          } as React.CSSProperties}
        >
          {/* Lighting border effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: `calc(var(--border) * 1px) solid transparent`,
              background: 'transparent',
              mask: 'linear-gradient(transparent 0 100%) padding-box, linear-gradient(#fff 0 100%) border-box',
              maskComposite: 'intersect',
              filter: 'url(#lighting)'
            }}
          />
          
          {}
          <div className="w-[64px] h-[64px] flex items-center justify-center bg-slate-100 rounded-full">
            <Microscope className="w-[24px] h-[24px] text-slate-800" strokeWidth={2} />
          </div>
          
          {/* Center indicator */}
          <div className="w-[64px] h-[64px] flex items-center justify-center">
            <MoveHorizontal className="w-[24px] h-[24px] text-slate-800" strokeWidth={2} />
          </div>
          
          {}
          <div className="w-[64px] h-[64px] flex items-center justify-center bg-slate-100 rounded-full">
            <Telescope className="w-[24px] h-[24px] text-slate-800" strokeWidth={2} />
          </div>
          
        {/* Glass handle with displacement effect */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-16 h-16 ${
            isLoading || activeButton ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
          }`}
          style={{ 
            left: `calc(50% + ${sliderPosition}px - 32px)`,
            zIndex: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'url(#glass-displacement) blur(2px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 4px 16px rgba(0, 0, 0, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.05)
            `
          }}
          onMouseDown={handleSliderStart}
          onTouchStart={handleSliderStart}
        />
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
