import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getBlogPost, getAllBlogPosts } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import MDXContent from '@/components/content/MDXContent'
import { ArticleSchema } from '@/components/seo/SchemaGenerator'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

// Export metadata generator
export { generateMetadata }

/**
 * Generate static params for all blog posts at build time
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Blog Post Page
 * Server component that renders individual blog articles with MDX content
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Load blog post
  const post = await getBlogPost(slug)

  // Return 404 if post not found
  if (!post) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(post.content)

  // Format dates
  const publishedDate = new Date(post.frontmatter.publishedAt)
  const updatedDate = post.frontmatter.updatedAt
    ? new Date(post.frontmatter.updatedAt)
    : null

  return (
    <main className="min-h-screen">
      {/* Schema.org Article markup */}
      <ArticleSchema post={post} />

      {/* Hero Header with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              variant="dark"
              items={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
                { name: post.frontmatter.title, url: `/blog/${slug}` },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="space-y-4 text-white">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                {post.frontmatter.category}
              </span>
              {post.frontmatter.featured && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-500/20 backdrop-blur-sm text-yellow-100 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg">
              {post.frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 drop-shadow">
              {post.frontmatter.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 pt-4">
            {/* Author */}
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.frontmatter.author.name}</span>
            </div>

            {/* Published Date */}
            <time dateTime={post.frontmatter.publishedAt} className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {publishedDate.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            {/* Reading Time */}
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.frontmatter.readingTime} min read
            </div>

            {/* Updated Date (if exists) */}
            {updatedDate && (
              <time
                dateTime={post.frontmatter.updatedAt}
                className="flex items-center gap-1"
              >
                <span className="text-xs">
                  Aktualisiert: {updatedDate.toLocaleDateString('de-DE')}
                </span>
              </time>
            )}
          </div>

          {/* Tags */}
          {post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-xs bg-white/10 backdrop-blur-sm text-white rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          </header>
        </div>
      </div>

      {/* Main Content Area */}
      <article className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Featured Image */}
          {post.frontmatter.image && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 shadow-2xl -mt-24">
              <Image
                src={post.frontmatter.image.url}
                alt={post.frontmatter.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <MDXContent>{CompiledContent}</MDXContent>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </div>
      </article>
    </main>
  )
}
