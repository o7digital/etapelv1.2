import test from 'node:test';
import assert from 'node:assert/strict';
import { processDocument } from '../cms/content.mjs';
import { contentHash, collections, validateRecord, safeLink } from '../cms/model.mjs';

test('CMS keys survive surrounding layout changes, preserve inline design, and escape edited HTML', () => {
  const source = '<html lang="es"><head><title>Etapel</title></head><body><section><h1>Tecnología <span>para tu taller.</span></h1><p>Texto original</p><script>const label="Texto original";</script></section></body></html>';
  const original = processDocument(source, '/');
  const field = original.fields.find(row => row.value === 'Texto original');
  assert.ok(field);
  const changed = processDocument(source.replace('<section>', '<div></div><section>'), '/', new Map([[field.id, '<script>alert(1)</script>']]));
  assert.ok(changed.html.includes('<span>para tu taller.</span>'));
  assert.ok(changed.html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(changed.html.includes('const label="Texto original";'));
  assert.equal(changed.fields.find(row=>row.value==='Texto original').id, field.id);
});
test('Spanish and English content are isolated, shared navigation keys remain consistent', () => {
  const html = '<header><a href="/">Inicio</a></header><main><h1>Contenido</h1></main>';
  const home = processDocument(html,'/').fields, about = processDocument(html,'/quienes-somos').fields, en = processDocument(html,'/en').fields;
  assert.equal(home.find(r=>r.value==='Inicio').id,about.find(r=>r.value==='Inicio').id);
  assert.notEqual(home.find(r=>r.value==='Contenido').id,about.find(r=>r.value==='Contenido').id);
  assert.notEqual(home.find(r=>r.value==='Inicio').id,en.find(r=>r.value==='Inicio').id);
});
test('Product filter data and executable scripts cannot be changed by page text edits', () => {
  const html = '<main><div data-product-catalog><p>Product name</p><option>Category</option></div><script>dangerous()</script><h1>Catálogo</h1></main>';
  const result = processDocument(html,'/linea-de-producto');
  assert.deepEqual(result.fields.map(row=>row.value), ['Catálogo']);
});
test('Content fingerprints ignore object property and record ordering but track edits', () => {
  const content = Object.fromEntries(collections.map(c=>[c,[{id:'b',value:'B'},{id:'a',value:'A'}]]));
  const reordered = Object.fromEntries(collections.map(c=>[c,[{value:'A',id:'a'},{value:'B',id:'b'}]]));
  assert.equal(contentHash(content),contentHash(reordered));
  reordered.etapel_texts[0].value='Changed';assert.notEqual(contentHash(content),contentHash(reordered));
});
test('Published product and media validation rejects broken URLs and hidden administrative fields', () => {
  for (const path of ['javascript:alert(1)','//other.example/x','http://other.example/x','/../secret']) assert.equal(safeLink(path),false);
  assert.equal(safeLink('/images/photo.webp'),true);
  assert.throws(()=>validateRecord('etapel_texts',{value:'Test',status:'published',role:'admin'},null));
  assert.throws(()=>validateRecord('etapel_media',{title:'Image',file:'not-an-id',status:'published'},null));
  assert.deepEqual(validateRecord('etapel_texts',{value:'Texto',status:'published',revision:2},{revision:2}),{value:'Texto',status:'published',revision:3});
});
