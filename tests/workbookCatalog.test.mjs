import test from 'node:test';
import assert from 'node:assert/strict';
import { localCatalogProducts } from '../src/data/products.ts';
import { legacyFamilyRoutes, localProductFamilies } from '../src/data/productLines.ts';
import { catalogLinesForFamily } from '../src/data/catalogHierarchy.ts';
import { validateRecord } from '../cms/model.mjs';
import { workbookAdditionalProducts, workbookProductPatches } from '../src/data/workbookProducts.ts';

test('red workbook references have individual product pages in their intended families', () => {
  const rows = [
    ['03.5657', 'pintura'], ['03.5117', 'pintura'], ['03.5663', 'pintura'], ['03.5658', 'pintura'], ['03.5676C', 'pintura'],
    ['085855', 'cargadores-y-arrancadores-de-baterias'], ['025738', 'cargadores-y-arrancadores-de-baterias'],
    ['076686', 'cargadores-y-arrancadores-de-baterias'], ['079823', 'cargadores-y-arrancadores-de-baterias'],
    ['EEWA712TH3', 'mecanica'], ['EAEEE-C10M', 'mecanica'], ['EAEEE-F10M', 'mecanica'],
    ['EAEEE-62BE-42T', 'mecanica'], ['EAEEE-62CE-42T', 'mecanica'], ['EAE791110998', 'mecanica'], ['EAEMLH10', 'mecanica']
  ];
  for (const [ref, family] of rows) {
    const matches = localCatalogProducts.filter(p => p.specs.some(s => s.value === ref));
    assert.equal(matches.length, 1, `Expected one product for workbook reference ${ref}`);
    assert.equal(matches[0].familySlug, family, ref);
  }
  for (const model of ['8200', '7100', '8100', '3200', '4200']) {
    const product = localCatalogProducts.find(p => p.name === `SUN PDL ${model}`);
    assert.equal(product?.catalogLine, 'Escáner');
    assert.ok(product.specs.length >= 4);
  }
  assert.equal(new Set(localCatalogProducts.map(p => p.slug)).size, localCatalogProducts.length);
});

test('starter navigation leads to products and ADAS uses the workbook brand', () => {
  const starters = catalogLinesForFamily('cargadores-y-arrancadores-de-baterias').find(l => l.name === 'Arrancadores');
  assert.ok(starters && !starters.contactOnly);
  assert.equal(localCatalogProducts.find(p => p.slug === 'catalogo-startium-480e-12-24-v').catalogLine, 'Arrancadores');
  assert.equal(localCatalogProducts.find(p => p.slug === 'catalogo-gys-085855').catalogLine, 'Arrancadores');
  const adas = localCatalogProducts.find(p => p.slug === 'catalogo-ez-adas-recalibration-system');
  assert.equal(adas.brand, 'Car-O-Liner');
  assert.ok(adas.downloads.some(d => typeof d === 'object' && d.url.includes('36537-EZ-ADAS')));
});

test('Drester cleaners have a separate line within Paint & application and keep their technical resources', () => {
  const slugs = ['catalogo-drester-classic-1050', 'catalogo-drester-classic-3600'];
  const family = localProductFamilies.find(family => family.slug === 'pintura-y-aplicacion');
  assert.equal(family?.title, 'Pintura y Aplicación');
  assert.ok(family?.items.includes('Lavadora de pistolas'));
  assert.ok(!localProductFamilies.some(family => family.slug === 'lavadora-de-pistolas'));
  assert.equal(legacyFamilyRoutes['lavadora-de-pistolas'], family.slug);
  assert.doesNotThrow(() => validateRecord('etapel_families', { payload: family, status: 'published' }, null));
  const lines = catalogLinesForFamily(family.slug);
  const line = lines.find(line => line.name === 'Lavadora de pistolas');
  assert.ok(line);
  assert.equal(lines.indexOf(line), lines.findIndex(line => line.name === 'Accesorios pistolas') + 1);
  assert.deepEqual(line.sublines.map(row => row.name), ['Drester Classic 1050', 'Drester Classic 3600']);
  assert.deepEqual(localCatalogProducts.filter(product => product.familySlug === family.slug && product.catalogLine === line.name).map(product => product.slug), slugs);
  for (const slug of slugs) {
    const product = localCatalogProducts.find(p => p.slug === slug);
    assert.ok(product, `${slug}: technical page remains available`);
    assert.ok(product.gallery.length && product.downloads?.length);
    assert.equal(product.catalogVisible, true);
    assert.equal(product.familySlug, family.slug);
    assert.equal(product.catalogSection, family.title);
    assert.equal(product.catalogLine, 'Lavadora de pistolas');
    assert.equal(product.catalogSubline, product.name);
    for (const catalogVisible of [false, true]) {
      const input = { payload: { ...product, catalogVisible }, status: 'published', revision: 2 };
      const saved = validateRecord('etapel_products', input, { payload: product, revision: 2 });
      assert.equal(saved.payload.catalogVisible, catalogVisible);
      assert.equal(saved.status, 'published');
      assert.equal(saved.revision, 3);
    }
    assert.throws(() => validateRecord('etapel_products', { payload: { ...product, catalogVisible: 'false' }, status: 'published' }, null));
  }
  const accessories = localCatalogProducts.filter(p => p.catalogLine === 'Accesorios pistolas');
  assert.equal(accessories.length, 10);
  assert.ok(accessories.every(product => !slugs.includes(product.slug)));
});

test('booth filters include ceiling media without supplier branding and CMS records remain valid', () => {
  const filters = localCatalogProducts.filter(p => p.catalogSubline === 'Filtros para cabina');
  assert.equal(filters.length, 4);
  assert.ok(filters.some(p => /techo/i.test(p.name)));
  for (const p of filters) {
    assert.equal(p.brand, '');
    assert.doesNotMatch(JSON.stringify(p), /speritex/i);
  }
  const changed = new Set([...workbookAdditionalProducts.map(p => p.slug), ...Object.keys(workbookProductPatches)]);
  for (const payload of localCatalogProducts.filter(p => changed.has(p.slug))) {
    assert.doesNotThrow(() => validateRecord('etapel_products', { payload, status: 'published', sort: 0 }, null), payload.slug);
    for (const d of payload.downloads || []) if (typeof d === 'object') assert.doesNotMatch(d.url, /%2520/, payload.slug);
  }
});
