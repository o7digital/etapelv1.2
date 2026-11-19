import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/olivia.js';
function response() { return { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(data) { this.data=data; return this; } }; }
const req = body => ({ method:'POST', headers: { origin:'https://etapelv1-2.vercel.app', 'content-type':'application/json' }, body });
test('rejects other methods, cross-origin requests, oversized messages and arbitrary conversation types', async()=>{
 for (const [request,code] of [[{method:'GET',headers:{}},405],[{...req({message:'Hi',language:'en'}),headers:{origin:'https://other.example'}},403],[req({message:'x'.repeat(2001),language:'es'}),400],[req({message:'Hi',language:'en',conversation:{tenant:'other'}}),400]]) {
  const res=response(); await handler(request,res); assert.equal(res.code,code);
 }
});
test('forwards only supported fields and keeps credentials server-side', async()=>{
 process.env.OLIVIA_GATEWAY_KEY='test-secret';
 const original=globalThis.fetch;
 globalThis.fetch=async(url,options)=>{
  assert.equal(options.headers.Authorization,'Bearer test-secret');
  assert.deepEqual(JSON.parse(options.body),{message:'Hello',language:'en',routing:'POWERFUL'});
  return {ok:true,json:async()=>({answer:'Hello from Etapel',conversation:'signed-id',version:'3.6.0',routing:'POWERFUL'})};
 };
 try { const res=response();await handler(req({message:' Hello ',language:'en',tenant:'other',routing:'FAST'}),res);assert.equal(res.code,200);assert.equal(res.data.answer,'Hello from Etapel');assert.ok(!JSON.stringify(res.data).includes('test-secret')); }
 finally { globalThis.fetch=original;delete process.env.OLIVIA_GATEWAY_KEY; }
});

test('rejects an older engine or downgraded routing instead of claiming Olivia 3.6', async()=>{
 process.env.OLIVIA_GATEWAY_KEY='test-secret';
 const original=globalThis.fetch;
 try {
  for(const data of [{version:'3.5',routing:'POWERFUL'},{version:'3.6.0',routing:'FAST'}]){
   globalThis.fetch=async()=>({ok:true,json:async()=>({answer:'Hello',conversation:'signed-id',...data})});
   const res=response();await handler(req({message:'Hello',language:'en',version:'3.6.0'}),res);assert.equal(res.code,503);
  }
 }finally{globalThis.fetch=original;delete process.env.OLIVIA_GATEWAY_KEY;}
});

test('recognizes commercial request text for the contact request context', async () => {
 const { requestsInformation } = await import('../src/lib/oliviaLead.js');
 for (const message of ['Quiero información sobre equipos', '¿Me pueden cotizar una cabina?', 'Can I get more details?', 'Je veux des infos, un devis', 'Me interesa la capacitación', 'Quiero saber más', 'Ich möchte ein Angebot', 'Vorrei informazioni e un preventivo', 'Gostaria de informações e um orçamento']) assert.equal(requestsInformation(message), true, message);
 for (const message of ['Hola', 'Thank you', 'No quiero que me contacten', "I don't want information", 'Non voglio informazioni', 'Não quero contato', 'Ich möchte keine Informationen']) assert.equal(requestsInformation(message), false, message);
});

test('accepts all visitor languages from both public production domains', async () => {
 process.env.OLIVIA_GATEWAY_KEY='test-secret';
 const original=globalThis.fetch;
 try {
  for (const origin of ['https://www.etapel.com','https://etapel.com']) for (const language of ['de','it','fr','pt']) {
   globalThis.fetch=async(url,options)=>{assert.equal(JSON.parse(options.body).language,language);return {ok:true,json:async()=>({answer:'Etapel',conversation:'signed-id',version:'3.6.0',routing:'POWERFUL'})};};
   const request=req({message:'Etapel',language});request.headers.origin=origin;
   const res=response();await handler(request,res);assert.equal(res.code,200,origin+' '+language);
  }
 } finally {globalThis.fetch=original;delete process.env.OLIVIA_GATEWAY_KEY;}
});

test('forwards a bounded internal page and SATA intent without accepting arbitrary URLs or visitor context', async () => {
 process.env.OLIVIA_GATEWAY_KEY='test-secret';const original=globalThis.fetch;
 globalThis.fetch=async(url,options)=>{
  const body=JSON.parse(options.body);assert.equal(body.page,'/fr/gammes-de-produits');assert.equal(body.intent,'sata-parts');assert.equal(body.context,undefined);
  return {ok:true,json:async()=>({answer:'Etapel',conversation:'signed-id',version:'3.6.0',routing:'POWERFUL'})};
 };
 try {
  const res=response();await handler(req({message:'SATA',language:'fr',page:'/fr/gammes-de-produits',intent:'sata-parts',context:'untrusted'}),res);assert.equal(res.code,200);
  for(const page of ['https://other.example','//other.example','/../secret','/contacto?email=private@example.com']){const rejected=response();await handler(req({message:'Hi',language:'en',page}),rejected);assert.equal(rejected.code,400);}
 } finally {globalThis.fetch=original;delete process.env.OLIVIA_GATEWAY_KEY;}
});
