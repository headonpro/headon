/**
 * Ratgeber Page Configurations
 *
 * Content-focused guide pages that link to the main calculator.
 * These pages target specific long-tail keywords without duplicate calculator content.
 */

import { type FAQItem } from '@/lib/calculator/schema-builder'
import { type RatgeberPageConfig } from '@/components/calculator/RatgeberPageTemplate'
import { FeatureGrid, type Feature } from '@/components/ui/feature-grid'
import { InfoBox } from '@/components/ui/info-box'
import { ComparisonTable, type ComparisonColumn } from '@/components/ui/comparison-table'
import { IconList } from '@/components/ui/icon-list'
import {
  Lightbulb,
  Palette,
  Code,
  Database,
  Shield,
  Euro,
  Clock,
  Wrench
} from 'lucide-react'

// ============================================================================
// 1. Homepage Kosten Ratgeber (für KMUs & kleine Unternehmen)
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

// Features data for Homepage Kosten
const homepageKostenFactors: Feature[] = [
  {
    icon: Palette,
    title: 'Design-Level',
    description: 'Template, Semi-Custom oder vollständig individuell – das Design-Level hat den größten Einfluss auf die Kosten (1.500€ - 8.000€).',
  },
  {
    icon: Code,
    title: 'Funktionsumfang',
    description: 'Jedes Feature wie Kontaktformular, Google Maps, Newsletter oder Buchungssystem erhöht die Entwicklungszeit.',
  },
  {
    icon: Database,
    title: 'Content Management',
    description: 'CMS-Integration (WordPress, Headless CMS) kostet 800-1.500€ extra, spart aber langfristig Änderungskosten.',
  },
  {
    icon: Shield,
    title: 'Wartung & Hosting',
    description: 'Laufende Kosten 50-200€/Monat für Hosting, Domain, Wartung, Updates und Support-Pakete.',
  },
]

// Price comparison data
const homepagePriceComparison: ComparisonColumn[] = [
  {
    name: 'Budget',
    price: '1.500-3.000€',
    pros: [
      'Template-basiertes Design',
      'Schnelle Umsetzung (1-2 Wochen)',
      'Grundfunktionen enthalten',
      'Für einfache Anforderungen',
    ],
    cons: [
      'Begrenzte Individualisierung',
      'Oft veraltete Technologien',
      'Eingeschränkter Support',
      'Wenig Skalierbarkeit',
    ],
  },
  {
    name: 'Standard',
    price: '2.500-5.000€',
    badge: 'EMPFOHLEN',
    highlight: true,
    pros: [
      'Semi-Custom Design',
      'Moderne Technologien',
      'Professionelle Umsetzung',
      'Ideal für KMUs',
      'Gutes Preis-Leistungs-Verhältnis',
      'HEADON-Bereich',
    ],
    cons: [
      'Nicht vollständig individuell',
      'Basis-Features only',
    ],
  },
  {
    name: 'Premium',
    price: '5.000-15.000€+',
    pros: [
      'Vollständig individuell',
      'Komplexe Features',
      'Enterprise-Level',
      'Maximale Flexibilität',
      'Umfangreicher Support',
    ],
    cons: [
      'Höhere Investition',
      'Längere Projektdauer',
      'Komplexere Wartung',
    ],
  },
]

export const homepageKostenRatgeberConfig: RatgeberPageConfig = {
  h1: 'Homepage Kosten 2025',
  h1Accent: '– Der Ratgeber für KMUs',
  subtitle:
    'Erfahren Sie, was eine professionelle Business-Homepage wirklich kostet und welche Faktoren den Preis beeinflussen – speziell für Selbstständige und kleine Unternehmen.',
  trustIndicators: ['Keine versteckten Kosten', 'KMU-freundliche Preise', 'Transparente Kalkulation'],

  contentSections: [
    {
      title: 'Homepage-Kosten für kleine Unternehmen realistisch einschätzen',
      content: (
        <>
          <p className="text-white/90 leading-relaxed mb-8 text-lg">
            Als Selbstständiger, Handwerksbetrieb oder lokales Unternehmen brauchen Sie keine
            überdimensionierte Agentur-Lösung – sondern eine professionelle, aber bezahlbare Homepage,
            die Ihre Dienstleistungen präsentiert und neue Kunden gewinnt. <strong className="text-white">Doch was kostet eine
            solche Business-Homepage wirklich?</strong>
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Lightbulb className="h-7 w-7 text-accent-300" />
              Das braucht Ihre Business-Homepage wirklich
            </h3>
            <p className="text-white/90 leading-relaxed text-base">
              <strong className="text-white">Grundausstattung für Ihr Unternehmen:</strong> Die meisten kleinen Unternehmen
              benötigen eine klare Startseite mit Ihrem Angebot, eine Über-uns-Seite für Vertrauen,
              eine Leistungsübersicht, Referenzen oder Portfolio und eine Kontaktseite mit Formular.
              Damit sind 5-8 Seiten bereits abgedeckt – das Fundament für Ihre Online-Präsenz.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-white mb-6">
            Diese Faktoren beeinflussen Ihre Homepage-Kosten
          </h3>

          <FeatureGrid features={homepageKostenFactors} columns={2} variant="glassmorphism" className="mb-12" />

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Warum Homepage-Kosten stark variieren
            </h3>
            <p className="text-white/90 leading-relaxed mb-4">
              Ein Freelancer aus Osteuropa bietet vielleicht eine Homepage für 800€ an – allerdings
              oft mit Sprachbarrieren, Template-Designs und begrenztem Support. Deutsche Agenturen
              verlangen schnell 8.000-15.000€ für dasselbe Projekt, da sie hohe Overhead-Kosten haben.
            </p>
            <p className="text-white leading-relaxed font-semibold">
              💡 HEADON positioniert sich dazwischen: Deutsche Entwickler mit direkter
              Kommunikation, moderne Technologien, aber durch Remote-Work und schlanke Strukturen
              deutlich günstiger als klassische Agenturen. Qualität muss nicht unbezahlbar sein.
            </p>
          </div>

          <InfoBox variant="tip" icon={Lightbulb} title="Praxis-Tipp für Starter" className="bg-white/10 border-white/30 [&>div>div]:text-white/90 [&>div>div>p]:text-white">
            Beginnen Sie mit einer schlanken Homepage (5 Seiten, Semi-Custom-Design, Basis-SEO)
            und erweitern Sie später schrittweise. Das spart initial Kosten und Sie sammeln
            Erfahrungen, welche Features Sie wirklich benötigen.
          </InfoBox>
        </>
      ),
    },
    {
      title: 'Typische Preisklassen für Business-Homepages',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Die Homepage-Kosten variieren stark je nach Anforderungen. Hier ein Überblick über
            die drei wichtigsten Preiskategorien mit ihren Vor- und Nachteilen:
          </p>

          <ComparisonTable columns={homepagePriceComparison} />

          <InfoBox variant="info" icon={Euro} title="Investition richtig kalkulieren" className="mt-10">
            Berechnen Sie nicht nur die initialen Kosten, sondern auch die laufenden Ausgaben.
            Eine günstige Homepage mit hohen monatlichen Wartungskosten kann langfristig teurer
            sein als eine hochwertigere Lösung mit niedrigen Folgekosten.
          </InfoBox>
        </>
      ),
    },
  ],

  faqs: homepageKostenFAQs,

  cta: {
    headline: 'Bereit, Ihre Homepage-Kosten zu berechnen?',
    subtext:
      'Nutzen Sie unseren interaktiven Kostenrechner für eine präzise Kalkulation basierend auf Ihren spezifischen Anforderungen.',
    buttonText: 'Jetzt Kosten berechnen',
    calculatorUrl: '/webseite-erstellen-lassen-kosten',
  },
}

// ============================================================================
// 2. Website Kosten Ratgeber (Technischer Fokus)
// ============================================================================

// Features data for Website Kosten
const websiteKostenArchitectures: Feature[] = [
  {
    icon: Code,
    title: 'Static Site Generation (SSG)',
    description: 'HTML beim Build generiert. Extrem schnell, sicher, günstig. Kosten: 1.0x Basis. Ideal für Marketing, Blogs, Portfolios.',
  },
  {
    icon: Database,
    title: 'Server-Side Rendering (SSR)',
    description: 'Dynamische Inhalte bei jedem Request. Personalisiert, SEO-stark. Kosten: 1.5-2.0x. Für E-Commerce, Dashboards.',
  },
  {
    icon: Shield,
    title: 'Performance & Sicherheit',
    description: 'CDN, Caching, Query-Optimierung. Google Core Web Vitals beeinflussen Rankings. Investition: 2.000-3.000€.',
  },
  {
    icon: Wrench,
    title: 'Progressive Web Apps',
    description: '15-30% Mehrkosten. Service Worker, Offline-Support, Push-Notifications. Ersetzt native Apps (15k-50k€).',
  },
]

// Technology recommendation comparison
const technologyBudgetComparison: ComparisonColumn[] = [
  {
    name: 'Budget < 5.000€',
    price: '2.000-5.000€',
    pros: [
      'Static Site Generator (Astro, Hugo)',
      'Headless CMS',
      'Vercel/Netlify Hosting',
      'Schnell & sicher',
      'Wartungsarm',
    ],
    cons: [
      'Keine komplexen Backends',
      'Begrenzte Dynamik',
    ],
  },
  {
    name: 'Standard 5-15k€',
    price: '5.000-15.000€',
    badge: 'BELIEBT',
    highlight: true,
    pros: [
      'Next.js (Hybrid SSG/SSR)',
      'PostgreSQL Datenbank',
      'Vercel/Railway',
      'Modern & skalierbar',
      'Zukunftssicher',
      'API-Integrationen',
    ],
    cons: [
      'Höherer Wartungsaufwand',
      'Server-Kosten',
    ],
  },
  {
    name: 'Enterprise > 15k€',
    price: '15.000-50.000€+',
    pros: [
      'Full-Stack Custom',
      'Komplexe Datenmodelle',
      'Cloud-Infrastruktur',
      'Maximale Flexibilität',
      'Microservices möglich',
    ],
    cons: [
      'Hohe Komplexität',
      'Spezialisiertes Team nötig',
      'Hohe laufende Kosten',
    ],
  },
]

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

export const websiteKostenRatgeberConfig: RatgeberPageConfig = {
  h1: 'Website Kosten 2025',
  h1Accent: '– Technischer Ratgeber',
  subtitle:
    'Verstehen Sie, wie technische Entscheidungen die Website-Kosten beeinflussen: von der Architektur über Datenbanken bis zur Performance-Optimierung.',
  trustIndicators: ['Technologie-unabhängig', 'Komplexität bewertet', 'Zukunftssicher'],

  contentSections: [
    {
      title: 'Website-Kosten durch technische Komplexität verstehen',
      content: (
        <>
          <p className="text-white/90 leading-relaxed mb-8 text-lg">
            Die größten Kostentreiber bei Website-Projekten sind nicht Design oder Seitenanzahl –
            sondern <strong className="text-white">technische Entscheidungen</strong>, die oft im Verborgenen bleiben.
            Eine 5-seitige Website kann 3.000€ oder 30.000€ kosten, abhängig von Architektur,
            Datenmodell, Integrations-Komplexität und Performance-Anforderungen.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-6">
            Architektur-Entscheidungen: Der größte Kostenhebel
          </h3>

          <FeatureGrid features={websiteKostenArchitectures} columns={2} variant="glassmorphism" className="mb-12" />

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Database className="h-7 w-7 text-accent-300" />
              Datenbank-Integration: Wann es wirklich teuer wird
            </h3>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Keine Datenbank:</strong> Content liegt als Markdown oder in einem Headless CMS.
                  Einfachste Variante, günstig (ca. +500-1.000€). Ideal wenn Sie wenige strukturierte Inhalte
                  haben und keine komplexen Beziehungen benötigen.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Relationale Datenbank (PostgreSQL, MySQL):</strong> Standard für Business-Anwendungen.
                  User-Management, Bestellungen, Produkte mit Beziehungen. Entwicklungskosten +2.000-4.000€
                  abhängig von Datenkomplexität.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Komplexes Datenmodell (10+ Tabellen):</strong> E-Commerce mit Produktvarianten,
                  Benutzerberechtigungen, Multi-Tenancy. Entwicklung +5.000-12.000€. Hier brauchen Sie
                  erfahrene Backend-Entwickler für Query-Optimierung und Performance unter Last.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-10">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Shield className="h-7 w-7 text-accent-300" />
              Performance & Sicherheit: Unsichtbare, aber kritische Faktoren
            </h3>
            <p className="text-white/90 leading-relaxed">
              <strong className="text-white">Warum Sie nicht an Performance sparen sollten:</strong> Google rankt langsame
              Websites schlechter (Core Web Vitals!). Jede Sekunde Ladezeit kostet 7% Conversion.
              Investieren Sie 2.000-3.000€ in professionelle Performance-Optimierung – das amortisiert
              sich schnell durch bessere Rankings und höhere Conversion-Rates.
            </p>
          </div>

          <InfoBox variant="tip" icon={Lightbulb} title="Technologie-Empfehlung für Ihr Budget" className="bg-white/10 border-white/30 [&>div>div]:text-white/90 [&>div>div>p]:text-white [&>div>div>div]:text-white/90">
            <div className="space-y-3">
              <p>
                <strong className="text-white">Budget &lt; 5.000€:</strong> Static Site (Astro, Hugo) + Headless CMS + Vercel/Netlify.
                Schnell, sicher, wartungsarm.
              </p>
              <p>
                <strong className="text-white">Budget 5.000-15.000€:</strong> Next.js (Hybrid) + PostgreSQL + Vercel/Railway.
                Modern, skalierbar, zukunftssicher.
              </p>
              <p className="mb-0">
                <strong className="text-white">Budget &gt; 15.000€:</strong> Full-Stack Custom (Backend-Framework Ihrer Wahl) +
                komplexe DB + Cloud-Infrastruktur. Maximum an Flexibilität.
              </p>
            </div>
          </InfoBox>
        </>
      ),
    },
    {
      title: 'Kostenfallen bei technischen Projekten vermeiden',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Diese häufigen technischen Fehler können Ihr Projekt unnötig verteuern.
            Lernen Sie, wie Sie die typischen Fallen umgehen:
          </p>

          <div className="space-y-6 mb-10">
            <div className="bg-gradient-to-br from-orange-50 to-white border-l-4 border-orange-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Legacy-Technologien</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Sparen Sie nicht am falschen Ende. Alte Stacks (PHP 5, jQuery) sind kurzfristig billiger,
                    langfristig aber teurer durch Wartung und fehlende Developer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Over-Engineering</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nicht jede Website braucht Kubernetes und Microservices. Für 90% der Projekte reicht
                    ein moderner Monolith (Next.js, Rails) vollkommen aus.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white border-l-4 border-red-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fehlende Skalierbarkeit</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Planen Sie Wachstum ein. Eine Website, die bei 1000 Usern zusammenbricht, kostet 10.000€+
                    für Refactoring. Investieren Sie initial 2.000€ mehr für skalierbare Architektur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ComparisonTable columns={technologyBudgetComparison} />
        </>
      ),
    },
  ],

  faqs: websiteKostenFAQs,

  cta: {
    headline: 'Technisch fundierte Kostenkalkulation gewünscht?',
    subtext:
      'Nutzen Sie unseren Kostenrechner, um Ihre Website-Kosten basierend auf technischen Anforderungen zu kalkulieren.',
    buttonText: 'Jetzt technische Kosten berechnen',
    calculatorUrl: '/webseite-erstellen-lassen-kosten',
  },
}
