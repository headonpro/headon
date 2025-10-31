import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import KIAdvantageSection from '@/components/sections/KIAdvantageSection'
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection'
import IndustryNavigator from '@/components/sections/IndustryNavigator'
import ProcessSection from '@/components/sections/ProcessSection'
import TechnologyTrustSection from '@/components/sections/TechnologyTrustSection'
import TrustPersonalitySection from '@/components/sections/TrustPersonalitySection'

export const metadata: Metadata = {
  title: 'Kreativ- & Digitalagentur für Web, Apps & Design | Festpreise ab 2.500€',
  description:
    'Website erstellen lassen im Main-Tauber-Kreis. Webdesign & App-Entwicklung zu Festpreisen ab 2.500€. KI-gestützt, 4x schneller. Professionelle Digitalagentur.',
  keywords: [
    // Primäre Keywords
    'Digitalagentur Lauda-Königshofen',
    'Kreativagentur Main-Tauber-Kreis',
    'Webagentur Baden-Württemberg',
    'Marketingagentur Würzburg',

    // Service Keywords
    'Webentwicklung Lauda-Königshofen',
    'App Entwicklung Baden-Württemberg',
    'Webdesign Agentur Tauberbischofsheim',
    'UI UX Design Würzburg',
    'Corporate Design Bad Mergentheim',

    // Tech Keywords
    'React Entwickler Deutschland',
    'Next.js Agentur',
    'Flutter App Entwicklung',
    'Full-Stack Development',

    // Long-Tail
    'Website erstellen lassen',
    'Mobile App entwickeln lassen',
    'Responsive Webdesign',
    'Full-Service Digitalagentur',
  ].join(', '),
  openGraph: {
    title: 'Kreativ- & Digitalagentur für Web, Apps & Design | Festpreise ab 2.500€',
    description:
      'Website erstellen lassen im Main-Tauber-Kreis. Webdesign & App-Entwicklung zu Festpreisen ab 2.500€. KI-gestützt, 4x schneller. Professionelle Digitalagentur.',
    images: [
      {
        url: '/og-images/home.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Digitalagentur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kreativ- & Digitalagentur für Web, Apps & Design | Festpreise ab 2.500€',
    description:
      'Website erstellen lassen im Main-Tauber-Kreis. Webdesign & App-Entwicklung zu Festpreisen ab 2.500€. KI-gestützt, 4x schneller.',
    images: ['/og-images/home.jpg'],
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
