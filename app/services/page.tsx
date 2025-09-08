import { Code2, Smartphone, Palette, Database } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    description: 'Moderne, performante Webanwendungen mit Next.js, React und TypeScript.',
    icon: Code2,
    features: [
      'Progressive Web Apps',
      'E-Commerce Lösungen',
      'Enterprise Anwendungen',
      'API Integration',
    ],
  },
  {
    title: 'Mobile Development',
    description: 'Native und Cross-Platform Apps für iOS und Android mit React Native.',
    icon: Smartphone,
    features: [
      'iOS & Android Apps',
      'Cross-Platform Development',
      'App Store Optimierung',
      'Push Notifications',
    ],
  },
  {
    title: 'UI/UX Design',
    description: 'User-zentriertes Design mit Fokus auf Usability und Ästhetik.',
    icon: Palette,
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Design Systems',
      'Usability Testing',
    ],
  },
  {
    title: 'Backend Solutions',
    description: 'Skalierbare Cloud-Infrastruktur und API-Entwicklung mit Supabase.',
    icon: Database,
    features: [
      'Cloud Infrastructure',
      'API Development',
      'Database Design',
      'Authentication & Security',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Unsere Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der Konzeption bis zur Umsetzung – wir bieten End-to-End Lösungen für Ihre digitalen Projekte.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border bg-card p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2 text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}