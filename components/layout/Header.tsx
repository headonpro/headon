'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const branchenItems = [
  { name: 'Restaurant & Gastronomie', href: '/branchen/gastronomie' },
  { name: 'Handwerk & Services', href: '/branchen/handwerk' },
  { name: 'Einzelhandel & E-Commerce', href: '/branchen/einzelhandel' },
  { name: 'Beratung & Coaching', href: '/branchen/beratung' },
  { name: 'Immobilien & Makler', href: '/branchen/immobilien' },
  { name: 'Fitness & Wellness', href: '/branchen/fitness' },
]

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Kostenrechner', href: '/webseite-erstellen-lassen-kosten' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Branchen', href: '/branchen', hasDropdown: true },
  { name: 'Regionen', href: '/regionen' },
  { name: 'About', href: '/about' },
  { name: 'Kontakt', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [branchenOpen, setBranchenOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="absolute top-0 z-50 w-full">
      <nav
        className="container mx-auto flex items-center justify-between px-4 py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 flex items-center p-1.5"
            aria-label="HEADON.pro - Zur Startseite"
          >
            <Logo width={120} height={32} className="h-8" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/')
            const isBranchenActive = pathname?.startsWith('/branchen')

            if (item.hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setBranchenOpen(true)}
                  onMouseLeave={() => setBranchenOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 text-base font-semibold transition-colors',
                      isBranchenActive ? 'text-accent-500' : 'hover:text-accent-500 text-white/90'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', branchenOpen && 'rotate-180')}
                    />
                  </Link>

                  {/* Dropdown */}
                  {branchenOpen && (
                    <div className="absolute top-full left-0 z-50 w-64 pt-2">
                      <div className="rounded-lg border border-white/10 bg-primary-600/95 py-2 shadow-xl backdrop-blur-md">
                        {branchenItems.map((branche) => (
                          <Link
                            key={branche.href}
                            href={branche.href}
                            className={cn(
                              'block px-4 py-2 text-sm font-medium transition-all rounded-md mx-2',
                              pathname === branche.href
                                ? 'text-accent-500 bg-white/10'
                                : 'hover:text-accent-500 hover:bg-white/5 text-white/90'
                            )}
                          >
                            {branche.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-base font-semibold transition-colors',
                  isActive ? 'text-accent-500' : 'hover:text-accent-500 text-white/90'
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            asChild
            className="from-accent-500 to-secondary-600 hover:from-accent-600 hover:to-secondary-700 text-primary-600 bg-gradient-to-r font-semibold"
          >
            <Link href="/contact">Projekt starten</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn('lg:hidden', mobileMenuOpen ? 'block' : 'hidden')}>
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="from-primary-600 to-primary-700 border-primary-500/20 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l bg-gradient-to-b px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 flex items-center p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo width={100} height={28} className="h-7" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href === '/' && pathname === '/')
                  const isBranchenActive = pathname?.startsWith('/branchen')

                  if (item.hasDropdown) {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setBranchenOpen(!branchenOpen)}
                          className={cn(
                            '-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-3 text-base leading-7 font-semibold transition-all duration-200',
                            isBranchenActive
                              ? 'text-accent-500 from-accent-500/20 to-secondary-500/20 border-accent-500/30 border bg-gradient-to-r'
                              : 'text-white/90 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          {item.name}
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 transition-transform',
                              branchenOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        {branchenOpen && (
                          <div className="mt-2 ml-4 space-y-1">
                            {branchenItems.map((branche) => (
                              <Link
                                key={branche.href}
                                href={branche.href}
                                className={cn(
                                  'block rounded-lg px-3 py-2 text-sm transition-all duration-200',
                                  pathname === branche.href
                                    ? 'text-accent-500 bg-white/10'
                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                )}
                                onClick={() => {
                                  setMobileMenuOpen(false)
                                  setBranchenOpen(false)
                                }}
                              >
                                {branche.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        '-mx-3 block rounded-lg px-3 py-3 text-base leading-7 font-semibold transition-all duration-200',
                        isActive
                          ? 'text-accent-500 from-accent-500/20 to-secondary-500/20 border-accent-500/30 border bg-gradient-to-r'
                          : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-lg'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              <div className="border-t border-white/10 py-6">
                <Button
                  asChild
                  className="from-accent-500 to-secondary-600 hover:from-accent-600 hover:to-secondary-700 text-primary-600 w-full bg-gradient-to-r font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Projekt starten
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
