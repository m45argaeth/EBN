"use client"

import * as React from "react"
import { Binary, Grid3x3 } from "lucide-react"

import { cn } from "@/lib/utils"
import { rgbToHex, type ImageProbe, type PixelSample } from "@/lib/image-utils"
import { Arrow, StageCard } from "./breakdown-ui"

const ZOOM = 5 // odd so there is a clear center pixel

interface PixelNumbersProps {
  src: string
  probe: ImageProbe
  /** Word shown on the arrow between pixels and numbers. */
  label?: string
}

/** Shared "Pixels -> Numbers" interactive breakdown used by images and video. */
export function PixelNumbers({ src, probe }: PixelNumbersProps) {
  const [point, setPoint] = React.useState<{ x: number; y: number } | null>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    setPoint(null)
  }, [src])

  const activePoint = point ?? {
    x: Math.floor(probe.stats.width / 2),
    y: Math.floor(probe.stats.height / 2),
  }

  const grid = React.useMemo<PixelSample[]>(
    () => probe.sampleGrid(activePoint.x, activePoint.y, ZOOM),
    [probe, activePoint.x, activePoint.y],
  )
  const centerIndex = Math.floor(grid.length / 2)
  const center = grid.length ? grid[centerIndex] : null

  const handlePointer = (e: React.PointerEvent<HTMLImageElement>) => {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    setPoint({
      x: Math.round(relX * probe.stats.width),
      y: Math.round(relY * probe.stats.height),
    })
  }

  return (
    <>
      <StageCard
        icon={Grid3x3}
        title="Pixels"
        hint="Tap the image to zoom into a 5×5 patch of pixels."
      >
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative overflow-hidden rounded-lg border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="Preview"
              onPointerDown={handlePointer}
              onPointerMove={(e) => {
                if (e.buttons === 1 || e.pointerType === "touch") handlePointer(e)
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
    </>
  )
}
