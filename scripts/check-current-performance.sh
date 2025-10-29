#!/bin/bash

# Quick Performance Check für HEADON.pro
# Zeigt aktuellen Status vor CDN-Aktivierung

echo "🔍 Checking current performance of headon.pro..."
echo "================================================"
echo ""

# Check if site is reachable
echo "1. Testing site availability..."
status=$(curl -s -o /dev/null -w "%{http_code}" https://headon.pro)
if [ "$status" = "200" ]; then
    echo "   ✅ Site is reachable (HTTP $status)"
else
    echo "   ⚠️  Unexpected status: HTTP $status"
fi
echo ""

# Check current TTFB
echo "2. Measuring Time to First Byte (TTFB)..."
ttfb=$(curl -o /dev/null -s -w "%{time_starttransfer}\n" https://headon.pro)
echo "   Current TTFB: ${ttfb}s"
if (( $(echo "$ttfb < 0.6" | bc -l) )); then
    echo "   ✅ Already good (< 600ms)"
else
    echo "   ⚠️  Could be improved (target: < 200ms with CDN)"
fi
echo ""

# Check if Cloudflare is already active
echo "3. Checking for Cloudflare..."
server=$(curl -sI https://headon.pro | grep -i "^server:" | cut -d' ' -f2 | tr -d '\r\n')
cf_ray=$(curl -sI https://headon.pro | grep -i "cf-ray" | cut -d' ' -f2 | tr -d '\r\n')

if [ -n "$cf_ray" ]; then
    echo "   ✅ Cloudflare is ACTIVE"
    echo "   Server: $server"
    echo "   CF-Ray: $cf_ray"
else
    echo "   ℹ️  Cloudflare not yet active"
    echo "   Server: ${server:-Unknown}"
fi
echo ""

# Check Core Web Vitals hint
echo "4. Performance Hints:"
echo "   Run full Lighthouse audit with:"
echo "   → pnpm test:lighthouse"
echo ""
echo "   Or test online at:"
echo "   → https://pagespeed.web.dev/analysis?url=https://headon.pro"
echo ""

# DNS Check
echo "5. DNS Status:"
nameservers=$(dig headon.pro NS +short | head -2)
if echo "$nameservers" | grep -q "cloudflare"; then
    echo "   ✅ Cloudflare nameservers detected"
    echo "$nameservers" | sed 's/^/   → /'
else
    echo "   ℹ️  Cloudflare nameservers not yet active"
    echo "$nameservers" | sed 's/^/   → /'
fi
echo ""

echo "================================================"
echo "💡 Tip: Save this output to compare after CDN activation"
echo ""
