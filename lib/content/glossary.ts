/**
 * Glossary Data - Web Development, Mobile, Design & Marketing Terms
 *
 * Comprehensive glossary of 30+ technical terms targeting long-tail search queries.
 * Each term optimized for "Was ist [term]?" searches and educational content.
 */

import type { GlossaryTerm } from '@/lib/types/content'

export const glossaryTerms: GlossaryTerm[] = [
  // ============================================================================
  // Web Development Terms
  // ============================================================================
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
    category: 'development',
    shortDefinition:
      'Eine Programmierschnittstelle ermöglicht die Kommunikation zwischen verschiedenen Softwareanwendungen.',
    fullExplanation: `Eine API (Application Programming Interface) ist eine klar definierte Schnittstelle, die es verschiedenen Softwareanwendungen ermöglicht, miteinander zu kommunizieren und Daten auszutauschen. APIs definieren, welche Anfragen an ein System gestellt werden können und in welchem Format die Antworten zurückgegeben werden.

Im modernen Webentwicklungs-Kontext sind REST-APIs und GraphQL-APIs die gängigsten Formen. Sie ermöglichen es Frontend-Anwendungen, mit Backend-Servern zu kommunizieren, Daten abzurufen und zu manipulieren. APIs sind das Rückgrat moderner Web-Architekturen und ermöglichen die Integration von Drittanbieter-Services wie Zahlungsanbietern, Social-Media-Plattformen oder Cloud-Diensten.

Für Unternehmen bedeuten gut designte APIs Flexibilität, Skalierbarkeit und die Möglichkeit, verschiedene Systeme nahtlos zu integrieren. Sie sind essenziell für die Entwicklung von Web-Apps, Mobile Apps und die Anbindung von ERP-Systemen.`,
    benefits: [
      'Wiederverwendbarkeit von Funktionalitäten über verschiedene Anwendungen hinweg',
      'Modulare Architektur für bessere Wartbarkeit und Skalierbarkeit',
      'Integration von Drittanbieter-Services ohne komplexe Eigenentwicklung',
      'Trennung von Frontend und Backend für flexible Entwicklung',
    ],
    relatedTerms: [
      { term: 'REST API', id: 'rest-api' },
      { term: 'GraphQL', id: 'graphql' },
      { term: 'Backend', id: 'backend' },
    ],
    keywords: ['api', 'schnittstelle', 'integration', 'backend', 'rest', 'graphql'],
  },

  {
    id: 'rest-api',
    term: 'REST API',
    category: 'development',
    shortDefinition:
      'REST (Representational State Transfer) ist ein Architekturstil für Web-APIs, der auf HTTP-Standard-Methoden basiert.',
    fullExplanation: `REST (Representational State Transfer) ist ein weit verbreiteter Architekturstil für die Entwicklung von Web-APIs. REST-APIs nutzen Standard-HTTP-Methoden wie GET, POST, PUT und DELETE, um Ressourcen zu verwalten. Jede Ressource wird über eine eindeutige URL (Endpoint) identifiziert und kann in verschiedenen Formaten wie JSON oder XML zurückgegeben werden.

Der große Vorteil von REST-APIs liegt in ihrer Einfachheit und Standardisierung. Sie sind zustandslos (stateless), was bedeutet, dass jede Anfrage alle notwendigen Informationen enthält. Dies macht REST-APIs hochgradig skalierbar und einfach zu cachen. Die Verwendung von HTTP-Standard-Methoden macht sie intuitiv verständlich und leicht zu implementieren.

In der modernen Webentwicklung sind REST-APIs der De-facto-Standard für die Kommunikation zwischen Frontend und Backend. Sie ermöglichen es, Web-Apps, Mobile Apps und IoT-Geräte mit denselben Backend-Services zu verbinden.`,
    benefits: [
      'Standardisiert und weit verbreitet - einfach zu verstehen und zu implementieren',
      'Zustandslos (stateless) für hohe Skalierbarkeit',
      'Nutzung von HTTP-Standard-Methoden für intuitive API-Struktur',
      'Effizientes Caching möglich für bessere Performance',
    ],
    relatedTerms: [
      { term: 'API', id: 'api' },
      { term: 'GraphQL', id: 'graphql' },
      { term: 'JSON', id: 'json' },
    ],
    keywords: ['rest', 'api', 'http', 'web services', 'backend'],
  },

  {
    id: 'graphql',
    term: 'GraphQL',
    category: 'development',
    shortDefinition:
      'GraphQL ist eine Abfragesprache für APIs, die es Clients ermöglicht, genau die Daten anzufordern, die sie benötigen.',
    fullExplanation: `GraphQL ist eine moderne Alternative zu REST-APIs, entwickelt von Facebook (Meta). Im Gegensatz zu REST, wo jeder Endpoint eine feste Datenstruktur zurückgibt, können Clients bei GraphQL genau spezifizieren, welche Daten sie benötigen. Dies eliminiert Over-Fetching (zu viele Daten) und Under-Fetching (zu wenige Daten), zwei häufige Probleme bei REST-APIs.

GraphQL verwendet ein stark typisiertes Schema, das alle verfügbaren Datentypen und Operationen definiert. Clients senden Queries (Leseanfragen) oder Mutations (Schreibanfragen) an einen einzigen Endpoint und erhalten exakt die gewünschten Daten. Dies reduziert die Anzahl der Netzwerkanfragen und verbessert die Performance, besonders bei mobilen Anwendungen mit begrenzter Bandbreite.

Für komplexe Anwendungen mit vielen Datenrelationen bietet GraphQL erhebliche Vorteile in Flexibilität und Entwicklungsgeschwindigkeit. Die Selbstdokumentation durch das Schema macht APIs leichter verständlich und wartbar.`,
    benefits: [
      'Präzise Datenabfragen - Clients erhalten exakt die benötigten Daten',
      'Reduzierte Anzahl an API-Aufrufen durch verschachtelte Queries',
      'Stark typisiertes Schema für bessere Entwickler-Experience',
      'Selbstdokumentation und automatische API-Dokumentation',
    ],
    relatedTerms: [
      { term: 'API', id: 'api' },
      { term: 'REST API', id: 'rest-api' },
      { term: 'TypeScript', id: 'typescript' },
    ],
    keywords: ['graphql', 'api', 'query language', 'backend', 'apollo'],
  },

  {
    id: 'react',
    term: 'React',
    category: 'technology',
    shortDefinition:
      'React ist eine JavaScript-Bibliothek für den Aufbau von Benutzeroberflächen, entwickelt von Meta (Facebook).',
    fullExplanation: `React ist die weltweit beliebteste JavaScript-Bibliothek für die Entwicklung moderner Benutzeroberflächen. Entwickelt von Meta (ehemals Facebook), basiert React auf einem komponentenbasierten Ansatz, bei dem UIs aus wiederverwendbaren, in sich geschlossenen Komponenten aufgebaut werden. Diese Architektur fördert Wartbarkeit und Skalierbarkeit auch bei sehr großen Anwendungen.

Das Kernkonzept von React ist der Virtual DOM - eine virtuelle Repräsentation der UI im Speicher. React vergleicht den Virtual DOM mit dem tatsächlichen DOM und aktualisiert nur die Teile, die sich geändert haben. Dies führt zu hochperformanten Anwendungen mit flüssigen User Interfaces. Mit der Einführung von React Hooks wurde die Entwicklung noch einfacher und funktionaler.

React wird von Unternehmen wie Meta, Netflix, Airbnb und Instagram eingesetzt und hat das größte Ecosystem im Frontend-Bereich. Es bildet die Grundlage für Frameworks wie Next.js, die zusätzliche Features wie Server-Side Rendering und Static Site Generation bieten.`,
    benefits: [
      'Riesiges Ecosystem mit Libraries für nahezu jeden Anwendungsfall',
      'Komponentenbasierte Architektur für Wiederverwendbarkeit',
      'Hervorragende Performance durch Virtual DOM',
      'Beste Job-Markt-Aussichten für Entwickler',
    ],
    relatedTerms: [
      { term: 'Next.js', id: 'nextjs' },
      { term: 'TypeScript', id: 'typescript' },
      { term: 'Single Page Application', id: 'spa' },
    ],
    keywords: ['react', 'javascript', 'frontend', 'ui', 'component'],
  },

  {
    id: 'nextjs',
    term: 'Next.js',
    category: 'technology',
    shortDefinition:
      'Next.js ist ein React-Framework für produktionsreife Web-Anwendungen mit Server-Side Rendering und Static Site Generation.',
    fullExplanation: `Next.js ist das führende Framework für React-basierte Webanwendungen, entwickelt von Vercel. Es erweitert React um essenzielle Features für produktionsreife Anwendungen: Server-Side Rendering (SSR), Static Site Generation (SSG), API-Routes, automatisches Code-Splitting und optimierte Performance. Next.js löst viele Herausforderungen, die bei der Entwicklung mit reinem React auftreten.

Ein großer Vorteil von Next.js ist die hervorragende SEO-Performance. Während reine React-Apps clientseitig gerendert werden (was Suchmaschinen-Crawling erschwert), kann Next.js Seiten bereits auf dem Server rendern oder als statische HTML-Dateien generieren. Dies führt zu schnelleren Ladezeiten, besserer SEO und verbesserter User Experience.

Mit Next.js 13 und dem App Router hat Vercel Server Components und Streaming eingeführt, die die Performance und Entwickler-Experience noch weiter verbessern. Next.js ist die erste Wahl für moderne E-Commerce-Plattformen, Marketing-Websites und SaaS-Anwendungen.`,
    benefits: [
      'Exzellente SEO durch Server-Side Rendering und Static Site Generation',
      'Automatische Performance-Optimierungen (Code-Splitting, Image-Optimization)',
      'Integrierte API-Routes für Full-Stack-Entwicklung',
      'Deployment-Ready mit Vercel oder anderen Hosting-Plattformen',
    ],
    relatedTerms: [
      { term: 'React', id: 'react' },
      { term: 'Server-Side Rendering', id: 'ssr' },
      { term: 'SEO', id: 'seo' },
    ],
    keywords: ['nextjs', 'next.js', 'react', 'framework', 'ssr', 'ssg'],
  },

  {
    id: 'typescript',
    term: 'TypeScript',
    category: 'technology',
    shortDefinition:
      'TypeScript ist eine typisierte Erweiterung von JavaScript, die Fehler bereits während der Entwicklung aufdeckt.',
    fullExplanation: `TypeScript ist eine von Microsoft entwickelte Programmiersprache, die JavaScript um ein statisches Typsystem erweitert. Während JavaScript dynamisch typisiert ist (Variablen können jeden Typ annehmen), müssen in TypeScript Typen explizit deklariert werden. Dies mag zunächst nach mehr Arbeit klingen, führt aber zu deutlich robusterem und wartbarerem Code.

Der große Vorteil: TypeScript-Code wird während der Entwicklung auf Typfehler geprüft, lange bevor der Code ausgeführt wird. Dies verhindert eine ganze Kategorie von Bugs und macht Refactoring in großen Codebases sicherer. Moderne IDEs bieten durch TypeScript exzellente Autovervollständigung und Inline-Dokumentation. Der Code dokumentiert sich quasi selbst durch die Typen.

TypeScript hat sich zum Standard für professionelle JavaScript-Entwicklung entwickelt. Große Projekte wie Angular, Vue 3 und Next.js setzen vollständig auf TypeScript. Die initiale Investition in Typ-Definitionen zahlt sich durch weniger Bugs, bessere Wartbarkeit und schnellere Onboarding-Zeiten neuer Entwickler mehrfach aus.`,
    benefits: [
      'Frühe Fehlererkennung bereits während der Entwicklung',
      'Bessere IDE-Unterstützung mit Autovervollständigung',
      'Erhöhte Code-Qualität und Wartbarkeit in großen Projekten',
      'Selbstdokumentation durch explizite Typen',
    ],
    relatedTerms: [
      { term: 'JavaScript', id: 'javascript' },
      { term: 'React', id: 'react' },
      { term: 'Next.js', id: 'nextjs' },
    ],
    keywords: ['typescript', 'javascript', 'types', 'typisierung', 'static types'],
  },

  {
    id: 'javascript',
    term: 'JavaScript',
    category: 'technology',
    shortDefinition:
      'JavaScript ist die Standard-Programmiersprache des Webs für interaktive Benutzeroberflächen.',
    fullExplanation: `JavaScript ist die Programmiersprache des Webs und läuft in jedem modernen Browser. Ursprünglich 1995 entwickelt, hat sich JavaScript zu einer der wichtigsten und vielseitigsten Programmiersprachen entwickelt. Mit JavaScript können interaktive Benutzeroberflächen, komplexe Web-Anwendungen und sogar Server-Anwendungen (Node.js) entwickelt werden.

Modern JavaScript (ES6 und neuer) bietet mächtige Features wie Arrow Functions, Destructuring, Async/Await und Module, die die Entwicklung eleganter und wartbarer machen. Das JavaScript-Ecosystem ist riesig - mit npm steht die weltweit größte Paketbibliothek zur Verfügung. Egal ob Frontend-Framework, Testing-Library oder Build-Tool - für fast jedes Problem gibt es eine JavaScript-Lösung.

Für Webentwicklung ist JavaScript unverzichtbar. Es ist die einzige Sprache, die nativ in allen Browsern läuft. Frameworks wie React, Vue und Angular basieren auf JavaScript, ebenso wie Node.js für Backend-Entwicklung. Wer modern entwickeln möchte, kommt an JavaScript nicht vorbei.`,
    benefits: [
      'Universell einsetzbar - Frontend, Backend, Mobile, Desktop',
      'Riesiges Ecosystem mit Millionen von Paketen auf npm',
      'Läuft nativ in jedem Browser ohne Installation',
      'Aktive Community und kontinuierliche Weiterentwicklung',
    ],
    relatedTerms: [
      { term: 'TypeScript', id: 'typescript' },
      { term: 'React', id: 'react' },
      { term: 'Node.js', id: 'nodejs' },
    ],
    keywords: ['javascript', 'js', 'programmiersprache', 'web', 'frontend'],
  },

  {
    id: 'nodejs',
    term: 'Node.js',
    category: 'technology',
    shortDefinition:
      'Node.js ist eine JavaScript-Laufzeitumgebung für die serverseitige Entwicklung mit JavaScript.',
    fullExplanation: `Node.js ist eine Laufzeitumgebung, die es ermöglicht, JavaScript außerhalb des Browsers auszuführen - primär für Server-Anwendungen. Node.js basiert auf Googles V8-Engine und ist bekannt für seine hervorragende Performance bei I/O-intensiven Operationen. Das Event-Driven, Non-Blocking-Modell macht Node.js besonders effizient für Anwendungen mit vielen gleichzeitigen Verbindungen.

Mit Node.js können Entwickler dieselbe Sprache (JavaScript) für Frontend und Backend verwenden. Dies vereinfacht die Entwicklung erheblich, reduziert Kontextwechsel und ermöglicht Code-Sharing zwischen Client und Server. Das npm-Ecosystem stellt Millionen von Paketen zur Verfügung, von Web-Frameworks wie Express.js bis zu Datenbank-Treibern.

Node.js wird von Unternehmen wie Netflix, PayPal, LinkedIn und Uber eingesetzt. Es eignet sich besonders für REST-APIs, Realtime-Anwendungen (WebSockets), Microservices und Server-Side Rendering. Die aktive Community und kontinuierliche Weiterentwicklung machen Node.js zur ersten Wahl für moderne Backend-Entwicklung.`,
    benefits: [
      'JavaScript für Frontend und Backend - ein Tech-Stack',
      'Exzellente Performance bei vielen gleichzeitigen Verbindungen',
      'Riesiges npm-Ecosystem mit fertigen Lösungen',
      'Ideal für APIs, Microservices und Realtime-Anwendungen',
    ],
    relatedTerms: [
      { term: 'JavaScript', id: 'javascript' },
      { term: 'API', id: 'api' },
      { term: 'Backend', id: 'backend' },
    ],
    keywords: ['nodejs', 'node.js', 'javascript', 'backend', 'server'],
  },

  {
    id: 'backend',
    term: 'Backend',
    category: 'development',
    shortDefinition:
      'Das Backend ist der serverseitige Teil einer Anwendung, der Geschäftslogik, Datenverarbeitung und Datenspeicherung übernimmt.',
    fullExplanation: `Das Backend (oder Server-Side) einer Anwendung ist für alle nicht-sichtbaren Prozesse zuständig: Datenverarbeitung, Geschäftslogik, Authentifizierung, Datenbank-Operationen und die Bereitstellung von APIs für das Frontend. Während das Frontend die Benutzeroberfläche darstellt, ist das Backend das "Gehirn" der Anwendung.

Ein typisches Backend besteht aus einem Webserver (z.B. Node.js, Python/Django, Ruby on Rails), einer Datenbank (PostgreSQL, MongoDB) und Business-Logic-Schichten. Das Backend validiert Eingaben, führt Berechnungen durch, verwaltet Benutzer-Sessions und stellt sicher, dass Daten sicher und korrekt gespeichert werden. Security ist im Backend besonders kritisch, da hier sensitive Daten verarbeitet werden.

Moderne Backend-Architekturen nutzen oft Microservices - kleine, unabhängige Services, die spezifische Aufgaben übernehmen. Dies erhöht Skalierbarkeit und Wartbarkeit. APIs (meist REST oder GraphQL) sind die Schnittstelle zwischen Backend und Frontend/Mobile-Apps. Ein gut designtes Backend ist die Grundlage für skalierbare, sichere und performante Anwendungen.`,
    benefits: [
      'Zentrale Geschäftslogik für konsistente Datenverarbeitung',
      'Sichere Verarbeitung sensibler Daten',
      'Skalierbar durch Microservices-Architektur',
      'Wiederverwendbar für verschiedene Frontends (Web, Mobile, Desktop)',
    ],
    relatedTerms: [
      { term: 'API', id: 'api' },
      { term: 'Node.js', id: 'nodejs' },
      { term: 'Datenbank', id: 'datenbank' },
    ],
    keywords: ['backend', 'server', 'api', 'datenbank', 'business logic'],
  },

  // ============================================================================
  // Frontend & Design Terms
  // ============================================================================
  {
    id: 'responsive-design',
    term: 'Responsive Design',
    category: 'design',
    shortDefinition:
      'Responsive Design sorgt dafür, dass Websites auf allen Geräten - vom Smartphone bis zum Desktop - optimal dargestellt werden.',
    fullExplanation: `Responsive Design ist ein Gestaltungsansatz, bei dem sich das Layout einer Website dynamisch an die Bildschirmgröße des Endgeräts anpasst. Statt separate Versionen für Desktop, Tablet und Smartphone zu entwickeln, passt sich ein responsives Design automatisch an. Dies wird durch flexible Layouts, Media Queries und anpassbare Bilder erreicht.

In einer Welt, in der über 60% des Web-Traffics von mobilen Geräten kommt, ist Responsive Design unverzichtbar. Google verwendet Mobile-First-Indexing, was bedeutet, dass die mobile Version einer Website primär für das Ranking berücksichtigt wird. Eine nicht-responsive Website wird in Suchergebnissen benachteiligt und verliert potenzielle Besucher.

Moderne CSS-Frameworks wie Tailwind CSS und Tools wie Flexbox und CSS Grid machen Responsive Design einfacher denn je. Die Investition in responsives Design zahlt sich mehrfach aus: bessere User Experience, höhere Conversion-Rates, besseres SEO-Ranking und geringere Entwicklungskosten durch einen einheitlichen Codebase.`,
    benefits: [
      'Optimale Darstellung auf allen Geräten und Bildschirmgrößen',
      'Besseres SEO-Ranking durch Mobile-First-Indexing',
      'Höhere Conversion-Rates durch bessere Mobile-Experience',
      'Geringere Entwicklungskosten durch einheitlichen Codebase',
    ],
    relatedTerms: [
      { term: 'Mobile-First', id: 'mobile-first' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
      { term: 'CSS', id: 'css' },
    ],
    keywords: ['responsive', 'mobile', 'adaptive', 'design', 'layout'],
  },

  {
    id: 'ui-ux-design',
    term: 'UI/UX Design',
    category: 'design',
    shortDefinition:
      'UI (User Interface) ist das visuelle Design, UX (User Experience) ist die gesamte Nutzererfahrung einer Anwendung.',
    fullExplanation: `UI/UX Design sind zwei eng verbundene, aber unterschiedliche Disziplinen. UI (User Interface) Design fokussiert sich auf die visuelle Gestaltung - Farben, Typografie, Buttons, Icons und Layout. Es geht darum, eine ästhetisch ansprechende und markenkonsistente Oberfläche zu schaffen. UX (User Experience) Design hingegen umfasst die gesamte Nutzererfahrung: Wie intuitiv ist die Navigation? Wie schnell erreichen Nutzer ihr Ziel? Wie fühlt sich die Interaktion an?

Gutes UX Design beginnt mit User Research - dem Verstehen der Zielgruppe, ihrer Bedürfnisse und Pain Points. Darauf aufbauend werden User Journeys, Wireframes und Prototypen erstellt. Das Ziel: Eine Anwendung, die nicht nur gut aussieht (UI), sondern auch intuitiv bedienbar ist und Nutzer effizient zu ihrem Ziel führt (UX). A/B-Testing und kontinuierliche Optimierung sind Teil des Prozesses.

Investitionen in professionelles UI/UX Design zahlen sich direkt aus: Höhere Conversion-Rates, geringere Support-Anfragen, bessere User-Retention und positive Markenwahrnehmung. Studien zeigen, dass jeder Euro, der in UX investiert wird, einen ROI von 2-100 Euro bringen kann.`,
    benefits: [
      'Höhere Conversion-Rates durch intuitive Nutzerführung',
      'Reduzierte Support-Kosten durch selbsterklärende Interfaces',
      'Bessere User-Retention und Kundenbindung',
      'Stärkere Markenidentität durch konsistentes Design',
    ],
    relatedTerms: [
      { term: 'Responsive Design', id: 'responsive-design' },
      { term: 'Prototyping', id: 'prototyping' },
      { term: 'Wireframe', id: 'wireframe' },
    ],
    keywords: ['ui', 'ux', 'design', 'user experience', 'user interface', 'usability'],
  },

  {
    id: 'wireframe',
    term: 'Wireframe',
    category: 'design',
    shortDefinition:
      'Ein Wireframe ist eine schematische Darstellung des Layouts einer Website oder App ohne visuelle Gestaltung.',
    fullExplanation: `Ein Wireframe ist eine vereinfachte, meist schwarz-weiße Skizze des Layouts einer Website oder App. Es zeigt die Struktur, Anordnung von Elementen und grundlegende Funktionalität - ohne Ablenkung durch Farben, Bilder oder Typografie. Wireframes sind ein essenzielles Tool im Design-Prozess und dienen als Kommunikationsmittel zwischen Designern, Entwicklern und Stakeholdern.

Der Fokus von Wireframes liegt auf Informationsarchitektur und User Flow: Wo werden welche Inhalte platziert? Wie navigieren Nutzer durch die Anwendung? Welche Interaktionselemente sind notwendig? Durch die reduzierte Darstellung können Diskussionen über Layout und Funktionalität geführt werden, ohne dass bereits Zeit in hochauflösende Designs investiert wurde.

Wireframes können von simplen Papier-Skizzen bis zu interaktiven digitalen Prototypen reichen. Tools wie Figma, Sketch oder Adobe XD ermöglichen es, schnell klickbare Prototypen zu erstellen. Wireframing spart Zeit und Geld, da strukturelle Probleme früh erkannt und behoben werden können - bevor mit der visuellen Gestaltung oder Entwicklung begonnen wird.`,
    benefits: [
      'Frühe Validierung von Informationsarchitektur und Navigation',
      'Schnelle Iteration ohne aufwändiges visuelles Design',
      'Effektive Kommunikation zwischen Designern, Entwicklern und Kunden',
      'Kostenersparnis durch frühe Problemerkennung',
    ],
    relatedTerms: [
      { term: 'Prototyping', id: 'prototyping' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
      { term: 'Mockup', id: 'mockup' },
    ],
    keywords: ['wireframe', 'layout', 'skizze', 'prototype', 'design'],
  },

  {
    id: 'prototyping',
    term: 'Prototyping',
    category: 'design',
    shortDefinition:
      'Prototyping ist die Erstellung eines interaktiven Modells einer Anwendung, um Design und Funktionalität zu testen.',
    fullExplanation: `Prototyping ist der Prozess, bei dem ein interaktives, klickbares Modell einer Website oder App erstellt wird - vor der eigentlichen Entwicklung. Prototypen können von einfachen Klick-Dummies bis zu hochfunktionalen Anwendungen mit simulierten Daten reichen. Der Zweck: Design-Entscheidungen validieren, User Flows testen und Stakeholder-Feedback einholen - bevor teure Entwicklungsressourcen investiert werden.

Es gibt verschiedene Prototyping-Fidelity-Stufen: Low-Fidelity (einfache Wireframes), Mid-Fidelity (mit grundlegendem Styling) und High-Fidelity (nahezu identisch mit dem finalen Produkt). Tools wie Figma, Adobe XD und Framer ermöglichen es, innerhalb weniger Stunden interaktive Prototypen zu erstellen. Diese können direkt mit Nutzern getestet werden (Usability-Testing), um Probleme in der Navigation oder Nutzerführung zu identifizieren.

Der Wert von Prototyping liegt in der Risikoreduktion: Annahmen über Nutzerverhalten können validiert werden, bevor Code geschrieben wird. Studien zeigen, dass die Behebung eines UX-Problems im Prototyping-Stadium 10x günstiger ist als nach dem Launch. Prototyping ist Pflicht für jedes professionelle Digitalprojekt.`,
    benefits: [
      'Validierung von Design und User Flow vor der Entwicklung',
      'Frühe Erkennung von Usability-Problemen',
      'Einfachere Stakeholder-Kommunikation durch visualisiertes Produkt',
      '10x günstigere Fehlerkorrektur als nach dem Launch',
    ],
    relatedTerms: [
      { term: 'Wireframe', id: 'wireframe' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
      { term: 'MVP', id: 'mvp' },
    ],
    keywords: ['prototyping', 'prototype', 'mockup', 'design', 'testing'],
  },

  {
    id: 'mockup',
    term: 'Mockup',
    category: 'design',
    shortDefinition:
      'Ein Mockup ist eine hochauflösende, statische Visualisierung des finalen Designs einer Website oder App.',
    fullExplanation: `Ein Mockup ist eine pixelgenaue, statische Darstellung des finalen Designs einer Website oder App - inklusive Farben, Typografie, Bildern und Branding. Im Gegensatz zu Wireframes (strukturell) oder Prototypen (interaktiv) zeigt ein Mockup genau, wie die fertige Anwendung visuell aussehen wird. Mockups sind das Endergebnis der Design-Phase und dienen als Vorlage für die Entwicklung.

Mockups werden in Design-Tools wie Figma, Sketch oder Adobe XD erstellt und beinhalten alle visuellen Details: Farbpalette, Schriftarten, Spacing, Iconografie und Bildmaterial. Sie ermöglichen es Stakeholdern, das finale Erscheinungsbild zu beurteilen und Feedback zu geben, bevor die Entwicklung beginnt. Oft werden Mockups in verschiedenen Ansichten erstellt (Desktop, Tablet, Mobile), um Responsive Design zu demonstrieren.

Der Unterschied zu Prototypen: Mockups sind statisch, während Prototypen interaktiv und klickbar sind. In der Praxis werden oft Mockups in Prototypen umgewandelt, um sowohl visuelles Design als auch User Flow zu demonstrieren. Mockups sind essenziell für die Qualitätssicherung - sie stellen sicher, dass Design und Entwicklung aligned sind.`,
    benefits: [
      'Pixelgenaue Visualisierung des finalen Designs',
      'Frühzeitige Freigabe durch Stakeholder vor Entwicklungsbeginn',
      'Klare Design-Specs für Entwickler',
      'Vermeidung von Missverständnissen zwischen Design und Development',
    ],
    relatedTerms: [
      { term: 'Wireframe', id: 'wireframe' },
      { term: 'Prototyping', id: 'prototyping' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
    ],
    keywords: ['mockup', 'design', 'visualisierung', 'layout', 'screen design'],
  },

  // ============================================================================
  // Mobile & App Development Terms
  // ============================================================================
  {
    id: 'react-native',
    term: 'React Native',
    category: 'technology',
    shortDefinition:
      'React Native ist ein Framework für die plattformübergreifende Entwicklung nativer Mobile Apps mit JavaScript.',
    fullExplanation: `React Native, entwickelt von Meta (Facebook), ermöglicht die Entwicklung nativer Mobile Apps für iOS und Android mit einer einzigen JavaScript/TypeScript-Codebase. Im Gegensatz zu hybriden Apps (die WebViews nutzen) rendert React Native echte native UI-Komponenten. Das Ergebnis: Apps mit nativer Performance und Look-and-Feel, aber deutlich geringeren Entwicklungskosten als bei separater Entwicklung für jede Plattform.

Der größte Vorteil von React Native ist Code-Sharing: Bis zu 90% des Codes können zwischen iOS und Android geteilt werden. Dies halbiert nicht nur die initiale Entwicklungszeit, sondern auch die langfristigen Wartungskosten. Entwickler, die bereits React kennen, können sofort mit Mobile-Entwicklung starten. Das Ecosystem ist riesig - für fast jede native Funktion (Kamera, GPS, Push-Notifications) gibt es fertige Libraries.

React Native wird von Unternehmen wie Instagram, Uber Eats, Discord und Shopify eingesetzt. Es ist die erste Wahl für Startups und Unternehmen, die schnell auf iOS und Android launchen wollen, ohne zwei separate Teams zu benötigen. Die Performance ist für die meisten Anwendungsfälle mehr als ausreichend, und durch native Module können performancekritische Teile in Swift/Kotlin implementiert werden.`,
    benefits: [
      'Eine Codebase für iOS und Android - bis zu 90% Code-Sharing',
      'Native Performance und Look-and-Feel',
      'Schnellere Time-to-Market und geringere Entwicklungskosten',
      'Hot Reloading für schnelle Entwicklungszyklen',
    ],
    relatedTerms: [
      { term: 'React', id: 'react' },
      { term: 'Mobile App', id: 'mobile-app' },
      { term: 'Cross-Platform', id: 'cross-platform' },
    ],
    keywords: ['react native', 'mobile', 'app', 'ios', 'android', 'cross-platform'],
  },

  {
    id: 'mobile-app',
    term: 'Mobile App',
    category: 'development',
    shortDefinition:
      'Eine Mobile App ist eine Softwareanwendung, die speziell für mobile Geräte wie Smartphones und Tablets entwickelt wurde.',
    fullExplanation: `Mobile Apps sind Anwendungen, die auf Smartphones und Tablets laufen und über App Stores (Apple App Store, Google Play Store) verteilt werden. Im Gegensatz zu mobilen Websites sind Apps installierte Programme, die direkten Zugriff auf Gerätefunktionen (Kamera, GPS, Benachrichtigungen, Sensoren) haben und auch offline funktionieren können.

Es gibt drei Haupttypen von Mobile Apps: Native Apps (separat für iOS/Android entwickelt), Cross-Platform Apps (eine Codebase für beide Plattformen mit React Native, Flutter) und Hybrid Apps (im Prinzip Websites in App-Hülle). Native und Cross-Platform Apps bieten die beste Performance und User Experience. Die Wahl hängt von Budget, Anforderungen und Zielgruppe ab.

Mobile Apps sind für viele Geschäftsmodelle essenziell: E-Commerce profitiert von Push-Notifications, SaaS-Anwendungen benötigen Offline-Funktionalität, und Consumer-Apps leben von nativen Features wie der Kamera. Eine professionelle Mobile-Strategie kann Conversion-Rates um bis zu 300% steigern und die Kundenbindung erheblich verbessern.`,
    benefits: [
      'Direkter Zugriff auf native Gerätefunktionen (Kamera, GPS, Sensoren)',
      'Bessere Performance als mobile Websites',
      'Offline-Funktionalität für unterbrechungsfreie Nutzung',
      'Push-Notifications für direkte Nutzerkommunikation',
    ],
    relatedTerms: [
      { term: 'React Native', id: 'react-native' },
      { term: 'Cross-Platform', id: 'cross-platform' },
      { term: 'Progressive Web App', id: 'pwa' },
    ],
    keywords: ['mobile app', 'app', 'ios', 'android', 'smartphone', 'mobile'],
  },

  {
    id: 'cross-platform',
    term: 'Cross-Platform Development',
    category: 'development',
    shortDefinition:
      'Cross-Platform Development ermöglicht die Entwicklung von Apps für mehrere Plattformen mit einer gemeinsamen Codebase.',
    fullExplanation: `Cross-Platform Development bezeichnet die Entwicklung von Softwareanwendungen, die auf mehreren Betriebssystemen oder Plattformen laufen - typischerweise iOS, Android und Web - mit einer weitgehend gemeinsamen Codebase. Frameworks wie React Native, Flutter oder .NET MAUI ermöglichen es, bis zu 90% des Codes plattformübergreifend zu teilen, während native UI-Komponenten verwendet werden.

Der Business Case für Cross-Platform ist klar: Anstatt zwei separate Teams für iOS (Swift) und Android (Kotlin) zu benötigen, kann ein Team beide Plattformen bedienen. Dies reduziert Entwicklungskosten um 30-50% und ermöglicht schnellere Time-to-Market. Neue Features müssen nur einmal implementiert werden, nicht zweimal. Auch Wartung und Bug-Fixes sind effizienter.

Die Performance-Lücke zwischen nativen und Cross-Platform Apps ist in den letzten Jahren drastisch geschrumpft. Für die meisten Business-Anwendungen ist Cross-Platform die wirtschaftlich sinnvollste Wahl. Nur bei sehr performance-kritischen Apps (3D-Games, AR/VR) ist native Entwicklung noch zu empfehlen. Erfolgreiche Apps wie Instagram, Discord und Uber Eats nutzen Cross-Platform-Technologien.`,
    benefits: [
      'Bis zu 50% Kostenersparnis durch Code-Sharing',
      'Schnellere Time-to-Market für beide Plattformen',
      'Einfachere Wartung - ein Codebase statt zwei',
      'Konsistente User Experience über Plattformen hinweg',
    ],
    relatedTerms: [
      { term: 'React Native', id: 'react-native' },
      { term: 'Mobile App', id: 'mobile-app' },
      { term: 'Native App', id: 'native-app' },
    ],
    keywords: ['cross-platform', 'plattformübergreifend', 'mobile', 'ios', 'android'],
  },

  {
    id: 'pwa',
    term: 'Progressive Web App (PWA)',
    category: 'technology',
    shortDefinition:
      'PWAs sind Webanwendungen, die App-ähnliche Features wie Offline-Funktionalität und Push-Notifications bieten.',
    fullExplanation: `Progressive Web Apps (PWAs) sind Webanwendungen, die moderne Web-APIs nutzen, um App-ähnliche Funktionalität zu bieten - ohne dass Nutzer sie aus einem App Store herunterladen müssen. PWAs können auf dem Homescreen installiert werden, offline funktionieren (durch Service Workers), Push-Notifications senden und auf Geräte-Hardware zugreifen. Sie vereinen das Beste aus Web und Native Apps.

Die Vorteile von PWAs sind erheblich: Keine App-Store-Genehmigung notwendig, Updates erfolgen automatisch ohne Nutzerinteraktion, und eine Codebase funktioniert auf allen Plattformen (iOS, Android, Desktop). Die Entwicklungskosten sind 60-70% niedriger als bei nativen Apps. PWAs sind über URLs zugänglich, was SEO-Vorteile bringt und die Auffindbarkeit erhöht.

Große Unternehmen wie Twitter, Pinterest und Starbucks setzen erfolgreich auf PWAs. Twitter Lite (PWA) ist 3% der Größe der nativen Android-App und lädt in unter 3 Sekunden. PWAs sind ideal für Content-Plattformen, E-Commerce und Business-Tools. Für Apps, die intensive native Features benötigen (z.B. Bluetooth, NFC), sind native oder Cross-Platform-Apps noch besser geeignet.`,
    benefits: [
      'Keine App-Store-Verteilung notwendig - direkt über URL zugänglich',
      'Automatische Updates ohne Nutzeraktion',
      '60-70% geringere Entwicklungskosten als native Apps',
      'SEO-Vorteile durch Web-Natur',
    ],
    relatedTerms: [
      { term: 'Mobile App', id: 'mobile-app' },
      { term: 'Service Worker', id: 'service-worker' },
      { term: 'Offline-First', id: 'offline-first' },
    ],
    keywords: ['pwa', 'progressive web app', 'offline', 'service worker', 'web app'],
  },

  // ============================================================================
  // Performance & SEO Terms
  // ============================================================================
  {
    id: 'seo',
    term: 'SEO (Search Engine Optimization)',
    category: 'marketing',
    shortDefinition:
      'SEO umfasst alle Maßnahmen zur Verbesserung der Sichtbarkeit einer Website in Suchmaschinen-Ergebnissen.',
    fullExplanation: `SEO (Search Engine Optimization / Suchmaschinenoptimierung) ist die Kunst und Wissenschaft, Websites so zu optimieren, dass sie in Suchmaschinen wie Google höher ranken. Da 90% der Nutzer nur die erste Seite der Suchergebnisse betrachten, kann gutes SEO den Unterschied zwischen Erfolg und Misserfolg einer Online-Präsenz ausmachen. SEO ist eine langfristige Investition, die organischen (kostenlosen) Traffic generiert.

SEO gliedert sich in drei Hauptbereiche: On-Page-SEO (Content, Keywords, Meta-Tags, Struktur), Technical SEO (Performance, Mobile-Friendliness, Crawlability, Structured Data) und Off-Page-SEO (Backlinks, Brand Mentions). Moderne SEO fokussiert sich zunehmend auf User Experience - Seiten, die schnell laden, mobile-optimiert sind und hochwertige Inhalte bieten, werden bevorzugt.

Die Vorteile von professionellem SEO sind messbar: Studien zeigen, dass die Top-3-Positionen in Google 75% des gesamten Traffics erhalten. Im Gegensatz zu bezahlten Ads (Google Ads) ist organischer Traffic nachhaltig und kosteneffizient. SEO benötigt 3-6 Monate für sichtbare Ergebnisse, zahlt sich aber langfristig vielfach aus.`,
    benefits: [
      'Nachhaltige Steigerung des organischen Traffics',
      'Höhere Glaubwürdigkeit als bezahlte Werbung',
      'Besserer ROI als klassische Werbekanäle',
      'Langfristige Sichtbarkeit ohne laufende Kosten pro Klick',
    ],
    relatedTerms: [
      { term: 'Strukturierte Daten', id: 'structured-data' },
      { term: 'Core Web Vitals', id: 'core-web-vitals' },
      { term: 'Next.js', id: 'nextjs' },
    ],
    keywords: ['seo', 'suchmaschinenoptimierung', 'google', 'ranking', 'organic traffic'],
  },

  {
    id: 'structured-data',
    term: 'Strukturierte Daten (Schema.org)',
    category: 'marketing',
    shortDefinition:
      'Strukturierte Daten helfen Suchmaschinen, Inhalte besser zu verstehen und ermöglichen Rich Snippets in Suchergebnissen.',
    fullExplanation: `Strukturierte Daten (Structured Data) sind ein standardisiertes Format (meist JSON-LD), um Suchmaschinen zusätzliche Informationen über den Inhalt einer Seite zu geben. Während Suchmaschinen Texte interpretieren können, helfen strukturierte Daten dabei, spezifische Informationen eindeutig zu kennzeichnen: "Dies ist ein Produkt mit Preis X", "Dies ist ein Event am Datum Y", "Dies ist eine FAQ-Seite".

Das Schema.org-Vokabular definiert Hunderte von Datentypen: Organization, Product, Article, Recipe, Event, FAQ, JobPosting und viele mehr. Durch Implementierung dieser Schemas können Websites in Google Rich Snippets erhalten - hervorgehobene Suchergebnisse mit zusätzlichen Informationen wie Sternebewertungen, Preisen, Event-Terminen oder FAQ-Accordions. Rich Snippets erhöhen die Click-Through-Rate um durchschnittlich 30%.

Strukturierte Daten sind mittlerweile ein wichtiger SEO-Faktor. Google bevorzugt Seiten, die klar strukturiert sind. Für E-Commerce, Blogs, Restaurants, Events und lokale Geschäfte sind strukturierte Daten Pflicht. Tools wie Google Rich Results Test validieren die Implementierung. Next.js und moderne CMS machen die Integration einfacher denn je.`,
    benefits: [
      'Rich Snippets in Suchergebnissen für höhere Click-Through-Rate',
      'Besseres Verständnis des Inhalts durch Suchmaschinen',
      'Höhere Sichtbarkeit in Google-Features (FAQ-Boxen, Knowledge Panel)',
      'Voice-Search-Optimierung für Sprachassistenten',
    ],
    relatedTerms: [
      { term: 'SEO', id: 'seo' },
      { term: 'Rich Snippets', id: 'rich-snippets' },
      { term: 'JSON-LD', id: 'json-ld' },
    ],
    keywords: ['structured data', 'schema.org', 'json-ld', 'rich snippets', 'seo'],
  },

  {
    id: 'core-web-vitals',
    term: 'Core Web Vitals',
    category: 'technology',
    shortDefinition:
      'Core Web Vitals sind Google-Metriken, die Ladezeit, Interaktivität und visuelle Stabilität von Websites messen.',
    fullExplanation: `Core Web Vitals sind drei Performance-Metriken, die Google 2021 als offiziellen Ranking-Faktor eingeführt hat: LCP (Largest Contentful Paint - Ladezeit des Hauptinhalts, Ziel: < 2.5s), FID (First Input Delay - Zeit bis zur ersten Interaktion, Ziel: < 100ms) und CLS (Cumulative Layout Shift - visuelle Stabilität, Ziel: < 0.1). Diese Metriken messen die tatsächliche User Experience, nicht nur technische Ladezeiten.

Websites mit guten Core Web Vitals haben messbare Vorteile: Höhere Conversion-Rates (Studien zeigen +32% durch bessere LCP), niedrigere Bounce-Rates und bessere Google-Rankings. Google betrachtet User Experience als entscheidenden Faktor - langsame, instabile Websites werden abgestraft. Tools wie Google PageSpeed Insights und Lighthouse messen Core Web Vitals und geben Optimierungsvorschläge.

Optimierung der Core Web Vitals umfasst: Image-Optimization (WebP-Format, Lazy Loading), Code-Splitting, Server-Side Rendering, Caching-Strategien und Vermeidung von Layout-Shifts durch reservierten Platz für Bilder. Frameworks wie Next.js bieten viele dieser Optimierungen out-of-the-box. Eine Investition in Core Web Vitals ist eine Investition in bessere Rankings und höhere Conversions.`,
    benefits: [
      'Bessere Google-Rankings durch offiziellen Ranking-Faktor',
      'Höhere Conversion-Rates (bis zu +32%) durch schnellere Ladezeiten',
      'Niedrigere Bounce-Rates durch bessere User Experience',
      'Wettbewerbsvorteil gegenüber langsamen Konkurrenz-Sites',
    ],
    relatedTerms: [
      { term: 'SEO', id: 'seo' },
      { term: 'Performance-Optimierung', id: 'performance-optimization' },
      { term: 'Next.js', id: 'nextjs' },
    ],
    keywords: ['core web vitals', 'lcp', 'fid', 'cls', 'performance', 'google'],
  },

  // ============================================================================
  // Development Methodology Terms
  // ============================================================================
  {
    id: 'mvp',
    term: 'MVP (Minimum Viable Product)',
    category: 'development',
    shortDefinition:
      'Ein MVP ist die einfachste Version eines Produkts mit nur den Kern-Features, um schnell Nutzer-Feedback zu erhalten.',
    fullExplanation: `Ein MVP (Minimum Viable Product) ist ein Produkt mit dem minimal notwendigen Feature-Set, um das Wertversprechen zu validieren und echtes Nutzer-Feedback zu sammeln. Die Philosophie: Statt Monate in die Entwicklung eines "perfekten" Produkts zu investieren, wird eine funktionsfähige Basisversion in Wochen launched. Nutzer-Feedback bestimmt dann die weitere Entwicklung.

Der MVP-Ansatz ist besonders im Startup-Kontext wertvoll, findet aber auch bei etablierten Unternehmen Anwendung. Bekannte Beispiele: Dropbox startete mit einem simplen Demo-Video als MVP, Airbnb begann mit einer einfachen Website für Airmatratzen-Vermietung. Der Fokus liegt auf Lernen und Validieren, nicht auf Perfektion. Ein MVP sollte das Kernproblem lösen, aber nicht jedes "nice-to-have" Feature enthalten.

Die Entwicklung eines MVPs dauert typischerweise 4-8 Wochen und kostet 10-30% eines vollständigen Produkts. Der ROI ist messbar: 60% der Features in Software werden nie oder kaum genutzt (Standish Group). Ein MVP verhindert Ressourcenverschwendung auf unwichtige Features. Nach Launch wird basierend auf realen Nutzungsdaten iteriert und erweitert.`,
    benefits: [
      'Schnelle Time-to-Market (4-8 Wochen statt Monate)',
      '70-90% Kostenersparnis gegenüber Full-Product-Entwicklung',
      'Validierung von Annahmen mit echten Nutzern',
      'Reduziertes Risiko durch iterativen Ansatz',
    ],
    relatedTerms: [
      { term: 'Agile Entwicklung', id: 'agile' },
      { term: 'Prototyping', id: 'prototyping' },
      { term: 'Lean Startup', id: 'lean-startup' },
    ],
    keywords: ['mvp', 'minimum viable product', 'startup', 'agile', 'lean'],
  },

  {
    id: 'agile',
    term: 'Agile Entwicklung',
    category: 'development',
    shortDefinition:
      'Agile Entwicklung ist ein iterativer Ansatz mit kurzen Entwicklungszyklen und kontinuierlichem Feedback.',
    fullExplanation: `Agile Entwicklung ist eine Methodik, die auf kurzen Entwicklungszyklen (Sprints, typischerweise 1-2 Wochen), kontinuierlichem Feedback und flexibler Anpassung basiert. Im Gegensatz zu traditioneller Wasserfall-Entwicklung (alles wird vorher geplant, dann linear umgesetzt) erlaubt Agile Anpassungen während des Projekts. Requirements können sich ändern, Prioritäten neu gesetzt werden.

Das Agile Manifest definiert vier Kernwerte: Individuen und Interaktionen über Prozesse und Tools, funktionierende Software über umfassende Dokumentation, Zusammenarbeit mit Kunden über Vertragsverhandlungen, Reagieren auf Veränderung über das Befolgen eines Plans. Frameworks wie Scrum und Kanban implementieren diese Werte in konkrete Prozesse: Daily Standups, Sprint Planning, Reviews und Retrospektiven.

Agile Entwicklung hat sich als Standard in der Softwareentwicklung etabliert. Studien zeigen: Agile Projekte haben eine 28% höhere Erfolgsrate als Wasserfall-Projekte (Standish Chaos Report). Teams sind produktiver, Kunden zufriedener, und Time-to-Market ist kürzer. Für moderne Digitalprojekte ist Agile nicht optional - es ist Best Practice.`,
    benefits: [
      'Höhere Flexibilität bei sich ändernden Anforderungen',
      'Schnelleres Feedback und frühere Problem-Erkennung',
      '28% höhere Projekterfolgsrate als Wasserfall',
      'Bessere Stakeholder-Einbindung durch regelmäßige Reviews',
    ],
    relatedTerms: [
      { term: 'MVP', id: 'mvp' },
      { term: 'Scrum', id: 'scrum' },
      { term: 'Sprint', id: 'sprint' },
    ],
    keywords: ['agile', 'scrum', 'sprint', 'iterativ', 'entwicklung'],
  },

  {
    id: 'scrum',
    term: 'Scrum',
    category: 'development',
    shortDefinition:
      'Scrum ist ein agiles Framework für Projektmanagement mit festen Rollen, Ereignissen und Artefakten.',
    fullExplanation: `Scrum ist das weltweit am weitesten verbreitete agile Framework für Projektmanagement und Produktentwicklung. Es strukturiert die Arbeit in feste Zeiträume (Sprints), typischerweise 2 Wochen, in denen ein funktionsfähiges Produkt-Inkrement erstellt wird. Scrum definiert drei Rollen: Product Owner (definiert Was gebaut wird), Scrum Master (facilitiert Prozess), Development Team (baut das Produkt).

Der Scrum-Prozess umfasst fünf zentrale Ereignisse: Sprint Planning (Was wird im Sprint gebaut?), Daily Standup (15-Min-Sync), Sprint Review (Präsentation fertiger Features), Sprint Retrospective (Prozessverbesserung) und der Sprint selbst. Drei Artefakte strukturieren die Arbeit: Product Backlog (priorisierte Feature-Liste), Sprint Backlog (ausgewählte Sprint-Aufgaben) und Product Increment (funktionierende Software).

Scrum ist besonders effektiv für komplexe Projekte mit sich ändernden Anforderungen. Die klare Struktur und Transparenz reduziert Chaos, während die Flexibilität schnelle Anpassungen ermöglicht. Unternehmen wie Spotify, Microsoft und Amazon nutzen Scrum-basierte Frameworks. Die Scrum-Zertifizierung (Certified Scrum Master) ist eine der gefragtesten im IT-Bereich.`,
    benefits: [
      'Klare Rollen und Verantwortlichkeiten für effiziente Zusammenarbeit',
      'Regelmäßige Auslieferung funktionsfähiger Software (alle 2 Wochen)',
      'Hohe Transparenz durch Daily Standups und Sprint Reviews',
      'Kontinuierliche Verbesserung durch Sprint Retrospectives',
    ],
    relatedTerms: [
      { term: 'Agile Entwicklung', id: 'agile' },
      { term: 'MVP', id: 'mvp' },
      { term: 'Kanban', id: 'kanban' },
    ],
    keywords: ['scrum', 'agile', 'sprint', 'projektmanagement', 'framework'],
  },

  // ============================================================================
  // Data & Infrastructure Terms
  // ============================================================================
  {
    id: 'datenbank',
    term: 'Datenbank',
    category: 'technology',
    shortDefinition:
      'Eine Datenbank ist ein System zur strukturierten Speicherung, Verwaltung und Abfrage von Daten.',
    fullExplanation: `Eine Datenbank ist ein organisiertes System zur Speicherung, Verwaltung und Abfrage von Daten. Datenbanken sind das Herzstück jeder Anwendung - sie speichern Nutzerdaten, Produktkataloge, Transaktionen, Logs und vieles mehr. Es gibt zwei Hauptkategorien: Relationale Datenbanken (SQL - PostgreSQL, MySQL) mit festen Schemas und Tabellen, und NoSQL-Datenbanken (MongoDB, Redis) mit flexibleren Strukturen.

Relationale Datenbanken sind ideal für strukturierte Daten mit klaren Beziehungen - z.B. E-Commerce (Produkte, Bestellungen, Kunden). Sie bieten ACID-Garantien (Atomicity, Consistency, Isolation, Durability) für zuverlässige Transaktionen. NoSQL-Datenbanken sind flexibler und skalieren besser horizontal - ideal für große Datenmengen, variable Strukturen und Realtime-Anwendungen.

Die Wahl der richtigen Datenbank ist kritisch für Performance und Skalierbarkeit. PostgreSQL ist die erste Wahl für die meisten Business-Anwendungen - leistungsstark, zuverlässig und feature-reich. Für spezielle Use Cases (Caching, Realtime, Analytics) werden zusätzlich Redis, Elasticsearch oder Data Warehouses eingesetzt. Cloud-Anbieter wie Supabase vereinfachen Setup und Wartung erheblich.`,
    benefits: [
      'Strukturierte Datenverwaltung mit Integrität und Konsistenz',
      'Effiziente Abfragen auch bei großen Datenmengen',
      'ACID-Transaktionen für zuverlässige Datenoperationen',
      'Skalierbarkeit durch Replikation und Sharding',
    ],
    relatedTerms: [
      { term: 'SQL', id: 'sql' },
      { term: 'Backend', id: 'backend' },
      { term: 'API', id: 'api' },
    ],
    keywords: ['datenbank', 'database', 'sql', 'postgresql', 'mysql', 'mongodb'],
  },

  {
    id: 'sql',
    term: 'SQL (Structured Query Language)',
    category: 'technology',
    shortDefinition:
      'SQL ist die Standard-Abfragesprache für relationale Datenbanken zum Lesen, Schreiben und Verwalten von Daten.',
    fullExplanation: `SQL (Structured Query Language) ist die universelle Sprache für die Arbeit mit relationalen Datenbanken. Mit SQL können Daten abgefragt (SELECT), eingefügt (INSERT), aktualisiert (UPDATE) und gelöscht (DELETE) werden - die CRUD-Operationen. SQL ist seit den 1970ern der Standard und wird von allen großen relationalen Datenbanken unterstützt: PostgreSQL, MySQL, SQL Server, Oracle.

SQL ist deklarativ - man beschreibt, WELCHE Daten man möchte, nicht WIE sie geholt werden sollen. Die Datenbank optimiert die Abfrage automatisch. SQL unterstützt komplexe Queries mit JOINs (Verknüpfung mehrerer Tabellen), WHERE-Bedingungen, Aggregationen (SUM, COUNT, AVG) und Gruppierungen. Mit Transaktionen können mehrere Operationen atomar ausgeführt werden.

Für Entwickler ist SQL-Wissen unverzichtbar. Fast jede Anwendung arbeitet mit Datenbanken. Moderne ORMs (Object-Relational Mappers) wie Prisma abstrahieren SQL teilweise, aber Grundkenntnisse sind essentiell für Performance-Optimierung. Gut geschriebene SQL-Queries sind der Unterschied zwischen Sekunden und Millisekunden Response-Zeit.`,
    benefits: [
      'Standardisiert über alle relationalen Datenbanken hinweg',
      'Mächtige Abfragemöglichkeiten mit JOINs und Aggregationen',
      'ACID-Transaktionen für Datenkonsistenz',
      'Optimierung durch Datenbank-Engine für beste Performance',
    ],
    relatedTerms: [
      { term: 'Datenbank', id: 'datenbank' },
      { term: 'Backend', id: 'backend' },
      { term: 'ORM', id: 'orm' },
    ],
    keywords: ['sql', 'datenbank', 'query', 'postgresql', 'mysql', 'abfrage'],
  },

  {
    id: 'json',
    term: 'JSON (JavaScript Object Notation)',
    category: 'technology',
    shortDefinition:
      'JSON ist ein leichtgewichtiges Datenformat für den Austausch strukturierter Daten zwischen Systemen.',
    fullExplanation: `JSON (JavaScript Object Notation) ist das Standard-Datenformat für den Austausch strukturierter Daten im Web. JSON ist menschenlesbar, kompakt und einfach zu parsen. Es basiert auf JavaScript-Objekten, ist aber sprachunabhängig - praktisch jede Programmiersprache kann JSON lesen und schreiben. REST-APIs verwenden fast ausschließlich JSON für Request- und Response-Bodies.

JSON besteht aus Key-Value-Paaren, Arrays und verschachtelten Objekten. Es unterstützt Strings, Numbers, Booleans, Arrays, Objekte und null. Im Gegensatz zu XML ist JSON deutlich kompakter und schneller zu parsen. Ein Beispiel: {"name": "HEADON", "services": ["Web", "Mobile", "Design"]}. Viele NoSQL-Datenbanken (MongoDB) speichern Daten nativ als JSON/BSON.

JSON hat sich als De-facto-Standard durchgesetzt. APIs, Config-Files (package.json, tsconfig.json), Datenbanken und Datenübertragung nutzen JSON. Es ist einfacher als XML, mächtiger als CSV und universell unterstützt. Für moderne Webentwicklung ist JSON-Wissen Grundvoraussetzung.`,
    benefits: [
      'Kompakt und effizient - weniger Datenvolumen als XML',
      'Menschenlesbar und einfach zu debuggen',
      'Universelle Unterstützung in allen Programmiersprachen',
      'Native Integration in JavaScript/TypeScript',
    ],
    relatedTerms: [
      { term: 'REST API', id: 'rest-api' },
      { term: 'JavaScript', id: 'javascript' },
      { term: 'API', id: 'api' },
    ],
    keywords: ['json', 'daten', 'format', 'api', 'javascript'],
  },

  // ============================================================================
  // Design System Terms
  // ============================================================================
  {
    id: 'css',
    term: 'CSS (Cascading Style Sheets)',
    category: 'technology',
    shortDefinition:
      'CSS ist die Style-Sprache des Webs für das visuelle Design von Websites (Farben, Layout, Typografie).',
    fullExplanation: `CSS (Cascading Style Sheets) ist die Sprache, mit der das visuelle Erscheinungsbild von Websites definiert wird. Während HTML die Struktur und Inhalte definiert, bestimmt CSS das Design: Farben, Schriftarten, Abstände, Layouts, Animationen und Responsive-Verhalten. CSS ist neben HTML und JavaScript eine der drei Kerntechnologien des Webs.

Modernes CSS hat sich enorm weiterentwickelt. Mit Flexbox und CSS Grid lassen sich komplexe Layouts ohne Framework erstellen. CSS Variables (Custom Properties) ermöglichen Theming und Design-Token. CSS Animations und Transitions sorgen für flüssige, performante Animationen ohne JavaScript. Media Queries sind die Grundlage für Responsive Design.

CSS kann direkt geschrieben werden oder mit Preprocessors wie Sass erweitert werden. CSS-Frameworks wie Tailwind CSS bieten Utility-Classes für schnelle Entwicklung. CSS-in-JS-Lösungen (Styled Components) integrieren Styles in React-Komponenten. Für moderne Webentwicklung sind solide CSS-Kenntnisse unverzichtbar - gutes Design und User Experience beginnen mit gutem CSS.`,
    benefits: [
      'Vollständige Kontrolle über visuelles Design',
      'Responsive Design mit Media Queries',
      'Performante Animationen ohne JavaScript',
      'Trennung von Inhalt (HTML) und Design (CSS)',
    ],
    relatedTerms: [
      { term: 'Tailwind CSS', id: 'tailwind' },
      { term: 'Responsive Design', id: 'responsive-design' },
      { term: 'HTML', id: 'html' },
    ],
    keywords: ['css', 'styling', 'design', 'layout', 'responsive'],
  },

  {
    id: 'tailwind',
    term: 'Tailwind CSS',
    category: 'technology',
    shortDefinition:
      'Tailwind CSS ist ein Utility-First CSS-Framework für schnelles, flexibles und wartbares Styling.',
    fullExplanation: `Tailwind CSS ist ein modernes CSS-Framework, das einen radikal anderen Ansatz verfolgt als Bootstrap oder Material UI. Statt vordefinierter Komponenten (Button, Card, etc.) bietet Tailwind Low-Level Utility-Classes für jede CSS-Eigenschaft: "text-blue-500" für blauen Text, "p-4" für Padding, "flex" für Flexbox. Komponenten werden durch Kombination dieser Utilities gebaut.

Der Vorteil: Maximale Flexibilität ohne Framework-Einschränkungen. Kein CSS-File mit überschriebenen Styles. Kein Kampf gegen Framework-Defaults. Tailwind ist extrem performant - durch PurgeCSS werden nur die tatsächlich genutzten Classes in die finale CSS-Datei aufgenommen, typischerweise < 10KB. Die Entwicklungsgeschwindigkeit ist hoch - Styling erfolgt direkt im HTML/JSX ohne Context-Switch zu separaten CSS-Files.

Tailwind hat sich zum beliebtesten CSS-Framework entwickelt und wird von großen Unternehmen wie GitHub, Shopify und Vercel eingesetzt. Die Lernkurve ist flach, die Produktivität hoch. Mit Tailwind UI und Headless UI stehen zusätzlich vorgefertigte Komponenten zur Verfügung. Für moderne Web-Apps ist Tailwind die erste Wahl.`,
    benefits: [
      'Extrem schnelle Entwicklung durch Utility-Classes',
      'Minimale Bundle-Size durch PurgeCSS (< 10KB)',
      'Maximale Design-Flexibilität ohne Framework-Constraints',
      'Konsistentes Design durch vordefinierte Spacing/Color-Scale',
    ],
    relatedTerms: [
      { term: 'CSS', id: 'css' },
      { term: 'Responsive Design', id: 'responsive-design' },
      { term: 'Design System', id: 'design-system' },
    ],
    keywords: ['tailwind', 'css', 'utility-first', 'framework', 'styling'],
  },

  {
    id: 'design-system',
    term: 'Design System',
    category: 'design',
    shortDefinition:
      'Ein Design System ist eine Sammlung wiederverwendbarer Komponenten, Patterns und Guidelines für konsistentes Design.',
    fullExplanation: `Ein Design System ist eine zentrale "Single Source of Truth" für das Design einer digitalen Produktfamilie. Es umfasst wiederverwendbare Komponenten (Buttons, Forms, Cards), Design-Token (Farben, Spacing, Typografie), Patterns (Navigation, Layouts) und Guidelines (Accessibility, Tone-of-Voice). Ziel ist konsistentes Design über alle Produkte und Plattformen hinweg.

Bekannte Design Systems sind Material Design (Google), Human Interface Guidelines (Apple), Fluent (Microsoft) und Carbon (IBM). Unternehmen wie Airbnb, Shopify und Atlassian haben eigene Design Systems entwickelt. Der Aufbau eines Design Systems erfordert Investment, zahlt sich aber mehrfach aus: Schnellere Design- und Entwicklungszyklen, konsistente User Experience, einfacheres Onboarding neuer Team-Mitglieder.

Ein Design System ist mehr als eine Component Library. Es definiert Prinzipien, Prozesse und Best Practices. Tools wie Figma (Design), Storybook (Component Documentation) und Chromatic (Visual Testing) unterstützen den Workflow. Für Unternehmen mit mehreren Produkten oder großen Teams ist ein Design System essentiell für Skalierung und Effizienz.`,
    benefits: [
      'Konsistente User Experience über alle Produkte hinweg',
      '50% schnellere Design- und Entwicklungszyklen',
      'Einfachere Zusammenarbeit zwischen Designern und Entwicklern',
      'Reduzierte Maintenance durch zentrale Komponenten',
    ],
    relatedTerms: [
      { term: 'UI/UX Design', id: 'ui-ux-design' },
      { term: 'Component Library', id: 'component-library' },
      { term: 'Atomic Design', id: 'atomic-design' },
    ],
    keywords: ['design system', 'component library', 'design tokens', 'ui kit'],
  },

  {
    id: 'component-library',
    term: 'Component Library',
    category: 'design',
    shortDefinition:
      'Eine Component Library ist eine Sammlung wiederverwendbarer UI-Komponenten für konsistente Entwicklung.',
    fullExplanation: `Eine Component Library ist eine organisierte Sammlung vorgefertigter, wiederverwendbarer UI-Komponenten (Buttons, Inputs, Cards, Modals, etc.), die in Projekten eingesetzt werden können. Im Gegensatz zu kompletten Frameworks wie Bootstrap bietet eine Component Library meist grundlegende Bausteine, die flexibel kombiniert werden können. Libraries wie shadcn/ui, Radix UI oder Headless UI sind Beispiele moderner Component Libraries.

Der Hauptvorteil liegt in Konsistenz und Entwicklungsgeschwindigkeit. Statt jeden Button neu zu designen und zu programmieren, werden vordefinierte Komponenten genutzt, die bereits getestet, accessible und responsive sind. Dies reduziert Entwicklungszeit erheblich und stellt sicher, dass alle Komponenten dem gleichen Design-System folgen. Updates an einer Komponente wirken sich automatisch auf alle Verwendungsorte aus.

Moderne Component Libraries sind oft framework-agnostisch oder speziell für React/Vue/Angular optimiert. Sie bieten Features wie Dark Mode Support, Accessibility (ARIA), Keyboard Navigation und Theme-Anpassung. Tools wie Storybook ermöglichen es, alle Komponenten in einem interaktiven Katalog zu dokumentieren. Für professionelle Projekte ist eine gut gepflegte Component Library ein Produktivitäts-Booster.`,
    benefits: [
      'Drastisch reduzierte Entwicklungszeit durch Wiederverwendung',
      'Garantierte Konsistenz über alle Screens und Features',
      'Eingebaute Accessibility und Cross-Browser-Kompatibilität',
      'Einfaches Theming und Brand-Anpassung',
    ],
    relatedTerms: [
      { term: 'Design System', id: 'design-system' },
      { term: 'Atomic Design', id: 'atomic-design' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
    ],
    keywords: [
      'component library',
      'ui components',
      'design system',
      'react',
      'shadcn',
      'radix',
    ],
  },

  {
    id: 'atomic-design',
    term: 'Atomic Design',
    category: 'design',
    shortDefinition:
      'Atomic Design ist eine Methodik zum Aufbau von UI-Systemen aus kleinsten Bausteinen (Atome) zu komplexen Strukturen.',
    fullExplanation: `Atomic Design ist eine von Brad Frost entwickelte Methodik zum systematischen Aufbau von Design Systems. Die Metapher aus der Chemie strukturiert UI-Komponenten in fünf hierarchische Ebenen: Atoms (kleinste Bausteine wie Buttons, Labels), Molecules (Kombinationen von Atoms wie ein Search-Field mit Button), Organisms (komplexe UI-Abschnitte wie eine Header-Navigation), Templates (Seitenlayouts mit Platzhaltern) und Pages (konkrete Instanzen mit echtem Inhalt).

Der Vorteil dieser Hierarchie liegt in Modularität und Wiederverwendbarkeit. Atoms können in verschiedenen Molecules kombiniert werden, Molecules in verschiedenen Organisms. Änderungen an einem Atom (z.B. Button-Styling) propagieren automatisch durch alle übergeordneten Komponenten. Dies macht Design Systems wartbar und skalierbar, selbst bei Hunderten von Komponenten.

Atomic Design wird oft mit Tools wie Storybook kombiniert, wo jede Ebene separat dokumentiert und getestet wird. Frameworks wie React sind ideal für Atomic Design, da Komponenten natürlich hierarchisch komponierbar sind. Große Unternehmen wie Airbnb, IBM und Salesforce nutzen Atomic Design für ihre Design Systems. Für komplexe Produkte mit vielen Screens ist Atomic Design Best Practice.`,
    benefits: [
      'Systematischer, skalierbarer Aufbau von Design Systems',
      'Maximale Wiederverwendbarkeit durch klare Hierarchie',
      'Einfachere Wartung durch modulare Struktur',
      'Bessere Zusammenarbeit zwischen Designern und Entwicklern',
    ],
    relatedTerms: [
      { term: 'Design System', id: 'design-system' },
      { term: 'Component Library', id: 'component-library' },
      { term: 'React', id: 'react' },
    ],
    keywords: ['atomic design', 'design system', 'komponenten', 'modular', 'ui'],
  },

  // ============================================================================
  // Additional Essential Terms
  // ============================================================================
  {
    id: 'ssr',
    term: 'Server-Side Rendering (SSR)',
    category: 'technology',
    shortDefinition:
      'SSR generiert HTML auf dem Server statt im Browser für bessere SEO und schnellere initiale Ladezeiten.',
    fullExplanation: `Server-Side Rendering (SSR) ist eine Technik, bei der HTML nicht im Browser generiert wird (wie bei klassischen React Apps), sondern auf dem Server. Der Server führt die React-Komponenten aus, generiert fertiges HTML und sendet es an den Client. Der Browser zeigt sofort Inhalte an, ohne erst JavaScript laden und ausführen zu müssen. Danach "hydratisiert" React die Seite und macht sie interaktiv.

Die Vorteile von SSR sind erheblich: Besseres SEO (Crawler sehen vollständiges HTML), schnellere First Contentful Paint (Nutzer sehen sofort Inhalt), bessere Performance auf langsamen Geräten. Der Nachteil: Höhere Server-Komplexität und -Last. Next.js macht SSR einfach durch getServerSideProps - die Seite wird bei jeder Anfrage frisch auf dem Server gerendert.

SSR ist besonders wertvoll für Content-Heavy Sites (Blogs, E-Commerce, Marketing-Sites), wo SEO kritisch ist. Für hochinteraktive Apps (Dashboards) ist Client-Side Rendering oft ausreichend. Next.js bietet Hybrid-Rendering - manche Seiten SSR, manche Client-Side, manche statisch. Diese Flexibilität ist einer der Hauptgründe für die Popularität von Next.js.`,
    benefits: [
      'Exzellentes SEO durch vollständiges HTML für Crawler',
      'Schnellere First Contentful Paint für bessere UX',
      'Bessere Performance auf Low-End-Geräten',
      'Social-Media-Previews funktionieren korrekt',
    ],
    relatedTerms: [
      { term: 'Next.js', id: 'nextjs' },
      { term: 'SEO', id: 'seo' },
      { term: 'Static Site Generation', id: 'ssg' },
    ],
    keywords: ['ssr', 'server-side rendering', 'nextjs', 'seo', 'performance'],
  },

  {
    id: 'spa',
    term: 'Single Page Application (SPA)',
    category: 'development',
    shortDefinition:
      'Eine SPA ist eine Webanwendung, die nur eine HTML-Seite lädt und Inhalte dynamisch per JavaScript aktualisiert.',
    fullExplanation: `Eine Single Page Application (SPA) lädt initial eine HTML-Seite und JavaScript-Bundle. Danach werden alle Interaktionen und Navigationen per JavaScript gehandelt, ohne vollständige Seiten-Reloads. Nur Daten werden vom Server geladen (meist via REST-APIs). SPAs bieten eine App-ähnliche User Experience mit flüssigen Übergängen und sofortigen Reaktionen.

Frameworks wie React, Vue und Angular sind für SPAs optimiert. Der größte Vorteil: Nach dem initialen Load ist die Navigation extrem schnell, da nur Daten geladen werden, kein HTML/CSS/JS. SPAs eignen sich perfekt für interaktive Anwendungen wie Dashboards, Admin-Panels, SaaS-Tools und Social-Media-Plattformen. Der Nachteil: Schlechteres SEO (wird durch SSR/Next.js gelöst) und größere initiale Bundle-Sizes.

Moderne SPAs nutzen Code-Splitting, um nur den Code zu laden, der für die aktuelle Seite benötigt wird. Lazy Loading reduziert die initiale Bundle-Size. State Management Libraries wie Redux oder Zustand verwalten den App-State. SPAs sind Standard für komplexe Web-Anwendungen, bei denen User Experience wichtiger ist als SEO.`,
    benefits: [
      'Flüssige, App-ähnliche User Experience ohne Page-Reloads',
      'Schnelle Navigation nach initialem Load',
      'Klare Trennung von Frontend und Backend über APIs',
      'Offline-Funktionalität möglich mit Service Workers',
    ],
    relatedTerms: [
      { term: 'React', id: 'react' },
      { term: 'API', id: 'api' },
      { term: 'Progressive Web App', id: 'pwa' },
    ],
    keywords: ['spa', 'single page application', 'react', 'vue', 'angular'],
  },

  {
    id: 'mobile-first',
    term: 'Mobile-First',
    category: 'design',
    shortDefinition:
      'Mobile-First ist ein Design-Ansatz, bei dem zuerst für mobile Geräte und dann für Desktop designed wird.',
    fullExplanation: `Mobile-First ist eine Design- und Entwicklungsstrategie, bei der Websites primär für mobile Geräte konzipiert und erst dann für größere Bildschirme erweitert werden. Dieser Ansatz spiegelt die Realität wider: Über 60% des Web-Traffics kommt von Smartphones. Mobile-First zwingt zu Fokus und Priorisierung - da Platz begrenzt ist, müssen die wichtigsten Inhalte und Funktionen identifiziert werden.

Im Gegensatz zu Desktop-First-Ansätzen (wo mobile Versionen oft "zusammengequetscht" wirken) führt Mobile-First zu besserem Design auf allen Geräten. CSS Media Queries werden mit min-width statt max-width geschrieben: Basis-Styles für Mobile, Erweiterungen für Tablet/Desktop. Dies führt zu leichterem CSS und besserer Performance auf mobilen Geräten.

Google verwendet Mobile-First-Indexing - die mobile Version einer Website ist primär für Rankings verantwortlich. Websites ohne mobile Optimierung werden abgestraft. Mobile-First ist nicht nur Best Practice, sondern Business-Notwendigkeit. Tools wie Responsive Design Mode in Browsern und echte Gerätetests (BrowserStack) helfen bei der Qualitätssicherung.`,
    benefits: [
      'Bessere User Experience auf Smartphones (60%+ des Traffics)',
      'Erzwungener Fokus auf wichtigste Inhalte und Features',
      'Besseres Google-Ranking durch Mobile-First-Indexing',
      'Leichterer Code durch Progressive Enhancement',
    ],
    relatedTerms: [
      { term: 'Responsive Design', id: 'responsive-design' },
      { term: 'Progressive Enhancement', id: 'progressive-enhancement' },
      { term: 'UI/UX Design', id: 'ui-ux-design' },
    ],
    keywords: ['mobile-first', 'responsive', 'mobile', 'design', 'ux'],
  },
]

// Helper functions for filtering and searching
export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.id === id)
}

export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossaryTerms.filter((term) => term.category === category)
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.shortDefinition.toLowerCase().includes(lowerQuery) ||
      term.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  )
}

// Get all terms sorted alphabetically
export function getAllTermsSorted(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term, 'de'))
}

// Group terms by first letter for A-Z index
export function getTermsGroupedByLetter(): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {}

  getAllTermsSorted().forEach((term) => {
    const firstLetter = term.term[0].toUpperCase()
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = []
    }
    grouped[firstLetter].push(term)
  })

  return grouped
}
