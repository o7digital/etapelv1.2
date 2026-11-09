import http from 'node:http';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { collections, contentHash, validateRecord, StudioError } from '../model.mjs';

export function createStudioServer(options = {}) {
  const config = { cms: process.env.DIRECTUS_URL, secret: process.env.STUDIO_SESSION_SECRET, origin: process.env.STUDIO_ORIGIN, site: process.env.STUDIO_SITE_URL || 'https://etapelv1-2.vercel.app', hook: process.env.VERCEL_DEPLOY_HOOK, secure: process.env.NODE_ENV === 'production', ...options };
  if (!config.cms || !config.secret || config.secret.length < 32) throw new Error('Configure Directus and a strong session secret.');
  const encryptionKey = createHash('sha256').update(config.secret).digest();
  const attempts = new Map();
  let queue = Promise.resolve(), lastPublish = 0;
  const writes = work => { const job = queue.then(work); queue = job.catch(() => {}); return job; };
  function seal(value) {
    const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', encryptionKey, iv);
    const bytes = Buffer.concat([cipher.update(JSON.stringify(value)), cipher.final()]);
    return Buffer.concat([iv, cipher.getAuthTag(), bytes]).toString('base64url');
  }
  function session(req) {
    try {
      const cookie = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('etapel_studio='))?.slice(14);
      if (!cookie || cookie.length > 5000) return null;
      const data = Buffer.from(cookie, 'base64url');
      const decipher = createDecipheriv('aes-256-gcm', encryptionKey, data.subarray(0, 12));
      decipher.setAuthTag(data.subarray(12, 28));
      const value = JSON.parse(Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString());
      return value.until > Date.now() ? value : null;
    } catch { return null; }
  }
  function setSession(res, value) {
    const cookie = value ? seal(value) : '';
    if (cookie.length > 3800) throw new StudioError(500, 'No se pudo guardar la sesión.');
    res.setHeader('Set-Cookie', `etapel_studio=${cookie}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${value ? 7 * 86400 : 0}${config.secure ? '; Secure' : ''}`);
  }
  async function api(path, token, method = 'GET', data) {
    const form = data instanceof FormData;
    const response = await fetch(config.cms.replace(/\/$/, '') + path, { method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(data !== undefined && !form ? { 'Content-Type': 'application/json' } : {}) }, body: data === undefined ? undefined : form ? data : JSON.stringify(data), signal: AbortSignal.timeout(45000), redirect: 'error' });
    const payload = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) throw new StudioError([401,403].includes(response.status) ? response.status : 502, response.status === 401 ? 'Tu sesión ha terminado. Vuelve a entrar.' : response.status === 403 ? 'Tu cuenta no tiene permiso para esta acción.' : 'Directus no pudo completar la solicitud. Inténtalo de nuevo.');
    return payload?.data;
  }
  async function auth(req, res) {
    const s = session(req);
    if (!s) throw new StudioError(401, 'Entra a tu Studio para continuar.');
    if (s.accessUntil < Date.now() + 15000) {
      const next = await api('/auth/refresh', null, 'POST', { refresh_token: s.refresh, mode: 'json' });
      s.access = next.access_token; s.refresh = next.refresh_token; s.accessUntil = Date.now() + next.expires;
      setSession(res, s);
    }
    // Recheck active identity: a revoked or disabled account cannot retain access.
    s.user = await api('/users/me?fields=id,email,first_name,last_name', s.access);
    return s;
  }
  async function bytes(req, limit = 262144) {
    if (Number(req.headers['content-length'] || 0) > limit) throw new StudioError(413, 'El archivo supera el tamaño permitido.');
    const chunks = []; let total = 0;
    for await (const chunk of req) { total += chunk.length; if (total > limit) throw new StudioError(413, 'El archivo supera el tamaño permitido.'); chunks.push(chunk); }
    return Buffer.concat(chunks);
  }
  async function body(req) { try { return JSON.parse((await bytes(req)).toString()); } catch (error) { if (error instanceof StudioError) throw error; throw new StudioError(400, 'Revisa el formulario.'); } }
  const send = (res, value, status = 200) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
  async function all(collection, token) {
    const rows = [];
    for (let offset = 0; ; offset += 1000) {
      const page = await api(`/items/${collection}?limit=1000&offset=${offset}&sort=id`, token);
      if (!Array.isArray(page)) throw new StudioError(502, 'La respuesta del CMS no es válida.');
      rows.push(...page); if (page.length < 1000) break;
    }
    return rows;
  }
  async function serve(req, res) {
    const url = new URL(req.url, 'http://studio.local'), path = url.pathname;
    res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('X-Frame-Options', 'DENY'); res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Content-Security-Policy', `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' blob: data: ${new URL(config.site).origin}; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'`);
    if (path === '/health' && req.method === 'GET') return send(res, { ok: true });
    if (path === '/api/config' && req.method === 'GET') return send(res, { site: config.site, publishReady: Boolean(config.hook) });
    if (path.startsWith('/api/')) {
      if (!['GET', 'POST', 'PATCH'].includes(req.method)) throw new StudioError(405, 'Método no permitido.');
      if (req.method !== 'GET' && req.headers.origin !== (config.origin || `http://${req.headers.host}`)) throw new StudioError(403, 'Origen de solicitud no permitido.');
      if (path === '/api/login' && req.method === 'POST') {
        const input = await body(req);
        if (typeof input.email !== 'string' || typeof input.password !== 'string' || input.email.length > 200 || input.password.length > 300) throw new StudioError(400, 'Introduce tu correo y contraseña.');
        const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0], key = ip + ':' + input.email.toLowerCase();
        if (attempts.size > 2000) for (const [k, v] of attempts) if (v.until < Date.now()) attempts.delete(k);
        const previous = attempts.get(key), ipAttempt = attempts.get(ip);
        if ([previous, ipAttempt].some(a => a?.until > Date.now() && a.count >= 10)) throw new StudioError(429, 'Espera un minuto antes de volver a intentar.');
        for (const k of [key, ip]) { const prev = attempts.get(k); attempts.set(k, { count: prev?.until > Date.now() ? prev.count + 1 : 1, until: Date.now() + 60000 }); }
        const data = await api('/auth/login', null, 'POST', { email: input.email, password: input.password, mode: 'json' });
        await api('/users/me?fields=id', data.access_token);
        setSession(res, { access: data.access_token, refresh: data.refresh_token, accessUntil: Date.now() + data.expires, until: Date.now() + 7 * 86400000 });
        attempts.delete(key); return send(res, { ok: true });
      }
      if (path === '/api/logout' && req.method === 'POST') { const s = session(req); if (s?.refresh) await api('/auth/logout', null, 'POST', { refresh_token: s.refresh }).catch(() => {}); setSession(res, null); return send(res, { ok: true }); }
      const s = await auth(req, res);
      if (path === '/api/session' && req.method === 'GET') return send(res, { email: s.user.email, name: [s.user.first_name, s.user.last_name].filter(Boolean).join(' ') });
      if (path === '/api/content' && req.method === 'GET') {
        const content = {}; for (const name of collections) content[name] = await all(name, s.access);
        return send(res, { content, hash: contentHash(content) });
      }
      const record = path.match(/^\/api\/records\/(etapel_\w+)(?:\/([a-zA-Z0-9_-]{1,180}))?$/);
      if (record && collections.includes(record[1]) && ['POST','PATCH'].includes(req.method)) return writes(async () => {
        const [, collection, id] = record, input = await body(req);
        if (req.method === 'PATCH' && !id) throw new StudioError(400, 'Falta la ficha.');
        if (req.method === 'POST' && (id || collection === 'etapel_texts')) throw new StudioError(400, 'Utiliza un espacio de contenido existente.');
        const previous = id ? await api(`/items/${collection}/${id}`, s.access) : null;
        if (previous && input.revision !== previous.revision) throw new StudioError(409, 'Otra persona modificó esta ficha. Recarga el contenido antes de guardar.');
        const valid = validateRecord(collection, input, previous);
        if (collection === 'etapel_products') {
          const families = await all('etapel_families', s.access);
          if (!families.some(r => r.payload.slug === valid.payload.familySlug && r.status === 'published')) throw new StudioError(400, 'Selecciona una familia publicada.');
        }
        if (!id && collection === 'etapel_media') {
          if (!valid.file) throw new StudioError(400, 'Sube una fotografía primero.');
          valid.id = `media-${valid.file}`; valid.source = `/images/studio/${valid.file}`; valid.page = 'Biblioteca'; valid.sort = 0;
        } else if (!id) valid.id = valid.payload.slug;
        if (collection === 'etapel_families' && valid.status !== 'published') {
          const products = await all('etapel_products', s.access);
          if (products.some(r => r.status === 'published' && r.payload.familySlug === valid.payload.slug)) throw new StudioError(400, 'Esta familia contiene productos publicados. Reasígnalos antes de archivarla.');
          if (['pintura-y-aplicacion','enderezado-de-carroceria','desabollado-de-carroceria','mecanica','consumibles-de-pintura'].includes(valid.payload.slug)) throw new StudioError(400, 'Esta familia mantiene enlaces históricos del sitio y debe seguir publicada.');
        }
        const saved = await api(`/items/${collection}${id ? '/' + id : ''}`, s.access, id ? 'PATCH' : 'POST', valid);
        return send(res, saved);
      });
      if (path === '/api/upload' && req.method === 'POST') {
        const type = req.headers['content-type'], accepted = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
        if (!accepted.includes(type)) throw new StudioError(400, 'Utiliza una imagen JPG, PNG, WebP o AVIF.');
        const content = await bytes(req, 25 * 1024 * 1024);
        const valid = type === 'image/jpeg' ? content[0] === 255 && content[1] === 216 : type === 'image/png' ? content.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : type === 'image/webp' ? content.toString('ascii', 0, 4) === 'RIFF' && content.toString('ascii', 8, 12) === 'WEBP' : content.toString('ascii', 4, 8) === 'ftyp' && /avif|avis/.test(content.toString('ascii', 8, 32));
        if (!valid) throw new StudioError(400, 'El contenido no corresponde a una imagen válida.');
        const form = new FormData(); form.set('title', 'Fotografía Etapel'); form.set('file', new Blob([content], { type }), `etapel.${{ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[type]}`);
        const uploaded = await api('/files', s.access, 'POST', form);
        return send(res, { id: uploaded.id });
      }
      const file = path.match(/^\/api\/files\/([a-f\d-]{36})$/i);
      if (file && req.method === 'GET') {
        const response = await fetch(`${config.cms}/assets/${file[1]}`, { headers: { Authorization: `Bearer ${s.access}` }, signal: AbortSignal.timeout(60000), redirect: 'error' });
        const type = response.headers.get('content-type')?.split(';')[0];
        if (!response.ok || !['image/jpeg','image/png','image/webp','image/avif'].includes(type)) throw new StudioError(404, 'Imagen no disponible.');
        const data = Buffer.from(await response.arrayBuffer());
        if (data.length > 25 * 1024 * 1024) throw new StudioError(413, 'Imagen demasiado grande.');
        res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'private, no-store' }); return res.end(data);
      }
      if (path === '/api/publish' && req.method === 'POST') return writes(async () => {
        // Require content-write access even when a read-only account can log in.
        const permissions = await api('/permissions/me', s.access);
        if (!['full','partial'].includes(permissions?.etapel_texts?.update?.access)) throw new StudioError(403, 'Tu cuenta no tiene permiso para publicar.');
        if (!config.hook) throw new StudioError(503, 'La publicación aún no está conectada.');
        if (Date.now() - lastPublish < 60000) throw new StudioError(429, 'Hay una publicación reciente. Espera un minuto.');
        const content = {}; for (const name of collections) content[name] = await all(name, s.access);
        if (!content.etapel_products.some(r => r.status === 'published') || !content.etapel_families.some(r => r.status === 'published')) throw new StudioError(400, 'Conserva al menos un producto y una familia publicados.');
        const response = await fetch(config.hook, { method: 'POST', signal: AbortSignal.timeout(30000), redirect: 'error' });
        if (!response.ok) throw new StudioError(502, 'Vercel no aceptó la publicación.');
        lastPublish = Date.now();
        return send(res, { requested: true, hash: contentHash(content), message: 'Publicación solicitada. El sitio cambiará cuando termine el build de Vercel.' });
      });
      if (path === '/api/publication' && req.method === 'GET') {
        const response = await fetch(`${config.site}/.well-known/etapel-content.json?check=${Date.now()}`, { cache: 'no-store', signal: AbortSignal.timeout(15000), redirect: 'error' });
        return send(res, response.ok ? await response.json() : { hash: null });
      }
      throw new StudioError(404, 'Ruta no disponible.');
    }
    const files = { '/': ['index.html', 'text/html'], '/app.js': ['app.js','text/javascript'], '/style.css': ['style.css','text/css'], '/logo.svg': ['logo.svg','image/svg+xml'], '/workshop.webp': ['workshop.webp','image/webp'] };
    const staticFile = files[path];
    if (!staticFile || !['GET','HEAD'].includes(req.method)) throw new StudioError(404, 'Página no disponible.');
    const data = await readFile(new URL(`./public/${staticFile[0]}`, import.meta.url)).catch(error => {
      const local = { 'logo.svg':'etapel-logo.svg', 'workshop.webp':'images/quienes-etapel-equipo.webp' }[staticFile[0]];
      if (!local) throw error;
      return readFile(new URL(`../../public/${local}`, import.meta.url));
    });
    res.writeHead(200, { 'Content-Type': staticFile[1], 'Cache-Control': 'no-cache', 'X-Robots-Tag': 'noindex, nofollow' });
    res.end(req.method === 'HEAD' ? undefined : data);
  }
  return http.createServer((req, res) => serve(req, res).catch(error => {
    if (res.headersSent) return res.end();
    if (!(error instanceof StudioError)) console.error('Studio request failed:', error.name);
    send(res, { error: error instanceof StudioError ? error.message : 'El servicio no pudo completar la solicitud.' }, error.status || 500);
  }));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) createStudioServer().listen(Number(process.env.PORT || 4381), '0.0.0.0');
