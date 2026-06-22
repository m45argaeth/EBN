"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/lib/i18n"
import { SITE, UI } from "@/lib/site-config"

export function SiteHeader() {
	const pathname = usePathname()
	const { locale } = useI18n()
	const ui = UI[locale]
	const Icon = SITE.icon

	const nav = [
		{ href: "/", label: ui.home },
		{ href: "/playground", label: ui.playground },
	]

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="container flex h-16 items-center justify-between gap-4">
				<Link href="/" className="flex items-center gap-2.5">
					<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
						<Icon className="h-5 w-5" />
					</span>
					<span className="text-base font-semibold tracking-tight">
						{SITE.name}
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{nav.map((item) => {
						const active =
							item.href === "/"
								? pathname === "/"
								: pathname.startsWith(item.href)
						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
									active
										? "bg-secondary text-foreground"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								{item.label}
							</Link>
						)
					})}
				</nav>

				<div className="flex items-center gap-2">
					<LanguageToggle />
					<ThemeToggle />
					<Button asChild size="sm" className="hidden sm:inline-flex">
						<Link href="/playground">{ui.tryIt}</Link>
					</Button>
				</div>
			</div>
		</header>
	)
}
