"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formatFull } from "@/lib/format"

interface BigNumberProps {
  value: number
  className?: string
  durationMs?: number
}

/** Animated count-up for the headline "big number" stats. */
export function BigNumber({ value, className, durationMs = 900 }: BigNumberProps) {
  const [display, setDisplay] = React.useState(0)
  const rafRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const start = performance.now()
    const from = 0
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(from + (value - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, durationMs])

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {formatFull(display)}
    </span>
  )
}
