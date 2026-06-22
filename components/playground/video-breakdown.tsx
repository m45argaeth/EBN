"use client"

import * as React from "react"
import { Image as ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { extractVideoFrames, type VideoFrame } from "@/lib/video-frames"
import { useI18n } from "@/lib/i18n"
import { Arrow, StageCard } from "./breakdown-ui"
import { PixelNumbers } from "./pixel-numbers"

const FRAME_COUNT = 6

interface VideoBreakdownProps {
  objectUrl: string
  duration: number
  channels: number
}

export function VideoBreakdown({
  objectUrl,
  duration,
  channels,
}: VideoBreakdownProps) {
  const [frames, setFrames] = React.useState<VideoFrame[]>([])
  const [selected, setSelected] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { t } = useI18n()

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    extractVideoFrames(objectUrl, FRAME_COUNT, duration, channels)
      .then((result) => {
        if (cancelled) return
        setFrames(result)
        setSelected(Math.floor(result.length / 2))
        setLoading(false)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message || t.breakdown.breakFramesError)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectUrl, duration, channels])

  const frame = frames[selected]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-medium">{t.breakdown.seeItHappen}</span>
        <span className="text-xs text-muted-foreground">
          {t.breakdown.videoCaption}
        </span>
      </div>

      {loading ? (
        <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
          {t.breakdown.breakingFrames}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : frame ? (
        <div className="space-y-3">
          <StageCard
            icon={ImageIcon}
            title={t.breakdown.framesTitle}
            hint={t.breakdown.framesHint}
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {frames.map((f) => (
                <button
                  key={f.index}
                  onClick={() => setSelected(f.index)}
                  className={cn(
                    "relative shrink-0 overflow-hidden rounded-lg border transition",
                    f.index === selected
                      ? "ring-2 ring-primary"
                      : "opacity-60 hover:opacity-100",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.dataUrl}
                    alt={`Frame ${f.index + 1}`}
                    className="h-16 w-auto"
                  />
                  <span className="absolute bottom-0 right-0 bg-background/80 px-1 font-mono text-[10px]">
                    #{f.index + 1}
                  </span>
                </button>
              ))}
            </div>
          </StageCard>

          <Arrow />

          <PixelNumbers src={frame.dataUrl} probe={frame.probe} />
        </div>
      ) : null}
    </div>
  )
}
