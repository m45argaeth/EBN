"use client"

import * as React from "react"
import { toast } from "sonner"

import { Dropzone } from "./dropzone"
import { StatCard } from "./stat-card"
import { PixelInspector } from "./pixel-inspector"
import { EducationalNote } from "./educational-note"
import { BigNumberBanner } from "./big-number-banner"
import { ActionButtons } from "./action-buttons"
import { Skeleton } from "@/components/ui/skeleton"
import { analyzeImage, type ImageProbe } from "@/lib/image-utils"
import { explain } from "@/lib/explanations"
import { formatFull, formatCompact } from "@/lib/format"
import { exampleToFile, findExample, randomExample } from "@/lib/examples"

export function ImagesTab({ initialExampleId }: { initialExampleId?: string }) {
  const [probe, setProbe] = React.useState<ImageProbe | null>(null)
  const [filename, setFilename] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const reset = React.useCallback(() => {
    setProbe((prev) => {
      if (prev) URL.revokeObjectURL(prev.stats.objectUrl)
      return null
    })
    setFilename("")
    setError(null)
  }, [])

  React.useEffect(() => () => reset(), [reset])

  const process = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Please choose a PNG, JPG, or WebP.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeImage(file)
      setProbe((prev) => {
        if (prev) URL.revokeObjectURL(prev.stats.objectUrl)
        return result
      })
      setFilename(file.name)
    } catch (err) {
      setError((err as Error).message || "Could not process this image.")
      toast.error("Could not process this image")
    } finally {
      setLoading(false)
    }
  }

  const loadExample = React.useCallback(async (id?: string) => {
    setLoading(true)
    setError(null)
    try {
      const example =
        (id ? findExample("image", id) : undefined) ?? randomExample("image")
      const file = await exampleToFile(example)
      await process(file)
    } catch (err) {
      setError((err as Error).message || "Could not load example.")
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadRandom = () => loadExample()

  // Auto-load an example when arriving from the landing "Random Example" CTA.
  React.useEffect(() => {
    if (initialExampleId) void loadExample(initialExampleId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialExampleId])

  const stats = probe?.stats
  const explanation = stats ? explain("image", stats.estimatedValues, filename) : null

  return (
    <div className="space-y-8">
      <Dropzone
        accept="image/*"
        label="Drop an image here"
        hint="PNG, JPG, WebP, GIF — processed entirely in your browser."
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

      {!loading && stats && probe && explanation ? (
        <div className="animate-fade-in space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-medium">{filename}</h2>
            <ActionButtons
              title={`Image: ${filename}`}
              onReset={reset}
              stats={ {
                Width: `${stats.width}px`,
                Height: `${stats.height}px`,
                "Total Pixels": formatFull(stats.totalPixels),
                "Color Channels": `${stats.channels} (${stats.hasAlpha ? "RGBA" : "RGB"})`,
                "Estimated Numeric Values": formatFull(stats.estimatedValues),
              } }
            />
          </div>

          <PixelInspector src={stats.objectUrl} probe={probe} />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard label="Width" value={`${stats.width}px`} />
            <StatCard label="Height" value={`${stats.height}px`} />
            <StatCard label="Total Pixels" value={formatFull(stats.totalPixels)} />
            <StatCard
              label="Color Channels"
              value={stats.channels}
              hint={stats.hasAlpha ? "RGBA" : "RGB"}
            />
            <StatCard
              label="Est. Numeric Values"
              value={formatCompact(stats.estimatedValues)}
              hint={`${formatFull(stats.totalPixels)} × ${stats.channels}`}
            />
          </div>

          <BigNumberBanner
            value={stats.estimatedValues}
            unitSentence="numerical values that describe this image."
          />

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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
