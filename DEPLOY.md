# HalabUnver — Deployment Guide

## Architecture

One Docker container runs the entire application:
- The React frontend is built at image-build time and its static files are bundled inside the image
- The Node.js/Express backend serves both the API (`/api/*`) and the static frontend files
- Nginx runs on the **host VPS** (not inside Docker) as a reverse proxy — it handles SSL and forwards traffic to the container

```
Internet → Host Nginx (port 80/443, SSL) → Docker container (port 8000)
                                               ├── GET /api/*  → Express routes
                                               └── GET /*      → React app (index.html)
```

---

## Step 1 — Server Requirements

- Ubuntu 22.04+ VPS (any provider)
- Docker + Docker Compose installed
- Nginx installed on the host
- A domain name pointed to the VPS IP

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

---

## Step 2 — Clone and Configure

```bash
git clone https://github.com/youruser/halabunver.git
cd halabunver

# Create your environment file from the template
cp .env.example .env
nano .env
```

Fill in `.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/halabunver?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_string_minimum_32_characters
JWT_EXPIRES_IN=7d
```

---

## Step 3 — Build and Run the Container

```bash
# From the project root
docker compose up -d --build
```

This will:
1. Build the React frontend with Vite (`npm run build`)
2. Copy the built files into the Node.js image (`/app/public`)
3. Start the Express server on port 8000

Verify it's running:
```bash
docker compose ps
curl http://localhost:8000/api/health
```

---

## Step 4 — Configure Host Nginx

Create a new Nginx site config:

```bash
sudo nano /etc/nginx/sites-available/halabunver
```

Paste this (replace `yourdomain.com`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and test:

```bash
sudo ln -s /etc/nginx/sites-available/halabunver /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 5 — Enable SSL (HTTPS)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically update the Nginx config with SSL. Done.

---

## Updating the App

```bash
git pull
docker compose up -d --build
```

The old container is replaced with no downtime gap beyond the build time.

---

## Useful Commands

```bash
# View live logs
docker compose logs -f

# Restart without rebuilding
docker compose restart

# Stop everything
docker compose down

# Open a shell inside the container
docker compose exec app sh
```

---

## Connecting MongoDB Atlas

1. Go to your Atlas cluster → **Network Access** → Add IP `0.0.0.0/0` (or your VPS IP)
2. Go to **Database Access** → create a user with read/write permissions
3. Click **Connect** → **Drivers** → copy the connection string into `.env` as `MONGODB_URI`

> **Note:** During development on Replit, if `MONGODB_URI` is not set, the backend automatically uses an in-memory database. Data resets on every restart. Set `MONGODB_URI` to persist data.
