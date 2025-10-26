interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <header className="from-primary-600 via-primary-500 to-secondary-500 bg-gradient-to-br py-16 text-white md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* H1 - Nur einmal pro Seite */}
          <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>

          {subtitle && <p className="mb-2 text-xl text-white/90 md:text-2xl">{subtitle}</p>}

          {description && <p className="mx-auto max-w-2xl text-lg text-white/80">{description}</p>}
        </div>
      </div>
    </header>
  )
}
