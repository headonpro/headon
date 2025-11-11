/**
 * Centralized FAQ Data Source
 *
 * Single source of truth for all FAQ content across the site.
 * FAQs are optimized for featured snippets in search results.
 *
 * Usage:
 * - General FAQs: Use on homepage and /faq page
 * - Service-specific FAQs: Use on respective service pages
 *
 * Guidelines:
 * - Questions: Natural language (how users search)
 * - Answers: 2-4 sentences, clear and actionable
 * - No duplication across categories
 */

import type { FAQ } from '@/lib/types/content'

/**
 * FAQ Collection Interface
 * Defines typed categories for all FAQ groups
 */
export interface FAQCollection {
  general: FAQ[]
  webDevelopment: FAQ[]
  mobileDevelopment: FAQ[]
  uiUxDesign: FAQ[]
  backendSolutions: FAQ[]
}

/**
 * FAQ Data
 * Comprehensive collection targeting common search queries for featured snippets
 */
export const faqData: FAQCollection = {
  // ============================================================================
  // General FAQs (Homepage & /faq page)
  // ============================================================================
  general: [
    {
      question: 'Was kostet eine professionelle Website?',
      answer:
        'Eine professionelle Website kostet bei uns ab 2.500€. Der finale Preis hängt vom Funktionsumfang, Design-Komplexität und Backend-Anforderungen ab. Nach unserem kostenlosen 15-Minuten-Beratungsgespräch erhalten Sie ein transparentes Festpreis-Angebot ohne versteckte Kosten.',
    },
    {
      question: 'Wie lange dauert die Entwicklung einer Website?',
      answer:
        'Durch unsere KI-gestützten Prozesse realisieren wir Ihr Projekt in 2-4 Wochen statt der branchenüblichen 3-6 Monate. Die genaue Dauer hängt vom Projektumfang ab: Eine Landing Page ist in 1-2 Wochen fertig, komplexe Web-Apps benötigen 4-8 Wochen. Während der Entwicklung erhalten Sie regelmäßige Updates und können Feedback geben.',
    },
    {
      question: 'Warum ist HEADON 4x schneller als andere Agenturen?',
      answer:
        'Wir nutzen modernste KI-Tools für Code-Generierung, automatisierte Tests und Design-Prototyping, wodurch wir repetitive Aufgaben drastisch beschleunigen. Unsere modulare Architektur mit wiederverwendbaren Komponenten und standardisierte Workflows eliminieren Verzögerungen. Statt manueller Pixel-Arbeit fokussieren wir uns auf Strategie, User Experience und Qualitätssicherung – das macht uns 4x schneller ohne Qualitätseinbußen.',
    },
    {
      question: 'Welche Branchen bedient HEADON?',
      answer:
        'Wir entwickeln digitale Lösungen für alle Branchen, mit besonderer Expertise in Weinbau & Weingütern, Handwerksbetrieben, Vereinen & Sportorganisationen, Industrie & B2B, Gastronomie & Hotellerie sowie Startups. Jede Branche hat spezifische Anforderungen, die wir durch maßgeschneiderte Lösungen adressieren – von Online-Shops mit Altersverifikation für Weingüter bis zu Mitgliederverwaltung für Vereine.',
    },
    {
      question: 'Bietet HEADON auch Support nach dem Launch?',
      answer:
        'Ja, wir bieten flexible Support- und Wartungsverträge ab 150€/Monat an. Diese umfassen Updates, Bugfixes, Performance-Optimierung, Sicherheits-Patches und technischen Support. Auch ohne Wartungsvertrag können Sie uns jederzeit für Erweiterungen und Anpassungen kontaktieren – wir kennen Ihren Code und reagieren schnell.',
    },
    {
      question: 'Kann ich meine bestehende Website modernisieren lassen?',
      answer:
        'Absolut! Wir migrieren alte Websites (WordPress, Joomla, statisches HTML) zu modernen Technologie-Stacks wie Next.js oder React. Die Migration umfasst Datenübernahme, SEO-Erhalt (301-Redirects), Performance-Steigerung und modernes Responsive Design. Ihre Rankings und Inhalte bleiben erhalten, während Sie von besserer Performance und Wartbarkeit profitieren.',
    },
    {
      question: 'Arbeitet HEADON nur in Lauda-Königshofen oder auch überregional?',
      answer:
        'Wir sind in Lauda-Königshofen ansässig und bedienen schwerpunktmäßig Main-Tauber-Kreis, Würzburg und ganz Baden-Württemberg. Dank Remote-Tools arbeiten wir aber deutschlandweit und international mit Kunden zusammen. Für regionale Kunden bieten wir gerne persönliche Meetings vor Ort an, während Remote-Projekte vollständig digital ablaufen – Sie entscheiden, was für Sie passt.',
    },
    {
      question: 'Was ist im Festpreis-Angebot enthalten?',
      answer:
        'Unser Festpreis umfasst: Konzeption & Strategie, UI/UX Design, Frontend- und Backend-Entwicklung, Mobile-Optimierung, SEO-Grundoptimierung, Performance-Tuning (Lighthouse 90+ Score), DSGVO-konforme Implementierung, Testing auf allen Geräten, Deployment und 30 Tage Launch-Support. Wartung und Content-Erstellung sind optional buchbar.',
    },
  ],

  // ============================================================================
  // Web Development FAQs
  // ============================================================================
  webDevelopment: [
    {
      question: 'Welche Technologien nutzt HEADON für Webentwicklung?',
      answer:
        'Wir setzen auf den modernen Tech-Stack: Next.js 15 (React Framework) für performante Websites, TypeScript für Type-Safety und weniger Bugs, Tailwind CSS für schnelles, responsives Styling und Supabase für Backend & Datenbanken. Diese Technologien garantieren beste Performance, Skalierbarkeit und einfache Wartbarkeit – Ihre Website ist zukunftssicher.',
    },
    {
      question: 'Warum Next.js statt WordPress?',
      answer:
        'Next.js bietet 4-10x schnellere Ladezeiten als WordPress, was direkt Ihre SEO und Conversion Rate verbessert. Sie erhalten eine maßgeschneiderte Lösung statt generisches Theme, keine Sicherheitslücken durch veraltete Plugins und deutlich geringere Hosting-Kosten. Für Content-Management integrieren wir moderne Headless CMS-Lösungen, die einfacher als WordPress sind.',
    },
    {
      question: 'Bekomme ich eine mobile Version meiner Website?',
      answer:
        'Jede Website ist standardmäßig vollständig responsive und für alle Geräte optimiert – Smartphone, Tablet und Desktop. Wir entwickeln "Mobile First", d.h. die mobile Version steht im Fokus und wird dann für größere Bildschirme erweitert. Das Ergebnis: perfekte Darstellung auf jedem Gerät und optimale User Experience für mobile Nutzer (die oft 60-70% der Besucher ausmachen).',
    },
    {
      question: 'Kann ich Inhalte später selbst bearbeiten?',
      answer:
        'Ja, wir integrieren auf Wunsch ein intuitives Content Management System (CMS) wie Contentful, Sanity oder Payload CMS. Diese modernen CMS sind einfacher zu bedienen als WordPress und erfordern keine technischen Kenntnisse. Alternativ schulen wir Sie im Umgang mit Ihrem spezifischen System – Sie entscheiden, wie viel Kontrolle Sie über Ihre Inhalte haben möchten.',
    },
    {
      question: 'Ist meine Website SEO-optimiert?',
      answer:
        'Jede Website wird mit SEO-Grundoptimierung ausgeliefert: Optimierte Meta-Tags, Schema.org Structured Data, semantisches HTML, perfekte Performance (Lighthouse 90+ Score), Mobile-Optimierung und saubere URL-Struktur. Für fortgeschrittenes SEO (Keyword-Recherche, Content-Strategie, Backlink-Aufbau) bieten wir separate SEO-Pakete an.',
    },
    {
      question: 'Was kostet Hosting und Wartung für meine Website?',
      answer:
        'Hosting kostet je nach Traffic 5-30€/Monat (wir empfehlen Vercel oder Hetzner VPS). Unsere optionalen Wartungsverträge starten bei 150€/Monat und umfassen Updates, Monitoring, Backups und Support. Sie können das Hosting auch selbst verwalten – wir liefern Ihnen alle Zugänge und Dokumentation. Für statische Websites ist Hosting oft kostenlos möglich.',
    },
    {
      question: 'Kann meine Website später erweitert werden?',
      answer:
        'Absolut! Dank modularer Architektur können wir jederzeit Features hinzufügen: E-Commerce-Funktionen, Buchungssysteme, User-Authentifizierung, Mitgliederbereiche, APIs, etc. Der saubere TypeScript-Code ist dokumentiert und strukturiert, sodass auch andere Entwickler problemlos Erweiterungen vornehmen können. Ihre Website wächst mit Ihrem Business.',
    },
  ],

  // ============================================================================
  // Mobile Development FAQs
  // ============================================================================
  mobileDevelopment: [
    {
      question: 'Native App oder Cross-Platform – was ist besser?',
      answer:
        'Cross-Platform Apps (React Native, Flutter) sind in 80% der Fälle die bessere Wahl: Eine Codebasis für iOS und Android spart 40-60% Kosten und Zeit, bei nahezu identischer Performance und User Experience. Native Apps lohnen sich nur für sehr performance-kritische Anwendungen (3D-Spiele, Augmented Reality) oder Apps, die tiefe System-Integrationen benötigen.',
    },
    {
      question: 'Was kostet die Entwicklung einer Mobile App?',
      answer:
        'Eine Cross-Platform App (iOS + Android) kostet ab 15.000€ für einfache Apps (z.B. Portfolio, Content-App) und 25.000-50.000€ für komplexe Apps mit Backend, User-Authentifizierung und Zahlungsabwicklung. Native Apps (separate iOS und Android Entwicklung) kosten das Doppelte. Nach kostenloser Beratung erhalten Sie ein detailliertes Festpreis-Angebot basierend auf Ihren Feature-Anforderungen.',
    },
    {
      question: 'Wie lange dauert App-Entwicklung bis zum Launch im App Store?',
      answer:
        'Von Konzept bis App Store Launch rechnen Sie mit 8-16 Wochen: 1-2 Wochen Planung & Design, 4-10 Wochen Entwicklung, 1-2 Wochen Testing und 1-2 Wochen für App Store & Google Play Freigabe. Wir begleiten den gesamten Review-Prozess und kümmern uns um App Store Optimierung (ASO), damit Ihre App nach Launch auch gefunden wird.',
    },
    {
      question: 'Übernimmt HEADON die App Store Veröffentlichung?',
      answer:
        'Ja, wir kümmern uns um die komplette Veröffentlichung: App Store Connect und Google Play Console Setup, Erstellung von Screenshots und Store-Beschreibungen, App Store Optimization (ASO), Einreichung und Kommunikation mit den Review-Teams. Sie benötigen lediglich Apple Developer Account (99$/Jahr) und Google Play Developer Account (25$ einmalig) – den Rest übernehmen wir.',
    },
    {
      question: 'Bekomme ich Zugriff auf den App-Quellcode?',
      answer:
        'Ja, Sie erhalten vollständigen Zugriff auf den Quellcode via GitHub oder GitLab. Der Code gehört Ihnen nach Projektzahlung und ist ausführlich dokumentiert. Unsere TypeScript-Codebasis ist clean, strukturiert und folgt Best Practices – Sie können jederzeit andere Entwickler hinzuziehen oder selbst Änderungen vornehmen.',
    },
    {
      question: 'Welche Features kann man in einer App umsetzen?',
      answer:
        'Praktisch alles: User-Registrierung & Login, Push-Benachrichtigungen, In-App-Käufe & Abonnements, Social Login (Google, Apple, Facebook), Kamera & Fotobearbeitung, GPS & Karten, Offline-Funktionalität, Barcode-Scanner, Payment-Integration (Stripe, PayPal), Video-Streaming, Chat-Funktionen und vieles mehr. Wir beraten Sie, welche Features für Ihre Zielgruppe am wichtigsten sind.',
    },
  ],

  // ============================================================================
  // UI/UX Design FAQs
  // ============================================================================
  uiUxDesign: [
    {
      question: 'Was ist der Unterschied zwischen UI und UX Design?',
      answer:
        'UX (User Experience) Design beschäftigt sich mit der Benutzererfahrung: Wie fühlt sich die Nutzung an? Ist die Navigation intuitiv? UI (User Interface) Design fokussiert auf das visuelle Erscheinungsbild: Farben, Typografie, Icons, Buttons. Gutes Design vereint beides – Ihre Website sieht nicht nur gut aus, sondern ist auch angenehm und effizient zu bedienen.',
    },
    {
      question: 'Bekomme ich vor der Entwicklung ein Design zu sehen?',
      answer:
        'Ja, wir zeigen Ihnen hochwertige Figma-Designs aller wichtigen Seiten (Desktop & Mobile) zur Freigabe, bevor wir mit der Entwicklung starten. Sie können Änderungswünsche äußern und wir passen das Design an – erst nach Ihrer finalen Freigabe beginnt die Programmierung. So vermeiden wir teure Änderungen während der Entwicklung.',
    },
    {
      question: 'Was kostet professionelles UI/UX Design?',
      answer:
        'Reines Design-Projekt (ohne Entwicklung) kostet ab 3.000€ für kleinere Websites bis 10.000€+ für komplexe Plattformen. Im Paket mit Entwicklung ist das Design bereits ab 2.500€ Gesamtpreis enthalten. Das Design umfasst: User Research, Wireframes, High-Fidelity Mockups (Figma), Design System, Responsive Designs für alle Bildschirmgrößen und Prototyp zum Testen.',
    },
    {
      question: 'Kann HEADON mein bestehendes Branding integrieren?',
      answer:
        'Absolut! Wenn Sie ein Corporate Design Manual, Logo und Farbschema haben, integrieren wir diese nahtlos in Ihre Website oder App. Falls Sie noch kein Branding haben, entwickeln wir ein komplettes Corporate Identity Package: Logo, Farbpalette, Typografie, Bildsprache und Brand Guidelines – alles aus einer Hand.',
    },
    {
      question: 'Was ist ein Design System und brauche ich das?',
      answer:
        'Ein Design System ist eine Bibliothek wiederverwendbarer UI-Komponenten (Buttons, Forms, Cards, etc.) mit einheitlichen Styles und Guidelines. Für größere Projekte (10+ Seiten) ist es essenziell: Es garantiert Konsistenz, beschleunigt zukünftige Erweiterungen und ermöglicht einfache Anpassungen. Wir erstellen automatisch ein Design System in Figma und Code für jedes Projekt.',
    },
    {
      question: 'Wie stellt ihr sicher, dass das Design zu meiner Zielgruppe passt?',
      answer:
        'Wir starten jedes Projekt mit User Research: Analyse Ihrer Zielgruppe (Alter, Technik-Affinität, Bedürfnisse), Wettbewerber-Analyse und Definition von User Personas. Das Design wird dann spezifisch auf diese Zielgruppe zugeschnitten – z.B. größere Schrift für ältere Nutzer, gaming-inspirierte Ästhetik für junge Zielgruppen oder clean, professionelles Design für B2B. Auf Wunsch führen wir auch Usability-Tests mit echten Nutzern durch.',
    },
  ],

  // ============================================================================
  // Backend Solutions FAQs
  // ============================================================================
  backendSolutions: [
    {
      question: 'Was ist ein Backend und wann brauche ich das?',
      answer:
        'Das Backend ist die "Serverseite" Ihrer Anwendung: Datenbank, User-Verwaltung, Geschäftslogik, API-Schnittstellen. Sie brauchen ein Backend sobald Sie dynamische Inhalte, User-Accounts, Datenerfassung, Admin-Bereiche oder Integrationen mit anderen Systemen benötigen. Einfache Marketing-Websites kommen oft ohne Backend aus, komplexe Web-Apps oder Mobile Apps benötigen immer ein Backend.',
    },
    {
      question: 'Welche Backend-Technologien nutzt HEADON?',
      answer:
        'Wir setzen primär auf Supabase (PostgreSQL-Datenbank mit Echtzeit-Features, Auth, Storage) für schnelle Entwicklung und niedrige Kosten. Für komplexere Enterprise-Anforderungen entwickeln wir Custom-Backends mit Node.js/Express oder Python/FastAPI. Die Wahl hängt von Ihren Anforderungen ab – wir beraten Sie zur optimalen Technologie für Ihr Projekt.',
    },
    {
      question: 'Was kostet Backend-Entwicklung?',
      answer:
        'Basis-Backend (User-Auth, Datenbank, REST API) kostet ab 4.000€. Komplexere Systeme mit Business-Logik, Payment-Integration, Admin-Dashboard und erweiterten Features kosten 10.000-25.000€. Die monatlichen Hosting-Kosten für das Backend liegen bei 10-100€ je nach Nutzerzahl und Datenmenge. Nach Anforderungsanalyse erhalten Sie ein transparentes Festpreis-Angebot.',
    },
    {
      question: 'Kann HEADON bestehende Systeme integrieren (ERP, CRM)?',
      answer:
        'Ja, wir entwickeln API-Schnittstellen zu allen gängigen Systemen: SAP, Microsoft Dynamics, Salesforce, HubSpot, DATEV und viele mehr. Die Integration ermöglicht automatischen Datenaustausch, vermeidet manuelle Doppelerfassung und verbindet Ihre neue Website/App nahtlos mit bestehenden Business-Prozessen. Wir analysieren Ihre Systemlandschaft und entwickeln die optimale Integrations-Architektur.',
    },
    {
      question: 'Wie sicher ist mein Backend vor Hackerangriffen?',
      answer:
        'Wir implementieren Industry-Standard Security Measures: Verschlüsselte Datenkommunikation (HTTPS/TLS), sichere Passwort-Hashing (bcrypt), SQL-Injection-Prävention, CSRF-Protection, Rate-Limiting gegen DDoS, regelmäßige Security-Updates und DSGVO-konforme Datenspeicherung. Auf Wunsch führen wir auch Penetration Tests durch und implementieren erweiterte Security-Features wie 2-Factor-Authentication.',
    },
    {
      question: 'Was ist eine REST API und wozu brauche ich die?',
      answer:
        'Eine REST API ist eine standardisierte Schnittstelle, über die verschiedene Systeme miteinander kommunizieren können. Sie brauchen eine API wenn Ihre Website/App mit externen Services kommuniziert (Payment, Maps, Social Media), wenn Sie ein Mobile App zusätzlich zur Website planen, oder wenn Drittsysteme auf Ihre Daten zugreifen sollen. Wir entwickeln saubere, dokumentierte APIs nach REST-Best-Practices.',
    },
    {
      question: 'Kann das Backend später skalieren wenn mein Business wächst?',
      answer:
        'Ja, wir entwickeln von Anfang an mit Skalierbarkeit im Hinterkopf: Cloud-native Architektur (Vercel, AWS, Supabase), horizontale Skalierung (mehr Server bei Bedarf), Caching-Strategien für Performance, optimierte Datenbank-Queries und Load Balancing. Ihre Plattform kann von 100 auf 100.000 Nutzer wachsen ohne komplettes Rewrite – nur die Infrastruktur wird erweitert.',
    },
  ],
}

/**
 * Helper function to get all FAQs as flat array
 * Useful for search functionality or full FAQ page
 */
export function getAllFAQs(): FAQ[] {
  return [
    ...faqData.general,
    ...faqData.webDevelopment,
    ...faqData.mobileDevelopment,
    ...faqData.uiUxDesign,
    ...faqData.backendSolutions,
  ]
}

/**
 * Helper function to get FAQ count per category
 * Useful for analytics and validation
 */
export function getFAQCounts(): Record<keyof FAQCollection, number> {
  return {
    general: faqData.general.length,
    webDevelopment: faqData.webDevelopment.length,
    mobileDevelopment: faqData.mobileDevelopment.length,
    uiUxDesign: faqData.uiUxDesign.length,
    backendSolutions: faqData.backendSolutions.length,
  }
}

/**
 * Helper function to search FAQs by keyword
 * Case-insensitive search in questions and answers
 */
export function searchFAQs(query: string): FAQ[] {
  const normalizedQuery = query.toLowerCase()
  return getAllFAQs().filter(
    (faq) =>
      faq.question.toLowerCase().includes(normalizedQuery) ||
      faq.answer.toLowerCase().includes(normalizedQuery)
  )
}
