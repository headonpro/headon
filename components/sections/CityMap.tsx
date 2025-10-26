'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import type { CityContentResult } from '@/lib/content/mdx-loader'
import 'leaflet/dist/leaflet.css'

interface CityMapProps {
  cities: CityContentResult[]
}

export default function CityMap({ cities }: CityMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Lazy load the map component after initial render
    setMapLoaded(true)
  }, [])

  return (
    <div className="space-y-12">
      {/* Interactive Map */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
        <div className="h-[500px] w-full">
          {mapLoaded && cities.length > 0 ? (
            <InteractiveMap cities={cities} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/5">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-white/50" />
                <p className="text-white/80">Karte wird geladen...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* City Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>

      {cities.length === 0 && (
        <div className="rounded-xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-md">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-white/50" />
          <h3 className="mb-2 text-lg font-semibold text-white">Keine Standorte verfügbar</h3>
          <p className="text-white/80">Die Standortinformationen werden derzeit aktualisiert.</p>
        </div>
      )}
    </div>
  )
}

interface LeafletComponents {
  MapContainer: React.ComponentType<{
    center?: [number, number]
    zoom?: number
    bounds?: [[number, number], [number, number]]
    style: React.CSSProperties
    className: string
    children: React.ReactNode
  }>
  TileLayer: React.ComponentType<{
    attribution: string
    url: string
  }>
  Marker: React.ComponentType<{
    position: [number, number]
    children: React.ReactNode
  }>
  Popup: React.ComponentType<{
    className: string
    children: React.ReactNode
  }>
}

function InteractiveMap({ cities }: { cities: CityContentResult[] }) {
  const [Map, setMap] = useState<LeafletComponents | null>(null)

  useEffect(() => {
    // Dynamically import Leaflet and fix marker icons
    Promise.all([import('react-leaflet'), import('leaflet')]).then(([reactLeaflet, L]) => {
      // Fix default marker icon issue with Leaflet + Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      setMap({
        MapContainer: reactLeaflet.MapContainer,
        TileLayer: reactLeaflet.TileLayer,
        Marker: reactLeaflet.Marker,
        Popup: reactLeaflet.Popup,
      })
    })
  }, [])

  if (!Map) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/5">
        <p className="text-white/80">Karte wird geladen...</p>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup } = Map

  // Calculate bounds to fit all cities
  const bounds: [[number, number], [number, number]] = [
    [
      Math.min(...cities.map((c) => c.frontmatter.coordinates.lat)) - 0.05,
      Math.min(...cities.map((c) => c.frontmatter.coordinates.lng)) - 0.05,
    ],
    [
      Math.max(...cities.map((c) => c.frontmatter.coordinates.lat)) + 0.05,
      Math.max(...cities.map((c) => c.frontmatter.coordinates.lng)) + 0.05,
    ],
  ]

  return (
    <MapContainer bounds={bounds} style={{ height: '100%', width: '100%' }} className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => {
        const position: [number, number] = [
          city.frontmatter.coordinates.lat,
          city.frontmatter.coordinates.lng,
        ]

        return (
          <Marker key={city.slug} position={position}>
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="mb-1 text-base font-semibold text-gray-900">
                  {city.frontmatter.name}
                </h3>
                <p className="mb-3 text-sm text-gray-600">{city.frontmatter.description}</p>
                <Link
                  href={`/regionen/${city.slug}`}
                  className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                >
                  Mehr erfahren
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

function CityCard({ city }: { city: CityContentResult }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 hover:shadow-xl">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-white/60 to-white/30" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-xl font-bold text-white">{city.frontmatter.name}</h3>
            <p className="text-sm text-white/70">{city.frontmatter.state}</p>
          </div>
          <MapPin className="h-6 w-6 text-white" />
        </div>

        {/* Population */}
        <div className="mb-4 flex items-center gap-2 text-sm text-white/80">
          <Users className="h-4 w-4" />
          <span>{city.frontmatter.population.toLocaleString('de-DE')} Einwohner</span>
        </div>

        {/* Description */}
        <p className="mb-6 text-white/80">{city.frontmatter.description}</p>

        {/* CTA Button */}
        <Link
          href={`/regionen/${city.slug}`}
          className="text-primary inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold transition-all hover:bg-white/90 hover:shadow-md"
        >
          Mehr erfahren
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
