import { UploadCloud, Cpu, Binary } from "lucide-react"

const STEPS = [
  {
    icon: UploadCloud,
    title: "1. Upload anything",
    body: "Drop in an image, audio file, or video — or load a generated example. Nothing leaves your device.",
  },
  {
    icon: Cpu,
    title: "2. We decode it",
    body: "Your browser reads the raw pixels, samples, and frames using native web APIs — no servers, no databases.",
  },
  {
    icon: Binary,
    title: "3. See the numbers",
    body: "Watch the file become the exact count of numerical values a computer must process before AI can understand it.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border/60 bg-muted/20">
      <div className="container py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps, entirely client-side.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
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
