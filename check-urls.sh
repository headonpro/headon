#!/bin/bash

# Extract URLs from sitemap and check their status
curl -s https://headon.pro/sitemap.xml | \
grep -oP '(?<=<loc>)[^<]+' | \
while read url; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$status" != "200" ]; then
        echo "$status $url"
    fi
done
