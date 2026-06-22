import * as React from "react"
import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlaygroundTabs } from "@/components/playground/playground-tabs"
import { PlaygroundIntro } from "@/components/playground/playground-intro"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Playground — Everything Becomes Numbers",
  description:
    "Unggah gambar, file audio, atau video dan saksikan ia menjadi angka secara real-time.",
}

export default function PlaygroundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1 py-12 sm:py-16">
        <PlaygroundIntro />

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
