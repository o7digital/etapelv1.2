import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { extractCopy, localizeDocument } from '../cms/localize.mjs';
import { languageAlternates } from '../src/lib/seo.mjs';

const nodes = html => { const result = []; const visit = node => { result.push(node); for (const child of node.childNodes || []) visit(child); }; visit(parse(html)); return result; };
const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const fixture = `<html lang="en"><head><title>Products</title><meta name="description" content="Our products"><meta property="og:locale" content="en_US"><meta property="og:locale:alternate" content="fr_FR"><link rel="canonical" href="https://www.etapel.com/en/product-lines">${languageAlternates('/en/product-lines').map(item => `<link rel="alternate" hreflang="${item.lang}" href="${item.href}">`).join('')}<script type="application/ld+json" data-etapel-schema>{"@graph":[{"@type":"WebPage","name":"Products","url":"https://www.etapel.com/en/product-lines","inLanguage":"en"},{"@type":"Product","name":"Spray gun","description":"Our products"}]}</script><script>const text="Do not translate code";</script></head><body><details data-language-picker translate="no"><summary aria-label="Choose language"><span data-language-summary>EN</span></summary><a data-language-option="en" href="/en/product-lines" lang="en" aria-current="page">English</a><a data-language-option="fr" href="/fr/gammes-de-produits" lang="fr">Français</a></details><h1>Products</h1><article data-catalog-card data-search="pistola"><a href="/en/product-lines/products/sata-jet-x"><img src="/images/product.webp" alt="Spray gun"><h2>Spray gun</h2></a></article><a href="https://other.example/en/contact">External</a><a href="/en/contact?tipo=SATA#contact-form">Contact</a><select><option value="Pintura">Paint</option></select><input name="idioma" value="en"><div data-lang="en" data-error="Try again"><label for="email">Email</label><input id="email" name="email" type="email" placeholder="Your email"></div><style>p:after{content:"CSS"}</style></body></html>`;

test('translation extraction covers rendered copy, metadata, accessibility and runtime feedback, excluding code and language names', () => {
  const copy = extractCopy(fixture);
  for (const value of ['Products', 'Our products', 'Spray gun', 'Paint', 'Your email', 'Try again', 'Choose language']) assert(copy.includes(value), value);
  assert(!copy.includes('English')); assert(!copy.includes('Français'));
  assert(!copy.some(value => value.includes('Do not translate code') || value.includes('content:"CSS"')));
});

test('localized pages preserve functional values and assets while updating text, links, SEO, search and chat language', () => {
  const translations = Object.fromEntries(extractCopy(fixture).map(value => [value, `FR ${value}`]));
  translations['Spray gun'] = 'Pistolet de peinture';
  const missing = new Set();
  const html = localizeDocument(fixture, '/en/product-lines', 'fr', { translations }, { missing });
  const all = nodes(html);
  assert.equal(missing.size, 0);
  assert.equal(attr(all.find(node => node.tagName === 'html'), 'lang'), 'fr');
  assert.equal(attr(all.find(node => attr(node, 'rel') === 'canonical'), 'href'), 'https://www.etapel.com/fr/gammes-de-produits');
  assert.equal(attr(all.find(node => attr(node, 'hreflang') === 'en' && node.tagName === 'link'), 'href'), 'https://www.etapel.com/en/product-lines');
  assert(all.some(node => attr(node, 'href') === '/fr/contact?tipo=SATA#contact-form'));
  assert(all.some(node => attr(node, 'href') === '/fr/gammes-de-produits/produits/sata-jet-x'));
  assert(all.some(node => attr(node, 'href') === 'https://other.example/en/contact'));
  assert(all.some(node => attr(node, 'src') === '/images/product.webp' && attr(node, 'alt') === 'Pistolet de peinture'));
  assert.equal(attr(all.find(node => node.tagName === 'option'), 'value'), 'Pintura');
  assert.equal(attr(all.find(node => attr(node, 'name') === 'idioma'), 'value'), 'fr');
  assert(all.some(node => attr(node, 'data-lang') === 'fr' && attr(node, 'data-error') === 'FR Try again'));
  assert.match(attr(all.find(node => attr(node, 'data-catalog-card') !== undefined), 'data-search'), /pistola.*pistolet de peinture/);
  assert.equal(attr(all.find(node => attr(node, 'data-language-option') === 'fr'), 'aria-current'), 'page');
  assert.equal(attr(all.find(node => attr(node, 'data-language-option') === 'en'), 'aria-current'), undefined);
  assert(!all.some(node => attr(node, 'property') === 'og:locale:alternate' && attr(node, 'content') === 'fr_FR'));
  assert.match(html, /"inLanguage":"fr"/);
  assert.match(html, /Do not translate code/);
});

test('missing translations are reported and translated text remains escaped HTML', () => {
  const missing = new Set();
  const html = localizeDocument(fixture, '/en/product-lines', 'fr', { Products: '<script>unsafe</script>' }, { missing });
  assert(missing.has('Spray gun'));
  assert.match(html, /&lt;script&gt;unsafe&lt;\/script&gt;/);
  assert.equal(nodes(html).filter(node => node.tagName === 'script').length, 2);
});
