import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { catalogProducts } from '../src/data/products.ts';

const publicRoot = new URL('../public/', import.meta.url);

test('catalog photographs and galleries are local, valid image files with a matching cover', async () => {
  const images = new Set();
  for (const product of catalogProducts) {
    assert.equal(product.gallery[0], product.image, `${product.slug}: gallery cover differs from card`);
    for (const path of [product.image, ...product.gallery]) {
      assert.ok(path.startsWith('/images/'), `${product.slug}: external or invalid image ${path}`);
      images.add(path);
    }
  }
  await Promise.all([...images].map(async path => {
    const bytes = await readFile(new URL(path.slice(1), publicRoot));
    const webp = bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
    const svg = bytes.toString('utf8', 0, 500).includes('<svg');
    assert.ok(webp || png || jpeg || svg, `${path}: expected an image, not an HTML error or placeholder response`);
  }));
});

test('product cards do not reuse unrelated SATA or generic workshop fallback images', () => {
  const genericImages = new Set(['/images/category-soldadoras.webp', '/images/mecanica-aire.webp', '/images/cabinas-preparacion.webp']);
  for (const product of catalogProducts) {
    assert.ok(!genericImages.has(product.image), `${product.slug}: generic workshop fallback`);
    if (product.brand !== 'SATA') {
      assert.ok(!product.image.startsWith('/images/products/sata/'), `${product.slug}: unrelated SATA fallback`);
    }
    assert.notEqual(product.image, '/images/products/sata/catalog/jet-x.webp', `${product.slug}: generic jet X fallback`);
  }
});
