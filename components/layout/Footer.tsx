import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Web Development', href: '/services#web' },
    { name: 'Mobile Development', href: '/services#mobile' },
    { name: 'UI/UX Design', href: '/services#design' },
    { name: 'Backend Solutions', href: '/services#backend' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Regionen', href: '/regionen' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Glossar', href: '/glossar' },
    { name: 'Vergleiche', href: '/vergleiche' },
  ],
  legal: [
    { name: 'Datenschutz', href: '/privacy' },
    { name: 'Impressum', href: '/imprint' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/headon-logo_footer.svg"
                alt="HEADON.pro"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm">
              Ihre moderne Kreativagentur für innovative Web- und Mobile-Anwendungen. Wir
              transformieren Ideen in digitale Realität.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-foreground text-sm font-semibold">Kontakt</h3>
            <div className="text-muted-foreground space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lauda-Königshofen, Deutschland</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:hallo@headon.pro"
                  className="hover:text-foreground transition-colors"
                >
                  hallo@headon.pro
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+4917663040241" className="hover:text-foreground transition-colors">
                  +49 176 630 402 41
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Services</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Unternehmen</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Ressourcen</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Rechtliches</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground text-center text-xs">
            © {new Date().getFullYear()} HEADON.pro. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
