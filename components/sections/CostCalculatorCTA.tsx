import Link from 'next/link'
import { Calculator, Euro, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const calculators = [
  {
    title: 'Website Kosten',
    description: 'Berechnen Sie die Kosten für Ihre neue Website basierend auf Umfang und Features',
    href: '/webseite-erstellen-lassen-kosten',
    icon: Calculator,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Homepage Kosten',
    description: 'Kostenrechner speziell für kleine Homepages und Unternehmenswebsites',
    href: '/homepage-kosten',
    icon: Euro,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Technologie Kosten',
    description: 'Vergleichen Sie Kosten verschiedener Technologie-Stacks für Ihr Projekt',
    href: '/website-kosten',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600',
  },
]

export default function CostCalculatorCTA() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Was kostet Ihre Website?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Nutzen Sie unsere kostenlosen Kostenrechner für eine realistische Einschätzung Ihres
            Projekts
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {calculators.map((calculator) => {
            const Icon = calculator.icon
            return (
              <div
                key={calculator.href}
                className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`bg-gradient-to-br ${calculator.color} mb-4 inline-flex rounded-lg p-3`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-foreground mb-2 text-xl font-semibold">
                  {calculator.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">{calculator.description}</p>

                <Button
                  asChild
                  variant="outline"
                  className="group-hover:border-accent-500 group-hover:text-accent-600 w-full transition-colors"
                >
                  <Link href={calculator.href} className="inline-flex items-center justify-center">
                    Kosten berechnen
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Unsicher, welcher Rechner für Sie passend ist?{' '}
            <Link
              href="/contact"
              className="text-accent-600 hover:text-accent-700 font-medium underline"
            >
              Kontaktieren Sie uns für eine persönliche Beratung
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
