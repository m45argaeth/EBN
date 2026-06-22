"use client"

import Link from "next/link"

import { useI18n } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center gap-3 py-10 text-center text-sm text-muted-foreground">
        <p>{t.footer.tagline}</p>
        <div className="flex items-center gap-6">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t.footer.home}
          </Link>
          <Link
            href="/playground"
            className="transition-colors hover:text-foreground"
          >
            {t.footer.playground}
          </Link>
        </div>
        <p className="text-xs">
          {t.footer.madeWith}{" "}
          <a
            href="https://x.com/sinigajelasin"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Ga | Curious About Everything 🔍
          </a>
        </p>
      </div>
    </footer>
  )
}
