"use client"

import type { ImageProbe } from "@/lib/image-utils"
import { PixelNumbers } from "./pixel-numbers"

export function ImageBreakdown({ probe }: { probe: ImageProbe }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-medium">See it happen</span>
        <span className="text-xs text-muted-foreground">
          pixels, and the numbers behind them.
        </span>
      </div>
      <PixelNumbers src={probe.stats.objectUrl} probe={probe} />
    </div>
  )
}
