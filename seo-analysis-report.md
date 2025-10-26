# SEO-Analyse für headon.pro

**Datum:** 06. Oktober 2025
**URL:** https://headon.pro

---

## Executive Summary

Die Website headon.pro zeigt **keine kritischen Fehler**, weist aber **13 Seiten mit Indexierungsproblemen** auf ("Gecrawlt – zurzeit nicht indexiert"). Die Hauptursachen liegen in **fehlendem einzigartigen Content**, **identischem Content über mehrere Seiten** und **unvollständiger Meta-Tag-Implementierung**.

**Gesamtbewertung:** ⚠️ Handlungsbedarf bei Content-Qualität und Meta-Tags

---

## 1. robots.txt ✅ OPTIMAL

### Status

✅ **Keine Probleme gefunden**

### Konfiguration

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

User-Agent: Googlebot
Allow: /

Host: https://headon.pro
Sitemap: https://headon.pro/sitemap.xml
Sitemap: https://headon.pro/image-sitemap.xml
```

### Bewertung

- Korrekte Sperrung von internen Bereichen (/api/, /admin/, /\_next/)
- Googlebot erhält vollen Zugriff
- Sitemap korrekt referenziert
- **1 Seite durch robots.txt blockiert** (laut GSC) - wahrscheinlich gewollt

---

## 2. Sitemap.xml ✅ GUT

### Status

✅ **35 URLs in Sitemap**

### Struktur

- ✅ Alle Haupt-URLs vorhanden
- ✅ Korrekte Prioritäten gesetzt
- ✅ Changefreq definiert
- ✅ Lastmod-Timestamps aktuell
- ✅ Keine 404-Fehler in Sitemap-URLs

### URL-Verteilung

- 9 Hauptseiten (/, /services, /blog, etc.)
- 14 Blog-Artikel
- 4 Service-Unterseiten
- 6 Regions-Seiten
- 1 Portfolio-Projekt
- 2 Rechtliche Seiten (Impressum, Datenschutz)

### Fehlende URLs

❌ **Keine image-sitemap.xml vorhanden** (in robots.txt referenziert)

---

## 3. 404-Fehler & Tote Links ✅ KEINE

### Status

✅ **Alle 35 Sitemap-URLs antworten mit Status 200**

### Geprüfte URLs

- Alle Hauptseiten erreichbar
- Alle Blog-Posts erreichbar
- Alle Service-Seiten erreichbar
- Alle Regions-Seiten erreichbar

### Bewertung

Laut Google Search Console **2 Seiten als "Nicht gefunden (404)"** gemeldet, aber diese sind **nicht in der aktuellen Sitemap** enthalten. Dies deutet auf:

- Alte URLs aus früheren Versionen
- Gelöschte Seiten, die noch im Google-Index sind
- Externe Links auf nicht mehr existierende Seiten

**Empfehlung:** Diese 404-URLs in GSC prüfen und ggf. 301-Redirects einrichten

---

## 4. Canonical Tags ⚠️ UNVOLLSTÄNDIG

### Status

⚠️ **Nur auf 6 von 13 Seiten implementiert**

### Implementierte Canonical Tags

✅ Homepage: `https://headon.pro`
✅ /services: `https://headon.pro/services`
✅ /portfolio: `https://headon.pro/portfolio`
✅ /blog: `https://headon.pro/blog`
✅ /contact: `https://headon.pro/contact`
✅ /about: `https://headon.pro/about`

### Fehlende Canonical Tags

❌ **/imprint** - Keine Metadata, da Client Component
❌ **/privacy** - Keine Metadata, da Client Component
❌ **/regionen** - Canonical fehlt
❌ **/regionen/[city]** - Canonical fehlt für alle 6 Städte
❌ **/blog/[slug]** - Canonical fehlt für alle 14 Blog-Posts
❌ **/services/[slug]** - Canonical fehlt für alle 4 Service-Unterseiten
❌ **/portfolio/[slug]** - Canonical fehlt für Portfolio-Projekte

### Problem

- **Impressum & Datenschutz sind 'use client' Components** → Keine Metadata-Export möglich
- **Dynamische Routen fehlen Canonical-Implementation**

---

## 5. Duplicate Content ⚠️ RISIKO VORHANDEN

### Status

⚠️ **Potenzielle Duplicate Content Probleme**

### Identifizierte Probleme

#### A) Client-Side Pages ohne Metadata

**Betroffen:** `/imprint`, `/privacy`

- Beide Seiten nutzen `'use client'`
- Keine `export const metadata` möglich
- Kein Canonical Tag
- Fehlende Meta-Descriptions
- **Lösung:** Umstellung auf Server Components mit Client-Komponenten für Animationen

#### B) Regions-Seiten

**6 Stadt-Landingpages mit ähnlicher Struktur:**

- /regionen/bad-mergentheim
- /regionen/lauda-koenigshofen
- /regionen/marktheidenfeld
- /regionen/tauberbischofsheim
- /regionen/wertheim
- /regionen/wuerzburg

**Potenzial für Duplicate Content:**

- Ähnliche Seitenstruktur (Hero, Services, Case Studies)
- Möglicherweise ähnlicher Content über Städte hinweg
- **Canonical Tags fehlen komplett**

#### C) Blog-Posts

**14 Blog-Artikel ohne Canonical Tags**

- Korrekte Metadata vorhanden
- Canonical Tags fehlen in `metadata.ts`
- **Risiko:** Duplicate Content bei Pagination/Kategorien

#### D) Service-Unterseiten

**4 Service-Pages ohne Canonical Tags**

- /services/web-development
- /services/mobile-development
- /services/ui-ux-design
- /services/backend-solutions

---

## 6. Content-Qualität & SEO ⚠️ VERBESSERUNGSBEDARF

### "Gecrawlt – zurzeit nicht indexiert" (13 Seiten)

**Google's Bewertung:** Diese Seiten wurden gecrawlt, aber als **nicht wichtig genug** eingestuft.

### Mögliche Ursachen

#### A) Thin Content (Zu wenig Inhalt)

**Betroffene Seiten (Vermutung):**

- Regions-Seiten (wenn Inhalt zu dünn)
- Service-Unterseiten (wenn nur Aufzählungen)
- Portfolio-Projekt (wenn nur Bilder, wenig Text)

**Empfehlung:**

- Mindestens 800-1200 Wörter unique Content pro Seite
- Detaillierte Beschreibungen, nicht nur Listen
- Lokale Inhalte für jede Stadt (nicht copy-paste)

#### B) Duplicate/Similar Content

**Regions-Seiten Risiko:**
Wenn alle 6 Städte-Seiten ähnliche Texte haben:

```
"Webentwicklung in [Stadt]"
"Ihre Digitalagentur in [Stadt]"
"Services in [Stadt]"
```

**Lösung:**

- Unique Content für jede Stadt
- Lokale Case Studies
- Stadtspezifische Statistiken
- Lokale Kundenstimmen

#### C) Fehlende oder schwache Meta-Tags

**Problem bei Client Components:**

- Impressum & Datenschutz haben keine Meta-Tags
- Google bewertet Seiten ohne Descriptions niedriger

---

## 7. Meta-Tags Analyse

### Homepage ✅ EXCELLENT

```html
<title>Webentwicklung & Mobile Apps 4x schneller | KI-gestützte Digitalagentur</title>
<meta
  name="description"
  content="KI-gestützte Webentwicklung aus Lauda-Königshofen: 4x schneller, 2x bessere Performance..."
/>
<meta
  name="keywords"
  content="Webentwicklung Lauda-Königshofen, Web Development Baden-Württemberg..."
/>
<link rel="canonical" href="https://headon.pro" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:card" content="summary" />
```

✅ Alle wichtigen Tags vorhanden
✅ Gute Länge (Title: 64 Zeichen, Description: 166 Zeichen)
✅ Keywords vorhanden
✅ Open Graph vollständig
✅ Canonical korrekt

### Imprint & Privacy ❌ FEHLEND

```tsx
// app/imprint/page.tsx
'use client' // ← PROBLEM

export default function ImprintPage() {
  // Kein metadata Export möglich
}
```

**Fehlende Tags:**

- ❌ Title Tag (nutzt Parent Layout)
- ❌ Description
- ❌ Canonical
- ❌ Open Graph
- ❌ Robots Tag

---

## 8. Strukturierte Daten ✅ GUT

### Implementiert

✅ Organization Schema
✅ LocalBusiness Schema
✅ Article Schema (für Blog-Posts)
✅ Breadcrumbs (visuell implementiert)

### Empfehlungen

- ❌ **BreadcrumbList Schema fehlt** (nur visuell, kein JSON-LD)
- ❌ **FAQ Schema** könnte für Service-Seiten nützlich sein
- ❌ **Review/Rating Schema** für Portfolio-Projekte

---

## 9. Technische SEO ✅ SEHR GUT

### Performance

✅ Next.js 15 mit App Router
✅ Optimierte Bilder (next/image)
✅ Font Optimization
✅ Preconnect zu Analytics
✅ Umami Analytics (DSGVO-konform, kein Cookie-Banner nötig)

### Mobile-Friendly

✅ Responsive Design
✅ Meta Viewport korrekt
✅ Touch-optimiert

### Core Web Vitals

✅ Modern Stack (React 19, Next.js 15)
✅ Lazy Loading für Bilder
✅ Prefetching für Navigation

---

## 10. Detaillierte Probleme & Lösungen

### Problem 1: Client Components ohne Metadata

**Betroffen:** `/imprint`, `/privacy`

**Aktueller Code:**

```tsx
'use client'

export default function ImprintPage() {
  return (
    <>
      <HeroSection />
      <section>...</section>
    </>
  )
}
```

**Lösung A - Server Component mit Client Islands:**

```tsx
// app/imprint/page.tsx (Server Component)
import type { Metadata } from 'next'
import ImprintContent from './ImprintContent'

export const metadata: Metadata = {
  title: 'Impressum | HEADON.pro',
  description: 'Rechtliche Angaben und Kontaktdaten...',
  alternates: {
    canonical: 'https://headon.pro/imprint',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ImprintPage() {
  return <ImprintContent />
}
```

```tsx
// app/imprint/ImprintContent.tsx (Client Component)
'use client'

import { motion } from 'framer-motion'

export default function ImprintContent() {
  return (
    <>
      <HeroSection />
      {/* Rest of animated content */}
    </>
  )
}
```

**Lösung B - Layout mit Metadata:**

```tsx
// app/imprint/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | HEADON.pro',
  description: '...',
  alternates: { canonical: 'https://headon.pro/imprint' },
}

export default function ImprintLayout({ children }) {
  return children
}
```

---

### Problem 2: Fehlende Canonical Tags in dynamischen Routen

**Betroffen:** Blog-Posts, Service-Seiten, Regions-Seiten

**Blog-Post Lösung:**

```tsx
// app/blog/[slug]/metadata.ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `https://headon.pro/blog/${slug}`, // ← HINZUFÜGEN
    },
    // ... rest
  }
}
```

**Regions-Seite Lösung:**

```tsx
// app/regionen/[city]/metadata.ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { city } = await params
  const cityPage = await getCityPage(city)

  return {
    title: `${cityPage.frontmatter.name} | HEADON.pro`,
    description: cityPage.frontmatter.description,
    alternates: {
      canonical: `https://headon.pro/regionen/${city}`, // ← HINZUFÜGEN
    },
  }
}
```

---

### Problem 3: Regions-Seiten Content-Qualität

**Aktuelles Risiko:**
Wenn alle 6 Städte-Seiten ähnlichen Content haben, erkennt Google dies als Duplicate Content.

**Beispiel schlechter Content:**

```
Bad Mergentheim: "Ihre Digitalagentur in Bad Mergentheim"
Wertheim: "Ihre Digitalagentur in Wertheim"
```

**Empfehlung - Unique Content pro Stadt:**

**1. Lokale Statistiken:**

```markdown
# Webentwicklung in Bad Mergentheim

Mit über 23.000 Einwohnern und 1.800 Unternehmen ist Bad Mergentheim
ein wichtiger Wirtschaftsstandort im Main-Tauber-Kreis. Besonders die
Gesundheitsbranche (Klinik, Reha-Zentren) und der Tourismus profitieren
von digitalen Lösungen.
```

**2. Stadtspezifische Case Studies:**

```markdown
## Erfolgsgeschichte: Kurhotel Digitalisierung

Für das Kurhotel [Name] entwickelten wir ein Online-Buchungssystem
mit Wellness-Paket-Konfiguration...
```

**3. Lokale Keywords:**

```markdown
- "Webentwicklung Bad Mergentheim"
- "Online-Marketing Kurstadt"
- "Digitalisierung Gesundheitswesen Taubertal"
```

---

### Problem 4: Fehlende image-sitemap.xml

**In robots.txt referenziert:**

```
Sitemap: https://headon.pro/image-sitemap.xml
```

**Aber:** Diese Sitemap existiert nicht → 404

**Lösung:**

1. Entweder aus robots.txt entfernen
2. Oder Image-Sitemap generieren

**Image-Sitemap Beispiel:**

```tsx
// app/image-sitemap.xml/route.ts
export async function GET() {
  const images = [
    {
      loc: 'https://headon.pro/images/hero.jpg',
      caption: 'HEADON Digitalagentur',
      title: 'Hero Image',
    },
    // ... alle Bilder
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${images
        .map(
          (img) => `
        <url>
          <loc>https://headon.pro</loc>
          <image:image>
            <image:loc>${img.loc}</image:loc>
            <image:caption>${img.caption}</image:caption>
          </image:image>
        </url>
      `
        )
        .join('')}
    </urlset>`

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

---

## 11. Prioritäten & Action Items

### 🔴 KRITISCH (Sofort)

1. **Canonical Tags hinzufügen** (alle dynamischen Routen)
   - Blog-Posts: 14 Seiten
   - Service-Seiten: 4 Seiten
   - Regions-Seiten: 6 Seiten
   - **Impact:** Verhindert Duplicate Content Penalties

2. **Client Components zu Server Components umstellen**
   - /imprint
   - /privacy
   - **Impact:** Ermöglicht Metadata, verbessert SEO

3. **404-Seiten in GSC prüfen**
   - Welche 2 URLs sind betroffen?
   - 301-Redirects einrichten
   - **Impact:** Verhindert Ranking-Verlust

### 🟡 WICHTIG (Diese Woche)

4. **Regions-Seiten Content überarbeiten**
   - Unique Content für jede Stadt (min. 800 Wörter)
   - Lokale Statistiken
   - Stadtspezifische Case Studies
   - **Impact:** Löst "Gecrawlt – nicht indexiert" Problem

5. **BreadcrumbList Schema implementieren**
   - JSON-LD für alle Seiten mit Breadcrumbs
   - **Impact:** Bessere Darstellung in SERPs

6. **Image-Sitemap**
   - Entweder generieren oder aus robots.txt entfernen
   - **Impact:** Vermeidet 404-Fehler

### 🟢 MITTELFRISTIG (Nächste 2 Wochen)

7. **Content-Audit für 13 nicht-indexierte Seiten**
   - Identifizieren welche Seiten betroffen sind
   - Content-Länge auf min. 1000 Wörter erhöhen
   - Unique Value hinzufügen
   - **Impact:** Alle Seiten indexierbar

8. **FAQ-Schema für Service-Seiten**
   - Häufige Fragen pro Service
   - Rich Snippets in Google
   - **Impact:** Höhere Click-Through-Rate

9. **Portfolio-Projekte erweitern**
   - Mehr Case Studies
   - Detaillierte Projektbeschreibungen
   - Review/Rating Schema
   - **Impact:** Social Proof, besseres Ranking

---

## 12. Technische Implementation Checkliste

### Phase 1: Canonical Tags (1-2 Stunden)

```bash
# Dateien zu ändern:
app/blog/[slug]/metadata.ts
app/services/[slug]/metadata.ts (oder page.tsx wenn kein separates metadata)
app/regionen/[city]/metadata.ts
app/portfolio/[slug]/metadata.ts
app/regionen/page.tsx
```

**Beispiel-Code für alle:**

```tsx
alternates: {
  canonical: `https://headon.pro/${pfad}`,
}
```

### Phase 2: Server Components (2-3 Stunden)

**1. Impressum**

```bash
# Neue Dateien:
app/imprint/layout.tsx        # Metadata hier
app/imprint/ImprintContent.tsx # Client Component

# Anpassen:
app/imprint/page.tsx          # Nur noch Wrapper
```

**2. Datenschutz**

```bash
# Neue Dateien:
app/privacy/layout.tsx
app/privacy/PrivacyContent.tsx

# Anpassen:
app/privacy/page.tsx
```

### Phase 3: Content-Optimierung (8-16 Stunden)

**Für jede der 6 Regions-Seiten:**

1. Recherche lokaler Statistiken (30 min)
2. Schreiben unique Content (2 Stunden)
3. Lokale Keywords einbauen (15 min)
4. Review & QA (15 min)

**Pro Stadt = 3 Stunden**
**6 Städte = 18 Stunden** (kann parallelisiert werden)

---

## 13. Tracking & Monitoring

### Google Search Console Metriken

**Vor Optimierung (aktuell):**

- ✅ 0 Seiten mit 404
- ⚠️ 13 Seiten "Gecrawlt – nicht indexiert"
- ⚠️ 2 Seiten "Nicht gefunden"
- ⚠️ 1 Seite "Durch robots.txt blockiert"

**Ziel (nach 4 Wochen):**

- ✅ 0 Seiten mit 404
- ✅ 0 Seiten "Gecrawlt – nicht indexiert"
- ✅ 0 Seiten "Nicht gefunden"
- ✅ 1 Seite "Durch robots.txt blockiert" (akzeptabel)

### KPIs

**Indexierung:**

- Aktuell indexiert: ~20 Seiten (Schätzung)
- Ziel: 35 Seiten (alle Sitemap-URLs)

**Organic Traffic:**

- Baseline etablieren in GSC
- Ziel: +30% in 3 Monaten

**Rankings:**

- Fokus Keywords tracken
- Lokale Rankings für Städte

---

## 14. Zusammenfassung

### ✅ Was funktioniert gut

- Technische SEO-Grundlagen
- robots.txt Konfiguration
- Sitemap-Struktur
- Keine 404-Fehler in Sitemap
- Performance-Optimierung
- Metadata auf Hauptseiten

### ⚠️ Was verbessert werden muss

- **Canonical Tags fehlen auf 27 Seiten**
- **Client Components verhindern Metadata** (Impressum, Datenschutz)
- **Content-Qualität für 13 nicht-indexierte Seiten**
- **Duplicate Content Risiko bei Regions-Seiten**
- **Fehlende Structured Data** (Breadcrumbs, FAQ)

### 🎯 Wichtigste Maßnahme

**Content-Qualität der Regions-Seiten verbessern** → Löst vermutlich das Hauptproblem der 13 nicht-indexierten Seiten.

---

## 15. Geschätzter Aufwand

| Phase | Aufgabe                        | Aufwand | Priorität   |
| ----- | ------------------------------ | ------- | ----------- |
| 1     | Canonical Tags                 | 2h      | 🔴 Kritisch |
| 2     | Server Components              | 3h      | 🔴 Kritisch |
| 3     | 404 URLs prüfen + Redirects    | 1h      | 🔴 Kritisch |
| 4     | Regions-Content (6 Städte)     | 18h     | 🟡 Wichtig  |
| 5     | BreadcrumbList Schema          | 2h      | 🟡 Wichtig  |
| 6     | Image Sitemap                  | 1h      | 🟡 Wichtig  |
| 7     | FAQ Schema                     | 4h      | 🟢 Medium   |
| 8     | Content-Audit restliche Seiten | 8h      | 🟢 Medium   |

**Gesamt:** ~39 Stunden
**Sprint 1 (Kritisch):** ~6 Stunden → Sofort starten
**Sprint 2 (Wichtig):** ~21 Stunden → Diese Woche
**Sprint 3 (Medium):** ~12 Stunden → In 2 Wochen

---

## 16. Nächste Schritte

1. **Heute:**
   - Canonical Tags in metadata.ts Files hinzufügen
   - GSC prüfen: Welche 2 URLs sind 404?

2. **Diese Woche:**
   - Impressum & Datenschutz zu Server Components umstellen
   - 301-Redirects für 404-URLs einrichten
   - Content-Brief für Regions-Seiten erstellen

3. **Nächste 2 Wochen:**
   - Regions-Content schreiben (6 Städte)
   - BreadcrumbList Schema implementieren
   - Content-Audit für nicht-indexierte Seiten

4. **Monitoring:**
   - GSC wöchentlich prüfen
   - Indexierungsstatus überwachen
   - Rankings tracken

---

**Report erstellt am:** 06. Oktober 2025
**Nächster Review:** 20. Oktober 2025
**Kontakt:** HEADON.pro Team
