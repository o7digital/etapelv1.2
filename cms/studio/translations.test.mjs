import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { englishScope, spanishScope, targetScope, pageContext, translationHash, approvalWrites, translatePage } from '../translations.mjs';
import { languagePath } from '../../src/lib/languageRoutes.mjs';

const source={id:'es-title',locale:'es',page:'/quienes-somos',value:'Tecnología SATA: 38 años en México.',status:'published',revision:0};
const target={id:'en-title',locale:'en',page:'/en/about-us',value:'Previous English title',status:'published',revision:0};

test('all five translation targets keep page, family, shared scope and approval isolated by language', () => {
 for (const locale of ['en', 'de', 'it', 'fr', 'pt']) {
  for (const page of ['/', '/quienes-somos', '/capacitacion', '/linea-de-producto/pintura']) {
   assert.equal(targetScope(page, locale), languagePath(page, locale));
   assert.equal(spanishScope(targetScope(page, locale)), page);
  }
  assert.equal(targetScope('es:footer', locale), `${locale}:footer`);
  assert.equal(spanishScope(`${locale}:navigation`), 'es:navigation');
  const translated = { ...target, id: `${locale}-title`, locale, page: targetScope(source.page, locale) };
  const other = { ...target, id: 'other', locale: locale === 'fr' ? 'en' : 'fr', page: '/fr/a-propos' };
  const texts = [source, translated, other];
  assert.deepEqual(pageContext(texts, source.page, locale).targets, [translated]);
  const changes = approvalWrites(texts, {page:source.page,locale,values:[{id:translated.id,revision:0,value:'Reviewed translation'}]});
  assert.equal(changes[0].id, translated.id);
  assert.throws(() => approvalWrites(texts, {page:source.page,locale,values:[{id:'other',revision:0,value:'Wrong language'}]}));
 }
 for (const locale of ['es', 'unknown', null]) assert.throws(() => targetScope('/', locale));
 assert.throws(() => targetScope('/fr/a-propos', 'de'));
});

test('Translation scopes follow real language routes and fingerprints follow saved Spanish values',()=>{
 for(const path of ['/','/quienes-somos','/capacitacion','/postventa','/contacto','/aviso-de-privacidad','/politicas-de-etapel','/linea-de-producto','/linea-de-producto/pintura']){
  assert.equal(englishScope(path),languagePath(path));assert.equal(spanishScope(englishScope(path)),path);
 }
 assert.equal(englishScope('es:footer'),'en:footer');assert.throws(()=>englishScope('https://other.example'));
 assert.equal(translationHash([source]),translationHash([{...source,revision:99}]));
 assert.notEqual(translationHash([source]),translationHash([{...source,value:'Otro original'}]));
});
test('English approval checks source freshness, target revisions and page ownership before any writes',()=>{
 const row={...target,translation:{state:'pending',value:'SATA technology: 38 years in Mexico.',source_scope:source.page,source_hash:translationHash([source]),source_ids:[source.id]}};
 const values=[{id:target.id,value:row.translation.value,revision:0}];
 const updates=approvalWrites([source,row],{page:source.page,values});
 assert.equal(row.value,'Previous English title');assert.equal(source.value,'Tecnología SATA: 38 años en México.');
 assert.equal(updates[0].translation.state,'approved');assert.equal(updates[0].revision,1);
 assert.throws(()=>approvalWrites([{...source,value:'Changed after generation'},row],{page:source.page,values}),error=>error.status===409);
 assert.throws(()=>approvalWrites([source,row],{page:source.page,values:[{...values[0],revision:4}]}),error=>error.status===409);
 assert.throws(()=>approvalWrites([source,row],{page:source.page,values:[{...values[0],id:source.id}]}));
 assert.throws(()=>approvalWrites([source,row],{page:source.page,values:[values[0],values[0]]}));
});
test('Translation provider uses structured output, preserves names, figures and links, and rejects altered placeholders',async t=>{
 let altered=false,calls=0;
 const server=http.createServer(async(req,res)=>{
  const parts=[];for await(const part of req)parts.push(part);const input=JSON.parse(Buffer.concat(parts).toString());calls++;
  assert.equal(req.headers.authorization,'Bearer private-provider-key');assert.equal(input.store,false);assert.equal(input.text.format.strict,true);
  const fields=JSON.parse(input.input),text=fields.spanish_sources[0].value;
  const translated=altered ? 'Made up English without protected figures' : text.replace('Tecnología','Technology').replace('años en México','years in Mexico');
  res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({translations:{s0:translated},destinations:{t0:['s0']}})}]}]}));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>{server.closeAllConnections();server.close();});
 const options={key:'private-provider-key',endpoint:`http://127.0.0.1:${server.address().port}`};
 const originals=[{...source,value:source.value+' https://etapel.com ventas@etapel.com.mx'}];
 const translated=await translatePage(originals,[target],options);
 assert.match(translated[0].value,/SATA: 38 years in Mexico/);assert.match(translated[0].value,/https:\/\/etapel.com ventas@etapel.com.mx/);
 assert.deepEqual(translated[0].source_ids,[source.id]);assert(!JSON.stringify(translated).includes('private-provider-key'));
 altered=true;await assert.rejects(translatePage(originals,[target],options),error=>error.status===502);
 await assert.rejects(translatePage(originals,[target],{}),error=>error.status===503);assert.equal(calls,2);
});

test('Large page batches keep every translated field paired with its own Spanish source',async t=>{
 const sources=Array.from({length:35},(_,index)=>({id:'source-'+index,value:`Texto ETAPEL ${index}`,status:'published'}));
 const targets=sources.map((_,index)=>({id:'target-'+index,value:`Previous destination ${index}`,label:'Paragraph',kind:'text'}));
 const server=http.createServer(async(req,res)=>{
  const parts=[];for await(const part of req)parts.push(part);const payload=JSON.parse(Buffer.concat(parts).toString()),input=JSON.parse(payload.input);
  const translations=Object.fromEntries(input.translate_these_sources.map(row=>[row.id,row.value.replace('Texto','Text')]));
  const destinations=Object.fromEntries(input.target_destinations.map(row=>[row.id,['s'+row.id.slice(1)]]));
  res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({translations,destinations})}]}]}));
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>{server.closeAllConnections();server.close();});
 const results=await translatePage(sources,targets,{key:'private-key',endpoint:`http://127.0.0.1:${server.address().port}`});
 assert.equal(results.length,35);
 for(const [index,row]of results.entries())assert.deepEqual(row,{id:'target-'+index,value:`Text ETAPEL ${index}`,source_ids:['source-'+index]});
});

test('the translation provider receives the selected language for every generated locale', async t => {
 const requested = [];
 const server = http.createServer(async (req, res) => {
  const chunks = []; for await (const chunk of req) chunks.push(chunk);
  const payload = JSON.parse(Buffer.concat(chunks).toString()), input = JSON.parse(payload.input);
  requested.push(input.target_language);
  assert(!Object.hasOwn(input, 'english_destinations'));
  const translations = Object.fromEntries(input.translate_these_sources.map(row => [row.id, row.value]));
  const destinations = Object.fromEntries(input.target_destinations.map(row => [row.id, ['s0']]));
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({translations,destinations})}]}]}));
 });
 await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
 t.after(() => { server.closeAllConnections(); server.close(); });
 for (const locale of ['de', 'it', 'fr', 'pt']) await translatePage([source], [{...target,locale}], {locale,key:'private-key',endpoint:`http://127.0.0.1:${server.address().port}`});
 assert.deepEqual(requested, ['de', 'it', 'fr', 'pt-BR']);
 await assert.rejects(translatePage([source], [target], {locale:'unknown',key:'private-key'}), error => error.status === 400);
});
