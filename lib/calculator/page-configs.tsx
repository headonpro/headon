/**
 * Calculator Page Configurations
 *
 * Centralized content for all calculator landing pages.
 * Each page gets unique content for SEO while sharing the same layout structure.
 */

import {
  Sparkles,
  Code2,
  Lightbulb,
  Layout,
  Palette,
  Settings,
  Zap,
  Headphones,
  TrendingDown,
  Clock,
  Target,
} from 'lucide-react'
import { type FAQItem } from '@/lib/calculator/schema-builder'
import { type CalculatorPageConfig } from '@/components/calculator/CalculatorPageTemplate'
import { InfoBox } from '@/components/ui/info-box'
import { FeatureGrid, type Feature } from '@/components/ui/feature-grid'
import { ComparisonTable, type ComparisonColumn } from '@/components/ui/comparison-table'
import { StatHighlight } from '@/components/ui/stat-highlight'

// ============================================================================
// 1. Webseite Erstellen Lassen Kosten
// ============================================================================

// Feature-Daten für FeatureGrid
const kostenfaktoren: Feature[] = [
  {
    icon: Layout,
    title: 'Projekttyp & Umfang',
    description:
      'Eine einfache Unternehmenswebsite mit 5 Seiten kostet deutlich weniger als ein komplexer Online-Shop oder eine Web-App mit individuellen Funktionen.',
  },
  {
    icon: Palette,
    title: 'Design-Qualität',
    description:
      'Template-basierte Lösungen sind günstiger, bieten aber weniger Individualität. Maßgeschneidertes Design spiegelt Ihre Markenidentität perfekt wider.',
  },
  {
    icon: Settings,
    title: 'Funktionalität & Features',
    description:
      'CMS, Benutzer-Login, Payment-Systeme, Datenbank-Anbindungen, API-Schnittstellen – jede zusätzliche Funktion erhöht den Entwicklungsaufwand.',
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    description:
      'SEO-Optimierung für bessere Google-Rankings, Performance-Optimierung für schnelle Ladezeiten und Sicherheitsmaßnahmen zum Schutz Ihrer Daten.',
  },
  {
    icon: Headphones,
    title: 'Support & Wartung',
    description:
      'Regelmäßige Updates, technischer Support, Hosting-Management und kontinuierliche Optimierungen sind essenziell für langfristigen Erfolg.',
  },
]

// Anbieter-Vergleich für ComparisonTable
const anbieterVergleich: ComparisonColumn[] = [
  {
    name: 'Freelancer',
    price: '1.500-4.000€',
    pros: [
      'Günstigste Option',
      'Direkte Kommunikation',
      'Flexible Arbeitszeiten',
      'Oft persönlicher Service',
    ],
    cons: [
      'Arbeitet alleine – begrenzte Kapazitäten',
      'Bei Krankheit/Urlaub Verzögerungen',
      'Qualität stark variierend',
      'Keine Redundanz im Team',
    ],
  },
  {
    name: 'HEADON',
    price: '2.500-8.000€',
    badge: 'Beste Preis-Leistung',
    highlight: true,
    pros: [
      'Professionelles Team',
      'Agentur-Qualität zu fairen Preisen',
      'Direkte Entwickler-Kommunikation',
      '30-50% günstiger als Agenturen',
      'Moderne Technologien & Methoden',
      'Schnelle Umsetzung durch KI-Support',
    ],
    cons: ['Preislich über Budget-Freelancern'],
  },
  {
    name: 'Klassische Agentur',
    price: '5.000-15.000€+',
    pros: [
      'Große Teams & viel Erfahrung',
      'Full-Service mit Marketing',
      'Umfassendes Projektmanagement',
      'Etablierte Prozesse',
    ],
    cons: [
      'Hohe Overhead-Kosten',
      'Längere Abstimmungswege',
      'Account-Manager statt direkter Kontakt',
      'Hierarchische Strukturen',
    ],
  },
]

const webseiteErstellenLassenKostenFAQs: FAQItem[] = [
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

export const webseiteErstellenLassenKostenConfig: CalculatorPageConfig = {
  badge: {
    icon: Sparkles,
    text: 'Transparent & Fair kalkuliert',
  },
  h1: 'Webseite erstellen lassen –',
  h1Accent: 'Was kostet es wirklich?',
  h1Suffix: '(2025)',
  subtitle:
    'Transparente Kostenkalkulation in 2 Minuten. Vergleichen Sie Freelancer, Agenturen und HEADON-Preise direkt – ohne versteckte Kosten.',
  trustIndicators: ['KI-gestützte Entwicklung', '4x schnellere Umsetzung', '40% günstiger als Agenturen'],

  contentSections: [
    {
      title: 'Von der Idee zur fertigen Webseite – Was bestimmt die Kosten?',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-6">
            Die Kosten für eine professionelle Webseite hängen von zahlreichen Faktoren ab – von der
            Komplexität des Designs über die benötigten Funktionen bis hin zu Qualitätsanforderungen wie
            SEO-Optimierung und Performance. Doch was genau bestimmt den Preis, und wie unterscheiden sich
            die Anbieter?
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-6">
            Die 5 entscheidenden Kostenfaktoren
          </h3>

          <FeatureGrid features={kostenfaktoren} columns={3} />

          <InfoBox variant="tip" icon={Lightbulb} title="💡 Budget-Tipp für Starter">
            <p>
              Beginnen Sie mit einer schlanken Website (5-8 Seiten, Semi-Custom-Design, Basis-SEO) und
              erweitern Sie später schrittweise. Das spart initial Kosten und Sie sammeln Erfahrungen,
              welche Features Sie wirklich benötigen.
            </p>
          </InfoBox>

          <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Freelancer vs. Agentur vs. HEADON – Der direkte Vergleich
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Die Wahl des richtigen Partners hat massiven Einfluss auf Qualität, Preis und Umsetzungszeit.
            Hier der transparente Vergleich:
          </p>

          <ComparisonTable columns={anbieterVergleich} />

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <StatHighlight value="40%" label="günstiger als Agenturen" icon={TrendingDown} variant="primary" />
            <StatHighlight value="4x" label="schnellere Umsetzung" icon={Clock} variant="secondary" />
            <StatHighlight value="100%" label="transparente Preise" icon={Target} variant="accent" />
          </div>

          <InfoBox variant="info" title="🎯 Unser Ansatz bei HEADON">
            <p>
              Wir kombinieren das Beste aus beiden Welten: Professionelle Qualität wie eine Agentur, aber
              schlanke Prozesse und faire Preise durch effiziente Remote-First-Arbeitsweise. Sie erhalten
              direkten Kontakt zu Ihren Entwicklern, schnelle Umsetzungszeiten und modernste Technologien –
              ohne Agentur-Overhead.
            </p>
          </InfoBox>
        </>
      ),
    },
  ],

  faqs: webseiteErstellenLassenKostenFAQs,

  cta: {
    headline: 'Bereit für Ihr Webseiten-Projekt?',
    subtext: 'Vereinbaren Sie ein kostenloses Erstgespräch und erhalten Sie ein maßgeschneidertes Angebot.',
    buttonText: 'Kostenloses Beratungsgespräch buchen',
  },
}

// ============================================================================
// 2. Homepage Kosten
// ============================================================================

const homepageKostenFAQs: FAQItem[] = [
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

export const homepageKostenConfig: CalculatorPageConfig = {
  badge: {
    icon: Sparkles,
    text: 'Speziell für kleine Unternehmen',
  },
  h1: 'Homepage Kosten 2025 –',
  h1Accent: 'Transparent kalkuliert',
  subtitle:
    'Berechnen Sie die Kosten für Ihre Business-Homepage in unter 2 Minuten. Faire Preise für Selbstständige, KMUs und lokale Unternehmen.',
  trustIndicators: ['Keine versteckten Kosten', 'KMU-freundliche Preise', 'Feste Laufzeiten'],

  contentSections: [
    {
      title: 'Homepage-Kosten für kleine Unternehmen realistisch einschätzen',
      content: `
        <p class="text-gray-700 leading-relaxed mb-6">
          Als Selbstständiger, Handwerksbetrieb oder lokales Unternehmen brauchen Sie keine
          überdimensionierte Agentur-Lösung – sondern eine professionelle, aber bezahlbare Homepage,
          die Ihre Dienstleistungen präsentiert und neue Kunden gewinnt. Doch was kostet eine
          solche Business-Homepage wirklich?
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Das braucht Ihre Business-Homepage wirklich
        </h3>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Grundausstattung für Ihr Unternehmen:</strong> Die meisten kleinen Unternehmen
          benötigen eine klare Startseite mit Ihrem Angebot, eine Über-uns-Seite für Vertrauen,
          eine Leistungsübersicht, Referenzen oder Portfolio und eine Kontaktseite mit Formular.
          Damit sind 5-8 Seiten bereits abgedeckt – das Fundament für Ihre Online-Präsenz.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Diese Faktoren beeinflussen Ihre Homepage-Kosten
        </h3>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Design-Level:</strong> Möchten Sie ein vorgefertigtes Template anpassen (günstiger)
          oder ein individuelles Design, das Ihre Marke perfekt widerspiegelt? Für kleine Unternehmen
          empfehlen wir meist ein Semi-Custom-Design – professionell, individuell angepasst, aber
          nicht bei Null startend. Das spart Kosten und Zeit.
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Funktionsumfang:</strong> Die häufigsten Features für Business-Homepages sind
          Kontaktformulare (Standard), Google Maps Integration (wichtig für lokale Unternehmen),
          Bildergalerien für Referenzen, Newsletter-Anmeldung und vielleicht ein einfaches
          Buchungssystem. Jedes Feature erhöht den Preis, aber nicht dramatisch.
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Content Management:</strong> Wollen Sie später selbst Inhalte ändern können?
          Ein benutzerfreundliches CMS wie WordPress oder ein Headless CMS kostet 800-1.500€ extra,
          spart Ihnen aber langfristig Kosten für jede kleine Änderung. Alternativ: Statische
          Homepage mit Developer-Support bei Änderungen (günstiger initial).
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Wartung und Hosting:</strong> Die laufenden Kosten sollten überschaubar bleiben.
          Shared Hosting reicht für die meisten kleinen Business-Homepages (10-30€/Monat).
          Optional können Sie Wartungspakete buchen (150€/Monat für Updates, Backups, Support) –
          gerade wenn Sie technisch nicht versiert sind.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Warum Homepage-Kosten stark variieren
        </h3>

        <p class="text-gray-700 leading-relaxed mb-6">
          Ein Freelancer aus Osteuropa bietet vielleicht eine Homepage für 800€ an – allerdings
          oft mit Sprachbarrieren, Template-Designs und begrenztem Support. Deutsche Agenturen
          verlangen schnell 8.000-15.000€ für dasselbe Projekt, da sie hohe Overhead-Kosten haben.
          <strong> HEADON positioniert sich dazwischen:</strong> Deutsche Entwickler mit direkter
          Kommunikation, moderne Technologien, aber durch Remote-Work und schlanke Strukturen
          deutlich günstiger als klassische Agenturen. Qualität muss nicht unbezahlbar sein.
        </p>

        <div class="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
          <p class="text-gray-900 font-semibold mb-2">⚡ Praxis-Tipp für Starter</p>
          <p class="text-gray-700 mb-0">
            Beginnen Sie mit einer schlanken Homepage (5 Seiten, Semi-Custom-Design, Basis-SEO)
            und erweitern Sie später schrittweise. Das spart initial Kosten und Sie sammeln
            Erfahrungen, welche Features Sie wirklich benötigen. Nutzen Sie unseren Rechner oben
            für eine erste Orientierung.
          </p>
        </div>
      `,
    },
  ],

  faqs: homepageKostenFAQs,

  cta: {
    headline: 'Bereit für Ihre professionelle Business-Homepage?',
    subtext: 'Lassen Sie uns gemeinsam Ihre Anforderungen besprechen und ein individuelles Angebot erstellen.',
    buttonText: 'Jetzt kostenloses Erstgespräch vereinbaren',
  },
}

// ============================================================================
// 3. Website Kosten (Technical Focus)
// ============================================================================

const websiteKostenFAQs: FAQItem[] = [
  {
    question: 'Welcher Technologie-Stack ist am günstigsten?',
    answer:
      'Am günstigsten ist ein Static Site Generator (Astro, Hugo, Eleventy) mit Headless CMS (Contentful, Sanity) – Development-Kosten um 30-40% niedriger als dynamische Lösungen, Hosting fast kostenlos (Vercel/Netlify Free Tier). Wenn Sie Backend benötigen, ist der JavaScript-Stack (Node.js + Express oder Next.js) kosteneffizient, da Frontend- und Backend-Entwickler dieselbe Sprache sprechen. PHP/WordPress ist initial günstiger durch viele Templates, langfristig aber teurer durch technische Schulden und Sicherheitsprobleme.',
  },
  {
    question: 'Was kostet eine Datenbank-Integration wirklich?',
    answer:
      'Für eine einfache relationale Datenbank (PostgreSQL/MySQL) mit Standard-CRUD-Operationen rechnen Sie mit 2.000-4.000€ Development. Das beinhaltet: Schema-Design, Migrationen, Backend-API, Connection-Pooling, Backup-Strategie. Komplexe Datenmodelle (10+ Tabellen, viele Relationen) kosten 5.000-10.000€ durch erhöhten Planungs- und Optimierungsaufwand. NoSQL-Datenbanken (MongoDB, Firebase) sind oft einfacher zu implementieren (ca. 20% günstiger), aber weniger gut für komplexe Queries. Laufende Kosten: Database-Hosting 10-100€/Monat je nach Größe und Managed-Service-Level.',
  },
  {
    question: 'Wie beeinflussen API-Integrationen die Projekt-Kosten?',
    answer:
      'Standard-APIs mit guter Dokumentation (Stripe, Shopify, Google APIs) kosten 800-2.000€ pro Integration – meistens gibt es fertige SDKs und Libraries, die Arbeit beschleunigen. Legacy-APIs ohne Dokumentation oder proprietäre Schnittstellen explodieren schnell auf 3.000-8.000€ durch Trial-and-Error und aufwendiges Testing. GraphQL-API-Entwicklung kostet initial mehr (2.500-5.000€), spart aber langfristig durch flexiblere Datenabfragen und weniger Endpoints. Planen Sie 20-30% der Integrations-Kosten für Testing und Error-Handling ein – APIs fallen aus, Rate-Limits werden erreicht, Webhooks müssen verarbeitet werden.',
  },
  {
    question: 'Was kostet professionelle Performance-Optimierung?',
    answer:
      'Basis-Performance (Image-Optimization, Code-Splitting, Lazy-Loading) sollte bei jeder modernen Entwicklung inklusive sein. Erweiterte Optimierung kostet 1.500-3.000€ und beinhaltet: CDN-Setup, Advanced-Caching-Strategien (Redis), Database-Query-Optimierung, Bundle-Size-Reduction, Pre-fetching. Enterprise-Level-Performance (Sub-Second LCP, 99.9% Uptime) kostet 5.000-10.000€: Load-Testing unter realistischen Bedingungen, APM-Monitoring (Application Performance Monitoring), Auto-Scaling-Setup, Performance-Budgets. Core Web Vitals sind Google-Ranking-Faktor – investieren Sie mindestens 2.000€ für solide Performance, das amortisiert sich durch bessere Rankings.',
  },
  {
    question: 'Sind Progressive Web Apps (PWAs) teurer als normale Websites?',
    answer:
      'PWAs kosten 15-30% mehr als vergleichbare Websites. Zusatzaufwände: Service-Worker-Implementierung für Offline-Funktionalität (+1.000-2.000€), App-Manifest und Icons in verschiedenen Größen (+300-500€), Push-Notifications-Setup (+800-1.500€), Background-Sync für Offline-Formulare (+500-1.000€). Aber: PWAs können native Apps ersetzen (iOS/Android App-Entwicklung kostet jeweils 15.000-50.000€) – langfristig günstiger. Bonus: Bessere Performance, Offline-Support, Home-Screen-Installation ohne App-Store. Für E-Commerce und Web-Apps mit hoher Interaktion definitiv empfohlen.',
  },
  {
    question: 'Was kostet DSGVO-konforme technische Implementierung?',
    answer:
      'DSGVO-Compliance wird oft unterschätzt. Technische Umsetzung kostet 1.000-2.500€ für Standard-Websites: Cookie-Consent-Banner mit Opt-In (nicht Opt-Out!), Tracking-Scripts erst nach Zustimmung laden, Datenschutzseite mit allen Drittanbietern dokumentiert, Kontaktformular mit Einwilligungs-Checkbox, sichere Datenspeicherung (verschlüsselt), Lösch- und Export-Funktionen für User-Daten (DSGVO Art. 17 & 20). Bei komplexen Anwendungen mit User-Accounts und sensitiven Daten: 3.000-6.000€ für vollständige Compliance inklusive Audit-Trails, Data-Processing-Agreements mit Subprozessoren, Privacy-by-Design-Patterns. Strafen bei Verstößen: bis 4% vom Jahresumsatz – sparen Sie hier nicht!',
  },
]

export const websiteKostenConfig: CalculatorPageConfig = {
  badge: {
    icon: Code2,
    text: 'Technische Faktoren verstehen',
  },
  h1: 'Website Kosten Rechner 2025 –',
  h1Accent: 'Technische Komplexität kalkuliert',
  subtitle:
    'Verstehen Sie, wie technische Entscheidungen die Kosten beeinflussen: von der Architektur über Datenbanken bis zur Performance-Optimierung.',
  trustIndicators: ['Technologie-unabhängig', 'Komplexität bewertet', 'Zukunftssicher'],

  contentSections: [
    {
      title: 'Website-Kosten durch technische Komplexität verstehen',
      content: `
        <p class="text-gray-700 leading-relaxed mb-6">
          Die größten Kostentreiber bei Website-Projekten sind nicht Design oder Seitenanzahl –
          sondern <strong>technische Entscheidungen</strong>, die oft im Verborgenen bleiben.
          Eine 5-seitige Website kann 3.000€ oder 30.000€ kosten, abhängig von Architektur,
          Datenmodell, Integrations-Komplexität und Performance-Anforderungen. Lassen Sie uns die
          technischen Faktoren transparent machen.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Architektur-Entscheidungen: Der größte Kostenhebel
        </h3>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Static Site Generation (SSG):</strong> HTML-Seiten werden beim Build generiert.
          Extrem schnell, sicher, günstig im Hosting. Kosten: 1.0x Basis. Ideal für Marketing-Websites,
          Blogs, Portfolios ohne dynamische Inhalte.
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Server-Side Rendering (SSR):</strong> Seiten werden bei jedem Request generiert.
          Dynamische Inhalte, personalisiert, SEO-stark. Kosten: 1.5-2.0x Basis. Ideal für E-Commerce,
          Dashboards, personalisierte Inhalte, Echtzeit-Daten.
        </p>

        <p class="text-gray-700 leading-relaxed mb-6">
          <strong>Warum kostet SSR mehr als SSG?</strong> Server-Side Rendering benötigt einen
          laufenden Server (höhere Hosting-Kosten), komplexere Caching-Strategien, Database-Connections,
          Session-Management und sorgfältiges Error-Handling. Die Entwicklung ist aufwendiger, Tests
          komplexer. Static Sites generieren einmal beim Build – fertig.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Datenbank-Integration: Wann es wirklich teuer wird
        </h3>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Keine Datenbank:</strong> Content liegt als Markdown oder in einem Headless CMS.
          Einfachste Variante, günstig (ca. +500-1.000€). Ideal wenn Sie wenige strukturierte Inhalte
          haben und keine komplexen Beziehungen benötigen.
        </p>

        <p class="text-gray-700 leading-relaxed mb-4">
          <strong>Relationale Datenbank (PostgreSQL, MySQL):</strong> Standard für Business-Anwendungen.
          User-Management, Bestellungen, Produkte mit Beziehungen. Entwicklungskosten +2.000-4.000€
          abhängig von Datenkomplexität.
        </p>

        <p class="text-gray-700 leading-relaxed mb-6">
          <strong>Komplexes Datenmodell (10+ Tabellen):</strong> E-Commerce mit Produktvarianten,
          Benutzerberechtigungen, Multi-Tenancy. Entwicklung +5.000-12.000€. Hier brauchen Sie
          erfahrene Backend-Entwickler für Query-Optimierung und Performance unter Last.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Performance & Sicherheit: Unsichtbare, aber kritische Faktoren
        </h3>

        <p class="text-gray-700 leading-relaxed mb-6">
          <strong>Warum Sie nicht an Performance sparen sollten:</strong> Google rankt langsame
          Websites schlechter (Core Web Vitals!). Jede Sekunde Ladezeit kostet 7% Conversion.
          Investieren Sie 2.000-3.000€ in professionelle Performance-Optimierung – das amortisiert
          sich schnell durch bessere Rankings und höhere Conversion-Rates.
        </p>

        <div class="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
          <p class="text-gray-900 font-semibold mb-2">🎯 Technologie-Empfehlung für Ihr Budget</p>
          <p class="text-gray-700 mb-2">
            <strong>Budget &lt; 5.000€:</strong> Static Site (Astro, Hugo) + Headless CMS + Vercel/Netlify.
            Schnell, sicher, wartungsarm.
          </p>
          <p class="text-gray-700 mb-2">
            <strong>Budget 5.000-15.000€:</strong> Next.js (Hybrid) + PostgreSQL + Vercel/Railway.
            Modern, skalierbar, zukunftssicher.
          </p>
          <p class="text-gray-700 mb-0">
            <strong>Budget &gt; 15.000€:</strong> Full-Stack Custom (Backend-Framework Ihrer Wahl) +
            komplexe DB + Cloud-Infrastruktur. Maximum an Flexibilität.
          </p>
        </div>
      `,
    },
  ],

  faqs: websiteKostenFAQs,

  cta: {
    headline: 'Technisch fundierte Beratung gewünscht?',
    subtext:
      'Lassen Sie uns über die beste technische Lösung für Ihr Projekt sprechen – transparent und verständlich erklärt.',
    buttonText: 'Kostenlose technische Beratung vereinbaren',
  },
}
