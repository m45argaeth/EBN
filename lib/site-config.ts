import { Binary } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Locale } from "@/lib/i18n"

export type SiteId = "ebn" | "te" | "ttb" | "vfe" | "bd"

export interface SeriesItem {
	id: SiteId
	name: string
	url: string
}

/** The educational SaaS in the same series. Shared across every site. */
export const SERIES: SeriesItem[] = [
	{
		id: "ebn",
		name: "Everything Becomes Numbers",
		url: "https://ebn-playground.vercel.app",
	},
	{
		id: "te",
		name: "Token Explorer",
		url: "https://te-playground.vercel.app",
	},
	{
		id: "ttb",
		name: "Text To Binary",
		url: "https://ttb-playground.vercel.app",
	},
	{
		id: "vfe",
		name: "Video Frame Explorer",
		url: "https://vfe-playground.vercel.app",
	},
	{
		id: "bd",
		name: "Bias Detector",
		url: "https://bd-playground-snowy.vercel.app",
	},
]

/** Portfolio hub that will host more SaaS over time. */
export const PORTFOLIO = {
	name: "Curious About Everything",
	url: "https://sinigajelasin.vercel.app",
}

export const AUTHOR = {
	name: "Ga | Curious About Everything 🔍",
	url: "https://x.com/sinigajelasin",
}

interface UIStrings {
	home: string
	playground: string
	tryIt: string
	exploreHeading: string
	seriesHeading: string
	portfolio: string
	current: string
	madeWith: string
	by: string
}

/** Shared header/footer labels, identical across every site in the series. */
export const UI: Record<Locale, UIStrings> = {
	id: {
		home: "Beranda",
		playground: "Playground",
		tryIt: "Coba",
		exploreHeading: "Jelajahi",
		seriesHeading: "Jelajahi seri ini",
		portfolio: "Portofolio",
		current: "kamu di sini",
		madeWith: "Dibuat dengan",
		by: "oleh",
	},
	en: {
		home: "Home",
		playground: "Playground",
		tryIt: "Try It",
		exploreHeading: "Explore",
		seriesHeading: "Explore the series",
		portfolio: "Portfolio",
		current: "you are here",
		madeWith: "Made with",
		by: "by",
	},
}

/** Identity of THIS site. Only this block differs between repos. */
export const SITE: {
	id: SiteId
	name: string
	icon: LucideIcon
	tagline: Record<Locale, string>
} = {
	id: "ebn",
	name: "Everything Becomes Numbers",
	icon: Binary,
	tagline: {
		id: "Karena bagi komputer, semuanya hanyalah angka.",
		en: "Because to a computer, everything is just numbers.",
	},
}
