"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { randomAny } from "@/lib/examples"

export function Hero() {
  const router = useRouter()

  const handleRandom = () => {
    const example = randomAny()
    const tab =
      example.kind === "image"
        ? "images"
        : example.kind === "audio"
          ? "audio"
          : "video"
    router.push(`/playground?tab=${tab}&example=${example.id}`)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container relative flex flex-col items-center py-24 text-center sm:py-32">
        <div className="inline-flex items-center rounded-full border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
          An educational playground for how machines see
        </div>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold tracking-tight sm:text-7xl">
          Everything Becomes Numbers
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
          Upload an image, audio file, or video and discover how computers
          transform it into numerical data before AI can understand it.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/playground">
              Try Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={handleRandom}>
            <Shuffle className="h-4 w-4" />
            Random Example
          </Button>
        </div>
        <p className="mt-8 font-mono text-sm text-muted-foreground">
          Because to a computer, everything is just numbers.
        </p>
      </div>
    </section>
  )
}
