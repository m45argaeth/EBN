import * as React from "react"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlaygroundTabs } from "@/components/playground/playground-tabs"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Playground — Everything Becomes Numbers",
  description:
    "Upload an image, audio file, or video and watch it become numbers in real time.",
}

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Playground
          </h1>
          <p className="mt-3 text-muted-foreground">
            Drop in a file and watch it dissolve into the raw numbers a computer
            actually works with. Everything runs locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <React.Suspense fallback={<Skeleton className="h-12 w-full rounded-full" />}>
            <PlaygroundTabs />
          </React.Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
