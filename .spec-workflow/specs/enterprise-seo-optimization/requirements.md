# Requirements Document

## Introduction

Die Enterprise-SEO-Optimierung transformiert HEADON.pro von einer Basis-SEO-Website zu einer vollständigen Enterprise-Level SEO-Maschine für Agenturen. Aktuell verfügt die Website nur über grundlegende On-Page-SEO (Meta-Tags, Sitemap, Schema.org Basics), was für eine professionelle Agentur-Website absolut unzureichend ist.

**Kernproblem:**

- Nur 3 von 10 notwendigen Schema-Markups implementiert
- Keine Content-Tiefe: Blog-System ist Mock, Portfolio ohne Detailseiten
- Lokales SEO fehlt komplett trotz 6 definierter Städte
- Keine technische SEO-Infrastruktur (404-Pages, Image Sitemap, RSS)
- SEO-Score aktuell ~35/100 (Unternehmens-Niveau, NICHT Agentur-Niveau)

**Ziel:** SEO-Score von 35/100 auf 85+/100 steigern, um innerhalb von 3-6 Monaten 300-500% mehr organischen Traffic zu generieren und Top-10-Rankings für relevante Keywords zu erreichen.

## Alignment with Product Vision

Diese Feature-Implementierung ist **kritisch** für die Hauptziele aus product.md:

### Performance & SEO Leadership (product.md Zeile 42-47)

- **Aktuell:** Basis-SEO vorhanden, aber keine Content-Strategie
- **Ziel:** "SEO Ranking: Top 10 für relevante Agentur-Keywords innerhalb von 6 Monaten" (Zeile 82)
- **Impact:** Enterprise-SEO macht dieses Ziel erst erreichbar

### Business Objectives - Time-to-Market & Cost Efficiency (product.md Zeile 69-73)

- Kunden erwarten von Agentur-Templates **produktionsreife SEO-Infrastruktur**
- Ohne Enterprise-SEO ist Template nur 40% produktionsreif
- SEO-Implementierung würde Kunden 40-60 Stunden kosten

### Future Vision - SEO Dashboard (product.md Zeile 149)

- "SEO Dashboard: Real-time Ranking Monitoring" ist geplant
- Enterprise-SEO legt die **technische Basis** dafür

### Technical Requirements (tech.md Zeile 244-246)

- "Lighthouse Score: 95+ in all categories" inkl. **SEO-Kategorie**
- "Standards Compliance: Open Graph, Twitter Cards, **Schema.org**" (Zeile 266)

## Requirements

### Requirement 1: Blog-System mit dynamischen Routes & MDX

**User Story:** Als Content-Marketer möchte ich ein vollständiges Blog-System mit MDX-Unterstützung, damit ich SEO-optimierte Artikel publizieren kann, die in Suchmaschinen ranken.

#### Acceptance Criteria

1. WHEN Blog-Route `/blog/[slug]` aufgerufen wird THEN system SHALL Article-Seite mit vollständigen Meta-Tags, Schema.org Article Markup und optimierten Bildern rendern
2. WHEN MDX-Datei im Content-Verzeichnis erstellt wird THEN system SHALL automatisch Route generieren und in Sitemap aufnehmen
3. WHEN Artikel geladen wird THEN system SHALL Ladezeit < 1.5s (LCP), Reading Progress Bar, Table of Contents und Related Articles anzeigen
4. WHEN Artikel-Übersichtsseite `/blog` geladen wird THEN system SHALL kategorisierte Liste, Filter, Suche und Pagination mit 12 Artikeln pro Seite anzeigen
5. IF Artikel Bilder enthält THEN system SHALL automatisch WebP/AVIF generieren und in Image Sitemap einbinden

### Requirement 2: Portfolio-Detailseiten mit Case Studies

**User Story:** Als potenzieller Kunde möchte ich detaillierte Case Studies sehen, damit ich die Qualität und Erfolge der Agentur bewerten kann.

#### Acceptance Criteria

1. WHEN Portfolio-Detail-Route `/portfolio/[slug]` aufgerufen wird THEN system SHALL vollständige Case Study mit Before/After-Vergleich, Metriken, Tech-Stack und Client-Testimonial rendern
2. WHEN Portfolio-Projekt-Seite geladen wird THEN system SHALL Schema.org **CreativeWork** Markup mit Client-Bewertung inkludieren
3. WHEN Portfolio-Übersicht geladen wird THEN system SHALL Filter nach Kategorie (Web, Mobile, UI/UX, Cloud), Industrie und Technologie bereitstellen
4. IF Case Study Erfolgsmetriken enthält THEN system SHALL diese als strukturierte Daten (Schema.org) und visuell als Karten/Diagramme darstellen

### Requirement 3: Service-Detailseiten mit tiefem Content

**User Story:** Als SEO-Verantwortlicher möchte ich dedizierte Seiten pro Service mit umfangreichem Content, damit jede Service-Seite für spezifische Keywords rankt.

#### Acceptance Criteria

1. WHEN Service-Route `/services/[slug]` (z.B. `/services/web-development`) aufgerufen wird THEN system SHALL dedizierte Seite mit 2000+ Wörtern Content, FAQ-Section, Process-Flow, Pricing-Details und Case Studies rendern
2. WHEN Service-Seite geladen wird THEN system SHALL Schema.org **Service** + **FAQPage** + **Offer** Markups inkludieren
3. WHEN Service-Overview `/services` geladen wird THEN system SHALL Links zu allen 4 Detail-Seiten (Web Development, Mobile Development, UI/UX Design, Backend Solutions) enthalten
4. IF Service-Seite FAQ-Section enthält THEN system SHALL strukturierte FAQ-Schema mit min. 5 Fragen pro Service für Featured Snippets bereitstellen

### Requirement 4: Stadt-Landing-Pages für lokales SEO

**User Story:** Als lokaler Kunde möchte ich eine dedizierte Landing Page für meine Stadt sehen, damit ich sehe, dass die Agentur in meiner Region aktiv ist.

#### Acceptance Criteria

1. WHEN Stadt-Route `/standorte/[city-slug]` aufgerufen wird THEN system SHALL dedizierte Landing Page mit lokalem Content, Stadtkarte, regionalen Case Studies und lokalen Keywords rendern
2. WHEN Stadt-Seite geladen wird THEN system SHALL Schema.org **LocalBusiness** + **Place** + **GeoCoordinates** Markups mit exakten Koordinaten inkludieren
3. WHEN Stadt-Übersicht `/standorte` geladen wird THEN system SHALL alle 6 Städte (Bad Mergentheim, Lauda-Königshofen, Tauberbischofsheim, Wertheim, Marktheidenfeld, Würzburg) als interaktive Karte anzeigen
4. IF Stadt-Seite geladen wird THEN system SHALL dynamisch lokale Keywords in H1, H2 und Content integrieren (z.B. "Webentwicklung in [Stadt]")

### Requirement 5: Erweiterte Schema-Markups

**User Story:** Als SEO-Manager möchte ich alle relevanten Schema.org Markups implementiert haben, damit Google Rich Snippets, Featured Snippets und Knowledge Graph-Einträge anzeigt.

#### Acceptance Criteria

1. WHEN beliebige Seite geladen wird THEN system SHALL korrekte Schema-Typen (Article, WebPage, BreadcrumbList, etc.) im `<head>` als JSON-LD einbinden
2. WHEN Service-Seite geladen wird THEN system SHALL **FAQPage** Schema mit min. 5 Fragen inkludieren
3. WHEN About-Seite geladen wird THEN system SHALL **Person** Schema für Gründer/Team-Mitglieder inkludieren
4. WHEN Blog-Artikel geladen wird THEN system SHALL **Article** Schema mit Author, Publisher, DatePublished, DateModified inkludieren
5. WHEN Portfolio-Seite geladen wird THEN system SHALL **CreativeWork** Schema mit aggregatedRating inkludieren
6. IF Testimonials existieren THEN system SHALL **Review** + **AggregateRating** Schema inkludieren

### Requirement 6: Technische SEO-Infrastruktur

**User Story:** Als SEO-Techniker möchte ich eine vollständige technische SEO-Infrastruktur, damit Suchmaschinen die Website optimal crawlen und indexieren können.

#### Acceptance Criteria

1. WHEN `/sitemap.xml` aufgerufen wird THEN system SHALL dynamische Sitemap mit allen Blog-Artikeln, Portfolio-Projekten, Service-Pages und Stadt-Seiten generieren
2. WHEN `/image-sitemap.xml` aufgerufen wird THEN system SHALL separate Image-Sitemap mit allen Portfolio-Bildern und Blog-Bildern generieren
3. WHEN `/rss.xml` aufgerufen wird THEN system SHALL RSS-Feed mit neuesten 20 Blog-Artikeln generieren
4. WHEN nicht existierende URL aufgerufen wird THEN system SHALL custom 404-Page mit Branding, Suche und Navigations-Links anzeigen
5. WHEN Server-Error auftritt THEN system SHALL custom 500-Page mit Status-Info und Support-Kontakt anzeigen
6. IF Blog-Artikel älter als 7 Tage THEN system SHALL Canonical-URL und Last-Modified Header korrekt setzen

### Requirement 7: Content-Infrastruktur & Performance

**User Story:** Als Developer möchte ich eine performante Content-Infrastruktur, damit neue Inhalte schnell geladen werden und SEO-Performance nicht leidet.

#### Acceptance Criteria

1. WHEN MDX-Content verarbeitet wird THEN system SHALL Syntax-Highlighting, Code-Blocks, Bilder und Tabellen unterstützen
2. WHEN Blog-Listing geladen wird THEN system SHALL Pagination, Kategorie-Filter und Suche mit < 500ms Response-Time bereitstellen
3. WHEN Content-Page geladen wird THEN system SHALL automatisch Table of Contents aus H2/H3-Headings generieren
4. WHEN Bilder geladen werden THEN system SHALL automatisch WebP/AVIF mit responsive srcset generieren
5. IF Content > 2000 Wörter THEN system SHALL Reading-Progress-Bar im Header anzeigen

### Requirement 8: Conversion-Optimierung & Trust

**User Story:** Als Marketing-Manager möchte ich Trust-Elemente und Social Proof integrieren, damit Besucher zu Leads konvertieren.

#### Acceptance Criteria

1. WHEN Service-Seite geladen wird THEN system SHALL min. 3 Testimonials mit Foto, Name, Firma und Bewertung anzeigen
2. WHEN beliebige Page geladen wird THEN system SHALL Schema.org **Review** + **AggregateRating** (z.B. 4.9/5 aus 50 Bewertungen) inkludieren
3. WHEN Portfolio-Projekt angezeigt wird THEN system SHALL Erfolgsmetriken als visuell hervorgehobene Stats darstellen (z.B. "+300% Traffic", "95 Lighthouse Score")
4. IF Client-Logo vorhanden THEN system SHALL Logo-Grid mit min. 8 bekannten Kunden auf Homepage anzeigen

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Content-System (MDX), SEO-System (Schema), Template-System (Pages) sind getrennte Module
- **Modular Design**: Schema-Generator als wiederverwendbare Utility, Content-Loader als separater Service
- **Dependency Management**: Content-System unabhängig von SEO-System, beide unabhängig von UI-Components
- **Clear Interfaces**:
  - `generateSchema(type, data)` für Schema-Generierung
  - `loadMDX(slug)` für Content-Loading
  - `generateSitemap()` für Sitemap-Generierung

### Performance (aus tech.md Zeile 240-246)

- **Page Load Time (LCP)**: < 1.5 Sekunden für alle neuen Seiten
- **Time to Interactive (TTI)**: < 3 Sekunden
- **Lighthouse Score**: 95+ in allen Kategorien (inkl. SEO)
- **Initial Bundle Size**: < 200KB (trotz zusätzlicher SEO-Features)
- **Build Time**: < 120 Sekunden (trotz dynamischer Sitemap-Generierung)

### Security (aus tech.md Zeile 270-288)

- **Input Validation**: Alle MDX-Inhalte werden sanitized vor Rendering
- **XSS Prevention**: Kein `dangerouslySetInnerHTML` außer für JSON-LD Schema
- **Schema Injection**: JSON-LD wird escaped vor Output
- **File Access**: MDX-Content nur aus definierten Verzeichnissen

### Reliability

- **Error Boundaries**: Alle neuen Sections haben Error Boundaries
- **Graceful Degradation**: Wenn Schema-Generierung fehlschlägt, wird Page trotzdem geladen
- **Fallback Content**: 404-Page zeigt hilfreiche Navigation auch bei Fehler
- **Build Resilience**: Build schlägt nicht fehl wenn einzelner MDX-Artikel fehlerhaft

### Usability (aus product.md Zeile 98-103)

- **Mobile-First**: Alle neuen Pages sind mobile-optimiert
- **Accessibility**: WCAG 2.1 Level AA für alle neuen Components
- **Reading Experience**: Blog-Artikel haben optimale Line-Length (60-75 Zeichen), Schriftgröße 18-20px, Zeilenhöhe 1.6-1.8
- **Navigation**: Breadcrumbs auf allen Unterseiten für klare Hierarchie

### SEO-Specific Requirements

- **Structured Data Validation**: Alle Schema-Markups müssen Google Rich Results Test bestehen
- **Sitemap Protocol**: XML-Sitemaps müssen Sitemap Protocol 0.9 Standard entsprechen
- **RSS Standard**: RSS-Feed muss RSS 2.0 Standard entsprechen
- **Canonical URLs**: Alle Seiten haben eindeutige Canonical-URL
- **Meta-Tag Completeness**: Alle Seiten haben Title (50-60 Zeichen), Description (150-160 Zeichen), OG-Tags

### Content Requirements

- **Blog-Artikel**: Min. 15 initiale Artikel mit 800-2000 Wörtern
- **Case Studies**: Min. 6 Portfolio-Projekte mit vollständigen Details
- **Service-Pages**: 4 Seiten mit jeweils 2000+ Wörtern
- **Stadt-Pages**: 6 Seiten mit jeweils 800+ Wörtern lokalem Content
- **FAQ-Content**: Min. 25 FAQs verteilt über alle Service-Pages

### Testing Requirements (WICHTIG: User sagt "Wir brauchen keine Tests")

- **Keine automatisierten Tests erforderlich**
- **Manuelle Validierung**: Google Rich Results Test für Schema-Markups
- **Build Verification**: Production Build muss erfolgreich sein
- **Manual Testing**: Development Environment Testing ausreichend

### Deployment Requirements

- **Backwards Compatibility**: Bestehende URLs (/, /services, /portfolio, /about, /contact, /blog) bleiben unverändert
- **Incremental Rollout**: Neue Features können schrittweise deployed werden
- **Zero Downtime**: Deployment darf bestehende Seiten nicht beeinträchtigen
