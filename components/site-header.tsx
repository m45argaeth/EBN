"use client"

import Link from "next/link"
import { Binary } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Binary className="h-4 w-4" />
          </span>
          <span className="tracking-tight">Everything Becomes Numbers</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/playground">Playground</Link>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/playground">Try Now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
