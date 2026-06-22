import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="container py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border bg-primary px-8 py-16 text-center text-primary-foreground sm:py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to watch your files become numbers?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          No sign-up, no upload to any server. Just you, your file, and the math
          behind how machines see.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="mt-8"
        >
          <Link href="/playground">
            Open the Playground
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
