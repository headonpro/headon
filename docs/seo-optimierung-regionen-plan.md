# SEO-Optimierung: Regions-Seiten

**Erstellt:** 30.11.2025
**Aktualisiert:** 30.11.2025
**Status:** Phase 1-6 für alle 10 Städte abgeschlossen
**Ziel:** Ranking-Verbesserung für lokale Keywords (Position 10-30 → Top 5)

---

## Ausgangslage

### GSC-Daten (letzte 7 Tage)

| Keyword | Impressionen | Klicks | Position |
|---------|--------------|--------|----------|
| seo lauda-königshofen | 10 | 0 | 12,8 |
| seo wertheim | 9 | 0 | 19,6 |
| wertheim seo | 4 | 0 | 18,8 |
| seo bad mergentheim | 4 | 0 | 29,8 |

**Problem:** Seite 2 Monate live, Rankings bei Position 10-30, aber 0 Klicks wegen:
1. Title-Tags enthalten falsche Keywords (Webentwicklung statt SEO/Webdesign)
2. Keine interne Verlinkung von Homepage/Blog zu Regions-Seiten
3. Content nicht auf GSC-Keywords abgestimmt

### Alle Regions-Seiten (10 Städte)

**Haupt-Städte (Priorität 1 - GSC-Impressionen vorhanden):**
- bad-mergentheim
- lauda-koenigshofen
- wertheim
- tauberbischofsheim

**Weitere Städte (Priorität 2 - noch keine GSC-Daten):**
- aschaffenburg
- crailsheim
- heilbronn
- marktheidenfeld
- mosbach
- wuerzburg

---

## ✅ ABGESCHLOSSEN: Phase 1-5 (Haupt-Städte)

### Phase 1: Title-Tags CTR-optimieren ✅

**Datei:** `app/regionen/[city]/metadata.ts`

Zeile 39 geändert:

```typescript
// ALT:
const title = `Webentwicklung ${frontmatter.name} | HEADON.pro`

// NEU:
const title = `SEO & Webdesign ${frontmatter.name} | Agentur Ab 2.500€`
```

**Status:** ✅ Erledigt - gilt automatisch für alle 10 Städte

---

### Phase 2: Homepage → Regions-Seiten verlinken ✅

**Datei:** `app/page.tsx`

Neuer Abschnitt mit Links zu den Haupt-Regionen hinzugefügt.

**Status:** ✅ Erledigt

---

### Phase 3: Blog → Regions-Seiten verlinken ✅

| Blog-Post | Link hinzugefügt |
|-----------|------------------|
| handwerker-website-erfolgreich.mdx | ✅ |
| restaurant-website-best-practices.mdx | ✅ |
| dsgvo-konforme-website-checkliste.mdx | ✅ |
| web-projekt-planung.mdx | ✅ |
| mobile-first-design.mdx | ✅ |

**Status:** ✅ Erledigt

---

### Phase 4: SEO-Content-Section (Haupt-Städte) ✅

| Stadt-MDX | SEO-Section hinzugefügt |
|-----------|-------------------------|
| content/cities/lauda-koenigshofen.mdx | ✅ |
| content/cities/wertheim.mdx | ✅ |
| content/cities/bad-mergentheim.mdx | ✅ |
| content/cities/tauberbischofsheim.mdx | ✅ |

**Status:** ✅ Erledigt

---

### Phase 5: FAQ-Section (Haupt-Städte) ✅

| Stadt-MDX | FAQ-Section hinzugefügt |
|-----------|-------------------------|
| content/cities/lauda-koenigshofen.mdx | ✅ |
| content/cities/wertheim.mdx | ✅ |
| content/cities/bad-mergentheim.mdx | ✅ |
| content/cities/tauberbischofsheim.mdx | ✅ |

**Status:** ✅ Erledigt

---

## ✅ ABGESCHLOSSEN: Phase 6 - Weitere Städte optimieren

### Aufgabe

Die gleichen Optimierungen (Phase 4 + 5) für die verbleibenden 6 Städte durchführen.

### 6.1 SEO-Content-Section hinzufügen

In jeder MDX-Datei folgende Section hinzufügen (vor dem Kontakt-Abschnitt):

```markdown
## SEO & Online-Marketing in [Stadt]

Als SEO-Agentur in [Stadt] optimieren wir Ihre Website für lokale Suchanfragen.
Unsere Leistungen umfassen:

- **Lokale SEO:** Google My Business, Local Citations, NAP-Konsistenz
- **Technisches SEO:** Core Web Vitals, Schema Markup, Sitemap-Optimierung
- **Content-SEO:** Keyword-Recherche, Texterstellung, Blog-Strategie
- **Webdesign:** Responsive Design, Conversion-Optimierung, UX

Suchanfragen wie "SEO [Stadt]", "Webdesign [Stadt]" oder "Homepage erstellen [Stadt]"
sind unser Spezialgebiet.
```

**[Stadt] ersetzen durch:** Aschaffenburg, Crailsheim, Heilbronn, Marktheidenfeld, Mosbach, Würzburg

### 6.2 FAQ-Section hinzufügen

In jeder MDX-Datei folgende Section hinzufügen (nach SEO-Section):

```markdown
## Häufige Fragen zu Webdesign in [Stadt]

### Was kostet eine Website in [Stadt]?

Professionelle Websites beginnen bei HEADON ab 2.500€. Der Preis hängt von Umfang,
Features und Design ab. Wir bieten transparente Festpreise ohne versteckte Kosten.

### Wie lange dauert die Website-Erstellung?

Je nach Projektumfang 2-8 Wochen. Eine einfache Unternehmenswebsite ist in 2-3 Wochen
fertig, komplexere E-Commerce-Projekte benötigen 6-8 Wochen.

### Bietet HEADON auch SEO-Optimierung an?

Ja, jede Website wird von uns SEO-optimiert ausgeliefert. Zusätzlich bieten wir
laufende SEO-Betreuung und Content-Marketing an.
```

### Checkliste Phase 6

| Datei | SEO-Section | FAQ-Section |
|-------|-------------|-------------|
| `content/cities/aschaffenburg.mdx` | [x] | [x] |
| `content/cities/crailsheim.mdx` | [x] | [x] |
| `content/cities/heilbronn.mdx` | [x] | [x] |
| `content/cities/marktheidenfeld.mdx` | [x] | [x] |
| `content/cities/mosbach.mdx` | [x] | [x] |
| `content/cities/wuerzburg.mdx` | [x] | [x] |

### Nach Abschluss Phase 6

- [x] Build testen: `pnpm build`
- [ ] Deployment durchführen
- [ ] In GSC Reindexierung für die 6 neuen Seiten beantragen

---

## Erwartete Ergebnisse

**Haupt-Städte (bereits optimiert):**
- Woche 1-2: Neue Titles in GSC sichtbar
- Woche 2-4: CTR-Verbesserung bei Position 10-20
- Woche 4-8: Ranking-Verbesserung durch mehr Link-Juice
- Monat 2-3: Top 5 für lokale Keywords erreichbar

**Weitere Städte (nach Phase 6):**
- Diese Städte haben noch keine GSC-Impressionen
- Optimierungen bereiten sie für zukünftige Rankings vor
- Ranking-Aufbau dauert hier länger (3-6 Monate) wegen höherer Konkurrenz (größere Städte)

---

## Hinweise

- Nach jeder Änderung: `pnpm build` zum Testen
- Reindexierung in GSC nur für geänderte Seiten beantragen (nicht alle)
- Ranking-Änderungen dauern 2-6 Wochen
- Die größeren Städte (Würzburg, Heilbronn, Aschaffenburg) haben mehr Konkurrenz - realistische Erwartung: Position 10-30 in 3-6 Monaten
