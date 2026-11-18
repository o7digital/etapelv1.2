import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { extractCopy, localizeDocument } from '../cms/localize.mjs';
import { languageAlternates } from '../src/lib/seo.mjs';
import { sataFinderUrl } from '../src/lib/sataParts.mjs';
import { seoKeywords } from '../src/lib/keywords.mjs';

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

test('SATA assistance links keep the official finder in the selected language, with an English fallback for Brazil', () => {
  const input = '<html lang="en"><body><a data-olivia-sata="true" href="https://www.sata.com/en/service/spare-parts-finder/">SATA</a><a data-sata-finder-link href="https://www.sata.com/en/service/spare-parts-finder/" target="_blank" rel="noopener noreferrer">SATA</a></body></html>';
  for (const locale of ['de','it','fr','pt']) {
    const all=nodes(localizeDocument(input, '/en', locale, { SATA:'SATA', 'Proudly Mexican 🇲🇽':'Etapel', 'Choose language':'Language' }));
    assert(all.filter(node=>node.tagName==='a').every(node=>attr(node,'href')===sataFinderUrl(locale)));
    assert.equal(attr(all.find(node=>attr(node,'data-sata-finder-link')!==undefined),'target'),'_blank');
  }
  assert.equal(sataFinderUrl('pt'),sataFinderUrl('en'));
});

test('generated languages render their own keywords in source metadata and the visible footer without dictionary fallbacks', () => {
  const source = '<html lang="en"><head><meta name="keywords" data-seo-keywords translate="no" content="automotive paint Mexico City"></head><body><footer><div class="footer-keywords" data-seo-keywords translate="no">automotive paint Mexico City</div></footer></body></html>';
  const paint = { de: 'Autolack Mexiko-Stadt', it: 'vernici per auto Città del Messico', fr: 'peinture automobile Mexico', pt: 'pintura automotiva Cidade do México' };
  for (const [locale, expected] of Object.entries(paint)) {
    const missing = new Set();
    const dictionary = { 'Proudly Mexican 🇲🇽': 'Etapel', 'Choose language': 'Language' };
    const all = nodes(localizeDocument(source, '/en', locale, dictionary, { missing }));
    const metadata = attr(all.find(node => node.tagName === 'meta' && attr(node, 'name') === 'keywords'), 'content');
    const footer = all.find(node => node.tagName === 'div' && attr(node, 'data-seo-keywords') !== undefined);
    assert.equal(missing.size, 0, locale);
    assert(metadata.includes(expected), locale);
    assert.deepEqual(metadata.split(', '), footer.childNodes[0].value.split(' · '), locale);
    assert.equal(metadata.split(', ').length, 18, locale);
    assert(!metadata.includes('automotive paint Mexico City'), locale);
    const service = nodes(localizeDocument(source, '/en/after-sales', locale, dictionary));
    const serviceMetadata = attr(service.find(node => attr(node, 'name') === 'keywords'), 'content');
    assert.equal(serviceMetadata.split(', ').length, 6, locale);
    assert.notEqual(serviceMetadata, metadata, locale);
  }
});

test('Spanish and English keywords retain page intent and every supported route has localized terms', () => {
  assert.equal(seoKeywords('/')[0], 'pintura automotriz CDMX');
  assert.equal(seoKeywords('/en')[0], 'automotive paint Mexico City');
  assert.equal(seoKeywords('/capacitacion')[0], 'capacitación automotriz CDMX');
  assert.equal(seoKeywords('/en/training')[0], 'automotive training Mexico City');
  assert.equal(seoKeywords('/fr/formation')[0], 'formation automobile Mexico');
  for (const path of ['/de/produktlinien/pintura', '/it/linee-di-prodotto/prodotti/sata-jet-x', '/pt/contato', '/fr/politique-etapel']) {
    assert(seoKeywords(path).every(value => value.trim().length > 0), path);
    assert(!seoKeywords(path).some(value => value.includes('pintura automotriz CDMX')), path);
  }
  assert.throws(() => seoKeywords('/', 'unknown'), /Unsupported keyword language/);
});
