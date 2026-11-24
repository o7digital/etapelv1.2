import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/olivia.js';
import { conversationToken } from '../src/lib/oliviaInbox.js';
function response() { return { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(data) { this.data=data; return this; } }; }
const req = body => ({ method:'POST', headers: { origin:'https://www.etapel.com', 'content-type':'application/json' }, body });
async function fixture(run) {
 const saved={fetch:globalThis.fetch,gateway:process.env.OLIVIA_GATEWAY_KEY,inbox:process.env.ETAPEL_INBOX_KEY};
 process.env.OLIVIA_GATEWAY_KEY='test-secret';process.env.ETAPEL_INBOX_KEY='test-inbox-key'.repeat(4);
 const messages=[];const state={status:'ai',engineCalls:0,failEngine:false,takeover:false,calls:[]};
 globalThis.fetch=async(url,options)=>{
  state.calls.push({url,options});
  if(url.startsWith('https://olivia-ai.o7digital.com/api/internal/etapel')){
   assert.equal(options.headers.Authorization,'Bearer '+process.env.ETAPEL_INBOX_KEY);
   if(options.method==='POST'){
    const input=JSON.parse(options.body);assert.equal(input.clientCode,undefined);
    for(const m of input.messages)if(!messages.some(x=>x.metadata.etapelExternalId===m.externalId) && !(m.role==='ai'&&state.status==='manual'))messages.push({id:String(messages.length),role:m.role,content:m.content,metadata:{etapelExternalId:m.externalId}});
   }
   return {ok:true,json:async()=>({conversation:{status:state.status,id:'private-db-id'},messages})};
  }
  assert.equal(url,'https://olivia.o7digitalgroup.com/etapel/chat');assert.equal(options.headers.Authorization,'Bearer test-secret');
  state.engineCalls++;const payload=JSON.parse(options.body);assert.equal(payload.routing,'POWERFUL');assert.equal(payload.tenant,undefined);assert.equal(payload.contact,undefined);
  if(state.takeover)state.status='manual';
  return {ok:!state.failEngine,status:503,json:async()=>({answer:'Equipo Etapel',conversation:payload.conversation,version:state.version||'3.6.0',routing:state.routing||'POWERFUL'})};
 };
 try { await run(state,messages); }
 finally {globalThis.fetch=saved.fetch;for(const [name,value]of [['OLIVIA_GATEWAY_KEY',saved.gateway],['ETAPEL_INBOX_KEY',saved.inbox]]){if(value===undefined)delete process.env[name];else process.env[name]=value;}}
}
async function call(body){const res=response();await handler(req(body),res);return res;}

test('rejects cross-origin requests, invalid inputs and forged conversation tokens',()=>fixture(async()=>{
 for(const [request,code]of [[{method:'DELETE',headers:{}},405],[{...req({}),headers:{origin:'https://other.example'}},403],[req({message:'x'.repeat(2001),language:'es'}),400],[req({message:'hola',language:'es',conversation:{tenant:'other'}}),403],[req({message:'hola',language:'es',conversation:'a'.repeat(24)+'.'+'x'.repeat(43)}),403],[{method:'GET',headers:{},query:{conversation:'forged'}},403]]){const res=response();await handler(request,res);assert.equal(res.code,code);}
 for(const page of ['https://other.example','//other.example','/../secret','/contacto?email=private@example.com'])assert.equal((await call({message:'Hi',language:'en',page})).code,400);
}));
test('greets immediately without the engine and records both messages in the inbox',()=>fixture(async(state,messages)=>{
 const res=await call({message:'¡Hola, Olivia!',language:'es',tenant:'other',routing:'FAST'});
 assert.equal(res.code,200);assert.equal(res.data.answer,'¡Hola! ¿En qué te puedo ayudar?');assert.deepEqual(res.data.sources,[]);assert.equal(state.engineCalls,0);assert.equal(messages.length,2);assert.equal(messages[0].role,'visitor');assert.equal(messages[1].role,'ai');assert.equal(conversationToken(res.data.conversation,'test-secret'),res.data.conversation);assert.ok(!JSON.stringify(res.data).includes('test-secret'));assert.equal(res.data.version,undefined);
}));
test('uses the verified engine for actual questions and reuses completed retry IDs',()=>fixture(async(state,messages)=>{
 const body={message:'Quiero información de SATA',language:'es',page:'/',intent:'sata-parts',requestId:'request-id-123'};const first=await call(body);assert.equal(first.code,200);
 const second=await call({...body,conversation:first.data.conversation});assert.equal(second.code,200);assert.equal(state.engineCalls,1);assert.equal(messages.length,2);assert.equal(second.data.answer,first.data.answer);
}));
test('keeps failed visitor messages visible and rejects an older engine or downgraded routing',()=>fixture(async(state,messages)=>{
 state.failEngine=true;const res=await call({message:'SATA jet X',language:'es'});assert.equal(res.code,503);assert.equal(messages.length,1);assert.equal(messages[0].role,'visitor');assert.equal(typeof res.data.conversation,'string');
 state.failEngine=false;for(const [version,routing]of [['3.5','POWERFUL'],['3.6.0','FAST']]){state.version=version;state.routing=routing;assert.equal((await call({message:'SATA',language:'es'})).code,503);}
}));
test('manual takeover stops the engine and suppresses a reply generated during takeover',()=>fixture(async(state,messages)=>{
 state.status='manual';let res=await call({message:'Necesito ayuda',language:'es'});assert.equal(res.code,200);assert.equal(res.data.answer,'');assert.equal(state.engineCalls,0);assert.equal(messages.length,1);
 state.status='ai';state.takeover=true;res=await call({message:'Otra pregunta',language:'es'});assert.equal(res.data.status,'manual');assert.equal(res.data.answer,'');assert.equal(messages.filter(m=>m.role==='ai').length,0);
}));
test('visitor polling exposes only operator text for a valid signed conversation',()=>fixture(async(state,messages)=>{
 messages.push({id:'operator-id',role:'operator',content:'Hola, soy Ana',metadata:{operatorId:'private-user'}},{id:'system-id',role:'system',content:'private system log',metadata:{}});
 const res=response();await handler({method:'GET',headers:{},query:{conversation:conversationToken(null,'test-secret')}},res);assert.equal(res.code,200);assert.deepEqual(res.data.messages,[{id:'operator-id',content:'Hola, soy Ana',createdAt:undefined}]);assert.ok(!JSON.stringify(res.data).includes('private'));
}));
test('contact intake requires explicit consent and never sends contact values to the engine',()=>fixture(async(state)=>{
 const contact={name:'Prueba Etapel',email:'test@example.test',phone:'5555555555',need:'SATA jet X',method:'Email',consent:true};assert.equal((await call({action:'contact',language:'es',contact:{...contact,consent:false}})).code,400);const res=await call({action:'contact',language:'es',contact,requestId:'contact-id-123'});assert.equal(res.code,200);assert.equal(res.data.saved,true);assert.equal(state.engineCalls,0);
}));
test('accepts all visitor languages and a bounded page without trusting visitor context',()=>fixture(async(state)=>{
 for(const language of ['es','en','de','it','fr','pt']){const r=await call({message:'SATA',language,page:'/fr/gammes-de-produits',intent:'sata-parts',context:'untrusted'});assert.equal(r.code,200);const payload=JSON.parse(state.calls.filter(c=>c.url.endsWith('/etapel/chat')).at(-1).options.body);assert.equal(payload.language,language);assert.equal(payload.page,'/fr/gammes-de-produits');assert.equal(payload.context,undefined);}
}));

test('recognizes commercial request text for the contact request context', async () => {
 const { requestsInformation } = await import('../src/lib/oliviaLead.js');
 for (const message of ['Quiero información sobre equipos', '¿Me pueden cotizar una cabina?', 'Can I get more details?', 'Je veux des infos, un devis', 'Me interesa la capacitación', 'Quiero saber más', 'Ich möchte ein Angebot', 'Vorrei informazioni e un preventivo', 'Gostaria de informações e um orçamento']) assert.equal(requestsInformation(message), true, message);
 for (const message of ['Hola', 'Thank you', 'No quiero que me contacten', "I don't want information", 'Non voglio informazioni', 'Não quero contato', 'Ich möchte keine Informationen']) assert.equal(requestsInformation(message), false, message);
});

test('simple greetings remain short while real product questions continue to Olivia',async()=>{
 const {greetingReply}=await import('../src/lib/oliviaGreeting.js');
 assert.equal(greetingReply('¡Hola, Olivia!'),'¡Hola! ¿En qué te puedo ayudar?');
 for(const text of ['hola','Hola!','buenos días'])assert.equal(greetingReply(text),'¡Hola! ¿En qué te puedo ayudar?');
 for(const text of ['Hola, quiero una cabina','SATA jet X','Quiero una cotización'])assert.equal(greetingReply(text),null);
});
