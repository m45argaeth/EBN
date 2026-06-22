"use client"

import type { ImageProbe } from "@/lib/image-utils"
import { useI18n } from "@/lib/i18n"
import { PixelNumbers } from "./pixel-numbers"

export function ImageBreakdown({ probe }: { probe: ImageProbe }) {
  const { t } = useI18n()
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-medium">{t.breakdown.seeItHappen}</span>
        <span className="text-xs text-muted-foreground">
          {t.breakdown.imageCaption}
        </span>
      </div>
      <PixelNumbers src={probe.stats.objectUrl} probe={probe} />
    </div>
  )
}
