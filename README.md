# HEADON.pro - Kreativagentur Template

Ein modernes, hochperformantes Website-Template für HEADON.pro - eine progressive Marketing- und Kreativagentur.

## 🚀 Tech Stack

- **Frontend Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript
- **Backend:** Supabase (BaaS)
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## 📁 Projektstruktur

```
template/
├── app/                    # Next.js App Router Pages
│   ├── layout.tsx         # Root Layout mit Header/Footer
│   ├── page.tsx           # Homepage
│   ├── services/          # Services Seite
│   ├── portfolio/         # Portfolio Seite
│   ├── about/             # About Seite
│   ├── team/              # Team Seite
│   ├── blog/              # Blog Seite
│   └── contact/           # Kontakt Seite
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   ├── layout/           # Layout Komponenten
│   ├── sections/         # Section Komponenten
│   └── forms/            # Form Komponenten
├── lib/                   # Utilities und Konfiguration
└── public/               # Statische Assets
```

## 🛠 Installation

1. **Repository klonen:**
```bash
git clone [repository-url]
cd template
```

2. **Dependencies installieren:**
```bash
pnpm install
```

3. **Umgebungsvariablen konfigurieren:**
```bash
cp .env.local.example .env.local
```

Fügen Sie Ihre Supabase-Credentials in `.env.local` ein:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Entwicklungsserver starten:**
```bash
pnpm dev
```

Die Anwendung läuft unter [http://localhost:3000](http://localhost:3000).

## 📜 Verfügbare Scripts

- `pnpm dev` - Startet den Entwicklungsserver
- `pnpm build` - Erstellt die Produktions-Build
- `pnpm start` - Startet den Produktionsserver
- `pnpm lint` - Führt ESLint aus
- `pnpm lint:fix` - Behebt ESLint-Fehler automatisch
- `pnpm format` - Formatiert Code mit Prettier
- `pnpm format:check` - Prüft Code-Formatierung
- `pnpm type-check` - Prüft TypeScript-Typen

## 🎨 Design System

### Farben
- **Primary:** Königsblau (#1034A6)
- **Secondary:** Orange (#FF8C00)
- **Accent:** Gold (#FFD700)
- **Success:** Emerald (#10B981)

### Responsive Breakpoints
- `sm`: 640px (Mobile landscape)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large Desktop)
- `2xl`: 1536px (Extra Large)

## 📄 Seiten

1. **Homepage** (`/`) - Hero Section mit Services Overview
2. **Services** (`/services`) - Detaillierte Service-Angebote
3. **Portfolio** (`/portfolio`) - Projekt-Showcase
4. **About** (`/about`) - Über das Unternehmen
5. **Team** (`/team`) - Team-Mitglieder
6. **Blog** (`/blog`) - Artikel und Insights
7. **Contact** (`/contact`) - Kontaktformular

## 🔧 Entwicklung

### Code Style
- TypeScript Strict Mode aktiviert
- ESLint + Prettier für konsistente Formatierung
- Tailwind CSS für Styling
- Mobile-First Responsive Design

### Komponenten-Entwicklung
Neue UI-Komponenten können mit shadcn/ui CLI hinzugefügt werden:
```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

## 🚀 Deployment

Das Projekt ist optimiert für Deployment auf:
- Vercel (empfohlen)
- Netlify
- AWS Amplify
- Selbst-gehostete Lösungen

### Production Build
```bash
pnpm build
pnpm start
```

## 📝 Lizenz

Proprietär - Alle Rechte vorbehalten HEADON.pro

## 🤝 Kontakt

- **Email:** hello@headon.pro
- **Website:** https://headon.pro