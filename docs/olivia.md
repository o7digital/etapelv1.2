Olivia on Etapel uses the VPS Olivia 3.5 engine, with a dedicated `etapel` tenant and service account. The shared site layout loads the Spanish/English floating chat on every page.

Browser → `/api/olivia` (Vercel function) → authenticated `/etapel/chat` gateway on `https://olivia.o7digitalgroup.com` → private Olivia `/v1/chat`.

Vercel stores `OLIVIA_GATEWAY_KEY` as a server-only environment variable. The gateway runs from `/opt/o7/apps/etapel-olivia` on `o7-vps`, using `infrastructure/olivia/compose.yaml`. Its private `.env` contains `GATEWAY_KEY`, `OLIVIA_EMAIL` and `OLIVIA_PASSWORD`; never commit this file. No V3 JWT, password or gateway key is exposed to the browser. The VPS ingress has one exact `/etapel/chat` route to this gateway; the core V3 API remains private.

The gateway fixes the tenant and routing, limits messages per visitor IP, signs conversation identifiers, and sends the approved site facts in `knowledge.txt` with every request. Conversations remain in the V3 tenant database. Browser state lasts for the current page; no contact details are required. The privacy link and advisor contact are available inside the panel. Tool integrations remain in the engine's sandbox; chat does not submit quotes or leads.

Update `knowledge.txt` when approved business content changes, then copy the gateway files to the VPS and run `docker compose up -d --force-recreate` there. Validate `docker exec etapel-olivia-gateway node -e 'fetch("http://localhost:3096/health").then(r=>r.text()).then(console.log)'`. Roll back by removing the widget from the shared layout and redeploying the site; the gateway can be stopped independently without affecting other Olivia tenants.
