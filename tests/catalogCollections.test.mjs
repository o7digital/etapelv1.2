import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { localCatalogProducts } from '../src/data/products.ts';
import { catalogRootProducts, catalogModels } from '../src/lib/catalogCollections.mjs';
import { usiBoothParentSlug } from '../src/data/usiBoothProducts.ts';
import { validateRecord, validateProductGrouping } from '../cms/model.mjs';

test('spray booths show the two brand cards and the six USI models only inside their collection', () => {
  const roots = catalogRootProducts(localCatalogProducts);
  assert.deepEqual(roots.filter(p => p.catalogLine === 'Cabinas de pintura').map(p => p.slug), [
    usiBoothParentSlug, 'catalogo-cabinas-de-pintura-millibar',
  ]);
  const previous = localCatalogProducts.find(p => p.slug === 'cabinas-zonas-preparacion');
  assert.equal(previous.catalogVisible, false);
  assert.ok(previous.gallery.length, 'The previous technical page and its images remain available');
  const models = catalogModels(localCatalogProducts, usiBoothParentSlug);
  assert.deepEqual(models.map(p => p.slug), ['usi-ohmni', 'usi-master', 'usi-energo', 'usi-he', 'usi-open-booth', 'usi-chronotech']);
  assert.equal(new Set(models.map(p => p.image)).size, 6);
  const rows = localCatalogProducts.map(payload => ({ payload, status: 'published' }));
  for (const model of models) {
    assert(!roots.includes(model));
    assert(existsSync('public' + model.image));
    assert.equal(model.familySlug, 'pintura-y-aplicacion');
    assert.equal(model.catalogLine, 'Cabinas de pintura');
    assert(model.summaryEn && model.descriptionEn);
    assert.doesNotThrow(() => validateRecord('etapel_products', { payload: model, status: 'published' }, null));
    assert.doesNotThrow(() => validateProductGrouping(model, 'published', rows));
    assert(model.downloads.some(d => typeof d === 'object' && d.url === model.sourceUrl));
  }
  assert.equal(catalogModels(models.map(p => ({ ...p, catalogVisible: false })), usiBoothParentSlug).length, 0);
});

test('Studio prevents missing parents, nested collections and changes that would orphan published models', () => {
  const parent = localCatalogProducts.find(p => p.slug === usiBoothParentSlug);
  const model = catalogModels(localCatalogProducts, parent.slug)[0];
  const rows = [parent, model].map(payload => ({ payload, status: 'published' }));
  assert.throws(() => validateRecord('etapel_products', { payload: { ...model, catalogParentSlug: model.slug }, status: 'published' }, null));
  for (const catalogParentSlug of ['missing-parent', '../unsafe', model.slug]) {
    assert.throws(() => validateProductGrouping({ ...model, catalogParentSlug }, 'published', rows));
  }
  assert.throws(() => validateProductGrouping({ ...model, familySlug: 'mecanica' }, 'published', rows));
  assert.throws(() => validateProductGrouping({ ...model, catalogLine: 'Accesorios pistolas' }, 'published', rows));
  assert.throws(() => validateProductGrouping(model, 'published', [{ ...rows[0], status: 'archived' }, rows[1]]));
  for (const status of ['draft', 'archived']) assert.throws(() => validateProductGrouping(parent, status, rows));
  assert.throws(() => validateProductGrouping({ ...parent, catalogVisible: false }, 'published', rows));
  assert.throws(() => validateProductGrouping({ ...parent, familySlug: 'mecanica' }, 'published', rows));
  assert.doesNotThrow(() => validateProductGrouping(model, 'archived', rows));
  assert.doesNotThrow(() => validateProductGrouping(parent, 'archived', [rows[0], { ...rows[1], status: 'archived' }]));
});
