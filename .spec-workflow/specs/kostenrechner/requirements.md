# Requirements Document: Kostenrechner

## Introduction

Der **Kostenrechner für Webseiten & Apps** ist ein interaktiver Multi-Step-Kalkulator, der potenziellen Kunden eine transparente Kostenschätzung für ihre Projekt-Anforderungen bietet. Das Feature integriert einen **3-Wege-Vergleich** (Freelancer vs. Traditionelle Agentur vs. HEADON), um HEADON als optimale Balance zwischen Qualität, Geschwindigkeit und Preis zu positionieren.

**Kernwert:**
- **Transparenz**: Klare Preisvorstellungen ohne Vertriebsgespräch
- **Lead-Generierung**: Qualifizierte Leads durch intelligentes Lead-Scoring
- **Competitive Positioning**: HEADON als beste Wahl im Markt
- **SEO-Traffic**: Rankings für "Website Kosten Rechner", "App Entwicklung Preis"

**Business Impact:**
- >15% Conversion Rate (Leads von Nutzern)
- >60% Completion Rate (Step 1 → Step 6)
- >20 Punkte durchschnittlicher Lead Score
- 500+ monatliche Nutzer nach 3 Monaten

## Alignment with Product Vision

Dieser Kostenrechner verstärkt die Kern-Produktziele von HEADON.pro:

### Lead-Generierung mit Qualitäts-Filter
- **Alignment**: Der Kostenrechner erweitert das bestehende Lead-Management (Multi-Step Contact Form) um einen **Qualifier-Mechanismus**
- **Synergy**: Nutzt dieselbe Supabase-Infrastruktur und Resend-Email-Integration
- **Enhancement**: Automatisches Lead-Scoring basierend auf Projekt-Komplexität, Budget und Timeline

### Content-Marketing & Authority Building
- **Alignment**: Neue Content-Kategorie ergänzt Blog, Glossar und Vergleichs-Artikel
- **SEO-Strategy**: Rankings für transactionale Keywords ("Kosten berechnen", "Preis Rechner")
- **Traffic-Source**: Qualifizierter Traffic mit hoher Kaufabsicht

### Performance Leadership
- **Alignment**: Folgt denselben Performance-Standards (LCP < 1.5s, Lighthouse 95+)
- **Technology**: Next.js 15, React Server Components, Tailwind CSS v4
- **Optimization**: Static Generation für schnelle Ladezeiten

### Data-Driven Optimization
- **Alignment**: Integration mit Umami Analytics für Conversion-Tracking
- **Metrics**: Detailliertes Event-Tracking für Funnel-Analyse
- **Privacy**: GDPR-konform, Cookie-frei wie bestehende Analytics

## Requirements

### Requirement 1: Multi-Step Calculator Flow

**User Story:** Als potentieller Kunde möchte ich in **unter 3 Minuten** eine realistische Kostenschätzung für mein Projekt erhalten, ohne mit einem Vertriebler sprechen zu müssen.

#### Acceptance Criteria

1. WHEN User die Route `/kostenrechner` besucht THEN System SHALL eine Hero-Section mit "Was kostet Ihre Webseite? In 2 Min herausfinden" und Trust-Indicators anzeigen
2. WHEN User den Calculator startet THEN System SHALL einen 6-stufigen Wizard mit Progress-Indicator (1/6, 2/6, ...) darstellen
3. WHEN User Step 1 erreicht THEN System SHALL Projekttyp-Auswahl präsentieren (Website, Web-App, Mobile App, E-Commerce, Custom, Unsicher)
4. WHEN User einen Projekttyp auswählt THEN System SHALL sofort zum nächsten Step navigieren
5. WHEN User "Zurück"-Button klickt THEN System SHALL zum vorherigen Step navigieren ohne Datenverlust
6. WHEN User Step 6 erreicht THEN System SHALL den 3-Wege-Vergleich mit allen Berechnungen anzeigen
7. IF User Calculator unterbricht THEN System SHALL State in URL Query Params speichern für shareable links
8. WHEN User auf Mobile-Device zugreift THEN System SHALL responsives Layout mit gestackten Steps darstellen

---

### Requirement 2: Step 1 - Projekttyp

**User Story:** Als Nutzer möchte ich meinen Projekttyp schnell auswählen, damit das System eine passende Basis-Kalkulation starten kann.

#### Acceptance Criteria

1. WHEN Step 1 angezeigt wird THEN System SHALL 6 Radio Cards mit Icons präsentieren (Website, Web-App, Mobile App, E-Commerce, Custom, Unsicher)
2. WHEN User einen Projekttyp auswählt THEN System SHALL visuelles Feedback (Selected State) anzeigen
3. WHEN User Projekttyp wählt THEN System SHALL Basis-Preisrange festlegen:
   - Website: 2.500€ - 8.000€
   - Web-App: 10.000€ - 50.000€
   - Mobile App: 15.000€ - 80.000€
   - E-Commerce: 8.000€ - 40.000€
4. WHEN User "Unsicher" wählt THEN System SHALL Default zu "Website" mit Hinweis-Badge
5. WHEN Basis-Preis festgelegt wird THEN System SHALL Live-Preview Sidebar aktualisieren

---

### Requirement 3: Step 2 - Design & Umfang

**User Story:** Als Nutzer möchte ich den Design-Level und Projekt-Umfang angeben, damit die Kalkulation meinen Qualitätsansprüchen entspricht.

#### Acceptance Criteria

1. WHEN Step 2 angezeigt wird THEN System SHALL 4 Konfigurationsbereiche präsentieren:
   - Design Level (Radio Cards)
   - Umfang (Range Slider mit visueller Anzeige)
   - Responsiveness (Select Dropdown)
   - UX-Komplexität (Radio Group)
2. WHEN User "Template-basiert" wählt THEN System SHALL Multiplikator 1.0x anwenden
3. WHEN User "Custom Design" wählt THEN System SHALL Multiplikator 1.5x anwenden
4. WHEN User "Premium Custom Design" wählt THEN System SHALL Multiplikator 2.0x anwenden
5. WHEN User Umfang auf "6-15 Seiten" einstellt THEN System SHALL +400€ pro Seite (Durchschnitt 10 Seiten) addieren
6. WHEN User "Progressive Web App" wählt THEN System SHALL Multiplikator 1.6x für Responsiveness anwenden
7. WHEN User "Premium UX" wählt THEN System SHALL +5.000€ addieren
8. IF Eingaben geändert werden THEN System SHALL Live-Preview in Echtzeit aktualisieren

---

### Requirement 4: Step 3 - Funktionalitäten

**User Story:** Als Nutzer möchte ich benötigte Features auswählen, damit die Kalkulation alle technischen Anforderungen berücksichtigt.

#### Acceptance Criteria

1. WHEN Step 3 angezeigt wird THEN System SHALL Checkbox-Grid mit 10+ Features darstellen
2. WHEN User "Content Management System" ankreuzt THEN System SHALL Conditional Sub-Options anzeigen (Strapi/Sanity/Custom)
3. WHEN User "User Authentication" wählt THEN System SHALL +2.000€ - 4.000€ addieren
4. WHEN User Sub-Option "2FA" aktiviert THEN System SHALL zusätzliche +1.000€ addieren
5. WHEN User "Payment-Integration" wählt THEN System SHALL Provider-Auswahl anzeigen (Stripe/PayPal/Mollie)
6. WHEN User "Mehrsprachigkeit" wählt THEN System SHALL Sprachen-Anzahl abfragen
7. WHEN User 3+ Sprachen eingibt THEN System SHALL +4.000€ addieren
8. WHEN User Features selektiert/deselektiert THEN System SHALL Gesamt-Preis in Preview sofort aktualisieren
9. IF keine Features gewählt wurden THEN System SHALL Hinweis "Basis-Funktionalität ohne Extras" anzeigen

---

### Requirement 5: Step 4 - Qualität & Performance

**User Story:** Als qualitätsbewusster Kunde möchte ich nicht-funktionale Anforderungen (SEO, Performance, Security) spezifizieren.

#### Acceptance Criteria

1. WHEN Step 4 angezeigt wird THEN System SHALL Accordion mit 6 Kategorien präsentieren:
   - SEO-Optimierung
   - Performance-Optimierung
   - Security
   - DSGVO-Compliance
   - Testing
   - Accessibility
2. WHEN User "Advanced SEO" (+2.500€) wählt THEN System SHALL Beschreibung "Schema.org, Performance, Analytics" anzeigen
3. WHEN User "Premium Performance" (+3.500€) wählt THEN System SHALL "CDN, Edge Functions, Performance Budget" beschreiben
4. WHEN User "Penetration Testing" (+3.500€) wählt THEN System SHALL Security-Badge in Preview anzeigen
5. WHEN User "DSGVO-Compliance" ankreuzt THEN System SHALL +800€ addieren
6. WHEN User "E2E Tests" (+2.500€) wählt THEN System SHALL Quality-Indicator erhöhen
7. WHEN User "WCAG AAA" (+2.500€) wählt THEN System SHALL Accessibility-Badge anzeigen
8. IF keine Qualitäts-Features gewählt THEN System SHALL Warnung "Basis-Qualität ohne Optimierungen" zeigen

---

### Requirement 6: Step 5 - Timeline & Support

**User Story:** Als Kunde möchte ich Projektrahmen (Timeline, Wartung, Support) festlegen, damit ich Gesamtkosten und Laufzeit verstehe.

#### Acceptance Criteria

1. WHEN Step 5 angezeigt wird THEN System SHALL 5 Konfigurationsbereiche präsentieren:
   - Projektstart (Radio Cards)
   - Wartung & Updates (Radio Cards)
   - Support-Paket (Select)
   - Hosting (Toggle)
   - Training & Dokumentation (Checkbox)
2. WHEN User "Urgent (Sofort)" wählt THEN System SHALL Aufpreis-Multiplikator 1.3x anwenden
3. WHEN User "Premium Wartung" (+350€/Monat) wählt THEN System SHALL monatliche Kosten in Breakdown anzeigen
4. WHEN User "12 Monate Support" (+1.500€) wählt THEN System SHALL Einmalkosten addieren
5. WHEN User "Managed Hosting" aktiviert THEN System SHALL +50€/Monat zu monatlichen Kosten addieren
6. WHEN User "Training & Dokumentation" ankreuzt THEN System SHALL +800€ Einmalkosten addieren
7. WHEN User "Weiter" klickt THEN System SHALL finale Berechnung durchführen und zu Step 6 navigieren

---

### Requirement 7: Live Price Preview Sidebar

**User Story:** Als Nutzer möchte ich während der Konfiguration jederzeit die aktuelle Kostenschätzung sehen.

#### Acceptance Criteria

1. WHEN Calculator auf Desktop angezeigt wird THEN System SHALL Sticky Sidebar rechts (40% Breite) darstellen
2. WHEN Calculator auf Mobile angezeigt wird THEN System SHALL Preview unterhalb der Steps fixiert anzeigen
3. WHEN User Eingaben ändert THEN System SHALL Preview in < 100ms aktualisieren (debounced)
4. WHEN Preview aktualisiert wird THEN System SHALL animierten Preis-Counter zeigen
5. WHEN Preis berechnet wird THEN System SHALL Range anzeigen (z.B. "12.500€ - 18.000€")
6. WHEN Timeline berechnet wird THEN System SHALL geschätzte Dauer anzeigen (z.B. "⏱ 6-8 Wochen")
7. WHEN Kosten kategorisiert sind THEN System SHALL Breakdown anzeigen:
   - Basis: 5.000€
   - Design: +3.000€
   - Features: +4.500€
8. IF monatliche Kosten vorhanden THEN System SHALL separate Zeile "Monatlich: 400€/Monat" zeigen

---

### Requirement 8: Step 6 - Ergebnis & 3-Way Comparison

**User Story:** Als vergleichssuchender Kunde möchte ich verstehen, warum HEADON die beste Wahl ist.

#### Acceptance Criteria

1. WHEN Step 6 erreicht wird THEN System SHALL Hero-Section mit "Ihr Projekt: [Generierter Titel]" anzeigen
2. WHEN Comparison berechnet wird THEN System SHALL 3-Column Grid präsentieren:
   - Freelancer (Links)
   - Traditionelle Agentur (Mitte)
   - HEADON ⭐ BESTE WAHL (Rechts mit Highlight)
3. WHEN Freelancer-Card angezeigt wird THEN System SHALL zeigen:
   - Preis: `HEADON_Preis * 0.65`
   - Dauer: `HEADON_Dauer * 1.9`
   - Qualität: ⭐⭐⭐ (3/5)
   - ✅ Günstig, ⚠️ Langsam, ❌ Kein Support
4. WHEN Agentur-Card angezeigt wird THEN System SHALL zeigen:
   - Preis: `HEADON_Preis * 2.2`
   - Dauer: `HEADON_Dauer * 1.6`
   - Qualität: ⭐⭐⭐⭐⭐ (5/5)
   - ✅ Full-Service, ⚠️ Teuer, ⚠️ Overhead
5. WHEN HEADON-Card angezeigt wird THEN System SHALL zeigen:
   - Preis: `HEADON_Preis * 1.0` (Referenz)
   - Dauer: `HEADON_Dauer * 1.0`
   - Qualität: ⭐⭐⭐⭐⭐ (5/5)
   - ✅ Modern Stack, ✅ 2x Schneller, ✅ 40% Günstiger
6. WHEN Comparison abgeschlossen THEN System SHALL Savings Highlight anzeigen: "💰 Sie sparen mit HEADON: 9.500€ & 10 Wochen"
7. WHEN User auf "Detaillierte Aufschlüsselung" klickt THEN System SHALL Accordion mit Kategorien öffnen
8. IF auf Mobile THEN System SHALL Tabs statt Grid für Comparison verwenden (swipeable)

---

### Requirement 9: Lead Capture Dialog

**User Story:** Als qualifizierter Lead möchte ich optional ein detailliertes Angebot per E-Mail erhalten.

#### Acceptance Criteria

1. WHEN Step 6 angezeigt wird THEN System SHALL CTA-Button "📧 Detailliertes Angebot per E-Mail" prominent platzieren
2. WHEN User auf CTA klickt THEN System SHALL Dialog mit Formular öffnen
3. WHEN Dialog geöffnet wird THEN System SHALL 5 Felder anzeigen:
   - Name (Pflichtfeld)
   - E-Mail (Pflichtfeld, validiert)
   - Telefon (Optional)
   - Nachricht (Optional, Textarea)
   - Bevorzugter Provider (Select: Freelancer/Agentur/HEADON - vorausgewählt: HEADON)
4. WHEN User Formular absended THEN System SHALL Daten mit Zod validieren
5. IF Validierung erfolgreich THEN System SHALL Lead zu Supabase `calculator_leads` Tabelle speichern
6. WHEN Lead gespeichert wird THEN System SHALL Lead-Score berechnen basierend auf:
   - Budget-Range (höher = mehr Punkte)
   - Timeline-Urgency (schneller = mehr Punkte)
   - Feature-Komplexität (mehr Features = mehr Punkte)
   - Bevorzugter Provider (HEADON = +10 Punkte)
7. WHEN Lead-Score berechnet THEN System SHALL Lead kategorisieren:
   - Score > 30: 🔥 HIGH PRIORITY
   - Score > 15: ⚡ MEDIUM
   - Score ≤ 15: 📝 STANDARD
8. WHEN Lead gespeichert THEN System SHALL Email-Notification an HEADON Team senden via Resend API
9. WHEN Email versendet THEN System SHALL Success-Message anzeigen: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden."
10. IF Fehler auftritt THEN System SHALL Error-Message anzeigen: "Fehler beim Senden. Bitte versuchen Sie es erneut."

---

### Requirement 10: Share & Export Funktionalität

**User Story:** Als Informationssammler möchte ich mein Ergebnis speichern oder teilen können.

#### Acceptance Criteria

1. WHEN Step 6 angezeigt wird THEN System SHALL "🔗 Ergebnis teilen" Button präsentieren
2. WHEN User auf "Teilen" klickt THEN System SHALL Shareable URL generieren mit State in Query Params
3. WHEN URL generiert wird THEN System SHALL alle Selections als JSON in Base64-encodiertem Query Param speichern
4. WHEN User URL kopiert THEN System SHALL Toast-Notification "Link kopiert!" anzeigen
5. WHEN User shareable URL öffnet THEN System SHALL Calculator mit vorausgefüllten Selections laden
6. WHEN vorausgefüllte Daten geladen THEN System SHALL direkt zu Step 6 navigieren
7. IF Query Params ungültig THEN System SHALL Calculator auf Step 1 zurücksetzen

---

### Requirement 11: Analytics & Event Tracking

**User Story:** Als Product Owner möchte ich detaillierte Nutzungsstatistiken für Conversion-Optimierung.

#### Acceptance Criteria

1. WHEN User Step abschließt THEN System SHALL Umami Event `calculator-step-completed` mit `{ step: number }` tracken
2. WHEN User Feature auswählt THEN System SHALL Event `calculator-feature-selected` mit `{ feature: string }` senden
3. WHEN User Step 6 erreicht THEN System SHALL Event `calculator-result-viewed` mit Metadata tracken:
   - `projectType: string`
   - `estimatedPrice: number`
   - `provider: string`
4. WHEN User Lead-Form absendet THEN System SHALL Event `calculator-lead-captured` mit Metadata tracken:
   - `provider: string`
   - `leadScore: number`
   - `estimatedValue: number`
5. WHEN User "Teilen" klickt THEN System SHALL Event `calculator-result-shared` mit `{ method: 'link' }` tracken
6. WHEN Calculator verlassen wird THEN System SHALL Event `calculator-abandoned` mit `{ lastStep: number }` tracken
7. IF anonyme Session DANN System SHOULD Session-Daten in `calculator_sessions` Tabelle speichern (optional)

---

### Requirement 12: Email-Benachrichtigungen

**User Story:** Als HEADON Team-Mitglied möchte ich sofortige, priorisierte Benachrichtigungen über neue Calculator-Leads.

#### Acceptance Criteria

1. WHEN neuer Lead gespeichert wird THEN System SHALL 2 Emails senden:
   - Lead-Bestätigung an User
   - Interne Notification an HEADON Team
2. WHEN User-Email versendet wird THEN System SHALL enthalten:
   - Betreff: "Ihre Kostenschätzung für [Projekttyp] - HEADON.pro"
   - Personalisierte Anrede mit Namen
   - 3-Way Comparison Tabelle (HTML)
   - Savings Highlight
   - CTA "📅 Termin direkt buchen" (Calendly-Link)
   - Detaillierte Kosten-Aufschlüsselung
   - Kontakt-Informationen
3. WHEN Team-Email versendet wird THEN System SHALL enthalten:
   - Betreff: "🔥 Neuer Calculator-Lead: [Name] - €[Wert] - [Priority-Level]"
   - Lead-Score Badge prominent (🔥/⚡/📝)
   - Grid-Layout mit Lead-Informationen
   - Calculator-Daten als expandable Section
   - Comparison-Ergebnis
   - Direct-Reply Button
4. IF Lead HIGH PRIORITY (Score > 30) THEN System SHALL Betreff mit "🔥🔥🔥" präfixen
5. WHEN Email HTML generiert wird THEN System SHALL responsive Template mit Inline-CSS verwenden
6. IF Email-Versand fehlschlägt THEN System SHALL Error loggen und Retry-Mechanismus aktivieren

---

## Non-Functional Requirements

### Code Architecture and Modularity

#### Single Responsibility Principle
- **Calculator Engine** (`lib/calculator/calculator-engine.ts`): Isolierte Berechnungs-Logik für alle 3 Provider
- **Pricing Configuration** (`lib/calculator/pricing-config.ts`): Zentrale Preis-Definitionen und Multiplikatoren
- **Step Components** (`components/calculator/steps/`): Jeder Step ist eigenständiges Modul
- **Results Components** (`components/calculator/results/`): Comparison-Logik getrennt von Calculator-Flow

#### Modular Design
- **Shared Components** (`components/calculator/shared/`): Wiederverwendbare UI-Elemente (ProjectTypeCard, FeatureCheckbox, RangeSlider)
- **Type Definitions** (`lib/calculator/types.ts`): Zentrale TypeScript Interfaces für Calculator State
- **Validation Schemas** (`lib/calculator/validation-schemas.ts`): Zod Schemas für Form-Validierung

#### Dependency Management
- **Calculator State**: Zentral in `CostCalculator.tsx` via React Hooks (useState)
- **No Circular Dependencies**: Unidirektionaler Datenfluss (State → Steps → Preview)
- **API Integration**: Isoliert in `/api/calculator/route.ts`

#### Clear Interfaces
- **Calculator State Type**: Definiert alle User-Selections
- **Comparison Result Type**: Strukturierte Ausgabe für 3 Provider
- **Lead Data Type**: Konsistente Daten-Struktur für Supabase und Email

### Performance

#### Page Load Performance
- **Initial Load (LCP)**: < 1.5s für `/kostenrechner` Route
- **JavaScript Bundle**: < 150KB für Calculator-spezifischen Code (gzipped)
- **CSS Bundle**: < 30KB für Calculator-Styles (gzipped)
- **TTI**: < 2.5s (Time to Interactive)

#### Runtime Performance
- **Live Calculation**: < 100ms für Preis-Update nach User-Input (debounced)
- **Step Navigation**: < 50ms für Transition zwischen Steps
- **Price Animation**: 60 FPS für Counter-Animation
- **Comparison Rendering**: < 200ms für Step 6 Calculation und Rendering

#### Optimization Techniques
- **Code Splitting**: Lazy Loading für Step-Components (React.lazy)
- **Memoization**: useMemo für teure Berechnungen
- **Debouncing**: Input-Handler debounced (300ms)
- **Static Generation**: SSG für `/kostenrechner` Entry Page

### Security

#### Input Validation
- **Client-Side**: Zod Schemas für alle Form-Inputs (Step 1-5, Lead-Form)
- **Server-Side**: Redundante Zod Validation in API Route
- **Type Safety**: TypeScript Strict Mode für Compile-Time Checks
- **Sanitization**: HTML-Escaping für User-Inputs in Emails

#### Data Protection
- **HTTPS Enforcement**: Alle Requests über HTTPS
- **Environment Variables**: API Keys in .env (Supabase, Resend)
- **CORS**: Restricted zu eigener Domain
- **RLS Policies**: Supabase Row Level Security für `calculator_leads`

#### XSS Prevention
- **React Auto-Escaping**: Default Escaping für User-Content
- **Content Security Policy**: CSP Headers in next.config.ts
- **No Eval**: Keine dynamic code execution
- **Sanitized Emails**: HTML Email Templates mit escaped User-Input

### Reliability

#### Error Handling
- **Try-Catch Blocks**: Alle async Operations wrapped
- **Graceful Degradation**: Calculator funktioniert ohne JavaScript (Form-Fallback)
- **Error Boundaries**: React Error Boundaries für Component-Fehler
- **API Error Responses**: Strukturierte Error-Messages mit Status Codes

#### Data Persistence
- **URL State**: Calculator State in Query Params für Shareable Links
- **Supabase Transactions**: Atomic Lead-Speicherung
- **Email Retry**: Automatischer Retry bei Resend API Fehlern
- **Session Storage**: Optional für anonyme Session-Tracking

#### Availability
- **No Single Point of Failure**: Supabase und Resend redundant
- **Fallback**: Calculator funktioniert auch ohne Analytics
- **Health Checks**: API Route Monitoring via `/api/health`

### Usability

#### User Experience
- **Completion Time**: < 3 Minuten für durchschnittlichen User (Ziel: < 2 Min)
- **Clear Progress**: Progress Bar zeigt Position (1/6, 2/6, ...)
- **Instant Feedback**: Live Preview aktualisiert bei jeder Änderung
- **Accessibility**: WCAG AA konform (Keyboard Navigation, Screen Reader Support)

#### Mobile Optimization
- **Touch-Friendly**: Mindestens 44x44px Touch Targets
- **Responsive**: Stacked Layout auf < 768px
- **Swipeable Tabs**: Comparison als horizontales Swipe auf Mobile
- **No Horizontal Scroll**: Alle Inhalte in Viewport-Breite

#### Error Prevention
- **Required Field Indicators**: Deutliche Markierung von Pflichtfeldern
- **Validation Feedback**: Inline Error Messages bei ungültigen Inputs
- **Confirmation**: Success/Error Toasts nach Actions
- **Back Button**: Jederzeit zurück ohne Datenverlust

#### Content Quality
- **German Language**: Alle Texte in professionellem Deutsch
- **Clear Labels**: Verständliche Bezeichnungen für alle Optionen
- **Help Text**: Tooltips für komplexe Features
- **Visual Hierarchy**: Klare Strukturierung mit Typography und Spacing

### Scalability

#### Load Handling
- **Concurrent Users**: Unterstützt 100+ simultane Calculator-Nutzer
- **Database Scaling**: Supabase managed scaling für Lead-Speicherung
- **CDN Caching**: Statische Assets über CDN
- **API Rate Limiting**: Schutz vor Abuse (max 10 Requests/Minute/IP)

#### Data Growth
- **Lead Storage**: Unbegrenzte Leads in Supabase (skaliert automatisch)
- **Query Performance**: Indexes auf `created_at`, `lead_score`, `status`
- **Session Data**: Optional limitiert auf letzte 30 Tage

### SEO Requirements

#### Meta Tags
- **Title**: "Kostenrechner: Website & App Entwicklung | HEADON.pro"
- **Description**: "Berechnen Sie in 2 Minuten die Kosten für Ihre Website, Web-App oder Mobile App. Vergleichen Sie Freelancer, Agenturen & HEADON. 100% transparent & kostenlos."
- **Keywords**: website kosten rechner, app entwicklung kosten, webseite preis kalkulator, homepage kosten berechnen
- **Canonical URL**: https://headon.pro/kostenrechner
- **Open Graph**: OG Image, Title, Description für Social Sharing

#### Structured Data
- **Schema.org Type**: WebApplication
- **Name**: "HEADON Kostenrechner"
- **Application Category**: BusinessApplication
- **Offers**: Free tool (price: 0 EUR)
- **Feature List**: Kostenschätzung, 3-Wege-Vergleich, Timeline-Schätzung

#### Internal Linking
- **Homepage Hero**: "Kosten berechnen" CTA zu `/kostenrechner`
- **Service Pages**: "Was kostet das? → Kostenrechner" Links
- **Blog Posts**: Kontextuelle Verlinkung zu Calculator

### Accessibility (WCAG AA)

#### Keyboard Navigation
- **Tab Order**: Logische Reihenfolge durch alle interaktiven Elemente
- **Enter/Space**: Aktivierung von Buttons und Checkboxen
- **Arrow Keys**: Navigation in Radio Groups und Selects
- **Escape**: Schließen von Dialogs

#### Screen Reader Support
- **ARIA Labels**: Descriptive Labels für alle Form-Elemente
- **ARIA Live Regions**: Announcement von Preis-Updates
- **ARIA Roles**: Semantic Roles für Custom Components
- **Alt Text**: Beschreibende Alt-Texte für Icons

#### Visual Accessibility
- **Color Contrast**: Mindestens 4.5:1 für Text, 3:1 für UI-Elemente
- **Focus Indicators**: Deutliche Focus Rings (2px solid)
- **Text Scaling**: Unterstützt bis 200% Zoom ohne Horizontal Scroll
- **No Color-Only Indicators**: Informationen nie nur durch Farbe vermittelt

### Browser Compatibility

#### Supported Browsers
- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 14+
- **Progressive Enhancement**: Basis-Funktionalität ohne JavaScript (Form-Fallback)

#### Polyfills & Fallbacks
- **CSS Grid**: Fallback zu Flexbox für ältere Browser
- **Intersection Observer**: Polyfill für Safari < 12.1
- **Framer Motion**: Graceful Degradation ohne Animationen

### Testing Requirements

#### Manual Testing
- **Cross-Browser**: Testing in allen supported Browsers
- **Responsive**: Testing auf 3+ Device-Größen (Mobile, Tablet, Desktop)
- **Accessibility**: Manual Testing mit Keyboard und Screen Reader
- **User Flow**: Kompletter Calculator-Durchlauf mit verschiedenen Szenarien

#### Automated Testing (Post-Launch)
- **E2E Tests**: Playwright Tests für kritische User-Flows
- **Unit Tests**: Jest Tests für Calculator-Engine und Pricing-Logic
- **Integration Tests**: API Route Testing mit Supabase Mock
- **Visual Regression**: Chromatic/Percy für UI-Änderungen

### Documentation Requirements

#### Code Documentation
- **JSDoc**: Alle exported Functions mit Beschreibung und Beispielen
- **Type Annotations**: Explizite TypeScript Types für alle Funktionen
- **README**: Setup-Anleitung, Architektur-Übersicht, Deployment-Guide

#### User Documentation
- **FAQ**: Häufige Fragen zu Pricing und Calculator-Nutzung
- **Tooltips**: Inline-Hilfe für komplexe Features
- **Help Section**: Link zu ausführlicher Dokumentation

#### Technical Documentation
- **Architecture Diagram**: Übersicht über Components und Data Flow
- **API Documentation**: OpenAPI Spec für `/api/calculator` Route
- **Database Schema**: ER-Diagramm für `calculator_leads` und `calculator_sessions`
