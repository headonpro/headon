interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* H1 - Nur einmal pro Seite */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-2">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}