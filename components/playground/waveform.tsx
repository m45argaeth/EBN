"use client"

import * as React from "react"

interface WaveformProps {
  peaks: number[]
}

/** Lightweight canvas waveform that adapts to the current theme color. */
export function Waveform({ peaks }: WaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const mid = height / 2

    ctx.clearRect(0, 0, width, height)

    const color = getComputedStyle(canvas).color || "#171717"
    const barCount = peaks.length
    const gap = 1
    const barWidth = Math.max(1, width / barCount - gap)

    ctx.fillStyle = color
    for (let i = 0; i < barCount; i++) {
      const x = i * (width / barCount)
      const amp = peaks[i]
      const h = Math.max(1, amp * (height * 0.9))
      ctx.fillRect(x, mid - h / 2, barWidth, h)
    }
  }, [peaks])

  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <canvas
        ref={canvasRef}
        className="h-32 w-full text-primary"
        role="img"
        aria-label="Audio waveform visualization"
      />
    </div>
  )
}
