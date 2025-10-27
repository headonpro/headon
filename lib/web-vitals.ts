'use client'

import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

// Feature Gate: nur senden wenn URL konfiguriert ist
const vitalsUrl = process.env.NEXT_PUBLIC_VITALS_URL

function sendToAnalytics(metric: Metric) {
  // Früher Return wenn kein Analytics-Endpoint konfiguriert
  if (!vitalsUrl) return

  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  }

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, JSON.stringify(body))
  } else {
    fetch(vitalsUrl, {
      body: JSON.stringify(body),
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error)
  }
}

export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onINP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  } catch (err) {
    console.error('Web Vitals Error:', err)
  }
}
