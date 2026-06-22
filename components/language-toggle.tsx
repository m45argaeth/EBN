"use client"

import { cn } from "@/lib/utils"
import { LOCALES, useI18n } from "@/lib/i18n"

/** Instant ID ⟷ EN language switch shown in the site header. */
export function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border bg-muted/40 p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
