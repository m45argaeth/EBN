"use client"

import * as React from "react"
import { Binary, Grid3x3, Image as ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { extractVideoFrames, type VideoFrame } from "@/lib/video-frames"
import { rgbToHex, type PixelSample } from "@/lib/image-utils"

const ZOOM = 5 // odd so there is a clear center pixel
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
  const [point, setPoint] = React.useState<{ x: number; y: number } | null>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setPoint(null)
    extractVideoFrames(objectUrl, FRAME_COUNT, duration, channels)
      .then((result) => {
        if (cancelled) return
        setFrames(result)
        setSelected(Math.floor(result.length / 2))
        setLoading(false)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message || "Could not break this video into frames.")
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [objectUrl, duration, channels])

  const frame = frames[selected]

  const activePoint = React.useMemo(() => {
    if (!frame) return null
    if (point) return point
    return {
      x: Math.floor(frame.probe.stats.width / 2),
      y: Math.floor(frame.probe.stats.height / 2),
    }
  }, [frame, point])

  const grid = React.useMemo<PixelSample[]>(() => {
    if (!frame || !activePoint) return []
    return frame.probe.sampleGrid(activePoint.x, activePoint.y, ZOOM)
  }, [frame, activePoint])

  const center = grid.length ? grid[Math.floor(grid.length / 2)] : null
  const centerIndex = Math.floor(grid.length / 2)

  const handlePointer = (e: React.PointerEvent<HTMLImageElement>) => {
    const img = imgRef.current
    if (!img || !frame) return
    const rect = img.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    const x = Math.round(relX * frame.probe.stats.width)
    const y = Math.round(relY * frame.probe.stats.height)
    setPoint({ x, y })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-medium">See it happen</span>
        <span className="text-xs text-muted-foreground">
          frames, pixels, and the numbers behind them.
        </span>
      </div>

      {loading ? (
        <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
          Breaking the video into frames…
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : frame ? (
        <div className="space-y-3">
          <StageCard
            icon={ImageIcon}
            title="Frames"
            hint="The video is just a sequence of these. Pick one."
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {frames.map((f) => (
                <button
                  key={f.index}
                  onClick={() => {
                    setSelected(f.index)
                    setPoint(null)
                  }}
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

          <StageCard
            icon={Grid3x3}
            title="Pixels"
            hint="Tap the frame to zoom into a 5×5 patch of pixels."
          >
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div className="relative overflow-hidden rounded-lg border bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={frame.dataUrl}
                  alt="Selected frame"
                  onPointerDown={handlePointer}
                  onPointerMove={(e) => {
                    if (e.buttons === 1 || e.pointerType === "touch")
                      handlePointer(e)
                  }}
                  className="mx-auto max-h-[280px] w-auto cursor-crosshair touch-none object-contain"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  className="grid h-[150px] w-[150px] overflow-hidden rounded-md border"
                  style={ { gridTemplateColumns: `repeat(${ZOOM}, 1fr)` } }
                >
                  {grid.map((p, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-full w-full",
                        i === centerIndex && "ring-2 ring-inset ring-primary",
                      )}
                      style={ { backgroundColor: `rgb(${p.r}, ${p.g}, ${p.b})` } }
                    />
                  ))}
                </div>
                {center ? (
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className="h-5 w-5 rounded border"
                      style={ {
                        backgroundColor: `rgb(${center.r}, ${center.g}, ${center.b})`,
                      } }
                    />
                    {rgbToHex(center.r, center.g, center.b)}
                  </div>
                ) : null}
              </div>
            </div>
          </StageCard>

          <Arrow label="becomes" />

          <StageCard
            icon={Binary}
            title="Numbers"
            hint="Every pixel is just three numbers — red, green, blue (0–255)."
          >
            <div
              className="grid gap-1"
              style={ { gridTemplateColumns: `repeat(${ZOOM}, 1fr)` } }
            >
              {grid.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col items-center rounded border bg-card py-1 font-mono text-[9px] leading-tight",
                    i === centerIndex && "ring-1 ring-primary",
                  )}
                >
                  <span className="text-red-500">{p.r}</span>
                  <span className="text-green-600">{p.g}</span>
                  <span className="text-blue-500">{p.b}</span>
                </div>
              ))}
            </div>
          </StageCard>
        </div>
      ) : null}
    </div>
  )
}

function StageCard({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
      <span className="text-xl leading-none">↓</span>
      {label ? (
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      ) : null}
    </div>
  )
}
