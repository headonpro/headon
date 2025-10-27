#!/bin/bash

# Generate Open Graph images for branchen pages
# Dimensions: 1200x630px
# Brand colors: Primary Blue #1034a6, Secondary Orange #ff8c00

OUTPUT_DIR="public/og-images"
WIDTH=1200
HEIGHT=630

# Brand colors
PRIMARY_BLUE="#1034a6"
SECONDARY_ORANGE="#ff8c00"
ACCENT_BAR_HEIGHT=20

# Industry data: slug|heroTitle|icon-emoji
declare -A INDUSTRIES=(
  ["gastronomie"]="Professionelle Website für Ihr\nRestaurant oder Café|🍽️"
  ["handwerk"]="Website für Handwerksbetriebe\nMehr Aufträge, weniger Aufwand|🔨"
  ["einzelhandel"]="E-Commerce Lösung für\nIhren Online-Shop|🛍️"
  ["beratung"]="Website für Berater, Coaches\nund Dienstleister|🎓"
  ["immobilien"]="Immobilien-Website für\nMakler und Verwalter|🏠"
  ["fitness"]="Website für Fitnessstudios\nund Wellnesscenter|💪"
)

echo "Generating Open Graph images for branchen pages..."

for industry in "${!INDUSTRIES[@]}"; do
  IFS='|' read -r title icon <<< "${INDUSTRIES[$industry]}"

  output_file="${OUTPUT_DIR}/branchen-${industry}.jpg"

  echo "Creating ${output_file}..."

  magick -size ${WIDTH}x${HEIGHT} xc:"${PRIMARY_BLUE}" \
    \( -size ${WIDTH}x${ACCENT_BAR_HEIGHT} xc:"${SECONDARY_ORANGE}" \) -geometry +0+0 -composite \
    \( -size ${WIDTH}x${ACCENT_BAR_HEIGHT} xc:"${SECONDARY_ORANGE}" \) -geometry +0+$((HEIGHT-ACCENT_BAR_HEIGHT)) -composite \
    -font "Adwaita-Sans-Bold" \
    -pointsize 70 \
    -fill white \
    -gravity center \
    -annotate +0-100 "HEADON.pro" \
    -pointsize 40 \
    -fill "${SECONDARY_ORANGE}" \
    -gravity center \
    -annotate +0+80 "${title}" \
    -pointsize 120 \
    -gravity center \
    -annotate +0-220 "${icon}" \
    -font "Adwaita-Sans-ExtraBold" \
    -pointsize 24 \
    -fill white \
    -gravity northwest \
    -annotate +50+50 "HEADON" \
    -pointsize 24 \
    -fill "${SECONDARY_ORANGE}" \
    -annotate +170+50 ".pro" \
    -quality 85 \
    "${output_file}"

  # Check file size
  size=$(du -k "${output_file}" | cut -f1)
  echo "  ✓ Created ${output_file} (${size}KB)"

  if [ $size -gt 500 ]; then
    echo "  ⚠ Warning: File size exceeds 500KB, optimizing..."
    magick "${output_file}" -quality 75 "${output_file}"
    size=$(du -k "${output_file}" | cut -f1)
    echo "  ✓ Optimized to ${size}KB"
  fi
done

echo ""
echo "All branchen OG images generated successfully!"
echo "Location: ${OUTPUT_DIR}/branchen-*.jpg"
