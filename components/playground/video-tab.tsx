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
import { explain } from "@/lib/explanations"
import { formatFull, formatDuration } from "@/lib/format"
import { exampleToFile, findExample, randomExample } from "@/lib/examples"

export function VideoTab({ initialExampleId }: { initialExampleId?: string }) {
  const [stats, setStats] = React.useState<VideoStats | null>(null)
  const [filename, setFilename] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

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
      setError("That file is not a video. Please choose an MP4 or WebM file.")
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
      setError((err as Error).message || "Could not process this video file.")
      toast.error("Could not process this video file")
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
      setError((err as Error).message || "Could not load example.")
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
        label="Drop a video file here"
        hint="MP4, WebM, MOV — analyzed entirely in your browser."
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
              title={`Video: ${filename}`}
              onReset={reset}
              stats={ {
                Duration: formatDuration(stats.duration),
                FPS: stats.fps,
                Resolution: `${stats.width}×${stats.height}`,
                "Frame Count": formatFull(stats.frameCount),
                "Estimated Numeric Values": formatFull(stats.estimatedValues),
              } }
            />
          </div>

          <video
            controls
            src={stats.objectUrl}
            className="max-h-[420px] w-full rounded-xl border bg-black"
          >
            Your browser does not support the video element.
          </video>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Duration" value={formatDuration(stats.duration)} />
            <StatCard
              label="FPS"
              value={stats.fps}
              hint={stats.fpsEstimated ? "assumed" : "measured"}
            />
            <StatCard label="Resolution" value={`${stats.width}×${stats.height}`} />
            <StatCard
              label="Est. Frame Count"
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
            unitSentence="numbers — images played in sequence."
          />

          <p className="text-center text-xs text-muted-foreground">
            frames ({formatFull(stats.frameCount)}) × width ({stats.width}) × height ({stats.height}) ×
            channels ({stats.channels})
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
