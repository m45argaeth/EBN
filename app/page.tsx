import { Hero } from "@/components/landing/hero"
import { FeatureSections } from "@/components/landing/feature-sections"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CallToAction } from "@/components/landing/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSections />
      <HowItWorks />
      <CallToAction />
    </>
  )
}
