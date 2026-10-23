import test from 'node:test';
import assert from 'node:assert/strict';
import { languagePath, languageHash } from '../src/lib/languageRoutes.mjs';

test('switches language on the same page and product in both directions', () => {
  for (const [es, en] of [
    ['/', '/en'], ['/contacto', '/en/contact'], ['/capacitacion', '/en/training'],
    ['/postventa', '/en/after-sales'], ['/quienes-somos', '/en/about-us'],
    ['/aviso-de-privacidad', '/en/privacy-policy'], ['/linea-de-producto', '/en/product-lines'],
    ['/linea-de-producto/pintura-y-aplicacion', '/en/product-lines/pintura-y-aplicacion'],
    ['/linea-de-producto/productos/catalogo-pointx-ii', '/en/product-lines/products/catalogo-pointx-ii'],
  ]) {
    assert.equal(languagePath(es), en);
    assert.equal(languagePath(en + '/'), es);
  }
});
test('keeps corresponding catalog, sector and contact anchors', () => {
  for (const [es, en] of [['#sectores', '#sectors'], ['#catalogo-productos', '#product-catalog'], ['#formulario-contacto', '#contact-form']]) {
    assert.equal(languageHash(es, true), en);
    assert.equal(languageHash(en, false), es);
  }
  assert.equal(languageHash('#custom', true), '#custom');
  assert.equal(languagePath('/unknown'), '/unknown');
});
