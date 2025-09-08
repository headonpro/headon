# CI/CD Pipeline Setup Guide

## GitHub Secrets Configuration

Die folgenden Secrets müssen im GitHub Repository unter **Settings → Secrets and variables → Actions** konfiguriert werden:

### 1. VPS Connection Secrets

| Secret Name | Value | Beschreibung |
|------------|-------|--------------|
| `VPS_HOST` | `91.98.117.169` | IP-Adresse des VPS Servers |
| `VPS_USER` | `root` | SSH Benutzername |
| `VPS_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Privater SSH Key (siehe unten) |
| `VPS_PORT` | `22` | SSH Port (optional, Standard: 22) |

### 2. Supabase Secrets

| Secret Name | Value | Beschreibung |
|------------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Projekt URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Öffentlicher Supabase Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` | Supabase Service Role Key (geheim!) |
| `NEXT_PUBLIC_SITE_URL` | `https://headon.pro` | Produktions-URL der Website |

## SSH Key Setup

### 1. SSH Key auf lokalem Rechner generieren:
```bash
ssh-keygen -t ed25519 -C "github-actions@headon.pro" -f ~/.ssh/github-deploy
```

### 2. Public Key auf VPS hinzufügen:
```bash
# Auf VPS einloggen
ssh root@91.98.117.169

# Public Key zu authorized_keys hinzufügen
echo "PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
```

### 3. Private Key als GitHub Secret hinzufügen:
```bash
# Private Key anzeigen
cat ~/.ssh/github-deploy

# Diesen kompletten Output (inklusive BEGIN/END Zeilen) 
# als VPS_SSH_KEY Secret in GitHub hinzufügen
```

## Pipeline Workflow

Die CI/CD Pipeline führt folgende Schritte aus:

### Build & Test Phase:
1. ✅ Code aus Repository auschecken
2. ✅ Node.js 22 und pnpm setup
3. ✅ Dependencies installieren
4. ✅ ESLint ausführen
5. ✅ TypeScript Type-Check
6. ✅ Next.js Build erstellen

### Deploy Phase (nur bei Push auf main):
1. Docker Image bauen
2. Image zu GitHub Container Registry pushen
3. Auf VPS verbinden via SSH
4. Git Pull der neuesten Änderungen
5. Docker Container stoppen
6. Neues Image pullen
7. Container mit neuem Image starten
8. Health Check durchführen

## Aktueller Status

✅ **Behoben:**
- Alle ESLint Errors wurden behoben
- Deployment-Pfad korrigiert (`/opt/headon-github`)
- Docker Compose Syntax angepasst

⚠️ **Noch zu erledigen:**
- GitHub Secrets einrichten (siehe Tabelle oben)
- SSH Key generieren und konfigurieren
- Erste Deployment testen

## Testing der Pipeline

Nach dem Setup der Secrets:

1. Änderung committen und pushen:
```bash
git add .
git commit -m "fix: CI/CD pipeline configuration"
git push origin main
```

2. GitHub Actions Tab öffnen und Workflow beobachten

3. Bei Erfolg: Website ist unter http://91.98.117.169:3001 erreichbar

## Troubleshooting

### SSH Connection Failed
- Prüfen ob SSH Key korrekt ist
- Firewall-Regeln auf VPS prüfen
- SSH Port korrekt konfiguriert?

### Docker Build Failed
- Alle Environment Variables gesetzt?
- Docker Registry Login funktioniert?

### Container startet nicht
- Logs prüfen: `docker compose logs`
- Port bereits belegt? `lsof -i :3001`
- Berechtigungen korrekt?