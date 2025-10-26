import type { ComparisonArticle } from '@/lib/types/content'

export const supabaseVsFirebase: ComparisonArticle = {
  slug: 'supabase-vs-firebase',
  title: 'Supabase vs Firebase: Backend-as-a-Service Vergleich 2025',
  description:
    'Supabase vs Firebase im Detail: Open Source vs Google, PostgreSQL vs NoSQL, Kosten, Features. Welches BaaS ist das richtige für Ihr Projekt?',
  publishedAt: '2025-01-30',
  author: { name: 'HEADON Team' },
  items: [
    {
      name: 'Supabase',
      features: {
        Datenbank: 'PostgreSQL (SQL)',
        'Open Source': true,
        'Self Hosting': 'Möglich',
        Authentication: 'Umfassend (Email, OAuth, Magic Link)',
        'Realtime Subscriptions': true,
        'Storage': 'S3-kompatibel',
        'Edge Functions': 'Deno Runtime',
        'Free Tier': '500 MB Datenbank, 1 GB Storage',
        Pricing: 'Ab 25$/Monat',
        'Vendor Lock-in': 'Gering (Self-Hosting möglich)',
        'Learning Curve': 'Mittel (SQL-Kenntnisse nötig)',
      },
      pros: [
        'Open Source - vollständige Transparenz und Kontrolle',
        'PostgreSQL - leistungsstarke relationale Datenbank',
        'Self-Hosting möglich - keine Vendor Lock-in',
        'Sehr gute Developer Experience und moderne Tools',
        'Günstiger als Firebase bei wachsendem Traffic',
        'Realtime Subscriptions out-of-the-box',
        'Umfassende Dokumentation und aktive Community',
      ],
      cons: [
        'Jüngere Plattform mit kleinerem Ecosystem',
        'SQL-Kenntnisse erforderlich (höhere Lernkurve)',
        'Weniger integrations als Firebase',
        'Self-Hosting erfordert DevOps-Kenntnisse',
        'Kleineres Team hinter dem Produkt',
      ],
      useCase:
        'Startups, B2B-Apps, Projekte mit komplexen Datenbeziehungen, kostensensiive Projekte',
      recommendation:
        'Wählen Sie Supabase für volle Kontrolle, SQL-Datenbank und wenn Sie Vendor Lock-in vermeiden wollen.',
    },
    {
      name: 'Firebase',
      features: {
        Datenbank: 'Firestore (NoSQL)',
        'Open Source': false,
        'Self Hosting': 'Nicht möglich',
        Authentication: 'Umfassend (viele Provider)',
        'Realtime Subscriptions': true,
        'Storage': 'Google Cloud Storage',
        'Edge Functions': 'Cloud Functions (Node.js)',
        'Free Tier': '1 GB Storage, 10 GB Transfer',
        Pricing: 'Pay-as-you-go (kann teuer werden)',
        'Vendor Lock-in': 'Sehr hoch',
        'Learning Curve': 'Niedrig (einfacher Start)',
      },
      pros: [
        'Sehr etabliert mit großem Ecosystem und Community',
        'Einfache Lernkurve - schneller Start möglich',
        'Umfassende Integrationen (Analytics, Crashlytics, etc.)',
        'Starkes Backing durch Google',
        'Excellent Mobile SDK Support',
        'Viele Third-Party Services und Tutorials',
      ],
      cons: [
        'Closed Source - keine Transparenz',
        'Vendor Lock-in - abhängig von Google',
        'NoSQL kann bei komplexen Queries limitieren',
        'Kosten steigen stark mit Traffic',
        'Kein Self-Hosting möglich',
        'Firestore Queries sind limitiert',
      ],
      useCase: 'Mobile Apps, Projekte mit einfachen Datenstrukturen, Rapid Prototyping',
      recommendation:
        'Wählen Sie Firebase für schnellen Start, Mobile Apps und wenn Google-Integration wichtig ist.',
    },
    {
      name: 'Eigenes Backend',
      features: {
        Datenbank: 'Beliebig',
        'Open Source': 'Optional',
        'Self Hosting': 'Erforderlich',
        Authentication: 'Custom Implementation',
        'Realtime Subscriptions': 'Optional (z.B. WebSockets)',
        'Storage': 'Beliebig',
        'Edge Functions': 'Custom API',
        'Free Tier': 'Nein',
        Pricing: 'Hosting + Entwicklungskosten',
        'Vendor Lock-in': 'Keiner',
        'Learning Curve': 'Hoch',
      },
      pros: [
        'Vollständige Kontrolle über alle Aspekte',
        'Keine laufenden Plattform-Kosten',
        'Kein Vendor Lock-in',
        'Unbegrenzte Anpassungsmöglichkeiten',
        'Optimierung für spezifische Use Cases',
      ],
      cons: [
        'Sehr hohe initiale Entwicklungskosten',
        'Lange Entwicklungszeit',
        'DevOps-Expertise erforderlich',
        'Wartung und Updates selbst verantwortlich',
        'Keine Out-of-the-Box Features',
      ],
      useCase: 'Enterprise mit speziellen Anforderungen, sehr hoher Traffic, Compliance',
      recommendation:
        'Wählen Sie eigenes Backend nur bei sehr spezifischen Anforderungen oder Compliance-Gründen.',
    },
  ],
  featureCategories: [
    {
      category: 'Datenbank & Architektur',
      features: ['Datenbank', 'Open Source', 'Self Hosting', 'Vendor Lock-in'],
    },
    {
      category: 'Features',
      features: ['Authentication', 'Realtime Subscriptions', 'Storage', 'Edge Functions'],
    },
    {
      category: 'Kosten & Einstieg',
      features: ['Free Tier', 'Pricing', 'Learning Curve'],
    },
  ],
  introduction:
    'Backend-as-a-Service (BaaS) Plattformen revolutionieren die App-Entwicklung: Statt Wochen für Backend-Setup zu investieren, ist man in Stunden produktiv. Supabase und Firebase sind die führenden Lösungen, aber welche ist die richtige für Ihr Projekt? Supabase punktet als Open Source Alternative mit PostgreSQL, während Firebase mit seinem reifen Ecosystem und Google-Integration überzeugt. In diesem Vergleich analysieren wir beide Plattformen detailliert und zeigen, für welche Use Cases sie jeweils optimal sind.',
  conclusion:
    'Bei HEADON nutzen wir primär Supabase für alle neuen Projekte. Die Gründe: Open Source ermöglicht volle Transparenz, PostgreSQL bietet mehr Flexibilität als NoSQL, Self-Hosting-Option vermeidet Vendor Lock-in und die Kosten sind bei wachsendem Traffic deutlich günstiger als Firebase. Firebase ist eine gute Wahl für Mobile-First Apps mit einfachen Datenstrukturen und wenn Google-Integration wichtig ist. Für professionelle Web-Apps empfehlen wir Supabase - die Developer Experience ist exzellent und die Plattform wächst rasant. Ein eigenes Backend lohnt sich nur bei sehr spezifischen Anforderungen oder Enterprise-Compliance-Gründen.',
  relatedService: {
    name: 'Backend Solutions',
    url: '/services/backend-solutions',
    cta: 'Backend mit Supabase entwickeln lassen',
  },
  keywords: [
    'supabase vs firebase',
    'backend as a service vergleich',
    'supabase oder firebase',
    'firebase alternative',
    'open source backend',
  ],
  ogImage: '/og-images/backend.jpg',
}
