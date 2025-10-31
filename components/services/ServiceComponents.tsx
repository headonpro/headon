import { TechStackGrid } from './TechStackGrid'
import { ServiceMetrics } from './ServiceMetrics'
import { ArchitectureDiagram, ComparisonDiagram } from './ArchitectureDiagram'
import {
  webDevelopmentMetrics,
  webDevelopmentTechStack,
  nextjsRenderingNodes,
  mobileDevelopmentMetrics,
  mobileDevelopmentTechStack,
  uiUxDesignMetrics,
  uiUxDesignTechStack,
  backendSolutionsMetrics,
  backendSolutionsTechStack,
} from '@/lib/content/service-data'

// Wrapper components with presets for MDX
export function WebDevMetrics() {
  return <ServiceMetrics metrics={webDevelopmentMetrics} columns={2} />
}

export function WebDevTechStack() {
  return <TechStackGrid technologies={webDevelopmentTechStack} columns={4} />
}

export function NextJSArchitecture() {
  return (
    <ArchitectureDiagram
      title="Next.js Rendering-Strategien"
      description="Flexible Render-Modes für optimale Performance je nach Anwendungsfall"
      nodes={nextjsRenderingNodes}
      connections={[
        { from: "ssg", to: "ssr", label: "oder" },
        { from: "ssr", to: "isr", label: "kombiniert mit" }
      ]}
      layout="horizontal"
    />
  )
}

export function MobileDevMetrics() {
  return <ServiceMetrics metrics={mobileDevelopmentMetrics} columns={3} variant="minimal" />
}

export function MobileDevTechStack() {
  return <TechStackGrid technologies={mobileDevelopmentTechStack} columns={4} />
}

export function NativeVsCrossPlatform() {
  return (
    <ComparisonDiagram
      title="Native vs. Cross-Platform: Die richtige Wahl für Ihr Projekt"
      optionA={{
        id: "native",
        label: "Native Development",
        icon: "code",
        description: "Swift (iOS) und Kotlin (Android) - Zwei separate Codebases",
        pros: [
          "Maximale Performance und Hardware-Zugriff",
          "Früher Zugriff auf neue OS-Features",
          "Beste Integration in Plattform-Ökosysteme",
          "Ideal für AR/VR, Gaming, IoT"
        ],
        cons: [
          "2 separate Codebases = doppelte Entwicklungszeit",
          "Höhere Kosten für Entwicklung und Wartung",
          "Separate Teams für iOS und Android nötig"
        ]
      }}
      optionB={{
        id: "crossplatform",
        label: "React Native",
        icon: "smartphone",
        description: "Eine JavaScript/TypeScript Codebase für beide Plattformen",
        pros: [
          "70-80% Code-Reuse zwischen iOS und Android",
          "Schnellere Time-to-Market und niedrigere Kosten",
          "Hot Reloading für schnelle Development-Cycles",
          "Riesiges Ecosystem mit 10.000+ Libraries"
        ],
        cons: [
          "Minimal langsamere Performance als native",
          "Verzögerung bei neuen OS-Features",
          "Gelegentlich plattform-spezifischer Code nötig"
        ]
      }}
    />
  )
}

export function UIUXMetrics() {
  return <ServiceMetrics metrics={uiUxDesignMetrics} columns={2} variant="default" />
}

export function UIUXTechStack() {
  return <TechStackGrid technologies={uiUxDesignTechStack} columns={4} />
}

export function BackendMetrics() {
  return <ServiceMetrics metrics={backendSolutionsMetrics} columns={3} variant="minimal" />
}

export function BackendTechStack() {
  return <TechStackGrid technologies={backendSolutionsTechStack} columns={4} />
}

export function RESTvsGraphQL() {
  return (
    <ComparisonDiagram
      title="REST vs. GraphQL: Welche API-Architektur passt zu Ihrem Projekt?"
      optionA={{
        id: "rest",
        label: "REST API",
        icon: "server",
        description: "Resource-basierte Endpoints mit HTTP-Methoden (GET, POST, PUT, DELETE)",
        pros: [
          "Einfacher und bewährter Standard",
          "Besseres Caching durch HTTP-Standard",
          "Ideal für CRUD-Operations",
          "Geringerer Setup-Aufwand"
        ],
        cons: [
          "Over-fetching: Client erhält oft mehr Daten als nötig",
          "Under-fetching: Mehrere Requests für komplexe Daten",
          "Versionierung kann komplex werden"
        ]
      }}
      optionB={{
        id: "graphql",
        label: "GraphQL API",
        icon: "code",
        description: "Ein Endpoint, Client definiert exakt welche Daten benötigt werden",
        pros: [
          "Client holt exakt die benötigten Daten",
          "Ein Request statt mehrerer REST-Calls",
          "Stark typisiert mit Schema",
          "Ideal für komplexe Daten-Relations"
        ],
        cons: [
          "Höherer initialer Setup-Aufwand",
          "Caching komplexer als bei REST",
          "Query-Komplexität muss limitiert werden"
        ]
      }}
    />
  )
}
