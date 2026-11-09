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
