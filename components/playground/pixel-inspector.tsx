"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { rgbToHex, type ImageProbe, type PixelSample } from "@/lib/image-utils"

interface PixelInspectorProps {
  src: string
  probe: ImageProbe
}

const GRID = 9 // odd number so there is a clear center pixel

export function PixelInspector({ src, probe }: PixelInspectorProps) {
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [hover, setHover] = React.useState<PixelSample | null>(null)
  const [grid, setGrid] = React.useState<PixelSample[]>([])

  const handleMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height
    const x = relX * probe.stats.width
    const y = relY * probe.stats.height
    const sample = probe.sample(x, y)
    if (sample) {
      setHover(sample)
      setGrid(probe.sampleGrid(sample.x, sample.y, GRID))
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_240px]">
      <div className="relative overflow-hidden rounded-xl border bg-muted/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="Uploaded preview"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
          className="mx-auto max-h-[420px] w-auto cursor-crosshair object-contain"
        />
        {hover ? (
          <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-background/90 px-3 py-2 font-mono text-xs shadow-md backdrop-blur">
            <div>
              ({hover.x}, {hover.y})
            </div>
            <div>
              R {hover.r} · G {hover.g} · B {hover.b}
              {probe.stats.hasAlpha ? ` · A ${hover.a}` : ""}
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border p-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Pixel zoom
        </p>
        {hover ? (
          <>
            <div
              className="grid overflow-hidden rounded-md border"
              style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
            >
              {grid.map((p, i) => {
                const isCenter = i === Math.floor(grid.length / 2)
                return (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square",
                      isCenter && "ring-2 ring-inset ring-primary",
                    )}
                    style={{ backgroundColor: `rgb(${p.r}, ${p.g}, ${p.b})` }}
                  />
                )
              })}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className="h-6 w-6 rounded border"
                style={{
                  backgroundColor: `rgb(${hover.r}, ${hover.g}, ${hover.b})`,
                }}
              />
              <span className="font-mono text-xs">
                {rgbToHex(hover.r, hover.g, hover.b)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Hover over the image to inspect individual pixels.
          </p>
        )}
      </div>
    </div>
  )
}
