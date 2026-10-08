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
  assert.deepEqual(JSON.parse(options.body),{message:'Hello',language:'en'});
  return {ok:true,json:async()=>({answer:'Hello from Etapel',conversation:'signed-id',version:'3.5'})};
 };
 try { const res=response();await handler(req({message:' Hello ',language:'en',tenant:'other',routing:'POWERFUL'}),res);assert.equal(res.code,200);assert.equal(res.data.answer,'Hello from Etapel');assert.ok(!JSON.stringify(res.data).includes('test-secret')); }
 finally { globalThis.fetch=original;delete process.env.OLIVIA_GATEWAY_KEY; }
});
