# 🚀 Deployment Guide - HEADON.pro Template

This guide explains how to deploy the HEADON.pro Template to a VPS server using Docker.

## 📋 Prerequisites

### Local Development
- Node.js 22+ and pnpm 10.15.0
- Docker and Docker Compose installed locally (for testing)
- Git repository configured

### VPS Server Requirements
- Ubuntu 20.04+ or similar Linux distribution
- Docker and Docker Compose installed
- Nginx installed (for reverse proxy)
- Certbot installed (for SSL certificates)
- At least 2GB RAM and 10GB storage
- Domain name pointing to your VPS IP

## 🔧 Project Configuration

### 1. Environment Variables

Copy `.env.production.example` to `.env.production` and configure:

```bash
cp .env.production.example .env.production
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://your-domain.com)

### 2. Build Configuration

The project is already configured for Docker deployment with:
- `Dockerfile` - Multi-stage build for optimized production image
- `docker-compose.yml` - Container orchestration configuration
- `.dockerignore` - Excludes unnecessary files from Docker build
- `next.config.ts` - Configured with `output: 'standalone'` for Docker

## 🐳 Local Docker Testing

Test the Docker setup locally before deploying:

```bash
# Build the Docker image
docker-compose build

# Run the container
docker-compose up -d

# Check logs
docker-compose logs -f

# Visit http://localhost:3001
```

Stop the container:
```bash
docker-compose down
```

## 📦 VPS Deployment Steps

### Step 1: Initial VPS Setup

SSH into your VPS:
```bash
ssh user@your-vps-ip
```

Install required software (if not already installed):
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose -y

# Install Nginx
sudo apt install nginx -y

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Clone Repository

```bash
# Create projects directory
mkdir -p ~/projects
cd ~/projects

# Clone your repository
git clone https://github.com/your-username/template.git
cd template
```

### Step 3: Configure Environment

Create `.env.production` file on the VPS:
```bash
nano .env.production
```

Add your production environment variables (same as local `.env.production`).

### Step 4: Create Docker Network

Create a shared network for container communication:
```bash
docker network create web-network
```

### Step 5: Build and Run Container

```bash
# Build the Docker image
docker-compose build

# Start the container in detached mode
docker-compose up -d

# Verify container is running
docker-compose ps

# Check logs
docker-compose logs -f
```

### Step 6: Configure Nginx

Copy the Nginx configuration:
```bash
sudo cp deploy/nginx/headon-template.conf /etc/nginx/sites-available/
```

Edit the configuration with your domain:
```bash
sudo nano /etc/nginx/sites-available/headon-template.conf
```

Replace `your-domain.com` with your actual domain.

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/headon-template.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Setup SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts to configure SSL.

### Step 8: Verify Deployment

1. Visit https://your-domain.com
2. Check container logs: `docker-compose logs -f`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/headon-template.error.log`

## 🔄 Updating the Application

### Manual Update

```bash
cd ~/projects/template

# Pull latest changes
git pull origin main

# Rebuild and restart container
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Clean up old images
docker image prune -f
```

### Automated Updates (GitHub Actions)

The project includes a GitHub Actions workflow for automated deployment.

#### Setup GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

- `VPS_HOST` - Your VPS IP address or domain
- `VPS_USER` - SSH username
- `VPS_SSH_KEY` - Private SSH key for authentication
- `VPS_PORT` - SSH port (default: 22)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_SITE_URL` - Production site URL

#### Generate SSH Key for GitHub Actions

On your VPS:
```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Add public key to authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Copy private key content for GitHub secret
cat ~/.ssh/github_actions
```

Copy the private key content and add it as `VPS_SSH_KEY` secret in GitHub.

## 🛠️ Maintenance

### View Logs

```bash
# Application logs
docker-compose logs -f headon-template

# Nginx access logs
sudo tail -f /var/log/nginx/headon-template.access.log

# Nginx error logs
sudo tail -f /var/log/nginx/headon-template.error.log
```

### Restart Container

```bash
docker-compose restart
```

### Stop Container

```bash
docker-compose down
```

### Remove Container and Images

```bash
docker-compose down
docker system prune -a
```

### Backup Database

Since we're using Supabase, backups are handled by Supabase. Configure backups in your Supabase dashboard.

## 🔍 Troubleshooting

### Container Won't Start

1. Check logs: `docker-compose logs`
2. Verify environment variables: `docker-compose config`
3. Check port availability: `sudo netstat -tulpn | grep 3001`

### Nginx 502 Bad Gateway

1. Ensure container is running: `docker-compose ps`
2. Check container health: `docker-compose exec headon-template wget -O- http://localhost:3000`
3. Verify Nginx upstream: `curl http://localhost:3001`

### SSL Certificate Issues

1. Renew certificate: `sudo certbot renew`
2. Test renewal: `sudo certbot renew --dry-run`
3. Check certificate: `sudo certbot certificates`

### Memory Issues

Monitor memory usage:
```bash
docker stats
free -h
```

Adjust memory limits in `docker-compose.yml` if needed.

## 📊 Monitoring

### Basic Monitoring

```bash
# Container resource usage
docker stats headon-template

# System resources
htop

# Disk usage
df -h
```

### Health Check Endpoint

The application includes a health check endpoint:
```bash
curl https://your-domain.com/api/health
```

### Log Rotation

Configure log rotation for Docker:
```bash
sudo nano /etc/docker/daemon.json
```

Add:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker:
```bash
sudo systemctl restart docker
```

## 🔐 Security Best Practices

1. **Keep software updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure firewall**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Use strong SSH keys** and disable password authentication

4. **Regular backups** of configuration and data

5. **Monitor logs** for suspicious activity

6. **Use environment variables** for secrets, never commit them

7. **Enable Nginx rate limiting** to prevent abuse

## 📝 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)

## 🆘 Support

For issues or questions:
1. Check the logs first
2. Review this documentation
3. Check GitHub Issues
4. Contact HEADON.pro support

---

Last updated: January 2025