import { Technology } from '@/components/services/TechStackGrid'
import { Metric } from '@/components/services/ServiceMetrics'
import { DiagramNode } from '@/components/services/ArchitectureDiagram'

// Web Development Data
export const webDevelopmentMetrics: Metric[] = [
  { value: 53, label: "Nutzer verlassen Site nach 3s", icon: "clock", suffix: "%", color: "error", description: "Ladezeit ist kritisch für Nutzerbindung" },
  { value: 7, label: "Conversion-Loss pro Sekunde", icon: "trending", suffix: "%", color: "warning", description: "Jede Sekunde Verzögerung kostet Umsatz" },
  { value: 90, label: "Lighthouse Score garantiert", icon: "zap", suffix: "+", color: "success", description: "Performance, SEO, Accessibility" },
  { value: 70, label: "Weniger Bugs mit TypeScript", icon: "shield", suffix: "%", color: "info", description: "Type-Safety reduziert Fehler drastisch" }
]

export const webDevelopmentTechStack: Technology[] = [
  { name: "Next.js 15", icon: "nextjs", category: "frontend", description: "React-Framework mit Server Components, Streaming SSR und Built-in Optimizations", color: "#000000" },
  { name: "React 19", icon: "react", category: "frontend", description: "Moderne UI-Library mit Concurrent Features und optimierter Hydration", color: "#61DAFB" },
  { name: "TypeScript", icon: "typescript", category: "frontend", description: "Statische Typisierung für bessere Code-Qualität und Developer-Experience", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", description: "Utility-First CSS-Framework für schnelles, konsistentes Styling", color: "#06B6D4" },
  { name: "Supabase", icon: "supabase", category: "backend", description: "Open-Source Firebase-Alternative mit PostgreSQL, Auth und Real-time", color: "#3ECF8E" },
  { name: "Prisma", icon: "prisma", category: "backend", description: "Type-Safe ORM für PostgreSQL mit automatischen Migrations", color: "#2D3748" },
  { name: "Docker", icon: "docker", category: "devops", description: "Containerisierung für konsistente Environments von Dev bis Production", color: "#2496ED" },
  { name: "GitHub Actions", icon: "github", category: "devops", description: "CI/CD-Pipelines für automatische Tests, Builds und Deployments", color: "#2088FF" }
]

export const nextjsRenderingNodes: DiagramNode[] = [
  { id: "ssg", label: "SSG", icon: "zap", description: "Static Site Generation - Seiten zur Build-Time pre-rendern", color: "success" },
  { id: "ssr", label: "SSR", icon: "server", description: "Server-Side Rendering - Seiten on-demand auf Server rendern", color: "primary" },
  { id: "isr", label: "ISR", icon: "cloud", description: "Incremental Static Regeneration - Static + Background-Updates", color: "accent" }
]

// Mobile Development Data
export const mobileDevelopmentMetrics: Metric[] = [
  { value: 90, label: "Mobile Internet-Nutzung", icon: "users", suffix: "%", color: "primary", description: "Über 90% der mobilen Internet-Zeit in Apps" },
  { value: 88, label: "Push-Notification Retention", icon: "zap", suffix: "%", color: "success", description: "Mehr Daily Active Users durch Push" },
  { value: 60, label: "FPS für smooth UX", icon: "target", suffix: " fps", color: "info", description: "Native Performance für flüssige Animationen" }
]

export const mobileDevelopmentTechStack: Technology[] = [
  { name: "React Native", icon: "reactnative", category: "mobile", description: "JavaScript-Framework für iOS und Android mit nativen Components", color: "#61DAFB" },
  { name: "Expo", icon: "expo", category: "mobile", description: "Development-Platform mit vereinfachten Workflows und OTA-Updates", color: "#000020" },
  { name: "Swift", icon: "swift", category: "mobile", description: "Apples moderne Sprache für iOS, iPadOS, macOS, watchOS", color: "#FA7343" },
  { name: "Kotlin", icon: "kotlin", category: "mobile", description: "Googles moderne Android-Entwicklung mit deklarativem UI", color: "#7F52FF" },
  { name: "Firebase", icon: "firebase", category: "backend", description: "Mobile-Backend mit Auth, Firestore, Cloud Functions und Push", color: "#FFCA28" },
  { name: "Supabase", icon: "supabase", category: "backend", description: "Open-Source Alternative mit PostgreSQL, Auth und Real-time", color: "#3ECF8E" },
  { name: "TypeScript", icon: "typescript", category: "mobile", description: "Statische Typisierung für React Native", color: "#3178C6" },
  { name: "Node.js", icon: "nodejs", category: "backend", description: "Custom REST-APIs für komplexe Business-Logic", color: "#339933" }
]

// UI/UX Design Data
export const uiUxDesignMetrics: Metric[] = [
  { value: 88, label: "Kehren nicht zurück nach bad UX", icon: "users", suffix: "%", color: "error", description: "Erste Impression ist entscheidend" },
  { value: 200, label: "Conversion-Steigerung möglich", icon: "trending", suffix: "%", color: "success", description: "Durch optimiertes UI/UX Design" },
  { value: 94, label: "Erster Eindruck ist Design", icon: "award", suffix: "%", color: "primary", description: "Design vermittelt Qualität und Trust" },
  { value: "1:10", label: "ROI von UX-Research", icon: "target", suffix: "", color: "info", description: "1 Euro Research spart 10 Euro Development" }
]

export const uiUxDesignTechStack: Technology[] = [
  { name: "Figma", icon: "figma", category: "design", description: "Cloud-basiertes Design-Tool mit Real-time-Collaboration und Dev-Handoff", color: "#F24E1E" },
  { name: "Photoshop", icon: "photoshop", category: "design", description: "Image-Editing für hochwertige Visual-Assets", color: "#31A8FF" },
  { name: "Illustrator", icon: "illustrator", category: "design", description: "Vector-Design für Icons, Logos und Illustrationen", color: "#FF9A00" },
  { name: "Framer", icon: "framer", category: "design", description: "Interactive Prototyping mit realistischen Animations", color: "#0055FF" }
]

// Backend Solutions Data
export const backendSolutionsMetrics: Metric[] = [
  { value: 99.9, label: "Uptime Garantie", icon: "shield", suffix: "%", color: "success", description: "Production-Grade Zuverlässigkeit" },
  { value: 200, label: "API Response Time", icon: "zap", suffix: "ms", color: "primary", description: "Optimiert für schnelle User Experience" },
  { value: 43, label: "Angriffe auf kleine Unternehmen", icon: "users", suffix: "%", color: "error", description: "Security-by-Design ist essentiell" }
]

export const backendSolutionsTechStack: Technology[] = [
  { name: "Node.js", icon: "nodejs", category: "backend", description: "JavaScript-Runtime für REST-APIs mit nicht-blockierendem I/O", color: "#339933" },
  { name: "TypeScript", icon: "typescript", category: "backend", description: "Statische Typisierung für bessere Code-Qualität", color: "#3178C6" },
  { name: "Express.js", icon: "express", category: "backend", description: "Minimalistisches Web-Framework für REST-APIs", color: "#000000" },
  { name: "PostgreSQL", icon: "postgresql", category: "database", description: "ACID-compliant SQL-Datenbank mit JSONB-Support", color: "#336791" },
  { name: "Redis", icon: "redis", category: "database", description: "In-Memory Cache für Performance-Optimierung", color: "#DC382D" },
  { name: "MongoDB", icon: "mongodb", category: "database", description: "NoSQL Document-Store für flexible Schemas", color: "#47A248" },
  { name: "Docker", icon: "docker", category: "devops", description: "Containerisierung für konsistente Environments", color: "#2496ED" },
  { name: "Nginx", icon: "nginx", category: "devops", description: "Reverse-Proxy und Load-Balancer", color: "#009639" }
]
