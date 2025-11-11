# SEO-Optimierungsplan für HEADON.pro

**Erstellt:** 26. Oktober 2025
**Projektziel:** Organischen Traffic um +250% steigern und Rankings für 20+ neue Keywords erreichen
**Zeitrahmen:** 8 Wochen (4 Phasen)

---

## 📋 Inhaltsverzeichnis

1. [Executive Summary](#executive-summary)
2. [Aktuelle Situation](#aktuelle-situation)
3. [Phase 1: Quick Wins (Woche 1-2)](#phase-1-quick-wins-woche-1-2)
4. [Phase 2: Content-Erweiterung (Woche 3-6)](#phase-2-content-erweiterung-woche-3-6)
5. [Phase 3: Technische Optimierung (Woche 7-8)](#phase-3-technische-optimierung-woche-7-8)
6. [Phase 4: Off-Page & Monitoring (Laufend)](#phase-4-off-page--monitoring-laufend)
7. [Keyword-Strategie](#keyword-strategie)
8. [Messbare Ziele](#messbare-ziele)
9. [Checklisten](#checklisten)

---

## Executive Summary

### Hauptprobleme

- ❌ Keine Sichtbarkeit für Kerngeschäftsfelder (Kreativagentur, Marketingagentur)
- ❌ USPs (4x schneller, KI-gestützt, Festpreise) werden nicht in Keywords abgebildet
- ❌ Fehlende branchenspezifische Landing Pages
- ❌ Lokale Long-Tail-Keywords nicht optimiert
- ❌ Schwache interne Verlinkung

### Erwartete Ergebnisse

- **Nach 2 Wochen:** +30% organischer Traffic, bessere CTR in SERPs
- **Nach 6 Wochen:** +150% organischer Traffic, Rankings für 20+ neue Keywords
- **Nach 8 Wochen:** +250% organischer Traffic, Top 3 Rankings für lokale Keywords

---

## Aktuelle Situation

### Stärken ✅

- Solide technische SEO-Basis (Schema.org, OpenGraph, Canonical Tags)
- Moderne Technologie (Next.js 15, optimale Performance)
- Regionale Stadt-Seiten vorhanden (6 Städte)
- Service-Unterseiten mit gutem Content
- Strukturierte Daten implementiert

### Schwächen ❌

- Geschäftsfeld-Keywords fehlen (Kreativagentur, Marketingagentur, Branding)
- USP-Keywords nicht vorhanden (schnell, KI-gestützt, günstig, Festpreis)
- Keine branchen-spezifischen Landing Pages
- Lokale Long-Tail-Keywords ungenutzt
- Meta-Descriptions nicht optimiert
- Homepage-Content zu generisch
- Interne Verlinkung schwach

### Wettbewerber-Analyse

Wettbewerber ranken für:

- "Webdesign Agentur Lauda-Königshofen"
- "SEO Agentur Lauda-Königshofen"
- "Homepage erstellen Lauda-Königshofen"
- "Grafikdesign Lauda-Königshofen"
- "Werbeagentur Main-Tauber-Kreis"

---

## Phase 1: Quick Wins (Woche 1-2)

**Zeitaufwand:** 8-12 Stunden
**Erwarteter Impact:** +30% Traffic

### 1.1 Meta-Descriptions optimieren

**Dateien zu bearbeiten:**

- `app/layout.tsx` (Root Layout)
- `app/page.tsx` (Homepage)
- `app/services/page.tsx`
- `app/about/page.tsx`
- `app/portfolio/page.tsx`
- `app/blog/page.tsx`
- `app/contact/page.tsx`
- Alle `app/regionen/[city]/page.tsx`

**Optimierungs-Template:**

```
[Hauptkeyword] von HEADON: [USP mit Zahl] + [Benefit]. [Preis-Info]. [CTA] für [Region].
```

**Beispiele:**

**Homepage (aktuell):**

```typescript
description: 'KI-gestützte Webentwicklung aus Lauda-Königshofen: 4x schneller, 2x bessere Performance...'
```

**Homepage (optimiert):**

```typescript
description: 'Full-Service Kreativ- und Marketingagentur aus Lauda-Königshofen: Webentwicklung, Apps, Corporate Design & Branding. 4x schneller durch KI-Prozesse - von der Idee zum Launch in 2-4 Wochen statt Monaten. Transparente Festpreise ab 2.500€. Kostenlose Erstberatung für Main-Tauber-Kreis & Würzburg.'
```

**Services-Page (aktuell):**

```typescript
description: 'Professionelle Digitallösungen von HEADON: Web Development mit Next.js, Mobile Apps für iOS/Android...'
```

**Services-Page (optimiert):**

```typescript
description: 'Professionelle Web Development, Mobile Apps & UI/UX Design Services von HEADON: 4x schneller dank KI-Prozessen, 90+ Lighthouse Score garantiert. Von Konzeption bis Launch. Festpreise ab 5.000€. Jetzt kostenlose Erstberatung in Main-Tauber-Kreis sichern!'
```

**About-Page (optimiert):**

```typescript
description: 'Lernen Sie HEADON kennen: Moderne Kreativ- und Marketingagentur aus Lauda-Königshofen mit KI-gestützter Entwicklung. 50+ erfolgreiche Projekte in Main-Tauber-Kreis, durchschnittlich 95+ Lighthouse Score. Mission: Digitale Lösungen 4x schneller zu fairem Festpreis.'
```

### 1.2 Keywords erweitern

**Homepage - Keywords hinzufügen:**

```typescript
keywords: [
  // Primäre Geschäftsfelder (NEU!)
  'Kreativagentur Lauda-Königshofen',
  'Marketingagentur Main-Tauber-Kreis',
  'Full-Service Digitalagentur Baden-Württemberg',
  'Werbeagentur Tauberbischofsheim',
  'Branding Agentur Würzburg',
  'Corporate Design Bad Mergentheim',
  'Grafikdesign Agentur Lauda-Königshofen',

  // Bestehende Webentwicklung (behalten)
  'Webentwicklung Lauda-Königshofen',
  'Web Development Baden-Württemberg',
  'Mobile Apps Main-Tauber-Kreis',
  'React Next.js TypeScript',
  'Kreativagentur Würzburg',
  'UI/UX Design Tauberbischofsheim',

  // USP-Keywords (NEU!)
  'schnelle Webentwicklung Baden-Württemberg',
  'Website in 4 Wochen',
  'KI gestützte Webentwicklung Deutschland',
  'AI powered web development',
  'günstige Webentwicklung Festpreis',
  'transparente Preise Webdesign',
  'Webdesign ab 2500 Euro',
  'Express Webentwicklung',

  // Marketing Services (NEU!)
  'Social Media Marketing Main-Tauber-Kreis',
  'Content Marketing Agentur',
  'SEO Optimierung Baden-Württemberg',
  'Online Marketing Lauda-Königshofen',

  // Design Services (NEU!)
  'Logo Design Baden-Württemberg',
  'Corporate Identity Design',
  'Brand Design Agentur',
  'Responsive Webdesign',

  // Tech Keywords (behalten)
  'React Entwickler Deutschland',
  'Next.js Agentur',
  'Flutter App Entwicklung',
  'Full-Stack Development',

  // Long-Tail (NEU!)
  'Website erstellen lassen',
  'Mobile App entwickeln lassen',
  'Webdesign Agentur finden',
  'Full-Service Digitalagentur',
]
```

**Service-Pages - Individuelle Keywords:**

Jede Service-Page bekommt spezifische Keywords:

**Web Development:**

```typescript
keywords: 'Web Development Services, Next.js Entwicklung, React Webanwendungen, Progressive Web Apps, E-Commerce Entwicklung, Website Modernisierung, WordPress zu Next.js Migration, Performance Optimierung, schnelle Webentwicklung, günstige Webentwicklung Festpreis'
```

**Mobile Development:**

```typescript
keywords: 'Mobile App Entwicklung, iOS App Entwicklung, Android App Entwicklung, React Native, Flutter Development, Cross-Platform Apps, App Store Optimierung, Mobile First Design, App Entwicklung Kosten, App programmieren lassen'
```

**UI/UX Design:**

```typescript
keywords: 'UI UX Design Agentur, User Experience Design, Interface Design, Webdesign Agentur, Responsive Design, Mobile First Design, Design System Entwicklung, Prototyping Figma, Usability Testing, Barrierefreies Design'
```

**Backend Solutions:**

```typescript
keywords: 'Backend Entwicklung, API Development, Supabase Entwicklung, PostgreSQL Database Design, Cloud Infrastructure, Server Development, Authentication Services, Skalierbare Backend Systeme, B2B Portal Entwicklung'
```

### 1.3 Homepage Hero-Content optimieren

**Datei:** `components/sections/HeroSection.tsx`

**Aktueller Subtext (Zeile 273):**

```tsx
<p className="text-center text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
  Als Kreativ- und Marketingagentur vereinen wir Webentwicklung, App-Development, UI/UX Design und
  Corporate Branding unter einem Dach. Während andere Agenturen noch traditionell entwickeln, nutzen
  wir KI-gestützte Prozesse für 4x schnellere Umsetzung. Ihre digitale Transformation in Wochen
  statt Monaten - zu einem Bruchteil der üblichen Kosten.
</p>
```

**Optimierter Subtext mit konkreten Zahlen:**

```tsx
<p className="text-center text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
  <strong className="text-white">Kreativ- und Marketingagentur aus Lauda-Königshofen</strong> für
  Main-Tauber-Kreis, Würzburg & Baden-Württemberg. Wir vereinen Webentwicklung, App-Development,
  UI/UX Design und Corporate Branding unter einem Dach. Während andere Agenturen 3-6 Monate
  brauchen, realisieren wir Ihr Projekt durch{' '}
  <strong className="text-white">KI-gestützte Prozesse in 2-4 Wochen</strong> – zu{' '}
  <strong className="text-white">transparenten Festpreisen ab 2.500€</strong>. Bereits{' '}
  <strong className="text-white">50+ erfolgreiche Projekte</strong> mit durchschnittlich{' '}
  <strong className="text-white">95+ Lighthouse Score</strong>.
</p>
```

**Änderungen:**

- ✅ Region prominent genannt (Lauda-Königshofen, Main-Tauber-Kreis, Würzburg)
- ✅ Konkrete Zeitangabe (2-4 Wochen vs. 3-6 Monate Wettbewerb)
- ✅ Konkreter Preis (ab 2.500€)
- ✅ Social Proof (50+ Projekte, 95+ Score)
- ✅ USP deutlich hervorgehoben
- ✅ Strong-Tags für wichtige Keywords

### 1.4 Title-Tags optimieren

**Homepage Title optimieren:**

**Aktuell (app/layout.tsx):**

```typescript
title: 'Webentwicklung & Mobile Apps 4x schneller | KI-gestützte Digitalagentur'
```

**Optimiert:**

```typescript
title: 'Kreativagentur & Webentwicklung Lauda-Königshofen | 4x schneller durch KI | HEADON'
```

**Begründung:**

- Hauptkeyword "Kreativagentur" ganz vorne
- Lokaler Bezug "Lauda-Königshofen" früh
- USP "4x schneller durch KI" bleibt
- Brand "HEADON" am Ende

**Alternative für A/B-Test:**

```typescript
title: 'Full-Service Digitalagentur Main-Tauber-Kreis | Webentwicklung, Apps & Design | HEADON'
```

**Service-Page Titles:**

**Web Development:**

```typescript
title: 'Web Development Services | Next.js & React | 4x schneller | HEADON Lauda-Königshofen'
```

**Mobile Development:**

```typescript
title: 'Mobile App Entwicklung | iOS & Android | React Native & Flutter | HEADON'
```

**UI/UX Design:**

```typescript
title: 'UI/UX Design Agentur | User Experience & Interface Design | HEADON'
```

**Backend Solutions:**

```typescript
title: 'Backend Entwicklung & API Services | Supabase & PostgreSQL | HEADON'
```

### 1.5 Schema.org für Services erweitern

**Datei:** `components/seo/StructuredData.tsx` oder neu erstellen als `components/seo/ServiceSchema.tsx`

**Für jede Service-Page hinzufügen:**

```typescript
// components/seo/ServiceSchema.tsx
import { Service, WithContext } from 'schema-dts'

interface ServiceSchemaProps {
  name: string
  description: string
  price: {
    from: number
    currency: string
  }
  serviceType: string
  areaServed: string[]
}

export function ServiceSchema({ name, description, price, serviceType, areaServed }: ServiceSchemaProps) {
  const schema: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'HEADON.pro',
      url: 'https://headon.pro',
    },
    serviceType: serviceType,
    areaServed: areaServed.map(area => ({
      '@type': 'City',
      name: area,
    })),
    offers: {
      '@type': 'Offer',
      price: price.from.toString(),
      priceCurrency: price.currency,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: price.from,
        priceCurrency: price.currency,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**In jeder Service-Page einfügen:**

```typescript
// app/services/web-development/page.tsx
import { ServiceSchema } from '@/components/seo/ServiceSchema'

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceSchema
        name="Professionelle Webentwicklung"
        description="Hochwertige Web-Apps mit Next.js, React und TypeScript. Von der Konzeption bis zum Launch."
        price={{ from: 5000, currency: 'EUR' }}
        serviceType="Web Development"
        areaServed={[
          'Lauda-Königshofen',
          'Main-Tauber-Kreis',
          'Würzburg',
          'Tauberbischofsheim',
          'Bad Mergentheim',
          'Wertheim',
        ]}
      />
      {/* Rest of page */}
    </>
  )
}
```

---

## Phase 2: Content-Erweiterung (Woche 3-6)

**Zeitaufwand:** 20-30 Stunden
**Erwarteter Impact:** +150% Traffic (kumulativ)

### 2.1 Branchen-Landing-Pages erstellen

**Ordnerstruktur erstellen:**

```
app/
├── branchen/
│   ├── page.tsx (Übersichtsseite)
│   ├── weinbau-weingueter/
│   │   └── page.tsx
│   ├── handwerk-dienstleister/
│   │   └── page.tsx
│   ├── vereine-sportorganisationen/
│   │   └── page.tsx
│   ├── industrie-b2b/
│   │   └── page.tsx
│   ├── gastronomie-hotellerie/
│   │   └── page.tsx
│   └── startups-gruender/
│       └── page.tsx
```

### 2.1.1 Branchen-Übersichtsseite

**Datei:** `app/branchen/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Branchen & Spezialisierungen | HEADON Digitalagentur',
  description:
    'Maßgeschneiderte digitale Lösungen für Ihre Branche: Weinbau, Handwerk, Vereine, Industrie, Gastronomie & Startups. Langjährige Erfahrung in Main-Tauber-Kreis & Baden-Württemberg.',
  keywords:
    'Branchenlösungen Webentwicklung, Weingut Website, Vereinswebsite erstellen, Handwerker Homepage, B2B Portal Industrie, Restaurant Website, Startup MVP',
}
```

**Content:**

```tsx
// Übersichtsseite mit Cards für jede Branche
<section>
  <h1>Digitale Lösungen für Ihre Branche</h1>
  <p>
    Jede Branche hat spezifische Anforderungen an digitale Lösungen. Als Full-Service Digitalagentur
    aus Lauda-Königshofen entwickeln wir maßgeschneiderte Websites, Apps und Backend-Systeme, die
    perfekt zu Ihren branchenspezifischen Bedürfnissen passen.
  </p>

  <BranchenGrid>{/* Karten für jede Branche mit Link */}</BranchenGrid>
</section>
```

### 2.1.2 Weinbau & Weingüter Landing Page

**Datei:** `app/branchen/weinbau-weingueter/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Webentwicklung für Weingüter & Weinbau | HEADON Lauda-Königshofen',
  description:
    'Spezialisierte Website-Lösungen für Weingüter in Main-Tauber-Kreis: Online-Shops mit Altersverifikation, Weinabo-Systeme, Event-Buchungen. Bereits 10+ Weingüter vertrauen uns.',
  keywords:
    'Weingut Website erstellen, Online Weinshop, Weinbau Webdesign, Altersverifikation Wein, Weinabo System, Weingut Online Shop Main-Tauber-Kreis, Weinpräsentation Website',
}
```

**Content-Struktur:**

```markdown
# Webentwicklung für Weingüter in Main-Tauber-Kreis

## Die digitale Herausforderung im Weinbau

[Problem-Beschreibung: Direktvertrieb, Online-Konkurrenz, Altersverifikation]

## Unsere Lösung für Weingüter

[Features: Online-Shop, Altersverifikation, Weinabo, Event-Buchung]

## Features im Detail

### Online-Shop mit Weinpräsentation

- Hochwertige Produktgalerien
- Detaillierte Weinbeschreibungen (Rebsorte, Jahrgang, Geschmack)
- Bewertungssystem
- Geschenkboxen-Konfigurator

### Rechtskonforme Altersverifikation

- Integrierte Altersprüfung
- DSGVO-konform
- Nahtlose User Experience

### Weinabo & Mitgliedersysteme

- Flexible Abo-Modelle
- Automatische Zahlungsabwicklung
- Mitgliederbereiche mit exklusiven Angeboten

### Event-Management

- Buchungssystem für Weinproben
- Kellerführungen online buchen
- Automatische Bestätigungen

## Technologie-Stack für Weingüter

[Next.js, E-Commerce-Lösung, Payment-Integration]

## Preise & Pakete

- Basis-Website: ab 2.500€
- Online-Shop: ab 8.000€
- All-Inclusive mit Abo-System: ab 12.000€

## Erfolgsgeschichten

[Case Studies von Weingütern, falls vorhanden]

## Jetzt starten

[CTA: Kostenlose Beratung]
```

### 2.1.3 Handwerk & Dienstleister Landing Page

**Datei:** `app/branchen/handwerk-dienstleister/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Websites für Handwerksbetriebe & Dienstleister | HEADON Main-Tauber',
  description:
    'Professionelle Handwerker-Websites mit Online-Terminbuchung, Projekt-Galerie und Google Maps Integration. Local SEO für maximale Sichtbarkeit in Ihrer Region.',
  keywords:
    'Handwerker Website erstellen, Dienstleister Homepage, Online Terminbuchung Handwerk, Handwerksbetrieb Webdesign, Local SEO Handwerk, Referenzen Galerie, Google Maps Integration',
}
```

**Content:**

```markdown
# Websites für Handwerksbetriebe in Lauda-Königshofen & Umgebung

## Warum Handwerksbetriebe eine professionelle Website brauchen

- 73% der Kunden suchen online nach Handwerkern
- Erste Anlaufstelle für Referenzen und Bewertungen
- 24/7 Kontaktmöglichkeit und Terminbuchung

## Features für Handwerksbetriebe

### Online-Terminbuchung

- Verfügbarkeitskalender
- Automatische Bestätigungen
- SMS/E-Mail-Erinnerungen

### Leistungsübersicht mit Preistransparenz

- Strukturierte Dienstleistungen
- Optionale Preisangaben
- Kostenvoranschläge online anfordern

### Projekt-Galerie & Referenzen

- Before/After-Slider
- Kategorisierung nach Gewerken
- Kundenbewertungen

### Google Maps & Local SEO

- Eingebettete Karte mit Einzugsgebiet
- Google Business Profile Integration
- Local Schema Markup

## Branchen

- Elektriker
- Sanitär/Heizung
- Maler/Lackierer
- Schreiner/Tischler
- KFZ-Werkstätten
- Gebäudereinigung
- Garten- und Landschaftsbau

## Preise

- Basis-Website: ab 2.500€
- Mit Terminbuchung: ab 4.500€
- Full-Service inkl. SEO: ab 6.500€
```

### 2.1.4 Vereine & Sportorganisationen Landing Page

**Datei:** `app/branchen/vereine-sportorganisationen/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Vereinswebsites & Sportverein Homepages | HEADON Main-Tauber-Kreis',
  description:
    'Moderne Vereinswebsites mit Mitgliederverwaltung, Terminkalender, News und Online-Anmeldung. Bereits 15+ Vereine in Baden-Württemberg vertrauen uns. Ab 2.500€.',
  keywords:
    'Vereinswebsite erstellen, Sportverein Homepage, Mitgliederverwaltung online, Vereins CMS, Terminkalender Verein, Online Anmeldung Verein, Sportverein Website Main-Tauber',
}
```

**Content:**

```markdown
# Vereinswebsites für Sportvereine in Main-Tauber-Kreis

## Erfolgsgeschichte: SV Viktoria Wertheim

Von 53 auf 98 Lighthouse Score - Case Study anschauen

## Features für Vereine

### Mitgliederverwaltung

- Online-Beitrittserklärungen
- Mitgliederdatenbank
- Automatische E-Mail-Benachrichtigungen

### Terminkalender & Events

- Spielpläne
- Trainingstermine
- Veranstaltungen

### News & Berichte

- Blog-System für Spielberichte
- Bildergalerien
- Social Media Integration

### Sponsoren-Bereich

- Sponsoren-Logos prominent
- Individuelle Sponsoren-Seiten
- Klick-Statistiken

## Technische Vorteile

- Pflegeleicht: Keine technischen Kenntnisse nötig
- Schnell: 98 Lighthouse Score
- DSGVO-konform: Deutsche Datenschutz-Standards

## Preise für Vereine

- Basis-Website: ab 2.500€
- Mit Mitgliederverwaltung: ab 4.000€
- Sonderkonditionen für gemeinnützige Vereine

## Referenz

[Link zu SV Viktoria Wertheim Case Study]
```

### 2.1.5 Industrie & B2B Landing Page

**Datei:** `app/branchen/industrie-b2b/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'B2B Portale & Industrie Webentwicklung | HEADON Lauda-Königshofen',
  description:
    'Enterprise B2B-Lösungen für Industrieunternehmen: Kundenportale, Produktkonfiguratoren, ERP-Integration. Skalierbare Backend-Systeme für Main-Tauber-Kreis.',
  keywords:
    'B2B Portal Entwicklung, Industrie Website, Kundenportal B2B, Produktkonfigurator, ERP Integration, API Entwicklung, Enterprise Web App, B2B E-Commerce',
}
```

**Content:**

```markdown
# B2B-Portale für Industrieunternehmen

## Herausforderungen im B2B-Bereich

- Komplexe Preisstrukturen
- Kundenspezifische Rabatte
- Integration in bestehende ERP-Systeme
- Produktkonfiguration

## B2B-Features

### Kundenportale

- Individuelle Preise pro Kunde
- Bestellhistorie
- Rechnungsverwaltung
- Angebotserstellung

### Produktkonfiguratoren

- Komplexe Produkte online konfigurieren
- Automatische Kalkulation
- 3D-Visualisierung (optional)
- PDF-Export

### ERP/CRM-Integration

- Schnittstellen zu SAP, Microsoft Dynamics, etc.
- Automatische Datensynchronisation
- Webhook-basierte Updates

### API-Entwicklung

- RESTful APIs
- GraphQL
- Dokumentation
- API-Testing

## Technologie

- Next.js für performante Web-Apps
- PostgreSQL für große Datenmengen
- Redis für Caching
- Docker für Skalierbarkeit

## Preise

- B2B-Portal: ab 15.000€
- Mit ERP-Integration: ab 25.000€
- Enterprise-Lösungen: individuelle Preise
```

### 2.1.6 Gastronomie & Hotellerie Landing Page

**Datei:** `app/branchen/gastronomie-hotellerie/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Restaurant & Hotel Websites | Online-Reservierung | HEADON',
  description:
    'Appetitanregende Websites für Restaurants und Hotels: Online-Tischreservierung, Speisekarten, Zimmer-Buchungssystem. Mit Google Reservierungen kompatibel.',
  keywords:
    'Restaurant Website erstellen, Hotel Homepage, Online Tischreservierung, Speisekarte online, Hotel Buchungssystem, Gastronomie Webdesign, Hotelwebsite',
}
```

### 2.1.7 Startups & Gründer Landing Page

**Datei:** `app/branchen/startups-gruender/page.tsx`

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'MVP Entwicklung für Startups | Schnell & Günstig | HEADON',
  description:
    'Von der Idee zum MVP in 4 Wochen: Web-Apps, Landing Pages, Prototypen für Startups. Agile Entwicklung, transparente Preise. Perfekt für Pre-Seed & Seed-Phase.',
  keywords:
    'MVP Entwicklung, Startup Website, Minimum Viable Product, Schnelle Webentwicklung, Landing Page Startup, SaaS Entwicklung, Startup Agentur, Pre-Seed Entwicklung',
}
```

**Content:**

```markdown
# MVP-Entwicklung für Startups & Gründer

## Von der Idee zum Launch in 4 Wochen

### Warum HEADON für Ihr Startup?

- **Geschwindigkeit:** MVP in 4 Wochen statt 3-6 Monaten
- **Preis:** Transparente Festpreise ab 5.000€
- **Flexibilität:** Agile Entwicklung, schnelle Iterationen
- **Skalierbarkeit:** Code, der mit Ihnen wächst

## Startup-Pakete

### Landing Page (ab 2.500€)

- Responsive Design
- Lead-Capture-Forms
- Analytics-Integration
- A/B-Testing-Ready

### MVP Web-App (ab 8.000€)

- User Authentication
- Core Features (3-5)
- Admin Dashboard
- Deployment

### Full SaaS Platform (ab 15.000€)

- Subscription Management
- Payment Integration (Stripe)
- Multi-Tenancy
- API

## Technologie für Scale

- Next.js für beste Performance
- Supabase für schnelle Backend-Entwicklung
- TypeScript für weniger Bugs
- Tailwind CSS für schnelles Styling

## Erfolgsgeschichten

[Startup Case Studies, falls vorhanden]

## Startup-freundliche Zahlungsmodelle

- 50% bei Kickoff, 50% bei Launch
- Optional: Equity-Beteiligung möglich
```

### 2.2 FAQ-Seite erstellen

**Datei:** `app/faq/page.tsx`

**Warum separate FAQ-Page?**

- Bessere SEO-Sichtbarkeit
- Zentraler Ort für alle Fragen
- FAQ-Schema für Rich Snippets

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) | HEADON Digitalagentur',
  description:
    'Alle Antworten auf Ihre Fragen zu Webentwicklung, Preisen, Projektablauf und Technologie. Von Kosten über Dauer bis Support - alles transparent erklärt.',
  keywords:
    'Webentwicklung FAQ, Website Kosten, Projektdauer, Webdesign Preise, Agentur Fragen, Technologie Stack, Support, Wartung',
}
```

**Content-Kategorien:**

```markdown
# Häufig gestellte Fragen

## Allgemein

- Was macht HEADON anders als andere Agenturen?
- Wo ist HEADON ansässig?
- Für welche Branchen arbeitet HEADON?

## Preise & Kosten

- Was kostet eine Website?
- Was kostet eine Mobile App?
- Gibt es versteckte Kosten?
- Bieten Sie Ratenzahlung an?
- Was ist im Preis enthalten?

## Projektablauf

- Wie läuft ein Projekt ab?
- Wie lange dauert die Entwicklung?
- Kann ich während der Entwicklung Änderungen vornehmen?
- Wann kann ich die ersten Ergebnisse sehen?

## Technologie

- Welche Technologien nutzen Sie?
- Warum Next.js statt WordPress?
- Ist die Website später erweiterbar?
- Können Sie bestehende Websites modernisieren?

## Wartung & Support

- Was passiert nach dem Launch?
- Bieten Sie Wartungsverträge an?
- Kann ich die Website selbst pflegen?
- Wie schnell reagieren Sie bei Problemen?

## SEO & Marketing

- Ist SEO im Preis enthalten?
- Wie verbessern Sie mein Google-Ranking?
- Bieten Sie Online-Marketing an?

## Regional

- Arbeiten Sie nur in Main-Tauber-Kreis?
- Kommen Sie für Meetings vor Ort?
- Welche Regionen bedienen Sie?
```

**FAQ Schema implementieren:**

```typescript
// components/seo/FAQSchema.tsx
import { FAQPage, WithContext } from 'schema-dts'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 2.3 Portfolio Featured auf Homepage

**Datei:** `components/sections/FeaturedPortfolio.tsx` (neu)

**Wo einfügen:** Nach `ProblemSolutionSection` in `app/page.tsx`

```tsx
// components/sections/FeaturedPortfolio.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface PortfolioProject {
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  metrics: {
    label: string
    value: string
  }[]
}

interface FeaturedPortfolioProps {
  projects: PortfolioProject[]
}

export default function FeaturedPortfolio({ projects }: FeaturedPortfolioProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary mb-4 text-4xl font-bold md:text-5xl">
            Erfolgreiche Projekte aus der Region
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Vom lokalen Sportverein bis zum etablierten Weingut – entdecken Sie, wie wir Unternehmen
            in Main-Tauber-Kreis digital transformieren.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  {/* Project Card Content */}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/portfolio">
            <Button size="lg" variant="outline">
              Alle Projekte ansehen →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**In Homepage einbinden:**

```tsx
// app/page.tsx
import FeaturedPortfolio from '@/components/sections/FeaturedPortfolio'
import { getAllPortfolioProjects } from '@/lib/content/content-api'

export default async function Home() {
  // Fetch featured projects
  const allProjects = await getAllPortfolioProjects()
  const featuredProjects = allProjects.slice(0, 3) // Top 3

  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturedPortfolio projects={featuredProjects} />
      {/* Rest... */}
    </>
  )
}
```

### 2.4 Blog-Featured auf Homepage

**Datei:** `components/sections/FeaturedBlog.tsx` (neu)

Ähnlich wie FeaturedPortfolio, aber für Blog-Posts.

---

## Phase 3: Technische Optimierung (Woche 7-8)

**Zeitaufwand:** 8-12 Stunden
**Erwarteter Impact:** +20% Traffic (kumulativ +250%)

### 3.1 Breadcrumbs implementieren

**Warum wichtig?**

- Verbessert User Experience
- Google nutzt Breadcrumbs in SERPs
- Interne Verlinkung

**Datei:** `components/ui/Breadcrumbs.tsx` (neu)

```tsx
// components/ui/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        href: currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 px-4 py-4">
      <ol className="container mx-auto flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />}
              {index === 0 && <Home className="mr-2 h-4 w-4 text-gray-400" />}
              {isLast ? (
                <span className="font-medium text-gray-600">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-primary hover:text-primary-700 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

**Breadcrumb Schema hinzufügen:**

```tsx
// components/seo/BreadcrumbSchema.tsx
import { BreadcrumbList, WithContext } from 'schema-dts'

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://headon.pro${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**In Layout einfügen:**

```tsx
// app/layout.tsx
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <Breadcrumbs />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### 3.2 Related Services Komponente

**Datei:** `components/sections/RelatedServices.tsx` (neu)

```tsx
// components/sections/RelatedServices.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface RelatedService {
  title: string
  slug: string
  description: string
  icon: React.ComponentType
}

interface RelatedServicesProps {
  services: RelatedService[]
  currentSlug: string
}

export default function RelatedServices({ services, currentSlug }: RelatedServicesProps) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 3)

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Passende Services</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {related.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
            >
              <service.icon className="text-primary mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <span className="text-primary font-semibold">Mehr erfahren →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**In jede Service-Page einfügen:**

```tsx
// app/services/web-development/page.tsx
import RelatedServices from '@/components/sections/RelatedServices'
import { getAllServicePages } from '@/lib/content/content-api'

export default async function WebDevelopmentPage() {
  const allServices = await getAllServicePages()

  return (
    <>
      {/* Service Content */}
      <RelatedServices services={allServices} currentSlug="web-development" />
    </>
  )
}
```

### 3.3 Local Business Schema für Stadt-Seiten

**Datei:** `components/seo/LocalBusinessSchema.tsx` (falls noch nicht vorhanden)

```tsx
// components/seo/LocalBusinessSchema.tsx
import { LocalBusiness, WithContext } from 'schema-dts'

interface LocalBusinessSchemaProps {
  city: string
  region: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function LocalBusinessSchema({ city, region, coordinates }: LocalBusinessSchemaProps) {
  const schema: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `HEADON.pro - Digitalagentur ${city}`,
    description: `Webentwicklung, App-Development und Design Services in ${city}, ${region}`,
    url: `https://headon.pro/regionen/${city.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')}`,
    telephone: '+49-xxx-xxxxxxx', // Ihre Telefonnummer
    email: 'info@headon.pro',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: region,
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    areaServed: {
      '@type': 'City',
      name: city,
    },
    priceRange: '€€-€€€',
    openingHours: 'Mo-Fr 09:00-18:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**In Stadt-Pages einfügen:**

```tsx
// app/regionen/[city]/page.tsx
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'

export default async function CityPage({ params }: { params: { city: string } }) {
  const cityData = await getCityPage(params.city)

  return (
    <>
      <LocalBusinessSchema
        city={cityData.frontmatter.name}
        region={cityData.frontmatter.state}
        coordinates={cityData.frontmatter.coordinates}
      />
      {/* Rest of page */}
    </>
  )
}
```

### 3.4 FAQ Schema für Service-Pages

**In Service MDX-Files einfügen:**

```typescript
// In jeder Service-Page, die FAQ-Schema noch nicht hat
import { FAQSchema } from '@/components/seo/FAQSchema'

export default function ServicePage({ frontmatter }: ServiceContentResult) {
  return (
    <>
      <FAQSchema faqs={frontmatter.faqs} />
      {/* Service content */}
    </>
  )
}
```

### 3.5 Interne Verlinkung verbessern

**Automatische interne Links in Blog-Posts:**

**Datei:** `lib/content/internal-linking.ts` (neu)

```typescript
// lib/content/internal-linking.ts

interface InternalLink {
  keyword: string
  url: string
  context?: string // Optional: nur in bestimmten Kontexten verlinken
}

export const internalLinks: InternalLink[] = [
  // Service Links
  { keyword: 'Webentwicklung', url: '/services/web-development' },
  { keyword: 'Web Development', url: '/services/web-development' },
  { keyword: 'Mobile App Entwicklung', url: '/services/mobile-development' },
  { keyword: 'UI/UX Design', url: '/services/ui-ux-design' },
  { keyword: 'Backend Entwicklung', url: '/services/backend-solutions' },

  // Branchen Links
  { keyword: 'Weingut', url: '/branchen/weinbau-weingueter' },
  { keyword: 'Handwerksbetrieb', url: '/branchen/handwerk-dienstleister' },
  { keyword: 'Sportverein', url: '/branchen/vereine-sportorganisationen' },
  { keyword: 'Startup', url: '/branchen/startups-gruender' },

  // Regionale Links
  { keyword: 'Lauda-Königshofen', url: '/regionen/lauda-koenigshofen' },
  { keyword: 'Main-Tauber-Kreis', url: '/regionen' },
  { keyword: 'Würzburg', url: '/regionen/wuerzburg' },

  // Portfolio
  { keyword: 'SV Viktoria Wertheim', url: '/portfolio/sv-viktoria-wertheim-website' },
]

/**
 * Adds internal links to content
 * Only links first occurrence of each keyword
 */
export function addInternalLinks(content: string): string {
  let modifiedContent = content
  const linkedKeywords = new Set<string>()

  internalLinks.forEach(({ keyword, url }) => {
    if (linkedKeywords.has(keyword)) return

    // Create regex that matches keyword but not inside existing links
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${keyword})\\b(?![^<]*<\\/a>)`, 'i')

    if (regex.test(modifiedContent)) {
      modifiedContent = modifiedContent.replace(
        regex,
        `<a href="${url}" class="text-primary hover:text-primary-700 underline">$1</a>`
      )
      linkedKeywords.add(keyword)
    }
  })

  return modifiedContent
}
```

**In MDX-Compiler einbauen (optional):**

```typescript
// lib/content/mdx-compiler.ts
import { addInternalLinks } from './internal-linking'

// Im compile-Prozess:
const compiledContent = await compile(source, {
  // ... existing options
})

// Nach dem Compile:
const htmlWithLinks = addInternalLinks(compiledContent.toString())
```

---

## Phase 4: Off-Page & Monitoring (Laufend)

**Zeitaufwand:** 2-3 Stunden/Woche
**Erwarteter Impact:** Langfristig +50% Traffic

### 4.1 Google Business Profile optimieren

**Checklist:**

- [ ] Vollständiges Profil (Name, Adresse, Telefon, Website)
- [ ] Kategorie: "Digitalagentur", "Webdesign-Agentur", "Marketingagentur"
- [ ] Öffnungszeiten aktualisieren
- [ ] Hochwertige Fotos (Office, Team, Projekte)
- [ ] Leistungen hinzufügen (Web Development, App Development, etc.)
- [ ] Google Posts regelmäßig veröffentlichen (1x/Woche)
- [ ] Kundenbewertungen anfordern (nach jedem Projekt)
- [ ] Auf Bewertungen antworten (24h Response-Zeit)
- [ ] Fragen & Antworten pflegen

**Google Posts-Ideen:**

- Neue Blog-Posts ankündigen
- Portfolio-Projekte highlighten
- Technologie-Updates (z.B. "Jetzt mit Next.js 15")
- Angebote/Aktionen
- Event-Teilnahmen

### 4.2 Lokale Verzeichnisse

**Eintragen in:**

- [ ] 11880.com
- [ ] DasÖrtliche.de
- [ ] Gelbe Seiten (gelbeseiten.de)
- [ ] Yelp Deutschland
- [ ] Wer liefert was (wlw.de) - für B2B
- [ ] Cylex Deutschland
- [ ] GoLocal
- [ ] Bing Places

**Wichtig:** NAP (Name, Address, Phone) konsistent halten!

### 4.3 Backlink-Strategie

**Lokale Backlinks:**

- [ ] IHK Würzburg (Mitgliedschaft)
- [ ] Handwerkskammer Baden-Württemberg
- [ ] Lokale Wirtschaftsförderung Main-Tauber-Kreis
- [ ] Stadtwebsites (Unternehmensverzeichnis)
- [ ] Lokale Zeitungen (Pressemitteilungen)

**Branchenverzeichnisse:**

- [ ] iBusiness (ibusiness.de/agenturverzeichnis)
- [ ] Designerdock
- [ ] Sortlist (sortlist.de)
- [ ] Agenturfinder (agenturfinder.com)
- [ ] Clutch.co

**Partner-Backlinks:**

- [ ] Von zufriedenen Kunden (Website-Footer-Link)
- [ ] Von Portfolio-Projekten (gegenseitige Verlinkung)
- [ ] Von Vereinen (z.B. SV Viktoria Wertheim)

**Content-Backlinks:**

- [ ] Gastbeiträge auf Branchen-Blogs
- [ ] Interviews in Web-Development-Podcasts
- [ ] Zitate in Fachartikeln

### 4.4 Google Search Console einrichten

**Setup:**

```bash
1. Domain-Property in Google Search Console hinzufügen
2. DNS-Verifizierung durchführen
3. Sitemap einreichen: https://headon.pro/sitemap.xml
4. URL-Inspektion für wichtige Seiten
```

**Wöchentliches Monitoring:**

- [ ] Performance-Report (Klicks, Impressionen, CTR)
- [ ] Coverage-Report (Indexierungsfehler)
- [ ] Core Web Vitals
- [ ] Mobile Usability

**Monatliches Reporting:**

- [ ] Top-Keywords tracken
- [ ] Ranking-Veränderungen analysieren
- [ ] Neue Keywords identifizieren
- [ ] Suchintention optimieren

### 4.5 Analytics & Tracking

**Tools:**

- [ ] Umami Analytics (bereits implementiert)
- [ ] Google Search Console (SEO)
- [ ] Hotjar oder Microsoft Clarity (Heatmaps, optional)

**KPIs definieren:**

- Organischer Traffic
- Conversion Rate (Kontaktanfragen)
- Bounce Rate
- Top-Landing-Pages
- Top-Keywords
- Lokale Searches

---

## Keyword-Strategie

### Primäre Keywords (Top 5)

| Keyword                          | Suchvolumen/Monat | Wettbewerb | Aktuelles Ranking | Ziel-Ranking |
| -------------------------------- | ----------------- | ---------- | ----------------- | ------------ |
| Kreativagentur Lauda-Königshofen | 10-50             | Niedrig    | Nicht rankend     | Top 3        |
| Webentwicklung Main-Tauber-Kreis | 50-100            | Mittel     | 15-20             | Top 5        |
| Digitalagentur Baden-Württemberg | 100-200           | Hoch       | Nicht rankend     | Top 10       |
| Website erstellen lassen Lauda   | 10-30             | Niedrig    | Nicht rankend     | Top 3        |
| App Entwicklung Würzburg         | 20-50             | Mittel     | Nicht rankend     | Top 5        |

### Sekundäre Keywords (Top 10)

| Keyword                       | Ziel-Seite         | Priorität |
| ----------------------------- | ------------------ | --------- |
| schnelle Webentwicklung       | Homepage           | Hoch      |
| KI gestützte Webentwicklung   | Homepage           | Hoch      |
| Webdesign Agentur Main-Tauber | Services/Web       | Hoch      |
| Online Shop erstellen         | Services/Web       | Mittel    |
| Corporate Design Agentur      | Branchen/Allgemein | Mittel    |
| Vereinswebsite erstellen      | Branchen/Vereine   | Hoch      |
| Weingut Website               | Branchen/Weinbau   | Hoch      |
| B2B Portal Entwicklung        | Branchen/Industrie | Mittel    |
| MVP Entwicklung Startup       | Branchen/Startups  | Mittel    |
| Handwerker Homepage           | Branchen/Handwerk  | Mittel    |

### Long-Tail-Keywords (Top 20)

Für Stadt-Seiten und Service-Kombinationen:

- "Webdesigner Lauda-Königshofen gesucht"
- "Wie viel kostet Website Lauda-Königshofen"
- "Beste Webdesign Agentur Main-Tauber"
- "Schnelle Website Entwicklung Baden-Württemberg"
- "Webdesign Festpreis transparent"
- "Website in 4 Wochen erstellen"
- "KI Website Generator Deutschland"
- "Responsive Webdesign Agentur"
- "SEO Optimierung Main-Tauber-Kreis"
- "Online Marketing Agentur Würzburg"

---

## Messbare Ziele

### Woche 2 (Nach Phase 1)

- [ ] Alle Meta-Descriptions optimiert (13 Seiten)
- [ ] Keywords erweitert auf 50+
- [ ] Homepage Hero-Text mit konkreten Zahlen
- [ ] Google Search Console eingerichtet
- **KPI:** +30% organischer Traffic vs. Baseline

### Woche 6 (Nach Phase 2)

- [ ] 6 Branchen-Landing-Pages live
- [ ] FAQ-Seite mit 20+ Fragen live
- [ ] Portfolio Featured auf Homepage
- [ ] 10+ neue Blog-Posts veröffentlicht (optional)
- **KPI:** +150% organischer Traffic vs. Baseline
- **KPI:** Rankings für 10+ neue Keywords

### Woche 8 (Nach Phase 3)

- [ ] Breadcrumbs auf allen Seiten
- [ ] Related Services auf allen Service-Pages
- [ ] Local Business Schema auf allen Stadt-Seiten
- [ ] FAQ Schema auf allen Service-Pages
- **KPI:** +250% organischer Traffic vs. Baseline
- **KPI:** Top 3 Rankings für 3+ lokale Keywords
- **KPI:** Top 10 Rankings für 10+ Keywords

### Monat 3 (Nach Phase 4)

- [ ] Google Business Profile vollständig optimiert
- [ ] 10+ Backlinks von relevanten Seiten
- [ ] 5+ positive Google Bewertungen
- [ ] Wöchentliche Google Posts
- **KPI:** 5-10 qualifizierte Anfragen/Monat aus organischer Suche
- **KPI:** +300% organischer Traffic vs. Baseline

---

## Checklisten

### Phase 1 Checklist (Woche 1-2)

#### Meta-Descriptions

- [ ] `app/layout.tsx`
- [ ] `app/page.tsx`
- [ ] `app/services/page.tsx`
- [ ] `app/services/web-development/page.tsx`
- [ ] `app/services/mobile-development/page.tsx`
- [ ] `app/services/ui-ux-design/page.tsx`
- [ ] `app/services/backend-solutions/page.tsx`
- [ ] `app/about/page.tsx`
- [ ] `app/portfolio/page.tsx`
- [ ] `app/blog/page.tsx`
- [ ] `app/contact/page.tsx`
- [ ] `app/regionen/page.tsx`
- [ ] Alle `app/regionen/[city]/page.tsx` (6 Städte)

#### Keywords erweitern

- [ ] Homepage Keywords (+20 neue)
- [ ] Service-Page Keywords (individuell)
- [ ] Stadt-Seiten Keywords (+10 Long-Tail pro Stadt)

#### Content-Optimierung

- [ ] Hero-Section Text mit Zahlen/Fakten
- [ ] Title-Tags überarbeiten (Homepage + 4 Services)
- [ ] Schema.org für Services implementieren

#### Monitoring

- [ ] Google Search Console einrichten
- [ ] Baseline-Tracking starten (Traffic, Rankings)

### Phase 2 Checklist (Woche 3-6)

#### Branchen-Landing-Pages

- [ ] Ordnerstruktur erstellen (`app/branchen/`)
- [ ] Übersichtsseite (`page.tsx`)
- [ ] Weinbau & Weingüter Page
- [ ] Handwerk & Dienstleister Page
- [ ] Vereine & Sportorganisationen Page
- [ ] Industrie & B2B Page
- [ ] Gastronomie & Hotellerie Page
- [ ] Startups & Gründer Page

#### Content-Ergänzungen

- [ ] FAQ-Seite (`app/faq/page.tsx`)
- [ ] FAQ Schema implementieren
- [ ] Featured Portfolio Komponente
- [ ] Featured Blog Komponente (optional)
- [ ] Portfolio Featured auf Homepage einbinden

### Phase 3 Checklist (Woche 7-8)

#### Technische Komponenten

- [ ] Breadcrumbs Komponente (`components/ui/Breadcrumbs.tsx`)
- [ ] Breadcrumb Schema (`components/seo/BreadcrumbSchema.tsx`)
- [ ] Related Services Komponente
- [ ] Local Business Schema Komponente
- [ ] FAQ Schema Komponente (falls noch nicht)

#### Integration

- [ ] Breadcrumbs in Layout einfügen
- [ ] Related Services auf allen Service-Pages
- [ ] Local Business Schema auf allen Stadt-Seiten
- [ ] FAQ Schema auf allen Service-Pages mit FAQs

#### Interne Verlinkung

- [ ] Internal Linking Utility (`lib/content/internal-linking.ts`)
- [ ] Service-zu-Service Links
- [ ] Branchen-zu-Service Links
- [ ] Blog-zu-Service Links

### Phase 4 Checklist (Laufend)

#### Google Business Profile

- [ ] Profil vervollständigen
- [ ] Fotos hochladen (10+)
- [ ] Leistungen hinzufügen
- [ ] Erste Google Posts (4 Stück)
- [ ] Bewertungen anfordern (nach jedem Projekt)

#### Verzeichnisse

- [ ] 11880.com
- [ ] DasÖrtliche.de
- [ ] Gelbe Seiten
- [ ] Yelp Deutschland
- [ ] Wer liefert was (B2B)
- [ ] Cylex Deutschland
- [ ] GoLocal
- [ ] Bing Places

#### Backlinks

- [ ] IHK-Mitgliedschaft Eintrag
- [ ] Handwerkskammer Eintrag
- [ ] Lokale Wirtschaftsförderung
- [ ] 3 Stadtwebsite-Einträge
- [ ] 2 Branchenverzeichnisse
- [ ] 3 Partner-Backlinks

#### Monitoring & Reporting

- [ ] Wöchentliches GSC-Reporting Setup
- [ ] Monatliches Ranking-Tracking
- [ ] KPI-Dashboard erstellen
- [ ] Umami Analytics-Ziele definieren

---

## Anhang

### Nützliche Tools

**SEO-Tools:**

- Google Search Console (kostenlos)
- Google Keyword Planner (kostenlos)
- Ubersuggest (Freemium)
- AnswerThePublic (Freemium)
- SEO-Browser-Extensions (SEOquake, MozBar)

**Technical SEO:**

- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- Schema.org Validator
- Google Rich Results Test
- Mobile-Friendly Test

**Monitoring:**

- Google Search Console
- Umami Analytics (selbst gehostet)
- Google Business Profile Insights

### Kontakte & Support

**Bei Fragen:**

- SEO-Strategie: [Name]
- Technische Umsetzung: [Name]
- Content-Erstellung: [Name]

**Wichtige Links:**

- Google Search Console: https://search.google.com/search-console
- Google Business Profile: https://business.google.com
- Schema.org Docs: https://schema.org
- Next.js SEO Docs: https://nextjs.org/docs/app/building-your-application/optimizing

---

## Versionshistorie

- **v1.0** (26.10.2025): Initiale Version nach umfassender SEO-Analyse
- **v1.1** (TBD): Updates nach Phase 1
- **v1.2** (TBD): Updates nach Phase 2

---

**Erstellt von:** Claude Code
**Projekt:** HEADON.pro SEO-Optimierung
**Zeitraum:** 8 Wochen
**Erwartetes Ergebnis:** +250% organischer Traffic, 20+ neue Keyword-Rankings
