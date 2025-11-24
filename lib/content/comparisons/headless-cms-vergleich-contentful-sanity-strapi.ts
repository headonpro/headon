import type { ComparisonArticle } from '@/lib/types/content'

export const headlessCmsVergleich: ComparisonArticle = {
  slug: 'headless-cms-vergleich-contentful-sanity-strapi',
  title: 'Headless CMS: Contentful vs Sanity vs Strapi',
  description:
    'Die besten Headless CMS im Vergleich: SaaS vs Open Source, Features, Kosten, Developer Experience. Welches CMS ist das richtige?',
  publishedAt: '2025-02-05',
  author: { name: 'HEADON Team' },
  items: [
    {
      name: 'Contentful',
      features: {
        Typ: 'SaaS (Hosted)',
        Pricing: 'Free bis 489€+/Monat',
        'Content Model': 'JSON-basiert',
        'Editor Experience': 'Sehr gut',
        'Developer Experience': 'Gut',
        'Media Handling': 'Sehr gut (inkl. CDN)',
        API: 'REST + GraphQL',
        'Multi-Language': 'Exzellent',
        'Self Hosting': false,
        'Open Source': false,
        'Learning Curve': 'Niedrig',
      },
      pros: [
        'Sehr etabliert und mature Plattform',
        'Exzellente Editor-Experience für Content-Teams',
        'Umfassendes Feature-Set out-of-the-box',
        'Hervorragende Performance und Skalierbarkeit',
        'Stark in Multi-Language und Localization',
        'Gute Dokumentation und Support',
        'Großes Ecosystem und Integrationen',
      ],
      cons: [
        'Relativ teuer bei wachsendem Content',
        'Vendor Lock-in - proprietäre Plattform',
        'Weniger flexibel bei Custom Content Types',
        'Komplexe Pricing-Struktur',
        'GraphQL API weniger intuitiv als andere',
      ],
      useCase: 'Enterprise Content, Multi-Channel Publishing, internationale Websites',
      recommendation:
        'Wählen Sie Contentful für Enterprise-Projekte mit Content-Teams und wenn Budget vorhanden ist.',
    },
    {
      name: 'Sanity',
      features: {
        Typ: 'SaaS (Hosted)',
        Pricing: 'Free bis 949€+/Monat',
        'Content Model': 'Schema-basiert (JavaScript)',
        'Editor Experience': 'Exzellent (anpassbar)',
        'Developer Experience': 'Exzellent',
        'Media Handling': 'Sehr gut (Sanity Image Pipeline)',
        API: 'GROQ + GraphQL',
        'Multi-Language': 'Sehr gut',
        'Self Hosting': false,
        'Open Source': 'Studio Open Source',
        'Learning Curve': 'Mittel',
      },
      pros: [
        'Beste Developer Experience - "Developer First"',
        'Hochgradig anpassbarer Editor (Sanity Studio)',
        'Realtime Collaboration out-of-the-box',
        'Portable Text für Rich Content',
        'GROQ Query Language ist sehr mächtig',
        'Sanity Studio kann selbst gehostet werden',
        'Sehr gutes Pricing für kleine bis mittlere Projekte',
      ],
      cons: [
        'Kleinere Community als Contentful',
        'GROQ hat Lernkurve',
        'Weniger Third-Party Integrationen',
        'Kosten steigen bei API Requests',
        'Self-Hosting nur für Studio, nicht Backend',
      ],
      useCase: 'Developer-freundliche Projekte, Startups, Custom Content Experiences',
      recommendation:
        'Wählen Sie Sanity für beste Developer Experience und wenn Sie custom Editor-UI brauchen.',
    },
    {
      name: 'Strapi',
      features: {
        Typ: 'Open Source (Self-Hosted)',
        Pricing: 'Free (Self-Hosted) oder Cloud ab 99€/Monat',
        'Content Model': 'GUI-basiert',
        'Editor Experience': 'Gut',
        'Developer Experience': 'Sehr gut',
        'Media Handling': 'Gut (Plugins)',
        API: 'REST + GraphQL',
        'Multi-Language': 'Gut (Plugin)',
        'Self Hosting': true,
        'Open Source': true,
        'Learning Curve': 'Mittel',
      },
      pros: [
        'Komplett Open Source und kostenlos',
        'Self-Hosting möglich - volle Kontrolle',
        'Kein Vendor Lock-in',
        'Sehr flexibles Plugin-System',
        'Gute Developer Experience mit TypeScript',
        'Admin Panel out-of-the-box',
        'Keine API Request Limits bei Self-Hosting',
      ],
      cons: [
        'Self-Hosting erfordert DevOps-Kenntnisse',
        'Weniger polish als SaaS-Lösungen',
        'Performance hängt von Ihrer Infrastruktur ab',
        'Kleinere Community als Contentful/Sanity',
        'Updates müssen selbst verwaltet werden',
        'Cloud-Version relativ teuer',
      ],
      useCase: 'Budget-limitierte Projekte, Self-Hosting Requirements, volle Kontrolle',
      recommendation:
        'Wählen Sie Strapi wenn Budget limitiert ist oder Self-Hosting erforderlich ist.',
    },
  ],
  featureCategories: [
    {
      category: 'Typ & Kosten',
      features: ['Typ', 'Pricing', 'Self Hosting', 'Open Source'],
    },
    {
      category: 'User & Developer Experience',
      features: ['Editor Experience', 'Developer Experience', 'Learning Curve'],
    },
    {
      category: 'Features & API',
      features: ['Content Model', 'Media Handling', 'API', 'Multi-Language'],
    },
  ],
  introduction:
    'Headless CMS haben die Content-Verwaltung revolutioniert: Statt monolithischer Systeme wie WordPress, trennen sie Content (Backend) von Präsentation (Frontend). Dies ermöglicht Multi-Channel Publishing (Web, App, IoT) und moderne Frontend-Frameworks. Contentful, Sanity und Strapi sind die führenden Headless CMS, aber welches ist das richtige für Ihr Projekt? In diesem Vergleich analysieren wir Vor- und Nachteile aller drei Systeme hinsichtlich Features, Kosten, Developer- und Editor-Experience.',
  conclusion:
    'Die Wahl des richtigen Headless CMS hängt von Budget, Team-Größe und Anforderungen ab. Contentful ist die Enterprise-Lösung mit bestem Feature-Set, aber auch teuerste Option. Sanity bietet die beste Developer Experience und ist unsere Empfehlung für die meisten Projekte - das Pricing ist fair und die Flexibilität ist enorm. Strapi ist perfekt für Budget-limitierte Projekte oder wenn Self-Hosting erforderlich ist. Bei HEADON nutzen wir primär Sanity für neue Projekte, da es die beste Balance aus Developer Experience, Editor Experience und Kosten bietet. Für Enterprise-Kunden mit großen Content-Teams empfehlen wir Contentful.',
  relatedService: {
    name: 'Web Development',
    url: '/services/web-development',
    cta: 'Website mit Headless CMS entwickeln lassen',
  },
  keywords: [
    'headless cms vergleich',
    'contentful vs sanity vs strapi',
    'headless cms 2025',
    'content management system',
    'wordpress alternative',
  ],
  ogImage: '/og-images/web-dev.jpg',
}
