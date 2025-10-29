# Performance-Optimierungen für HEADON.pro

**Datum**: 29. Oktober 2025
**Aktueller Performance Score**: 92/100 (Mobile)
**Ziel**: 95-98/100

---

## Durchgeführte Code-Optimierungen

### 1. next.config.ts - Cache-Header-Optimierungen

#### Neue Cache-Regeln hinzugefügt:

**a) Statische Bilder (SVG, PNG, JPG, WebP, AVIF, ICO)**
```typescript
source: '/:path*.(svg|png|jpg|jpeg|gif|webp|avif|ico)'
Cache-Control: public, max-age=31536000, s-maxage=2592000, stale-while-revalidate=86400
```

**Verbesserung**:
- ✅ Browser-Cache: **1 Jahr** (vorher: 4 Stunden für SVG)
- ✅ CDN-Cache: **1 Monat** (s-maxage=2592000)
- ✅ Stale-while-revalidate: 1 Tag

**Erwartete Auswirkung**:
- Logo und Icons werden vom CDN ausgeliefert statt vom Origin
- Cache-Hit-Ratio steigt von ~60% auf ~85%+
- Reduzierte Origin-Last

---

**b) HTML-Seiten (Homepage, Blog, Services, etc.)**
```typescript
source: '/((?!api|_next/static|_next/image).*)'
Cache-Control: public, max-age=300, s-maxage=7200, stale-while-revalidate=3600
```

**Verbesserung**:
- ✅ Browser-Cache: **5 Minuten** (Balance: Frische vs. Performance)
- ✅ CDN-Cache: **2 Stunden** (s-maxage=7200)
- ✅ Stale-while-revalidate: 1 Stunde

**Erwartete Auswirkung**:
- HTML wird von Cloudflare CDN gecacht
- TTFB (Time to First Byte) verbessert sich von 50ms auf ~20-30ms
- Origin-Server-Entlastung: 70-80% weniger HTML-Requests

---

### 2. Bereits optimale Konfiguration (keine Änderung nötig)

**Layout.tsx**:
- ✅ Fonts bereits mit `display: 'swap'`, `preload: true`, `adjustFontFallback: true`
- ✅ Logo bereits mit preload: `<link rel="preload" href="/headon-logo.svg" as="image" type="image/svg+xml" />`
- ✅ Analytics mit preconnect optimiert

**HeroSection.tsx**:
- ✅ Kritischer Text ohne Animation (LCP-Element)
- ✅ Animations-Initialisierung verzögert
- ✅ Mobile-optimierte Animationen (weniger Orbs, kürzere Dauer)
- ✅ Reduced-Motion Support
- ✅ Priority-Image für Logo

---

## Cloudflare CDN Einstellungen (Manuell durchzuführen)

Die folgenden Einstellungen müssen im **Cloudflare Dashboard** vorgenommen werden:

### Option 1: Page Rules anpassen (kostenfrei, aber limitiert)

**Problem**: Free Plan hat nur 3 Page Rules, alle bereits in Verwendung.

**Lösung**: Bestehende Page Rule erweitern oder ersetzen.

#### Empfohlene Page Rule Konfiguration:

**Rule 1 (Priorität 1)**: Next.js Static Assets
```
URL: *headon.pro/_next/static/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 year
```

**Rule 2 (Priorität 2)**: Next.js Images
```
URL: *headon.pro/_next/image/*
- Cache Level: Cache Everything
- Edge Cache TTL: 1 week
- Browser Cache TTL: 1 day
```

**Rule 3 (Priorität 3)**: API Bypass
```
URL: *headon.pro/api/*
- Cache Level: Bypass
```

---

### Option 2: Cache Rules nutzen (kostenfrei, empfohlen!)

**Navigation**: Cloudflare Dashboard → Caching → Cache Rules

**Vorteil**: Free Plan hat **10 Cache Rules** (vs. 3 Page Rules)

#### Cache Rule für statische Assets:

**Name**: "Static Assets Extended Cache"
```yaml
When incoming requests match:
  - (http.request.uri.path matches ".*\.(svg|png|jpg|jpeg|gif|webp|avif|ico)$")

Then:
  - Cache Eligibility: Eligible for cache
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: Use existing headers (from next.config.ts)
```

#### Cache Rule für HTML:

**Name**: "HTML Pages CDN Cache"
```yaml
When incoming requests match:
  - (http.request.uri.path does not contain "/api/")
  - (http.request.uri.path does not contain "/_next/static/")
  - (http.request.uri.path does not contain "/_next/image/")

Then:
  - Cache Eligibility: Eligible for cache
  - Edge Cache TTL: Respect origin (nutzt s-maxage aus next.config.ts)
  - Browser Cache TTL: Respect origin
```

---

### Zusätzliche Cloudflare-Optimierungen

#### 1. Early Hints aktivieren (kostenfrei)

**Navigation**: Speed → Optimization → Early Hints

```yaml
✅ Early Hints: ON
```

**Nutzen**:
- Sendet Link-Header früher (während HTML generiert wird)
- Fonts und kritische Assets laden früher
- Verbessert FCP und LCP um 100-200ms

---

#### 2. Prefetch URLs aktivieren (kostenfrei)

**Navigation**: Speed → Optimization → Prefetch URLs

```yaml
✅ Prefetch URLs: ON
```

**Nutzen**:
- Automatisches Prefetching von Links bei Hover
- Schnellere Seitenwechsel
- Bessere Nutzererfahrung

---

#### 3. Browser Cache TTL auf "Respect Existing Headers" setzen

**Navigation**: Caching → Configuration → Browser Cache TTL

```yaml
Browser Cache TTL: Respect Existing Headers
```

**Wichtig**: Damit nutzt Cloudflare die Cache-Header aus next.config.ts!

---

## Erwartete Performance-Verbesserungen

### Nach Code-Deployment:

| Metrik | Vorher | Nachher (erwartet) | Verbesserung |
|--------|--------|-------------------|--------------|
| **Performance Score** | 92 | 94-96 | +2-4 Punkte |
| **LCP** | 3.2s | 2.5-2.8s | -15-20% |
| **TTFB** | 50ms | 30-40ms | -20-40% |
| **Cache-Hit-Ratio** | ~60% | 80-85% | +20-25% |

### Nach Cloudflare-Optimierungen:

| Metrik | Vorher | Nachher (erwartet) | Verbesserung |
|--------|--------|-------------------|--------------|
| **Performance Score** | 92 | 95-98 | +3-6 Punkte |
| **LCP** | 3.2s | 1.8-2.2s | -30-45% |
| **TTFB** | 50ms | 20-30ms | -40-60% |
| **FCP** | 1.7s | 1.2-1.5s | -15-30% |
| **Cache-Hit-Ratio** | ~60% | 85-90% | +25-30% |

---

## Deployment-Schritte

### 1. Code-Änderungen deployen

```bash
# Lokal testen
pnpm build
pnpm start

# Lighthouse-Test vor Deployment
lighthouse http://localhost:3000 --only-categories=performance --form-factor=mobile

# Git commit und push
git add next.config.ts
git commit -m "perf: Optimize cache headers for CDN and static assets

- Add long-term caching for SVG, PNG, JPG, WebP, AVIF, ICO (1 year browser, 1 month CDN)
- Enable HTML page caching with s-maxage=7200 (2 hours CDN cache)
- Improve cache-hit ratio and reduce origin load
- Expected performance improvement: +2-4 Lighthouse points"

git push origin main
```

### 2. Nach Deployment (Cloudflare Cache leeren)

**Option A**: Cloudflare Dashboard
1. Dashboard → Caching → Configuration
2. "Purge Everything" → Bestätigen
3. 5 Minuten warten (Cache Warmup)

**Option B**: GitHub Actions (automatisiert)
- Bereits im CI/CD konfiguriert
- Cache wird automatisch nach Deployment geleert

---

### 3. Cloudflare Cache Rules erstellen

1. Dashboard → Caching → Cache Rules
2. "Create rule" klicken
3. Regeln aus Abschnitt "Option 2" übernehmen
4. Speichern

---

### 4. Cloudflare-Optimierungen aktivieren

**Checklist**:
- [ ] Early Hints aktivieren (Speed → Optimization)
- [ ] Prefetch URLs aktivieren (Speed → Optimization)
- [ ] Browser Cache TTL auf "Respect Existing Headers" setzen
- [ ] Cache Rules für HTML + Static Assets erstellen

---

## Testing & Validierung

### Nach 2 Stunden (Cache Warmup):

```bash
# Performance-Test durchführen
pnpm dlx lighthouse https://headon.pro --only-categories=performance --form-factor=mobile --output=html --output-path=./lighthouse-after-optimization.html

# Cache-Status überprüfen
curl -I https://headon.pro/ | grep -E "cf-cache-status|cache-control"
# Erwartete Ausgabe: cf-cache-status: HIT

curl -I https://headon.pro/headon-logo.svg | grep -E "cf-cache-status|cache-control"
# Erwartete Ausgabe: cf-cache-status: HIT, cache-control: public, max-age=31536000
```

### Cache-Hit-Ratio überwachen:

**Cloudflare Dashboard**:
1. Analytics → Traffic
2. "Cached Requests" Chart prüfen

**Ziel**: 80-90% Cache-Hit-Ratio nach 24-48 Stunden

---

## Weitere Optimierungsmöglichkeiten (Langfristig)

### 1. Hero-Section refactoren (Aufwand: Hoch, Impact: Mittel)

**Problem**: LCP-Element ist in Client Component mit Framer Motion
**Lösung**: Text-Content in Server Component auslagern

**Beispiel-Struktur**:
```tsx
// components/sections/HeroContent.tsx (Server Component)
export default function HeroContent() {
  return (
    <div className="relative z-10">
      <h1>Kreativ- & Digitalagentur</h1>
      <p>Als Kreativ- und Marketingagentur...</p>
    </div>
  )
}

// components/sections/HeroSection.tsx (Client Component)
'use client'
export default function HeroSection() {
  return (
    <section>
      {/* Animated Background */}
      <HeroContent /> {/* Server-rendered, schneller LCP */}
    </section>
  )
}
```

**Erwarteter Impact**: LCP -300-500ms

---

### 2. Framer Motion Code-Splitting (Aufwand: Mittel, Impact: Gering)

```tsx
// Lazy Load Framer Motion
const motion = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion })), {
  ssr: false
})
```

**Erwarteter Impact**: Initial Bundle -30-50KB

---

### 3. Image-CDN evaluieren (Kosten: $10/Monat)

**Cloudflare Images**:
- Automatische WebP/AVIF-Konvertierung am Edge
- Responsive Resizing
- Verlustfreie Kompression

**Alternative (kostenfrei)**: Next.js Image Optimization bereits aktiv ✅

---

## Monitoring

### KPIs tracken:

**Täglich** (erste Woche):
- Cloudflare Cache-Hit-Ratio (Ziel: 80%+)
- TTFB im Real User Monitoring
- Cloudflare Analytics: Bandwidth Saved

**Wöchentlich**:
- Lighthouse-Score (Mobile + Desktop)
- Core Web Vitals (CrUX-Daten)
- Origin-Server-Last (Requests/min)

**Monatlich**:
- Performance-Regression-Tests
- Cloudflare-Kosten (sollte bei $0 bleiben)

---

## Troubleshooting

### Problem: Cache-Hit-Ratio unter 70%

**Diagnose**:
```bash
curl -I https://headon.pro/ | grep cf-cache-status
# Wenn DYNAMIC oder BYPASS → Cache Rules überprüfen
```

**Lösung**:
1. Cache Rules nochmal überprüfen
2. Sicherstellen, dass s-maxage in Cache-Control vorhanden ist
3. Cookies entfernen (falls vorhanden)

---

### Problem: LCP verschlechtert sich nach Deployment

**Diagnose**:
```bash
lighthouse https://headon.pro --only-categories=performance --form-factor=mobile
```

**Mögliche Ursachen**:
1. Cloudflare Cache ist kalt → 2 Stunden warten
2. Early Hints nicht aktiviert → In Dashboard aktivieren
3. Font-Preload fehlt → Layout.tsx überprüfen

---

### Problem: HTML wird nicht gecacht (cf-cache-status: DYNAMIC)

**Ursache**: Cloudflare cached standardmäßig keine HTML ohne explizite Rule

**Lösung**:
1. Cache Rule für HTML erstellen (siehe oben)
2. ODER: `s-maxage` in Cache-Control erhöhen (bereits auf 7200 = 2h)
3. Warten auf Cloudflare Cache Rule Propagation (5-10 Minuten)

---

## Zusammenfassung

### ✅ Umgesetzt (Code):
1. next.config.ts mit optimierten Cache-Headern für:
   - Statische Bilder (SVG, PNG, JPG, WebP, AVIF, ICO)
   - HTML-Seiten mit CDN-Caching
2. Alle bestehenden Optimierungen beibehalten (Fonts, Preload, etc.)

### 📋 Noch umzusetzen (Cloudflare Dashboard):
1. Cache Rules erstellen (HTML + Static Assets)
2. Early Hints aktivieren
3. Prefetch URLs aktivieren
4. Browser Cache TTL auf "Respect Existing Headers" setzen

### 📊 Erwartete Ergebnisse:
- Performance Score: **92 → 95-98** (+3-6 Punkte)
- LCP: **3.2s → 1.8-2.2s** (-30-45%)
- TTFB: **50ms → 20-30ms** (-40-60%)
- Cache-Hit-Ratio: **60% → 85-90%** (+25-30%)

---

**Erstellt**: 29. Oktober 2025
**Autor**: Claude Code
**Status**: Code-Optimierungen abgeschlossen, Cloudflare-Konfiguration ausstehend
