# CI/CD Pipeline Setup Guide

## Übersicht

Diese Anleitung erklärt, wie Sie die automatische CI/CD-Pipeline für HEADON.pro einrichten.

## Funktionsweise

Bei jedem Push zu `main` Branch:

1. Code wird getestet (Lint, Type-Check)
2. Docker Image wird gebaut und in GitHub Container Registry gepusht
3. VPS zieht das neue Image und startet den Container neu
4. Health-Check prüft, ob die Anwendung läuft

## Voraussetzungen

- VPS mit Docker und Docker Compose installiert
- GitHub Account mit Repository-Zugriff
- SSH-Zugang zum VPS

## Schritt 1: VPS vorbereiten

SSH in Ihren VPS und führen Sie aus:

```bash
# Docker installieren (falls noch nicht vorhanden)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Docker Compose installieren
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Setup-Skript herunterladen und ausführen
curl -o setup-vps.sh https://raw.githubusercontent.com/headonpro/headon/main/deploy/setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

## Schritt 2: SSH-Key für GitHub Actions erstellen

Auf Ihrem VPS:

```bash
# Neuen SSH-Key generieren (ohne Passphrase)
ssh-keygen -t ed25519 -f ~/.ssh/github_actions -N ""

# Public Key zu authorized_keys hinzufügen
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys

# Private Key anzeigen (diesen kopieren Sie)
cat ~/.ssh/github_actions
```

## Schritt 3: GitHub Secrets konfigurieren

Gehen Sie zu: https://github.com/headonpro/headon/settings/secrets/actions

Fügen Sie folgende Secrets hinzu:

### VPS-Zugang

- `VPS_HOST`: IP-Adresse Ihres VPS (z.B. 192.168.1.1)
- `VPS_USER`: SSH-Username (z.B. root oder ubuntu)
- `VPS_SSH_KEY`: Der private SSH-Key von Schritt 2
- `VPS_PORT`: SSH-Port (Standard: 22)

### Supabase Konfiguration

- `NEXT_PUBLIC_SUPABASE_URL`: Ihre Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Ihr Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Ihr Supabase Service Role Key
- `NEXT_PUBLIC_SITE_URL`: Ihre Domain (z.B. https://headon.pro)

## Schritt 4: Erste Deployment testen

```bash
# Pushen Sie eine kleine Änderung
git add .
git commit -m "Setup CI/CD pipeline"
git push origin main
```

Gehen Sie zu Actions Tab in GitHub und beobachten Sie den Workflow.

## Schritt 5: Domain konfigurieren (Optional)

Auf Ihrem VPS:

```bash
# Nginx installieren
sudo apt-get update
sudo apt-get install nginx certbot python3-certbot-nginx

# Nginx Konfiguration kopieren
sudo cp ~/projects/headon/deploy/nginx/headon-template.conf /etc/nginx/sites-available/headon.conf

# Domain in der Konfiguration anpassen
sudo nano /etc/nginx/sites-available/headon.conf

# Konfiguration aktivieren
sudo ln -s /etc/nginx/sites-available/headon.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL-Zertifikat mit Let's Encrypt
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Fehlerbehebung

### Container läuft nicht

```bash
cd ~/projects/headon
docker-compose logs --tail=100
docker-compose ps
```

### Permission Denied beim SSH

- Prüfen Sie, ob der SSH-Key korrekt in GitHub Secrets ist
- Prüfen Sie die Permissions: `chmod 600 ~/.ssh/authorized_keys`

### Port bereits belegt

```bash
# Prüfen welcher Prozess Port 3001 nutzt
sudo lsof -i :3001

# Docker Container stoppen
docker-compose down
docker ps -a
docker rm $(docker ps -aq)
```

### Build fehlgeschlagen

- Prüfen Sie die GitHub Actions Logs
- Stellen Sie sicher, dass alle Secrets konfiguriert sind
- Prüfen Sie die pnpm-lock.yaml Datei

## Monitoring

### Container Status prüfen

```bash
docker-compose ps
docker stats
```

### Logs anzeigen

```bash
# Live logs
docker-compose logs -f

# Letzte 100 Zeilen
docker-compose logs --tail=100
```

### Speicherplatz prüfen

```bash
docker system df
docker image prune -a  # Alte Images löschen
```

## Rollback bei Problemen

```bash
# Liste aller Images
docker images

# Zu vorherigem Image wechseln
docker-compose down
docker run -d -p 3001:3000 --env-file .env.production [IMAGE_ID]
```

## Weitere Optimierungen

### Automatisches Backup

Erstellen Sie einen Cronjob für regelmäßige Backups:

```bash
crontab -e
# Fügen Sie hinzu:
0 2 * * * docker exec headon-template pg_dump -U user dbname > ~/backups/$(date +\%Y\%m\%d).sql
```

### Monitoring mit Uptime Kuma

```bash
docker run -d --restart=always -p 3002:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

## Support

Bei Problemen:

1. Prüfen Sie die GitHub Actions Logs
2. Prüfen Sie die Docker Logs auf dem VPS
3. Erstellen Sie ein Issue im Repository
