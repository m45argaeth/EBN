import { Film, Grid3x3, Image as ImageIcon, Binary } from "lucide-react"

import { cn } from "@/lib/utils"

const STEPS = [
  { icon: Film, label: "Video" },
  { icon: ImageIcon, label: "Frames" },
  { icon: Grid3x3, label: "Pixels" },
  { icon: Binary, label: "Numbers" },
]

/** The Video -> Frames -> Pixels -> Numbers visualization. */
export function Pipeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-center gap-3">
          <div className="flex w-full flex-col items-center gap-2 rounded-xl border bg-card p-4">
            <step.icon className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">{step.label}</span>
          </div>
          {i < STEPS.length - 1 ? (
            <span className="hidden text-2xl text-muted-foreground sm:inline">→</span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
