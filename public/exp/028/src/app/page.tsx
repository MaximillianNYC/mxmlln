"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface WindowState {
  id: number;
  x: number;
  y: number;
  scale: number;
  initialX: number; // Always the center X
  initialY: number; // Always the center Y
  initialScale: number; // Always the starting scale (0.3)
  targetX: number;
  targetY: number;
  targetScale: number;
  progress: number;
  duration: number;
  startTime: number;
}

export default function Page() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowIdRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Generate evenly distributed points around the viewport perimeter for optimal spacing
  const getDistributedEdgePoint = useCallback((index: number, totalWindows: number): { x: number; y: number } => {
    const viewportWidth = window.innerWidth || 1920;
    const viewportHeight = window.innerHeight || 1080;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // Window dimensions (accounting for max scale)
    const maxWindowWidth = 380 * 5.1; // Account for max scale ~5.1
    const maxWindowHeight = 260 * 5.1;
    
    // Calculate the minimum distance needed to ensure windows fully exit
    const minDistance = Math.sqrt(
      Math.pow(viewportWidth / 2, 2) + Math.pow(viewportHeight / 2, 2)
    ) + Math.max(maxWindowWidth / 2, maxWindowHeight / 2) + 500;
    
    // Distribute windows evenly around 360 degrees
    // Start at 0 degrees (top) and distribute clockwise
    const angleStep = (2 * Math.PI) / totalWindows;
    const angle = index * angleStep;
    
    // Calculate point at this angle, far beyond the viewport
    const distance = minDistance + 300; // Add extra padding
    const targetX = centerX + Math.cos(angle) * distance;
    const targetY = centerY + Math.sin(angle) * distance;
    
    return { x: targetX, y: targetY };
  }, []);

  // Create a new window at the center
  const createWindow = useCallback((index: number, totalWindows: number) => {
    const viewportWidth = window.innerWidth || 1920;
    const viewportHeight = window.innerHeight || 1080;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    const edgePoint = getDistributedEdgePoint(index, totalWindows);
    
    // Calculate distance from center to edge for scale factor
    const distance = Math.sqrt(
      Math.pow(edgePoint.x - centerX, 2) + Math.pow(edgePoint.y - centerY, 2)
    );
    const maxDistance = Math.sqrt(
      Math.pow(viewportWidth / 2, 2) + Math.pow(viewportHeight / 2, 2)
    ) || 1; // Prevent division by zero
    
    // Scale from 0.3 at center to much larger at edges (4x more growth)
    const targetScale = 0.3 + (distance / maxDistance) * 4.8;
    
    // Consistent duration for all windows to prevent z-index shifting (5x faster)
    const duration = 56000; // 56 seconds (~1 minute) - same for all windows, 5x faster
    
    const newWindow: WindowState = {
      id: windowIdRef.current++,
      x: centerX, // Current position (starts at center)
      y: centerY, // Current position (starts at center)
      scale: 0.3, // Current scale (starts small)
      initialX: centerX, // Store the center - never changes
      initialY: centerY, // Store the center - never changes
      initialScale: 0.3, // Store starting scale - never changes
      targetX: edgePoint.x,
      targetY: edgePoint.y,
      targetScale,
      progress: 0,
      duration,
      startTime: Date.now(),
    };
    
    return newWindow;
  }, [getDistributedEdgePoint]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      
      setWindows((prevWindows) => {
        // Update existing windows and remove completed ones
        const updatedWindows = prevWindows
          .map((win) => {
            const elapsed = now - win.startTime;
            const newProgress = Math.min(elapsed / win.duration, 1);
            
            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - newProgress, 3);
            
            // Always interpolate from the initial center position, not from current position
            const newX = win.initialX + (win.targetX - win.initialX) * eased;
            const newY = win.initialY + (win.targetY - win.initialY) * eased;
            // Always interpolate from initial scale, not from current scale
            const newScale = win.initialScale + (win.targetScale - win.initialScale) * eased;
            
            // If window reached its target, mark it for removal
            if (newProgress >= 1) {
              return null;
            }
            
            // Safety check: filter out invalid positions
            if (!isFinite(newX) || !isFinite(newY) || !isFinite(newScale)) {
              return null;
            }
            
            return {
              ...win,
              x: newX,
              y: newY,
              scale: newScale,
              progress: newProgress,
            };
          })
          .filter((win): win is WindowState => win !== null);
        
        return updatedWindows;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Create all windows immediately on load
  useEffect(() => {
    const now = Date.now();
    const totalWindows = 10; // Total number of windows to create
    const initialWindows: WindowState[] = [];
    
    // Stagger windows slightly for better visual distribution (spread over 50ms)
    const staggerDuration = 50; // 50ms total spread - windows start almost simultaneously
    
    for (let i = 0; i < totalWindows; i++) {
      const window = createWindow(i, totalWindows);
      // Distribute start times evenly over the stagger duration
      const staggerProgress = i / (totalWindows - 1); // 0 to 1
      window.startTime = now + staggerProgress * staggerDuration;
      initialWindows.push(window);
    }
    
    setWindows(initialWindows);
  }, [createWindow]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-[var(--n3)]"
      style={{ minHeight: "100dvh", position: "relative" }}
    >
      {windows
        .filter((win) => isFinite(win.x) && isFinite(win.y) && isFinite(win.scale))
        .map((win) => (
          <div
            key={win.id}
            className="absolute"
            style={{
              left: win.x,
              top: win.y,
              transform: `translate(-50%, -50%) scale(${win.scale})`,
              width: "380px",
              height: "260px",
              pointerEvents: "none",
              zIndex: win.id, // Use window ID as consistent z-index
            }}
          >
            <img
              src="/Browser%20Window.png"
              alt="Browser Window"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
    </div>
  );
}

