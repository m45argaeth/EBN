import { Eye, Cpu } from "lucide-react"

import type { Explanation } from "@/lib/explanations"

export function EducationalNote({ explanation }: { explanation: Explanation }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wide">
            Humans
          </span>
        </div>
        <p className="mt-2 text-lg font-medium">{explanation.human}</p>
      </div>
      <div className="rounded-xl border bg-primary text-primary-foreground p-5">
        <div className="flex items-center gap-2 opacity-80">
          <Cpu className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wide">
            Computers
          </span>
        </div>
        <p className="mt-2 text-lg font-medium">{explanation.computer}</p>
      </div>
    </div>
  )
}
