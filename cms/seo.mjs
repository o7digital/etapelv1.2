import { parse, serialize } from 'parse5';
import { stableId } from './content.mjs';
import { canonicalUrl, jsonLd, siteOrigin } from '../src/lib/seo.mjs';

const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');
const xml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

// Run after CMS text edits so social previews and structured data use the
// published title and description. Explicit CMS social overrides still win.
export function finalizeSeo(html, route, overrides = new Map()) {
  const document = parse(html);
  const root = document.childNodes.find(node => node.tagName === 'html');
  const head = root.childNodes.find(node => node.tagName === 'head');
  const nodes = head.childNodes;
  const meta = key => nodes.find(node => node.tagName === 'meta' && (attr(node, 'name') || attr(node, 'property')) === key);
  const title = textOf(nodes.find(node => node.tagName === 'title') || {}).trim();
  const description = attr(meta('description'), 'content') || '';
  const keywords = attr(meta('keywords'), 'content');
  if (keywords !== undefined) {
    const syncFooter = node => {
      if (node.tagName !== 'meta' && attr(node, 'data-seo-keywords') !== undefined) {
        node.childNodes = [{ nodeName: '#text', value: keywords.split(/\s*[,·]\s*/).filter(Boolean).join(' · '), parentNode: node }];
      }
      for (const child of node.childNodes || []) syncFooter(child);
    };
    syncFooter(document);
  }
  const setMeta = (key, value) => {
    const node = meta(key);
    if (node) node.attrs.find(item => item.name === 'content').value = value;
  };
  for (const [key, value] of [['og:title', title], ['og:description', description]]) {
    if (!overrides.has(stableId(`${route}:meta:${key}`))) setMeta(key, value);
  }
  setMeta('twitter:title', attr(meta('og:title'), 'content') || title);
  setMeta('twitter:description', attr(meta('og:description'), 'content') || description);
  setMeta('og:image:alt', title);
  const schema = nodes.find(node => node.tagName === 'script' && attr(node, 'data-etapel-schema') !== undefined);
  if (schema) {
    const data = JSON.parse(textOf(schema));
    for (const item of data['@graph']) {
      if (item['@type'] === 'WebPage') Object.assign(item, { name: title, description });
    }
    schema.childNodes = [{ nodeName: '#text', value: jsonLd(data), parentNode: schema }];
  }
  const canonical = nodes.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
  const location = attr(canonical, 'href');
  const noindex = nodes.some(node => node.tagName === 'meta' && ['robots', 'googlebot'].includes(attr(node, 'name')) && /\bnoindex\b/i.test(attr(node, 'content') || ''));
  const entry = location === canonicalUrl(route) && !noindex ? {
    location,
    alternates: nodes.filter(node => node.tagName === 'link' && attr(node, 'rel') === 'alternate' && attr(node, 'hreflang'))
      .map(node => ({ lang: attr(node, 'hreflang'), href: attr(node, 'href') })),
  } : null;
  return { html: serialize(document), entry };
}

// Use the final build's canonical pages, excluding admin, duplicate legacy
// families and missing translations. Do not invent modification dates.
export function renderSitemap(entries) {
  const pages = new Map(entries.map(entry => [entry.location, entry]));
  const rows = [...pages.values()].sort((a, b) => a.location.localeCompare(b.location));
  for (const row of rows) if (new URL(row.location).origin !== siteOrigin) throw new Error('Unexpected sitemap domain.');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    rows.map(row => `  <url><loc>${xml(row.location)}</loc>${row.alternates.filter(item => pages.has(item.href))
      .map(item => `<xhtml:link rel="alternate" hreflang="${xml(item.lang)}" href="${xml(item.href)}"/>`).join('')}</url>`).join('\n') +
    '\n</urlset>\n';
}
