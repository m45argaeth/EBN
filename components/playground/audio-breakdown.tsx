"use client"

import * as React from "react"
import { Activity, AudioLines, Binary } from "lucide-react"

import { extractAudioSamples, type AudioSampleData } from "@/lib/audio-samples"
import { formatDuration } from "@/lib/format"
import { Arrow, StageCard } from "./breakdown-ui"

const WINDOW = 16

interface AudioBreakdownProps {
  objectUrl: string
  peaks: number[]
}

export function AudioBreakdown({ objectUrl, peaks }: AudioBreakdownProps) {
  const [data, setData] = React.useState<AudioSampleData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [index, setIndex] = React.useState(0)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    extractAudioSamples(objectUrl)
      .then((result) => {
        if (cancelled) return
        setData(result)
        setIndex(Math.floor(result.length / 2))
        setLoading(false)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message || "Could not read audio samples.")
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [objectUrl])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data) return
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
    ctx.fillStyle = color
    ctx.globalAlpha = 0.5
    for (let i = 0; i < barCount; i++) {
      const x = i * (width / barCount)
      const h = Math.max(1, peaks[i] * (height * 0.9))
      ctx.fillRect(x, mid - h / 2, Math.max(1, width / barCount - 1), h)
    }
    ctx.globalAlpha = 1

    const cx = (index / Math.max(1, data.length - 1)) * width
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(cx - 1, 0, 2, height)
  }, [data, peaks, index])

  const pickFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !data) return
    const rect = canvas.getBoundingClientRect()
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setIndex(Math.round(frac * (data.length - 1)))
  }

  const windowSamples = React.useMemo(() => {
    if (!data) return [] as number[]
    const half = Math.floor(WINDOW / 2)
    const start = Math.min(
      Math.max(0, index - half),
      Math.max(0, data.length - WINDOW),
    )
    const out: number[] = []
    for (let i = 0; i < WINDOW && start + i < data.length; i++) {
      out.push(data.data[start + i])
    }
    return out
  }, [data, index])

  const time = data ? index / data.sampleRate : 0

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-medium">See it happen</span>
        <span className="text-xs text-muted-foreground">
          samples, and the numbers behind them.
        </span>
      </div>

      {loading ? (
        <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
          Reading audio samples…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : data ? (
        <div className="space-y-3">
          <StageCard
            icon={AudioLines}
            title="Waveform"
            hint="Tap the wave to inspect a moment in time."
          >
            <canvas
              ref={canvasRef}
              onPointerDown={pickFromEvent}
              onPointerMove={(e) => {
                if (e.buttons === 1 || e.pointerType === "touch")
                  pickFromEvent(e)
              }}
              className="h-28 w-full cursor-crosshair touch-none text-primary"
              role="img"
              aria-label="Interactive audio waveform"
            />
            <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
              t = {formatDuration(time)} · sample #{index.toLocaleString("en-US")}
            </p>
          </StageCard>

          <Arrow />

          <StageCard
            icon={Activity}
            title="Samples"
            hint={`${WINDOW} consecutive amplitude readings around that point.`}
          >
            <div className="flex h-24 items-end gap-1">
              {windowSamples.map((v, i) => {
                const h = ((v + 1) / 2) * 100
                return (
                  <div key={i} className="flex-1">
                    <div
                      className="mx-auto w-full rounded-sm bg-primary"
                      style={ { height: `${Math.max(2, Math.min(100, h))}%` } }
                    />
                  </div>
                )
              })}
            </div>
          </StageCard>

          <Arrow label="becomes" />

          <StageCard
            icon={Binary}
            title="Numbers"
            hint="Each sample is one number — the amplitude at that instant."
          >
            <div className="grid grid-cols-4 gap-1 sm:grid-cols-8">
              {windowSamples.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded border bg-card py-1 font-mono text-[10px] leading-tight"
                >
                  <span className="text-primary">{v.toFixed(3)}</span>
                  <span className="text-muted-foreground">
                    {Math.round(v * 32767)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Top: normalized (−1…1). Bottom: 16-bit PCM (−32768…32767).
            </p>
          </StageCard>
        </div>
      ) : null}
    </div>
  )
}
