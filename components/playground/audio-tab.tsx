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
import { formatFull, formatDuration, formatHz } from "@/lib/format"
import { exampleToFile, findExample, randomExample } from "@/lib/examples"
import { useI18n } from "@/lib/i18n"

export function AudioTab({ initialExampleId }: { initialExampleId?: string }) {
  const [stats, setStats] = React.useState<AudioStats | null>(null)
  const [filename, setFilename] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const { t, compact, explain } = useI18n()

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
      setError(t.errors.notAudio)
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
      setError((err as Error).message || t.errors.processAudio)
      toast.error(t.errors.processAudioToast)
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

  const explanation = stats ? explain("audio", stats.estimatedValues, filename) : null

  return (
    <div className="space-y-8">
      <Dropzone
        accept="audio/*"
        label={t.dropzone.audio.label}
        hint={t.dropzone.audio.hint}
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
              title={`${t.media.audio}: ${filename}`}
              onReset={reset}
              stats={{
                [t.stats.duration]: formatDuration(stats.duration),
                [t.stats.sampleRate]: formatHz(stats.sampleRate),
                [t.stats.channels]: `${stats.channels}`,
                [t.stats.totalSamples]: formatFull(stats.totalSamples),
                [t.stats.estNumericValues]: formatFull(stats.estimatedValues),
              }}
            />
          </div>

          <audio controls src={stats.objectUrl} className="w-full">
            {t.player.audioFallback}
          </audio>

          <Waveform peaks={stats.peaks} />

          <AudioBreakdown objectUrl={stats.objectUrl} peaks={stats.peaks} />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label={t.stats.duration} value={formatDuration(stats.duration)} />
            <StatCard label={t.stats.sampleRate} value={formatHz(stats.sampleRate)} />
            <StatCard label={t.stats.channels} value={stats.channels} />
            <StatCard label={t.stats.totalSamples} value={compact(stats.totalSamples)} />
          </div>

          <BigNumberBanner
            value={stats.estimatedValues}
            unitSentence={t.banner.audio}
          />

          <p className="text-center text-xs text-muted-foreground">
            {t.formula.duration} ({formatDuration(stats.duration)}) × {t.formula.sampleRate} ({formatHz(stats.sampleRate)}) ×
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
