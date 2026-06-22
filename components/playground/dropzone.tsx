"use client"

import * as React from "react"
import { UploadCloud, Shuffle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

interface DropzoneProps {
  accept: string
  label: string
  hint: string
  allowDrop?: boolean
  onFile: (file: File) => void
  onRandom: () => void
  disabled?: boolean
}

export function Dropzone({
  accept,
  label,
  hint,
  allowDrop = true,
  onFile,
  onRandom,
  disabled,
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const { t } = useI18n()

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    onFile(files[0])
  }

  return (
    <div
      onDragOver={(e) => {
        if (!allowDrop) return
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        if (!allowDrop) return
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors",
        dragging
          ? "border-primary bg-accent"
          : "border-border bg-muted/30 hover:bg-muted/50",
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm">
        <UploadCloud className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">{label}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{hint}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => inputRef.current?.click()} disabled={disabled}>
          {t.dropzone.chooseFile}
        </Button>
        <Button variant="outline" onClick={onRandom} disabled={disabled}>
          <Shuffle className="h-4 w-4" />
          {t.dropzone.randomExample}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}
