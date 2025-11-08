import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostWithMeta } from '@/lib/content/content-api'
import { ArticleSchema } from '@/components/seo/SchemaGenerator'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import MDXContent from '@/components/content/MDXContent'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/blog/TableOfContents'

interface BlogPostContentProps {
  blogPost: BlogPostWithMeta
  content: React.ReactElement
  breadcrumbs: {
    items: Array<{ name: string; url: string }>
  }
}

/**
 * Blog Post Content Component
 * Renders complete blog post layout with TOC, share buttons, and related posts
 */
export default function BlogPostContent({ blogPost, content, breadcrumbs }: BlogPostContentProps) {
  const { frontmatter, toc, relatedPosts } = blogPost

  // Format dates
  const publishedDate = new Date(frontmatter.publishedAt)
  const updatedDate = frontmatter.updatedAt ? new Date(frontmatter.updatedAt) : null

  // Share URLs
  const currentUrl = `https://headon.pro/blog/${blogPost.slug}`
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(frontmatter.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  }

  return (
    <main className="min-h-screen">
      {/* Schema.org Article markup */}
      <ArticleSchema post={blogPost} />

      {/* Hero Header with Gradient Background */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 h-[600px] bg-gradient-to-br md:h-[650px]" />

        <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-16 pb-12 md:pt-20 md:pb-16">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs variant="dark" items={breadcrumbs.items} />
          </div>

          {/* Article Header */}
          <header className="mx-auto max-w-4xl space-y-4 text-white">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {frontmatter.category}
              </span>
              {frontmatter.featured && (
                <span className="inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-100 backdrop-blur-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg md:text-5xl lg:text-6xl">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 drop-shadow md:text-2xl">
              {frontmatter.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-white/80">
              {/* Author */}
              <div className="flex items-center gap-2">
                <span className="font-medium">{frontmatter.author.name}</span>
              </div>

              {/* Published Date */}
              <time dateTime={frontmatter.publishedAt} className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {frontmatter.readingTime} min read
              </div>

              {/* Updated Date */}
              {updatedDate && (
                <time dateTime={frontmatter.updatedAt} className="flex items-center gap-1">
                  <span className="text-xs">
                    Aktualisiert: {updatedDate.toLocaleDateString('de-DE')}
                  </span>
                </time>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </div>
      </div>

      {/* Main Content Area with Two-Column Layout */}
      <article className="bg-background relative -mt-16 md:-mt-20">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Featured Image */}
          {frontmatter.image && (
            <div className="relative -mt-16 mb-12 h-64 w-full overflow-hidden rounded-xl shadow-2xl md:h-96">
              <Image
                src={frontmatter.image.url}
                alt={frontmatter.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
                priority
              />
            </div>
          )}

          {/* Two-Column Layout: TOC + Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
            {/* Main Content Column */}
            <div className="min-w-0">
              {/* Article Content with prose styling */}
              <MDXContent>{content}</MDXContent>

              {/* Share Buttons */}
              <div className="mt-12 border-t pt-8">
                <h3 className="mb-4 text-lg font-semibold">Artikel teilen</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a
                      href={shareUrls.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Auf Twitter teilen"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a
                      href={shareUrls.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Auf LinkedIn teilen"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-2">
                    <a
                      href={shareUrls.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Auf Facebook teilen"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                  </Button>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="mt-8 flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted hover:bg-muted/80 text-muted-foreground inline-block cursor-pointer rounded-full px-3 py-1 text-sm transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky TOC Sidebar (Desktop only) */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            )}
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t pt-12">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">Ähnliche Artikel</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                  >
                    {/* Post Image */}
                    <div className="bg-muted relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.frontmatter.image.url}
                        alt={post.frontmatter.image.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                          {post.frontmatter.category}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {post.frontmatter.readingTime} min
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-semibold">
                        {post.frontmatter.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {post.frontmatter.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
