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
		id: "ee",
		name: "Embedding Explorer",
		url: "https://ee-playground.vercel.app",
	},
	{
		id: "pe",
		name: "Prompt Explorer",
		url: "https://pe-playground-snowy.vercel.app",
	},
	{
		id: "he",
		name: "Hallucination Explorer",
		url: "https://he-playground.vercel.app",
	},
	{
		id: "ce",
		name: "Compression Explorer",
		url: "https://ce-playground.vercel.app",
	},
	{
		id: "ipe",
		name: "Internet Packet Explorer",
		url: "https://ipe-playground.vercel.app",
	},
	{
		id: "hvsai",
		name: "Human vs AI Explorer",
		url: "https://hvsai-playground.vercel.app",
	},
	{
		id: "bd",
		name: "Bias Detector",
		url: "https://bd-playground-snowy.vercel.app",
	}
]

export type Universe = "ebn" | "mind"

export interface Playground {
	id: string
	name: string
	url?: string
	universe: Universe
	status: "live" | "wip"
}

/** Every playground across both universes (live + upcoming). */
export const PLAYGROUNDS: Playground[] = [
	{
		id: "ebn",
		name: "Everything Becomes Numbers",
		url: "https://ebn-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "ttb",
		name: "Text To Binary",
		url: "https://ttb-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "vfe",
		name: "Video Frame Explorer",
		url: "https://vfe-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "te",
		name: "Token Explorer",
		url: "https://te-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{ id: "embedding", name: "Embedding Explorer", url: "https://ee-playground.vercel.app", universe: "ebn", status: "live" },
	{ id: "prompt", name: "Prompt Explorer", url: "https://pe-playground-snowy.vercel.app", universe: "ebn", status: "live" },
	{
		id: "hallucination",
		name: "Hallucination Explorer",
		url: "https://he-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "compression",
		name: "Compression Explorer",
		url: "https://ce-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "packet",
		name: "Internet Packet Explorer",
		url: "https://ipe-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "human-vs-ai",
		name: "Human vs AI Explorer",
		url: "https://hvsai-playground.vercel.app",
		universe: "ebn",
		status: "live",
	},
	{
		id: "bd",
		name: "Bias Detector",
		url: "https://bd-playground-snowy.vercel.app",
		universe: "mind",
		status: "live",
	},
	{ id: "memory", name: "Memory Explorer", universe: "mind", status: "wip" },
	{
		id: "false-memory",
		name: "False Memory Explorer",
		universe: "mind",
		status: "wip",
	},
	{
		id: "attention",
		name: "Attention Explorer",
		universe: "mind",
		status: "wip",
	},
	{ id: "dopamine", name: "Dopamine Explorer", universe: "mind", status: "wip" },
]

export const UNIVERSES: { id: Universe; label: Record<Locale, string> }[] = [
	{ id: "ebn", label: { id: "Semesta EBN", en: "EBN Universe" } },
	{
		id: "mind",
		label: { id: "Semesta Pikiran Manusia", en: "Human Mind Universe" },
	},
]

/** Portfolio hub that will host more SaaS over time. */
export const PORTFOLIO = {
	name: "Curious About Everything",
	url: "https://sinigajelasin.vercel.app",
}

export const AUTHOR = {
	name: "Ga | Curious About Everything \uD83D\uDD0D",
	url: "https://x.com/sinigajelasin",
}

interface UIStrings {
	home: string
	playground: string
	tryIt: string
	exploreHeading: string
	seriesHeading: string
	soon: string
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
		seriesHeading: "Jelajahi semesta",
		soon: "Segera",
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
		seriesHeading: "Explore the universe",
		soon: "Soon",
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
