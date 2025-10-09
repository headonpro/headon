# **MVP ENTWICKLUNGSPLAN - LOCALHUB**

## **ÜBERBLICK**

**Ziel:** Funktionsfähiges MVP mit 2 Sektoren in 12-14 Wochen

**Launch-Sektoren:**
1. SanctuaryHub (Lebenshöfe)
2. ClubHub (Fußballvereine)

**Beta-Kunden:**
- Vita Est Cara (Lebenshof)
- SV Viktoria Wertheim (Fußballverein)
- +3-5 weitere Testvereine/Höfe

---

## **PHASE 0: SETUP & PLANUNG (Woche 1-2)**

### **Woche 1: Projekt-Setup**

**Tag 1-2: Repository & Tooling**
- GitHub Repository erstellen (Private)
- Monorepo-Struktur anlegen mit Turborepo/Nx
- Ordnerstruktur definieren:
  - `/apps/admin` (Remix)
  - `/apps/marketing` (Astro)
  - `/apps/template` (Astro Template für Kunden-Sites)
  - `/packages/shared` (Types, Utils)
  - `/packages/database` (Supabase Client)
  - `/packages/ui` (shadcn/ui Components)
- ESLint + Prettier konfigurieren
- TypeScript Config (strict mode)
- Git Hooks (Husky) für Commits

**Tag 3-4: Supabase Setup**
- Supabase Cloud Projekt erstellen (Frankfurt Region)
- Organisations-Struktur definieren
- API Keys in Environment Variables
- Supabase CLI lokal installieren
- Type Generation Script einrichten
- Testing-Projekt für Entwicklung

**Tag 5: Hetzner Server vorbereiten**
- CPX32 checken (aktueller Stand)
- Docker Compose Struktur für LocalHub planen
- Nginx Config-Strategie definieren
- SSL-Zertifikate-Plan (Let's Encrypt Wildcard)
- Subdomain-Routing testen mit Dummy-Site

**Tag 6-7: Design System**
- shadcn/ui installieren (Remix + Astro)
- Tailwind Config definieren (Basis-Farben)
- Component-Library Basis erstellen
- Typography-System
- Spacing-System
- Color-Palette für Theming definieren

---

### **Woche 2: Datenbank-Design**

**Tag 1-3: Core Schema Design**

**Core Tables (alle Sektoren):**
- `organizations` (Haupt-Tabelle)
  - id, name, slug, sector (enum), plan, stripe_customer_id
  - theme_settings (jsonb), created_at, updated_at
  - subdomain, custom_domain, domain_verified
  
- `users` (Admin-Accounts)
  - id, email, organization_id, role (enum: owner, admin, editor)
  - created_at, last_login
  
- `pages` (Custom Pages)
  - id, organization_id, title, slug, content, published
  
- `media` (Uploads)
  - id, organization_id, filename, url, mime_type, size
  
- `domains` (Domain-Management)
  - id, organization_id, domain, verified, ssl_active

**Tag 4-5: Sanctuary-Specific Schema**
- `animals` (Tiere)
  - id, organization_id, name, species, story, rescue_date
  - status, images[], featured
  
- `sponsorships` (Patenschaften)
  - id, animal_id, sponsor_name, sponsor_email
  - monthly_amount, active, started_at
  
- `donations` (Spenden)
  - id, organization_id, amount, donor_name, donor_email
  - stripe_payment_id, created_at

**Tag 6-7: Sports-Specific Schema**
- `teams` (Mannschaften)
  - id, organization_id, name, league, age_group
  - coach, training_times
  
- `matches` (Spiele)
  - id, team_id, opponent, date, home_away
  - result_home, result_away, stadium, notes
  
- `match_messages` (Live-Chat)
  - id, match_id, author, message, created_at
  
- `league_tables` (Tabellen)
  - id, team_id, season, position, points, goals_for, goals_against

**Tag 7: Row Level Security (RLS)**
- RLS Policies für alle Tables definieren
- Multi-Tenancy sicherstellen
- Test-Policies schreiben
- Supabase Migrations erstellen

---

## **PHASE 1: CORE PLATFORM (Woche 3-5)**

### **Woche 3: Authentication & Onboarding Foundation**

**Tag 1-3: Auth-System (Remix)**
- Supabase Auth Integration
- Login-Page mit Email/Password
- Session-Management (Cookies)
- Protected Routes Middleware
- Logout-Funktionalität
- Password-Reset Flow

**Tag 4-5: Sign-up Flow (Teil 1)**
- Landing auf Marketing-Site (Astro)
- Sign-up Formular
  - Email, Password
  - Organisation Name
  - Sektor-Auswahl (Sanctuary / Sports)
- Account-Erstellung in Supabase
- Email-Verifizierung (Supabase Auth)

**Tag 6-7: Stripe Integration (Basics)**
- Stripe Account setup (Test-Mode)
- Pricing-Pläne in Stripe anlegen
- Checkout-Session erstellen
- Webhook-Endpoint für Payment-Success
- Organisation mit Plan verknüpfen

---

### **Woche 4: Dashboard Core**

**Tag 1-2: Dashboard Layout**
- Main-Layout Component (Remix)
- Sidebar-Navigation (dynamisch nach Sektor)
- Top-Bar mit User-Menu
- Mobile-Responsive Sidebar
- Breadcrumbs
- Loading-States

**Tag 3-4: Dashboard Home**
- Übersichts-Page
- Statistiken (Basis):
  - Anzahl Tiere/Teams
  - Letzte Aktivität
  - Nächste Events
- Quick-Actions (context-based)
- Welcome-Message für neue User

**Tag 5-7: Settings-Bereich**
- Organisation Settings
  - Name, Description ändern
  - Logo-Upload (Supabase Storage)
  - Theme-Einstellungen (Farben)
- User-Profile
  - Email ändern
  - Password ändern
- Billing (Basics)
  - Aktueller Plan anzeigen
  - Stripe Customer Portal Link

---

### **Woche 5: Website Generator (Basics)**

**Tag 1-3: Astro Template Structure**
- Basis-Template erstellen
- Layout-Komponenten:
  - Header (mit Logo, Navigation)
  - Footer (mit Kontakt)
  - Hero-Section (anpassbar)
- Gemeinsame Sections:
  - About-Section
  - Contact-Section
  - Gallery-Section

**Tag 4-5: Theme-System**
- Farben aus DB laden
- Logo aus Supabase Storage laden
- Typography dynamisch
- CSS Variables generieren
- Build-Prozess testen

**Tag 6-7: Generator-Service (Node Script)**
- Script das Astro-Site baut
- Nimmt Organisation-ID
- Fetched Daten aus Supabase
- Generiert Astro-Config
- Baut Static Site
- Speichert in `/sites/[slug]/dist/`
- Triggerable via API-Endpoint

---

## **PHASE 2: ONBOARDING FLOWS (Woche 6-7)**

### **Woche 6: Multi-Step Onboarding**

**Tag 1-2: Onboarding-Framework**
- Step-Progress-Bar Component
- State-Management für Steps
- Navigation (Next, Back, Skip)
- Data-Persistence nach jedem Step
- Responsive Design

**Tag 3-4: Universal Steps (beide Sektoren)**

**Step 1: Basis-Infos**
- Name (auto-filled aus Sign-up)
- Tagline/Slogan
- Beschreibung (Textarea)
- Adresse (Street, City, ZIP)
- Email, Phone

**Step 2: Branding**
- Logo-Upload (optional, skip möglich)
- Farb-Picker (Primary Color)
- Farb-Picker (Secondary Color)
- Layout-Auswahl (3 Optionen):
  - Classic
  - Modern
  - Story-First

**Tag 5-7: Sanctuary-Specific Onboarding**

**Step 3: Erste Tiere (optional)**
- Mini-Form: Name, Art, Foto
- 1-3 Tiere hinzufügbar
- "Später hinzufügen" Option
- Preview wie es auf Website aussieht

**Step 4: Spenden-Setup**
- PayPal Email (optional)
- Stripe Connect (optional, später)
- Spenden-Ziel setzen (optional)

**Step 5: Domain**
- Subdomain-Anzeige (auto: [slug].localhub.de)
- Custom-Domain Option
- "Später einrichten" Default

---

### **Woche 7: Sports-Specific Onboarding**

**Tag 1-3: Sport-Onboarding Steps**

**Step 3: Mannschaften**
- Mannschaft hinzufügen (Name, Liga)
- Altersklasse
- Trainer-Name (optional)
- Trainingszeiten
- Mehrere Teams möglich
- Skip möglich

**Step 4: Spielstätte**
- Stadion-Name
- Adresse
- Google Maps Link (optional)
- Kapazität (optional)

**Step 5: Domain**
- Identisch wie Sanctuary

**Tag 4-5: Onboarding-Completion**
- Completion-Screen (beide Sektoren)
- "Eure Website wird gebaut..."
- Loading-Spinner
- Generator-Service triggern
- Nach Build: Success-Message
- Links zu:
  - Website ansehen
  - Zum Dashboard
- Welcome-Email versenden

**Tag 6-7: Testing & Refinement**
- Beide Onboarding-Flows testen
- Edge-Cases (leere Felder, etc.)
- Validation verbessern
- Error-Handling
- Mobile-Testing

---

## **PHASE 3: SEKTOR-FEATURES (Woche 8-10)**

### **Woche 8: Sanctuary-Features**

**Tag 1-3: Tier-Verwaltung**

**Dashboard-Bereich:**
- Liste aller Tiere (Table)
- Filter (Art, Status)
- Suche
- Tier hinzufügen (Modal/Page)
  - Name, Art, Geschlecht
  - Geschichte (Textarea + Rich-Text)
  - Rettungsdatum
  - Status (aktiv, vermittelt, verstorben)
  - Featured (Checkbox)
- Tier bearbeiten
- Tier löschen (mit Confirmation)

**Bilder-Upload:**
- Multi-Image Upload zu Supabase Storage
- Drag & Drop
- Preview
- Haupt-Bild auswählen
- Bilder löschen

**Tag 4-5: Patenschaften**
- Patenschaften-Übersicht
- Patenschaft hinzufügen (zu Tier)
  - Paten-Name, Email
  - Monatlicher Betrag
  - Start-Datum
- Status (aktiv/inaktiv)
- Paten-Email senden (später)

**Tag 6-7: Spenden-Tracking**
- Spenden-Liste (Table)
- Spende manuell hinzufügen
  - Betrag, Spender, Datum
  - Notiz
- Gesamt-Statistik
- Monats-Übersicht
- Diagramm (basic Chart)

---

### **Woche 9: Sports-Features**

**Tag 1-3: Mannschafts-Verwaltung**

**Dashboard:**
- Mannschaften-Liste
- Mannschaft hinzufügen/bearbeiten
  - Name, Liga, Altersklasse
  - Trainer, Co-Trainer
  - Training (Wochentag, Zeit, Ort)
  - Team-Foto
- Mannschaft löschen

**Spieler (basic, optional MVP):**
- Spieler-Liste pro Team
- Spieler hinzufügen (Name, Nummer, Position)

**Tag 4-5: Spielplan**
- Spiele-Liste pro Team
- Spiel hinzufügen
  - Gegner
  - Datum, Uhrzeit
  - Heim/Auswärts
  - Stadion
- Ergebnis eintragen (nach Spiel)
  - Tore Heim, Tore Auswärts
  - Notizen/Bericht
- Spiel bearbeiten/löschen

**Tag 6-7: Tabellen (basic)**
- Tabelle manuell eingeben (für MVP)
  - Position, Team, Spiele, Punkte
  - Tore, Differenz
- Später: Auto-Berechnung aus Spielen

---

### **Woche 10: Website-Content Management**

**Tag 1-2: Seiten-Verwaltung (beide Sektoren)**
- "Über uns" bearbeiten
  - Rich-Text Editor (TipTap oder ähnlich)
  - Bilder einfügen
  - Preview
- Kontakt-Info bearbeiten
  - Email, Telefon, Adresse
  - Social Media Links
  - Öffnungszeiten

**Tag 3-4: News/Blog**
- News-Liste
- News-Artikel erstellen
  - Titel, Content (Rich-Text)
  - Haupt-Bild
  - Veröffentlichungsdatum
  - Published/Draft
- News bearbeiten/löschen
- Auf Website automatisch anzeigen

**Tag 5-7: Bildergalerie**
- Galerie-Verwaltung
- Bilder hochladen (bulk)
- Alben/Kategorien (optional)
- Bilder zu Galerie zuordnen
- Auf Website anzeigen
- Lightbox-Funktionalität

---

## **PHASE 4: TEMPLATE & DEPLOYMENT (Woche 11-12)**

### **Woche 11: Kunden-Website Templates**

**Tag 1-3: Sanctuary-Template**

**Pages:**
- Homepage (Hero + Tiere-Preview + CTA)
- Über uns (aus DB)
- Unsere Tiere (Grid mit allen Tieren)
- Tier-Detail-Seiten (dynamisch)
- Patenschaften (Info + CTA)
- Spenden (Spendenformular/PayPal)
- News/Blog-Übersicht
- News-Detail-Seiten
- Kontakt
- Impressum, Datenschutz

**Components:**
- Hero mit Background-Image
- Tier-Card (mit Bild, Name, Story-Teaser)
- Spenden-Widget (prominent)
- CTA-Buttons (Patenschaft, Spenden)
- Footer mit Links

**Tag 4-6: Sports-Template**

**Pages:**
- Homepage (Hero + nächstes Spiel + News)
- Über uns / Verein
- Mannschaften-Übersicht
- Team-Detail-Seiten (mit Spielplan)
- Spielplan (alle Teams)
- Tabelle(n)
- News/Berichte
- Kontakt
- Impressum, Datenschutz

**Components:**
- Hero mit Team-Foto
- Match-Card (nächste Spiele)
- Tabellen-Component
- News-Card
- Sponsor-Logos (Footer)

**Tag 7: Mobile Optimization**
- Beide Templates auf Mobile testen
- Responsive Breakpoints optimieren
- Touch-Friendly Navigation
- Performance-Check
- Lazy-Loading für Bilder

---

### **Woche 12: Deployment & Domain-Management**

**Tag 1-2: Hetzner Deployment-Setup**

**Docker Compose:**
- Service für Remix-Admin
- Service für Nginx (Reverse Proxy)
- Service für Generator (Node)
- PostgreSQL (falls nicht Supabase Cloud)
- Redis (optional, für Caching)

**Nginx Config:**
- Reverse Proxy für app.localhub.de → Remix
- Subdomain-Routing für Kunden-Sites
- SSL mit Let's Encrypt (Wildcard)
- Gzip Compression
- Caching Headers für Static Assets

**Tag 3-4: CI/CD Pipeline**
- GitHub Actions Workflow
- Trigger bei Push to main
- Build Admin (Remix)
- Build Marketing (Astro)
- Tests (basic)
- Deploy via SSH zu Hetzner
- Docker Compose restart
- Slack/Email Notification

**Tag 5-6: Domain-Verwaltung**

**Im Dashboard:**
- Domain-Settings Page
- Subdomain anzeigen (auto)
- Custom Domain hinzufügen
  - Domain-Input
  - DNS-Anleitung anzeigen
  - Verification-Status

**DNS-Verification:**
- Cronjob/Service checkt DNS alle 30 Min
- Bei Erfolg: Nginx Config automatisch erweitern
- SSL-Zertifikat für Domain holen
- User-Email: "Domain aktiv"

**Tag 7: Monitoring & Logging**
- Uptime-Monitoring (UptimeRobot oder selbst)
- Error-Tracking (Sentry)
- Application Logs (Winston/Pino)
- Database-Monitoring (Supabase Dashboard)
- Backup-Strategie (Supabase: automatisch, Nginx Configs: Git)

---

## **PHASE 5: BETA-VORBEREITUNG (Woche 13)**

### **Woche 13: Polish & Testing**

**Tag 1-2: Feature-Completeness Check**
- Checkliste durchgehen:
  - Alle Onboarding-Steps funktionieren
  - Beide Sektoren vollständig
  - Website-Generierung funktioniert
  - Domain-Setup funktioniert
  - Payment-Flow funktioniert
  - Email-Versand funktioniert
- Fehlende Micro-Features ergänzen

**Tag 3-4: Qualitätssicherung**
- End-to-End Tests schreiben (Playwright)
  - Sign-up Flow
  - Onboarding komplett
  - Dashboard-Features
- Unit-Tests für kritische Functions
- Bug-Fixing Session
- Performance-Optimierung

**Tag 5: Beta-User-Vorbereitung**
- Vita Est Cara kontaktieren
- Viktoria Wertheim kontaktieren
- 3-5 weitere Vereine/Höfe ansprechen
- Beta-Konditionen klären (kostenlos für Feedback)
- Onboarding-Call-Termine vereinbaren

**Tag 6-7: Dokumentation**
- User-Guide schreiben (Basic)
  - Wie logge ich mich ein
  - Wie füge ich Inhalte hinzu
  - Wie ändere ich Design
- Admin-Dokumentation (für euch)
- FAQ-Sektion
- Support-Email aufsetzen

---

## **PHASE 6: BETA-LAUNCH (Woche 14)**

### **Woche 14: Soft-Launch & Feedback**

**Tag 1: Beta-Onboarding Calls**
- Vita Est Cara durchs System führen
- Viktoria Wertheim durchs System führen
- Screen-Sharing, live Feedback sammeln
- Erste Inhalte gemeinsam eingeben

**Tag 2-3: Migration Bestandskunden**
- Viktoria Wertheim Inhalte migrieren
  - Texte übertragen
  - Bilder hochladen
  - Mannschaften anlegen
- Vita Est Cara neu aufsetzen
  - Tiere eingeben
  - Fotos hochladen
  - Geschichten schreiben

**Tag 4-5: Weitere Beta-User onboarden**
- 3-5 weitere Organisationen
- Weniger hands-on (sollen selbst testen)
- Feedback-Formular bereitstellen
- Bugs tracken (GitHub Issues)

**Tag 6: Monitoring & Support**
- Tägliches Check-In mit Beta-Usern
- Bug-Reports sammeln
- Feature-Requests notieren
- Prioritäten setzen

**Tag 7: Retro & Planning**
- Team-Meeting: Was lief gut/schlecht
- Beta-Feedback analysieren
- Roadmap für Post-Launch erstellen
- Entscheidung: Bereit für Public Launch?

---

## **MEILENSTEINE & DELIVERABLES**

### **Milestone 1 (Ende Woche 2):**
✅ Setup komplett
✅ Datenbank-Schema fertig
✅ Lokale Dev-Umgebung läuft

### **Milestone 2 (Ende Woche 5):**
✅ Auth funktioniert
✅ Dashboard-Layout steht
✅ Website-Generator (basic) läuft

### **Milestone 3 (Ende Woche 7):**
✅ Onboarding beide Sektoren fertig
✅ User kann sich registrieren + zahlen + Website bekommen

### **Milestone 4 (Ende Woche 10):**
✅ Alle Kern-Features beide Sektoren
✅ Content-Management funktioniert

### **Milestone 5 (Ende Woche 12):**
✅ Deployment auf Hetzner
✅ CI/CD läuft
✅ Domain-Management funktioniert

### **Milestone 6 (Ende Woche 14):**
✅ Beta mit 5-10 Kunden
✅ Feedback gesammelt
✅ System stabil

---

## **RESSOURCEN-PLANUNG**

### **Team-Setup (2 Personen angenommen):**

**Developer 1 (Full-Stack):**
- Fokus: Remix Admin
- Auth, Dashboard, Sektor-Features
- 30-40h/Woche

**Developer 2 (Full-Stack):**
- Fokus: Astro Templates
- Website-Generator, Deployment
- 30-40h/Woche

**Alternativ (1 Person):**
- Alles nacheinander
- 20-25h/Woche
- Dauer: 18-20 Wochen statt 14

### **Externe Ressourcen:**
- Designer (optional): Logo, Branding - 2-3 Tage
- Texter (optional): Marketing-Copy - 1-2 Tage

---

## **RISIKEN & MITIGATION**

### **Risiko 1: Scope Creep**
**Problem:** Zu viele Features während MVP
**Lösung:** Strikte Feature-Liste, "Nice-to-Have" für Post-Launch

### **Risiko 2: Technische Blocker**
**Problem:** Unbekannte Tech-Probleme (z.B. Realtime)
**Lösung:** Time-Buffer einplanen, Community/Docs nutzen

### **Risiko 3: Beta-User finden**
**Problem:** Keine Organisationen bereit zu testen
**Lösung:** Eigene Kontakte (Viktoria, Vita Est Cara) + lokales Netzwerk

### **Risiko 4: Performance-Issues**
**Problem:** Generator zu langsam, Sites zu groß
**Lösung:** Früh testen, optimieren, Caching

### **Risiko 5: Zeitplan zu ambitioniert**
**Problem:** 14 Wochen zu wenig
**Lösung:** MVP-Features reduzieren, Launch auf Woche 16-18 schieben

---

## **POST-MVP ROADMAP (grob)**

### **Monat 4-5: Iteration nach Beta**
- Bug-Fixes aus Beta
- Performance-Optimierung
- Missing Features ergänzen
- Public Launch vorbereiten

### **Monat 6: Public Launch**
- Marketing-Kampagne
- 50 Kunden Ziel
- Paid Ads (Google, Facebook)
- Content-Marketing

### **Monat 7-12: Wachstum & neue Features**
- E-Commerce Integration (Shops)
- Weitere Sektoren (Restaurant, Handwerk)
- Enterprise-Features
- KI-Integration
- 200-500 Kunden Ziel

---

## **SOFORT-SCHRITTE (diese Woche)**

### **Heute:**
1. Diesen Plan im Team besprechen
2. Commitment: Ja/Nein zur Timeline
3. Kalender blocken (30-40h/Woche)

### **Diese Woche:**
1. GitHub Repo erstellen
2. Supabase Projekt aufsetzen
3. Hetzner Server prüfen
4. Design System starten (Farben, Fonts)

### **Nächste Woche:**
1. Database Schema finalisieren
2. Remix Admin Basics (Auth)
3. Astro Template Struktur

---

**LOS GEHT'S! 🚀**

**Fragen zum Plan?**
- Ist die Timeline realistisch für euch?
- Soll ich einen Bereich detaillierter ausarbeiten?
- Habt ihr bereits Ressourcen die den Plan beschleunigen?