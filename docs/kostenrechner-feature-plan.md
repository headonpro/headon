# Feature-Plan: Kostenrechner für Webseiten & Apps

**Erstellt:** 2025-11-20
**Status:** 🟡 Planning
**Priorität:** High
**Lead-Gen Potenzial:** ⭐⭐⭐⭐⭐

---

## 📋 Übersicht

### Ziel
Interaktiver Kostenrechner für potenzielle Kunden zur Schätzung von Projekt-Kosten mit integriertem **3-Wege-Vergleich** (Freelancer vs. Traditionelle Agentur vs. HEADON).

### Kernwert
- **Transparenz:** Klare Preisvorstellungen ohne Vertriebsgespräch
- **Lead Generation:** Qualifizierte Leads durch optionale Kontaktdaten-Erfassung
- **Competitive Positioning:** HEADON als optimale Balance (schneller + günstiger + qualitativ hochwertig)
- **SEO:** Ranking für "Website Kosten Rechner", "App Entwicklung Preis", etc.

### Erfolgsmetriken
- **Conversion Rate:** >15% der Nutzer hinterlassen Kontaktdaten
- **Engagement:** >60% Completion Rate (Step 1 → Step 6)
- **Lead Quality:** Durchschnittlicher Lead Score >20 Punkte
- **Traffic:** 500+ monatliche Nutzer nach 3 Monaten

---

## 🎯 User Stories

### Primary User Story
> Als potentieller Kunde möchte ich **in unter 3 Minuten** eine realistische Kostenschätzung für mein Projekt erhalten, ohne mit einem Vertriebler sprechen zu müssen.

### Secondary User Stories
1. Als Vergleichssuchender möchte ich verstehen, **warum HEADON die beste Wahl** ist
2. Als Budget-Bewusster möchte ich sehen, **wo mein Geld hingeht** (Preis-Breakdown)
3. Als Eiliger möchte ich die **Timeline-Schätzung** sehen, nicht nur Kosten
4. Als Informationssammler möchte ich mein **Ergebnis teilen/speichern** können

---

## 🏗️ Architektur-Übersicht

### URL-Struktur
```
/kostenrechner
├── Step 1-5: Calculator Flow
└── Step 6: Results mit 3-Way Comparison
```

### Datei-Struktur
```
app/kostenrechner/
├── page.tsx                    # Server Component (Entry Point)
├── metadata.ts                 # SEO Metadata
└── CostCalculator.tsx          # Client Component (Main)

components/calculator/
├── CostCalculator.tsx          # Main Container mit State
├── CalculatorProgress.tsx      # Progress Bar (1/6, 2/6, ...)
├── PricePreview.tsx            # Sticky Sidebar (Live Preview)
│
├── steps/
│   ├── StepProjectType.tsx     # Step 1: Website/App/E-Commerce
│   ├── StepDesignScope.tsx     # Step 2: Design Level + Umfang
│   ├── StepFeatures.tsx        # Step 3: CMS, Auth, Payment, etc.
│   ├── StepQuality.tsx         # Step 4: SEO, Performance, Security
│   └── StepTimeline.tsx        # Step 5: Timeline, Support, Hosting
│
├── results/
│   ├── ComparisonGrid.tsx      # 3-Column Layout (Desktop) / Tabs (Mobile)
│   ├── ComparisonCard.tsx      # Single Provider Card
│   ├── SavingsHighlight.tsx    # "Sie sparen 9.500€ mit HEADON"
│   ├── PriceBreakdown.tsx      # Detaillierte Aufschlüsselung
│   └── LeadCaptureDialog.tsx   # Optional: Kontaktdaten erfassen
│
└── shared/
    ├── ProjectTypeCard.tsx     # Icon Card für Projekttyp
    ├── FeatureCheckbox.tsx     # Checkbox mit Preis-Badge
    ├── RangeSlider.tsx         # Custom Range Input
    └── PriceCounter.tsx        # Animated Number Counter

lib/calculator/
├── types.ts                    # TypeScript Interfaces
├── pricing-config.ts           # Preis-Definitionen & Faktoren
├── calculator-engine.ts        # Berechnungs-Logik (3 Provider)
└── validation-schemas.ts       # Zod Schemas

app/api/calculator/
└── route.ts                    # POST: Lead speichern + Email

lib/email-templates.ts
└── + createCalculatorResultEmail()

Supabase Tables:
├── calculator_leads            # Gespeicherte Leads
└── calculator_sessions         # (Optional) Anonyme Sessions
```

---

## 🎨 UI/UX Design

### Layout (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│  Hero: "Was kostet Ihre Webseite? In 2 Min herausfinden"   │
│  Trust: "500+ Projekte • ⌀4.9★ • 100% Transparenz"         │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────────────┬─────────────────────────────┐
│  STEPS (60%)                  │  PRICE PREVIEW (40%)        │
│                               │                             │
│  ┌─────────────────────────┐  │  ┌───────────────────────┐ │
│  │ Progress: ━━━━○○○ (3/6)│  │  │ Geschätzte Kosten     │ │
│  └─────────────────────────┘  │  │                       │ │
│                               │  │ 12.500€ - 18.000€     │ │
│  ┌─────────────────────────┐  │  │ ⏱ 6-8 Wochen          │ │
│  │  STEP CONTENT           │  │  │                       │ │
│  │                         │  │  │ Aufschlüsselung:      │ │
│  │  [Cards/Inputs/Checks]  │  │  │ • Basis:     5.000€   │ │
│  │                         │  │  │ • Design:   +3.000€   │ │
│  │                         │  │  │ • Features: +4.500€   │ │
│  └─────────────────────────┘  │  └───────────────────────┘ │
│                               │         (Sticky)            │
│  [← Zurück]        [Weiter →] │                            │
└───────────────────────────────┴─────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  RESULTS (Step 6): 3-Way Comparison                         │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │
│  │ Freelancer   │ │ Traditionelle│ │ HEADON ⭐          │  │
│  │              │ │   Agentur    │ │ BESTE WAHL         │  │
│  ├──────────────┤ ├──────────────┤ ├────────────────────┤  │
│  │ 7.500€       │ │ 24.000€      │ │ 14.500€            │  │
│  │ 12-16 Wo.    │ │ 16-20 Wo.    │ │ 6-8 Wochen         │  │
│  │ ⭐⭐⭐        │ │ ⭐⭐⭐⭐⭐      │ │ ⭐⭐⭐⭐⭐           │  │
│  │              │ │              │ │                    │  │
│  │ ✅ Günstig   │ │ ✅ Full-Svc  │ │ ✅ Modern Stack    │  │
│  │ ⚠️ Langsam   │ │ ⚠️ Teuer     │ │ ✅ 2x Schneller    │  │
│  │ ❌ Support   │ │ ⚠️ Overhead  │ │ ✅ 40% Günstiger   │  │
│  └──────────────┘ └──────────────┘ └────────────────────┘  │
│                                                             │
│  💰 Sie sparen mit HEADON: 9.500€ & 10 Wochen              │
│                                                             │
│  [📧 Detailliertes Angebot anfordern] [🔗 Ergebnis teilen] │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Anpassungen

**Mobile (<768px):**
- Stacked Layout (Steps on Top, Preview on Bottom)
- Tabs statt Grid für Comparison (swipeable)
- Simplified Inputs (weniger Sub-Optionen sichtbar)

**Tablet (768-1024px):**
- 2-Column Layout (Steps 65% / Preview 35%)
- 2-Column Comparison Grid (Freelancer+Agency / HEADON full width below)

---

## 🔧 Technologie-Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **API Routes:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend API
- **Validation:** Zod Schemas

### Benötigte shadcn/ui Komponenten

**Bereits vorhanden:**
- ✅ Button, Card, Input, Label, Select, Textarea
- ✅ Badge, Dialog, Accordion, Tabs
- ✅ Table (für Breakdown)

**Hinzuzufügen:**
```bash
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add radio-group
pnpm dlx shadcn@latest add slider
pnpm dlx shadcn@latest add progress
pnpm dlx shadcn@latest add switch
pnpm dlx shadcn@latest add tooltip
```

---

## 📊 Calculator Flow

### Step 1: Projekttyp
**Ziel:** Basis-Kategorie festlegen

**Input:**
- Radio Cards (4-6 Optionen)
  - 🌐 Website (Corporate, Portfolio, Landingpage)
  - 💻 Web-Applikation (SaaS, Dashboard, Tool)
  - 📱 Mobile App (iOS, Android, Cross-Platform)
  - 🛒 E-Commerce (Shop, Marktplatz)
  - 🎨 Custom Solution
  - ❓ Noch unsicher

**Basis-Preise:**
- Website: 2.500€ - 8.000€
- Web-App: 10.000€ - 50.000€
- Mobile App: 15.000€ - 80.000€
- E-Commerce: 8.000€ - 40.000€

---

### Step 2: Design & Umfang
**Ziel:** Design-Qualität und Projekt-Größe

**Input:**
1. **Design Level** (Radio Cards)
   - Template-basiert (1.0x)
   - Custom Design (1.5x)
   - Premium Custom Design (2.0x)

2. **Umfang** (Range Slider mit Visual)
   - 1-5 Seiten/Screens
   - 6-15 Seiten/Screens
   - 16-30 Seiten/Screens
   - 30+ Seiten/Screens
   - *Preis: +200-800€ pro Seite*

3. **Responsiveness** (Select)
   - Desktop only (1.0x)
   - Desktop + Mobile (1.3x)
   - Progressive Web App (1.6x)

4. **UX Komplexität** (Radio Group)
   - Standard (+0€)
   - Erweitert (+2.000€)
   - Premium (+5.000€)

---

### Step 3: Funktionalitäten
**Ziel:** Feature-Set definieren

**Input:** Checkbox Grid mit Conditional Sub-Options

**Core Features:**
- ☐ Content Management System (CMS) [+1.500€ - 3.500€]
  - → Welches? (Strapi/Sanity/Custom)
- ☐ User Authentication & Accounts [+2.000€ - 4.000€]
  - → Social Login? 2FA?
- ☐ Datenbank-Integration [+1.000€ - 5.000€]
  - → Simple/Complex?
- ☐ Payment-Integration [+2.500€ - 5.000€]
  - → Stripe/PayPal/Mollie?
- ☐ API-Entwicklung [+3.000€ - 8.000€]
  - → REST/GraphQL?
- ☐ Drittanbieter-Integrationen [+500€ pro Integration]
  - → Anzahl?
- ☐ File Uploads & Storage [+1.500€]
- ☐ Mehrsprachigkeit (i18n) [+2.000€ - 4.000€]
  - → Anzahl Sprachen?
- ☐ Admin-Dashboard [+3.000€ - 7.000€]
- ☐ Real-time Features (WebSockets) [+3.500€ - 6.000€]

---

### Step 4: Qualität & Performance
**Ziel:** Nicht-funktionale Anforderungen

**Input:** Accordion mit Radio/Select pro Kategorie

**Kategorien:**
1. **SEO-Optimierung** (Accordion)
   - None (+0€)
   - Basic (+1.000€): Meta, Sitemap, Robots
   - Advanced (+2.500€): Schema.org, Performance, Analytics
   - Enterprise (+5.000€): Technical SEO Audit, Ongoing

2. **Performance-Optimierung** (Accordion)
   - Standard (+0€)
   - Optimized (+1.500€): Image Optimization, Code Splitting
   - Premium (+3.500€): CDN, Edge Functions, Performance Budget

3. **Security** (Accordion)
   - SSL Only (+0€)
   - Advanced (+1.500€): Security Headers, Input Validation
   - Penetration Testing (+3.500€)

4. **DSGVO-Compliance** (Checkbox)
   - ☐ Ja (+800€): Cookie Consent, Privacy Policy, Data Export

5. **Testing** (Accordion)
   - None (+0€)
   - Unit Tests (+1.500€)
   - E2E Tests (+2.500€)
   - QA-Prozess (+4.000€)

6. **Accessibility** (Accordion)
   - None (+0€)
   - WCAG AA (+1.200€)
   - WCAG AAA (+2.500€)

---

### Step 5: Timeline & Support
**Ziel:** Projektrahmen festlegen

**Input:**
1. **Projektstart** (Radio Cards)
   - Flexibel (1.0x)
   - Normal (1-2 Monate) (1.0x)
   - Urgent (Sofort) (1.3x Aufpreis)

2. **Wartung & Updates** (Radio Cards)
   - Keine (+0€)
   - Basic (+150€/Monat): Updates, Minor Fixes
   - Premium (+350€/Monat): Updates, Features, Priority Support

3. **Support-Paket** (Select)
   - Kein Support (+0€)
   - 3 Monate (+500€)
   - 6 Monate (+900€)
   - 12 Monate (+1.500€)

4. **Hosting** (Toggle)
   - Selbst verwaltet (+0€)
   - Managed Hosting (+50€/Monat)

5. **Training & Dokumentation** (Checkbox)
   - ☐ Ja (+800€): Video-Tutorials, Dokumentation, Workshop

---

### Step 6: Ergebnis & Vergleich
**Ziel:** 3-Way Comparison präsentieren + Lead Capture

**Anzeige:**
1. **Hero Section:** "Ihr Projekt: [Titel basierend auf Auswahl]"
2. **3-Column Comparison Grid** (oder Tabs auf Mobile)
3. **Savings Highlight:** "💰 Sie sparen mit HEADON: X€ & Y Wochen"
4. **Detailed Breakdown:** Expandable Accordion mit Kategorien
5. **Share Button:** URL mit Query Params (state-save)
6. **Lead Capture CTA:** Optional, Dialog-based

**Lead Capture Dialog:**
```tsx
<Dialog>
  <DialogTrigger>
    <Button>📧 Detailliertes Angebot per E-Mail</Button>
  </DialogTrigger>
  <DialogContent>
    <Form>
      <Input name="name" required />
      <Input name="email" type="email" required />
      <Input name="phone" optional />
      <Textarea name="message" placeholder="Zusätzliche Infos..." />
      <Select name="preferredProvider">
        <option>Freelancer</option>
        <option>Agentur</option>
        <option selected>HEADON</option>
      </Select>
    </Form>
  </DialogContent>
</Dialog>
```

---

## 💰 Pricing-Logik

### Berechnungs-Formel (Pseudo-Code)

```typescript
function calculateComparison(data: CalculatorState): ComparisonResult {
  // 1. Basis-Preis bestimmen
  const basePrice = getBasePrice(data.projectType)

  // 2. Multiplikatoren anwenden
  let headonPrice = basePrice
  headonPrice *= getDesignMultiplier(data.designLevel)
  headonPrice += getPageCost(data.pageRange)
  headonPrice *= getResponsivenessMultiplier(data.responsiveness)
  headonPrice += getUXCost(data.uxComplexity)

  // 3. Features addieren
  headonPrice += calculateFeatureCost(data.features)

  // 4. Qualität addieren
  headonPrice += calculateQualityCost(data)

  // 5. Timeline & Support
  headonPrice *= getTimelineMultiplier(data.timeline)
  headonPrice += calculateSupportCost(data.support, data.maintenance)

  // 6. Range berechnen (±20%)
  const headonRange = {
    min: headonPrice * 0.8,
    max: headonPrice * 1.2,
    avg: headonPrice
  }

  // 7. Freelancer & Agency berechnen
  const freelancerPrice = headonPrice * 0.65  // 35% günstiger
  const agencyPrice = headonPrice * 2.2       // 120% teurer

  // 8. Duration berechnen
  const headonDuration = estimateDuration(data)
  const freelancerDuration = headonDuration * 1.9
  const agencyDuration = headonDuration * 1.6

  return {
    freelancer: { price: ..., duration: ..., ... },
    agency: { price: ..., duration: ..., ... },
    headon: { price: ..., duration: ..., ... },
    savings: { ... }
  }
}
```

### Provider-spezifische Faktoren

**Freelancer:**
- Preis: `headonPrice * 0.55 - 0.75`
- Zeit: `headonDuration * 1.6 - 2.2`
- Qualität: 3/5
- **Pros:** Günstig, flexibel, direkter Kontakt
- **Cons:** Keine Vertretung, variable Qualität, oft langsamer
- **Ausgeschlossen:** Premium Support, SLA, Team-Backup

**Traditionelle Agentur:**
- Preis: `headonPrice * 1.9 - 2.6`
- Zeit: `headonDuration * 1.4 - 1.8`
- Qualität: 5/5
- **Pros:** Etablierte Prozesse, Full-Service, hohe Zuverlässigkeit
- **Cons:** Teuer, langsame Entscheidungen, Overhead
- **Inkludiert:** Account Manager, Meetings, Reporting

**HEADON (Modern Agency):**
- Preis: `headonPrice * 1.0` (Referenz)
- Zeit: `headonDuration * 0.5 - 0.7`
- Qualität: 5/5
- **Pros:** Moderne Tech, agile Methoden, schnell, transparent
- **Cons:** —
- **USPs:**
  - 🚀 2x schneller als Wettbewerb
  - 💰 40% günstiger als Agenturen
  - ⭐ Agentur-Qualität zu fairen Preisen
  - 🔧 Moderne Technologien (Next.js, React, Supabase)
  - 📈 Wartung & Support inklusive

---

## 🗄️ Datenbank-Schema

### Supabase Table: `calculator_leads`

```sql
CREATE TABLE calculator_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Lead Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,

  -- Calculator Data (JSONB)
  calculator_data JSONB NOT NULL,

  -- Comparison Result (JSONB)
  comparison_result JSONB NOT NULL,

  -- Preferences
  preferred_provider TEXT CHECK (preferred_provider IN ('freelancer', 'agency', 'headon')),

  -- Scoring
  lead_score INTEGER,
  estimated_value INTEGER, -- Durchschnittspreis in Euro

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),

  -- Metadata
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  user_agent TEXT
);

-- Indexes
CREATE INDEX idx_calculator_leads_email ON calculator_leads(email);
CREATE INDEX idx_calculator_leads_created_at ON calculator_leads(created_at DESC);
CREATE INDEX idx_calculator_leads_status ON calculator_leads(status);
CREATE INDEX idx_calculator_leads_lead_score ON calculator_leads(lead_score DESC);
```

### Optional: `calculator_sessions` (anonyme Nutzung tracken)

```sql
CREATE TABLE calculator_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  session_id TEXT UNIQUE NOT NULL,
  calculator_data JSONB,
  comparison_result JSONB,

  completed BOOLEAN DEFAULT FALSE,
  step_reached INTEGER,

  -- Anonyme Metadata
  utm_source TEXT,
  referrer TEXT,
  user_agent TEXT
);
```

---

## 📧 Email-Benachrichtigungen

### Template: Calculator Result

**Empfänger:** Lead (User)

**Betreff:** "Ihre Kostenschätzung für [Projekttyp] - HEADON.pro"

**Inhalt:**
```html
<!DOCTYPE html>
<html>
<body>
  <h1>Vielen Dank für Ihr Interesse! 🎉</h1>

  <p>Hallo {{name}},</p>

  <p>hier ist Ihre persönliche Kostenschätzung für Ihr Projekt:</p>

  <h2>📊 Ihr Projekt: {{projectTitle}}</h2>

  <table>
    <tr>
      <th></th>
      <th>Freelancer</th>
      <th>Agentur</th>
      <th>HEADON ⭐</th>
    </tr>
    <tr>
      <td>Kosten</td>
      <td>{{freelancerPrice}}</td>
      <td>{{agencyPrice}}</td>
      <td><strong>{{headonPrice}}</strong></td>
    </tr>
    <tr>
      <td>Dauer</td>
      <td>{{freelancerDuration}}</td>
      <td>{{agencyDuration}}</td>
      <td><strong>{{headonDuration}}</strong></td>
    </tr>
  </table>

  <h3>💰 Mit HEADON sparen Sie: {{savings}}€</h3>

  <h3>Was ist der nächste Schritt?</h3>
  <p>
    Unser Team meldet sich innerhalb von 24 Stunden bei Ihnen für ein
    kostenloses Beratungsgespräch.
  </p>

  <a href="{{calendlyLink}}" style="btn">📅 Termin direkt buchen</a>

  <hr>

  <h3>Aufschlüsselung Ihrer Kosten:</h3>
  <ul>
    {{#breakdown}}
      <li>{{category}}: {{price}}€</li>
    {{/breakdown}}
  </ul>

  <p>
    Fragen? Antworten Sie einfach auf diese E-Mail oder rufen Sie uns an:
    <a href="tel:+4978031234567">+49 7803 123 45 67</a>
  </p>

  <p>Beste Grüße,<br>Ihr HEADON Team</p>
</body>
</html>
```

### Template: Internal Notification

**Empfänger:** HEADON Team

**Betreff:** "🔥 Neuer Calculator-Lead: [Name] - €{{estimatedValue}}"

**Inhalt:** (ähnlich wie contact form template, erweitert um Calculator-Daten)

---

## 🎯 SEO-Strategie

### Meta-Tags

```typescript
// app/kostenrechner/metadata.ts
export const metadata: Metadata = {
  title: 'Kostenrechner: Website & App Entwicklung | HEADON.pro',
  description: 'Berechnen Sie in 2 Minuten die Kosten für Ihre Website, Web-App oder Mobile App. Vergleichen Sie Freelancer, Agenturen & HEADON. 100% transparent & kostenlos.',
  keywords: [
    'website kosten rechner',
    'app entwicklung kosten',
    'webseite preis kalkulator',
    'homepage kosten berechnen',
    'web entwicklung preis',
    'freelancer vs agentur kosten',
    'website erstellen kosten',
    'app entwicklung preis rechner'
  ],
  openGraph: {
    title: 'Kostenrechner für Webseiten & Apps - HEADON.pro',
    description: 'Transparenter Preisrechner mit 3-Wege-Vergleich',
    images: ['/og-calculator.png'],
    type: 'website'
  },
  alternates: {
    canonical: 'https://headon.pro/kostenrechner'
  }
}
```

### Schema.org Markup

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "HEADON Kostenrechner",
  "description": "Interaktiver Kostenrechner für Website & App Entwicklung",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "featureList": [
    "Kostenschätzung in unter 3 Minuten",
    "3-Wege-Vergleich (Freelancer/Agentur/HEADON)",
    "Detaillierte Preis-Aufschlüsselung",
    "Timeline-Schätzung"
  ]
}
```

### Interne Verlinkung

- Blog-Posts → Kostenrechner CTA
- Service-Pages → "Was kostet das? → Kostenrechner"
- Homepage Hero → "Kosten berechnen" Button

---

## 📈 Analytics & Tracking

### Umami Events

```typescript
// Step Completion
umami.track('calculator-step-completed', { step: 1 })

// Feature Selection (popular features tracken)
umami.track('calculator-feature-selected', { feature: 'cms' })

// Result Viewed
umami.track('calculator-result-viewed', {
  projectType: 'website',
  estimatedPrice: 15000,
  provider: 'headon'
})

// Lead Captured
umami.track('calculator-lead-captured', {
  provider: 'headon',
  leadScore: 25,
  estimatedValue: 15000
})

// Share Button
umami.track('calculator-result-shared', { method: 'link' })
```

### Conversion Funnel

```
Step 1 (100%) → Step 2 (85%) → Step 3 (70%) → Step 4 (60%) →
Step 5 (55%) → Step 6 (50%) → Lead Capture (15%)
```

**Ziel:** >50% Completion Rate bis Step 6

---

## ✅ Implementierungs-Plan

### Phase 1: Foundation (2-3 Tage)
- [x] Feature-Plan erstellen (dieses Dokument)
- [ ] TypeScript Types definieren (`types.ts`)
- [ ] Pricing Config erstellen (`pricing-config.ts`)
- [ ] Calculator Engine entwickeln (`calculator-engine.ts`)
- [ ] Validation Schemas (Zod)
- [ ] Supabase Schema erstellen & migrieren

### Phase 2: UI Components (3-4 Tage)
- [ ] shadcn/ui Komponenten installieren (checkbox, radio-group, slider, etc.)
- [ ] Shared Components erstellen:
  - [ ] ProjectTypeCard
  - [ ] FeatureCheckbox
  - [ ] RangeSlider
  - [ ] PriceCounter
- [ ] CalculatorProgress Component
- [ ] PricePreview Component (Sticky Sidebar)

### Phase 3: Step Components (4-5 Tage)
- [ ] StepProjectType
- [ ] StepDesignScope
- [ ] StepFeatures (mit Conditional Logic)
- [ ] StepQuality
- [ ] StepTimeline

### Phase 4: Results & Comparison (3-4 Tage)
- [ ] ComparisonCard Component
- [ ] ComparisonGrid Component (Desktop + Mobile)
- [ ] SavingsHighlight Component
- [ ] PriceBreakdown Component
- [ ] LeadCaptureDialog Component

### Phase 5: Main Integration (2 Tage)
- [ ] CostCalculator Main Component (State Management)
- [ ] Route Setup (`app/kostenrechner/page.tsx`)
- [ ] Metadata & SEO
- [ ] Animations (framer-motion)

### Phase 6: Backend (2 Tage)
- [ ] API Route (`/api/calculator`)
- [ ] Email Template erstellen
- [ ] Supabase Integration
- [ ] Lead Scoring Logic

### Phase 7: Testing & Polish (2-3 Tage)
- [ ] Mobile Responsiveness testen
- [ ] Accessibility Audit (WCAG AA)
- [ ] Performance Optimization
- [ ] Cross-Browser Testing
- [ ] Analytics Events integrieren

### Phase 8: Launch (1 Tag)
- [ ] Final QA
- [ ] Content-Review (Texte, Preise)
- [ ] Deployment
- [ ] Post-Launch Monitoring

**Geschätzte Gesamtdauer:** 18-25 Tage (bei 1 Entwickler)

---

## 🚨 Offene Fragen & Entscheidungen

### 1. Pricing-Strategie
- [ ] **Frage:** Sollen tatsächliche Preise angezeigt werden oder bewusst konservative Schätzungen?
- [ ] **Frage:** Wie transparent wollen wir bei "versteckten Kosten" sein? (Hosting, Domains, etc.)
- [ ] **Entscheidung:** Range-Größe? (±20% oder ±30%)

### 2. Lead Capture Strategie
- [ ] **Frage:** Lead Capture obligatorisch oder optional?
- [ ] **Empfehlung:** Optional → höhere Completion Rate, mehr Daten zum Analysieren
- [ ] **Frage:** Incentive für Lead Capture? ("Kostenlose 30-Min Beratung", "10% Frühbucher-Rabatt")

### 3. Feature-Scope
- [ ] **Frage:** Share-Funktion: URL-basiert oder PDF-Download?
- [ ] **Frage:** "Projekt speichern" für später? (requires Auth/Cookies)
- [ ] **Frage:** Comparison: nur 3 Provider oder auch "DIY/No-Code" Option?

### 4. Design-Details
- [ ] **Frage:** Farbschema für Provider-Cards festlegen
- [ ] **Frage:** Custom Illustrations für Steps? (optional, nice-to-have)
- [ ] **Frage:** Mobile: Tabs oder Swiper für Comparison?

### 5. Technical
- [ ] **Frage:** State Persistence: LocalStorage oder URL Query Params?
- [ ] **Empfehlung:** URL Query Params → shareable links
- [ ] **Frage:** Server-Side Calculation oder Client-Side? (Client-Side bevorzugt für UX)

### 6. Content
- [ ] **Todo:** Finale Preise mit Team abstimmen
- [ ] **Todo:** Pros/Cons Listen für Provider finalisieren
- [ ] **Todo:** Email-Templates texten
- [ ] **Todo:** FAQ für Calculator-Seite erstellen

---

## 🎁 Nice-to-Have Features (Post-Launch)

### Version 2.0
- [ ] **PDF-Export:** Ergebnis als professionelles PDF
- [ ] **Kalender-Integration:** Direkt Beratungstermin buchen (Calendly)
- [ ] **Vergleichs-Modus:** Mehrere Konfigurationen nebeneinander
- [ ] **Branchenspezifische Presets:** "Restaurant Website", "Anwaltskanzlei", etc.
- [ ] **ROI-Calculator:** Zusätzliche Berechnung von Business Value
- [ ] **Team-Collaboration:** Link teilen + gemeinsam konfigurieren

### Analytics Insights
- [ ] **Dashboard:** Interne Analytics über beliebte Features, Durchschnittspreise
- [ ] **A/B Testing:** Verschiedene Pricing-Modelle testen
- [ ] **Heatmaps:** Wo User abspringen

---

## 📚 Ressourcen & Referenzen

### Design-Inspiration
- [Vercel Pricing Calculator](https://vercel.com/pricing)
- [Stripe Pricing](https://stripe.com/pricing)
- [WebFlow Pricing](https://webflow.com/pricing)

### Technische Docs
- [Next.js App Router](https://nextjs.org/docs/app)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zod Validation](https://zod.dev/)

### Best Practices
- [UX for Multi-Step Forms](https://www.nngroup.com/articles/multi-step-forms/)
- [Pricing Psychology](https://www.priceintelligently.com/blog/pricing-psychology)
- [Conversion Optimization](https://cxl.com/blog/conversion-optimization-guide/)

---

## 🔐 Security & Privacy

### Datenschutz
- [ ] DSGVO-konform: Keine Daten ohne Zustimmung speichern
- [ ] Anonyme Sessions: Optional tracken für Analytics (ohne PII)
- [ ] Cookie-Banner: Informieren über Analytics-Cookies
- [ ] Datenlöschung: Prozess für Lead-Löschung auf Anfrage

### Security
- [ ] Input Validation: Alle Inputs serverseitig validieren (Zod)
- [ ] Rate Limiting: API Route vor Spam schützen
- [ ] CSRF Protection: Next.js built-in
- [ ] XSS Prevention: React escaping + Content Security Policy

---

## 📞 Support & Wartung

### Monitoring
- [ ] Error Tracking: Sentry/LogRocket für Client-Errors
- [ ] Uptime Monitoring: Kostenrechner Health Check
- [ ] Analytics: Wöchentliches Reporting über Nutzung

### Maintenance
- [ ] Preis-Updates: Quartalweise Review & Anpassung
- [ ] Content-Updates: A/B Testing von Texten
- [ ] Feature-Requests: User-Feedback sammeln & priorisieren

---

## ✨ Erfolgs-Kriterien

### Quantitativ
- ✅ >500 monatliche Nutzer nach 3 Monaten
- ✅ >50% Completion Rate (Step 1 → Step 6)
- ✅ >15% Lead Capture Rate
- ✅ >70% HEADON als preferred provider gewählt
- ✅ Durchschnittlicher Lead Score >20

### Qualitativ
- ✅ Positive User-Feedback (NPS >40)
- ✅ Sales-Team findet Leads qualifiziert
- ✅ SEO: Top 10 für "website kosten rechner"
- ✅ Lighthouse Score >90
- ✅ WCAG AA konform

---

**Status:** 🟡 Wartet auf Freigabe zur Implementierung

**Nächster Schritt:** Feedback zu diesem Plan einholen → Dann Start mit Phase 1
