import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { parse } from 'parse5';
import { processDocument } from '../content.mjs';
import { previewPath, previewDocument } from './preview.mjs';
import { createStudioServer } from './server.mjs';

const nodes = html => {
  const result=[];const visit=n=>{result.push(n);for(const child of n.childNodes || [])visit(child);};visit(parse(html));return result;
};
const attribute=(n,key)=>n.attrs?.find(a=>a.name===key)?.value;

test('Visual annotations locate each original text node without changing public markup or stable IDs',()=>{
  const html='<html><head><title>Etapel</title></head><body><h1>38+ años <span>de experiencia</span> en México.</h1><p>Texto original</p><picture><source media="(max-width:767px)" srcset="/mobile.webp"><img src="/equipo.webp" alt="Equipo"></picture><script>const s="Texto original";</script></body></html>';
  const plain=processDocument(html,'/quienes-somos');
  const row=plain.fields.find(row=>row.source==='Texto original');
  const result=processDocument(html,'/quienes-somos',new Map([[row.id,'Nuevo <equipo>']]),{preview:true});
  assert(!result.html.includes('data-etapel-'));
  assert.match(result.html,/Nuevo &lt;equipo&gt;/);
  const fields=new Map(result.fields.map(row=>[row.id,row]));
  for(const node of nodes(result.preview).filter(n=>attribute(n,'data-etapel-texts'))){
    for(const [index,id]of Object.entries(JSON.parse(attribute(node,'data-etapel-texts')))){
      assert(fields.has(id));assert.equal(node.childNodes[index].nodeName,'#text');
      assert.equal(node.childNodes[index].value.trim(),id===row.id ? 'Nuevo <equipo>' : fields.get(id).source);
    }
  }
  assert.deepEqual(nodes(result.preview).filter(n=>attribute(n,'data-etapel-images')).map(n=>JSON.parse(attribute(n,'data-etapel-images'))),[['/mobile.webp'],['/equipo.webp']]);
  assert.equal(result.fields.find(r=>r.source==='Texto original').id,row.id);
});

test('Visual documents retain real styles and images, and remove active code, navigation side effects and indexing',()=>{
  const html='<html><head><base href="https://other.example/"><meta http-equiv="refresh" content="0;url=https://other.example"><link rel="stylesheet" href="/_astro/site.css"><script src="https://www.googletagmanager.com/gtm.js?id=GTM-X"></script></head><body onload="bad()"><h1 data-etapel-texts="{}">Real page</h1><img src="/foto.webp" onerror="bad()"><form action="https://other.example"><input autofocus><button formaction="https://other.example">Send</button></form><iframe src="https://other.example"></iframe><a href="javascript:bad()" target="_top" ping="https://other.example">Link</a></body></html>';
  const result=previewDocument({route:'/',html,mediaPaths:{'/foto.webp':'/_cms/current.webp'}},'/','https://www.etapel.com');
  const all=nodes(result);
  assert(!all.some(n=>['script','iframe','object','embed','noscript'].includes(n.tagName)));
  assert(!all.some(n=>n.attrs?.some(a=>/^on/i.test(a.name) || ['action','formaction','autofocus','target','ping'].includes(a.name))));
  assert.equal(all.find(n=>n.tagName==='base').attrs[0].value,'https://www.etapel.com/');
  assert(all.some(n=>n.tagName==='link' && attribute(n,'href')==='/_astro/site.css'));
  assert(all.some(n=>n.tagName==='img' && attribute(n,'src')==='/foto.webp'));
  assert(all.some(n=>n.tagName==='meta' && attribute(n,'name')==='robots' && attribute(n,'content')==='noindex,nofollow'));
  assert.throws(()=>previewDocument({route:'/other',html},'/','https://www.etapel.com'));
  for(const route of ['https://other.example','//other.example','/../secret','/api?token=x','/en/%2e%2e','/admin/'])assert.throws(()=>previewPath(route));
  assert.equal(previewPath('/en/about-us'),'/_studio/pages/en__about-us.json');
});

test('Preview HTTP requires a session, never forwards CMS credentials to the website, and isolates the iframe',async t=>{
  let templateRequests=0;
  const upstream=http.createServer(async(req,res)=>{
    const send=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
    if(req.url==='/auth/login')return send(200,{data:{access_token:'private-access',refresh_token:'private-refresh',expires:900000}});
    if(req.url.startsWith('/users/me'))return send(200,{data:{id:'editor',email:'editor@example.com'}});
    if(req.url===previewPath('/quienes-somos')){
      templateRequests++;assert.equal(req.headers.authorization,undefined);assert.equal(req.headers.cookie,undefined);
      return send(200,{route:'/quienes-somos',html:'<html><head></head><body><h1>Etapel</h1><script>bad()</script></body></html>'});
    }
    send(404,{});
  });
  await new Promise(resolve=>upstream.listen(0,'127.0.0.1',resolve));
  const site=`http://127.0.0.1:${upstream.address().port}`;
  const server=createStudioServer({cms:site,site,origin:'http://studio.test',secret:'s'.repeat(64),secure:false});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>{server.closeAllConnections();server.close();upstream.closeAllConnections();upstream.close();});
  const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(base+'/api/preview?page=/quienes-somos')).status,401);
  assert.equal(templateRequests,0);
  const login=await fetch(base+'/api/login',{method:'POST',headers:{origin:'http://studio.test','content-type':'application/json'},body:JSON.stringify({email:'editor@example.com',password:'test'})});
  const cookie=login.headers.get('set-cookie').split(';')[0];
  const response=await fetch(base+'/api/preview?page=/quienes-somos',{headers:{cookie}});
  assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/text\/html/);
  assert.equal(response.headers.get('x-frame-options'),'SAMEORIGIN');
  assert.match(response.headers.get('content-security-policy'),/script-src 'none'/);
  assert.match(response.headers.get('content-security-policy'),/sandbox allow-same-origin/);
  assert.match(response.headers.get('cache-control'),/private, no-store/);
  const html=await response.text();assert(!html.includes('private-access'));assert(!html.includes('<script'));
  assert.equal((await fetch(base+'/api/preview?page=https://other.example',{headers:{cookie}})).status,400);
  assert.equal(templateRequests,1);
});
