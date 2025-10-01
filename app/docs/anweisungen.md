# HEADON.pro Kreativagentur Template - Claude Code CLI Prompt

## 🎯 Projekt-Übersicht

**Ziel:** Erstelle ein modernes, hochperformantes Website-Template für HEADON.pro - eine progressive Marketing- und Kreativagentur, die innovative Web- und Mobile-Anwendungen für Geschäftskunden entwickelt.

**Referenz-Projekt:** https://github.com/NextJSTemplates/startup-nextjs  
**Anpassung:** Von SaaS-Startup-Template zu Premium-Kreativagentur-Website

---

## 🏢 Über HEADON.pro

HEADON ist eine moderne Kreativagentur, die sich auf folgende Bereiche spezialisiert:

- **Full-Stack Web Development** (Next.js, React, TypeScript)
- **Mobile App Development** (React Native, Expo)
- **UI/UX Design** (Figma, Design Systems)
- **Cloud-Backend Lösungen** (Supabase, PostgreSQL)
- **Performance Optimization** & SEO
- **Creative Branding** & Marketing

**Zielgruppe:** Tech-affine Startups, etablierte Unternehmen, die digitale Transformation suchen

---

## 🛠 Technischer Stack (OBLIGATORISCH)

### Frontend Core
```typescript
- Next.js 15+ mit App Router
- React 18+ mit TypeScript (strict mode)
- Tailwind CSS für Styling
- shadcn/ui für UI-Komponenten
- Framer Motion für Animationen
- Lucide React für Icons
```

### Backend & Services
```typescript
- Supabase als Backend-as-a-Service
- Supabase Auth für Authentifizierung (falls benötigt)
- Supabase Storage für Media-Files
- PostgreSQL über Supabase
```

### Forms & Validation
```typescript
- React Hook Form für Formulare
- Zod für Schema-Validierung
- Server Actions für Form-Handling
```

### Development & Quality
```typescript
- ESLint + Prettier Konfiguration
- TypeScript strict mode
- Responsive Design (Mobile-First)
- Performance optimiert
- SEO-freundlich
```

---

## 📁 Projektstruktur

Erstelle folgende Ordnerstruktur basierend auf Next.js 15 App Router:

```
headon-template/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local.example
├── public/
│   ├── images/
│   ├── logos/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── team/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/ (shadcn/ui components)
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── forms/
│   │   └── animations/
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── supabase.ts
│   │   ├── validations.ts
│   │   └── types.ts
│   ├── hooks/
│   └── styles/
└── docs/
    └── deployment.md
```

---

## 🎨 Design-Anforderungen

### Visueller Stil
- **Modern & Minimalistisch** - Clean, professionelles Design
- **Creative Touch** - Subtile Animationen und Micro-Interactions
- **Premium Feel** - Hochwertige Typografie und Farbschema
- **Mobile-First** - Responsive auf allen Geräten perfekt

### Farbschema (Vorschlag)
```css
Primary: #1034A6 (Königsblau)
Secondary: #FF8C00 (Orange)
Accent: #FFD700 (Gold)
Success: #10B981 (Emerald)
Background: #FFFFFF / #0F172A (Light/Dark Mode)
Secondary Background: #F8FAFC / #1E293B (Light/Dark Mode)
Card/Surface: #F1F5F9 / #334155 (Light/Dark Mode)
Text: #1E293B / #F8FAFC (Light/Dark Mode)
Secondary Text: #64748B / #CBD5E1 (Light/Dark Mode)
Disabled Text: #CBD5E1 / #64748B (Light/Dark Mode)
```

### Typografie
- **Headlines:** Outfit
- **Body:** Lato
- **Code:** JetBrains Mono (falls Code-Beispiele)

---

## 📄 Seitenstruktur & Content

### 1. Homepage (`/`)
**Hero Section:**
- Compelling Headline: "Wir entwickeln digitale Erlebnisse, die Ihr Business transformieren"
- Subheadline über HEADON's Expertise
- Call-to-Action Buttons: "Projekt starten" & "Portfolio ansehen"
- Hero Animation/Video Background

**Sections:**
- **Services Overview** - 4 Hauptservices mit Icons
- **Featured Projects** - 3-4 Top Case Studies
- **Why Choose HEADON** - USPs mit Statistiken
- **Technology Stack** - Tech-Icons mit Hover-Effekten
- **Testimonials** - Kundenstimmen Carousel
- **CTA Section** - "Bereit für Ihr nächstes Projekt?"

### 2. Services (`/services`)
**Service-Kategorien:**
- **Web Development** (Next.js, React, Full-Stack)
- **Mobile Development** (React Native, Cross-Platform)
- **UI/UX Design** (Figma, Design Systems)
- **Backend Solutions** (Supabase, APIs, Databases)

**Jeder Service:**
- Detaillierte Beschreibung
- Tech-Stack Liste
- Pricing-Modelle
- Case Study Referenzen

### 3. Portfolio (`/portfolio`)
- **Filter-System** (Web, Mobile, Design, Backend)
- **Case Study Grid** mit Hover-Effekten
- **Detailseiten** für jeden Case Study (`/portfolio/[slug]`)
  - Problem & Solution
  - Tech-Stack verwendet
  - Ergebnisse & Metriken
  - Screenshots/Videos
  - Client Testimonial

### 4. About (`/about`)
- **HEADON Story** - Mission, Vision, Values
- **Team Section** - Founder & Key Members
- **Company Stats** - Projekte, Kunden, Jahre Erfahrung
- **Process Overview** - Wie wir arbeiten

### 5. Team (`/team`)
- **Team Member Cards** mit Hover-Effekten
- **Skills & Expertise** pro Person
- **Social Links** (LinkedIn, GitHub)
- **"Join our Team" CTA**

### 6. Blog (`/blog`)
- **Artikel-Grid** mit Kategorien
- **Detail-Seiten** (`/blog/[slug]`)
- **Kategorien:** Development, Design, Business, Tech-Trends
- **MDX Support** für rich content

### 7. Contact (`/contact`)
- **Contact Form** mit Zod-Validierung
- **Office Information** (falls vorhanden)
- **Social Media Links**
- **FAQ Section**

---

## 🧩 Komponenten-Spezifikationen

### Layout Components
```typescript
// components/layout/Header.tsx
- Responsive Navigation
- Mobile Menu (Hamburger)
- Dark/Light Mode Toggle
- Smooth Scroll Links
- Logo mit Link zur Homepage

// components/layout/Footer.tsx
- Company Info
- Quick Links
- Social Media Icons
- Newsletter Signup (optional)
- Copyright Information
```

### Section Components
```typescript
// components/sections/HeroSection.tsx
- Framer Motion Animationen
- Gradient Background
- Parallax-Effekt (optional)
- Responsive Text Sizing

// components/sections/ServicesGrid.tsx
- Service Cards mit Hover-Effekten
- Icon Integration (Lucide)
- Link zu Detail-Seiten

// components/sections/PortfolioGrid.tsx
- Masonry oder Grid Layout
- Image Optimization
- Filter Funktionalität
- Lazy Loading

// components/sections/TestimonialCarousel.tsx
- Auto-sliding Carousel
- Navigation Dots
- Responsive Design

// components/sections/TeamGrid.tsx
- Team Member Cards
- Social Links
- Skill Tags
```

### Form Components
```typescript
// components/forms/ContactForm.tsx
- React Hook Form Integration
- Zod Schema Validation
- Server Actions für Submission
- Loading States
- Success/Error Messages
- Supabase Integration für Storage
```

### UI Components (shadcn/ui erweitert)
```typescript
- Button Varianten
- Card Components
- Input Components mit Validation
- Modal/Dialog Components
- Toast Notifications
- Loading Spinners
- Progress Bars
```

---

## 🎬 Animations & Interactions

### Framer Motion Implementierungen
```typescript
// Scroll-triggered Animations
- Fade In on Scroll
- Slide In from Sides
- Stagger Children Animations

// Hover Interactions
- Card Hover Effects
- Button Hover States
- Image Zoom Effects

// Page Transitions
- Route Change Animations
- Loading Transitions
```

### Micro-Interactions
- Smooth Scrolling
- Button Click Feedback
- Form Field Focus States
- Menu Toggle Animations

---

## 🔧 Technische Features

### Performance Optimierungen
```typescript
- Image Optimization (next/image)
- Font Optimization (next/font)
- Code Splitting
- Lazy Loading
- Caching Strategies
```

### SEO & Accessibility
```typescript
- Semantic HTML Structure
- Meta Tags optimiert
- Open Graph Tags
- JSON-LD Structured Data
- ARIA Labels
- Keyboard Navigation
- Screen Reader Support
```

### Supabase Integration
```typescript
// lib/supabase.ts
- Client Configuration
- Type Generation
- Authentication Setup (falls benötigt)

// Contact Form Backend
- Form Submissions Storage
- Email Notifications
- Admin Dashboard (basic)
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```css
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large Desktop
2xl: 1536px // Extra Large
```

### Mobile-First Approach
- Touch-friendly Navigation
- Optimized Image Sizes
- Readable Typography
- Fast Loading Times

---

## 🚀 Deployment & Setup

### Environment Variables
```bash
# .env.local.example
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://headon.pro
```

### Scripts
```json
// package.json scripts
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"type-check": "tsc --noEmit"
```

---

## 📋 Entwicklungs-Checkliste

### Phase 1: Setup & Core Structure
- [ ] Projekt initialisieren mit Next.js 15
- [ ] TypeScript & ESLint Konfiguration
- [ ] Tailwind CSS + shadcn/ui Setup
- [ ] Supabase Integration
- [ ] Basic Layout Components (Header, Footer)
- [ ] Routing Structure erstellen

### Phase 2: Content Pages
- [ ] Homepage mit Hero Section
- [ ] Services Page komplett
- [ ] About Page mit Team Section
- [ ] Portfolio Page mit Filter
- [ ] Contact Page mit Form
- [ ] Blog Setup mit MDX

### Phase 3: Advanced Features
- [ ] Framer Motion Animationen
- [ ] Dark/Light Mode Toggle
- [ ] Contact Form Backend
- [ ] SEO Optimierungen
- [ ] Performance Testing

### Phase 4: Polish & Testing
- [ ] Mobile Responsive Testing
- [ ] Accessibility Audit
- [ ] Performance Optimization
- [ ] Cross-Browser Testing
- [ ] Content Integration

---

## 🎯 KLARE Erfolgs-Kriterien (MVP Focus)

### ✅ PHASE 1 SUCCESS METRICS:
- **Lighthouse Score:** 90+ (realistisch für MVP)
- **Mobile Responsive:** Funktioniert auf allen Devices
- **TypeScript:** Zero errors
- **4 Seiten:** Home, Services, About, Contact (fertig)
- **Loading Time:** < 3s (nicht < 1.5s - übertrieben für MVP)

### ✅ PHASE 2 SUCCESS METRICS:
- **Contact Form:** Funktioniert ohne Errors
- **Form Validation:** Client + Server-side
- **Email Delivery:** Server Actions funktionieren

### ❌ NICHT ALS SUCCESS METRICS (Overengineering):
- Lighthouse 90+ (MVP braucht das nicht)
- Complex Animations
- Advanced Analytics
- Perfect Accessibility Scores (basic reicht für MVP)

---

## ⚠️ CLAUDE CODE INSTRUCTIONS

### ENTWICKLUNGS-STOPP-SIGNALE:
**STOPPE ENTWICKLUNG wenn du denkst an:**
- Complex State Management (Context, Zustand)
- Custom Design System development
- Animation Libraries außer CSS
- Database Schema Design
- Authentication Systems
- Admin Dashboards
- Complex Routing (Dynamic Routes)
- API Route Handlers (außer Contact Form)

### ENTWICKLUNGS-PRIORITÄTEN:
1. **ERST:** Statische Seiten zum Laufen bringen
2. **DANN:** Contact Form minimal implementieren  
3. **ZULETZT:** Nur auf explizite Anfrage erweitern

### FRAGE BEI UNKLARHEIT:
Wenn Features nicht eindeutig als "Phase 1 MVP" definiert sind, **FRAGE NACH** anstatt zu implementieren.

---

**FINAL SCOPE:** Ein funktionierendes 4-Seiten Template, das HEADON sofort als Firmen-Website nutzen kann. Keine Experimente, keine "Nice-to-haves", nur essenzielle Business-Features.

---

## 🔗 Referenzen & Inspiration

**Design Inspiration:**
- Vercel.com (Clean, Modern)
- Linear.app (Animations)
- Stripe.com (Professional)
- Framer.com (Creative)

**Technical Reference:**
- startup-nextjs Template (Basis-Struktur)
- shadcn/ui Documentation
- Tailwind CSS Best Practices
- Next.js 15 App Router Docs

---

**WICHTIG:** Nutze das startup-nextjs Repository als Ausgangspunkt, aber passe es vollständig an die Kreativagentur-Anforderungen an. Ersetze alle SaaS-spezifischen Inhalte durch agentur-relevante Sections und Features.

**Entwicklungszeit:** Schätze 2-3 Wochen für vollständige Implementierung mit allen Features.

**Ziel:** Ein production-ready Template, das sowohl als HEADON Website dient als auch als Referenz für Kundenprojekte genutzt werden kann.