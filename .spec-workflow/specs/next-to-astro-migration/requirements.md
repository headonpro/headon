# Requirements Document

## Introduction

Die HEADON.pro Marketing-Website soll von Next.js 15 auf Astro migriert werden, um die Performance- und SEO-Ziele besser zu erreichen. Die aktuelle Next.js-Implementierung nutzt React-Server-Components und Client-Components, generiert jedoch einen Build von 439MB und lädt ~200-300KB JavaScript für primär statischen Content. Astro bietet eine optimierte Architektur für content-fokussierte Websites mit "Islands Architecture", die JavaScript nur dort lädt, wo tatsächliche Interaktivität benötigt wird.

**Wert für Nutzer:**

- 90-95% weniger JavaScript-Payload für Endnutzer
- Sub-1-Sekunde Ladezeiten (LCP < 1s statt < 1.5s)
- Lighthouse Score 98-100 statt 85-95
- Bessere SEO-Rankings durch schnellere Core Web Vitals
- Niedrigere Hosting-Kosten durch kleinere Bundles

## Alignment with Product Vision

Diese Migration unterstützt direkt die Kernprinzipien aus product.md:

1. **Performance First**: Astro's Static-First-Ansatz erfüllt die "nicht verhandelbare" Core Web Vitals-Anforderung besser als jedes React-Framework
2. **Maintainability über Cleverness**: Astro's einfachere Architektur (weniger Client-JavaScript) reduziert Komplexität
3. **Business Objectives**:
   - Time-to-Market bleibt gleich (oder besser durch einfachere Struktur)
   - Performance Leadership wird erreicht durch messbar bessere Ladezeiten
   - Maintenance Simplicity steigt durch weniger Dependencies (40+ → 15-20)
4. **Success Metrics Verbesserung**:
   - Page Load Time: < 1.0s LCP (aktuell < 1.5s Ziel)
   - Lighthouse Score: 98-100 (aktuell 95+ Ziel)
   - Bundle Size: < 50KB (aktuell < 200KB Ziel)

## Requirements

### Requirement 1: Parallele Migration ohne Production-Disruption

**User Story:** Als Entwickler möchte ich die Astro-Migration parallel zur bestehenden Next.js-Website durchführen, damit die Live-Website unterbrechungsfrei weiterlaufen kann und ich jederzeit vergleichen kann.

#### Acceptance Criteria

1. WHEN ein neues Projekt-Directory erstellt wird THEN soll es unter `~/projects/headon-astro/` liegen
2. WHEN beide Projekte gleichzeitig entwickelt werden THEN sollen sie auf unterschiedlichen Ports laufen (Next.js: 3000, Astro: 4321)
3. WHEN Code aus Next.js referenziert wird THEN soll das Original-Projekt unangetastet bleiben
4. WHEN die Migration abgeschlossen ist THEN soll ein klarer Rollout-Plan für den Production-Switch existieren

### Requirement 2: Feature-Parity mit Next.js Version

**User Story:** Als Product Owner möchte ich, dass die Astro-Version alle Features der Next.js-Version enthält, damit keine Funktionalität verloren geht.

#### Acceptance Criteria

1. WHEN alle Seiten migriert sind THEN sollen folgende Routes existieren:
   - `/` (Homepage)
   - `/about` (About-Seite)
   - `/services` und `/services/[slug]` (Services)
   - `/portfolio` und `/portfolio/[slug]` (Portfolio)
   - `/blog` und `/blog/[slug]` (Blog mit MDX)
   - `/contact` (Kontaktformular)
   - `/imprint`, `/privacy`, `/terms` (Legal-Seiten)
   - `/regionen/*` (Regionen-Seiten)
2. WHEN alle Komponenten migriert sind THEN sollen alle 66 React-Komponenten als Astro-Komponenten oder React-Islands existieren
3. WHEN interaktive Features implementiert sind THEN sollen Kontaktformular, Navigation, und Animationen funktional identisch sein
4. WHEN das Design geprüft wird THEN soll die visuelle Darstellung pixelgenau übereinstimmen

### Requirement 3: Performance-Verbesserung (Messbar)

**User Story:** Als Marketing-Manager möchte ich messbar bessere Performance-Werte, damit unsere Website schneller als 90% der Konkurrenz ist und besser rankt.

#### Acceptance Criteria

1. WHEN ein Lighthouse-Test durchgeführt wird THEN soll der Performance-Score ≥ 98 sein
2. WHEN Core Web Vitals gemessen werden THEN sollen folgende Werte erreicht werden:
   - LCP (Largest Contentful Paint): < 1.0s (aktuell ~1.5s)
   - FID (First Input Delay): < 50ms (aktuell ~100ms)
   - CLS (Cumulative Layout Shift): < 0.05 (aktuell ~0.1)
3. WHEN der JavaScript-Bundle gemessen wird THEN soll die initiale Payload < 50KB sein (aktuell ~200-300KB)
4. WHEN die Build-Größe verglichen wird THEN soll der Astro-Build < 100MB sein (aktuell 439MB)

### Requirement 4: SEO-Optimierung (Gleichwertig oder besser)

**User Story:** Als SEO-Spezialist möchte ich, dass alle SEO-Features erhalten bleiben oder verbessert werden, damit unsere Rankings nicht leiden.

#### Acceptance Criteria

1. WHEN Meta-Tags geprüft werden THEN sollen alle Seiten korrekte Metadata haben (title, description, OG-tags, Twitter Cards)
2. WHEN Structured Data validiert wird THEN soll Schema.org Markup für Organization, WebSite, BreadcrumbList vorhanden sein
3. WHEN sitemap.xml generiert wird THEN sollen alle Routen mit korrekten Prioritäten enthalten sein
4. WHEN robots.txt geprüft wird THEN soll die Konfiguration identisch oder besser sein
5. WHEN canonical URLs validiert werden THEN sollen alle Seiten korrekte canonical tags haben

### Requirement 5: Tailwind v4 Design-System Transfer

**User Story:** Als Designer möchte ich, dass das bestehende Design-System 1:1 übertragen wird, damit keine visuellen Inkonsistenzen entstehen.

#### Acceptance Criteria

1. WHEN Tailwind-Config migriert wird THEN sollen alle Custom-Colors, Fonts, und Breakpoints identisch sein
2. WHEN shadcn/ui Komponenten verwendet werden THEN sollen sie als React-Islands oder native Astro-Varianten verfügbar sein
3. WHEN CSS-Variables geprüft werden THEN sollen alle Custom-Properties (--font-outfit, etc.) vorhanden sein
4. WHEN Responsive Design getestet wird THEN soll die Website auf allen Breakpoints identisch aussehen

### Requirement 6: Supabase-Integration beibehalten

**User Story:** Als Backend-Entwickler möchte ich, dass die Supabase-Integration vollständig funktional bleibt, damit Kontaktformulare und zukünftige Features weiterhin funktionieren.

#### Acceptance Criteria

1. WHEN das Kontaktformular abgeschickt wird THEN sollen Daten korrekt in Supabase gespeichert werden
2. WHEN Zod-Validierung läuft THEN sollen die bestehenden Schemas wiederverwendet werden
3. WHEN Server-Side API-Calls gemacht werden THEN soll der Service-Role-Key sicher verwendet werden
4. WHEN Client-Side Calls gemacht werden THEN soll der Anon-Key verwendet werden

### Requirement 7: MDX-Content-Migration

**User Story:** Als Content-Manager möchte ich, dass alle Blog-Posts und Content-Seiten ohne Datenverlust migriert werden, damit bestehender Content weiterhin verfügbar ist.

#### Acceptance Criteria

1. WHEN MDX-Files migriert werden THEN sollen alle Frontmatter-Felder (title, description, date, image) erhalten bleiben
2. WHEN Blog-Posts gerendert werden THEN sollen Code-Highlighting (Shiki), GFM, und andere Plugins funktionieren
3. WHEN Content Collections verwendet werden THEN soll Astro's natives Content-Collections-System genutzt werden
4. WHEN Bilder in MDX referenziert werden THEN sollen sie korrekt optimiert und geladen werden

### Requirement 8: Interaktivität via React Islands

**User Story:** Als Entwickler möchte ich interaktive Komponenten als React-Islands implementieren, damit nur minimal JavaScript geladen wird.

#### Acceptance Criteria

1. WHEN das Kontaktformular geladen wird THEN soll React nur für das Formular geladen werden (client:load)
2. WHEN Animationen implementiert werden THEN sollen sie via View Transitions API oder client:visible geladen werden
3. WHEN die Navigation interaktiv ist THEN soll sie als minimal-JavaScript-Lösung (Alpine.js oder React-Island) implementiert sein
4. WHEN interaktive Komponenten gezählt werden THEN sollen maximal 5-10 React-Islands existieren (aktuell 53 Client-Components)

### Requirement 9: Docker-Deployment-Kompatibilität

**User Story:** Als DevOps-Engineer möchte ich, dass die Astro-Version genauso einfach via Docker deployed werden kann wie die Next.js-Version, damit der Deployment-Prozess unverändert bleibt.

#### Acceptance Criteria

1. WHEN ein Docker-Image gebaut wird THEN soll der Dockerfile ähnlich strukturiert sein (Multi-stage build)
2. WHEN die Astro-App deployed wird THEN soll sie als statische Files via Nginx oder Node-Server laufen
3. WHEN Environment-Variables gesetzt werden THEN sollen die gleichen Variablen funktionieren (SUPABASE_URL, ANON_KEY, etc.)
4. WHEN Health-Checks laufen THEN soll ein /health Endpoint verfügbar sein

### Requirement 10: Entwickler-Erfahrung beibehalten oder verbessern

**User Story:** Als Entwickler möchte ich eine gleichwertige oder bessere Developer Experience, damit ich produktiv arbeiten kann.

#### Acceptance Criteria

1. WHEN der Dev-Server gestartet wird THEN soll Hot Module Replacement funktionieren
2. WHEN TypeScript verwendet wird THEN soll Strict Mode aktiv sein mit gleichen Regeln
3. WHEN ESLint/Prettier laufen THEN sollen die Regeln konsistent mit Next.js sein
4. WHEN neue Features entwickelt werden THEN soll die Build-Zeit ≤ 15 Sekunden sein (aktuell ~30-60s)

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Jede Astro-Komponente hat einen klaren Zweck (z.B. HeroSection.astro nur für Hero-Content)
- **Modular Design**:
  - `src/components/ui/` für primitive Komponenten
  - `src/components/sections/` für Page-Sections
  - `src/layouts/` für Layout-Wrapper
  - `src/content/` für MDX-Content (Content Collections)
- **Dependency Management**:
  - Reduzierung von 40+ auf 15-20 Dependencies
  - Keine React/React-DOM im globalen Bundle (nur für Islands)
- **Clear Interfaces**: TypeScript-Interfaces für alle Props, Astro.props für type-safety

### Performance

- **Lighthouse Performance Score**: ≥ 98 (current: 85-95)
- **LCP (Largest Contentful Paint)**: < 1.0s (current target: < 1.5s)
- **TTI (Time to Interactive)**: < 1.5s (current: ~2-3s)
- **FID (First Input Delay)**: < 50ms (current: ~100ms)
- **CLS (Cumulative Layout Shift)**: < 0.05 (current: ~0.1)
- **Build Time**: < 15 seconds (current: 30-60s)
- **Bundle Size**:
  - Initial JavaScript: < 50KB (current: 200-300KB)
  - Total Build Output: < 100MB (current: 439MB)
  - Per-Page JavaScript: < 20KB (außer für Pages mit React-Islands)

### Security

- **Secrets Management**: Environment Variables für Supabase Keys (identisch zu Next.js)
- **Input Validation**: Zod-Schemas auf Client und Server
- **XSS Prevention**: Astro's automatisches HTML-Escaping
- **CSRF Protection**: SameSite Cookies für Formular-Submissions
- **Security Headers**: Nginx-Konfiguration für CSP, X-Frame-Options, etc.
- **Dependency Security**: Regelmäßige Updates, npm audit clean

### Reliability

- **Uptime Target**: 99.9% (identisch zu Next.js-Version)
- **Error Handling**:
  - Custom 404-Page
  - Error Boundaries für React-Islands
  - Graceful Degradation bei JavaScript-Fehlern
- **Fallback Mechanisms**:
  - Static Fallback für Dynamic Routes
  - Progressive Enhancement für Interaktivität
- **Build Reliability**: CI/CD mit automatischen Tests vor Deployment

### Usability

- **Mobile-First**: Identische Responsiveness wie Next.js-Version
- **Accessibility**:
  - WCAG 2.1 Level AA Compliance
  - Semantic HTML
  - ARIA-Labels wo nötig
  - Keyboard-Navigation
- **Browser Compatibility**:
  - Chrome, Firefox, Safari, Edge (last 2 versions)
  - Safari 12+ (iOS 12+)
  - Android 8+
- **Loading States**: Skeleton-Screens oder Loader für asynchrone Inhalte
- **Form Feedback**: Klare Erfolgs-/Fehler-Meldungen beim Kontaktformular
