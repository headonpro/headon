import { CostCalculator } from '@/components/calculator/CostCalculator'
import { CheckCircle2, Code2, Database, Gauge, Shield, Cpu, Layers } from 'lucide-react'
import { createCalculatorSchema, type FAQItem } from '@/lib/calculator/schema-builder'

export { metadata } from './metadata'

// FAQ items for Schema.org structured data
const faqItems: FAQItem[] = [
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

const schema = createCalculatorSchema(faqItems)

export default function WebsiteKostenPage() {
  return (
    <>
      {/* Hero & Calculator Section - Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Code2 className="h-4 w-4" />
              <span>Technische Faktoren verstehen</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Website Kosten Rechner 2025 –{' '}
              <span className="text-white/90">Technische Komplexität kalkuliert</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Verstehen Sie, wie technische Entscheidungen die Kosten beeinflussen: von der Architektur
              über Datenbanken bis zur Performance-Optimierung.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>Technologie-unabhängig</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>Komplexität bewertet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" />
                <span>Zukunftssicher</span>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <CostCalculator />
        </div>
      </section>

      {/* Unique Content Section - Focus: Technische Aspekte & Komplexität */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Website-Kosten durch technische Komplexität verstehen
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Die größten Kostentreiber bei Website-Projekten sind nicht Design oder Seitenanzahl –
            sondern <strong>technische Entscheidungen</strong>, die oft im Verborgenen bleiben.
            Eine 5-seitige Website kann 3.000€ oder 30.000€ kosten, abhängig von Architektur,
            Datenmodell, Integrations-Komplexität und Performance-Anforderungen. Lassen Sie uns die
            technischen Faktoren transparent machen.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Architektur-Entscheidungen: Der größte Kostenhebel
          </h3>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-6 w-6 text-primary-600" />
                <h4 className="font-bold text-gray-900">Static Site (SSG)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                HTML-Seiten werden beim Build generiert. Extrem schnell, sicher, günstig im Hosting.
              </p>
              <p className="text-xs font-semibold text-primary-700">Kosten: 1.0x Basis</p>
              <p className="text-xs text-gray-600 mt-2">
                Ideal für: Marketing-Websites, Blogs, Portfolios ohne dynamische Inhalte
              </p>
            </div>

            <div className="bg-secondary-50 border-2 border-secondary-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-6 w-6 text-secondary-600" />
                <h4 className="font-bold text-gray-900">Server-Side Rendering (SSR)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Seiten werden bei jedem Request generiert. Dynamische Inhalte, personalisiert, SEO-stark.
              </p>
              <p className="text-xs font-semibold text-secondary-700">Kosten: 1.5-2.0x Basis</p>
              <p className="text-xs text-gray-600 mt-2">
                Ideal für: E-Commerce, Dashboards, personalisierte Inhalte, Echtzeit-Daten
              </p>
            </div>

            <div className="bg-accent-50 border-2 border-accent-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="h-6 w-6 text-accent-700" />
                <h4 className="font-bold text-gray-900">Single Page App (SPA)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                JavaScript-App läuft komplett im Browser. Hoch interaktiv, app-ähnliches Feeling.
              </p>
              <p className="text-xs font-semibold text-accent-700">Kosten: 1.3-1.8x Basis</p>
              <p className="text-xs text-gray-600 mt-2">
                Ideal für: Web-Apps, Tools, Konfiguratoren, hochinteraktive Interfaces
              </p>
            </div>

            <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="h-6 w-6 text-primary-600" />
                <h4 className="font-bold text-gray-900">Hybrid (Next.js/Remix)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Kombination aus SSG, SSR und SPA. Maximale Flexibilität, moderne Entwicklung.
              </p>
              <p className="text-xs font-semibold text-primary-700">Kosten: 1.8-2.5x Basis</p>
              <p className="text-xs text-gray-600 mt-2">
                Ideal für: Komplexe Business-Websites, SaaS-Plattformen, Multi-Purpose-Sites
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Warum kostet SSR mehr als SSG?</strong> Server-Side Rendering benötigt einen
            laufenden Server (höhere Hosting-Kosten), komplexere Caching-Strategien, Database-Connections,
            Session-Management und sorgfältiges Error-Handling. Die Entwicklung ist aufwendiger, Tests
            komplexer. Static Sites generieren einmal beim Build – fertig.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Datenbank-Integration: Wann es wirklich teuer wird
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Keine Datenbank (Headless CMS oder Git-based):</strong> Content liegt als Markdown
            oder in einem Headless CMS (Contentful, Sanity). Einfachste Variante, günstig (ca. +500-1.000€).
            Ideal wenn Sie wenige strukturierte Inhalte haben und keine komplexen Beziehungen benötigen.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Relationale Datenbank (PostgreSQL, MySQL):</strong> Standard für die meisten
            Business-Anwendungen. User-Management, Bestellungen, Produkte mit Beziehungen. Entwicklungskosten
            +2.000-4.000€ abhängig von Datenkomplexität. Schema-Design, Migrationen, Backup-Strategien,
            Performance-Optimierung (Indizes!) und DSGVO-konforme Datenhaltung müssen bedacht werden.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Komplexes Datenmodell (10+ Tabellen mit Relationen):</strong> E-Commerce mit
            Produktvarianten, Benutzerberechtigungen, Multi-Tenancy, Audit-Trails. Entwicklung +5.000-12.000€.
            Hier brauchen Sie erfahrene Backend-Entwickler für Query-Optimierung, Transaktions-Management,
            Data-Consistency und Performance unter Last.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Real-time Features (WebSockets, Pub/Sub):</strong> Live-Updates, Chat, Notifications,
            kollaborative Tools. Zusätzlich +3.000-8.000€ je nach Komplexität. Infrastruktur-Kosten steigen
            deutlich (WebSocket-Server, Redis für Pub/Sub), State-Synchronisation zwischen Clients ist
            komplex, Skalierung benötigt Clustering.
          </p>

          <div className="bg-primary-50 border-l-4 border-primary-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Database className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 mb-2">Datenbank-Kostenübersicht:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>Kein Backend:</strong> +500-1.000€ (Headless CMS Setup)
                  </li>
                  <li>
                    <strong>Einfaches Backend:</strong> +2.000-4.000€ (Standard CRUD, 3-5 Tabellen)
                  </li>
                  <li>
                    <strong>Mittlere Komplexität:</strong> +4.000-8.000€ (User-Auth, Berechtigungen, 6-10 Tabellen)
                  </li>
                  <li>
                    <strong>Hohe Komplexität:</strong> +8.000-15.000€ (Multi-Tenancy, Real-time, 10+ Tabellen)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            API-Integrationen: Die unterschätzten Kostentreiber
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>REST-API mit Dokumentation (Stripe, Shopify):</strong> Große Anbieter liefern
            gut dokumentierte APIs mit SDKs. Integration relativ unkompliziert: +800-2.000€ pro API.
            Error-Handling, Webhooks und Testing sind die Hauptaufwände. Rate-Limits und Retry-Logik
            müssen implementiert werden.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Legacy-APIs ohne Dokumentation:</strong> Alte ERP-Systeme, proprietäre Schnittstellen
            lokaler Anbieter. Hier wird es teuer: +3.000-8.000€ pro Integration. Reverse-Engineering,
            Trial & Error, fehlendes Error-Handling auf API-Seite erfordert defensive Programmierung.
            Oft müssen Adapter-Layer geschrieben werden.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>GraphQL-APIs (moderne Alternative):</strong> Flexibler als REST, Client kann
            exakt die benötigten Daten abfragen. Entwicklung der API-Schicht: +2.500-5.000€ abhängig
            von Datenkomplexität. Vorteil: Weniger Endpoints, bessere Performance, Type-Safety.
            Nachteil: Caching komplexer als bei REST.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Drittanbieter-Integrationen (Google Maps, Payment, Analytics):</strong> Standard-
            Integrationen wie Google Maps, Stripe Payment, Google Analytics, Calendly Booking sind
            oft mit Plugins/Libraries verfügbar. Pro Integration +300-800€. Custom-Integrationen
            (z.B. spezifische Zahlungsanbieter, Versanddienstleister-APIs) deutlich teurer.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Performance & Sicherheit: Unsichtbare, aber kritische Faktoren
          </h3>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gauge className="h-6 w-6 text-secondary-600" />
                <h4 className="font-bold text-gray-900">Performance-Optimierung</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Basis-Optimierung (Image-Optimization, Code-Splitting, Lazy-Loading) sollte Standard sein.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Basis: inkludiert bei professioneller Entwicklung</li>
                <li>• Erweitert: +1.500-3.000€ (CDN, Caching-Strategien, DB-Optimierung)</li>
                <li>• Enterprise: +5.000-10.000€ (Load-Testing, Profiling, Monitoring)</li>
              </ul>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary-600" />
                <h4 className="font-bold text-gray-900">Sicherheit & DSGVO</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Basis-Sicherheit (HTTPS, Input-Validation) ist Pflicht. DSGVO-Compliance oft unterschätzt.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Basis: inkludiert (HTTPS, Secure Headers, Input-Validation)</li>
                <li>• DSGVO-Umsetzung: +1.000-2.500€ (Consent, Datenschutz, Cookies)</li>
                <li>• Security-Audit: +2.000-5.000€ (Penetration-Tests, Code-Review)</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Warum Sie nicht an Performance sparen sollten:</strong> Google rankt langsame
            Websites schlechter (Core Web Vitals!). Jede Sekunde Ladezeit kostet 7% Conversion.
            Investieren Sie 2.000-3.000€ in professionelle Performance-Optimierung – das amortisiert
            sich schnell durch bessere Rankings und höhere Conversion-Rates.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Hosting & Infrastruktur: Versteckte Laufkosten
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Shared Hosting (Strato, 1&1, Hostinger):</strong> 5-15€/Monat. Günstig, aber
            begrenzte Performance und Kontrolle. Nur für einfache Websites ohne hohen Traffic geeignet.
            Oft PHP-basiert, keine modernen Deployment-Workflows. Support langsam. Für Static Sites okay,
            für Apps nicht empfohlen.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Managed Hosting (Vercel, Netlify, Heroku):</strong> 0-50€/Monat für kleine
            Projekte, skaliert automatisch. Ideal für moderne JavaScript-Apps (Next.js, React).
            CI/CD integriert, Global CDN, automatische HTTPS. Ab 100.000 Requests/Monat wird es teurer
            (100-500€/Monat). Empfohlen für professionelle Business-Websites.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>VPS (Hetzner, DigitalOcean, AWS Lightsail):</strong> 5-50€/Monat. Volle Kontrolle,
            aber benötigt Server-Administration. Ideal wenn Sie DevOps-Know-how haben oder einen
            Wartungsvertrag abschließen. Flexibel skalierbar, kosteneffizient für mittlere Projekte.
            Setup & Konfiguration: +800-2.000€ initial.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Cloud (AWS, Google Cloud, Azure):</strong> Ab 50€/Monat, Pay-as-you-go. Maximum
            an Skalierbarkeit und Services (Datenbanken, Queues, Serverless Functions, AI-Services).
            Komplex zu managen, benötigt Cloud-Expertise. Kosten können schnell steigen bei Traffic-Spikes.
            Nur für Enterprise-Projekte oder wenn spezielle Cloud-Services benötigt werden.
          </p>

          <div className="bg-accent-50 border-l-4 border-accent-600 p-6 my-8 rounded-r-lg">
            <p className="text-gray-900 font-semibold mb-2">🎯 Technologie-Empfehlung für Ihr Budget</p>
            <p className="text-gray-700 mb-2">
              <strong>Budget &lt; 5.000€:</strong> Static Site (Astro, Hugo) + Headless CMS + Vercel/Netlify.
              Schnell, sicher, wartungsarm.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Budget 5.000-15.000€:</strong> Next.js (Hybrid) + PostgreSQL + Vercel/Railway.
              Modern, skalierbar, zukunftssicher.
            </p>
            <p className="text-gray-700 mb-0">
              <strong>Budget &gt; 15.000€:</strong> Full-Stack Custom (Backend-Framework Ihrer Wahl) +
              komplexe DB + Cloud-Infrastruktur. Maximum an Flexibilität.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ Section - 6 questions about technical cost factors */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Häufig gestellte Fragen zu technischen Kostenfaktoren
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Welcher Technologie-Stack ist am günstigsten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Am günstigsten ist ein Static Site Generator (Astro, Hugo, Eleventy) mit Headless CMS
                (Contentful, Sanity) – Development-Kosten um 30-40% niedriger als dynamische Lösungen,
                Hosting fast kostenlos (Vercel/Netlify Free Tier). Wenn Sie Backend benötigen, ist der
                JavaScript-Stack (Node.js + Express oder Next.js) kosteneffizient, da Frontend- und
                Backend-Entwickler dieselbe Sprache sprechen. PHP/WordPress ist initial günstiger durch
                viele Templates, langfristig aber teurer durch technische Schulden und Sicherheitsprobleme.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet eine Datenbank-Integration wirklich?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Für eine einfache relationale Datenbank (PostgreSQL/MySQL) mit Standard-CRUD-Operationen
                rechnen Sie mit 2.000-4.000€ Development. Das beinhaltet: Schema-Design, Migrationen,
                Backend-API, Connection-Pooling, Backup-Strategie. Komplexe Datenmodelle (10+ Tabellen,
                viele Relationen) kosten 5.000-10.000€ durch erhöhten Planungs- und Optimierungsaufwand.
                NoSQL-Datenbanken (MongoDB, Firebase) sind oft einfacher zu implementieren (ca. 20% günstiger),
                aber weniger gut für komplexe Queries. Laufende Kosten: Database-Hosting 10-100€/Monat
                je nach Größe und Managed-Service-Level.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Wie beeinflussen API-Integrationen die Projekt-Kosten?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Standard-APIs mit guter Dokumentation (Stripe, Shopify, Google APIs) kosten 800-2.000€
                pro Integration – meistens gibt es fertige SDKs und Libraries, die Arbeit beschleunigen.
                Legacy-APIs ohne Dokumentation oder proprietäre Schnittstellen explodieren schnell auf
                3.000-8.000€ durch Trial-and-Error und aufwendiges Testing. GraphQL-API-Entwicklung kostet
                initial mehr (2.500-5.000€), spart aber langfristig durch flexiblere Datenabfragen und
                weniger Endpoints. Planen Sie 20-30% der Integrations-Kosten für Testing und Error-Handling
                ein – APIs fallen aus, Rate-Limits werden erreicht, Webhooks müssen verarbeitet werden.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet professionelle Performance-Optimierung?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Basis-Performance (Image-Optimization, Code-Splitting, Lazy-Loading) sollte bei jeder
                modernen Entwicklung inklusive sein. Erweiterte Optimierung kostet 1.500-3.000€ und
                beinhaltet: CDN-Setup, Advanced-Caching-Strategien (Redis), Database-Query-Optimierung,
                Bundle-Size-Reduction, Pre-fetching. Enterprise-Level-Performance (Sub-Second LCP,
                99.9% Uptime) kostet 5.000-10.000€: Load-Testing unter realistischen Bedingungen,
                APM-Monitoring (Application Performance Monitoring), Auto-Scaling-Setup, Performance-Budgets.
                Core Web Vitals sind Google-Ranking-Faktor – investieren Sie mindestens 2.000€ für solide
                Performance, das amortisiert sich durch bessere Rankings.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sind Progressive Web Apps (PWAs) teurer als normale Websites?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                PWAs kosten 15-30% mehr als vergleichbare Websites. Zusatzaufwände: Service-Worker-
                Implementierung für Offline-Funktionalität (+1.000-2.000€), App-Manifest und Icons in
                verschiedenen Größen (+300-500€), Push-Notifications-Setup (+800-1.500€), Background-Sync
                für Offline-Formulare (+500-1.000€). Aber: PWAs können native Apps ersetzen (iOS/Android
                App-Entwicklung kostet jeweils 15.000-50.000€) – langfristig günstiger. Bonus: Bessere
                Performance, Offline-Support, Home-Screen-Installation ohne App-Store. Für E-Commerce
                und Web-Apps mit hoher Interaktion definitiv empfohlen.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Was kostet DSGVO-konforme technische Implementierung?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                DSGVO-Compliance wird oft unterschätzt. Technische Umsetzung kostet 1.000-2.500€ für
                Standard-Websites: Cookie-Consent-Banner mit Opt-In (nicht Opt-Out!), Tracking-Scripts
                erst nach Zustimmung laden, Datenschutzseite mit allen Drittanbietern dokumentiert,
                Kontaktformular mit Einwilligungs-Checkbox, sichere Datenspeicherung (verschlüsselt),
                Lösch- und Export-Funktionen für User-Daten (DSGVO Art. 17 & 20). Bei komplexen
                Anwendungen mit User-Accounts und sensitiven Daten: 3.000-6.000€ für vollständige
                Compliance inklusive Audit-Trails, Data-Processing-Agreements mit Subprozessoren,
                Privacy-by-Design-Patterns. Strafen bei Verstößen: bis 4% vom Jahresumsatz – sparen
                Sie hier nicht!
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
            Technisch fundierte Beratung gewünscht?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Lassen Sie uns über die beste technische Lösung für Ihr Projekt sprechen – transparent und
            verständlich erklärt.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Kostenlose technische Beratung vereinbaren
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
