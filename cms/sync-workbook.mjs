import { writeFile, mkdir } from 'node:fs/promises';
import { workbookAdditionalProducts, workbookProductPatches, applyWorkbookProductPatch } from '../src/data/workbookProducts.ts';
import { catalogPlacementFor } from '../src/data/catalogHierarchy.ts';
import { stableId } from './content.mjs';
import { canonical, validateRecord } from './model.mjs';

// Read the isolated Etapel Railway service variables on stdin. Never print them.
let input = '';
for await (const chunk of process.stdin) input += chunk;
const variables = JSON.parse(input);
const base = 'https://directus-production-dd39.up.railway.app';
if (variables.PUBLIC_URL !== base || !variables.ADMIN_EMAIL || !variables.ADMIN_PASSWORD) throw new Error('Expected the Etapel Directus service variables on stdin.');
const apply = process.argv.includes('--apply');
let token;
async function api(path, method = 'GET', body) {
  const r = await fetch(base + path, {
    method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(30000), redirect: 'error'
  });
  const data = r.status === 204 ? null : await r.json();
  if (!r.ok) throw new Error(`Etapel CMS ${method} ${path.split('?')[0]}: HTTP ${r.status}`);
  return data?.data;
}
token = (await api('/auth/login', 'POST', { email: variables.ADMIN_EMAIL, password: variables.ADMIN_PASSWORD, mode: 'json' })).access_token;
const records = await api('/items/etapel_products?limit=-1');
const families = await api('/items/etapel_families?limit=-1');
const media = await api('/items/etapel_media?limit=-1');
const byId = new Map(records.map(r => [r.id, r]));
const place = p => ({ ...p, ...catalogPlacementFor(p) });
const equal = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
const updates = [];
for (const id of Object.keys(workbookProductPatches)) {
  const old = byId.get(id);
  if (!old && workbookAdditionalProducts.some(p => p.slug === id)) continue;
  if (!old) throw new Error(`Missing existing CMS product ${id}`);
  const payload = place(applyWorkbookProductPatch(old.payload));
  if (!equal(payload, old.payload)) updates.push({ old, payload });
}
const additions = workbookAdditionalProducts.filter(p => !byId.has(p.slug)).map(place);
const mediaIds = new Set(media.map(m => m.id));
const images = new Map();
for (const p of [...additions, ...updates.map(r => r.payload)]) for (const source of [p.image, ...p.gallery]) {
  const id = stableId(`image:${source}`);
  if (!mediaIds.has(id)) images.set(id, { id, source, title: p.name, page: 'Catálogo de productos', file: null, status: 'published', sort: media.length + images.size, revision: 0 });
}
const paint = families.find(f => f.payload.slug === 'pintura');
if (!paint) throw new Error('Missing Pintura family.');
const familyPayload = { ...paint.payload, items: [...paint.payload.items] };
if (!familyPayload.items.includes('Lámparas de igualación')) familyPayload.items.splice(2, 0, 'Lámparas de igualación');
const familyChanged = !equal(paint.payload, familyPayload);
for (const { old, payload } of updates) validateRecord('etapel_products', { status: old.status, sort: old.sort, payload }, old);
for (const payload of additions) validateRecord('etapel_products', { status: 'published', sort: 0, payload }, null);
if (familyChanged) validateRecord('etapel_families', { status: paint.status, sort: paint.sort, payload: familyPayload }, paint);
console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', productsBefore: records.length, productsToAdd: additions.map(p => p.slug), productsToUpdate: updates.map(p => p.old.id), newMedia: images.size, familyChanged }, null, 2));
if (!apply) process.exit(0);

await mkdir('.cms', { recursive: true });
await writeFile(`.cms/workbook-backup-${Date.now()}.json`, JSON.stringify({ products: updates.map(r => r.old), family: paint }, null, 2));
for (const { old, payload } of updates) {
  const current = await api(`/items/etapel_products/${old.id}`);
  if (current.revision !== old.revision || !equal(current.payload, old.payload)) throw new Error(`Concurrent edit detected for ${old.id}; rerun to preserve the new revision.`);
  await api(`/items/etapel_products/${old.id}`, 'PATCH', validateRecord('etapel_products', { payload, status: old.status, sort: old.sort }, old));
}
let sort = Math.max(0, ...records.map(r => r.sort || 0)) + 1;
for (const payload of additions) await api('/items/etapel_products', 'POST', { id: payload.slug, ...validateRecord('etapel_products', { payload, status: 'published', sort: sort++ }, null) });
if (familyChanged) {
  const current = await api(`/items/etapel_families/${paint.id}`);
  if (current.revision !== paint.revision || !equal(current.payload, paint.payload)) throw new Error('Concurrent edit detected for Pintura family.');
  await api(`/items/etapel_families/${paint.id}`, 'PATCH', validateRecord('etapel_families', { payload: familyPayload, status: paint.status, sort: paint.sort }, paint));
}
if (images.size) await api('/items/etapel_media', 'POST', [...images.values()]);
console.log(`Workbook content saved: ${additions.length} products added, ${updates.length} products updated, ${images.size} media entries added.`);
