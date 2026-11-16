// Pipe only the isolated Etapel Directus service variables into this script.
let input='';for await(const chunk of process.stdin)input+=chunk;
const variables=JSON.parse(input),base='https://directus-production-dd39.up.railway.app';
if(variables.PUBLIC_URL!==base || !variables.ADMIN_EMAIL || !variables.ADMIN_PASSWORD)throw new Error('Use the Etapel Directus variables only.');
let token;
async function api(path,method='GET',body){
 const response=await fetch(base+path,{method,headers:{...(token?{Authorization:`Bearer ${token}`} : {}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(45000),redirect:'error'});
 if(!response.ok)throw new Error(`Translation provisioning ${method} ${path}: HTTP ${response.status}`);
 return response.status===204?null:(await response.json()).data;
}
const auth=await api('/auth/login','POST',{email:variables.ADMIN_EMAIL,password:variables.ADMIN_PASSWORD,mode:'json'});token=auth.access_token;
try{
 const fields=await api('/fields/etapel_texts');
 if(!fields.some(field=>field.field==='translation')){
  await api('/fields/etapel_texts','POST',{field:'translation',type:'json',schema:{is_nullable:true},meta:{interface:'input-code',note:'English review proposal and source fingerprint. Only value is published after explicit approval.'}});
  console.log('Created English review metadata on Etapel texts. Existing values preserved.');
 }else console.log('English review metadata already exists. No content changed.');
}finally{await api('/auth/logout','POST',{refresh_token:auth.refresh_token});}
