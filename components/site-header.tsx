"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

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
	const [open, setOpen] = React.useState(false)

	const nav = [
		{ href: "/", label: ui.home },
		{ href: "/playground", label: ui.playground },
	]

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
			<div className="container flex h-16 items-center justify-between gap-4">
				<Link
					href="/"
					className="flex items-center gap-2.5"
					onClick={() => setOpen(false)}
				>
					<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
						<Icon className="h-5 w-5" />
					</span>
					<span className="text-base font-semibold tracking-tight">
						{SITE.name}
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{nav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
								isActive(item.href)
									? "bg-secondary text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<LanguageToggle />
					<ThemeToggle />
					<Button asChild size="sm" className="hidden sm:inline-flex">
						<Link href="/playground">{ui.tryIt}</Link>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => setOpen((v) => !v)}
						aria-label="Menu"
						aria-expanded={open}
					>
						{open ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			{open && (
				<div className="border-t border-border/60 bg-background md:hidden">
					<nav className="container flex flex-col gap-1 py-3">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className={cn(
									"rounded-lg px-3 py-2 text-sm font-medium transition-colors",
									isActive(item.href)
										? "bg-secondary text-foreground"
										: "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
								)}
							>
								{item.label}
							</Link>
						))}
						<Button asChild size="sm" className="mt-2 w-full">
							<Link href="/playground" onClick={() => setOpen(false)}>
								{ui.tryIt}
							</Link>
						</Button>
					</nav>
				</div>
			)}
		</header>
	)
}
