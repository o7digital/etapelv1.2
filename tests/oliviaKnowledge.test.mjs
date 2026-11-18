import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { knowledgeDocument } from '../cms/knowledge.mjs';
import { createSearchIndex, searchKnowledge, createKnowledgeLoader } from '../infrastructure/olivia/site-knowledge.mjs';

const payload = documents => ({ version: 1, origin: 'https://www.etapel.com', hash: createHash('sha256').update(JSON.stringify(documents)).digest('hex'), documents });
const documents = [
  { path: '/', key: '/', locale: 'es', title: 'Etapel', text: 'Equipos, capacitación y servicio técnico.' },
  { path: '/linea-de-producto/productos/sunmatch-4', key: '/linea-de-producto/productos/sunmatch-4', locale: 'es', title: 'SCANGRIP SUNMATCH 4', text: 'Referencia 03.5657. Flujo luminoso 50–500 lm. Temperatura 2500–6500 K. Protección IP65/IK07.' },
  { path: '/fr/gammes-de-produits/produits/sunmatch-4', key: '/linea-de-producto/productos/sunmatch-4', locale: 'fr', title: 'SCANGRIP SUNMATCH 4', text: 'Lampe professionnelle pour le contrôle des couleurs.' },
  { path: '/linea-de-producto/productos/matchpen', key: '/linea-de-producto/productos/matchpen', locale: 'es', title: 'SCANGRIP MATCHPEN', text: 'Lámpara para inspección.' },
  { path: '/aviso-de-privacidad', key: '/aviso-de-privacidad', locale: 'es', title: 'Aviso de Privacidad', text: 'Para facturación se solicita razón social, RFC y domicilio fiscal. Solicita rectificación a ventas@etapel.com.mx.' },
];

test('knowledge extraction includes complete technical facts, public form guidance and links without input values, chat or repeated grids', () => {
  const html = '<html lang="es"><head><title>SCANGRIP</title><link rel="canonical" href="https://www.etapel.com/producto"></head><body><header>Global navigation</header><main><h1>SUNMATCH 4</h1><dl><dt>Temperatura</dt><dd>2500–6500 K</dd></dl><div hidden data-highlight-slides><span>IP65/IK07</span></div><a href="/contacto">Solicita información</a><form><input value="private@example.com">Contact fields</form><div data-product-catalog>Other products</div><aside class="olivia-chat">Chat transcript</aside></main></body></html>';
  const document = knowledgeDocument(html, '/producto');
  assert.match(document.text, /2500–6500 K/); assert.match(document.text, /IP65\/IK07/);
  assert.match(document.text, /Contact fields/);
  assert.doesNotMatch(document.text, /Global navigation|private@example.com|Other products|Chat transcript/);
  assert.deepEqual(document.links, [{ title: 'Solicita información', url: 'https://www.etapel.com/contacto' }]);
  assert.equal(knowledgeDocument(html, '/different'), null);
  assert.equal(knowledgeDocument(html.replace('</head>', '<meta name="robots" content="noindex"></head>'), '/producto'), null);
});

test('retrieval distinguishes similar models and supplies the complete Spanish specifications for another language', () => {
  const index = createSearchIndex(payload(documents));
  const answer = searchKnowledge(index, 'Quelles sont les caractéristiques de la SCANGRIP SUNMATCH 4 ?', { language: 'fr', page: '/fr/gammes-de-produits/produits/sunmatch-4' });
  assert.equal(answer.keys[0], '/linea-de-producto/productos/sunmatch-4');
  assert.equal(answer.sources[0].url, 'https://www.etapel.com/fr/gammes-de-produits/produits/sunmatch-4');
  assert.match(answer.context, /03\.5657/); assert.match(answer.context, /2500–6500 K/);
  assert.equal(answer.pages, documents.length);
});

test('legal information and conversation context remain searchable beyond the opening pages', () => {
  const index = createSearchIndex(payload(documents));
  assert.equal(searchKnowledge(index, 'RFC facturación rectificación', { language: 'en' }).keys[0], '/aviso-de-privacidad');
  assert.equal(searchKnowledge(index, 'And its protection?', { language: 'en', previousKeys: ['/linea-de-producto/productos/sunmatch-4'] }).keys[0], '/linea-de-producto/productos/sunmatch-4');
  assert.throws(() => createSearchIndex({ ...payload(documents), hash: '0'.repeat(64) }), /hash mismatch/);
  assert.throws(() => createSearchIndex(payload([{ path: '/admin', locale: 'es', title: 'Private', text: 'Hidden' }])), /Invalid public knowledge/);
});

test('the knowledge loader coalesces requests, refreshes published content and keeps the last validated index on a transient outage', async () => {
  let time = 0, calls = 0, outage = false;
  const data = payload(documents);
  const load = createKnowledgeLoader({ ttl: 100, now: () => time, fetcher: async url => {
    calls++; assert.equal(url, 'https://www.etapel.com/.well-known/etapel-knowledge.json');
    if (outage) throw new Error('Temporary outage');
    return { ok: true, headers: new Headers(), text: async () => JSON.stringify(data) };
  } });
  const [first, second] = await Promise.all([load(), load()]);
  assert.equal(calls, 1); assert.equal(first, second);
  time = 101; await load(); assert.equal(calls, 2);
  time = 202; outage = true; assert.equal((await load()).hash, data.hash); assert.equal(calls, 3);
  await load(); assert.equal(calls, 3);
  const empty = createKnowledgeLoader({ fetcher: async () => { throw new Error('Unavailable'); } });
  await assert.rejects(empty(), /Unavailable/);
});
