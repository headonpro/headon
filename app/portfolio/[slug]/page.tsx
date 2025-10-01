import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  getPortfolioProject,
  getAllPortfolioProjects,
} from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import MDXContent from '@/components/content/MDXContent'
import { Button } from '@/components/ui/button'
import {
  Star,
  ExternalLink,
  Github,
  ArrowLeft,
  Code2,
  Smartphone,
  Palette,
  Database,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CreativeWorkSchema,
  ReviewSchema,
} from '@/components/seo/SchemaGenerator'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

// Export metadata generator
export { generateMetadata }

/**
 * Generate static params for all portfolio projects at build time
 */
export async function generateStaticParams() {
  const projects = await getAllPortfolioProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface PortfolioProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Tech stack icon mapping (Lucide icons)
const techIcons: Record<string, typeof Code2> = {
  react: Code2,
  nextjs: Code2,
  typescript: Code2,
  javascript: Code2,
  node: Code2,
  'react-native': Smartphone,
  mobile: Smartphone,
  ios: Smartphone,
  android: Smartphone,
  design: Palette,
  ui: Palette,
  ux: Palette,
  figma: Palette,
  database: Database,
  postgres: Database,
  mongodb: Database,
  api: Database,
}

/**
 * Get icon component for tech tag
 */
function getTechIcon(tag: string) {
  const normalizedTag = tag.toLowerCase().replace(/[.\s]/g, '')
  const IconComponent = techIcons[normalizedTag] || Code2
  return IconComponent
}

/**
 * Star Rating Component
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'w-5 h-5',
            star <= rating
              ? 'fill-yellow-500 text-yellow-500'
              : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  )
}

/**
 * Portfolio Project Detail Page
 * Server component that renders case studies with metrics, testimonials, and MDX content
 */
export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const { slug } = await params

  // Load portfolio project
  const project = await getPortfolioProject(slug)

  // Return 404 if project not found
  if (!project) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(project.content)

  // Format date
  const projectDate = new Date(project.frontmatter.date)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Schema.org CreativeWork markup */}
      <CreativeWorkSchema project={project} />

      {/* Schema.org Review markup (if testimonial exists) */}
      {project.frontmatter.testimonial && (
        <ReviewSchema
          review={{
            itemReviewed: {
              type: 'Service',
              name: project.frontmatter.title,
            },
            rating: project.frontmatter.testimonial.rating,
            author: project.frontmatter.testimonial.author,
            reviewBody: project.frontmatter.testimonial.quote,
          }}
        />
      )}

      {/* Back to Portfolio Link */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Portfolio
        </Link>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Portfolio', url: '/portfolio' },
            { name: project.frontmatter.title, url: `/portfolio/${slug}` },
          ]}
        />

        {/* Hero Section */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {project.frontmatter.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {project.frontmatter.title}
          </h1>

          {/* Client Information */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="text-lg font-semibold">
                {project.frontmatter.client.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {project.frontmatter.client.industry}
              </p>
            </div>
            <div className="border-l h-12 border-muted-foreground/20" />
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <time dateTime={project.frontmatter.date} className="text-lg font-semibold">
                {projectDate.toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8">
            {project.frontmatter.description}
          </p>

          {/* Project Links */}
          {(project.frontmatter.liveUrl || project.frontmatter.githubUrl) && (
            <div className="flex flex-wrap gap-3 mb-8">
              {project.frontmatter.liveUrl && (
                <Button asChild variant="default">
                  <a
                    href={project.frontmatter.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.frontmatter.githubUrl && (
                <Button asChild variant="outline">
                  <a
                    href={project.frontmatter.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          )}

          {/* Featured Image */}
          {project.frontmatter.image && (
            <figure className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={project.frontmatter.image.url}
                alt={project.frontmatter.image.alt}
                fill
                className="object-cover"
                priority
              />
            </figure>
          )}
        </header>

        {/* Metrics Section */}
        {project.frontmatter.metrics.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.frontmatter.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {metric.label}
                    </p>
                    <p className="text-4xl font-bold mb-1">{metric.value}</p>
                    {metric.improvement && (
                      <p className="text-lg font-semibold text-green-600">
                        {metric.improvement}
                      </p>
                    )}
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonial Section */}
        {project.frontmatter.testimonial && (
          <section className="mb-12">
            <div className="relative p-8 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-muted">
              <div className="relative z-10">
                {/* Star Rating */}
                <StarRating rating={project.frontmatter.testimonial.rating} />

                {/* Quote */}
                <blockquote className="mt-4 mb-4">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    &ldquo;{project.frontmatter.testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">
                      {project.frontmatter.testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.frontmatter.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack Section */}
        {project.frontmatter.tags.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.frontmatter.tags.map((tag) => {
                const IconComponent = getTechIcon(tag)
                return (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{tag}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Case Study Content (MDX) */}
        <section className="mb-12 max-w-4xl">
          <MDXContent>{CompiledContent}</MDXContent>
        </section>

        {/* CTA Section */}
        <section className="mt-16 pt-8 border-t">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Interested in working together?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Let&apos;s discuss how we can help bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View More Projects
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
