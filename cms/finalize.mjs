import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { processDocument } from './content.mjs';
import { contentHash } from './model.mjs';
import { parse, serialize } from 'parse5';
const snapshot = existsSync('.cms/content.json') ? JSON.parse(await readFile('.cms/content.json', 'utf8')) : null;
const overrides = new Map((snapshot?.etapel_texts || []).filter(row => row.status === 'published').map(row => [row.id, row.value]));
const mediaPaths = new Map();
await mkdir('dist/_cms', { recursive: true });
for (const row of snapshot?.etapel_media || []) {
  if (row.status !== 'published' || !row.file) continue;
  if (!/^[a-f\d-]{36}$/i.test(row.file)) throw new Error('Invalid CMS media ID.');
  const response = await fetch(`${process.env.DIRECTUS_URL}/assets/${row.file}`, {
    headers: { Authorization: `Bearer ${process.env.DIRECTUS_READ_TOKEN}` }, signal: AbortSignal.timeout(60000), redirect: 'error',
  });
  const type = response.headers.get('content-type')?.split(';')[0];
  const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }[type];
  if (!response.ok || !extension) throw new Error(`Could not download content image ${row.id}.`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 25 * 1024 * 1024) throw new Error('CMS image exceeds 25 MB.');
  const file = `${row.file}-${createHash('sha256').update(bytes).digest('hex').slice(0, 16)}.${extension}`;
  await writeFile(`dist/_cms/${file}`, bytes);
  mediaPaths.set(row.source, `/_cms/${file}`);
}
const fields = new Map(), media = new Map();
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { if (!['_astro', '_cms', 'assets'].includes(entry.name)) await walk(path); continue; }
    if (!entry.name.endsWith('.html')) continue;
    const route = '/' + path.replace(/^dist\//, '').replace(/\/?index\.html$/, '').replace(/\/$/, '');
    let html = await readFile(path, 'utf8');
    if (!route.startsWith('/admin') && !route.includes('/productos/') && !route.includes('/products/')) {
      const result = processDocument(html, route, overrides);
      for (const row of result.fields) if (!fields.has(row.id)) fields.set(row.id, row);
      for (const row of result.media) if (!media.has(row.id)) media.set(row.id, row);
      html = result.html;
    }
    if (mediaPaths.size) {
      const document = parse(html);
      const replace = node => {
        const source = node.attrs?.find(a => a.name === 'src')?.value;
        if (mediaPaths.has(source)) {
          const row = snapshot.etapel_media.find(r => r.source === source);
          const alt = node.attrs.find(a => a.name === 'alt');
          if (alt?.value && row.title) alt.value = row.title;
        }
        for (const child of node.childNodes || []) replace(child);
      };
      replace(document); html = serialize(document);
      for (const [source, replacement] of mediaPaths) html = html.split(source).join(replacement);
    }
    await writeFile(path, html);
  }
}
await walk('dist');
// CSS background photographs must receive the same replacements as <img>.
for (const entry of await readdir('dist/_astro', { withFileTypes: true })) {
  if (!entry.name.endsWith('.css')) continue;
  const path = `dist/_astro/${entry.name}`;
  let css = await readFile(path, 'utf8');
  for (const [source, replacement] of mediaPaths) css = css.split(source).join(replacement);
  await writeFile(path, css);
}
await mkdir('.cms', { recursive: true });
await writeFile('.cms/site-map.json', JSON.stringify({ texts: [...fields.values()], media: [...media.values()] }, null, 2));
await mkdir('dist/.well-known', { recursive: true });
await writeFile('dist/.well-known/etapel-content.json', JSON.stringify({ hash: snapshot ? contentHash(snapshot) : null, builtAt: new Date().toISOString() }));
console.log(`CMS: ${fields.size} editable texts, ${media.size} media slots, ${mediaPaths.size} uploaded replacements.`);
