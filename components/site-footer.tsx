import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center gap-3 py-10 text-center text-sm text-muted-foreground">
        <p>
          Everything Becomes Numbers — because to a computer, everything is just
          numbers.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/playground"
            className="transition-colors hover:text-foreground"
          >
            Playground
          </Link>
        </div>
        <p className="text-xs">
          Made with ❤️ by{" "}
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
