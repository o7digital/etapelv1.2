import { parse, serialize } from 'parse5';
import { createHash } from 'node:crypto';

export const stableId = value => createHash('sha256').update(`etapel:${value}`).digest('hex').slice(0, 40);
const blocked = new Set(['script', 'style', 'noscript', 'svg', 'option', 'select']);
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const clean = value => value.replace(/\s+/g, ' ').trim();
const sharedScope = (node, route) => {
  for (let parent = node.parentNode; parent; parent = parent.parentNode) {
    if (parent.tagName === 'header') return `${route.startsWith('/en') ? 'en' : 'es'}:navigation`;
    if (parent.tagName === 'footer') return `${route.startsWith('/en') ? 'en' : 'es'}:footer`;
  }
  return route;
};

// Keys derive from source text, never the edited text or a fragile DOM offset.
// Rebuilds always start from Astro's source output, then apply the CMS snapshot.
export function processDocument(html, route, overrides = new Map()) {
  const document = parse(html), fields = new Map(), media = new Map();
  const locale = route.startsWith('/en') ? 'en' : 'es';
  function visit(node, ignored = false, section = 'Contenido de la página') {
    ignored ||= blocked.has(node.tagName) || attr(node, 'data-product-detail') !== undefined ||
      attr(node, 'data-catalog-card') !== undefined || attr(node, 'data-product-catalog') !== undefined ||
      (attr(node, 'class') || '').split(' ').some(name => name.startsWith('olivia-'));
    if (node.tagName === 'section') {
      const heading = findHeading(node);
      section = heading || section;
    }
    if (!ignored && node.nodeName === '#text' && node.parentNode?.tagName !== 'head') {
      const source = clean(node.value);
      if (source && /[\p{L}]/u.test(source) && source.length > 1) {
        const page = sharedScope(node, route), tag = node.parentNode.tagName;
        const id = stableId(`${page}:${tag}:${source}`);
        fields.set(id, { id, page, locale, section: page.includes(':') ? 'Elementos compartidos' : section, label: source.slice(0, 110), source, value: source, kind: 'text', status: 'published', sort: fields.size });
        const value = overrides.get(id);
        if (value !== undefined) node.value = node.value.replace(/\S[\s\S]*\S|\S/, () => value);
      }
    }
    if (!ignored && node.tagName === 'meta' && ['description', 'og:description', 'og:title'].includes(attr(node, 'name') || attr(node, 'property'))) {
      const content = node.attrs.find(a => a.name === 'content');
      if (content) {
        const id = stableId(`${route}:meta:${attr(node, 'name') || attr(node, 'property')}`);
        fields.set(id, { id, page: route, locale, section: 'SEO', label: attr(node, 'name') || attr(node, 'property'), source: content.value, value: content.value, kind: 'text', status: 'published', sort: fields.size });
        if (overrides.has(id)) content.value = overrides.get(id);
      }
    }
    // All local content images, including product galleries, share one media entry.
    for (const a of node.attrs || []) if (['src', 'poster'].includes(a.name) && /^\/(images|slider)\//.test(a.value)) {
      const id = stableId(`image:${a.value}`);
      media.set(id, { id, source: a.value, title: attr(node, 'alt') || a.value.split('/').pop(), page: route, file: null, status: 'published', sort: media.size });
    }
    for (const child of node.childNodes || []) visit(child, ignored, section);
  }
  function findHeading(node) {
    if (/^h[1-3]$/.test(node.tagName || '')) return clean(textOf(node)).slice(0, 120);
    for (const child of node.childNodes || []) { const found = findHeading(child); if (found) return found; }
    return '';
  }
  function textOf(node) { return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join(' '); }
  visit(document);
  return { html: serialize(document), fields: [...fields.values()], media: [...media.values()] };
}
