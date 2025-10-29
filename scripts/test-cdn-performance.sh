#!/bin/bash

# CDN Performance Testing Script für HEADON.pro
# Testet verschiedene Endpoints und zeigt Cache-Status an

set -e

# Farben für Output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Domain
DOMAIN="${1:-https://headon.pro}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   HEADON.pro CDN Performance Test                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Testing domain: ${DOMAIN}${NC}"
echo ""

# Test URLs
declare -a URLS=(
    "${DOMAIN}/_next/static/chunks/webpack.js"
    "${DOMAIN}/_next/image?url=/logo.png&w=256&q=75"
    "${DOMAIN}/images/hero-background.jpg"
    "${DOMAIN}/fonts/inter.woff2"
    "${DOMAIN}/"
    "${DOMAIN}/api/health"
)

declare -a NAMES=(
    "Next.js Static (webpack.js)"
    "Next.js Image Optimization"
    "Public Image"
    "Font File"
    "Homepage (HTML)"
    "API Endpoint"
)

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Function to test URL
test_url() {
    local url=$1
    local name=$2

    echo -e "${YELLOW}Testing: ${name}${NC}"
    echo -e "URL: ${url}"

    # Führe Request aus und extrahiere relevante Header
    response=$(curl -sI -w "\n\nTime: %{time_total}s\nSize: %{size_download} bytes\nSpeed: %{speed_download} bytes/s\n" "$url")

    # Extrahiere wichtige Header
    cache_status=$(echo "$response" | grep -i "cf-cache-status:" | cut -d' ' -f2 | tr -d '\r\n')
    server=$(echo "$response" | grep -i "^server:" | cut -d' ' -f2 | tr -d '\r\n')
    content_type=$(echo "$response" | grep -i "^content-type:" | cut -d' ' -f2 | tr -d '\r\n')
    cache_control=$(echo "$response" | grep -i "^cache-control:" | cut -d' ' -f2- | tr -d '\r\n')

    # Extrahiere Timing
    time_total=$(echo "$response" | grep "Time:" | awk '{print $2}')

    # Status Code
    status_code=$(echo "$response" | grep "HTTP" | head -1 | awk '{print $2}')

    # Farbe basierend auf Cache-Status
    if [[ "$cache_status" == "HIT" ]]; then
        cache_color="${GREEN}"
    elif [[ "$cache_status" == "MISS" ]]; then
        cache_color="${YELLOW}"
    elif [[ "$cache_status" == "DYNAMIC" ]] || [[ "$cache_status" == "BYPASS" ]]; then
        cache_color="${BLUE}"
    else
        cache_color="${RED}"
    fi

    echo -e "  Status:        ${status_code}"
    echo -e "  Server:        ${server}"
    echo -e "  Cache Status:  ${cache_color}${cache_status:-UNKNOWN}${NC}"
    echo -e "  Cache-Control: ${cache_control:-Not set}"
    echo -e "  Response Time: ${time_total}"
    echo -e "  Content-Type:  ${content_type}"
    echo ""
    echo -e "${BLUE}───────────────────────────────────────────────────────────${NC}"
    echo ""
}

# Teste alle URLs
for i in "${!URLS[@]}"; do
    test_url "${URLS[$i]}" "${NAMES[$i]}"
done

# Zusammenfassung
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Test Summary                                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Legende
echo -e "${GREEN}HIT${NC}     = Cached by CDN (optimal)"
echo -e "${YELLOW}MISS${NC}    = Not cached yet (will be cached on next request)"
echo -e "${BLUE}DYNAMIC${NC} = Dynamic content (expected for HTML)"
echo -e "${BLUE}BYPASS${NC}  = Bypassed caching (expected for APIs)"
echo -e "${RED}EXPIRED${NC} = Cache expired (will be refreshed)"
echo ""

# Erwartete Ergebnisse
echo -e "${BLUE}Expected Results after CDN warmup:${NC}"
echo "  - Static assets (/_next/static/*): HIT"
echo "  - Images (/_next/image/*, /images/*): HIT"
echo "  - Fonts (/fonts/*): HIT"
echo "  - HTML pages (/): DYNAMIC"
echo "  - API routes (/api/*): BYPASS"
echo ""

# DNS Check
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   DNS & Cloudflare Check                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Extrahiere Domain ohne Protokoll
domain_only=$(echo "$DOMAIN" | sed 's~http[s]*://~~g' | cut -d'/' -f1)

echo -e "${YELLOW}Checking Nameservers for: ${domain_only}${NC}"
nameservers=$(dig "$domain_only" NS +short)

if echo "$nameservers" | grep -q "cloudflare"; then
    echo -e "${GREEN}✓ Cloudflare Nameservers detected${NC}"
    echo "$nameservers"
else
    echo -e "${RED}✗ Cloudflare Nameservers NOT detected${NC}"
    echo "$nameservers"
    echo ""
    echo -e "${YELLOW}Note: If you just changed nameservers, DNS propagation can take 2-24 hours.${NC}"
fi

echo ""
echo -e "${YELLOW}Checking A Record for: ${domain_only}${NC}"
a_record=$(dig "$domain_only" A +short | head -1)
echo "$a_record"

# Check if IP belongs to Cloudflare range (heuristic)
if [[ "$a_record" == 104.* ]] || [[ "$a_record" == 172.* ]]; then
    echo -e "${GREEN}✓ IP appears to be a Cloudflare edge server${NC}"
else
    echo -e "${YELLOW}⚠ IP might not be proxied through Cloudflare${NC}"
    echo -e "${YELLOW}  Check that DNS record has 'Proxied' (orange cloud) enabled in Cloudflare Dashboard${NC}"
fi

echo ""
echo -e "${BLUE}Test completed!${NC}"
echo ""
