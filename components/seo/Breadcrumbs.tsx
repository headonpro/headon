'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import StructuredData from './StructuredData'

interface BreadcrumbItem {
  name: string
  url: string
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Generiere Breadcrumbs basierend auf dem Pfad
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ]
    
    // Mapping für bessere Namen
    const nameMapping: { [key: string]: string } = {
      'services': 'Services',
      'portfolio': 'Portfolio',
      'about': 'Über uns',
      'contact': 'Kontakt',
      'team': 'Team',
      'blog': 'Blog',
    }
    
    let currentPath = ''
    paths.forEach(path => {
      currentPath += `/${path}`
      breadcrumbs.push({
        name: nameMapping[path] || path.charAt(0).toUpperCase() + path.slice(1),
        url: currentPath
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // Zeige keine Breadcrumbs auf der Startseite
  if (pathname === '/') return null
  
  return (
    <>
      {/* Structured Data für Breadcrumbs */}
      <StructuredData 
        type="breadcrumb" 
        data={{ breadcrumbs }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb Navigation"
        className="container mx-auto px-4 py-4"
      >
        <ol 
          className="flex items-center space-x-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.url}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Letztes Element (aktuelle Seite)
                <span 
                  className="text-gray-700 dark:text-gray-300 font-medium"
                  itemProp="name"
                >
                  {breadcrumb.name}
                </span>
              ) : (
                // Verlinkbare Elemente
                <Link
                  href={breadcrumb.url}
                  className="text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
                  itemProp="item"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span itemProp="name">{breadcrumb.name}</span>
                </Link>
              )}
              
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}