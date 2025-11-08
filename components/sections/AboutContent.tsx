'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { Button } from '@/components/ui/button'
import {
  Code2,
  Smartphone,
  Database,
  Bot,
  Settings,
  Globe,
  Zap,
  CheckCircle2,
  GitBranch,
  Gauge,
  Shield,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const technologyCategories = {
  web: {
    icon: Globe,
    title: 'Web Development',
    technologies: [
      'Next.js',
      'React',
      'Vue',
      'Svelte',
      'Astro',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
    ],
  },
  mobile: {
    icon: Smartphone,
    title: 'Mobile Development',
    technologies: [
      'React Native',
      'Flutter',
      'Progressive Web Apps',
      'iOS Development',
      'Android Development',
      'Cross-Platform',
    ],
  },
  backend: {
    icon: Database,
    title: 'Backend & Database',
    technologies: [
      'Node.js',
      'Python',
      'Go',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
      'REST APIs',
      'GraphQL',
      'tRPC',
    ],
  },
  ai: {
    icon: Bot,
    title: 'AI Integration',
    technologies: [
      'OpenAI (GPT)',
      'Anthropic (Claude)',
      'Perplexity',
      'Custom AI Pipelines',
      'Automation Workflows',
      'AI-Assisted Development',
    ],
  },
  devops: {
    icon: Settings,
    title: 'DevOps & Infrastructure',
    technologies: [
      'Docker',
      'Docker Compose',
      'CI/CD (GitHub Actions)',
      'VPS Hosting',
      'Cloud Deployment',
      'Edge Computing',
      'Monitoring',
    ],
  },
}

const services = [
  {
    title: 'Marketing Websites',
    description: 'SEO-optimierte Unternehmenswebsites mit modernem Design und Performance',
    icon: Globe,
  },
  {
    title: 'Web-Applikationen',
    description: 'SaaS-Plattformen, Dashboards und komplexe Web-Apps',
    icon: Code2,
  },
  {
    title: 'Mobile Apps',
    description: 'Native und Cross-Platform Apps für iOS und Android',
    icon: Smartphone,
  },
  {
    title: 'API Development',
    description: 'RESTful und GraphQL APIs mit sauberer Architektur',
    icon: Database,
  },
  {
    title: 'AI Integration',
    description: 'KI-Features in bestehende oder neue Anwendungen integrieren',
    icon: Bot,
  },
  {
    title: 'DevOps & Hosting',
    description: 'CI/CD Pipelines, Docker, VPS-Setup und Monitoring',
    icon: Settings,
  },
]

const developmentStandards = [
  {
    icon: Code2,
    title: 'TypeScript & Type Safety',
    description: 'Strikte Typisierung für wartbaren, fehlerfreien Code',
  },
  {
    icon: Settings,
    title: 'Docker-First Development',
    description: 'Reproduzierbare Entwicklungsumgebungen und Deployments',
  },
  {
    icon: GitBranch,
    title: 'CI/CD Pipelines',
    description: 'Automatisierte Tests, Builds und Deployments',
  },
  {
    icon: Gauge,
    title: 'Performance-Optimierung',
    description: 'Core Web Vitals, Lighthouse-Scores, schnelle Ladezeiten',
  },
  {
    icon: Zap,
    title: 'SEO-Optimierung',
    description: 'Strukturierte Daten, Meta-Tags, technisches SEO',
  },
  {
    icon: Shield,
    title: 'Security Best Practices',
    description: 'Sichere Authentifizierung, Datenverschlüsselung, GDPR-konform',
  },
]

const siteFeatures = [
  { label: 'Next.js 15 + React 19', value: true },
  { label: 'Tailwind CSS v4 + shadcn/ui', value: true },
  { label: 'TypeScript (strict mode)', value: true },
  { label: 'MDX Content Management', value: true },
  { label: 'Lighthouse Score 90+', value: true },
  { label: 'Docker + CI/CD', value: true },
  { label: 'SEO-optimiert', value: true },
  { label: 'Selbst-gehostet auf VPS', value: true },
]

export default function AboutContent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile
              ? [
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto mb-8 px-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { name: 'Home', url: '/' },
              { name: 'Über uns', url: '/about' },
            ]}
          />
        </div>

        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-32 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Moderne Digitalagentur aus Lauda-Königshofen
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg text-white/90"
            >
              Technologie-agnostisch. Performance-fokussiert. Regional verwurzelt.
            </motion.p>
          </motion.div>

          {/* Technology Stack */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-32"
          >
            <h2 className="mb-12 text-center text-3xl font-bold text-white">Technology Stack</h2>
            <Tabs defaultValue="web" className="w-full">
              <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-2 border border-white/20 bg-white/10 p-2 backdrop-blur-md lg:grid-cols-5">
                {Object.entries(technologyCategories).map(([key, category]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="gap-2 text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(technologyCategories).map(([key, category]) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-md"
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <category.icon className="text-accent-500 h-8 w-8" />
                      <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {category.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.section>

          {/* Site Showcase */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-32"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-md lg:p-12">
              <h2 className="mb-4 text-center text-3xl font-bold text-white">
                Diese Website ist der Beweis
              </h2>
              <p className="mb-12 text-center text-white/90">
                Unsere eigene Website zeigt, was wir können. Mit modernsten Technologien und
                höchsten Qualitätsstandards gebaut.
              </p>
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Tech-Stack dieser Website
                  </h3>
                  <div className="space-y-3">
                    {siteFeatures.map((feature) => (
                      <div key={feature.label} className="flex items-center gap-3">
                        <CheckCircle2 className="text-accent-500 h-5 w-5 flex-shrink-0" />
                        <span className="text-sm text-white/90">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="rounded-lg bg-white/10 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                      Maßgeschneiderte Lösungen
                    </h3>
                    <p className="mb-6 text-sm text-white/80">
                      Jedes Projekt ist einzigartig. Wir entwickeln individuelle Lösungen, die exakt
                      auf Ihre Anforderungen zugeschnitten sind - keine vorgefertigten Templates,
                      sondern echter Custom Code.
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      <Link href="/contact" className="inline-flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Jetzt anfragen
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Services Grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-32"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white">Was wir entwickeln</h2>
            <p className="mb-12 text-center text-white/90">
              Von Marketing-Websites bis zu komplexen Web-Apps und Mobile-Anwendungen
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group hover:border-accent-500 rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all hover:shadow-lg"
                >
                  <service.icon className="text-accent-500 mb-4 h-8 w-8" />
                  <h3 className="mb-2 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/80">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Development Standards */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-32"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white">
              Entwicklungsstandards
            </h2>
            <p className="mb-12 text-center text-white/90">
              Moderne Entwicklungspraktiken für wartbaren, performanten Code
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {developmentStandards.map((standard, index) => (
                <motion.div
                  key={standard.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md"
                >
                  <standard.icon className="text-accent-500 mb-4 h-8 w-8" />
                  <h3 className="mb-2 text-lg font-semibold text-white">{standard.title}</h3>
                  <p className="text-sm text-white/80">{standard.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Regional & CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md lg:p-12">
              <MapPin className="text-accent-500 mx-auto mb-6 h-12 w-12" />
              <h2 className="mb-4 text-3xl font-bold text-white">Regional + Remote</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                Ansässig in Lauda-Königshofen, arbeiten wir mit Kunden aus Bad Mergentheim,
                Tauberbischofsheim, Wertheim und ganz Deutschland zusammen.
              </p>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Projekt starten
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
