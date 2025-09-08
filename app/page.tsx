import HeroSection from '@/components/sections/HeroSection'
import KIAdvantageSection from '@/components/sections/KIAdvantageSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import IndustryNavigator from '@/components/sections/IndustryNavigator'
import ProcessSection from '@/components/sections/ProcessSection'
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection'
import TechnologyTrustSection from '@/components/sections/TechnologyTrustSection'
import PricingSection from '@/components/sections/PricingSection'
import TrustPersonalitySection from '@/components/sections/TrustPersonalitySection'
import FinalCTASection from '@/components/sections/FinalCTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <IndustryNavigator />
      <ProcessSection />
      <KIAdvantageSection />
      <SuccessStoriesSection />
      <TechnologyTrustSection />
      <PricingSection />
      <TrustPersonalitySection />
      <FinalCTASection />
    </>
  )
}