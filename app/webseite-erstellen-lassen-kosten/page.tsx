import { CostCalculator } from '@/components/calculator/CostCalculator'
import { CheckCircle2 } from 'lucide-react'
import { createCalculatorSchema, type FAQItem } from '@/lib/calculator/schema-builder'

export { metadata } from './metadata'

// FAQ items for Schema.org structured data
const faqItems: FAQItem[] = [
  {
    question: 'Was kostet eine einfache Webseite erstellen zu lassen?',
    answer:
      'Eine einfache Unternehmenswebsite mit 5-8 Seiten, responsivem Design und Basis-Funktionen kostet bei Freelancern ab 1.500€, bei Agenturen 4.000-8.000€ und bei HEADON ab 2.500€. Der finale Preis hängt vom Design-Aufwand und den gewünschten Features ab.',
  },
  {
    question: 'Welche laufenden Kosten kommen nach dem Launch auf mich zu?',
    answer:
      'Zu den laufenden Kosten gehören Hosting (5-50€/Monat), Domain (10-20€/Jahr), SSL-Zertifikat (meist kostenlos), Wartung und Updates (optional 150-350€/Monat) und eventuell Premium-Plugins oder Tools. Insgesamt sollten Sie mit 200-500€/Monat kalkulieren.',
  },
  {
    question: 'Wie lange dauert es, eine Webseite erstellen zu lassen?',
    answer:
      'Eine einfache Website kann in 2-4 Wochen fertig sein. Komplexere Projekte mit Custom-Design, umfangreichen Funktionen oder E-Commerce benötigen 6-12 Wochen. HEADON arbeitet mit agilen Methoden und kurzen Entwicklungszyklen – so sehen Sie kontinuierlich Fortschritte.',
  },
  {
    question: 'Ist ein CMS notwendig und was kostet es extra?',
    answer:
      'Ein Content Management System (CMS) wie Strapi, Sanity oder WordPress ermöglicht es Ihnen, Inhalte selbst zu pflegen ohne Programmierkenntnisse. Die Integration kostet je nach System 800-2.500€ zusätzlich. Für statische Websites ohne häufige Änderungen ist ein CMS nicht zwingend nötig.',
  },
  {
    question: 'Was beeinflusst die Kosten für SEO-Optimierung?',
    answer:
      'Basis-SEO (Meta-Tags, sauberer Code, Mobile-Optimierung) ist oft im Grundpreis enthalten. Erweiterte SEO-Maßnahmen wie Keyword-Recherche, Content-Optimierung, Schema-Markup und technische Audits kosten 500-2.000€ zusätzlich. Laufende SEO-Betreuung wird oft monatlich abgerechnet (ab 300€/Monat).',
  },
  {
    question: 'Kann ich meine Webseite später erweitern?',
    answer:
      'Ja, professionell entwickelte Websites sind modular aufgebaut und können jederzeit erweitert werden. Neue Seiten, Features oder Design-Anpassungen können schrittweise hinzugefügt werden. Wir empfehlen, bereits bei der Planung künftige Erweiterungen zu berücksichtigen, um die Architektur entsprechend zu gestalten.',
  },
  {
    question: 'Welche Zahlungsmodelle gibt es?',
    answer:
      'Die meisten Anbieter arbeiten mit Festpreisen basierend auf einem definierten Leistungsumfang. Alternativ gibt es Stundensatz-Abrechnungen (60-150€/h je nach Anbieter) oder Ratenzahlungen (z.B. 30% Anzahlung, 40% bei Halbzeit, 30% bei Abnahme). HEADON bietet transparente Festpreise mit klarem Leistungskatalog.',
  },
  {
    question: 'Was ist der Unterschied zwischen Freelancer, Agentur und HEADON?',
    answer:
      'Freelancer sind günstig (1.500-4.000€) aber oft ausgelastet und arbeiten alleine. Agenturen bieten Full-Service (5.000-15.000€+) mit hohen Overhead-Kosten. HEADON kombiniert beides: Professionelle Teams mit Agentur-Qualität, aber durch Remote-First-Struktur 30-50% günstiger (2.500-8.000€). Direkte Kommunikation ohne Account-Manager-Overhead.',
  },
]

const schema = createCalculatorSchema(faqItems)

export default function WebseiteErstellenLassenKostenPage() {
  return (
    <>
      {/* Hero & Calculator Section - Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Webseite erstellen lassen – Was kostet es wirklich?{' '}
              <span className="text-white/90">(2025)</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Transparente Kostenkalkulation in 2 Minuten. Vergleichen Sie Freelancer, Agenturen und
              HEADON-Preise direkt – ohne versteckte Kosten.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>KI-gestützte Entwicklung</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>4x schnellere Umsetzung</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>40% günstiger als Agenturen</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <CostCalculator />
        </div>
      </section>

      {/* Unique Content Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Der Gesamtprozess: Von der Idee zur fertigen Webseite
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Die Kosten für eine professionelle Webseite hängen von zahlreichen Faktoren ab – von
            der Komplexität des Designs über die benötigten Funktionen bis hin zu
            Qualitätsanforderungen wie SEO-Optimierung und Performance. Doch was genau bestimmt den
            Preis, und wie unterscheiden sich die Anbieter?
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Die entscheidenden Kostenfaktoren
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>1. Projekttyp und Umfang:</strong> Eine einfache Unternehmenswebsite mit 5
            Seiten kostet deutlich weniger als ein komplexer Online-Shop mit hunderten Produkten
            oder eine Web-App mit individuellen Funktionen. Der Seitenumfang, die Anzahl der
            Unterseiten und die gewünschte Navigationsstruktur bilden die Basis jeder
            Kostenkalkulation.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>2. Design-Qualität und Individualität:</strong> Template-basierte Lösungen sind
            günstiger, bieten aber weniger Individualität. Ein maßgeschneidertes Design, das Ihre
            Markenidentität perfekt widerspiegelt, erfordert mehr Designarbeit und damit höhere
            Investitionen. Premium-Designs mit aufwendigen Animationen und UX-Konzepten liegen
            preislich nochmals darüber.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>3. Funktionalität und Features:</strong> Benötigen Sie ein Content Management
            System (CMS) zur einfachen Inhaltspflege? Soll ein Benutzer-Login mit Authentifizierung
            integriert werden? Payment-Systeme, Datenbank-Anbindungen, API-Schnittstellen zu
            Drittsystemen oder mehrsprachige Inhalte – jede zusätzliche Funktion erhöht den
            Entwicklungsaufwand proportional.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>4. Qualität und Performance:</strong> Eine professionelle Webseite sollte nicht
            nur gut aussehen, sondern auch technisch überzeugen. SEO-Optimierung sorgt für bessere
            Google-Rankings, Performance-Optimierung für schnelle Ladezeiten (wichtig für
            Conversion-Rates!), und Sicherheitsmaßnahmen schützen Ihre Daten. Barrierefreiheit nach
            WCAG-Standards erweitert Ihre Zielgruppe erheblich.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>5. Support und Wartung:</strong> Nach dem Launch beginnt die Betreuungsphase.
            Regelmäßige Updates, technischer Support, Hosting-Management und kontinuierliche
            Optimierungen sind essenziell für den langfristigen Erfolg Ihrer Webseite. Viele
            Anbieter bieten Wartungspakete mit monatlichen Gebühren an.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Freelancer vs. Agentur vs. HEADON – Der Unterschied
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Freelancer</strong> bieten oft die günstigsten Preise, arbeiten aber meist
            alleine und haben begrenzte Kapazitäten. Die Qualität variiert stark, und bei
            krankheitsbedingten Ausfällen kann es zu Verzögerungen kommen. Ideal für kleinere
            Projekte mit flexiblem Zeitrahmen.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Klassische Agenturen</strong> haben große Teams, hohe Overhead-Kosten und
            entsprechend hohe Preise. Dafür erhalten Sie umfassende Betreuung, Projekt-Management
            und oft auch Marketing-Services. Die Umsetzung dauert häufig länger durch mehrere
            Abstimmungsrunden und hierarchische Strukturen.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>HEADON kombiniert das Beste aus beiden Welten:</strong> Professionelle Qualität
            wie eine Agentur, aber schlanke Prozesse und faire Preise durch effiziente
            Remote-First-Arbeitsweise. Sie erhalten direkten Kontakt zu Ihren Entwicklern, schnelle
            Umsetzungszeiten und modernste Technologien – ohne Agentur-Overhead.
          </p>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
            <p className="text-gray-900 font-semibold mb-2">💡 Unser Tipp:</p>
            <p className="text-gray-700 mb-0">
              Nutzen Sie unseren Kostenrechner oben, um eine erste Einschätzung zu erhalten.
              Anschließend empfehlen wir ein kostenloses Beratungsgespräch, in dem wir Ihr Projekt
              im Detail besprechen und ein präzises Angebot erstellen können.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet eine einfache Webseite erstellen zu lassen?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Eine einfache Unternehmenswebsite mit 5-8 Seiten, responsivem Design und
                Basis-Funktionen kostet bei Freelancern ab 1.500€, bei Agenturen 4.000-8.000€ und
                bei HEADON ab 2.500€. Der finale Preis hängt vom Design-Aufwand und den gewünschten
                Features ab.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welche laufenden Kosten kommen nach dem Launch auf mich zu?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Zu den laufenden Kosten gehören Hosting (5-50€/Monat), Domain (10-20€/Jahr),
                SSL-Zertifikat (meist kostenlos), Wartung und Updates (optional 150-350€/Monat) und
                eventuell Premium-Plugins oder Tools. Insgesamt sollten Sie mit 200-500€/Monat
                kalkulieren.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie lange dauert es, eine Webseite erstellen zu lassen?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Eine einfache Website kann in 2-4 Wochen fertig sein. Komplexere Projekte mit
                Custom-Design, umfangreichen Funktionen oder E-Commerce benötigen 6-12 Wochen.
                HEADON arbeitet mit agilen Methoden und kurzen Entwicklungszyklen – so sehen Sie
                kontinuierlich Fortschritte.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ist ein CMS notwendig und was kostet es extra?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ein Content Management System (CMS) wie Strapi, Sanity oder WordPress ermöglicht es
                Ihnen, Inhalte selbst zu pflegen ohne Programmierkenntnisse. Die Integration kostet
                je nach System 800-2.500€ zusätzlich. Für statische Websites ohne häufige
                Änderungen ist ein CMS nicht zwingend nötig.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was beeinflusst die Kosten für SEO-Optimierung?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Basis-SEO (Meta-Tags, sauberer Code, Mobile-Optimierung) ist oft im Grundpreis
                enthalten. Erweiterte SEO-Maßnahmen wie Keyword-Recherche, Content-Optimierung,
                Schema-Markup und technische Audits kosten 500-2.000€ zusätzlich. Laufende
                SEO-Betreuung wird oft monatlich abgerechnet (ab 300€/Monat).
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kann ich meine Webseite später erweitern?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ja, professionell entwickelte Websites sind modular aufgebaut und können jederzeit
                erweitert werden. Neue Seiten, Features oder Design-Anpassungen können schrittweise
                hinzugefügt werden. Wir empfehlen, bereits bei der Planung künftige Erweiterungen zu
                berücksichtigen, um die Architektur entsprechend zu gestalten.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welche Zahlungsmodelle gibt es?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Die meisten Anbieter arbeiten mit Festpreisen basierend auf einem definierten
                Leistungsumfang. Alternativ gibt es Stundensatz-Abrechnungen (60-150€/h je nach
                Anbieter) oder Ratenzahlungen (z.B. 30% Anzahlung, 40% bei Halbzeit, 30% bei
                Abnahme). HEADON bietet transparente Festpreise mit klarem Leistungskatalog.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was ist der Unterschied zwischen Website und Web-App?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Eine klassische Website dient primär der Informationsvermittlung (z.B.
                Unternehmensseite, Blog). Eine Web-App bietet interaktive Funktionen wie
                User-Logins, Dashboards, Datenverarbeitung oder komplexe Tools. Web-Apps sind
                technisch anspruchsvoller und daher teurer (ab 8.000€), bieten aber deutlich mehr
                Funktionalität.
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
            Bereit für Ihr Webseiten-Projekt?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Vereinbaren Sie ein kostenloses Erstgespräch und erhalten Sie ein maßgeschneidertes
            Angebot.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Kostenloses Beratungsgespräch buchen
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
