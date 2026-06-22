"use client"

import * as React from "react"
import { Check, Copy, Share2, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { copyText } from "@/lib/clipboard"
import { useI18n } from "@/lib/i18n"

interface ActionButtonsProps {
  stats: Record<string, string | number>
  title: string
  onReset: () => void
}

export function ActionButtons({ stats, title, onReset }: ActionButtonsProps) {
  const [copied, setCopied] = React.useState(false)
  const { t } = useI18n()

  const statsText = React.useMemo(() => {
    const lines = Object.entries(stats).map(([k, v]) => `${k}: ${v}`)
    return `${title}\n${lines.join("\n")}\n\n${t.actions.via}`
  }, [stats, title, t])

  const handleCopy = async () => {
    try {
      await copyText(statsText)
      setCopied(true)
      toast.success(t.actions.copied)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      toast.error(t.actions.copyError)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "Everything Becomes Numbers",
      text: statsText,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await copyText(`${statsText}\n${shareData.url ?? ""}`.trim())
        toast.success(t.actions.shareCopied)
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        toast.error(t.actions.shareError)
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {t.actions.copyStats}
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
        {t.actions.share}
      </Button>
      <Button variant="ghost" size="sm" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
        {t.actions.reset}
      </Button>
    </div>
  )
}
