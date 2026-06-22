import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { FeatureSections } from "@/components/landing/feature-sections"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CallToAction } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeatureSections />
        <HowItWorks />
        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  )
}
