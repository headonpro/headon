import HeroSectionOptimized from '@/components/sections/HeroSectionOptimized'
import KIAdvantageSection from '@/components/sections/KIAdvantageSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import IndustryNavigator from '@/components/sections/IndustryNavigator'
import ProcessSection from '@/components/sections/ProcessSection'
import TechnologyTrustSection from '@/components/sections/TechnologyTrustSection'
import TrustPersonalitySection from '@/components/sections/TrustPersonalitySection'

export default function Home() {
  return (
    <>
      <HeroSectionOptimized />
      <ProblemSolutionSection />
      <IndustryNavigator />
      <ProcessSection />
      <KIAdvantageSection />
      <TechnologyTrustSection />
      <TrustPersonalitySection />
    </>
  )
}