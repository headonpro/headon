# Google Search Console 404-Fehler beheben

## Anleitung: 404-URLs aus GSC prüfen und Redirects einrichten

### Schritt 1: 404-URLs in Google Search Console finden

1. Öffne [Google Search Console](https://search.google.com/search-console)
2. Wähle die Property `headon.pro` aus
3. Gehe zu **Indexierung** → **Seiten**
4. Scrolle nach unten zum Bereich **"Warum Seiten nicht indexiert sind"**
5. Klicke auf **"Nicht gefunden (404)"** (aktuell: 2 Seiten)
6. Notiere dir alle URLs aus der Liste

### Schritt 2: URLs analysieren

Für jede gefundene 404-URL entscheide:

**Option A: URL existiert unter neuem Namen**

- Beispiel: `/blog/old-slug` → `/blog/new-slug`
- **Aktion:** 301-Redirect einrichten (siehe unten)

**Option B: URL wurde gelöscht und Inhalt existiert nicht mehr**

- Beispiel: `/old-service` (Service wurde eingestellt)
- **Aktion:** 410-Gone Status oder auf Homepage umleiten

**Option C: URL sollte nie existiert haben**

- Beispiel: `/api/test` (interner Entwicklungs-Endpoint)
- **Aktion:** In Google Search Console als "Gelöscht" markieren

### Schritt 3: 301-Redirects einrichten

Öffne die Datei `middleware.ts` im Projekt-Root und füge deine Redirects hinzu:

```typescript
const redirects: Record<string, string> = {
  // Beispiele:
  '/blog/alte-url': '/blog/neue-url',
  '/old-service': '/services',
  '/kontakt': '/contact',

  // Deine URLs aus GSC hier eintragen:
  // '/404-url-1': '/neue-ziel-url-1',
  // '/404-url-2': '/neue-ziel-url-2',
}
```

### Schritt 4: Testen

Nachdem du die Redirects eingetragen hast:

1. **Lokal testen:**

   ```bash
   pnpm dev
   # Besuche http://localhost:3000/alte-url
   # Sollte zu neuer URL umleiten
   ```

2. **Nach Deployment testen:**
   ```bash
   curl -I https://headon.pro/alte-url
   # Sollte "HTTP/2 301" zeigen
   # Mit "location: https://headon.pro/neue-url"
   ```

### Schritt 5: Google benachrichtigen

1. Gehe zurück zur Google Search Console
2. **Indexierung** → **URL-Prüfung**
3. Gib die alte URL ein
4. Klicke auf **"Indexierung beantragen"** für die neue URL
5. Wiederhole für alle umgeleiteten URLs

### Schritt 6: Überwachung

Nach 1-2 Wochen:

- Prüfe GSC → **Seiten** → **"Nicht gefunden (404)"**
- Die Anzahl sollte auf 0 gesunken sein
- Falls nicht, prüfe die Redirects erneut

## Häufige 404-Ursachen

### 1. Alte Blog-URLs

**Problem:** Blog-Post wurde umbenannt

```typescript
'/blog/old-slug': '/blog/new-slug',
```

### 2. Service-URLs geändert

**Problem:** Service-Struktur wurde umgebaut

```typescript
'/services/old-name': '/services/new-name',
```

### 3. Regionen-URLs

**Problem:** Stadt-URLs wurden geändert

```typescript
'/stadt/bad-mergentheim': '/regionen/bad-mergentheim',
```

### 4. Portfolio-Projekte

**Problem:** Projekt-URLs umbenannt

```typescript
'/portfolio/old-project': '/portfolio/new-project',
```

### 5. Rechtliche Seiten

**Problem:** Impressum/Datenschutz URL geändert

```typescript
'/impressum': '/imprint',
'/datenschutz': '/privacy',
```

## Spezialfall: Masse-Redirects

Wenn du viele ähnliche URLs hast (z.B. alle Blog-Posts mit altem Präfix):

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Pattern-basierte Redirects
  if (pathname.startsWith('/blog/old-')) {
    const newSlug = pathname.replace('/blog/old-', '/blog/')
    const newUrl = new URL(newSlug, request.url)
    return NextResponse.redirect(newUrl, 301)
  }

  // Einzelne Redirects
  if (redirects[pathname]) {
    const newUrl = new URL(redirects[pathname], request.url)
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}
```

## Best Practices

1. **301 vs 302:**
   - 301 = Permanent (für SEO immer besser)
   - 302 = Temporär (nur wenn die alte URL zurückkommt)

2. **Redirect-Ketten vermeiden:**
   - ❌ `/old` → `/temp` → `/new`
   - ✅ `/old` → `/new`

3. **Relative Redirects:**
   - Nutze immer absolute Pfade: `/new-path`
   - Nicht: `new-path` oder `../new-path`

4. **Monitoring:**
   - Prüfe GSC monatlich auf neue 404s
   - Nutze Analytics um Traffic-Verlust zu erkennen

## Beispiel-Workflow

**Szenario:** Du findest in GSC diese 404-URLs:

- `/blog/responsive-webdesign` (alt)
- `/dienste` (alt)

**Schritt 1:** Prüfe wo der Inhalt jetzt ist:

- `/blog/responsive-webdesign` → existiert als `/blog/responsive-design-tailwind`
- `/dienste` → wurde zu `/services`

**Schritt 2:** Trage in `middleware.ts` ein:

```typescript
const redirects: Record<string, string> = {
  '/blog/responsive-webdesign': '/blog/responsive-design-tailwind',
  '/dienste': '/services',
}
```

**Schritt 3:** Commit & Deploy:

```bash
git add middleware.ts
git commit -m "fix: Add 301 redirects for old URLs from GSC"
git push
```

**Schritt 4:** Nach Deployment testen:

```bash
curl -I https://headon.pro/blog/responsive-webdesign
# HTTP/2 301
# location: https://headon.pro/blog/responsive-design-tailwind

curl -I https://headon.pro/dienste
# HTTP/2 301
# location: https://headon.pro/services
```

**Schritt 5:** In GSC für beide URLs Indexierung beantragen

**Fertig!** Nach 1-2 Wochen sollten die 404-Fehler in GSC verschwinden.

## Hilfreiche Links

- [Next.js Redirects Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Google Search Console](https://search.google.com/search-console)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
