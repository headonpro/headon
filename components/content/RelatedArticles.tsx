import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getRelatedBlogPosts } from '@/lib/content/content-api'

interface RelatedArticlesProps {
  /**
   * Slug of the current article to find related posts for
   */
  currentSlug: string
  /**
   * Maximum number of related articles to show
   * @default 4
   */
  maxResults?: number
  /**
   * Optional heading text
   * @default "Ähnliche Artikel"
   */
  heading?: string
}

/**
 * Related Articles Component
 *
 * Displays related blog posts based on shared tags and category.
 * Uses a recommendation algorithm to find the most relevant articles.
 *
 * Algorithm:
 * 1. Filter out current post
 * 2. Score posts by shared tags count (1 point per tag)
 * 3. Boost same category by 0.5 points
 * 4. Sort by score descending
 * 5. Take top N results
 * 6. Fill with recent posts if fewer than maxResults
 *
 * @example
 * ```tsx
 * <RelatedArticles currentSlug="next-js-performance" />
 * ```
 */
export default async function RelatedArticles({
  currentSlug,
  maxResults = 4,
  heading = 'Ähnliche Artikel',
}: RelatedArticlesProps) {
  const relatedPosts = await getRelatedBlogPosts(currentSlug, maxResults)

  // Don't render if no related posts found
  if (relatedPosts.length === 0) {
    return null
  }

  /**
   * Truncates text to specified length, preserving word boundaries
   */
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text

    // Find the last space within maxLength
    const truncated = text.substring(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')

    // If there's a space, cut there; otherwise cut at maxLength
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">{heading}</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedPosts.map((post) => {
            // Create excerpt from description (first 120 chars)
            const excerpt = truncateText(post.frontmatter.description, 120)

            return (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.frontmatter.image.url}
                    alt={post.frontmatter.image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <span className="bg-primary-100 text-primary-700 rounded-full px-3 py-1 text-xs font-medium">
                      {post.frontmatter.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.frontmatter.publishedAt}>
                        {new Date(post.frontmatter.publishedAt).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{post.frontmatter.readingTime} Min.</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="group-hover:text-primary-600 mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors">
                    {post.frontmatter.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-4 line-clamp-3 leading-relaxed text-gray-700">{excerpt}</p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.frontmatter.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-500">
                        +{post.frontmatter.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-600">
                      von {post.frontmatter.author.name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                      aria-label={`Artikel lesen: ${post.frontmatter.title}`}
                    >
                      Weiterlesen
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
