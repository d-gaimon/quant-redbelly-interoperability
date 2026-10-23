# Deploying the site

`site/` is a finished static website: one page, its assets and the downloadable deliverables. It needs no Node, database or build step on the server. Pick one of the three routes below.

Commands assume Ubuntu or Debian, a domain pointing at the server, and the repository cloned to `/var/www/quant-redbelly-interoperability`. Replace `research.example.org` with your domain.

## Option 1: nginx

```bash
sudo apt install nginx certbot python3-certbot-nginx
sudo git clone <repository-url> /var/www/quant-redbelly-interoperability

sudo mkdir -p /etc/nginx/snippets
sudo cp /var/www/quant-redbelly-interoperability/deploy/headers.conf /etc/nginx/snippets/overledger-research-headers.conf
sudo cp /var/www/quant-redbelly-interoperability/deploy/nginx.conf /etc/nginx/sites-available/overledger-research
sudo sed -i 's/research.example.org/YOUR.DOMAIN/' /etc/nginx/sites-available/overledger-research
sudo ln -s /etc/nginx/sites-available/overledger-research /etc/nginx/sites-enabled/

sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d YOUR.DOMAIN      # adds HTTPS and the redirect
```

To publish an update later: `cd /var/www/quant-redbelly-interoperability && sudo git pull`. nginx serves the new files at once.

If the server has no IPv6, delete the `listen [::]:80;` line before `nginx -t`.

## Option 2: Docker

```bash
cd quant-redbelly-interoperability
docker compose -f deploy/compose.yaml up -d --build
```

The site answers on port 8080. Put your usual TLS proxy in front of it, or change the port mapping in `deploy/compose.yaml`.

## Option 3: Caddy (automatic HTTPS)

```bash
sudo apt install caddy
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
sudo sed -i 's/research.example.org/YOUR.DOMAIN/' /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## What the configuration does

- Serves only `site/`; the research files, tools and Git history stay off the web, and hidden files return 403 or 404.
- Sends a strict Content Security Policy. The page loads nothing from other origins: fonts, scripts and images are all local.
- Caches `assets/` for 30 days and serves `downloads/` as attachments.

## Check it after deploying

```bash
curl -sI https://YOUR.DOMAIN/ | grep -i -E "^HTTP|content-security-policy"
curl -s -o /dev/null -w "%{http_code}\n" https://YOUR.DOMAIN/downloads/Overledger-Redbelly-Feasibility-Study.pdf
```

Both should return 200, and the first should show the policy header.
