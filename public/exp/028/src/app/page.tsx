"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import BrowserWindow from "@/components/BrowserWindow";

interface WindowState {
  id: number;
  x: number;
  y: number;
  scale: number;
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

  // Generate a random point beyond the edge of the viewport to ensure windows fully escape
  const getRandomEdgePoint = useCallback((): { x: number; y: number } => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Window dimensions (accounting for max scale ~1.5)
    const maxWindowWidth = 380 * 1.5; // 570px
    const maxWindowHeight = 260 * 1.5; // 390px
    
    // Offset to ensure windows fully exit (half window size + padding)
    const offsetX = maxWindowWidth / 2 + 500;
    const offsetY = maxWindowHeight / 2 + 500;
    
    // Randomly choose which edge (0: top, 1: right, 2: bottom, 3: left)
    const edge = Math.floor(Math.random() * 4);
    
    switch (edge) {
      case 0: // Top edge - exit above
        return { x: Math.random() * viewportWidth, y: -offsetY };
      case 1: // Right edge - exit to the right
        return { x: viewportWidth + offsetX, y: Math.random() * viewportHeight };
      case 2: // Bottom edge - exit below
        return { x: Math.random() * viewportWidth, y: viewportHeight + offsetY };
      case 3: // Left edge - exit to the left
        return { x: -offsetX, y: Math.random() * viewportHeight };
      default:
        return { x: viewportWidth / 2, y: viewportHeight / 2 };
    }
  }, []);

  // Create a new window at the center
  const createWindow = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    const edgePoint = getRandomEdgePoint();
    
    // Calculate distance from center to edge for scale factor
    const distance = Math.sqrt(
      Math.pow(edgePoint.x - centerX, 2) + Math.pow(edgePoint.y - centerY, 2)
    );
    const maxDistance = Math.sqrt(
      Math.pow(viewportWidth / 2, 2) + Math.pow(viewportHeight / 2, 2)
    );
    
    // Scale from 0.3 at center to 1.5+ at edges
    const targetScale = 0.3 + (distance / maxDistance) * 1.2;
    
    // Slower duration - slightly randomized for natural feel
    const duration = 6000 + Math.random() * 2000; // 6-8 seconds
    
    const newWindow: WindowState = {
      id: windowIdRef.current++,
      x: centerX,
      y: centerY,
      scale: 0.3,
      targetX: edgePoint.x,
      targetY: edgePoint.y,
      targetScale,
      progress: 0,
      duration,
      startTime: Date.now(),
    };
    
    return newWindow;
  }, [getRandomEdgePoint]);

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
            
            const newX = win.x + (win.targetX - win.x) * eased;
            const newY = win.y + (win.targetY - win.y) * eased;
            const newScale = win.scale + (win.targetScale - win.scale) * eased;
            
            // If window reached its target, mark it for removal
            if (newProgress >= 1) {
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

  // Spawn windows at regular intervals for steady stream
  useEffect(() => {
    // Spawn interval - create a new window more frequently for more windows
    const spawnInterval = 200 + Math.random() * 100; // 200-300ms
    
    // Create initial windows to start the stream
    const initialWindows: WindowState[] = [];
    const initialCount = 20; // Increased initial count
    for (let i = 0; i < initialCount; i++) {
      const window = createWindow();
      // Stagger initial windows evenly
      window.startTime = Date.now() - (initialCount - i) * spawnInterval;
      initialWindows.push(window);
    }
    setWindows(initialWindows);
    
    // Continue spawning new windows at regular intervals
    const spawnTimer = setInterval(() => {
      setWindows((prevWindows) => {
        // Increased max windows limit
        if (prevWindows.length < 50) {
          return [...prevWindows, createWindow()];
        }
        return prevWindows;
      });
    }, spawnInterval);
    
    return () => {
      clearInterval(spawnTimer);
    };
  }, [createWindow]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-[var(--n3)]"
      style={{ minHeight: "100dvh", position: "relative" }}
    >
      {windows.map((win) => (
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
            zIndex: Math.floor(win.scale * 10),
          }}
        >
          <BrowserWindow />
        </div>
      ))}
    </div>
  );
}

