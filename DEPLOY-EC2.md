# Deploy Jadvix CRM on a single EC2 (Docker + Caddy auto-HTTPS + Elastic IP)

Architecture: one EC2 box runs three containers — **backend** (Express/Prisma, `/api/v1`),
**frontend** (Next.js standalone), **Caddy** (reverse proxy + automatic Let's Encrypt TLS).
MongoDB is **Atlas** (managed, off-box). Public entry is your **Elastic IP**, reached over
HTTPS via a free `sslip.io` hostname (`<EIP>.sslip.io`).

> Why HTTPS and not bare http on the IP: the API sets the refresh-token cookie with
> `Secure` in production, so login only works over HTTPS. `sslip.io` + Caddy gives a real
> cert for your IP with zero DNS purchase.

Files already in the repo: `docker-compose.yml`, `Caddyfile`, `.env.deploy.example`,
`jadvix-backend/Dockerfile`, `jadvixCRMWebApp/Dockerfile`, `jadvix-backend/.env.production.example`.

---

## 1. MongoDB Atlas
1. Create a cluster (M10+ for prod), a DB user, and copy the SRV `DATABASE_URL`.
2. Network Access → add your **Elastic IP** (allocate it in step 2 first, or temporarily `0.0.0.0/0`).

## 2. Launch EC2 + Elastic IP
1. EC2 → Launch: **Ubuntu 24.04 LTS**, **t3.medium** (2 vCPU / 4 GB), 30 GB gp3, your key pair.
2. Security Group inbound: **22** (your IP only), **80** and **443** (0.0.0.0/0).
3. EC2 → **Elastic IPs** → Allocate → Associate to the instance. Note the IP, e.g. `13.234.56.78`.

## 3. Install Docker on the box
```bash
ssh -i key.pem ubuntu@<ELASTIC_IP>
sudo apt-get update && sudo apt-get install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu && exit    # re-SSH so the group takes effect
```
Optional (avoid build OOM on 4 GB): add 2 GB swap
```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
```

## 4. Get the code onto the box
```bash
git clone <your-repo-url> jadvixCRM   # or: rsync/scp the folder up
cd jadvixCRM
```

## 5. Fill the env files (on the server)
```bash
cp .env.deploy.example .env
#   SITE_ADDRESS=<ELASTIC_IP>.sslip.io
#   PUBLIC_ORIGIN=https://<ELASTIC_IP>.sslip.io
cp jadvix-backend/.env.production.example jadvix-backend/.env.production
#   fill DATABASE_URL, JWT secrets, GMAIL_APP_PASSWORD, and the three URLs with <ELASTIC_IP>
```

## 6. Master hash + DB schema (one-time, via a throwaway container)
```bash
# generate the argon2 hash, paste it into MASTER_PASSWORD_HASH in .env.production
docker compose run --rm --no-deps backend npm run hash-master

# create collections + indexes in Atlas
docker compose run --rm --no-deps backend npm run prisma:push

# optional demo data
docker compose run --rm --no-deps backend npm run seed
```

## 7. Build and start everything
```bash
docker compose up -d --build
docker compose logs -f caddy     # watch it obtain the TLS cert (a few seconds)
```

## 8. Use it
Open **https://<ELASTIC_IP>.sslip.io** → master login (`MASTER_EMAIL` + your password).
API health: `https://<ELASTIC_IP>.sslip.io/api/health` is not exposed; use `docker compose logs backend`.

---

## Day-2 notes
- **Redeploy after code changes:** `git pull && docker compose up -d --build`.
- **After a Prisma schema change:** re-run `docker compose run --rm --no-deps backend npm run prisma:push`.
- **Boot survival:** Docker starts on boot; `restart: unless-stopped` brings the stack back.
- **Logs:** `docker compose logs -f backend` / `frontend` / `caddy`.
- **Keep the Elastic IP associated** — it's free while attached to a running instance, billed if left unattached.
- **Real domain later:** point an A record at the Elastic IP, set `SITE_ADDRESS`/`PUBLIC_ORIGIN`
  and the backend URLs to that domain, rebuild. Everything else is identical.
- **Scale later:** this is the stateless base. When one box isn't enough, put an ALB + Auto Scaling
  Group in front of an AMI of this instance (or move to ECS). No app changes needed.
