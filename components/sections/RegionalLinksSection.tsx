'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

const regions = [
  { name: 'Bad Mergentheim', slug: 'bad-mergentheim' },
  { name: 'Lauda-Königshofen', slug: 'lauda-koenigshofen' },
  { name: 'Wertheim', slug: 'wertheim' },
  { name: 'Tauberbischofsheim', slug: 'tauberbischofsheim' },
]

export default function RegionalLinksSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <MapPin className="text-primary-600 h-6 w-6" />
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Digitalagentur im Main-Tauber-Kreis
            </h2>
          </div>

          <p className="mb-8 text-lg text-gray-600">
            Wir betreuen Unternehmen in{' '}
            {regions.map((region, index) => (
              <span key={region.slug}>
                <Link
                  href={`/regionen/${region.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium underline decoration-2 underline-offset-2 transition-colors"
                >
                  {region.name}
                </Link>
                {index < regions.length - 2 && ', '}
                {index === regions.length - 2 && ' und '}
              </span>
            ))}{' '}
            und der gesamten Region.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/regionen/${region.slug}`}
                  className="hover:border-primary-300 hover:bg-primary-50 group block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all"
                >
                  <span className="text-primary-600 group-hover:text-primary-700 font-semibold">
                    SEO & Webdesign
                  </span>
                  <br />
                  <span className="text-gray-700">{region.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
