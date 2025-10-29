# CDN Setup mit Cloudflare für HEADON.pro

## Übersicht

Dieses Dokument beschreibt die vollständige Einrichtung von Cloudflare als Content Delivery Network (CDN) für HEADON.pro. Die Implementierung ist für den **Cloudflare Free Plan** optimiert und benötigt **keine Code-Änderungen** am bestehenden Next.js Projekt.

## Vorteile durch CDN-Implementierung

### Performance-Verbesserungen (erwartet)

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| **LCP (Largest Contentful Paint)** | ~2.5s | ~1.2s | -52% |
| **TTFB (Time to First Byte)** | ~600ms | ~200ms | -67% |
| **FCP (First Contentful Paint)** | ~1.8s | ~0.9s | -50% |
| **Bildladezeit** | 3-5s | 0.5-1s | -80% |
| **VPS-Bandbreite** | 100% | 20-30% | -70% |

### Zusätzliche Vorteile

- ✅ **SEO-Boost**: Schnellere Ladezeiten → besseres Google-Ranking
- ✅ **Kostenersparnis**: Reduzierter VPS-Bandbreiten-Verbrauch
- ✅ **DDoS-Schutz**: Automatischer Schutz vor Angriffen
- ✅ **SSL/TLS**: Kostenlose Zertifikate und Auto-Renewal
- ✅ **HTTP/3 & Brotli**: Modernste Protokolle automatisch aktiviert
- ✅ **Global Delivery**: Schnelle Auslieferung weltweit (300+ Edge-Locations)

## Phase 1: Cloudflare Account & Domain Setup

### 1.1 Cloudflare Account erstellen

1. **Registrierung**: Gehe zu https://dash.cloudflare.com/sign-up
   - E-Mail-Adresse eingeben
   - Starkes Passwort wählen
   - E-Mail bestätigen

2. **Domain hinzufügen**:
   ```
   Dashboard > Add a Site > "headon.pro" eingeben > Add site
   ```

3. **Plan auswählen**: **Free Plan** auswählen (kostenlos, ausreichend für eure Anforderungen)

4. **DNS-Records importieren**: Cloudflare scannt automatisch eure bestehenden DNS-Records

### 1.2 DNS-Records überprüfen und konfigurieren

Nach dem Import sollten folgende Records vorhanden sein:

```
Type    Name        Content                  Proxy Status    TTL
----------------------------------------------------------------
A       @           <VPS-IP-Adresse>        Proxied (🟠)    Auto
A       analytics   <VPS-IP-Adresse>        Proxied (🟠)    Auto
CNAME   www         headon.pro              Proxied (🟠)    Auto
```

**Wichtig**:
- **Orange Cloud (Proxied)**: Aktiviert CDN + DDoS-Schutz
- **Grey Cloud (DNS-only)**: Deaktiviert CDN (nicht empfohlen)
- Für alle Web-Traffic-Records sollte **Proxied** aktiviert sein

### 1.3 Nameserver beim Domain-Registrar ändern

Cloudflare zeigt euch zwei Nameserver an, z.B.:
```
dane.ns.cloudflare.com
uma.ns.cloudflare.com
```

**Anleitung je nach Registrar**:

#### Bei IONOS:
1. Einloggen auf https://my.ionos.de
2. Domains & SSL → Domain verwalten → `headon.pro` auswählen
3. DNS-Einstellungen → Nameserver
4. "Andere Nameserver verwenden" auswählen
5. Cloudflare Nameserver eintragen:
   - Nameserver 1: `dane.ns.cloudflare.com`
   - Nameserver 2: `uma.ns.cloudflare.com`
6. Speichern

#### Bei anderen Registrars:
- Die genauen Schritte findet ihr im Cloudflare Dashboard unter "Quick Start Guide"
- Cloudflare bietet Anleitungen für alle gängigen Registrars

**Propagationszeit**: 2-24 Stunden (meist innerhalb von 2 Stunden)

**Status überprüfen**:
```bash
# Nameserver-Check
dig headon.pro NS +short

# Sollte zurückgeben:
# dane.ns.cloudflare.com.
# uma.ns.cloudflare.com.
```

### 1.4 Cloudflare-Aktivierung bestätigen

1. Cloudflare überprüft automatisch alle 15 Minuten die Nameserver
2. Ihr erhaltet eine E-Mail, sobald Cloudflare aktiv ist
3. Im Dashboard erscheint: **"Status: Active"**

---

## Phase 2: Cloudflare SSL/TLS Konfiguration

### 2.1 SSL/TLS Modus einstellen

**Navigation**: Dashboard → SSL/TLS → Overview

**Empfohlene Einstellung**: **"Full (strict)"**

```
┌─────────────┐       HTTPS        ┌────────────┐       HTTPS        ┌──────────┐
│   Browser   │ ───────────────>  │ Cloudflare │ ───────────────>  │   VPS    │
│             │ <───────────────   │    CDN     │ <───────────────   │  Server  │
└─────────────┘    SSL encrypted   └────────────┘   SSL encrypted   └──────────┘
```

**Warum "Full (strict)"?**
- End-to-End-Verschlüsselung (Browser → Cloudflare → VPS)
- Validiert das SSL-Zertifikat eures VPS
- Höchste Sicherheit

**Alternative Modi** (nicht empfohlen):
- **Flexible**: Nur Browser → Cloudflare verschlüsselt (unsicher)
- **Full**: Akzeptiert selbstsignierte Zertifikate (weniger sicher)

### 2.2 Always Use HTTPS aktivieren

**Navigation**: Dashboard → SSL/TLS → Edge Certificates

Folgende Einstellungen aktivieren:

```yaml
✅ Always Use HTTPS:                ON
✅ Automatic HTTPS Rewrites:        ON
✅ Certificate Transparency:        ON
```

**Ergebnis**: Alle HTTP-Requests werden automatisch auf HTTPS umgeleitet.

### 2.3 Minimum TLS Version setzen

**Navigation**: Dashboard → SSL/TLS → Edge Certificates

**Empfohlung**: **TLS 1.2** (Balance zwischen Sicherheit und Kompatibilität)

Optional für maximale Sicherheit: **TLS 1.3** (kann sehr alte Browser ausschließen)

---

## Phase 3: Caching-Konfiguration

### 3.1 Caching Level

**Navigation**: Dashboard → Caching → Configuration

```yaml
Caching Level: Standard

Browser Cache TTL: 4 hours  # Empfohlung für dynamische Inhalte
```

**Was wird gecacht?**
- ✅ Statische Assets (`/_next/static/`, `/images/`, `/fonts/`)
- ✅ Next.js Image Optimization (`/_next/image/`)
- ❌ HTML-Seiten (dynamisch, nicht gecacht im Standard Mode)
- ❌ API-Routes (`/api/*`)

### 3.2 Page Rules einrichten (kostenlos: 3 Regeln)

**Navigation**: Dashboard → Rules → Page Rules → Create Page Rule

#### Page Rule 1: Next.js Static Assets (höchste Priorität)

```yaml
URL Pattern:      *headon.pro/_next/static/*

Settings:
  - Cache Level:          Cache Everything
  - Edge Cache TTL:       1 month
  - Browser Cache TTL:    1 year

Priorität: 1 (höchste)
```

**Erklärung**: Next.js Static Assets haben Content-Hashes im Dateinamen und ändern sich nie → aggressive Caching möglich.

---

#### Page Rule 2: Next.js Image Optimization

```yaml
URL Pattern:      *headon.pro/_next/image/*

Settings:
  - Cache Level:          Cache Everything
  - Edge Cache TTL:       1 week
  - Browser Cache TTL:    1 day

Priorität: 2
```

**Erklärung**: Optimierte Bilder können sich ändern, daher kürzere Cache-Zeiten.

---

#### Page Rule 3: API Routes nicht cachen

```yaml
URL Pattern:      *headon.pro/api/*

Settings:
  - Cache Level:          Bypass

Priorität: 3
```

**Erklärung**: API-Routes müssen immer frisch sein (Kontaktformular, etc.).

---

### 3.3 Cache Reserve (optional, kostenpflichtig)

**Nicht erforderlich für Free Plan** - Cloudflare behält Caches automatisch solange möglich.

---

## Phase 4: Performance-Optimierungen

### 4.1 Auto Minify aktivieren

**Navigation**: Dashboard → Speed → Optimization

```yaml
Auto Minify:
  ✅ JavaScript
  ✅ CSS
  ✅ HTML
```

**Was macht das?**
- Entfernt Whitespace, Kommentare, unnötige Zeichen
- Reduziert Dateigröße um 10-30%
- Wird automatisch am Edge angewendet

---

### 4.2 Brotli Kompression aktivieren

**Navigation**: Dashboard → Speed → Optimization

```yaml
✅ Brotli Compression
```

**Vorteile**:
- 15-20% bessere Kompression als Gzip
- Wird automatisch verwendet wenn Browser Brotli unterstützt
- Fallback auf Gzip für alte Browser

---

### 4.3 HTTP/3 & QUIC aktivieren

**Navigation**: Dashboard → Network

```yaml
✅ HTTP/3 (with QUIC)
✅ 0-RTT Connection Resumption
✅ WebSockets
```

**HTTP/3 Vorteile**:
- Schnellere Verbindungsaufbau (0-RTT)
- Bessere Performance bei schlechten Netzwerken
- Multiplexing ohne Head-of-Line-Blocking

---

### 4.4 Rocket Loader (NICHT aktivieren!)

**Navigation**: Dashboard → Speed → Optimization

```yaml
❌ Rocket Loader: OFF
```

**Warum deaktiviert?**
- Kann mit Next.js React Hydration kollidieren
- Next.js hat bereits optimiertes Script-Loading
- Kann zu "hydration mismatch" Fehlern führen

---

## Phase 5: Sicherheitseinstellungen

### 5.1 Security Level

**Navigation**: Dashboard → Security → Settings

```yaml
Security Level: Medium  # Empfohlen
```

**Optionen**:
- **Essentially Off**: Nur bekannte Bedrohungen blockieren
- **Low**: Minimale Herausforderungen
- **Medium**: Balance zwischen Sicherheit und Nutzerfreundlichkeit ⭐
- **High**: Aggressive Challenges (kann legitime User blockieren)
- **I'm Under Attack**: Nur bei aktiven DDoS-Angriffen verwenden

---

### 5.2 Bot Fight Mode aktivieren

**Navigation**: Dashboard → Security → Bots

```yaml
✅ Bot Fight Mode: ON  (Free Plan Feature)
```

**Was macht das?**
- Blockiert bekannte Bots und Scraper
- Reduziert Server-Last
- Schützt vor Content-Scraping

---

### 5.3 Challenge Passage

**Navigation**: Dashboard → Security → Settings

```yaml
Challenge Passage: 30 minutes  # Empfohlen
```

**Erklärung**: User, die eine Challenge gelöst haben, müssen 30 Minuten lang keine weiteren Challenges lösen.

---

## Phase 6: Analytics & Monitoring

### 6.1 Cloudflare Analytics nutzen

**Navigation**: Dashboard → Analytics & Logs

**Kostenlos verfügbar**:
- Traffic-Übersicht (Requests, Bandbreite)
- Cache-Ratio (wie viel wurde vom CDN ausgeliefert?)
- Threat-Übersicht (blockierte Anfragen)
- Performance-Metriken (Response-Zeiten)

**Ziel-Cache-Ratio**: 70-90% für optimale Performance

---

### 6.2 Web Analytics (optional)

**Navigation**: Dashboard → Analytics & Logs → Web Analytics

```yaml
✅ Enable Web Analytics (optional)
```

**Alternative**: Ihr nutzt bereits **Umami Analytics** (self-hosted) - Cloudflare Web Analytics ist daher optional.

---

## Phase 7: Erweiterte Konfiguration

### 7.1 Always Online aktivieren

**Navigation**: Dashboard → Caching → Configuration

```yaml
✅ Always Online: ON
```

**Was macht das?**
- Cloudflare speichert statische Kopien eurer Seiten
- Bei VPS-Ausfall wird gecachte Version ausgeliefert
- Zeigt "This page is currently offline" Banner

---

### 7.2 Crawler Hints aktivieren

**Navigation**: Dashboard → Caching → Configuration

```yaml
✅ Crawler Hints: ON
```

**SEO-Vorteil**: Verbessert die Crawl-Rate von Suchmaschinen.

---

### 7.3 Network Error Logging

**Navigation**: Dashboard → Speed → Optimization

```yaml
✅ Network Error Logging (NEL): ON
```

**Nutzen**: Cloudflare sammelt Fehlerberichte über Netzwerkprobleme für Analysen.

---

## Phase 8: Testing & Validierung

### 8.1 DNS-Propagation überprüfen

```bash
# 1. Nameserver prüfen
dig headon.pro NS +short

# Erwartete Ausgabe:
# dane.ns.cloudflare.com.
# uma.ns.cloudflare.com.

# 2. A-Record prüfen (sollte Cloudflare IP sein)
dig headon.pro A +short

# Erwartete Ausgabe: Cloudflare IP (z.B. 104.21.x.x oder 172.67.x.x)

# 3. HTTPS-Check
curl -I https://headon.pro

# Erwartete Header:
# HTTP/2 200
# server: cloudflare
# cf-cache-status: HIT oder MISS oder DYNAMIC
```

---

### 8.2 Cache-Status überprüfen

**Browser DevTools**:
1. Chrome DevTools öffnen (F12)
2. Network-Tab
3. Seite neu laden
4. Beliebige Ressource auswählen
5. Response Headers überprüfen:

```http
cf-cache-status: HIT          # Vom CDN ausgeliefert ✅
cf-cache-status: MISS         # Nicht im Cache, wird gecacht
cf-cache-status: DYNAMIC      # Nicht cachebar (HTML, API)
cf-cache-status: EXPIRED      # Cache abgelaufen, wird neu geladen
```

**Kommandozeile**:
```bash
# Static Asset (sollte HIT sein nach erstem Request)
curl -I https://headon.pro/_next/static/css/app/layout.css | grep cf-cache-status

# Image (sollte HIT sein nach erstem Request)
curl -I https://headon.pro/_next/image?url=/logo.png&w=256&q=75 | grep cf-cache-status

# HTML (sollte DYNAMIC sein)
curl -I https://headon.pro | grep cf-cache-status

# API (sollte BYPASS sein)
curl -I https://headon.pro/api/health | grep cf-cache-status
```

---

### 8.3 Performance-Messungen

#### Lighthouse Audit (vor/nach Vergleich)

```bash
# Vor CDN-Aktivierung (zum Vergleich speichern)
pnpm dlx lighthouse https://headon.pro --output=html --output-path=./before-cdn.html

# Nach CDN-Aktivierung (24 Stunden warten für Cache-Warmup)
pnpm dlx lighthouse https://headon.pro --output=html --output-path=./after-cdn.html
```

**Erwartete Verbesserungen**:
- Performance Score: +10-20 Punkte
- LCP: -40-60% Zeit
- TTFB: -50-70% Zeit

---

#### WebPageTest (mehrere Standorte)

1. Gehe zu https://www.webpagetest.org/
2. URL eingeben: `https://headon.pro`
3. Test Location auswählen:
   - **Frankfurt, Germany** (nächster Cloudflare Edge)
   - **Berlin, Germany**
   - **London, UK** (zum Vergleich)
4. Test durchführen (vor und nach CDN)

**Erwartete Verbesserungen**:
- TTFB: < 200ms (von ~600ms)
- Speed Index: < 1.5s (von ~3s)
- First Byte Time: < 200ms

---

#### Pingdom Speed Test

1. Gehe zu https://tools.pingdom.com/
2. URL eingeben: `https://headon.pro`
3. Test Location: **Frankfurt, Germany**
4. Test starten

**Erwartete Verbesserungen**:
- Load Time: -40-60%
- Requests: Gleich (CDN ändert Anzahl nicht)
- Page Size: -10-20% (durch Kompression)

---

### 8.4 Cache-Hit-Ratio überwachen

**Cloudflare Dashboard**:
1. Dashboard → Analytics → Traffic
2. "Cached Requests" Chart anzeigen

**Ziel**: 70-90% Cache-Hit-Ratio nach 24-48 Stunden

**Interpretation**:
- **> 80%**: Exzellent ✅
- **60-80%**: Gut, aber Optimierungspotenzial 📊
- **< 60%**: Cache-Regeln überprüfen ⚠️

---

## Phase 9: CI/CD Integration

### 9.1 Cache-Purge nach Deployment

Nach jedem Deployment sollte der Cloudflare-Cache geleert werden, damit neue Inhalte sofort ausgeliefert werden.

#### Option A: Cloudflare Dashboard (manuell)

1. Dashboard → Caching → Configuration
2. "Purge Everything" → Bestätigen

**Achtung**: Kann Performance kurzfristig verschlechtern (Cold Cache).

---

#### Option B: Cloudflare API (automatisiert, empfohlen)

**Voraussetzung**: Cloudflare API Token erstellen

1. Dashboard → My Profile → API Tokens → Create Token
2. Template: **"Edit zone"** verwenden
3. Permissions:
   - Zone → Cache Purge → Purge
   - Zone → Zone → Read
4. Zone Resources: **Include → Specific zone → headon.pro**
5. Token erstellen und kopieren

**GitHub Actions Integration**:

Füge das Token als Secret hinzu:
```bash
# GitHub Repository → Settings → Secrets → New repository secret
Name:  CLOUDFLARE_API_TOKEN
Value: <dein-api-token>
```

**Workflow erweitern** (`.github/workflows/deploy.yml`):

```yaml
# Am Ende des Deploy-Jobs hinzufügen:
- name: Purge Cloudflare Cache
  run: |
    curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CLOUDFLARE_ZONE_ID }}/purge_cache" \
      -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
      -H "Content-Type: application/json" \
      --data '{"purge_everything":true}'
```

**Zusätzliche Secrets**:
```bash
# Cloudflare Zone ID finden:
# Dashboard → Domain auswählen → Rechte Sidebar → Zone ID kopieren

Name:  CLOUDFLARE_ZONE_ID
Value: <deine-zone-id>
```

---

#### Option C: Selektives Cache-Purging (fortgeschritten)

Statt alles zu löschen, nur geänderte URLs purgen:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "files": [
      "https://headon.pro/blog/neuer-artikel",
      "https://headon.pro/_next/static/css/new-hash.css"
    ]
  }'
```

**Vorteil**: Cache bleibt für unveränderte Inhalte erhalten → bessere Performance.

---

## Phase 10: Monitoring & Wartung

### 10.1 Regelmäßige Überprüfungen

**Wöchentlich**:
- ✅ Cache-Hit-Ratio im Dashboard prüfen (Ziel: > 70%)
- ✅ Security-Tab auf blockierte Threats prüfen
- ✅ Bandwidth-Verbrauch monitoren

**Monatlich**:
- ✅ Performance-Tests durchführen (Lighthouse, WebPageTest)
- ✅ Cloudflare Analytics mit Umami-Daten abgleichen
- ✅ Security-Events reviewen (Bots, DDoS-Attempts)

**Quartalsweise**:
- ✅ Page Rules auf Optimierungspotenzial prüfen
- ✅ Neue Cloudflare-Features evaluieren
- ✅ SSL-Zertifikate (automatisch erneuert, trotzdem checken)

---

### 10.2 Troubleshooting

#### Problem: Cache-Hit-Ratio zu niedrig (< 50%)

**Diagnose**:
```bash
# Verschiedene URLs testen
for url in \
  "https://headon.pro/_next/static/chunks/main.js" \
  "https://headon.pro/images/logo.png" \
  "https://headon.pro/"
do
  echo "Testing: $url"
  curl -I "$url" | grep -E "(cf-cache-status|cache-control)"
  echo "---"
done
```

**Mögliche Ursachen**:
1. Page Rules falsch konfiguriert → Page Rules überprüfen
2. Cache-Control Headers fehlen → Sollte durch `next.config.ts` gesetzt sein
3. Cookies auf allen Requests → Cloudflare cached keine Requests mit Cookies (außer bei "Cache Everything" Page Rule)

**Lösung**:
- Page Rules in der Reihenfolge überprüfen (spezifischste zuerst)
- Sicherstellen, dass "Cache Everything" für Static Assets aktiv ist
- Cache-Control Headers in `next.config.ts` überprüfen (bereits implementiert ✅)

---

#### Problem: SSL-Fehler ("ERR_SSL_VERSION_OR_CIPHER_MISMATCH")

**Ursache**: SSL/TLS-Modus ist auf "Flexible" statt "Full (strict)"

**Lösung**:
1. Dashboard → SSL/TLS → Overview
2. Modus auf **"Full (strict)"** ändern
3. 5 Minuten warten
4. Seite neu laden

---

#### Problem: "Redirect Loop" (zu viele Weiterleitungen)

**Ursache**: VPS leitet HTTP → HTTPS um UND Cloudflare tut das auch

**Lösung**:
1. **Option A**: Nginx auf VPS prüfen - HTTP → HTTPS Redirect entfernen
   ```nginx
   # /etc/nginx/sites-available/headon.pro
   # Diese Zeilen entfernen/auskommentieren:
   # if ($scheme != "https") {
   #     return 301 https://$host$request_uri;
   # }
   ```

2. **Option B**: Cloudflare "Always Use HTTPS" deaktivieren (nicht empfohlen)

**Richtige Konfiguration**:
- Cloudflare: "Always Use HTTPS" → **ON**
- VPS Nginx: HTTP → HTTPS Redirect → **OFF**

---

#### Problem: Bilder laden nicht (403 Forbidden)

**Ursache**: Hotlink-Protection oder Firewall-Regel blockiert Requests

**Lösung**:
1. Dashboard → Security → WAF
2. Security Events prüfen
3. Ggf. Regel anpassen oder IP-Adresse whitelisten

---

#### Problem: Langsame API-Responses

**Diagnose**:
```bash
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://headon.pro/api/health
```

**Ursache**: Cloudflare cached APIs nicht (by design)

**Lösung**:
- API-Performance auf VPS optimieren (außerhalb Cloudflare)
- Oder: API auf separater Subdomain hosten ohne Cloudflare Proxy (grauer Cloud)

---

## Phase 11: Erweiterte Features (Optional)

### 11.1 Cloudflare Workers (kostenpflichtig)

**Use Cases**:
- Edge-Side Rendering (ESR)
- A/B-Testing am Edge
- Personalisierung ohne Backend-Last
- URL-Rewrites am Edge

**Kosten**: $5/Monat (Workers Paid Plan)

**Nicht erforderlich** für HEADON.pro im Free Plan.

---

### 11.2 Argo Smart Routing (kostenpflichtig)

**Was macht das?**
- Intelligente Route-Optimierung durch Cloudflare-Netzwerk
- ~30% schnellere Time-to-First-Byte (TTFB)

**Kosten**: $5/Monat + $0.10/GB

**Empfehlung**: Nur bei hohem Traffic (> 10.000 Requests/Tag) sinnvoll.

---

### 11.3 Load Balancing (kostenpflichtig)

**Use Cases**:
- Mehrere VPS-Server
- Automatisches Failover
- Health-Checks

**Kosten**: $5/Monat

**Nicht erforderlich** für Single-Server-Setup.

---

## Zusammenfassung: Kritische Schritte

### Checkliste für erfolgreiche CDN-Aktivierung

- [ ] **Cloudflare Account erstellt** und Domain hinzugefügt
- [ ] **Nameserver beim Registrar geändert** (Propagation: 2-24h)
- [ ] **SSL/TLS auf "Full (strict)"** gesetzt
- [ ] **"Always Use HTTPS"** aktiviert
- [ ] **3 Page Rules konfiguriert**:
  - [ ] `/_next/static/*` → Cache Everything (1 Monat)
  - [ ] `/_next/image/*` → Cache Everything (1 Woche)
  - [ ] `/api/*` → Bypass
- [ ] **Auto Minify aktiviert** (JS, CSS, HTML)
- [ ] **Brotli Compression aktiviert**
- [ ] **HTTP/3 aktiviert**
- [ ] **Bot Fight Mode aktiviert**
- [ ] **Always Online aktiviert**
- [ ] **Cache-Status getestet** (`curl -I` mit `cf-cache-status`)
- [ ] **Performance-Tests durchgeführt** (Lighthouse, WebPageTest)
- [ ] **Cache-Hit-Ratio überwacht** (Ziel: > 70%)

---

## Support & Hilfe

### Cloudflare Community

- **Forum**: https://community.cloudflare.com/
- **Discord**: https://discord.cloudflare.com/
- **Status**: https://www.cloudflarestatus.com/

### Dokumentation

- **Developer Docs**: https://developers.cloudflare.com/
- **Learning Center**: https://www.cloudflare.com/learning/

### Performance-Monitoring-Tools

- **Lighthouse**: `pnpm dlx lighthouse <url>`
- **WebPageTest**: https://www.webpagetest.org/
- **Pingdom**: https://tools.pingdom.com/
- **GTmetrix**: https://gtmetrix.com/

---

## Änderungshistorie

| Datum | Version | Änderung |
|-------|---------|----------|
| 2025-10-29 | 1.0 | Initiale Dokumentation erstellt |

---

**Erstellt für**: HEADON.pro Next.js Website
**Autor**: Claude Code
**Letzte Aktualisierung**: 29. Oktober 2025
