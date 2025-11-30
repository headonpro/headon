import { CostCalculator } from '@/components/calculator/CostCalculator'
import { CheckCircle2, Users, Briefcase, TrendingUp } from 'lucide-react'
import { createCalculatorSchema, type FAQItem } from '@/lib/calculator/schema-builder'

export { metadata } from './metadata'

// FAQ items for Schema.org structured data
const faqItems: FAQItem[] = [
  {
    question: 'Was ist ein realistischer Stundensatz für Webdesigner?',
    answer:
      'Freelancer verlangen typischerweise 60-120€/Stunde, abhängig von Erfahrung, Spezialisierung und Region. Junior-Entwickler starten bei 40-60€/h, Senior-Entwickler mit 10+ Jahren Erfahrung liegen bei 100-150€/h. Agenturen rechnen intern mit 100-200€/h (Verrechnungssatz), wobei der Client-Stundensatz oft höher liegt durch Overhead. HEADON liegt bei effektiv 70-110€/h bei Festpreis-Projekten.',
  },
  {
    question: 'Wie hoch ist der Stundensatz für Webentwickler?',
    answer:
      'Der Stundensatz für Webentwickler liegt 2025 zwischen 50€ und 150€ pro Stunde. Junior-Webentwickler starten bei 50-70€/h, Mid-Level-Entwickler bei 70-100€/h, und Senior-Webentwickler mit Spezialisierung (React, Node.js, etc.) verlangen 100-150€/h. Der Stundensatz Webentwickler ist meist 10-20% höher als beim reinen Webdesigner, da Backend-Entwicklung und technische Architektur mehr Fachwissen erfordern.',
  },
  {
    question: 'Was kostet Webdesign pro Stunde bei einem Freelancer?',
    answer:
      'Der Freelancer Webdesign Stundensatz liegt in Deutschland zwischen 60€ und 120€ pro Stunde. Faktoren: Erfahrungslevel (Junior 40-60€, Senior 100-150€), Spezialisierung (UI/UX-Designer oft teurer), Region (Großstadt vs. ländlich), und Projektart. Bei Festpreis-Projekten ist der effektive Stundensatz oft günstiger. Vergleichen Sie immer Gesamtkosten, nicht nur Stundensätze.',
  },
  {
    question: 'Warum sind Agentur-Preise so viel höher als Freelancer-Preise?',
    answer:
      'Agenturen haben hohe Fixkosten: Büroräume (Miete, Nebenkosten), Management und Administration (Projektmanager, Controller, HR), Vertrieb und Marketing, sowie Gewinnmargen für Gesellschafter. Diese Overhead-Kosten werden auf Projekte umgelegt – oft 40-60% der Projektkosten. Ein Freelancer hat nur seine eigene Arbeitszeit und minimale Fixkosten, daher die niedrigeren Preise. Remote-Teams wie HEADON eliminieren Bürokosten und haben schlanke Strukturen, daher Mittelweg-Preise.',
  },
  {
    question: 'Festpreis oder Stundensatz – was ist besser?',
    answer:
      'Festpreis ist ideal, wenn Ihr Projekt klar definiert ist und sich der Umfang nicht ändern wird. Sie haben Budgetsicherheit und keine Überraschungen. Stundensatz (Time & Material) passt besser für explorative Projekte, bei denen Anforderungen sich entwickeln oder für laufende Betreuung. Viele Projekte kombinieren beide: Festpreis für initiale Entwicklung, Stundensatz für spätere Anpassungen. Bei Festpreis unbedingt Change-Request-Prozess vereinbaren.',
  },
  {
    question: 'Wie erkenne ich überteuerte Angebote?',
    answer:
      'Warnsignale: Angebote, die deutlich über Marktpreisen liegen ohne klare Begründung (z.B. 20.000€ für eine einfache 5-Seiten-Website). Unklare Leistungsbeschreibungen oder vage Formulierungen. Versteckte Kosten (z.B. "ab 5.000€" ohne detailliertes Briefing). Lange Laufzeiten ohne Meilensteine. Tipp: Holen Sie 3 Angebote ein, vergleichen Sie Leistungsumfang UND Preis. Nutzen Sie unseren Rechner oben für Orientierung an Marktpreisen.',
  },
  {
    question: 'Was kostet ein Webdesigner pro Monat als Retainer?',
    answer:
      'Retainer-Modelle starten typischerweise bei 1.000€/Monat für 10-15 Stunden Betreuung (kleinere Websites, monatliche Updates). Für umfangreichere Betreuung (20-40h/Monat) liegen Retainer bei 2.000-5.000€/Monat. Enterprise-Kunden mit dedizierten Teams zahlen 10.000€+/Monat. Der Stundensatz im Retainer ist meist 10-20% günstiger als bei Ad-hoc-Anfragen. Achten Sie auf Kündigungsfristen (meist 3 Monate) und ob nicht genutzte Stunden verfallen oder übertragbar sind.',
  },
  {
    question: 'Lohnt sich ein günstiger Freelancer aus dem Ausland?',
    answer:
      'Freelancer aus Osteuropa oder Asien bieten oft Stundensätze von 20-50€/h an – deutlich günstiger als deutsche Preise. Aber: Kommunikation kann schwierig sein (Sprache, Zeitzone), Qualität variiert stark, rechtliche Aspekte (DSGVO!) sind komplex, und Support nach Projektende ist oft schwierig. Für einfache, klar definierte Projekte mit guten Briefings kann es funktionieren. Für komplexe Business-Anwendungen empfehlen wir deutsche oder EU-Entwickler aufgrund Qualität, Rechtssicherheit und Kommunikation.',
  },
  {
    question: 'Welche versteckten Kosten gibt es bei Webdesign-Projekten?',
    answer:
      'Häufig nicht inkludiert und später berechnet: Premium-Plugins oder Themes (50-500€), Stock-Fotos oder Lizenzgebühren (200-1.000€), SSL-Zertifikate (oft kostenlos, aber manche Agenturen berechnen 50-100€/Jahr), erweiterte Funktionen, die im Briefing nicht erwähnt wurden (Change Requests!), Launch-Support außerhalb Geschäftszeiten, Content-Migration von alter Website, Schulungen für Ihr Team. Tipp: Lassen Sie sich ein detailliertes Angebot mit allen Positionen geben und fragen Sie explizit nach: "Was ist NICHT inkludiert?"',
  },
]

const schema = createCalculatorSchema(faqItems)

export default function WebdesignerPreisePage() {
  return (
    <>
      {/* Hero & Calculator Section - Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <TrendingUp className="h-4 w-4" />
              <span>Dienstleister-Vergleich 2025</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Webdesigner Preise & Stundensätze 2025 –{' '}
              <span className="text-white/90">Kosten transparent vergleichen</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Freelancer, Agentur oder HEADON? Vergleichen Sie Webdesigner-Preise, Stundensätze und
              Projektkosten direkt – mit allen Vor- und Nachteilen.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>3-Wege-Vergleich</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>Echte Marktpreise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent-500" />
                <span>Unverbindlich</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <CostCalculator />
        </div>
      </section>

      {/* Unique Content Section - Focus: Freelancer vs Agentur Dienstleister-Vergleich */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Webdesigner-Preise verstehen: Der große Anbieter-Vergleich
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Die Preisspanne bei Webdesign-Dienstleistungen ist enorm: Von 500€ bis 50.000€ für
            scheinbar ähnliche Projekte. Doch woher kommen diese Unterschiede? Der entscheidende
            Faktor ist nicht nur die Qualität, sondern <strong>die Art des Dienstleisters</strong>
            – denn Freelancer, Agenturen und moderne Remote-Teams haben völlig unterschiedliche
            Kostenstrukturen und Arbeitsweisen.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Freelancer: Flexibel und direkt, aber mit Risiken
          </h3>

          <div className="bg-primary-50 border-l-4 border-primary-500 p-6 my-6 rounded-r-lg not-prose">
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 mb-2">Typische Freelancer-Preise:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Stundensatz: 60-120€/h (je nach Erfahrung und Spezialisierung)</li>
                  <li>Einfache Website: 1.500-4.000€</li>
                  <li>Komplexe Website/Web-App: 5.000-15.000€</li>
                  <li>Laufzeit: oft 20-40% schneller als Agenturen</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Vorteile:</strong> Freelancer arbeiten meist alleine oder in kleinen Teams, haben
            niedrige Overhead-Kosten und können daher günstige Preise anbieten. Die Kommunikation ist
            direkt – Sie sprechen mit dem Entwickler, der Ihr Projekt umsetzt. Entscheidungswege sind
            kurz, Anpassungen können schnell umgesetzt werden. Viele Freelancer sind hochspezialisiert
            und bringen tiefes Fachwissen in spezifischen Bereichen mit.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Nachteile:</strong> Die Kapazität ist begrenzt – bei Krankheit oder Urlaub steht
            das Projekt still. Freelancer decken selten alle Bereiche ab (Design, Frontend, Backend,
            DevOps) – für komplexe Projekte benötigen Sie oft mehrere Freelancer, was die Koordination
            erschwert. Die Qualität variiert stark: Von hochprofessionellen Experten bis zu
            Einsteigern ist alles dabei. Support nach Projektabschluss ist oft nicht garantiert.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Klassische Agenturen: Rundum-Service zum Premium-Preis
          </h3>

          <div className="bg-secondary-50 border-l-4 border-secondary-500 p-6 my-6 rounded-r-lg not-prose">
            <div className="flex items-start gap-3">
              <Briefcase className="h-6 w-6 text-secondary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 mb-2">Typische Agentur-Preise:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Stundensatz: 100-200€/h (interne Verrechnungssätze)</li>
                  <li>Einfache Website: 5.000-12.000€</li>
                  <li>Komplexe Website/Web-App: 15.000-100.000€+</li>
                  <li>Laufzeit: oft länger durch Abstimmungsschleifen</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Vorteile:</strong> Agenturen bieten Full-Service aus einer Hand – von der
            Konzeption über Design und Entwicklung bis zu Marketing und Support. Große Teams bedeuten
            hohe Kapazitäten und parallele Bearbeitung. Sie haben etablierte Prozesse, Qualitätssicherung
            und oft langjährige Erfahrung mit Enterprise-Kunden. Das Ausfallrisiko ist minimal, da
            mehrere Personen am Projekt arbeiten.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Nachteile:</strong> Die Preise sind deutlich höher durch hohe Overhead-Kosten
            (Büro, Management, Vertrieb, Administration). Kommunikationswege sind oft lang – Sie
            sprechen mit Projektmanagern statt mit den Entwicklern. Hierarchische Strukturen führen
            zu längeren Entscheidungswegen. Viele Agenturen verkaufen mehr als sie selbst leisten
            können und lagern an Subunternehmer aus. Mindestbudgets von 10.000€+ sind üblich.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            HEADON: Das Beste aus beiden Welten
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Remote-First-Teams kombinieren die Vorteile</strong> ohne die Nachteile:
            Professionelle Entwickler-Teams mit Agentur-Qualität, aber durch Remote-Arbeit ohne
            teure Büros und aufgeblähte Strukturen. Sie erhalten direkten Kontakt zu Ihren
            Entwicklern (wie beim Freelancer), haben aber die Sicherheit eines Teams (wie bei
            einer Agentur). Moderne Tech-Stacks, agile Methoden und faire Preise durch effiziente
            Prozesse – typischerweise 30-50% günstiger als klassische Agenturen bei vergleichbarer
            Qualität.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">FREELANCER</p>
              <p className="text-3xl font-bold text-primary-600 mb-1">60-120€</p>
              <p className="text-xs text-gray-500">pro Stunde</p>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-secondary-600 font-medium">✓ Günstig</p>
                <p className="text-xs text-secondary-600 font-medium">✓ Direkt</p>
                <p className="text-xs text-gray-500 font-medium">✗ Ausfallrisiko</p>
              </div>
            </div>

            <div className="bg-white border-2 border-primary-500 rounded-lg p-6 text-center shadow-lg">
              <p className="text-sm font-semibold text-primary-600 mb-2">HEADON</p>
              <p className="text-3xl font-bold text-primary-600 mb-1">70-110€</p>
              <p className="text-xs text-gray-500">effektiv/Stunde</p>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-secondary-600 font-medium">✓ Fair</p>
                <p className="text-xs text-secondary-600 font-medium">✓ Team</p>
                <p className="text-xs text-secondary-600 font-medium">✓ Modern</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">AGENTUR</p>
              <p className="text-3xl font-bold text-gray-700 mb-1">100-200€</p>
              <p className="text-xs text-gray-500">pro Stunde</p>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-secondary-600 font-medium">✓ Full-Service</p>
                <p className="text-xs text-gray-500 font-medium">✗ Teuer</p>
                <p className="text-xs text-gray-500 font-medium">✗ Langsam</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Stundensatz Webdesign & Webentwicklung 2025
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Der <strong>Stundensatz für Webdesigner</strong> und <strong>Webentwickler</strong> variiert
            stark je nach Erfahrung, Spezialisierung und Anstellungsart. Hier die aktuellen Marktpreise
            für Deutschland:
          </p>

          <div className="overflow-x-auto my-8 not-prose">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Anbieter-Typ</th>
                  <th className="px-4 py-3 text-left font-semibold">Stundensatz</th>
                  <th className="px-4 py-3 text-left font-semibold">Besonderheiten</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Junior Webdesigner/Entwickler</td>
                  <td className="px-4 py-3">40–60 €/h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1-3 Jahre Erfahrung, einfache Projekte</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Mid-Level Freelancer</td>
                  <td className="px-4 py-3">60–90 €/h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">3-7 Jahre, breites Skillset</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Senior Webentwickler</td>
                  <td className="px-4 py-3">90–150 €/h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">7+ Jahre, Spezialist oder Full-Stack</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Freelancer Webdesign (Durchschnitt)</td>
                  <td className="px-4 py-3">60–120 €/h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Direkte Kommunikation, flexibel</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-primary-50">
                  <td className="px-4 py-3 font-medium text-primary-700">HEADON (Remote-Team)</td>
                  <td className="px-4 py-3 font-semibold text-primary-700">70–110 €/h effektiv</td>
                  <td className="px-4 py-3 text-sm text-primary-600">Festpreise, Team-Backup, modern</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">Agentur (intern)</td>
                  <td className="px-4 py-3">100–200 €/h</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Overhead, Projektmanagement inkl.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Wichtig:</strong> Der <strong>Stundensatz Webentwickler</strong> liegt oft 10-20% höher
            als beim reinen Webdesigner, da technische Implementierung (Backend, APIs, Datenbanken)
            spezialisiertes Know-how erfordert. Bei Festpreis-Projekten ist der effektive Stundensatz
            meist günstiger, da effizient gearbeitet wird.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Preismodelle im Webdesign: Was Sie wissen sollten
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Festpreis-Projekte:</strong> Klarer Leistungsumfang wird im Voraus definiert,
            Sie zahlen einen fixen Betrag. Ideal für Projekte mit klaren Anforderungen. Vorsicht:
            Nachträgliche Änderungen kosten extra. Freelancer und HEADON arbeiten oft mit
            Festpreisen, Agenturen bevorzugen dieses Modell für kleinere Projekte.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Stundensatz-Abrechnung (Time & Material):</strong> Flexibles Modell, bei dem
            tatsächlich geleistete Stunden abgerechnet werden. Gut für explorative Projekte oder
            wenn der Umfang noch unklar ist. Risiko: Kosten können ausufern. Transparente
            Zeiterfassung und regelmäßige Updates sind hier essenziell. Üblich bei allen Anbietern
            für Wartung und Erweiterungen.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Monatliche Retainer:</strong> Sie buchen ein monatliches Stundenkontingent zu
            vergünstigtem Stundensatz (z.B. 20h/Monat). Ideal für laufende Betreuung, regelmäßige
            Updates oder Weiterentwicklung. Planbare Kosten, aber: Ungenutzte Stunden verfallen oft.
            Agenturen und HEADON bieten Retainer-Modelle an, Freelancer seltener.
          </p>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
            <p className="text-gray-900 font-semibold mb-2">💡 Entscheidungshilfe</p>
            <p className="text-gray-700 mb-0">
              <strong>Wählen Sie einen Freelancer,</strong> wenn: Budget knapp ist, Projekt klein/klar
              definiert, direkte Kommunikation wichtig.
              <br />
              <strong>Wählen Sie HEADON,</strong> wenn: Sie professionelle Qualität zu fairen Preisen
              suchen, ein Team benötigen, moderne Tech-Stacks wichtig sind.
              <br />
              <strong>Wählen Sie eine Agentur,</strong> wenn: Budget groß ist, Full-Service gewünscht,
              Enterprise-Projekt mit vielen Stakeholdern.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ Section - 7 questions about webdesigner costs/pricing models */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Häufig gestellte Fragen zu Webdesigner-Preisen
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was ist ein realistischer Stundensatz für Webdesigner?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Freelancer verlangen typischerweise 60-120€/Stunde, abhängig von Erfahrung,
                Spezialisierung und Region. Junior-Entwickler starten bei 40-60€/h, Senior-Entwickler
                mit 10+ Jahren Erfahrung liegen bei 100-150€/h. Agenturen rechnen intern mit
                100-200€/h (Verrechnungssatz), wobei der Client-Stundensatz oft höher liegt durch
                Overhead. HEADON liegt bei effektiv 70-110€/h bei Festpreis-Projekten.
              </p>
            </div>

            {/* FAQ 2 - NEU: Stundensatz Webentwickler */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie hoch ist der Stundensatz für Webentwickler?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Der Stundensatz für Webentwickler liegt 2025 zwischen 50€ und 150€ pro Stunde.
                Junior-Webentwickler starten bei 50-70€/h, Mid-Level-Entwickler bei 70-100€/h,
                und Senior-Webentwickler mit Spezialisierung (React, Node.js, etc.) verlangen
                100-150€/h. Der Stundensatz Webentwickler ist meist 10-20% höher als beim reinen
                Webdesigner, da Backend-Entwicklung und technische Architektur mehr Fachwissen erfordern.
              </p>
            </div>

            {/* FAQ 3 - NEU: Freelancer Webdesign Stundensatz */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet Webdesign pro Stunde bei einem Freelancer?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Der Freelancer Webdesign Stundensatz liegt in Deutschland zwischen 60€ und 120€
                pro Stunde. Faktoren: Erfahrungslevel (Junior 40-60€, Senior 100-150€),
                Spezialisierung (UI/UX-Designer oft teurer), Region (Großstadt vs. ländlich),
                und Projektart. Bei Festpreis-Projekten ist der effektive Stundensatz oft günstiger.
                Vergleichen Sie immer Gesamtkosten, nicht nur Stundensätze.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Warum sind Agentur-Preise so viel höher als Freelancer-Preise?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Agenturen haben hohe Fixkosten: Büroräume (Miete, Nebenkosten), Management und
                Administration (Projektmanager, Controller, HR), Vertrieb und Marketing, sowie
                Gewinnmargen für Gesellschafter. Diese Overhead-Kosten werden auf Projekte umgelegt
                – oft 40-60% der Projektkosten. Ein Freelancer hat nur seine eigene Arbeitszeit und
                minimale Fixkosten, daher die niedrigeren Preise. Remote-Teams wie HEADON eliminieren
                Bürokosten und haben schlanke Strukturen, daher Mittelweg-Preise.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Festpreis oder Stundensatz – was ist besser?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Festpreis ist ideal, wenn Ihr Projekt klar definiert ist und sich der Umfang nicht
                ändern wird. Sie haben Budgetsicherheit und keine Überraschungen. Stundensatz
                (Time & Material) passt besser für explorative Projekte, bei denen Anforderungen sich
                entwickeln oder für laufende Betreuung. Viele Projekte kombinieren beide: Festpreis
                für initiale Entwicklung, Stundensatz für spätere Anpassungen. Bei Festpreis unbedingt
                Change-Request-Prozess vereinbaren.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie erkenne ich überteuerte Angebote?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Warnsignale: Angebote, die deutlich über Marktpreisen liegen ohne klare Begründung
                (z.B. 20.000€ für eine einfache 5-Seiten-Website). Unklare Leistungsbeschreibungen
                oder vage Formulierungen. Versteckte Kosten (z.B. &quot;ab 5.000€&quot; ohne detailliertes
                Briefing). Lange Laufzeiten ohne Meilensteine. Tipp: Holen Sie 3 Angebote ein,
                vergleichen Sie Leistungsumfang UND Preis. Nutzen Sie unseren Rechner oben für
                Orientierung an Marktpreisen.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet ein Webdesigner pro Monat als Retainer?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Retainer-Modelle starten typischerweise bei 1.000€/Monat für 10-15 Stunden Betreuung
                (kleinere Websites, monatliche Updates). Für umfangreichere Betreuung (20-40h/Monat)
                liegen Retainer bei 2.000-5.000€/Monat. Enterprise-Kunden mit dedizierten Teams zahlen
                10.000€+/Monat. Der Stundensatz im Retainer ist meist 10-20% günstiger als bei
                Ad-hoc-Anfragen. Achten Sie auf Kündigungsfristen (meist 3 Monate) und ob nicht
                genutzte Stunden verfallen oder übertragbar sind.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lohnt sich ein günstiger Freelancer aus dem Ausland?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Freelancer aus Osteuropa oder Asien bieten oft Stundensätze von 20-50€/h an – deutlich
                günstiger als deutsche Preise. Aber: Kommunikation kann schwierig sein (Sprache,
                Zeitzone), Qualität variiert stark, rechtliche Aspekte (DSGVO!) sind komplex, und
                Support nach Projektende ist oft schwierig. Für einfache, klar definierte Projekte mit
                guten Briefings kann es funktionieren. Für komplexe Business-Anwendungen empfehlen wir
                deutsche oder EU-Entwickler aufgrund Qualität, Rechtssicherheit und Kommunikation.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welche versteckten Kosten gibt es bei Webdesign-Projekten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Häufig nicht inkludiert und später berechnet: Premium-Plugins oder Themes (50-500€),
                Stock-Fotos oder Lizenzgebühren (200-1.000€), SSL-Zertifikate (oft kostenlos, aber
                manche Agenturen berechnen 50-100€/Jahr), erweiterte Funktionen, die im Briefing nicht
                erwähnt wurden (Change Requests!), Launch-Support außerhalb Geschäftszeiten,
                Content-Migration von alter Website, Schulungen für Ihr Team. Tipp: Lassen Sie sich ein
                detailliertes Angebot mit allen Positionen geben und fragen Sie explizit nach:
                &quot;Was ist NICHT inkludiert?&quot;
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
            Bereit für eine faire Kalkulation?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Vergleichen Sie Webdesigner-Preise transparent und finden Sie die beste Option für Ihr Projekt.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Kostenloses Beratungsgespräch vereinbaren
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
