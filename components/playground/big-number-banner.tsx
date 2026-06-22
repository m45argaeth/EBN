import { BigNumber } from "@/components/big-number"
import { formatCompact } from "@/lib/format"

interface BigNumberBannerProps {
  value: number
  unitSentence: string // e.g. "numerical values."
}

/**
 * The "To a computer, this is approximately X ..." hero banner shown for each
 * analyzed file.
 */
export function BigNumberBanner({ value, unitSentence }: BigNumberBannerProps) {
  return (
    <div className="rounded-2xl border bg-gradient-to-b from-muted/40 to-background p-8 text-center">
      <p className="text-sm text-muted-foreground">To a computer, this is approximately</p>
      <p className="mt-2 break-words text-4xl font-bold tracking-tight sm:text-5xl">
        <BigNumber value={value} />
      </p>
      <p className="mt-2 text-base text-muted-foreground">
        {unitSentence} <span className="text-foreground">({formatCompact(value)})</span>
      </p>
    </div>
  )
}
