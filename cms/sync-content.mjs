import { readFile } from 'node:fs/promises';

// Pipe the isolated Etapel Directus service variables on stdin; never log secrets.
let input = '';
for await (const chunk of process.stdin) input += chunk;
const variables = JSON.parse(input);
const base = 'https://directus-production-dd39.up.railway.app';
if (variables.PUBLIC_URL !== base || !variables.ADMIN_EMAIL || !variables.ADMIN_PASSWORD) throw new Error('Use only the Etapel Directus service variables.');
const seed = JSON.parse(await readFile('.cms/seed.json','utf8'));
const apply = process.argv.includes('--apply');
let token;
async function api(path, method = 'GET', body) {
  const response = await fetch(base + path, { method, headers:{ ...(token ? {Authorization:`Bearer ${token}`} : {}), ...(body ? {'Content-Type':'application/json'} : {}) }, body:body ? JSON.stringify(body) : undefined, signal:AbortSignal.timeout(45000), redirect:'error' });
  if (!response.ok) throw new Error(`Content sync ${method} ${path.split('?')[0]}: HTTP ${response.status}`);
  return response.status === 204 ? null : (await response.json()).data;
}
token = (await api('/auth/login','POST',{email:variables.ADMIN_EMAIL,password:variables.ADMIN_PASSWORD,mode:'json'})).access_token;
for (const name of ['etapel_texts','etapel_media']) {
  const ids = new Set();
  for (let offset=0;;offset+=1000) {
    const rows = await api(`/items/${name}?fields=id&limit=1000&offset=${offset}&sort=id`);
    rows.forEach(row=>ids.add(row.id));
    if (rows.length<1000) break;
  }
  const missing = seed[name].filter(row=>!ids.has(row.id));
  console.log(`${name}: ${ids.size} existing records preserved, ${missing.length} ${apply ? 'to add' : 'missing (dry run)'}.`);
  if (apply) for (let offset=0;offset<missing.length;offset+=25) await api(`/items/${name}`,'POST',missing.slice(offset,offset+25));
}
console.log(apply ? 'Content sync complete. Existing content unchanged.' : 'Pass --apply to add the missing content.');
