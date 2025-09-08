import { Github, Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    id: 1,
    name: 'Max Mustermann',
    role: 'CEO & Founder',
    bio: 'Visionär mit über 15 Jahren Erfahrung in der digitalen Transformation.',
    image: '/images/team/member1.jpg',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
  {
    id: 2,
    name: 'Anna Schmidt',
    role: 'Lead Developer',
    bio: 'Full-Stack Entwicklerin mit Leidenschaft für sauberen Code und moderne Technologien.',
    image: '/images/team/member2.jpg',
    social: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 3,
    name: 'Tom Weber',
    role: 'UI/UX Designer',
    bio: 'Kreativer Designer mit Fokus auf User Experience und minimalistisches Design.',
    image: '/images/team/member3.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 4,
    name: 'Lisa Müller',
    role: 'Project Manager',
    bio: 'Agile Coach mit Expertise in der Leitung komplexer Digitalprojekte.',
    image: '/images/team/member4.jpg',
    social: {
      linkedin: '#',
    },
  },
]

export default function TeamPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Unser Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lernen Sie die kreativen Köpfe hinter HEADON kennen – ein Team von Experten, 
            die mit Leidenschaft an Ihren Projekten arbeiten.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
            <h2 className="text-2xl font-bold mb-4">Werden Sie Teil unseres Teams!</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Wir sind immer auf der Suche nach talentierten Menschen, die unsere Leidenschaft 
              für großartige digitale Produkte teilen.
            </p>
            <a
              href="mailto:jobs@headon.pro"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Zu den offenen Stellen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}