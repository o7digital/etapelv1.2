import { parse, serialize } from 'parse5';
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { languagePath, languageHash, locales, addedLocales } from '../src/lib/languageRoutes.mjs';
import { canonicalUrl, jsonLd, siteOrigin } from '../src/lib/seo.mjs';
import { finalizeSeo } from './seo.mjs';
import { sataFinderUrl } from '../src/lib/sataParts.mjs';
import { seoKeywords } from '../src/lib/keywords.mjs';
import { processDocument } from './content.mjs';
import { previewPath } from './studio/preview.mjs';

const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
function setAttr(node, name, value) {
  node.attrs ??= [];
  const existing = node.attrs.find(item => item.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}
const textOf = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textOf).join('');
export const normalizeCopy = value => value.replace(/\s+/g, ' ').trim();
const isCopy = value => /\p{L}/u.test(value) && !/^(?:https?:\/\/|mailto:|tel:|[\w.+-]+@[\w.-]+\.[a-z]{2,}$)/i.test(value);
const translatedAttributes = new Set(['alt', 'title', 'aria-label', 'placeholder', 'data-error', 'data-thinking', 'data-retry', 'data-lead-sending', 'data-lead-success', 'data-lead-error']);
const translatedMeta = new Set(['description', 'keywords', 'og:title', 'og:description', 'og:image:alt', 'twitter:title', 'twitter:description']);
const schemaText = new Set(['name', 'description', 'category', 'alternateName', 'value']);
const originLabel = 'Proudly Mexican 🇲🇽';

function visitSchema(value, visit) {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string' && schemaText.has(key)) value[key] = visit(item);
    else if (typeof item === 'object') visitSchema(item, visit);
  }
}

// Shared extraction and rendering ensure alt text, metadata, interactive feedback
// and structured product descriptions receive the same reviewed translations.
function visitCopy(node, visit) {
  if (attr(node, 'translate') === 'no') return;
  if (node.tagName === 'script') {
    if (attr(node, 'data-etapel-schema') !== undefined) {
      const data = JSON.parse(textOf(node));
      visitSchema(data, visit);
      node.childNodes = [{ nodeName: '#text', value: jsonLd(data), parentNode: node }];
    }
    return;
  }
  if (['style', 'noscript', 'code', 'pre'].includes(node.tagName)) return;
  if (node.nodeName === '#text') node.value = visit(node.value);
  for (const item of node.attrs || []) {
    if (translatedAttributes.has(item.name) || (node.tagName === 'meta' && item.name === 'content' && translatedMeta.has(attr(node, 'name') || attr(node, 'property'))) || (node.tagName === 'input' && item.name === 'value' && (['submit', 'button'].includes(attr(node, 'type')) || attr(node, 'name') === '_subject'))) item.value = visit(item.value);
  }
  for (const child of node.childNodes || []) visitCopy(child, visit);
}

export function extractCopy(html) {
  const entries = new Set([originLabel, 'Choose language']);
  visitCopy(parse(html), value => {
    const normalized = normalizeCopy(value);
    if (isCopy(normalized)) entries.add(normalized);
    return value;
  });
  return [...entries];
}

function localizedUrl(value, locale) {
  if (!value || value.startsWith('#') || (!value.startsWith('/') && !value.startsWith(siteOrigin))) return value;
  const url = new URL(value, siteOrigin);
  if (url.origin !== siteOrigin) return value;
  const path = languagePath(url.pathname, locale);
  if (path === url.pathname.replace(/\/+$/, '') && !/^\/(?:en|de|it|fr|pt)(?:\/|$)/.test(url.pathname)) return value;
  url.pathname = path;
  url.hash = languageHash(url.hash, locale);
  return value.startsWith(siteOrigin) ? url.href : url.pathname + url.search + url.hash;
}

function localizeSchema(value, locale, parentType) {
  if (!value || typeof value !== 'object') return;
  const type = value['@type'] || parentType;
  for (const [key, item] of Object.entries(value)) {
    if (key === 'inLanguage') value[key] = type === 'WebSite' ? locales.map(item => item.tag) : locale.tag;
    else if (typeof item === 'string' && ['url', '@id', 'item'].includes(key) && !['Organization', 'WebSite'].includes(type) && !/\/#(?:organization|website)$/.test(item)) value[key] = localizedUrl(item, locale.code);
    else if (typeof item === 'object') localizeSchema(item, locale, type);
  }
}

export function localizeDocument(html, route, localeCode, catalog, { missing = new Set() } = {}) {
  const locale = addedLocales.find(item => item.code === localeCode);
  if (!locale) throw new Error(`Unsupported generated language: ${localeCode}`);
  const dictionary = catalog.translations || catalog;
  const document = parse(html);
  const translate = value => {
    const normalized = normalizeCopy(value);
    if (!isCopy(normalized)) return value;
    if (!Object.hasOwn(dictionary, normalized)) { missing.add(normalized); return value; }
    const translated = dictionary[normalized];
    if (typeof translated !== 'string' || !translated.trim()) throw new Error(`Invalid ${locale.code} translation: ${normalized}`);
    return value.match(/^\s*/)[0] + translated + value.match(/\s*$/)[0];
  };
  visitCopy(document, translate);
  function walk(node, languagePicker = false) {
    languagePicker ||= attr(node, 'data-language-picker') !== undefined;
    if (attr(node, 'data-seo-keywords') !== undefined) {
      const keywords = seoKeywords(languagePath(route, locale.code), locale.code);
      if (node.tagName === 'meta') setAttr(node, 'content', keywords.join(', '));
      else node.childNodes = [{ nodeName: '#text', value: keywords.join(' · '), parentNode: node }];
    }
    if (node.tagName === 'html') {
      setAttr(node, 'lang', locale.tag);
      setAttr(node, 'style', `--etapel-origin-label:${JSON.stringify(translate(originLabel))}`);
    }
    if (attr(node, 'data-language-summary') !== undefined) node.childNodes = [{ nodeName: '#text', value: locale.code.toUpperCase(), parentNode: node }];
    if (languagePicker && node.tagName === 'summary') setAttr(node, 'aria-label', translate('Choose language'));
    const option = attr(node, 'data-language-option');
    if (option) {
      setAttr(node, 'href', languagePath(route, option));
      node.attrs = node.attrs.filter(item => item.name !== 'aria-current');
      if (option === locale.code) setAttr(node, 'aria-current', 'page');
    } else {
      for (const item of node.attrs || []) {
        if (['href', 'action'].includes(item.name) && !(node.tagName === 'link' && attr(node, 'hreflang'))) item.value = localizedUrl(item.value, locale.code);
        if (item.name === 'data-lang' || (!languagePicker && item.name === 'lang' && item.value === 'en')) item.value = item.name === 'lang' ? locale.tag : locale.code;
        if (node.tagName === 'input' && item.name === 'value' && ['lang', 'language', 'idioma', '_language'].includes(attr(node, 'name'))) item.value = locale.code;
      }
    }
    if (attr(node, 'data-olivia-sata') === 'true' || attr(node, 'data-sata-finder-link') !== undefined) setAttr(node, 'href', sataFinderUrl(locale.code));
    if (node.tagName === 'meta') {
      const property = attr(node, 'property');
      if (property === 'og:locale') setAttr(node, 'content', locale.og);
      if (property === 'og:url') setAttr(node, 'content', localizedUrl(attr(node, 'content'), locale.code));
      // Rebuild below so the current language never appears as an alternate.
      if (property === 'og:locale:alternate') node.__remove = true;
    }
    if (node.tagName === 'script' && attr(node, 'data-etapel-schema') !== undefined) {
      const data = JSON.parse(textOf(node)); localizeSchema(data, locale);
      node.childNodes = [{ nodeName: '#text', value: jsonLd(data), parentNode: node }];
    }
    for (const child of node.childNodes || []) walk(child, languagePicker);
    if (node.tagName === 'form' && !node.childNodes.some(child => child.tagName === 'input' && attr(child, 'name') === 'idioma')) node.childNodes.push({ nodeName: 'input', tagName: 'input', namespaceURI: 'http://www.w3.org/1999/xhtml', attrs: [{ name: 'type', value: 'hidden' }, { name: 'name', value: 'idioma' }, { name: 'value', value: locale.code }], childNodes: [], parentNode: node });
    if (attr(node, 'data-catalog-card') !== undefined) setAttr(node, 'data-search', `${attr(node, 'data-search') || ''} ${textOf(node)}`.toLowerCase());
    if (node.tagName === 'head') {
      node.childNodes = node.childNodes.filter(child => !child.__remove);
      for (const item of locales.filter(item => item.code !== locale.code)) node.childNodes.push({ nodeName: 'meta', tagName: 'meta', namespaceURI: 'http://www.w3.org/1999/xhtml', attrs: [{ name: 'property', value: 'og:locale:alternate' }, { name: 'content', value: item.og }], childNodes: [], parentNode: node });
    }
  }
  walk(document);
  return serialize(document);
}

export async function generateLocalizedPages({ overrides = new Map(), fields = new Map(), media = new Map(), mediaPaths = new Map() } = {}) {
  const sources = [];
  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await scan(path);
      else if (entry.name === 'index.html') sources.push(path.slice(4, -11));
    }
  }
  // Include legacy family aliases so an old shared link can still switch language.
  await scan('dist/en');
  const catalogs = new Map(await Promise.all(addedLocales.map(async locale => [locale.code, JSON.parse(await readFile(new URL(`./locales/${locale.code}.json`, import.meta.url), 'utf8'))])));
  const generated = [];
  for (const locale of addedLocales) {
    const missing = new Set();
    for (const route of sources) {
      const editable = !route.includes('/products/');
      const bundle = editable ? JSON.parse(await readFile(`dist${previewPath(route)}`, 'utf8')) : null;
      const html = bundle?.html || await readFile(`dist${route}/index.html`, 'utf8');
      const path = languagePath(route, locale.code);
      let translated = localizeDocument(html, route, locale.code, catalogs.get(locale.code), { missing });
      if (editable) {
        const result = processDocument(translated, path, overrides, { preview: true, translated: true });
        for (const row of result.fields) if (!fields.has(row.id)) fields.set(row.id, row);
        for (const row of result.media) if (!media.has(row.id)) media.set(row.id, row);
        translated = result.html;
        await writeFile(`dist${previewPath(path)}`, JSON.stringify({ version: 1, route: path, html: finalizeSeo(result.preview, path, overrides).html, mediaPaths: Object.fromEntries(mediaPaths) }));
      }
      for (const [source, replacement] of mediaPaths) translated = translated.split(source).join(replacement);
      const seo = finalizeSeo(translated, path, overrides);
      await mkdir(`dist${path}`, { recursive: true });
      await writeFile(`dist${path}/index.html`, seo.html);
      if (seo.entry) generated.push(seo.entry);
    }
    if (missing.size) {
      const message = `${locale.code}: ${missing.size} new source texts need translation. Run npm run translations:generate against the current CMS build. First: ${[...missing].slice(0, 4).join(' | ')}`;
      if (process.env.ETAPEL_REQUIRE_TRANSLATIONS === '1') throw new Error(message);
      console.warn(message);
    }
  }
  console.log(`Languages: ${sources.length} pages each in German, Italian, French and Brazilian Portuguese (${generated.length} new canonical pages).`);
  return generated;
}
