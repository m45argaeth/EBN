"use client"

import { BigNumber } from "@/components/big-number"
import { useI18n } from "@/lib/i18n"

interface BigNumberBannerProps {
  value: number
  unitSentence: string
}

/**
 * The "To a computer, this is approximately X ..." hero banner shown for each
 * analyzed file.
 */
export function BigNumberBanner({ value, unitSentence }: BigNumberBannerProps) {
  const { t, compact } = useI18n()
  return (
    <div className="rounded-2xl border bg-gradient-to-b from-muted/40 to-background p-8 text-center">
      <p className="text-sm text-muted-foreground">{t.banner.prefix}</p>
      <p className="mt-2 break-words text-4xl font-bold tracking-tight sm:text-5xl">
        <BigNumber value={value} />
      </p>
      <p className="mt-2 text-base text-muted-foreground">
        {unitSentence} <span className="text-foreground">({compact(value)})</span>
      </p>
    </div>
  )
}
