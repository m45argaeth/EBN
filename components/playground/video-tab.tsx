"use client"

import * as React from "react"
import { toast } from "sonner"

import { Dropzone } from "./dropzone"
import { StatCard } from "./stat-card"
import { EducationalNote } from "./educational-note"
import { BigNumberBanner } from "./big-number-banner"
import { ActionButtons } from "./action-buttons"
import { Pipeline } from "./pipeline"
import { VideoBreakdown } from "./video-breakdown"
import { Skeleton } from "@/components/ui/skeleton"
import { analyzeVideo, type VideoStats } from "@/lib/video-utils"
import { formatFull, formatDuration } from "@/lib/format"
import { exampleToFile, findExample, randomExample } from "@/lib/examples"
import { useI18n } from "@/lib/i18n"

export function VideoTab({ initialExampleId }: { initialExampleId?: string }) {
  const [stats, setStats] = React.useState<VideoStats | null>(null)
  const [filename, setFilename] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { t, explain } = useI18n()

  const reset = React.useCallback(() => {
    setStats((prev) => {
      if (prev) URL.revokeObjectURL(prev.objectUrl)
      return null
    })
    setFilename("")
    setError(null)
  }, [])

  React.useEffect(() => () => reset(), [reset])

  const process = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError(t.errors.notVideo)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeVideo(file)
      setStats((prev) => {
        if (prev) URL.revokeObjectURL(prev.objectUrl)
        return result
      })
      setFilename(file.name)
    } catch (err) {
      setError((err as Error).message || t.errors.processVideo)
      toast.error(t.errors.processVideoToast)
    } finally {
      setLoading(false)
    }
  }

  const loadExample = React.useCallback(async (id?: string) => {
    setLoading(true)
    setError(null)
    try {
      const example =
        (id ? findExample("video", id) : undefined) ?? randomExample("video")
      const file = await exampleToFile(example)
      await process(file)
    } catch (err) {
      setError((err as Error).message || t.errors.loadExample)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadRandom = () => loadExample()

  React.useEffect(() => {
    if (initialExampleId) void loadExample(initialExampleId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialExampleId])

  const explanation = stats ? explain("video", stats.estimatedValues, filename) : null

  return (
    <div className="space-y-8">
      <Dropzone
        accept="video/*"
        label={t.dropzone.video.label}
        hint={t.dropzone.video.hint}
        onFile={process}
        onRandom={loadRandom}
        disabled={loading}
      />

      {error ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {loading ? <LoadingState /> : null}

      {!loading && stats && explanation ? (
        <div className="animate-fade-in space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-medium">{filename}</h2>
            <ActionButtons
              title={`${t.media.video}: ${filename}`}
              onReset={reset}
              stats={{
                [t.stats.duration]: formatDuration(stats.duration),
                [t.stats.fps]: stats.fps,
                [t.stats.resolution]: `${stats.width}×${stats.height}`,
                [t.stats.frameCount]: formatFull(stats.frameCount),
                [t.stats.estNumericValues]: formatFull(stats.estimatedValues),
              }}
            />
          </div>

          <video
            controls
            src={stats.objectUrl}
            className="max-h-[420px] w-full rounded-xl border bg-black"
          >
            {t.player.videoFallback}
          </video>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label={t.stats.duration} value={formatDuration(stats.duration)} />
            <StatCard
              label={t.stats.fps}
              value={stats.fps}
              hint={stats.fpsEstimated ? t.stats.assumed : t.stats.measured}
            />
            <StatCard label={t.stats.resolution} value={`${stats.width}×${stats.height}`} />
            <StatCard
              label={t.stats.estFrameCount}
              value={formatFull(stats.frameCount)}
              hint={`${formatDuration(stats.duration)} × ${stats.fps} fps`}
            />
          </div>

          <Pipeline />

          <VideoBreakdown
            objectUrl={stats.objectUrl}
            duration={stats.duration}
            channels={stats.channels}
          />

          <BigNumberBanner
            value={stats.estimatedValues}
            unitSentence={t.banner.video}
          />

          <p className="text-center text-xs text-muted-foreground">
            {t.formula.frames} ({formatFull(stats.frameCount)}) × {t.formula.width} ({stats.width}) × {t.formula.height} ({stats.height}) ×
            {" "}{t.formula.channels} ({stats.channels})
          </p>

          <EducationalNote explanation={explanation} />
        </div>
      ) : null}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[320px] w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
