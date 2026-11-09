import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Server/build only: no CMS credential or live request reaches the visitor.
const snapshot = resolve('.cms/content.json');
const content = existsSync(snapshot) ? JSON.parse(readFileSync(snapshot, 'utf8')) : null;
export function cmsCollection(name, fallback) {
  if (!content) return fallback;
  if (!Array.isArray(content[name])) throw new Error(`Missing CMS collection: ${name}`);
  return content[name].filter(row => row.status === 'published')
    .sort((a, b) => a.sort - b.sort || a.id.localeCompare(b.id)).map(row => row.payload);
}
