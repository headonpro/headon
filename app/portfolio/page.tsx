import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Moderne E-Commerce Lösung mit Next.js und Stripe',
    image: '/images/portfolio/project1.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Sichere Banking-App für iOS und Android',
    image: '/images/portfolio/project2.jpg',
    tags: ['React Native', 'TypeScript', 'Firebase'],
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Intuitives Dashboard für Business Analytics',
    image: '/images/portfolio/project3.jpg',
    tags: ['Figma', 'Design System', 'React'],
  },
  {
    id: 4,
    title: 'Healthcare Platform',
    category: 'Full Stack',
    description: 'Telemedizin-Plattform mit Video-Konsultationen',
    image: '/images/portfolio/project4.jpg',
    tags: ['Next.js', 'WebRTC', 'PostgreSQL'],
  },
]

export default function PortfolioPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere erfolgreichen Projekte und lassen Sie sich inspirieren.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  Case Study ansehen
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}