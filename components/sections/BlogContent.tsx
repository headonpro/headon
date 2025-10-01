'use client'

import { Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogContentResult } from '@/lib/content/mdx-loader'
import type { BlogCategory } from '@/lib/types/content'

interface BlogContentProps {
  posts: BlogContentResult[]
  categories: BlogCategory[]
  selectedCategory?: BlogCategory
  currentPage: number
  totalPages: number
  searchQuery: string
}

export default function BlogContent({
  posts,
  categories,
  selectedCategory,
  currentPage,
  totalPages,
  searchQuery: initialSearchQuery,
}: BlogContentProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [searchInput, setSearchInput] = useState(initialSearchQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== initialSearchQuery) {
        const params = new URLSearchParams(searchParams.toString())
        if (searchInput) {
          params.set('search', searchInput)
        } else {
          params.delete('search')
        }
        params.delete('page') // Reset to page 1 on search
        router.push(`/blog?${params.toString()}`)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, initialSearchQuery, router, searchParams])

  const handleCategoryFilter = (category: BlogCategory | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to page 1 on filter
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile ? [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
            ] : [
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
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-12 font-heading"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/90 max-w-3xl mx-auto"
            >
              Insights, Trends und Best Practices aus der Welt der digitalen Innovation
            </motion.p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Artikel durchsuchen..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-accent-500 text-primary-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Alle
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                    selectedCategory === category
                      ? 'bg-accent-500 text-primary-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 flex-wrap">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white capitalize">
                          {post.frontmatter.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.frontmatter.publishedAt}>
                            {new Date(post.frontmatter.publishedAt).toLocaleDateString('de-DE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Clock className="w-4 h-4" />
                          <span>{post.frontmatter.readingTime} Min.</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors line-clamp-2">
                        {post.frontmatter.title}
                      </h2>

                      <p className="text-white/80 mb-6 leading-relaxed line-clamp-3">
                        {post.frontmatter.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">
                          von {post.frontmatter.author.name}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors"
                        >
                          Weiterlesen
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-16 flex items-center justify-center gap-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Vorherige Seite"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1

                      if (!showPage && page === 2 && currentPage > 3) {
                        return (
                          <span key={page} className="text-white/50 px-2">
                            ...
                          </span>
                        )
                      }

                      if (!showPage && page === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key={page} className="text-white/50 px-2">
                            ...
                          </span>
                        )
                      }

                      if (!showPage) return null

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[44px] px-4 py-2 rounded-lg font-medium transition-all ${
                            currentPage === page
                              ? 'bg-accent-500 text-primary-900'
                              : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Nächste Seite"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* No Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-24"
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-12">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Keine Artikel gefunden
                </h3>
                <p className="text-white/80 mb-6">
                  Versuchen Sie es mit anderen Suchbegriffen oder Filtern.
                </p>
                <button
                  onClick={() => {
                    setSearchInput('')
                    handleCategoryFilter(null)
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-500 text-primary font-semibold hover:from-accent-600 hover:to-secondary-600 transition-all"
                >
                  Alle Artikel anzeigen
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
