import Link from "next/link"
import { Image as ImageIcon, AudioLines, Film, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const SECTIONS = [
  {
    id: "images",
    icon: ImageIcon,
    title: "Images",
    formula: "pixels × color channels",
    body: "A photo is a grid of pixels. Each pixel is a few numbers — red, green, and blue intensities. A single phone photo is tens of millions of values.",
  },
  {
    id: "audio",
    icon: AudioLines,
    title: "Audio",
    formula: "duration × sample rate × channels",
    body: "Sound is captured as amplitude samples thousands of times per second. A short clip already holds hundreds of thousands of measurements.",
  },
  {
    id: "video",
    icon: Film,
    title: "Video",
    formula: "frames × width × height × channels",
    body: "Video is just many images shown rapidly. Multiply the pixels in one frame by every frame and the numbers explode into the billions.",
  },
]

export function FeatureSections() {
  return (
    <section className="container py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Humans see meaning. Computers see numbers.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every kind of media collapses into the same thing once a machine looks
          at it: long lists of numbers.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SECTIONS.map((s, i) => (
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
