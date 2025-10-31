import Link from 'next/link'
import { ArrowRight, Code, Smartphone, Palette, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type ServiceType = 'web-development' | 'mobile-development' | 'ui-ux-design' | 'consulting' | 'general'

interface BlogCTAProps {
  service?: ServiceType
  title?: string
  description?: string
  buttonText?: string
  href?: string
}

const serviceConfig = {
  'web-development': {
    icon: Code,
    defaultTitle: 'Professionelle Web-Entwicklung benötigt?',
    defaultDescription:
      'Wir entwickeln moderne, performante Web-Anwendungen mit Next.js, React und TypeScript.',
    defaultHref: '/services/web-development',
    defaultButton: 'Web-Projekt starten',
  },
  'mobile-development': {
    icon: Smartphone,
    defaultTitle: 'Native Mobile Apps für Ihr Unternehmen',
    defaultDescription:
      'Leistungsstarke iOS- und Android-Apps mit React Native oder nativer Entwicklung.',
    defaultHref: '/services/mobile-development',
    defaultButton: 'Mobile-App entwickeln',
  },
  'ui-ux-design': {
    icon: Palette,
    defaultTitle: 'Moderne UI/UX Design-Lösungen',
    defaultDescription:
      'Nutzerzentrierte Designs, die konvertieren und begeistern - für Web und Mobile.',
    defaultHref: '/services/ui-ux-design',
    defaultButton: 'Design-Projekt starten',
  },
  consulting: {
    icon: Rocket,
    defaultTitle: 'Kostenlose Erstberatung',
    defaultDescription:
      'Lassen Sie uns über Ihr Projekt sprechen. Unverbindlich und kostenfrei.',
    defaultHref: '/contact',
    defaultButton: 'Beratungstermin buchen',
  },
  general: {
    icon: Rocket,
    defaultTitle: 'Projekt starten?',
    defaultDescription:
      'Kontaktieren Sie uns für eine unverbindliche Beratung zu Ihrem digitalen Projekt.',
    defaultHref: '/contact',
    defaultButton: 'Kontakt aufnehmen',
  },
}

/**
 * BlogCTA Component
 * Contextual call-to-action for services
 * Position strategically at 25%, 50%, and 90% of blog post
 */
export function BlogCTA({
  service = 'general',
  title,
  description,
  buttonText,
  href,
}: BlogCTAProps) {
  const config = serviceConfig[service]
  const Icon = config.icon

  const displayTitle = title || config.defaultTitle
  const displayDescription = description || config.defaultDescription
  const displayHref = href || config.defaultHref
  const displayButtonText = buttonText || config.defaultButton

  return (
    <Card className="my-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 p-8 shadow-lg">
      <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-2xl font-bold text-gray-900">{displayTitle}</h3>
          <p className="mb-4 text-lg text-gray-700 leading-relaxed">{displayDescription}</p>
          <Button asChild size="lg" className="group">
            <Link href={displayHref}>
              {displayButtonText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
