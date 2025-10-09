import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import KIAdvantageSection from '@/components/sections/KIAdvantageSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import IndustryNavigator from '@/components/sections/IndustryNavigator'
import ProcessSection from '@/components/sections/ProcessSection'
import TechnologyTrustSection from '@/components/sections/TechnologyTrustSection'
import TrustPersonalitySection from '@/components/sections/TrustPersonalitySection'

export const metadata: Metadata = {
  title: "Full-Service Digitalagentur | Web & App Entwicklung | Lauda-Königshofen",
  description: "Kreativ- und Marketingagentur für moderne Weblösungen: Webentwicklung, App-Development, UI/UX Design und Corporate Branding. KI-beschleunigt, 4x schneller, ab 2.500€. Main-Tauber-Kreis, Baden-Württemberg.",
  keywords: [
    // Primäre Keywords
    "Digitalagentur Lauda-Königshofen",
    "Kreativagentur Main-Tauber-Kreis",
    "Webagentur Baden-Württemberg",
    "Marketingagentur Würzburg",

    // Service Keywords
    "Webentwicklung Lauda-Königshofen",
    "App Entwicklung Baden-Württemberg",
    "Webdesign Agentur Tauberbischofsheim",
    "UI UX Design Würzburg",
    "Corporate Design Bad Mergentheim",

    // Tech Keywords
    "React Entwickler Deutschland",
    "Next.js Agentur",
    "Flutter App Entwicklung",
    "Full-Stack Development",

    // Long-Tail
    "Website erstellen lassen",
    "Mobile App entwickeln lassen",
    "Responsive Webdesign",
    "Full-Service Digitalagentur"
  ].join(", "),
  openGraph: {
    title: "HEADON.pro - Full-Service Digitalagentur für Web & App",
    description: "Kreativ- und Marketingagentur mit KI-Power: Websites, Apps, Design & Branding in Rekordzeit. Main-Tauber-Kreis, Baden-Württemberg.",
    images: [
      {
        url: 'https://headon.pro/og-images/home.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Digitalagentur'
      }
    ],
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <IndustryNavigator />
      <ProcessSection />
      <KIAdvantageSection />
      <TechnologyTrustSection />
      <TrustPersonalitySection />
    </>
  )
}