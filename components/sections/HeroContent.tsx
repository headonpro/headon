// Server Component - Renders immediately without JavaScript
export default function HeroContent() {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 lg:pt-72 md:pb-32 text-center">
      <h1 className="mb-16 md:mb-20 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading">
        <span className="relative inline-block">
          Wir
          <span className="inline-block ml-0.5 text-accent-500">*</span>
        </span>
        {' '}entwickeln digitale Erlebnisse,
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-500 to-secondary-600">
          die Ihr Unternehmen transformieren.
        </span>
      </h1>
      
      {/* Critical content - no animation for immediate visibility */}
      <div className="mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto opacity-90">
        <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed text-center">
          Während andere Agenturen noch traditionell entwickeln, nutzen wir KI-gestützte Prozesse für 4x schnellere Umsetzung. Ihre digitale Transformation in Wochen statt Monaten - zu einem Bruchteil der üblichen Kosten.
        </p>
      </div>
      
      {/* Placeholder for CTA button - will be replaced by client component */}
      <div className="mb-20 md:mb-28 lg:mb-32 min-h-[56px]" />
    </div>
  )
}