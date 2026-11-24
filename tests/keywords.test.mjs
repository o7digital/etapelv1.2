import test from 'node:test';
import assert from 'node:assert/strict';
import { localCatalogProducts } from '../src/data/products.ts';
import { seoKeywords, isLegacySeoKeywords } from '../src/lib/keywords.mjs';
import { processDocument, stableId } from '../cms/content.mjs';
import { localizeDocument } from '../cms/localize.mjs';
import { finalizeSeo } from '../cms/seo.mjs';

const productKeywords = slug => {
  const product = localCatalogProducts.find(item => item.slug === slug);
  assert(product, slug);
  return seoKeywords(`/linea-de-producto/productos/${slug}`, 'es', product);
};

test('painting search phrases stay available while general workshop intent is removed', () => {
  for (const route of ['/', '/linea-de-producto', '/linea-de-producto/pintura-y-aplicacion']) {
    const keywords = seoKeywords(route);
    for (const phrase of ['pintura automotriz CDMX', 'cabina de pintura CDMX', 'pistola de pintura CDMX']) assert(keywords.includes(phrase), `${route}: ${phrase}`);
    assert(keywords.includes('pintura automotriz México'), route);
    assert.doesNotMatch(keywords.join(', '), /taller automotriz|talleres de tractos|soluciones automotrices|eficiencia operativa/);
  }
  assert(seoKeywords('/linea-de-producto/pintura').includes('pintura industrial México'));
  assert(seoKeywords('/linea-de-producto/enderezado-de-carroceria').includes('equipos para talleres de tractocamiones CDMX'));
  assert(!seoKeywords('/').some(value => value.includes('tractocamiones')));
});

test('actual catalog products target their own equipment and brand instead of a shared generic list', () => {
  const rows = [
    ['sata-jet-x', 'pistolas de pintura SATA México', /cabinas|soldadoras|lijadoras/],
    ['catalogo-cabinas-de-pintura-usi-italia', 'cabinas de pintura USI Italia México', /pistolas|soldadoras/],
    ['catalogo-cabinas-de-pintura-millibar', 'cabinas de pintura México', /USI Italia|SATA/],
    ['catalogo-papel-de-enmascarar-premium', 'papel para enmascarar México', /plástico para enmascarar|pistolas/],
    ['catalogo-plastico-de-enmascarar-premium', 'plástico para enmascarar México', /papel para enmascarar|pistolas/],
    ['catalogo-smartmig-162-regulator-not-included', 'soldadoras MIG México', /cortadoras plasma|soldadoras de punto/],
    ['catalogo-easycut-30-fv-with-torch', 'cortadoras plasma México', /soldadoras MIG|soldadoras GYS/],
    ['catalogo-gyspot-27-02', 'spotter para hojalatería México', /soldadoras MIG|cortadoras plasma/],
    ['catalogo-gysflash-101-12-cnt-fv-5m-cables', 'cargadores de baterías México', /soldadoras|pistolas|Prevost/],
    ['catalogo-redes-aire-comprimido', 'instalaciones de aire comprimido México', /cargadores|pistolas/],
  ];
  for (const [slug, expected, excluded] of rows) {
    const keywords = productKeywords(slug);
    assert(keywords.includes(expected), slug);
    assert.doesNotMatch(keywords.join(', '), excluded, slug);
    assert.equal(new Set(keywords).size, keywords.length, slug);
  }
  for (const product of localCatalogProducts.filter(item => item.catalogSubline === 'Filtros para cabina')) {
    assert(productKeywords(product.slug).includes('filtros de cabina de pintura México'), product.slug);
    assert.doesNotMatch(productKeywords(product.slug).join(', '), /pistolas|soldadoras|filtros de aire comprimido/);
  }
});

test('generated product languages retain model and product intent in metadata and footer', () => {
  const product = localCatalogProducts.find(item => item.slug === 'sata-jet-x');
  const data = JSON.stringify({ name: product.name, brand: product.brand, familySlug: product.familySlug, catalogLine: product.catalogLine, catalogSubline: product.catalogSubline }).replaceAll('"', '&quot;');
  const html = `<html><head><meta name="keywords" data-seo-keywords data-seo-product="${data}" translate="no" content="Old"></head><body><footer><div data-seo-keywords data-seo-product="${data}" translate="no">Old</div></footer></body></html>`;
  for (const [locale, phrase] of [['fr', 'pistolets de peinture SATA Mexique'], ['de', 'SATA Lackierpistolen Mexiko'], ['it', 'pistole per verniciatura SATA Messico'], ['pt', 'pistolas de pintura SATA México']]) {
    const result = localizeDocument(html, '/en/product-lines/products/sata-jet-x', locale, {});
    assert(result.includes(phrase), locale);
    assert(result.includes('SATA jet X'), locale);
    assert(!result.includes('Old'), locale);
    assert(!result.includes('pintura automotriz CDMX'), locale);
  }
});

test('old seeded CMS keywords cannot restore generic lists and editorial replacements still work', () => {
  const old = ['pintura automotriz', 'taller automotriz', 'equipo para taller', 'cabina de pintura', 'pistola de pintura', 'consumibles de pintura', 'soldadura automotriz', 'aire comprimido', 'capacitación automotriz', 'postventa automotriz', 'mantenimiento de equipos', 'soporte técnico', 'tecnología para taller', 'soluciones para carrocería', 'servicio técnico especializado', 'centro de capacitación', 'soluciones certificadas', 'cotización de equipos automotrices'].map(value => `${value} CDMX`).join(', ');
  assert(isLegacySeoKeywords(old, '/'));
  const current = seoKeywords('/').join(', ');
  const html = `<head><meta name="keywords" data-seo-keywords translate="no" content="${current}"></head><body><footer><div data-seo-keywords translate="no">${current}</div></footer></body>`;
  const id = stableId('/:meta:keywords');
  const retired = finalizeSeo(processDocument(html, '/', new Map([[id, old]])).html, '/').html;
  assert(!retired.includes('taller automotriz CDMX'));
  assert(retired.includes('pistolas de pintura SATA CDMX'));
  const editorial = finalizeSeo(processDocument(html, '/', new Map([[id, 'Pintura PPG CDMX, Pintura PPG México']])).html, '/').html;
  assert(editorial.includes('Pintura PPG CDMX · Pintura PPG México'));
});

test('only retired general-page SEO defaults are replaced; custom and painting-page titles survive', () => {
  const oldTitle = 'Etapel | Tecnología para automotriz, industria y transporte';
  const oldDescription = 'Etapel ofrece soluciones integrales para talleres automotrices, centros de colisión, industria y transporte pesado: equipamiento, capacitación y servicio técnico.';
  const html = '<title>Pintura en CDMX | Etapel</title><meta name="description" content="Equipos de pintura"><h1>Pintura y equipos</h1>';
  const defaults = new Map([[stableId('/:meta:title'), oldTitle], [stableId('/:meta:description'), oldDescription]]);
  const migrated = processDocument(html, '/', defaults).html;
  assert(migrated.includes('<title>Pintura en CDMX | Etapel</title>'));
  assert(!migrated.includes(oldDescription));
  const editorial = processDocument(html, '/', new Map([[stableId('/:meta:title'), 'Título aprobado por Etapel']])).html;
  assert(editorial.includes('<title>Título aprobado por Etapel</title>'));
  const route = '/linea-de-producto/pintura';
  const preserved = processDocument(html, route, new Map([[stableId(`${route}:meta:title`), 'Pintura automotriz PPG CDMX | Etapel']])).html;
  assert(preserved.includes('<title>Pintura automotriz PPG CDMX | Etapel</title>'));
});
