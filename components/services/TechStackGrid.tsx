'use client'

import { motion } from 'framer-motion'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiSupabase,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiGithubactions,
  SiNginx,
  SiSentry,
  SiExpo,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiMongodb,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFramer,
} from 'react-icons/si'
import { IconType } from 'react-icons'
import { useState } from 'react'

export interface Technology {
  name: string
  icon: string
  category: string
  description: string
  color?: string
}

interface TechStackGridProps {
  technologies: Technology[]
  columns?: 2 | 3 | 4 | 5
}

const iconMap: Record<string, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  redis: SiRedis,
  docker: SiDocker,
  supabase: SiSupabase,
  nodejs: SiNodedotjs,
  express: SiExpress,
  prisma: SiPrisma,
  github: SiGithubactions,
  nginx: SiNginx,
  sentry: SiSentry,
  reactnative: SiReact, // React Native uses React icon
  expo: SiExpo,
  swift: SiSwift,
  kotlin: SiKotlin,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  figma: SiFigma,
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  framer: SiFramer,
}

const categoryColors: Record<string, string> = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-pink-500',
  devops: 'from-orange-500 to-red-500',
  mobile: 'from-indigo-500 to-blue-500',
  design: 'from-pink-500 to-rose-500',
}

export function TechStackGrid({
  technologies,
  columns = 4
}: TechStackGridProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {technologies.map((tech, index) => {
        const Icon = iconMap[tech.icon] || SiReact
        const isHovered = hoveredTech === tech.name
        const categoryColor = categoryColors[tech.category] || 'from-gray-500 to-gray-600'

        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: 'easeOut'
            }}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
            className="group relative"
          >
            {/* Card */}
            <div className={`
              relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6
              transition-all duration-300
              ${isHovered ? 'shadow-xl scale-105 border-primary-500' : 'shadow-sm hover:shadow-lg'}
            `}>
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 transition-opacity duration-300`}
                animate={{ opacity: isHovered ? 0.05 : 0 }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-3 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      className={`h-12 w-12 ${tech.color || 'text-gray-700'}`}
                      style={{ color: tech.color }}
                    />
                  </motion.div>
                </div>

                {/* Name */}
                <h3 className="text-center text-sm font-semibold text-gray-900 mb-1">
                  {tech.name}
                </h3>

                {/* Category Badge */}
                <div className="flex justify-center">
                  <span className={`
                    inline-block text-xs font-medium px-2 py-0.5 rounded-full
                    ${isHovered ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}
                    transition-colors duration-300
                  `}>
                    {tech.category}
                  </span>
                </div>
              </div>

              {/* Tooltip on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-2
                  w-64 p-3 rounded-lg shadow-xl border border-gray-200
                  bg-white z-50 pointer-events-none
                  ${isHovered ? 'block' : 'hidden'}
                `}
              >
                {/* Arrow */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0
                  border-l-8 border-l-transparent
                  border-r-8 border-r-transparent
                  border-b-8 border-b-white"
                />

                <p className="text-xs text-gray-600 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// Compact variant for smaller spaces
export function TechStackCompact({ technologies }: { technologies: Technology[] }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {technologies.map((tech, index) => {
        const Icon = iconMap[tech.icon] || SiReact

        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
            }}
            className="group relative"
          >
            <div className="
              flex items-center gap-2 px-4 py-2 rounded-full
              border border-gray-200 bg-white
              hover:border-primary-500 hover:shadow-lg
              transition-all duration-300
            ">
              <Icon className={`h-5 w-5 ${tech.color || 'text-gray-700'}`} />
              <span className="text-sm font-medium text-gray-900">{tech.name}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
