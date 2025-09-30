'use client'

import Script from 'next/script'

export default function UmamiScript() {
  return (
    <Script
      src="https://analytics.headon.pro/script.js"
      data-website-id="c89748e6-d37f-4033-8547-b4977606f31e"
      strategy="afterInteractive"
    />
  )
}
