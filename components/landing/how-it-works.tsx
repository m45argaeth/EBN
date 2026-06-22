"use client"

import { UploadCloud, Cpu, Binary } from "lucide-react"

import { useI18n } from "@/lib/i18n"

export function HowItWorks() {
  const { t } = useI18n()
  const icons = [UploadCloud, Cpu, Binary]
  const steps = t.how.steps.map((s, i) => ({ ...s, icon: icons[i] }))

  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="container py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.how.heading}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.how.subtitle}</p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="flex flex-col items-start">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
