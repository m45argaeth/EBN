import * as React from "react"

export function StageCard({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-start gap-2">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
      <span className="text-xl leading-none">↓</span>
      {label ? (
        <span className="text-[10px] uppercase tracking-wide">{label}</span>
      ) : null}
    </div>
  )
}
