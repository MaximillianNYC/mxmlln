"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextAnimateProps {
  children: string
  animation?: "blurInUp" | "blurInDown" | "blurInLeft" | "blurInRight"
  by?: "character" | "word"
  once?: boolean
  className?: string
}

const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "character",
  once = false,
  className = "",
}: TextAnimateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrambledText, setScrambledText] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [once])

  useEffect(() => {
    if (isVisible) {
      const splitText = by === "character" ? children.split("") : children.split(" ")
      setScrambledText(splitText.map(() => randomChars[Math.floor(Math.random() * randomChars.length)]))

      let iterations = 0
      const maxIterations = 10
      const interval = 50

      const animate = () => {
        setScrambledText(prev => 
          prev.map((_, index) => {
            if (iterations >= maxIterations) {
              return splitText[index]
            }
            return randomChars[Math.floor(Math.random() * randomChars.length)]
          })
        )

        iterations++
        if (iterations < maxIterations) {
          animationRef.current = window.setTimeout(animate, interval)
        }
      }

      animationRef.current = window.setTimeout(animate, interval)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isVisible, children, by])

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
      },
    }

    const directionVariants = {
      blurInUp: {
        hidden: { ...baseVariants.hidden, y: 20 },
        visible: { ...baseVariants.visible, y: 0 },
      },
      blurInDown: {
        hidden: { ...baseVariants.hidden, y: -20 },
        visible: { ...baseVariants.visible, y: 0 },
      },
      blurInLeft: {
        hidden: { ...baseVariants.hidden, x: 20 },
        visible: { ...baseVariants.visible, x: 0 },
      },
      blurInRight: {
        hidden: { ...baseVariants.hidden, x: -20 },
        visible: { ...baseVariants.visible, x: 0 },
      },
    }

    return directionVariants[animation]
  }

  const splitText = by === "character" ? children.split("") : children.split(" ")

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      <AnimatePresence>
        {isVisible && (
          <>
            {splitText.map((char, index) => (
              <motion.span
                key={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={getAnimationVariants()}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="inline-block"
              >
                {scrambledText[index] || char}
                {by === "character" && char === " " && <span>&nbsp;</span>}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 