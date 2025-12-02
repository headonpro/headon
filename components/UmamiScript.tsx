'use client'

import Script from 'next/script'

export default function UmamiScript() {
  return (
    <Script
      src="https://analytics.headon.pro/insights.js"
      data-website-id="4d2d852f-7617-4bd2-9e80-7dbacf1c5d24"
      strategy="afterInteractive"
    />
  )
}
