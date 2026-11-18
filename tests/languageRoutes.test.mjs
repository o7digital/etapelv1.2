import test from 'node:test';
import assert from 'node:assert/strict';
import { languagePath, languageHash, locales, pathLocale, hasLanguageRoute } from '../src/lib/languageRoutes.mjs';

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
test('all six languages keep the same page, product and family through every switch', () => {
  const groups = [
    ['/', '/en', '/de', '/it', '/fr', '/pt'],
    ['/contacto', '/en/contact', '/de/kontakt', '/it/contatti', '/fr/contact', '/pt/contato'],
    ['/linea-de-producto/productos/sata-jet-x', '/en/product-lines/products/sata-jet-x', '/de/produktlinien/produkte/sata-jet-x', '/it/linee-di-prodotto/prodotti/sata-jet-x', '/fr/gammes-de-produits/produits/sata-jet-x', '/pt/linhas-de-produtos/produtos/sata-jet-x'],
    ['/linea-de-producto/pintura', '/en/product-lines/pintura', '/de/produktlinien/pintura', '/it/linee-di-prodotto/pintura', '/fr/gammes-de-produits/pintura', '/pt/linhas-de-produtos/pintura'],
  ];
  for (const paths of groups) for (const [sourceIndex, source] of paths.entries()) {
    assert.equal(pathLocale(source), locales[sourceIndex].code);
    for (const [index, locale] of locales.entries()) assert.equal(languagePath(source + '/', locale.code), paths[index]);
  }
  for (const path of ['/admin', '/api/olivia', '/en/missing', '/english']) assert.equal(hasLanguageRoute(path), false);
  assert.equal(languageHash('#formulario-contacto', 'pt'), '#contact-form');
  assert.equal(languageHash('#product-catalog', 'es'), '#catalogo-productos');
});
test('keeps corresponding catalog, sector and contact anchors', () => {
  for (const [es, en] of [['#sectores', '#sectors'], ['#catalogo-productos', '#product-catalog'], ['#formulario-contacto', '#contact-form']]) {
    assert.equal(languageHash(es, true), en);
    assert.equal(languageHash(en, false), es);
  }
  assert.equal(languageHash('#custom', true), '#custom');
  assert.equal(languagePath('/unknown'), '/unknown');
});
