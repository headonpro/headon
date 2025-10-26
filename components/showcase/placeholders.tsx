export const PlaceholderImages = {
  footballBefore:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <rect width="1920" height="1080" fill="#4a5568"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="64" font-family="sans-serif">
        Alte Website
      </text>
    </svg>
  `),

  footballAfter:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <rect width="1920" height="1080" fill="#1034a6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="64" font-family="sans-serif">
        Neue Website
      </text>
    </svg>
  `),

  appScreenshot:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg width="750" height="1624" xmlns="http://www.w3.org/2000/svg">
      <rect width="750" height="1624" fill="#ff8c00"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="48" font-family="sans-serif">
        FitTracker Pro
      </text>
    </svg>
  `),
}
