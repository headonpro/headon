# Requirements Document

## Introduction

Das HEADON.pro Marketing-Website Template rankt derzeit nicht für business-orientierte Keywords, die zahlungskräftige Unternehmenskunden anziehen. Durch umfassende Keyword-Analyse wurde festgestellt, dass die Website für technische Keywords (z.B. "fullstack development") sichtbar ist, jedoch nicht für kommerzielle Suchanfragen wie "website erstellen lassen kosten" oder "webentwicklung agentur".

Dieses Feature implementiert eine umfassende SEO-Content-Strategie, die gezielt business-fokussierte Keywords adressiert, lokale Sichtbarkeit erhöht und conversion-orientierte Landing Pages erstellt. Das Ziel ist es, von 26 indexierten Seiten zu messbarem organischen Traffic von zahlungsbereiten Kunden zu kommen.

## Alignment with Product Vision

Dieses Feature unterstützt direkt die Business Objectives aus product.md:

- **SEO Ranking**: Top 10 für relevante Agentur-Keywords innerhalb von 6 Monaten (aktuell: nicht gelistet)
- **Cost Efficiency**: Organischer Traffic reduziert Akquisitionskosten um bis zu 80%
- **Time-to-Market**: Schnelle Implementierung durch template-basierte Content-Erstellung
- **Conversion Rate**: Optimierte Landing Pages verbessern Lead-Generierung

Alignment mit Product Principles:

- **User-Centric Design**: Content adressiert echte Probleme von Unternehmenskunden
- **Performance First**: SEO-optimierte Seiten ohne Performance-Einbußen
- **Production Ready**: Sofort einsetzbare, getestete Landing Pages

## Requirements

### Requirement 1: Business-Keyword-optimierte Blog-Artikel

**User Story:** Als potenzieller Unternehmenskunde möchte ich informative Artikel zu "Website erstellen lassen Kosten" finden, sodass ich HEADON.pro als kompetenten Anbieter wahrnehme und kontaktiere.

#### Acceptance Criteria

1. WHEN ein Nutzer nach "website erstellen lassen kosten" sucht THEN SHALL das System einen detaillierten Artikel mit Preisvergleich (1.500€ - 15.000€) anzeigen
2. WHEN ein Nutzer nach "webentwicklung agentur baden-württemberg" sucht THEN SHALL das System einen Vergleichsartikel (Agentur vs. Freelancer) mit lokalem Bezug anzeigen
3. WHEN ein Nutzer nach "restaurant website erstellen" sucht THEN SHALL das System einen branchenspezifischen Artikel mit Features und Preisen anzeigen
4. WHEN ein Nutzer nach "handwerker homepage" sucht THEN SHALL das System einen conversion-optimierten Artikel mit statistischen Daten anzeigen
5. IF ein Artikel geladen wird THEN SHALL das System Meta-Title (≤60 Zeichen), Meta-Description (≤160 Zeichen), Canonical Tags, OpenGraph Tags und Schema.org Markup bereitstellen
6. WHEN ein Artikel angezeigt wird THEN SHALL das System strukturierte Daten (Article Schema) für Rich Snippets inkludieren
7. IF ein Artikel veröffentlicht wird THEN SHALL das System automatisch in sitemap.xml aufgenommen werden mit priority=0.8

### Requirement 2: Lokale Stadt-Landing-Pages

**User Story:** Als Unternehmen in Würzburg möchte ich eine lokale Webagentur finden, sodass ich kurze Anfahrtswege und persönliche Beratung habe.

#### Acceptance Criteria

1. WHEN ein Nutzer nach "webentwicklung würzburg" sucht THEN SHALL das System eine dedizierte Landing Page mit lokalem Bezug anzeigen
2. IF eine Stadt-Landing-Page geladen wird THEN SHALL das System folgende Informationen bereitstellen:
   - Anfahrtszeit von Lauda-Königshofen (z.B. "nur 30 Minuten")
   - Lokale Referenzen oder Projekte in der Region
   - Persönliche Beratung vor Ort Angebot
   - Google Maps Integration
3. WHEN eine Stadt-Seite generiert wird THEN SHALL das System für mindestens 5 Städte im 30km-Radius Landing Pages erstellen: Würzburg, Bad Mergentheim, Tauberbischofsheim, Creglingen, Weikersheim
4. IF eine Stadt-Landing-Page indexiert wird THEN SHALL das System LocalBusiness Schema.org Markup mit vollständiger NAP (Name, Address, Phone) inkludieren
5. WHEN eine Stadt-Seite geladen wird THEN SHALL das System konsistente Kontaktdaten (Name: HEADON.pro, Adresse: Lauda-Königshofen, Tel: +49 176 630 402 41, E-Mail: hallo@headon.pro) anzeigen

### Requirement 3: Branchen-spezifische Landing Pages

**User Story:** Als Restaurant-Betreiber möchte ich verstehen welche Website-Features für meine Branche relevant sind, sodass ich eine fundierte Kaufentscheidung treffen kann.

#### Acceptance Criteria

1. WHEN ein Nutzer nach "restaurant website features" sucht THEN SHALL das System eine branchen-optimierte Seite mit Online-Reservierung, Speisekarte-Integration und Preisen anzeigen
2. WHEN Branchen-Seiten erstellt werden THEN SHALL das System mindestens 6 Branchen abdecken:
   - Restaurant & Gastronomie (ab 2.500€)
   - Handwerk & Services (ab 3.000€)
   - Einzelhandel & E-Commerce (ab 5.000€)
   - Beratung & Coaching (ab 4.000€)
   - Immobilien & Makler (ab 6.000€)
   - Fitness & Wellness (ab 4.500€)
3. IF eine Branchen-Seite geladen wird THEN SHALL das System folgende Elemente enthalten:
   - Spezifische Pain Points der Branche
   - 3-5 essenzielle Features mit Beschreibungen
   - Preisangaben (ab X€)
   - Zeitrahmen (X-Y Wochen)
   - Branchenspezifische Case Studies (min. 1)
   - Call-to-Action für kostenloses Erstgespräch
4. WHEN Branchen-Content erstellt wird THEN SHALL das System HowTo Schema.org Markup für feature-spezifische Anleitungen bereitstellen
5. IF eine Branchen-Seite SEO-optimiert wird THEN SHALL das System Long-Tail-Keywords wie "restaurant website mit online-reservierung" targetieren

### Requirement 4: Technologie-Landing-Pages

**User Story:** Als technisch versierter Entscheider möchte ich verstehen welche Technologien HEADON.pro einsetzt, sodass ich die Qualität und Zukunftssicherheit einschätzen kann.

#### Acceptance Criteria

1. WHEN Technologie-Seiten erstellt werden THEN SHALL das System mindestens 4 Technologie-Landing-Pages bereitstellen:
   - Next.js Development (Performance & SEO Vorteile)
   - React Development (Component-basierte Architektur)
   - Supabase Backend (Skalierbare Backend-Lösung)
   - Mobile App Development (React Native vs. Flutter Vergleich)
2. IF eine Technologie-Seite geladen wird THEN SHALL das System folgende Inhalte bereitstellen:
   - Technologie-Überblick (Was ist X?)
   - Vorteile & Anwendungsfälle
   - Vergleich mit Alternativen
   - HEADON.pro Expertise & Projekte
   - Pricing-Information
3. WHEN ein Nutzer "next.js agentur deutschland" sucht THEN SHALL das System die Next.js Landing Page anzeigen
4. IF Technologie-Content erstellt wird THEN SHALL das System FAQ Schema.org Markup für häufige Technologie-Fragen inkludieren
5. WHEN Technologie-Seiten optimiert werden THEN SHALL das System sowohl technische (Developer) als auch business-orientierte (Entscheider) Informationen balancieren

### Requirement 5: Use-Case-Landing-Pages

**User Story:** Als Unternehmer mit spezifischem Problem (z.B. "Online-Buchungssystem benötigt") möchte ich eine Lösungsseite finden, sodass ich direkt verstehe wie HEADON.pro mein Problem löst.

#### Acceptance Criteria

1. WHEN Use-Case-Seiten erstellt werden THEN SHALL das System mindestens 5 Use-Cases abdecken:
   - Buchungssystem für Dienstleister
   - Online-Shop für Einzelhändler
   - Firmenwebsite für KMUs
   - Web-App für Startups
   - Portfolio-Website für Kreative
2. IF eine Use-Case-Seite geladen wird THEN SHALL das System folgende Struktur verwenden:
   - Problem-Beschreibung (Pain Point)
   - Lösung mit Features
   - Implementierungsprozess (3 Schritte)
   - Preis & Zeitrahmen
   - Erfolgsbeispiel oder Case Study
   - CTA: "Kostenloses Erstgespräch"
3. WHEN ein Nutzer "buchungssystem für friseur" sucht THEN SHALL das System die Buchungssystem Use-Case Seite mit Branchenbezug anzeigen
4. IF Use-Case-Content erstellt wird THEN SHALL das System Product Schema.org Markup für Software-Lösungen bereitstellen
5. WHEN Use-Case-Seiten optimiert werden THEN SHALL das System conversion-fokussierte Formulierungen ("Jetzt starten", "Kostenlose Beratung") verwenden

### Requirement 6: SEO-Meta-Daten-Optimierung

**User Story:** Als Suchmaschine möchte ich strukturierte, optimierte Meta-Daten erhalten, sodass ich Seiten korrekt indexieren und in Rich Snippets darstellen kann.

#### Acceptance Criteria

1. WHEN eine neue Content-Seite erstellt wird THEN SHALL das System automatisch folgende Meta-Daten generieren:
   - Meta-Title (50-60 Zeichen, Keyword vorne)
   - Meta-Description (150-160 Zeichen, Call-to-Action)
   - Canonical URL (absolute URL)
   - OpenGraph Tags (title, description, image 1200x630, url)
   - Twitter Card Tags (optional)
2. IF eine Blog-Artikel-Seite geladen wird THEN SHALL das System Article Schema.org Markup mit folgenden Feldern bereitstellen:
   - headline, description, image
   - datePublished, dateModified
   - author (name, url)
   - publisher (HEADON.pro Organization)
3. WHEN eine Branchen-Seite geladen wird THEN SHALL das System Service Schema.org Markup mit Pricing-Informationen bereitstellen
4. IF eine Stadt-Landing-Page geladen wird THEN SHALL das System LocalBusiness Schema.org Markup mit vollständiger NAP bereitstellen
5. WHEN Schema.org Markup generiert wird THEN SHALL das System gültiges JSON-LD Format verwenden (validiert gegen schema.org)
6. IF Meta-Daten generiert werden THEN SHALL das System Keyword-Stuffing vermeiden (max. 1-2 Keywords pro Meta-Tag)

### Requirement 7: Content-Management-Struktur

**User Story:** Als Content-Manager möchte ich einfach neue Artikel und Landing Pages erstellen können, sodass ich schnell auf neue Keyword-Opportunities reagieren kann.

#### Acceptance Criteria

1. WHEN Content erstellt wird THEN SHALL das System MDX-Format für alle Content-Dateien verwenden
2. IF eine neue Content-Datei erstellt wird THEN SHALL das System folgende Frontmatter-Felder erzwingen:
   - title (string, required)
   - description (string, required, ≤160 Zeichen)
   - publishedAt (ISO 8601 date, required)
   - keywords (array of strings, required)
   - category (enum: development|business|tutorial, required)
3. WHEN Content in `/content/blog/` erstellt wird THEN SHALL das System automatisch in Blog-Listing aufgenommen werden
4. IF Content in `/content/branchen/` erstellt wird THEN SHALL das System automatisch in Branchen-Navigation aufgenommen werden
5. WHEN Content in `/content/technologies/` erstellt wird THEN SHALL das System automatisch in Technologie-Übersicht aufgenommen werden
6. IF Content in `/content/use-cases/` erstellt wird THEN SHALL das System automatisch in Use-Cases-Section aufgenommen werden
7. WHEN Content in `/content/cities/` erstellt wird THEN SHALL das System automatisch in Regionen-Dropdown aufgenommen werden
8. IF eine Content-Datei gespeichert wird THEN SHALL das System automatisch sitemap.xml aktualisieren

### Requirement 8: Internal Linking Strategy

**User Story:** Als SEO-System möchte ich intelligente interne Verlinkungen zwischen verwandten Inhalten haben, sodass Link-Equity verteilt wird und User Experience verbessert wird.

#### Acceptance Criteria

1. WHEN ein Blog-Artikel über "Website Kosten" erstellt wird THEN SHALL das System automatisch Links zu verwandten Branchen-Seiten (Restaurant, Handwerk) einfügen
2. IF eine Branchen-Seite geladen wird THEN SHALL das System Links zu relevanten Blog-Artikeln und Use-Cases bereitstellen
3. WHEN eine Stadt-Landing-Page geladen wird THEN SHALL das System Links zu Branchen-Seiten und relevanten Blog-Artikeln inkludieren
4. IF eine Technologie-Seite geladen wird THEN SHALL das System Links zu Projects/Portfolio mit dieser Technologie bereitstellen
5. WHEN interne Links erstellt werden THEN SHALL das System beschreibende Anchor-Texte verwenden (nicht "hier klicken")
6. IF eine Content-Seite mehr als 2.000 Wörter hat THEN SHALL das System ein Inhaltsverzeichnis mit Sprungmarken bereitstellen

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Jede Landing-Page-Komponente hat eine klare Aufgabe (Stadt, Branche, Use-Case)
- **Modular Design**: Content-Komponenten sind wiederverwendbar zwischen verschiedenen Landing-Page-Typen
- **Dependency Management**: SEO-Utilities (meta-builder, schema-builder) sind isoliert in `lib/seo/`
- **Clear Interfaces**: TypeScript-Interfaces für alle Content-Typen (BlogPost, BranchPage, CityPage, TechnologyPage, UseCasePage)

### Performance

- **Page Load Time (LCP)**: < 1.5 Sekunden für alle neuen Landing Pages (gemäß product.md)
- **Bundle Size Impact**: Neue Content-Seiten dürfen JavaScript Bundle maximal um 10KB erhöhen
- **Image Optimization**: Alle Landing-Page-Bilder müssen über Next.js Image Component geladen werden
- **Static Generation**: Alle Landing Pages werden als statische Seiten (SSG) generiert, nicht SSR
- **Sitemap Generation**: sitemap.xml muss in <30 Sekunden generiert werden (auch mit 100+ Seiten)

### Security

- **XSS Prevention**: Alle MDX-Content wird automatisch sanitized
- **SQL Injection**: N/A (kein User-Generated-Content in Database)
- **Content Validation**: Zod-Schemas validieren Frontmatter-Daten beim Build
- **Meta-Tag Injection**: Automatisches Escaping von User-Input in Meta-Tags

### Reliability

- **Build Stability**: Content-Fehler (z.B. fehlendes Frontmatter) dürfen Build nicht abbrechen, sondern Warnings generieren
- **Graceful Degradation**: Fehlende optionale Felder (z.B. image) werden durch Defaults ersetzt
- **Error Boundaries**: Content-Rendering-Fehler werden gefangen und loggen Details für Debugging

### Usability

- **Mobile-First**: Alle Landing Pages funktionieren optimal auf Smartphones (Touch-optimiert)
- **Accessibility**: WCAG 2.1 Level AA konform (Semantic HTML, Alt-Tags, ARIA labels)
- **Lesefreundlichkeit**: Fließtext maximal 65-75 Zeichen pro Zeile
- **Typografie**: Mindestens 16px Schriftgröße für Body-Text, 1.5 Zeilenabstand
- **Navigation**: Breadcrumbs auf allen Landing Pages für Orientierung

### SEO-Specific Requirements

- **Crawlability**: Alle Landing Pages müssen für Googlebot zugänglich sein (robots.txt erlaubt /)
- **Indexability**: Keine noindex-Tags auf Business-Content (nur auf Admin/API-Routen)
- **Structured Data Validation**: Alle Schema.org Markup muss Google Rich Results Test bestehen
- **Mobile-Friendly**: Google Mobile-Friendly Test muss 100/100 Score erreichen
- **Core Web Vitals**: LCP <1.5s, FID <100ms, CLS <0.1 (gemäß product.md Success Metrics)
- **Duplicate Content**: Canonical Tags verhindern Duplicate Content bei ähnlichen Landing Pages
- **URL-Struktur**: SEO-freundliche URLs (z.B. `/branchen/restaurant-gastronomie`, nicht `/b/123`)
