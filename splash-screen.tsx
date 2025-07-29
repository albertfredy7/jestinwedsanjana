"use client"

import { useEffect, useState } from "react"

export default function Component() {
  const [startFill, setStartFill] = useState(false)

  useEffect(() => {
    // Start filling animation after 1 second
    const timer = setTimeout(() => {
      setStartFill(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-900">
      <div className="relative">
        <svg width="300" height="150" viewBox="0 0 300 150">
          <defs>
            {/* Mask to clip the fill to letter shapes */}
            <mask id="letterMask">
              <rect width="300" height="150" fill="black" />
              <text
                x="150"
                y="110"
                fontSize="100"
                fontFamily="Georgia, serif"
                fontWeight="bold"
                textAnchor="middle"
                fill="white"
              >
                JA
              </text>
            </mask>

            {/* Wavy pattern for organic fill */}
            <pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q25,0 50,10 T100,10 V20 H0 Z" fill="#FFD700" opacity="0.8" />
            </pattern>
          </defs>

          {/* Letter outlines - always visible */}
          <text
            x="150"
            y="110"
            fontSize="100"
            fontFamily="Georgia, serif"
            fontWeight="bold"
            textAnchor="middle"
            fill="none"
            stroke="#FFD700"
            strokeWidth="3"
          >
            JA
          </text>

          {/* Fluid fill */}
          <rect
            width="300"
            height="150"
            fill="#FFD700"
            mask="url(#letterMask)"
            style={{
              transform: startFill ? "translateY(0%)" : "translateY(100%)",
              transition: "transform 2s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          />

          {/* Secondary wave layer for more organic feel */}
          <rect
            width="300"
            height="140"
            fill="rgba(255, 165, 0, 0.6)"
            mask="url(#letterMask)"
            style={{
              transform: startFill ? "translateY(5%)" : "translateY(105%)",
              transition: "transform 2.2s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s",
            }}
          />

          {/* Top wave layer */}
          <rect
            width="300"
            height="130"
            fill="rgba(255, 140, 0, 0.4)"
            mask="url(#letterMask)"
            style={{
              transform: startFill ? "translateY(10%)" : "translateY(110%)",
              transition: "transform 2.4s cubic-bezier(0.4, 0.0, 0.2, 1) 0.4s",
            }}
          />
        </svg>

        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 blur-sm opacity-50"
          style={{
            background: startFill ? "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)" : "transparent",
            transition: "background 1s ease-in-out 1.5s",
          }}
        />
      </div>
    </div>
  )
}
