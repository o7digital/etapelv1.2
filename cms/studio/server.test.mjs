import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createStudioServer } from './server.mjs';

test('Studio keeps tokens private, enforces sessions, origins, field allowlists, revisions and logout', async t => {
  let record={id:'test-text',revision:0,value:'Original',status:'published'}, active=true;
  const upstream=http.createServer(async(req,res)=>{
    const chunks=[];for await(const part of req)chunks.push(part);const body=chunks.length?JSON.parse(Buffer.concat(chunks).toString()):null;
    const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify({data}));};
    if(req.url==='/auth/login')return send(body.password==='correct'?200:401,{access_token:'private-access',refresh_token:'private-refresh',expires:900000});
    if(req.url==='/auth/logout'){active=false;return send(200,null);}
    if(req.headers.authorization!=='Bearer private-access'||!active)return send(401,null);
    if(req.url.startsWith('/users/me'))return send(200,{id:'owner',email:'owner@example.com',first_name:'Owner'});
    if(req.url==='/items/etapel_texts/test-text'){if(req.method==='PATCH')record={...record,...body};return send(200,record);}
    return send(404,null);
  });
  await new Promise(resolve=>upstream.listen(0,'127.0.0.1',resolve));
  const cms=`http://127.0.0.1:${upstream.address().port}`;
  const server=createStudioServer({cms,secret:'a'.repeat(64),origin:'http://studio.test',secure:false});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>{server.closeAllConnections();server.close();upstream.closeAllConnections();upstream.close();});
  const root=`http://127.0.0.1:${server.address().port}`;
  const write=(path,body,cookie,origin='http://studio.test',method='POST')=>fetch(root+path,{method,headers:{origin,'content-type':'application/json',...(cookie?{cookie}:{})},body:JSON.stringify(body)});
  assert.equal((await fetch(root+'/api/content')).status,401);
  assert.equal((await write('/api/login',{email:'owner@example.com',password:'correct'},null,'https://other.example')).status,403);
  const login=await write('/api/login',{email:'owner@example.com',password:'correct'});
  assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];
  assert.match(login.headers.get('set-cookie'),/HttpOnly/);assert.match(login.headers.get('set-cookie'),/SameSite=Strict/);
  assert.ok(!JSON.stringify(await login.json()).includes('private-access'));
  const identity=await fetch(root+'/api/session',{headers:{cookie}});assert.equal(identity.status,200);assert.ok(!JSON.stringify(await identity.json()).includes('private-'));
  assert.equal((await write('/api/records/directus_users/x',{role:'admin'},cookie,undefined,'PATCH')).status,404);
  assert.equal((await write('/api/records/etapel_texts/test-text',{value:'New',status:'published',revision:0,token:'leak'},cookie,undefined,'PATCH')).status,400);
  const saved=await write('/api/records/etapel_texts/test-text',{value:'New',status:'published',revision:0},cookie,undefined,'PATCH');
  assert.equal(saved.status,200);assert.equal((await saved.json()).revision,1);
  assert.equal((await write('/api/records/etapel_texts/test-text',{value:'Stale',status:'published',revision:0},cookie,undefined,'PATCH')).status,409);
  assert.equal((await write('/api/upload',{},cookie)).status,400);
  assert.equal((await write('/api/logout',{},cookie)).status,200);
  assert.equal((await fetch(root+'/api/session',{headers:{cookie}})).status,401);
});

test('Studio publishes the current content fingerprint only for a content editor', async t => {
  const { collections, contentHash } = await import('../model.mjs');
  const content = Object.fromEntries(collections.map(name=>[name,[{id:name,status:'published',revision:0}]]));
  let canPublish=true, hookCalls=0;
  const upstream=http.createServer(async(req,res)=>{
    const chunks=[];for await(const part of req)chunks.push(part);
    const send=data=>{res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({data}));};
    if(req.url==='/auth/login')return send({access_token:'secret-access',refresh_token:'secret-refresh',expires:900000});
    if(req.url.startsWith('/users/me'))return send({id:'editor',email:'editor@example.com'});
    if(req.url==='/permissions/me')return send({etapel_texts:{update:{access:canPublish?'full':'none'}}});
    if(req.url==='/deploy'){hookCalls++;res.writeHead(200,{'Content-Type':'application/json'});return res.end('{}');}
    const name=req.url.match(/^\/items\/(etapel_\w+)\?/)?.[1];
    if(name && content[name])return send(content[name]);
    res.writeHead(404);res.end();
  });
  await new Promise(resolve=>upstream.listen(0,'127.0.0.1',resolve));
  const cms=`http://127.0.0.1:${upstream.address().port}`;
  const server=createStudioServer({cms,secret:'b'.repeat(64),origin:'http://studio.test',hook:cms+'/deploy',secure:false});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>{server.closeAllConnections();server.close();upstream.closeAllConnections();upstream.close();});
  const root=`http://127.0.0.1:${server.address().port}`;
  const login=await fetch(root+'/api/login',{method:'POST',headers:{origin:'http://studio.test','Content-Type':'application/json'},body:JSON.stringify({email:'editor@example.com',password:'correct'})});
  const cookie=login.headers.get('set-cookie').split(';')[0];
  const headers={cookie,origin:'http://studio.test','Content-Type':'application/json'};
  const snapshot=await (await fetch(root+'/api/content',{headers})).json();
  assert.deepEqual(snapshot.content,content);
  assert.equal(snapshot.hash,contentHash(content));
  canPublish=false;
  assert.equal((await fetch(root+'/api/publish',{method:'POST',headers,body:'{}'})).status,403);
  assert.equal(hookCalls,0);
  canPublish=true;
  const published=await fetch(root+'/api/publish',{method:'POST',headers,body:'{}'});
  assert.equal(published.status,200);
  const result=await published.json();
  assert.equal(result.hash,snapshot.hash);
  assert.equal(result.requested,true);
  assert.equal(hookCalls,1);
  assert(!JSON.stringify(result).includes('secret-'));
});

test('Spanish-to-English proposals persist without changing published English and require fresh explicit approval',async t=>{
 const texts=[{id:'spanish',locale:'es',page:'/quienes-somos',value:'Tecnología SATA: 38 años.',status:'published',revision:0},{id:'english',locale:'en',page:'/en/about-us',value:'Published English stays here.',label:'Headline',kind:'text',status:'published',revision:0,translation:null},{id:'unmatched',locale:'en',page:'/en/about-us',value:'Legacy English CTA',status:'published',revision:0,translation:{state:'pending',source_hash:'outdated',value:'Obsolete draft'}}];
 let mayWrite=true,aiCalls=0,writes=0;
 const upstream=http.createServer(async(req,res)=>{
  const parts=[];for await(const part of req)parts.push(part);const input=parts.length?JSON.parse(Buffer.concat(parts).toString()):null;
  const send=(data,status=200)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify({data}));};
  if(req.url==='/responses'){
   aiCalls++;assert.equal(req.headers.authorization,'Bearer private-ai-key');const source=JSON.parse(input.input).spanish_sources[0].value;
   const value=source.replace('Tecnología','Technology').replace('años','years');
   res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({translations:{s0:value},destinations:{t0:['s0'],t1:[]}})}]}]}));
  }
  if(req.url==='/auth/login')return send({access_token:'private-user-token',refresh_token:'private-refresh',expires:900000});
  if(req.headers.authorization!=='Bearer private-user-token')return send(null,401);
  if(req.url.startsWith('/users/me'))return send({id:'editor',email:'editor@example.com'});
  if(req.url==='/permissions/me')return send({etapel_texts:{update:{access:mayWrite?'full':'none'}}});
  if(req.url.startsWith('/items/etapel_texts?'))return send(texts);
  if(req.url==='/items/etapel_texts' && req.method==='PATCH'){
   assert(mayWrite);writes++;
   for(const patch of input)Object.assign(texts.find(row=>row.id===patch.id),patch);
   return send(input.map(patch=>texts.find(row=>row.id===patch.id)));
  }
  if(req.url==='/items/etapel_texts/english')return send(texts[1]);
  return send(null,404);
 });
 await new Promise(resolve=>upstream.listen(0,'127.0.0.1',resolve));
 const cms=`http://127.0.0.1:${upstream.address().port}`;
 const server=createStudioServer({cms,secret:'c'.repeat(64),origin:'http://studio.test',secure:false,translationKey:'private-ai-key',translationEndpoint:cms+'/responses'});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>{server.closeAllConnections();server.close();upstream.closeAllConnections();upstream.close();});
 const root=`http://127.0.0.1:${server.address().port}`;
 const post=(path,input,cookie)=>fetch(root+path,{method:'POST',headers:{origin:'http://studio.test','Content-Type':'application/json',...(cookie?{cookie}:{})},body:JSON.stringify(input)});
 assert.equal((await post('/api/translations/propose',{page:'/quienes-somos'})).status,401);
 const login=await post('/api/login',{email:'editor@example.com',password:'correct'});
 const cookie=login.headers.get('set-cookie').split(';')[0];
 mayWrite=false;assert.equal((await post('/api/translations/propose',{page:'/quienes-somos'},cookie)).status,403);assert.equal(aiCalls,0);mayWrite=true;
 const proposed=await post('/api/translations/propose',{page:'/quienes-somos'},cookie);assert.equal(proposed.status,200);
 const result=await proposed.json();assert.equal(result.pending,1);assert.equal(aiCalls,1);assert.equal(writes,1);
 assert.equal(texts[1].value,'Published English stays here.');assert.equal(texts[1].translation.state,'pending');assert.match(texts[1].translation.value,/Technology SATA: 38 years/);
 assert(!JSON.stringify(result).includes('private-'));assert.equal(texts[2].translation,null);assert.equal(texts[2].value,'Legacy English CTA');
 await post('/api/translations/propose',{page:'/quienes-somos'},cookie);assert.equal(aiCalls,1,'Current draft is reused without another provider call');
 const bypass=await fetch(root+'/api/records/etapel_texts/english',{method:'PATCH',headers:{origin:'http://studio.test','Content-Type':'application/json',cookie},body:JSON.stringify({value:'Bypass',revision:1,status:'published'})});assert.equal(bypass.status,400);
 const approval={page:'/quienes-somos',values:[{id:'english',revision:1,value:'Reviewed English: SATA, 38 years.'}]};
 texts[0].value='Spanish changed after generation';assert.equal((await post('/api/translations/approve',approval,cookie)).status,409);assert.equal(writes,1);assert.equal(texts[1].value,'Published English stays here.');
 texts[0].value='Tecnología SATA: 38 años.';
 const approved=await post('/api/translations/approve',approval,cookie);assert.equal(approved.status,200);assert.equal(texts[1].value,'Reviewed English: SATA, 38 years.');assert.equal(texts[1].translation.state,'approved');assert.equal(texts[0].value,'Tecnología SATA: 38 años.');
});
