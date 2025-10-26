#!/usr/bin/env ts-node
/**
 * OG Image Generator for HEADON.pro
 * Generates 9 Open Graph images (1200x630px, <100KB) with brand consistency
 */

import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'

// Brand colors from globals.css
const COLORS = {
  primary: '#1034A6', // Dark blue
  secondary: '#FF8C00', // Orange
  accent: '#FFD700', // Gold
  white: '#FFFFFF',
  dark: '#091a56',
}

const OG_WIDTH = 1200
const OG_HEIGHT = 630

interface OGImageConfig {
  filename: string
  title: string
  subtitle: string
  icon?: string
}

const images: OGImageConfig[] = [
  {
    filename: 'home.jpg',
    title: 'HEADON.pro',
    subtitle: 'Full-Service Digitalagentur',
  },
  {
    filename: 'services.jpg',
    title: 'Unsere Services',
    subtitle: 'Web, Mobile & Design',
  },
  {
    filename: 'web-dev.jpg',
    title: 'Webentwicklung',
    subtitle: 'Moderne Web-Anwendungen',
  },
  {
    filename: 'mobile-dev.jpg',
    title: 'Mobile Development',
    subtitle: 'Native & Cross-Platform Apps',
  },
  {
    filename: 'design.jpg',
    title: 'UI/UX Design',
    subtitle: 'Kreative Lösungen',
  },
  {
    filename: 'backend.jpg',
    title: 'Backend Solutions',
    subtitle: 'Skalierbare Infrastruktur',
  },
  {
    filename: 'blog.jpg',
    title: 'Blog',
    subtitle: 'Tech Insights & Updates',
  },
  {
    filename: 'contact.jpg',
    title: 'Kontakt',
    subtitle: 'Lassen Sie uns sprechen',
  },
  {
    filename: 'about.jpg',
    title: 'Über uns',
    subtitle: 'Ihr Partner für digitale Lösungen',
  },
]

/**
 * Create SVG for OG image with brand styling
 */
function createOGSVG(config: OGImageConfig): string {
  const { title, subtitle } = config

  return `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.dark};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${COLORS.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${COLORS.accent};stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bgGradient)"/>

      <!-- Accent bar -->
      <rect x="0" y="0" width="${OG_WIDTH}" height="8" fill="url(#accentGradient)"/>

      <!-- Logo text area (top left) -->
      <text x="60" y="100" font-family="sans-serif" font-size="48" font-weight="bold" fill="${COLORS.white}">
        HEADON
      </text>
      <text x="60" y="130" font-family="sans-serif" font-size="24" fill="${COLORS.accent}">
        .pro
      </text>

      <!-- Main title (centered) -->
      <text x="600" y="350" font-family="sans-serif" font-size="72" font-weight="bold"
            fill="${COLORS.white}" text-anchor="middle" dominant-baseline="middle">
        ${escapeXml(title)}
      </text>

      <!-- Subtitle -->
      <text x="600" y="430" font-family="sans-serif" font-size="36"
            fill="${COLORS.secondary}" text-anchor="middle" dominant-baseline="middle">
        ${escapeXml(subtitle)}
      </text>

      <!-- Bottom accent line -->
      <rect x="0" y="622" width="${OG_WIDTH}" height="8" fill="url(#accentGradient)"/>
    </svg>
  `.trim()
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Generate a single OG image
 */
async function generateOGImage(config: OGImageConfig, outputDir: string): Promise<void> {
  const svg = createOGSVG(config)
  const outputPath = path.join(outputDir, config.filename)

  try {
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 85, mozjpeg: true }) // Optimize for size
      .toFile(outputPath)

    // Check file size
    const stats = await fs.stat(outputPath)
    const sizeKB = Math.round(stats.size / 1024)

    console.log(`✓ Generated ${config.filename} (${sizeKB}KB)`)

    if (stats.size > 100 * 1024) {
      console.warn(`  ⚠ Warning: ${config.filename} exceeds 100KB (${sizeKB}KB)`)
    }
  } catch (error) {
    console.error(`✗ Failed to generate ${config.filename}:`, error)
    throw error
  }
}

/**
 * Main function
 */
async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'og-images')

  console.log('🎨 Generating Open Graph images...')
  console.log(`Output directory: ${outputDir}\n`)

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true })

  // Generate all images
  for (const config of images) {
    await generateOGImage(config, outputDir)
  }

  console.log('\n✓ All OG images generated successfully!')
  console.log('\nVerifying specifications:')

  // Verify all images
  for (const config of images) {
    const imagePath = path.join(outputDir, config.filename)
    const stats = await fs.stat(imagePath)
    const metadata = await sharp(imagePath).metadata()

    const sizeKB = Math.round(stats.size / 1024)
    const sizeOK = stats.size <= 100 * 1024 ? '✓' : '✗'
    const dimensionsOK = metadata.width === OG_WIDTH && metadata.height === OG_HEIGHT ? '✓' : '✗'

    console.log(`  ${config.filename}:`)
    console.log(`    ${dimensionsOK} Dimensions: ${metadata.width}x${metadata.height}`)
    console.log(`    ${sizeOK} Size: ${sizeKB}KB`)
  }
}

// Run the script
main().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
