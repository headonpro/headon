import { CostCalculator } from '@/components/calculator/CostCalculator'
import { CheckCircle2, Sparkles, Clock, Euro } from 'lucide-react'
import { createCalculatorSchema, type FAQItem } from '@/lib/calculator/schema-builder'

export { metadata } from './metadata'

// FAQ items for Schema.org structured data
const faqItems: FAQItem[] = [
  {
    question: 'Was kostet eine einfache Homepage für Selbstständige?',
    answer:
      'Eine professionelle Homepage für Selbstständige mit 5 Seiten, responsivem Design, Kontaktformular und Basis-SEO kostet realistisch zwischen 2.500€ und 4.500€. Freelancer bieten manchmal günstigere Preise ab 1.500€, allerdings oft mit Abstrichen bei Design und Support. Budget-Lösungen unter 1.000€ basieren meist auf fertigen Templates mit minimaler Anpassung.',
  },
  {
    question: 'Lohnt sich ein CMS für kleine Unternehmen?',
    answer:
      'Wenn Sie regelmäßig Blogbeiträge schreiben, Referenzen hinzufügen oder Öffnungszeiten ändern möchten, lohnt sich ein CMS definitiv. Die Mehrkosten von 800-1.500€ amortisieren sich schnell, da Sie keine Entwickler für jede Änderung bezahlen müssen. Für statische Visitenkarten-Websites ohne häufige Updates können Sie darauf verzichten.',
  },
  {
    question: 'Welche laufenden Kosten kommen monatlich auf mich zu?',
    answer:
      'Für eine Business-Homepage sollten Sie mit 50-200€/Monat rechnen: Hosting (10-40€), Domain (1-2€), optional Wartung/Support (100-150€). Mit Wartungsvertrag sind Sie auf der sicheren Seite (Updates, Backups, Support), für technikaffine Unternehmer reicht auch Hosting + Domain ohne Wartung. Zusätzliche Tools wie Newsletter-Software können weitere 10-50€/Monat kosten.',
  },
  {
    question: 'Ist Google-Optimierung im Grundpreis enthalten?',
    answer:
      'Basis-SEO (sauberer Code, Meta-Tags, Mobile-Optimierung, Sitemap) sollte bei jeder professionellen Homepage inklusive sein. Erweiterte Optimierungen wie ausführliche Keyword-Recherche, Content-SEO, lokales SEO mit Google My Business Integration oder laufende SEO-Betreuung kosten extra – typischerweise 500-1.500€ einmalig oder 300€+/Monat für kontinuierliche Betreuung.',
  },
  {
    question: 'Homepage vom Freelancer oder von einer Agentur?',
    answer:
      'Freelancer sind günstiger (1.500-4.000€), arbeiten aber alleine – bei Urlaub oder Krankheit gibt es Verzögerungen. Agenturen bieten mehr Sicherheit und Expertise, kosten aber deutlich mehr (5.000-15.000€). HEADON kombiniert beides: professionelle Teams mit Agentur-Qualität, aber Remote-First-Struktur ohne Overhead-Kosten. So erhalten Sie zuverlässige Qualität zu fairen Preisen.',
  },
  {
    question: 'Kann ich meine Homepage später selbst erweitern?',
    answer:
      'Mit einem CMS können Sie Inhalte selbst ändern und neue Seiten hinzufügen. Für technische Erweiterungen (neue Features, Design-Anpassungen) benötigen Sie weiterhin Entwickler-Support. Professionell programmierte Homepages sind modular aufgebaut – Erweiterungen sind jederzeit möglich. Planen Sie bereits initial eine saubere Struktur, um spätere Anpassungen kostengünstig zu halten.',
  },
]

const schema = createCalculatorSchema(faqItems)

export default function HomepageKostenPage() {
  return (
    <>
      {/* Hero & Calculator Section - Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span>Speziell für kleine Unternehmen</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Homepage Kosten 2025 –{' '}
              <span className="text-white/90">Transparent kalkuliert</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Berechnen Sie die Kosten für Ihre Business-Homepage in unter 2 Minuten.
              Faire Preise für Selbstständige, KMUs und lokale Unternehmen.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>Keine versteckten Kosten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>KMU-freundliche Preise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>Feste Laufzeiten</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <CostCalculator />
        </div>
      </section>

      {/* Unique Content Section - Focus: Kleine Business-Homepages */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Homepage-Kosten für kleine Unternehmen realistisch einschätzen
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Als Selbstständiger, Handwerksbetrieb oder lokales Unternehmen brauchen Sie keine
            überdimensionierte Agentur-Lösung – sondern eine professionelle, aber bezahlbare Homepage,
            die Ihre Dienstleistungen präsentiert und neue Kunden gewinnt. Doch was kostet eine
            solche Business-Homepage wirklich?
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Das braucht Ihre Business-Homepage wirklich
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Grundausstattung für Ihr Unternehmen:</strong> Die meisten kleinen Unternehmen
            benötigen eine klare Startseite mit Ihrem Angebot, eine Über-uns-Seite für Vertrauen,
            eine Leistungsübersicht, Referenzen oder Portfolio und eine Kontaktseite mit Formular.
            Damit sind 5-8 Seiten bereits abgedeckt – das Fundament für Ihre Online-Präsenz.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <Clock className="h-8 w-8 text-primary-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Schneller Start</h4>
              <p className="text-sm text-gray-700">
                Einfache Business-Homepages können in 2-4 Wochen online gehen
              </p>
            </div>
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
              <Euro className="h-8 w-8 text-secondary-600 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Faire Preise</h4>
              <p className="text-sm text-gray-700">
                Ab 2.500€ für professionelle Qualität ohne Agentur-Overhead
              </p>
            </div>
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
              <Sparkles className="h-8 w-8 text-accent-700 mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Professionell</h4>
              <p className="text-sm text-gray-700">
                Responsive Design, schnelle Ladezeiten, SEO-Grundlagen inklusive
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Diese Faktoren beeinflussen Ihre Homepage-Kosten
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Design-Level:</strong> Möchten Sie ein vorgefertigtes Template anpassen (günstiger)
            oder ein individuelles Design, das Ihre Marke perfekt widerspiegelt? Für kleine Unternehmen
            empfehlen wir meist ein Semi-Custom-Design – professionell, individuell angepasst, aber
            nicht bei Null startend. Das spart Kosten und Zeit.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Funktionsumfang:</strong> Die häufigsten Features für Business-Homepages sind
            Kontaktformulare (Standard), Google Maps Integration (wichtig für lokale Unternehmen),
            Bildergalerien für Referenzen, Newsletter-Anmeldung und vielleicht ein einfaches
            Buchungssystem. Jedes Feature erhöht den Preis, aber nicht dramatisch.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Content Management:</strong> Wollen Sie später selbst Inhalte ändern können?
            Ein benutzerfreundliches CMS wie WordPress oder ein Headless CMS kostet 800-1.500€ extra,
            spart Ihnen aber langfristig Kosten für jede kleine Änderung. Alternativ: Statische
            Homepage mit Developer-Support bei Änderungen (günstiger initial).
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wartung und Hosting:</strong> Die laufenden Kosten sollten überschaubar bleiben.
            Shared Hosting reicht für die meisten kleinen Business-Homepages (10-30€/Monat).
            Optional können Sie Wartungspakete buchen (150€/Monat für Updates, Backups, Support) –
            gerade wenn Sie technisch nicht versiert sind.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Warum Homepage-Kosten stark variieren
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Ein Freelancer aus Osteuropa bietet vielleicht eine Homepage für 800€ an – allerdings
            oft mit Sprachbarrieren, Template-Designs und begrenztem Support. Deutsche Agenturen
            verlangen schnell 8.000-15.000€ für dasselbe Projekt, da sie hohe Overhead-Kosten haben.
            <strong> HEADON positioniert sich dazwischen:</strong> Deutsche Entwickler mit direkter
            Kommunikation, moderne Technologien, aber durch Remote-Work und schlanke Strukturen
            deutlich günstiger als klassische Agenturen. Qualität muss nicht unbezahlbar sein.
          </p>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
            <p className="text-gray-900 font-semibold mb-2">⚡ Praxis-Tipp für Starter</p>
            <p className="text-gray-700 mb-0">
              Beginnen Sie mit einer schlanken Homepage (5 Seiten, Semi-Custom-Design, Basis-SEO)
              und erweitern Sie später schrittweise. Das spart initial Kosten und Sie sammeln
              Erfahrungen, welche Features Sie wirklich benötigen. Nutzen Sie unseren Rechner oben
              für eine erste Orientierung.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ Section - Unique questions for "homepage kosten" */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Häufig gestellte Fragen zu Homepage-Kosten
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet eine einfache Homepage für Selbstständige?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Eine professionelle Homepage für Selbstständige mit 5 Seiten, responsivem Design,
                Kontaktformular und Basis-SEO kostet realistisch zwischen 2.500€ und 4.500€.
                Freelancer bieten manchmal günstigere Preise ab 1.500€, allerdings oft mit Abstrichen
                bei Design und Support. Budget-Lösungen unter 1.000€ basieren meist auf fertigen
                Templates mit minimaler Anpassung.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lohnt sich ein CMS für kleine Unternehmen?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Wenn Sie regelmäßig Blogbeiträge schreiben, Referenzen hinzufügen oder Öffnungszeiten
                ändern möchten, lohnt sich ein CMS definitiv. Die Mehrkosten von 800-1.500€ amortisieren
                sich schnell, da Sie keine Entwickler für jede Änderung bezahlen müssen. Für statische
                Visitenkarten-Websites ohne häufige Updates können Sie darauf verzichten.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welche laufenden Kosten kommen monatlich auf mich zu?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Für eine Business-Homepage sollten Sie mit 50-200€/Monat rechnen: Hosting (10-40€),
                Domain (1-2€), optional Wartung/Support (100-150€). Mit Wartungsvertrag sind Sie auf
                der sicheren Seite (Updates, Backups, Support), für technikaffine Unternehmer reicht
                auch Hosting + Domain ohne Wartung. Zusätzliche Tools wie Newsletter-Software können
                weitere 10-50€/Monat kosten.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ist Google-Optimierung im Grundpreis enthalten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Basis-SEO (sauberer Code, Meta-Tags, Mobile-Optimierung, Sitemap) sollte bei jeder
                professionellen Homepage inklusive sein. Erweiterte Optimierungen wie ausführliche
                Keyword-Recherche, Content-SEO, lokales SEO mit Google My Business Integration oder
                laufende SEO-Betreuung kosten extra – typischerweise 500-1.500€ einmalig oder
                300€+/Monat für kontinuierliche Betreuung.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Homepage vom Freelancer oder von einer Agentur?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Freelancer sind günstiger (1.500-4.000€), arbeiten aber alleine – bei Urlaub oder
                Krankheit gibt es Verzögerungen. Agenturen bieten mehr Sicherheit und Expertise,
                kosten aber deutlich mehr (5.000-15.000€). HEADON kombiniert beides: professionelle
                Teams mit Agentur-Qualität, aber Remote-First-Struktur ohne Overhead-Kosten. So
                erhalten Sie zuverlässige Qualität zu fairen Preisen.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kann ich meine Homepage später selbst erweitern?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Mit einem CMS können Sie Inhalte selbst ändern und neue Seiten hinzufügen. Für
                technische Erweiterungen (neue Features, Design-Anpassungen) benötigen Sie weiterhin
                Entwickler-Support. Professionell programmierte Homepages sind modular aufgebaut –
                Erweiterungen sind jederzeit möglich. Planen Sie bereits initial eine saubere Struktur,
                um spätere Anpassungen kostengünstig zu halten.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für Ihre professionelle Business-Homepage?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Lassen Sie uns gemeinsam Ihre Anforderungen besprechen und ein individuelles Angebot erstellen.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Jetzt kostenloses Erstgespräch vereinbaren
          </a>
        </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}
