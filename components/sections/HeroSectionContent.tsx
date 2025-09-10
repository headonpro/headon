// Server Component - Renders critical content immediately
export default function HeroSectionContent() {
  return (
    <>
      {/* Main Heading - Critical for SEO and LCP */}
      <h1 className="mb-16 md:mb-20 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading">
        <span className="relative inline-block easter-egg-trigger">
          Wir
        </span>
        {' '}entwickeln digitale Erlebnisse,
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-500 to-secondary-600">
          die Ihr Unternehmen transformieren.
        </span>
      </h1>
      
      {/* Critical LCP Text - Must be visible immediately */}
      <div className="mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto">
        <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed text-center">
          Während andere Agenturen noch traditionell entwickeln, nutzen wir KI-gestützte Prozesse für 4x schnellere Umsetzung. Ihre digitale Transformation in Wochen statt Monaten - zu einem Bruchteil der üblichen Kosten.
        </p>
      </div>
    </>
  )
}