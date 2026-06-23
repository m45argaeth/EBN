"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { SITE, SERIES, PORTFOLIO, AUTHOR, UI } from "@/lib/site-config"

export function SiteFooter() {
	const { locale } = useI18n()
	const ui = UI[locale]
	const Icon = SITE.icon
	const year = new Date().getFullYear()

	return (
		<footer className="border-t border-border/60 bg-muted/20">
			<div className="container py-14">
				<div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
					<div className="space-y-4">
						<Link href="/" className="flex items-center gap-2.5">
							<span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
								<Icon className="h-5 w-5" />
							</span>
							<span className="text-base font-semibold tracking-tight">
								{SITE.name}
							</span>
						</Link>
						<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
							{SITE.tagline[locale]}
						</p>
					</div>

					<div className="space-y-3">
						<h3 className="text-sm font-semibold">{ui.exploreHeading}</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="/playground" className="hover:text-foreground">
									{ui.playground}
								</Link>
							</li>
							<li>
								<a
									href={PORTFOLIO.url}
									target="_blank"
									rel="noreferrer"
									className="hover:text-foreground"
								>
									{ui.portfolio}
								</a>
							</li>
							<li>
								<a
									href={`${PORTFOLIO.url}/roadmap`}
									target="_blank"
									rel="noreferrer"
									className="hover:text-foreground"
								>
									Roadmap
								</a>
							</li>
						</ul>
					</div>

					<div className="space-y-3">
						<h3 className="text-sm font-semibold">{ui.seriesHeading}</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							{SERIES.map((item) => {
								const current = item.id === SITE.id
								return (
									<li key={item.id}>
										{current ? (
											<span className="flex flex-wrap items-center gap-1.5 font-medium text-foreground">
												{item.name}
												<span className="text-xs font-normal text-muted-foreground">
													({ui.current})
												</span>
											</span>
										) : (
											<a
												href={item.url}
												target="_blank"
												rel="noreferrer"
												className="hover:text-foreground"
											>
												{item.name}
											</a>
										)}
									</li>
								)
							})}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
					<p>
						© {year} {SITE.name}
					</p>
					<p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 sm:justify-end">
						<span>{ui.madeWith}</span>
						<Heart className="h-3.5 w-3.5 fill-current text-red-500" />
						<span>{ui.by}</span>
						<a
							href={AUTHOR.url}
							target="_blank"
							rel="noreferrer"
							className="font-medium text-foreground hover:underline"
						>
							{AUTHOR.name}
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
