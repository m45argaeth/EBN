"use client"

import Link from "next/link"
import { Image as ImageIcon, AudioLines, Film, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export function FeatureSections() {
  const { t } = useI18n()

  const sections = [
    { id: "images", icon: ImageIcon, ...t.features.images },
    { id: "audio", icon: AudioLines, ...t.features.audio },
    { id: "video", icon: Film, ...t.features.video },
  ]

  return (
    <section className="container py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.features.heading}
        </h2>
        <p className="mt-4 text-muted-foreground">{t.features.subtitle}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {sections.map((s, i) => (
          <Link
            key={s.id}
            href={`/playground?tab=${s.id}`}
            className={cn(
              "group relative flex flex-col rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg",
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                <s.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <code className="mt-1 text-xs text-muted-foreground">{s.formula}</code>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
