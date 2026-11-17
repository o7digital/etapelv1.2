import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { canonicalUrl, jsonLd, languageAlternates } from '../src/lib/seo.mjs';
import { processDocument, stableId } from '../cms/content.mjs';
import { finalizeSeo, renderSitemap } from '../cms/seo.mjs';

test('canonical URLs use the public domain and language alternates are reciprocal', () => {
  assert.equal(canonicalUrl('/?campaign=test#top'), 'https://www.etapel.com/');
  for (const path of ['/', '/capacitacion', '/politicas-de-etapel', '/linea-de-producto/pintura', '/linea-de-producto/productos/sata-jet-x']) {
    const alternates = languageAlternates(path + (path === '/' ? '' : '/'));
    assert.equal(alternates.length, 3);
    assert.deepEqual(languageAlternates(new URL(alternates[1].href).pathname), alternates);
    assert.equal(alternates[0].href, canonicalUrl(path));
  }
  assert.deepEqual(languageAlternates('/admin'), []);
});

const page = (path, canonical = path) => `<html lang="es"><head>
  <title>Original</title><meta name="description" content="Original description">
  <link rel="canonical" href="${canonicalUrl(canonical)}">
  ${languageAlternates(canonical).map(item => `<link rel="alternate" hreflang="${item.lang}" href="${item.href}">`).join('')}
  <meta property="og:title" content="Original"><meta property="og:description" content="Original description">
  <meta name="twitter:title" content="Original"><meta name="twitter:description" content="Original description">
  <script type="application/ld+json" data-etapel-schema>${jsonLd({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', name: 'Original', description: 'Original description' }] })}</script>
  </head><body><h1>Original</h1></body></html>`;
const metaValue = (document, key) => {
  const head = document.childNodes.find(node => node.tagName === 'html').childNodes.find(node => node.tagName === 'head');
  const node = head.childNodes.find(node => node.tagName === 'meta' && node.attrs.some(item => ['name', 'property'].includes(item.name) && item.value === key));
  return node.attrs.find(item => item.name === 'content').value;
};

test('published CMS edits propagate to social metadata and safe JSON-LD', () => {
  const title = 'Edited </script><script>alert(1)</script> & Etapel';
  const overrides = new Map([
    [stableId('/:meta:title'), title],
    [stableId('/:meta:description'), 'Published description'],
  ]);
  const edited = processDocument(page('/'), '/', overrides);
  const { html } = finalizeSeo(edited.html, '/', overrides);
  const document = parse(html);
  assert.equal(metaValue(document, 'og:title'), title);
  assert.equal(metaValue(document, 'twitter:title'), title);
  assert.equal(metaValue(document, 'og:description'), 'Published description');
  assert.equal(metaValue(document, 'twitter:description'), 'Published description');
  const schema = JSON.parse(html.match(/<script[^>]*data-etapel-schema[^>]*>(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][0].name, title);
  assert.equal(schema['@graph'][0].description, 'Published description');
  assert.equal((html.match(/<script\b/g) || []).length, 1);
});

test('intentional CMS social descriptions remain independent of the search snippet', () => {
  const overrides = new Map([[stableId('/:meta:og:description'), 'Custom sharing text']]);
  const edited = processDocument(page('/'), '/', overrides);
  const result = parse(finalizeSeo(edited.html, '/', overrides).html);
  assert.equal(metaValue(result, 'description'), 'Original description');
  assert.equal(metaValue(result, 'og:description'), 'Custom sharing text');
  assert.equal(metaValue(result, 'twitter:description'), 'Custom sharing text');
});

test('sitemaps include only built canonical pages and available translations', () => {
  const es = finalizeSeo(page('/capacitacion'), '/capacitacion').entry;
  const en = finalizeSeo(page('/en/training'), '/en/training').entry;
  assert.equal(finalizeSeo(page('/linea-de-producto/equipo-mayor', '/linea-de-producto/enderezado-de-carroceria'), '/linea-de-producto/equipo-mayor').entry, null);
  assert.equal(finalizeSeo(page('/admin').replace('</head>', '<meta name="robots" content="noindex,nofollow"></head>'), '/admin').entry, null);
  assert.equal(finalizeSeo('<title>Studio</title><meta name="robots" content="noindex,nofollow"><h1>Studio</h1>', '/admin').entry, null);
  const both = renderSitemap([es, en, es]);
  assert.equal((both.match(/<url>/g) || []).length, 2);
  assert.equal((both.match(/hreflang="en"/g) || []).length, 2);
  assert.doesNotMatch(renderSitemap([es]), /hreflang="en"/);
  assert.doesNotMatch(both, /vercel\.app|<lastmod>/);
});
