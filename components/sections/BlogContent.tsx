'use client'

import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const posts = [
  {
    id: 1,
    title: 'Die Zukunft von Web Development: Was erwartet uns 2024?',
    excerpt: 'Ein Blick auf die neuesten Trends und Technologien, die die Webentwicklung revolutionieren werden.',
    author: 'Onur Cirakoglu',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'Development',
    slug: 'zukunft-web-development-2024',
  },
  {
    id: 2,
    title: 'UI/UX Design Trends 2024: Minimalismus trifft Innovation',
    excerpt: 'Entdecken Sie die wichtigsten Design-Trends, die User Experiences auf ein neues Level heben.',
    author: 'Onur Cirakoglu',
    date: '2024-01-10',
    readTime: '7 min',
    category: 'Design',
    slug: 'uiux-design-trends-2024',
  },
  {
    id: 3,
    title: 'Mobile-First Development: Best Practices für moderne Apps',
    excerpt: 'Wie Sie Apps entwickeln, die auf allen Geräten eine perfekte User Experience bieten.',
    author: 'Onur Cirakoglu',
    date: '2024-01-05',
    readTime: '6 min',
    category: 'Mobile',
    slug: 'mobile-first-development-best-practices',
  },
  {
    id: 4,
    title: 'Performance Optimization: Websites, die blitzschnell laden',
    excerpt: 'Praktische Tipps und Tricks, um die Ladezeiten Ihrer Website drastisch zu reduzieren.',
    author: 'Onur Cirakoglu',
    date: '2024-01-01',
    readTime: '8 min',
    category: 'Performance',
    slug: 'performance-optimization-websites',
  },
]

export default function BlogContent() {
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
            className="text-center mb-24"
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

          {/* Blog Posts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-white/80 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">
                      von {post.author}
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

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Mehr Content folgt bald!
              </h3>
              <p className="text-white/80 mb-6">
                Wir arbeiten an weiteren spannenden Artikeln rund um Web Development, Design und Innovation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-500 text-primary font-semibold hover:from-accent-600 hover:to-secondary-600 transition-all"
              >
                Newsletter abonnieren
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}