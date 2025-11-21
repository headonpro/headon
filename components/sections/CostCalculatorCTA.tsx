import Link from 'next/link'
import { Calculator, ArrowRight } from 'lucide-react'

export default function CostCalculatorCTA() {
  return (
    <section className="relative -mt-1 bg-gradient-to-b from-white via-gray-50 to-white py-24 pb-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="from-primary to-secondary font-heading mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Was kostet Ihre Website?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Nutzen Sie unseren kostenlosen Kostenrechner für eine realistische Einschätzung Ihres
            Projekts – transparent und in nur 2 Minuten
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-300 hover:shadow-2xl">
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 inline-flex rounded-xl p-5 shadow-lg">
                <Calculator className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
              Interaktiver Kostenrechner
            </h3>
            <p className="mb-8 text-center text-gray-600 leading-relaxed">
              Berechnen Sie die Kosten für Ihre Website basierend auf Projekttyp, Design, Features
              und Funktionsumfang. Vergleichen Sie Freelancer-, Agentur- und HEADON-Preise direkt.
            </p>

            <Link
              href="/webseite-erstellen-lassen-kosten"
              className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Jetzt Kosten berechnen
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">
            Oder lesen Sie unsere Ratgeber:{' '}
            <Link
              href="/homepage-kosten"
              className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-semibold text-transparent hover:opacity-80"
            >
              Homepage für KMUs
            </Link>
            {' · '}
            <Link
              href="/website-kosten"
              className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-semibold text-transparent hover:opacity-80"
            >
              Technischer Guide
            </Link>
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Persönliche Beratung gewünscht?{' '}
            <Link
              href="/contact"
              className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-semibold text-transparent underline hover:opacity-80"
            >
              Kontaktieren Sie uns
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
