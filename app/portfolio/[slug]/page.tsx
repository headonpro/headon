import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPortfolioProject, getAllPortfolioProjects } from '@/lib/content/content-api'
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
import { CreativeWorkSchema, ReviewSchema, BreadcrumbSchema } from '@/components/seo/SchemaGenerator'
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
            'h-5 w-5',
            star <= rating ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-200 text-gray-200'
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
export default async function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
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
    <>
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

      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: project.frontmatter.title, url: `/portfolio/${slug}` },
        ]}
      />

      {/* Main content with static gradient background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 min-h-screen bg-gradient-to-br">
        {/* Breadcrumb section */}
        <div className="container mx-auto px-4 pt-24 pb-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { name: 'Home', url: '/' },
              { name: 'Portfolio', url: '/portfolio' },
              { name: project.frontmatter.title, url: `/portfolio/${slug}` },
            ]}
          />
        </div>

        <main className="container mx-auto max-w-6xl px-4 pb-12">
          {/* Back to Portfolio Link */}
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Portfolio
            </Link>
          </div>

          <article>
            {/* Hero Section */}
            <header className="mb-12">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                  {project.frontmatter.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {project.frontmatter.title}
              </h1>

              {/* Client Information */}
              <div className="mb-6 flex items-center gap-4">
                <div>
                  <p className="text-sm text-white/70">Client</p>
                  <p className="text-lg font-semibold text-white">
                    {project.frontmatter.client.name}
                  </p>
                  <p className="text-sm text-white/70">{project.frontmatter.client.industry}</p>
                </div>
                <div className="h-12 border-l border-white/20" />
                <div>
                  <p className="text-sm text-white/70">Completed</p>
                  <time
                    dateTime={project.frontmatter.date}
                    className="text-lg font-semibold text-white"
                  >
                    {projectDate.toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 text-xl text-white/90">{project.frontmatter.description}</p>

              {/* Project Links */}
              {(project.frontmatter.liveUrl || project.frontmatter.githubUrl) && (
                <div className="mb-8 flex flex-wrap gap-3">
                  {project.frontmatter.liveUrl && (
                    <Button asChild variant="default">
                      <a
                        href={project.frontmatter.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
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
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {/* Featured Image */}
              {project.frontmatter.image && (
                <figure className="relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]">
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
                <h2 className="mb-6 text-3xl font-bold text-white">Key Results</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {project.frontmatter.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                    >
                      <div className="relative z-10">
                        <p className="mb-2 text-sm font-medium text-white/70">{metric.label}</p>
                        <p className="mb-1 text-4xl font-bold text-white">{metric.value}</p>
                        {metric.improvement && (
                          <p className="text-accent-300 text-lg font-semibold">
                            {metric.improvement}
                          </p>
                        )}
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonial Section */}
            {project.frontmatter.testimonial && (
              <section className="mb-12">
                <div className="relative rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                  <div className="relative z-10">
                    {/* Star Rating */}
                    <StarRating rating={project.frontmatter.testimonial.rating} />

                    {/* Quote */}
                    <blockquote className="mt-4 mb-4">
                      <p className="text-xl leading-relaxed font-medium text-white md:text-2xl">
                        &ldquo;{project.frontmatter.testimonial.quote}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {project.frontmatter.testimonial.author}
                        </p>
                        <p className="text-sm text-white/70">
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
                <h2 className="mb-6 text-3xl font-bold text-white">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.frontmatter.tags.map((tag) => {
                    const IconComponent = getTechIcon(tag)
                    return (
                      <div
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium">{tag}</span>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Case Study Content (MDX) */}
            <section className="mb-12 max-w-4xl">
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <MDXContent>{CompiledContent}</MDXContent>
              </div>
            </section>

            {/* CTA Section */}
            <section className="mt-16 border-t border-white/20 pt-8">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white">
                  Interested in working together?
                </h2>
                <p className="mb-6 text-xl text-white/90">
                  Let&apos;s discuss how we can help bring your project to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-primary font-semibold"
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  >
                    <Link href="/portfolio">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      View More Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </>
  )
}
