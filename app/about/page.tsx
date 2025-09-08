import { Users, Target, Zap, Shield } from 'lucide-react'

const values = [
  {
    name: 'Innovation',
    description: 'Wir nutzen die neuesten Technologien und Methoden, um zukunftssichere Lösungen zu entwickeln.',
    icon: Zap,
  },
  {
    name: 'Qualität',
    description: 'Höchste Standards in Code-Qualität, Design und User Experience sind unser Anspruch.',
    icon: Shield,
  },
  {
    name: 'Partnerschaft',
    description: 'Wir arbeiten eng mit unseren Kunden zusammen und verstehen uns als Teil Ihres Teams.',
    icon: Users,
  },
  {
    name: 'Ergebnisorientierung',
    description: 'Ihr Erfolg ist unser Erfolg. Wir fokussieren uns auf messbare Ergebnisse.',
    icon: Target,
  },
]

const stats = [
  { label: 'Jahre Erfahrung', value: '10+' },
  { label: 'Projekte abgeschlossen', value: '150+' },
  { label: 'Zufriedene Kunden', value: '50+' },
  { label: 'Team Mitglieder', value: '15+' },
]

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Über HEADON.pro
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Wir sind eine moderne Kreativagentur, die sich auf die Entwicklung innovativer digitaler Lösungen spezialisiert hat. 
            Mit Leidenschaft und Expertise transformieren wir Ideen in erfolgreiche digitale Produkte.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-4">Unsere Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Wir glauben daran, dass großartige digitale Produkte Unternehmen transformieren können. 
              Unsere Mission ist es, unseren Kunden dabei zu helfen, durch innovative Technologie und 
              herausragendes Design ihre Ziele zu erreichen und ihre Vision Wirklichkeit werden zu lassen.
            </p>
            <p className="text-lg text-muted-foreground">
              Dabei setzen wir auf modernste Technologien, agile Entwicklungsmethoden und eine enge 
              Zusammenarbeit mit unseren Kunden. Jedes Projekt ist für uns eine neue Herausforderung, 
              der wir uns mit Begeisterung und Professionalität stellen.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Werte</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.name}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Unser Prozess</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover</h3>
              <p className="text-sm text-muted-foreground">
                Wir verstehen Ihre Vision, analysieren Ihre Anforderungen und entwickeln eine maßgeschneiderte Strategie.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Design & Develop</h3>
              <p className="text-sm text-muted-foreground">
                Mit agilen Methoden setzen wir Ihre Ideen in hochwertige digitale Produkte um.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Deploy & Support</h3>
              <p className="text-sm text-muted-foreground">
                Nach dem Launch begleiten wir Sie weiter und sorgen für kontinuierliche Optimierung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}