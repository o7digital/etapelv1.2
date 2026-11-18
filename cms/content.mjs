import { parse, serialize } from 'parse5';
import { createHash } from 'node:crypto';
import { pathLocale } from './studio/public/language-routes.js';

export const stableId = value => createHash('sha256').update(`etapel:${value}`).digest('hex').slice(0, 40);
const blocked = new Set(['script', 'style', 'noscript', 'svg', 'option', 'select']);
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const clean = value => value.replace(/\s+/g, ' ').trim();
const sharedScope = (node, route) => {
  for (let parent = node.parentNode; parent; parent = parent.parentNode) {
    if (parent.tagName === 'header') return `${pathLocale(route)}:navigation`;
    if (parent.tagName === 'footer') return `${pathLocale(route)}:footer`;
  }
  return route;
};

// Keys derive from source text, never the edited text or a fragile DOM offset.
// Rebuilds always start from Astro's source output, then apply the CMS snapshot.
export function processDocument(html, route, overrides = new Map(), { preview = false, translated = false } = {}) {
  const document = parse(html), fields = new Map(), media = new Map();
  const annotations = [];
  const locale = pathLocale(route);
  function image(source, title = '') {
    if (!/^\/[^?#]+\.(avif|webp|png|jpe?g)$/i.test(source)) return;
    const id = stableId(`image:${source}`);
    media.set(id, { id, source, title: title || source.split('/').pop(), page: route, file: null, status: 'published', sort: media.size });
  }
  function visit(node, ignored = false, section = 'Contenido de la página') {
    if (translated && node.attrs) {
      node.sourceTexts = JSON.parse(attr(node, 'data-etapel-texts') || '{}');
      node.attrs = node.attrs.filter(item => !['data-etapel-texts', 'data-etapel-images'].includes(item.name));
    }
    const keywordMeta = node.tagName === 'meta' && attr(node, 'name') === 'keywords' && attr(node, 'data-seo-keywords') !== undefined;
    ignored ||= blocked.has(node.tagName) || (attr(node, 'translate') === 'no' && !keywordMeta) || attr(node, 'data-product-detail') !== undefined ||
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
        const sourceId = node.parentNode.sourceTexts?.[node.parentNode.childNodes.indexOf(node)];
        const id = translated && sourceId ? stableId(`${page}:translated:${sourceId}`) : stableId(`${page}:${tag}:${source}`);
        fields.set(id, { id, page, locale, section: page.includes(':') ? 'Elementos compartidos' : section, label: source.slice(0, 110), source, value: source, kind: 'text', status: 'published', sort: fields.size });
        if (preview && !['title', 'head'].includes(tag)) annotations.push(() => {
          const parent = node.parentNode;
          let attribute = parent.attrs.find(a => a.name === 'data-etapel-texts');
          if (!attribute) parent.attrs.push(attribute = { name: 'data-etapel-texts', value: '{}' });
          attribute.value = JSON.stringify({ ...JSON.parse(attribute.value), [parent.childNodes.indexOf(node)]: id });
        });
        const value = overrides.get(id);
        if (value !== undefined) node.value = node.value.replace(/\S[\s\S]*\S|\S/, () => value);
      }
    }
    if (!ignored && node.tagName === 'meta' && ['description', 'keywords', 'og:description', 'og:title'].includes(attr(node, 'name') || attr(node, 'property'))) {
      const content = node.attrs.find(a => a.name === 'content');
      if (content) {
        const id = stableId(`${route}:meta:${attr(node, 'name') || attr(node, 'property')}`);
        fields.set(id, { id, page: route, locale, section: 'SEO', label: attr(node, 'name') || attr(node, 'property'), source: content.value, value: content.value, kind: 'text', status: 'published', sort: fields.size });
        if (overrides.has(id)) content.value = overrides.get(id);
      }
    }
    if (!ignored && node.tagName === 'title') {
      const source = textOf(node), id = stableId(`${route}:meta:title`);
      fields.set(id, { id, page:route, locale, section:'SEO', label:'Título en buscadores', source, value:source, kind:'text', status:'published', sort:fields.size });
      if (overrides.has(id)) node.childNodes = [{ nodeName:'#text', value:overrides.get(id), parentNode:node }];
    }
    // All local content images, including product galleries, share one media entry.
    for (const a of node.attrs || []) {
      if (['src', 'poster'].includes(a.name)) image(a.value, attr(node, 'alt'));
      if (a.name === 'srcset') for (const candidate of a.value.split(',')) image(candidate.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/, ''), attr(node, 'alt'));
    }
    if (preview && ['img', 'source'].includes(node.tagName)) {
      const sources = [attr(node, 'src'), ...(attr(node, 'srcset') || '').split(',').map(value => value.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/, ''))].filter(source => source && media.has(stableId(`image:${source}`)));
      if (sources.length) annotations.push(() => node.attrs.push({ name: 'data-etapel-images', value: JSON.stringify([...new Set(sources)]) }));
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
  const result = { html: serialize(document), fields: [...fields.values()], media: [...media.values()] };
  if (preview) { for (const annotate of annotations) annotate(); result.preview = serialize(document); }
  return result;
}
