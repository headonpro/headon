# Performance Testing Guide für HEADON.pro

## Übersicht

Dieses Dokument beschreibt alle verfügbaren Performance-Testing-Tools und Workflows für HEADON.pro, insbesondere im Kontext der CDN-Implementierung mit Cloudflare.

## Quick Start

### CDN Performance Test (Eigenes Script)

```bash
# Test Production
./scripts/test-cdn-performance.sh https://headon.pro

# Test Staging (falls vorhanden)
./scripts/test-cdn-performance.sh https://staging.headon.pro

# Test Local (ohne CDN)
./scripts/test-cdn-performance.sh http://localhost:3000
```

**Was wird getestet:**
- ✅ Cache-Status für verschiedene Asset-Typen
- ✅ Response-Zeiten
- ✅ Cloudflare-Erkennung (DNS, Server-Header)
- ✅ Cache-Control Headers
- ✅ HTTP-Status-Codes

**Erwartete Ausgabe:**
```
Testing: Next.js Static (webpack.js)
  Status:        200
  Server:        cloudflare
  Cache Status:  HIT
  Cache-Control: public, max-age=31536000, immutable
  Response Time: 0.123s
```

---

## Lighthouse Performance Audit

### Installation nicht erforderlich

Lighthouse ist über `npx` verfügbar.

### Single-Page Test

```bash
# Homepage testen
pnpm dlx lighthouse https://headon.pro --output=html --output-path=./lighthouse-report.html

# Bestimmte Seite testen
pnpm dlx lighthouse https://headon.pro/blog --output=html --output-path=./lighthouse-blog.html

# Nur Performance-Kategorie
pnpm dlx lighthouse https://headon.pro --only-categories=performance --output=json --output-path=./perf.json
```

### Multiple Pages testen (Unlighthouse)

```bash
# Alle Seiten der Domain crawlen und testen
pnpm dlx @unlighthouse/cli --site https://headon.pro

# Mit spezifischer Route
pnpm dlx @unlighthouse/cli --site https://headon.pro --urls /,/blog,/portfolio,/services

# Nur Performance-Tests
pnpm dlx @unlighthouse/cli --site https://headon.pro --only-categories=performance
```

**Output**: Interaktives Dashboard auf `http://localhost:5678`

### Performance-Metriken verstehen

#### Core Web Vitals (wichtig für SEO)

| Metrik | Gut | Verbesserungsbedürftig | Schlecht |
|--------|-----|------------------------|----------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (First Input Delay) | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

#### Weitere wichtige Metriken

| Metrik | Beschreibung | Ziel |
|--------|--------------|------|
| **TTFB** | Time to First Byte | < 600ms |
| **FCP** | First Contentful Paint | < 1.8s |
| **Speed Index** | Wie schnell Inhalte visuell geladen werden | < 3.4s |
| **TTI** | Time to Interactive | < 3.8s |
| **TBT** | Total Blocking Time | < 200ms |

#### Lighthouse Score Interpretation

```
90-100:  Excellent ✅ (Ziel für HEADON.pro)
50-89:   Needs Improvement ⚠️
0-49:    Poor ❌
```

---

## WebPageTest (Multi-Location Testing)

### Online-Tool (empfohlen)

1. Gehe zu: https://www.webpagetest.org/
2. URL eingeben: `https://headon.pro`
3. Test Configuration:
   - **Test Location**: Frankfurt, Germany (nächster Cloudflare PoP)
   - **Browser**: Chrome
   - **Connection**: 4G / LTE (realistisch für mobile)
   - **Number of Tests**: 3 (für Durchschnitt)
   - **Repeat View**: First View + Repeat View (Cache-Test)

4. **Advanced Settings**:
   - Capture Video: ✅
   - Capture Filmstrip: ✅
   - Keep Test Private: ✅ (optional)

### API-Nutzung (automatisiert)

```bash
# API Key erforderlich (kostenlos auf webpagetest.org)
API_KEY="your-api-key"

curl "https://www.webpagetest.org/runtest.php?url=https://headon.pro&location=Frankfurt:Chrome&k=$API_KEY&f=json"
```

### Metriken vergleichen (vor/nach CDN)

**Erwartete Verbesserungen mit Cloudflare CDN:**

| Metrik | Vor CDN | Nach CDN | Verbesserung |
|--------|---------|----------|--------------|
| TTFB | ~600ms | ~200ms | -67% |
| Start Render | ~1.8s | ~0.9s | -50% |
| Speed Index | ~3.0s | ~1.5s | -50% |
| LCP | ~2.5s | ~1.2s | -52% |
| Document Complete | ~4.5s | ~2.5s | -44% |

---

## Pingdom Website Speed Test

### Online-Tool

1. Gehe zu: https://tools.pingdom.com/
2. URL eingeben: `https://headon.pro`
3. Test Location: **Frankfurt, Germany**
4. Klicke "Start Test"

### Wichtige Metriken

- **Performance Grade**: Ziel A (> 90)
- **Load Time**: Ziel < 2 Sekunden
- **Page Size**: Monitor für Größenänderungen
- **Requests**: Baseline für Vergleiche

### Waterfall-Analyse

Pingdom zeigt eine detaillierte Waterfall-Chart:
- 🟢 **Grün**: DNS Lookup
- 🟡 **Gelb**: Initial Connection (TCP)
- 🟠 **Orange**: SSL Negotiation
- 🔵 **Blau**: Time to First Byte
- 🟣 **Lila**: Content Download

**Mit CDN solltest du sehen:**
- Deutlich kürzere TTFB (blau)
- Schnellerer SSL-Handshake (orange)
- Paralleles Laden von Assets

---

## GTmetrix (umfassende Analyse)

### Online-Tool

1. Gehe zu: https://gtmetrix.com/
2. URL eingeben: `https://headon.pro`
3. **Analysis Options**:
   - Test Server: Frankfurt, Germany
   - Browser: Chrome (Desktop)
   - Connection: Unthrottled

### GTmetrix Scores

- **Performance Score** (0-100%): Lighthouse-basiert
- **Structure Score** (0-100%): Best Practices

**Ziel**: Beide > 90%

### PageSpeed Insights Empfehlungen

GTmetrix zeigt konkrete Optimierungsvorschläge:
- Eliminate render-blocking resources
- Properly size images
- Efficiently encode images
- Serve images in next-gen formats (WebP, AVIF)
- Remove unused JavaScript
- Reduce initial server response time

---

## Google PageSpeed Insights

### Online-Tool

1. Gehe zu: https://pagespeed.web.dev/
2. URL eingeben: `https://headon.pro`
3. Analysieren

### Field Data vs Lab Data

**Field Data** (Real User Monitoring):
- Basiert auf echten Chrome-Nutzerdaten (CrUX)
- Nur verfügbar bei ausreichend Traffic
- **Wichtig für SEO-Ranking**

**Lab Data** (Lighthouse):
- Simulierte Tests unter kontrollierten Bedingungen
- Immer verfügbar
- Gut für Entwicklung und Vergleiche

### Core Web Vitals Status

```
✅ Passed Core Web Vitals Assessment
   LCP: 1.2s (good)
   FID: 45ms (good)
   CLS: 0.05 (good)
```

**Ziel**: Alle 3 Metriken im "grünen" Bereich

---

## Local Performance Testing

### Chrome DevTools (integriert)

#### Lighthouse Tab

1. Chrome öffnen → `https://headon.pro`
2. DevTools öffnen (F12)
3. **Lighthouse** Tab
4. Categories auswählen (alle oder nur Performance)
5. "Analyze page load" klicken

**Vorteile**:
- Keine Installation nötig
- Sofortige Ergebnisse
- Detaillierte Opportunities & Diagnostics

#### Performance Tab

1. DevTools → **Performance** Tab
2. Reload-Button klicken (oder Strg+Shift+R)
3. Seite lädt und Recording stoppt automatisch

**Analyse**:
- **Flamegraph**: JavaScript Execution Time
- **Network**: Request-Timeline
- **Main Thread**: Rendering & Scripting

**Was suchen?**:
- 🔴 Lange Tasks (> 50ms) → JavaScript-Optimierung nötig
- 🟡 Layout Shifts → CLS-Problem
- 🟢 Idle Time → Gut!

#### Network Tab

1. DevTools → **Network** Tab
2. Seite neu laden (Strg+R)
3. **Disable cache** aktivieren für echten Test

**Wichtige Spalten**:
- **Size**: Download-Größe
- **Time**: Download-Zeit
- **Waterfall**: Visueller Request-Flow

**Filter nutzen**:
```
# Nur Bilder anzeigen
type:image

# Größere Dateien (> 500KB)
larger-than:500k

# Langsame Requests (> 1s)
-larger-than:0 -took-longer-than:1000

# Cache-Status (mit Cloudflare)
cf-cache-status:HIT
```

---

## Bundle Analysis

### Next.js Bundle Analyzer

```bash
# Installiere Bundle Analyzer
pnpm add -D @next/bundle-analyzer

# Bundle analysieren
ANALYZE=true pnpm build
```

**Output**: Interaktive Treemap im Browser

**Was suchen?**:
- 🔴 Große Pakete (> 100KB) → Code-Splitting prüfen
- 🟡 Duplicate Dependencies → Deduplizieren
- 🟢 Tree-Shaking funktioniert

### Webpack Bundle Analyzer (Alternative)

Bereits integriert in Next.js Bundle Analyzer.

---

## Continous Performance Monitoring

### Lighthouse CI (für CI/CD)

```bash
# Installation
pnpm add -D @lhci/cli

# Lighthouse CI Config erstellen
cat > lighthouserc.json <<EOF
{
  "ci": {
    "collect": {
      "startServerCommand": "pnpm start",
      "url": ["http://localhost:3000", "http://localhost:3000/blog"]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
EOF

# Test lokal
pnpm dlx @lhci/cli autorun
```

### GitHub Actions Integration

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 22
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm build
      - name: Run Lighthouse CI
        run: |
          pnpm dlx @lhci/cli@0.12.x autorun
```

---

## CDN-spezifische Tests

### Cache-Hit-Ratio messen

```bash
# 10 Requests an gleiche URL
for i in {1..10}; do
  echo "Request $i:"
  curl -sI https://headon.pro/_next/static/chunks/main.js | grep cf-cache-status
done

# Erwartung:
# Request 1: MISS (kalt)
# Request 2-10: HIT (gecacht)
```

### Edge Response Time vergleichen

```bash
# Verschiedene Cloudflare Edge-Locations testen
# Nutze VPN oder Proxy-Services für andere Standorte

# Frankfurt (lokal)
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://headon.pro

# London (VPN)
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://headon.pro

# New York (VPN)
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://headon.pro
```

### Compression-Test

```bash
# Prüfe Brotli vs. Gzip
curl -H "Accept-Encoding: br" -I https://headon.pro | grep -i content-encoding
# Erwartung: content-encoding: br

curl -H "Accept-Encoding: gzip" -I https://headon.pro | grep -i content-encoding
# Erwartung: content-encoding: gzip
```

---

## Performance Budget

### Definierte Limits für HEADON.pro

```json
{
  "budgets": [
    {
      "resourceType": "document",
      "budget": 50
    },
    {
      "resourceType": "script",
      "budget": 300
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    },
    {
      "resourceType": "image",
      "budget": 500
    },
    {
      "resourceType": "font",
      "budget": 100
    },
    {
      "resourceType": "total",
      "budget": 1000
    }
  ]
}
```

**Einheit**: Kilobytes (KB)

### Budget in Lighthouse CI prüfen

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "resource-summary:script:size": ["error", {"maxNumericValue": 300000}],
        "resource-summary:image:size": ["error", {"maxNumericValue": 500000}]
      }
    }
  }
}
```

---

## Testing-Workflow: Vor/Nach CDN

### 1. Baseline erstellen (vor CDN)

```bash
# Lighthouse Baseline
pnpm dlx lighthouse https://headon.pro --output=html --output-path=./reports/before-cdn.html

# WebPageTest Baseline
# Manuell über https://www.webpagetest.org/ → Screenshot speichern

# CDN Test Script (sollte keine Cloudflare-Header zeigen)
./scripts/test-cdn-performance.sh https://headon.pro > reports/before-cdn-headers.txt
```

### 2. Cloudflare aktivieren

Siehe: `docs/CDN-SETUP-CLOUDFLARE.md`

### 3. Warmup-Phase (24-48 Stunden)

```bash
# Cache warmlaufen lassen durch mehrfache Requests
for url in \
  "https://headon.pro" \
  "https://headon.pro/blog" \
  "https://headon.pro/portfolio" \
  "https://headon.pro/services"
do
  curl -s "$url" > /dev/null
  echo "Warmed up: $url"
done
```

### 4. Nach-CDN Tests durchführen

```bash
# Lighthouse Nach-CDN
pnpm dlx lighthouse https://headon.pro --output=html --output-path=./reports/after-cdn.html

# CDN Test Script
./scripts/test-cdn-performance.sh https://headon.pro > reports/after-cdn-headers.txt

# WebPageTest Nach-CDN
# Manuell über https://www.webpagetest.org/ → Screenshot speichern
```

### 5. Vergleich & Analyse

```bash
# Lighthouse Scores vergleichen
# Öffne beide HTML-Reports und vergleiche:
# - Performance Score
# - LCP, FID, CLS
# - TTFB
# - Speed Index

# Header-Diff
diff reports/before-cdn-headers.txt reports/after-cdn-headers.txt
```

**Erwartete Unterschiede**:
- ✅ `server: cloudflare` (statt nginx/apache)
- ✅ `cf-cache-status: HIT` (für statische Assets)
- ✅ Schnellere Response-Zeiten
- ✅ `content-encoding: br` (Brotli statt Gzip)

---

## Monitoring in Production

### Cloudflare Analytics Dashboard

**Navigation**: Cloudflare Dashboard → Analytics & Logs

**KPIs überwachen**:
- **Cache Hit Ratio**: Ziel > 70%
- **Bandwidth Saved**: Durch Caching gespart
- **Threats Mitigated**: Blockierte Anfragen
- **Status Codes**: 4xx/5xx Fehler

### Umami Analytics Integration

Eigene Umami-Installation (bereits vorhanden) trackt:
- Page Load Times (teilweise)
- User-Flows
- Bounce-Rate (indirekt Performance-Indikator)

**Performance-Einfluss**:
- Langsame Seiten → höhere Bounce-Rate
- Schnelle Seiten → mehr Seitenaufrufe/Session

---

## Troubleshooting Performance-Probleme

### Problem: Lighthouse Score < 80

**Diagnose**:
```bash
pnpm dlx lighthouse https://headon.pro --only-categories=performance --view
```

**Häufige Ursachen**:
1. **Große JavaScript Bundles** → Code-Splitting prüfen
2. **Unoptimierte Bilder** → Next.js Image-Component verwenden
3. **Render-Blocking Resources** → Async/Defer für Scripts
4. **Langsamer Server** → CDN sollte helfen

---

### Problem: Cache-Hit-Ratio < 50%

**Diagnose**:
```bash
./scripts/test-cdn-performance.sh https://headon.pro
```

**Ursachen**:
- Page Rules falsch konfiguriert
- Cookies auf allen Requests (verhindert Caching)
- `Cache-Control: private` Header (siehe next.config.ts)

**Lösung**: Siehe `docs/CDN-SETUP-CLOUDFLARE.md` → Troubleshooting

---

### Problem: LCP > 2.5s

**Diagnose**:
- Chrome DevTools → Lighthouse → "View Trace"
- Suche das LCP-Element (meist Hero-Image)

**Lösungen**:
1. **Preload** kritische Ressourcen:
   ```html
   <link rel="preload" as="image" href="/hero-bg.jpg" />
   ```
2. **Priority Hints** verwenden:
   ```jsx
   <Image priority src="/hero-bg.jpg" />
   ```
3. **Bildgröße optimieren**:
   ```bash
   # Mit Sharp (Next.js nutzt das intern)
   pnpm dlx @squoosh/cli --resize 1920x1080 hero-bg.jpg
   ```

---

## Checkliste: Performance Testing

### Vor Deployment

- [ ] **Lighthouse Audit lokal**: Score > 90
- [ ] **Bundle Size Check**: < 300KB JS, < 50KB CSS
- [ ] **Image Optimization**: Alle Bilder durch Next.js Image
- [ ] **TypeScript Build**: Keine Errors
- [ ] **ESLint**: Keine Warnings

### Nach CDN-Aktivierung

- [ ] **Cache-Status Test**: Statische Assets zeigen `HIT`
- [ ] **Lighthouse Production**: Score > 90
- [ ] **WebPageTest**: TTFB < 200ms, LCP < 1.5s
- [ ] **Cloudflare Analytics**: Cache-Hit-Ratio > 70%
- [ ] **DNS Propagation**: Nameservers zeigen Cloudflare

### Monatlich

- [ ] **Lighthouse Trend**: Score-Entwicklung tracken
- [ ] **Bundle Size Monitor**: Keine unerwarteten Anstiege
- [ ] **Core Web Vitals**: PageSpeed Insights checken
- [ ] **Cloudflare Analytics**: Bandwidth & Performance

---

## Nützliche Links

### Tools
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- WebPageTest: https://www.webpagetest.org/
- Pingdom: https://tools.pingdom.com/
- GTmetrix: https://gtmetrix.com/
- PageSpeed Insights: https://pagespeed.web.dev/

### Dokumentation
- Web Vitals: https://web.dev/vitals/
- Next.js Performance: https://nextjs.org/docs/advanced-features/measuring-performance
- Cloudflare Analytics: https://developers.cloudflare.com/analytics/

### Learning Resources
- Web.dev Learn Performance: https://web.dev/learn/#performance
- Chrome DevTools Docs: https://developer.chrome.com/docs/devtools/

---

**Erstellt für**: HEADON.pro Next.js Website
**Autor**: Claude Code
**Letzte Aktualisierung**: 29. Oktober 2025
