import { readFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { collections } from './model.mjs';
const base = process.env.PUBLIC_URL;
if (base !== 'https://directus-production-dd39.up.railway.app' || !process.env.ADMIN_PASSWORD) throw new Error('Run with the isolated Etapel Directus environment.');
let token;
async function api(path, method = 'GET', body) {
  const response = await fetch(base + path, { method, headers: { ...(token ? { Authorization:`Bearer ${token}` } : {}), ...(body === undefined ? {} : { 'Content-Type':'application/json' }) }, body:body === undefined ? undefined : JSON.stringify(body), signal:AbortSignal.timeout(60000) });
  const payload = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(`Bootstrap ${method} ${path}: HTTP ${response.status}, ${JSON.stringify(payload?.errors?.map(e=>e.extensions?.code))}`);
  return payload?.data;
}
const auth = await api('/auth/login','POST',{email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD,mode:'json'});
token = auth.access_token;
const field = (name,type='string',extra={}) => ({ field:name,type,schema:{is_nullable:true,...(type === 'string' ? {max_length:12000} : {}),...extra.schema},meta:{interface:type === 'json' ? 'input-code' : type === 'text' ? 'input-multiline' : 'input',...extra.meta} });
const id = field('id','string',{schema:{is_primary_key:true,is_nullable:false,max_length:180},meta:{hidden:true}});
const status = field('status','string',{schema:{default_value:'draft',max_length:30},meta:{interface:'select-dropdown',options:{choices:[{text:'Borrador',value:'draft'},{text:'Publicado',value:'published'},{text:'Archivado',value:'archived'}]}}});
const shared = [id,status,field('sort','integer',{schema:{default_value:0}}),field('revision','integer',{schema:{default_value:0}})];
const definitions = {
  etapel_texts:{label:'Textos y páginas',icon:'article',fields:[field('page'),field('locale'),field('section'),field('label'),field('source','text'),field('value','text'),field('kind')]},
  etapel_media:{label:'Biblioteca de imágenes',icon:'photo_library',fields:[field('title'),field('source'),field('page'),field('file','uuid',{meta:{interface:'file-image',special:['file']}})]},
  etapel_products:{label:'Productos Etapel',icon:'inventory_2',fields:[field('payload','json')]},
  etapel_families:{label:'Familias de producto',icon:'category',fields:[field('payload','json')]},
  etapel_brands:{label:'Marcas',icon:'verified',fields:[field('payload','json')]},
};
const existing = new Set((await api('/collections')).map(row=>row.collection));
for (const [name,definition] of Object.entries(definitions)) if (!existing.has(name)) {
  await api('/collections','POST',{collection:name,schema:{},meta:{icon:definition.icon,translations:[{language:'es-ES',translation:definition.label}],sort_field:'sort',archive_field:'status',archive_value:'archived',unarchive_value:'draft'},fields:[...shared,...definition.fields]});
  if (name === 'etapel_media') await api('/relations','POST',{collection:name,field:'file',related_collection:'directus_files',schema:{on_delete:'SET NULL'}});
  console.log('Created',name);
}
const seed = JSON.parse(await readFile('.cms/seed.json','utf8'));
for (const name of collections) {
  const ids = new Set();
  for (let offset=0;;offset+=100) { const rows = await api(`/items/${name}?fields=id&limit=100&offset=${offset}`); rows.forEach(row=>ids.add(row.id)); if(rows.length<100)break; }
  const missing = seed[name].filter(row=>!ids.has(row.id));
  for (let offset=0;offset<missing.length;offset+=20) await api(`/items/${name}`,'POST',missing.slice(offset,offset+20));
  console.log(name,missing.length,'added;',ids.size,'preserved');
}
await api('/settings','PATCH',{project_name:'Etapel · Content Studio',project_color:'#f58220',default_language:'es-ES'});
const policies = await api('/policies?limit=-1'), permissions = await api('/permissions?limit=-1'), roles = await api('/roles?limit=-1');
async function access(name,write) {
  let policy=policies.find(p=>p.name===name);
  if(!policy)policy=await api('/policies','POST',{name,icon:write?'edit':'public',admin_access:false,app_access:false});
  for (const collection of [...collections,'directus_files']) for (const action of write ? collection === 'directus_files' ? ['read','create'] : ['read','create','update'] : ['read']) {
    if(!permissions.some(p=>p.policy===policy.id&&p.collection===collection&&p.action===action))await api('/permissions','POST',{policy:policy.id,collection,action,permissions:{},fields:['*']});
  }
  let role=roles.find(r=>r.name===name);
  if(!role)role=await api('/roles','POST',{name,icon:write?'edit':'public',policies:[{policy:policy.id}]});
  return role;
}
const reader=await access('Etapel website build',false);
await access('Etapel content editor',true);
const users=await api('/users?filter[first_name][_eq]=Etapel%20website%20build');
let readToken=process.env.WEBSITE_READ_TOKEN;
if(!users.length){readToken=randomBytes(32).toString('hex');await api('/users','POST',{first_name:'Etapel website build',role:reader.id,status:'active',token:readToken});}
else if(!readToken)throw new Error('Recover WEBSITE_READ_TOKEN from Railway before rerunning.');
const saved=spawnSync('railway',['variable','set','WEBSITE_READ_TOKEN','--stdin','--service','directus','--skip-deploys','--json'],{input:readToken,encoding:'utf8'});
if(saved.status!==0)throw new Error('Could not store the read token.');
console.log('Etapel CMS initialized. No secrets printed; existing edits preserved.');
