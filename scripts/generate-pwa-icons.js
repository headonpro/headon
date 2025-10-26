/**
 * Generate PWA Icons from existing favicon
 * Uses Sharp for image resizing
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const INPUT_ICON = path.join(__dirname, '../public/icons/ON_favicon_48x48.png')
const OUTPUT_DIR = path.join(__dirname, '../public/icons')

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]

async function generateIcons() {
  console.log('🎨 Generating PWA icons...')

  // Check if input file exists
  if (!fs.existsSync(INPUT_ICON)) {
    console.error('❌ Source icon not found:', INPUT_ICON)
    process.exit(1)
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  try {
    for (const { size, name } of sizes) {
      const outputPath = path.join(OUTPUT_DIR, name)

      await sharp(INPUT_ICON)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 16, g: 52, b: 166, alpha: 1 }, // #1034A6
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(outputPath)

      console.log(`✅ Generated ${name} (${size}x${size})`)
    }

    console.log('✨ All PWA icons generated successfully!')
  } catch (error) {
    console.error('❌ Error generating icons:', error)
    process.exit(1)
  }
}

generateIcons()
