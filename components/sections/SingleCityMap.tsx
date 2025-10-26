'use client'

/**
 * SingleCityMap Component
 *
 * Displays a single city on a Leaflet map with a marker.
 * Used on city landing pages for local SEO.
 */

import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import type { Coordinates } from '@/lib/types/content'
import 'leaflet/dist/leaflet.css'

interface SingleCityMapProps {
  cityName: string
  coordinates: Coordinates
}

export default function SingleCityMap({ cityName, coordinates }: SingleCityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !mapRef.current) return

    // Check if map already initialized
    if (leafletMapRef.current) return

    // Dynamically import Leaflet (client-side only)
    import('leaflet').then((L) => {
      if (!mapRef.current || leafletMapRef.current) return

      // Initialize map
      const map = L.default.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng],
        13 // zoom level (13 = city level)
      )

      // Add OpenStreetMap tiles
      L.default
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        })
        .addTo(map)

      // Custom marker icon (using default Leaflet icon)
      const defaultIcon = L.default.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      // Add marker for the city
      L.default
        .marker([coordinates.lat, coordinates.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(
          `<div style="text-align: center; padding: 4px;">
            <strong style="font-size: 16px;">${cityName}</strong>
          </div>`
        )
        .openPopup()

      // Store map reference for cleanup
      leafletMapRef.current = map
    })

    // Cleanup on unmount
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [cityName, coordinates])

  return (
    <div className="relative">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-64 w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg md:h-96 dark:border-gray-800"
        style={{ zIndex: 0 }}
      />

      {/* Loading State - shown until map loads */}
      {!leafletMapRef.current && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
          <MapPin className="h-8 w-8 animate-pulse text-gray-400" />
        </div>
      )}
    </div>
  )
}
