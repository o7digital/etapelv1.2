import { mkdir, rm, writeFile } from 'node:fs/promises';
const url = process.env.DIRECTUS_URL?.replace(/\/$/, '');
await mkdir('.cms', { recursive: true });
await rm('.cms/content.json', { force: true });
if (url) {
  if (!process.env.DIRECTUS_READ_TOKEN) throw new Error('DIRECTUS_READ_TOKEN is required.');
  const content = {};
  for (const collection of ['etapel_texts', 'etapel_media', 'etapel_products', 'etapel_families', 'etapel_brands']) {
    const rows = [];
    for (let offset = 0; ; offset += 1000) {
      const query = new URLSearchParams({ limit: '1000', offset: String(offset), sort: 'id' });
      const response = await fetch(`${url}/items/${collection}?${query}`, {
        headers: { Authorization: `Bearer ${process.env.DIRECTUS_READ_TOKEN}` }, signal: AbortSignal.timeout(30000), redirect: 'error',
      });
      if (!response.ok) throw new Error(`Directus ${collection}: HTTP ${response.status}; previous deployment remains online.`);
      const { data } = await response.json();
      if (!Array.isArray(data)) throw new Error(`Invalid ${collection} response.`);
      rows.push(...data);
      if (data.length < 1000) break;
    }
    content[collection] = rows;
  }
  for (const name of ['etapel_products', 'etapel_families', 'etapel_brands']) {
    if (!content[name].some(row => row.status === 'published')) throw new Error(`${name} cannot be empty.`);
  }
  await writeFile('.cms/content.json', JSON.stringify(content));
  console.log('Directus snapshot ready.');
} else console.log('Using repository content (CMS not configured).');
