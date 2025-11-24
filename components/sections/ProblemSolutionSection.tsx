import { Search, Clock, TrendingUp, Shield, Code, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FadeIn, HoverLift, HoverScale, AnimatedArrow } from '@/components/ui/motion-wrapper'

const problemSolutions = [
  {
    icon: Search,
    problem: 'Kunden finden nur deine Konkurrenz',
    description: 'Online unsichtbar zu sein bedeutet: Deine Wettbewerber bekommen die Aufträge.',
    solution: 'SEO-optimierte Next.js Website',
    features: [
      'Indexierung in 48h',
      'Mobile-First Design',
      'Core Web Vitals optimiert',
      'Lokale Keywords für Main-Tauber-Kreis',
    ],
    color: 'from-primary-500 to-primary-700',
  },
  {
    icon: Clock,
    problem: 'Manuelle Prozesse fressen deine Zeit',
    description: 'Termine, Anfragen, Buchungen - alles läuft noch per Telefon oder E-Mail.',
    solution: 'Automatisierte Systeme',
    features: [
      '24/7 Kontaktformulare',
      'Automatische Lead-Erfassung',
      'E-Mail-Benachrichtigungen',
      'CRM-Integration möglich',
    ],
    color: 'from-secondary-500 to-secondary-700',
  },
  {
    icon: TrendingUp,
    problem: 'Nach Feierabend entgehen dir Umsätze',
    description: 'Während andere 24/7 verkaufen, ist dein Geschäft offline.',
    solution: 'Deine Website als Verkaufstool',
    features: [
      'Portfolio & Leistungen präsentieren',
      'Direkte Anfrage-Möglichkeiten',
      'Vertrauen durch Professionalität',
      'Messbare Conversion-Optimierung',
    ],
    color: 'from-accent-500 to-accent-700',
  },
]

const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Supabase',
  'Nest.js',
  'Astro',
  'TanStack',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'Docker',
]

const guarantees = [
  { icon: Shield, text: 'Festpreis - keine versteckten Kosten' },
  { icon: Zap, text: '14 Tage Geld-zurück-Garantie' },
  { icon: Code, text: 'Code-Eigentum gehört dir' },
  { icon: Shield, text: '3 Monate kostenlose Wartung' },
]

const industryStats = [
  { stat: '73%', label: 'der Kunden recherchieren online VOR dem ersten Kontakt' },
  { stat: '3 Sek', label: 'wartet ein Besucher maximal auf deine Website' },
  { stat: '68%', label: 'der Website-Besuche kommen vom Smartphone' },
]

// Server Component - alle Texte werden sofort gerendert
export default function ProblemSolutionSection() {
  return (
    <section className="relative -mt-1 bg-gradient-to-b from-white via-gray-50 to-white py-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Headline - SEO wichtig */}
        <FadeIn className="mb-20 text-center">
          <h2 className="from-primary to-secondary font-heading mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl lg:leading-tight">
            Deine nächsten Kunden suchen dich gerade online
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl">
            Wir bauen dir eine Webseite, die gefunden wird - und verkauft
          </p>
        </FadeIn>

        {/* Problem-Solution Cards */}
        <div className="mb-28 grid gap-12 md:grid-cols-3 md:gap-8">
          {problemSolutions.map((item, index) => (
            <FadeIn key={index} delay={index * 0.15} className="relative">
              <HoverLift className="h-full rounded-2xl border border-gray-200/50 bg-white p-6 pt-8 shadow-xl transition-all duration-300 hover:border-gray-300 hover:shadow-2xl">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <HoverScale scale={1.1}>
                    <div
                      className={`inline-flex rounded-xl bg-gradient-to-br ${item.color} p-4 shadow-lg`}
                    >
                      <item.icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                    </div>
                  </HoverScale>
                </div>

                {/* Problem - SEO relevant */}
                <h3 className="mb-3 text-center text-xl font-bold text-gray-900">{item.problem}</h3>
                <p className="mb-6 text-center leading-relaxed text-gray-600">{item.description}</p>

                {/* Divider */}
                <div
                  className={`mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r ${item.color}`}
                />

                {/* Solution */}
                <div className="mb-4">
                  <p className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
                    HEADON-Lösung
                  </p>
                  <p className="mb-4 text-center text-lg font-bold text-gray-900">{item.solution}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span
                        className={`mr-2 mt-0.5 text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </HoverLift>
            </FadeIn>
          ))}
        </div>

        {/* Trust Section */}
        <FadeIn delay={0.3} className="mb-24">
          {/* Tech Stack */}
          <div className="mb-16 text-center">
            <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Gebaut mit modernster Technologie
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {techStack.map((tech, idx) => (
                <HoverScale key={idx} scale={1.05}>
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-shadow hover:shadow-md">
                    <span className="text-sm font-semibold text-gray-700">{tech}</span>
                  </div>
                </HoverScale>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Die gleiche Tech wie Airbnb, Netflix, TikTok
            </p>
          </div>

          {/* Guarantees */}
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-center text-lg font-bold text-gray-900">
              Unser Versprechen an dich:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((guarantee, idx) => (
                <HoverScale key={idx} scale={1.03}>
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <guarantee.icon className="from-primary to-secondary mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <p className="text-sm text-gray-700">{guarantee.text}</p>
                  </div>
                </HoverScale>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Industry Stats */}
        <FadeIn delay={0.4} className="mb-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-10 shadow-xl">
            <p className="mb-10 text-center text-lg font-bold text-gray-900">Wusstest du?</p>
            <div className="grid gap-8 md:grid-cols-3">
              {industryStats.map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className="from-primary to-secondary mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    {item.stat}
                  </p>
                  <p className="text-sm leading-snug text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-gray-400">Quelle: Google & Statista 2024</p>
          </div>
        </FadeIn>

        {/* Dual CTA */}
        <FadeIn delay={0.5} className="text-center">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  Kostenloses Strategie-Gespräch
                  <AnimatedArrow className="ml-2 inline-block" />
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary px-8 py-6 text-lg font-semibold transition-all duration-300 hover:text-white"
                >
                  Unsere Projekte ansehen
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Kein Verkaufsgespräch - nur ehrliche Beratung
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
