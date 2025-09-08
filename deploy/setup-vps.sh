#!/bin/bash

# VPS Setup Script for HEADON.pro
# This script prepares your VPS for the CI/CD pipeline

set -e

echo "🚀 Setting up VPS for HEADON.pro deployment..."

# Create project directory
mkdir -p ~/projects/headon
cd ~/projects/headon

# Clone repository (if not exists)
if [ ! -d ".git" ]; then
    git clone https://github.com/headonpro/headon.git .
else
    echo "Repository already exists, pulling latest changes..."
    git pull origin main
fi

# Create docker network if not exists
docker network create web-network 2>/dev/null || echo "Network already exists"

# Create initial .env.production file (will be overwritten by CI/CD)
if [ ! -f ".env.production" ]; then
    cat > .env.production << EOF
# This file will be automatically updated by CI/CD
# Add your environment variables in GitHub Secrets
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
EOF
fi

# Setup nginx configuration (optional)
if [ -f "deploy/nginx/headon-template.conf" ]; then
    echo "📝 Nginx configuration found. You may want to copy it to /etc/nginx/sites-available/"
    echo "   sudo cp deploy/nginx/headon-template.conf /etc/nginx/sites-available/headon.conf"
    echo "   sudo ln -s /etc/nginx/sites-available/headon.conf /etc/nginx/sites-enabled/"
    echo "   sudo nginx -t && sudo systemctl reload nginx"
fi

# Pull required Docker images
echo "📦 Pulling Node.js Docker image..."
docker pull node:22-alpine

# Initial build (optional - CI/CD will handle this)
echo "🔨 Building initial container..."
docker-compose build

echo "✅ VPS setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure GitHub Secrets in your repository settings"
echo "2. Update .env.production with your actual values"
echo "3. Configure your domain/nginx if needed"
echo "4. Push to main branch to trigger deployment"