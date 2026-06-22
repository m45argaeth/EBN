"use client"

import * as React from "react"
import { toast } from "sonner"

import { Dropzone } from "./dropzone"
import { StatCard } from "./stat-card"
import { Waveform } from "./waveform"
import { AudioBreakdown } from "./audio-breakdown"
import { EducationalNote } from "./educational-note"
import { BigNumberBanner } from "./big-number-banner"
import { ActionButtons } from "./action-buttons"
import { Skeleton } from "@/components/ui/skeleton"
import { analyzeAudio, type AudioStats } from "@/lib/audio-utils"
import { explain } from "@/lib/explanations"
import { formatFull, formatCompact, formatDuration, formatHz } from "@/lib/format"
import { exampleToFile, findExample, randomExample } from "@/lib/examples"

export function AudioTab({ initialExampleId }: { initialExampleId?: string }) {
  const [stats, setStats] = React.useState<AudioStats | null>(null)
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
    if (!file.type.startsWith("audio/")) {
      setError("That file is not audio. Please choose a WAV, MP3, or OGG file.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeAudio(file)
      setStats((prev) => {
        if (prev) URL.revokeObjectURL(prev.objectUrl)
        return result
      })
      setFilename(file.name)
    } catch (err) {
      setError((err as Error).message || "Could not process this audio file.")
      toast.error("Could not process this audio file")
    } finally {
      setLoading(false)
    }
  }

  const loadExample = React.useCallback(async (id?: string) => {
    setLoading(true)
    setError(null)
    try {
      const example =
        (id ? findExample("audio", id) : undefined) ?? randomExample("audio")
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

  const explanation = stats ? explain("audio", stats.estimatedValues, filename) : null

  return (
    <div className="space-y-8">
      <Dropzone
        accept="audio/*"
        label="Drop an audio file here"
        hint="WAV, MP3, OGG, M4A — decoded entirely in your browser."
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
              title={`Audio: ${filename}`}
              onReset={reset}
              stats={ {
                Duration: formatDuration(stats.duration),
                "Sample Rate": formatHz(stats.sampleRate),
                Channels: stats.channels,
                "Total Samples": formatFull(stats.totalSamples),
                "Estimated Amplitude Measurements": formatFull(stats.estimatedValues),
              } }
            />
          </div>

          <audio controls src={stats.objectUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>

          <Waveform peaks={stats.peaks} />

          <AudioBreakdown objectUrl={stats.objectUrl} peaks={stats.peaks} />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Duration" value={formatDuration(stats.duration)} />
            <StatCard label="Sample Rate" value={formatHz(stats.sampleRate)} />
            <StatCard label="Channels" value={stats.channels} />
            <StatCard label="Total Samples" value={formatCompact(stats.totalSamples)} />
          </div>

          <BigNumberBanner
            value={stats.estimatedValues}
            unitSentence="amplitude measurements over time."
          />

          <p className="text-center text-xs text-muted-foreground">
            duration ({formatDuration(stats.duration)}) × sample rate ({formatHz(stats.sampleRate)}) ×
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
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
