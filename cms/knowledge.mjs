import { parse } from 'parse5';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { canonicalUrl, siteOrigin } from '../src/lib/seo.mjs';
import { languagePath } from '../src/lib/languageRoutes.mjs';

const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const clean = value => value.replace(/\s+/g, ' ').trim();
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join(' ');
const find = (node, predicate) => predicate(node) ? node : (node.childNodes || []).map(child => find(child, predicate)).find(Boolean);

export function knowledgeDocument(html, path, { catalogCards } = {}) {
  const document = parse(html);
  const canonical = attr(find(document, node => node.tagName === 'link' && attr(node, 'rel') === 'canonical'), 'href');
  const noindex = find(document, node => node.tagName === 'meta' && attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content') || ''));
  if (canonical !== canonicalUrl(path) || noindex || path.startsWith('/admin')) return null;
  const main = find(document, node => node.tagName === 'main');
  if (!main) throw new Error(`No public page content for Olivia: ${path}`);
  const title = clean(textOf(find(document, node => node.tagName === 'title') || {}));
  const description = attr(find(document, node => node.tagName === 'meta' && attr(node, 'name') === 'description'), 'content') || '';
  const pieces = [], links = new Map();
  function collectCards(node) {
    if (attr(node, 'data-catalog-card') !== undefined) {
      const href = attr(find(node, child => child.tagName === 'a' && attr(child, 'href')), 'href');
      if (href) catalogCards?.set(new URL(href, siteOrigin).pathname.replace(/\/+$/, ''), clean(textOf(node)));
      return;
    }
    for (const child of node.childNodes || []) collectCards(child);
  }
  function visit(node) {
    const classes = (attr(node, 'class') || '').split(/\s+/);
    if (attr(node, 'data-product-catalog') !== undefined) { collectCards(node); return; }
    if (['script', 'style', 'noscript', 'nav', 'footer', 'svg', 'button', 'input', 'select', 'textarea'].includes(node.tagName) || attr(node, 'data-catalog-card') !== undefined || classes.some(name => name.startsWith('olivia-')) || classes.includes('related')) return;
    if (node.nodeName === '#text') pieces.push(node.value);
    if (node.tagName === 'a') {
      const href = attr(node, 'href'), label = clean(textOf(node));
      if (href && label && !href.startsWith('#') && !/^(?:javascript|data):/i.test(href)) {
        const url = new URL(href, siteOrigin);
        if (['https:', 'mailto:', 'tel:'].includes(url.protocol)) links.set(url.href, label);
      }
    }
    for (const child of node.childNodes || []) visit(child);
  }
  visit(main);
  const text = clean(pieces.join(' '));
  if (!text) throw new Error(`Empty public page content for Olivia: ${path}`);
  return { path, key: languagePath(path, 'es'), locale: (attr(find(document, node => node.tagName === 'html'), 'lang') || 'es').split('-')[0], title, description, text, links: [...links].map(([url, title]) => ({ title, url })) };
}

export async function generateKnowledge(entries) {
  const paths = [...new Set(entries.map(entry => new URL(entry.location).pathname))].sort();
  const documents = [], catalogCards = new Map();
  for (const path of paths) {
    const document = knowledgeDocument(await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8'), path, { catalogCards });
    if (document) documents.push(document);
  }
  for (const document of documents) {
    const summary = catalogCards.get(document.path);
    if (summary && !document.text.includes(summary)) document.text += '\n' + summary;
  }
  const hash = createHash('sha256').update(JSON.stringify(documents)).digest('hex');
  const index = { version: 1, origin: siteOrigin, hash, documents };
  await mkdir('dist/.well-known', { recursive: true });
  await writeFile('dist/.well-known/etapel-knowledge.json', JSON.stringify(index));
  console.log(`Olivia knowledge: ${documents.length} canonical pages, ${new Set(documents.map(document => document.locale)).size} languages, ${Math.round(Buffer.byteLength(JSON.stringify(index)) / 1024)} KB.`);
  return index;
}
