import * as React from "react"
import { Binary, Film, Grid3x3, Image as ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const STEPS = [
  { icon: Film, label: "Video", desc: "A clip is a sequence of frames." },
  { icon: ImageIcon, label: "Frames", desc: "~30 still images every second." },
  { icon: Grid3x3, label: "Pixels", desc: "Each frame is a grid of pixels." },
  { icon: Binary, label: "Numbers", desc: "Each pixel is just RGB numbers." },
]

/** The Video -> Frames -> Pixels -> Numbers concept diagram. */
export function Pipeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-stretch",
        className,
      )}
    >
      {STEPS.map((step, i) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center">
            <step.icon className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium">{step.label}</span>
            <span className="text-xs text-muted-foreground">{step.desc}</span>
          </div>
          {i < STEPS.length - 1 ? (
            <div className="flex items-center justify-center px-1 text-xl text-muted-foreground">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  )
}
