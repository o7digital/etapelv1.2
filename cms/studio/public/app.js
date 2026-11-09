const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const state = { content: {}, config: {}, locale: 'es', query: '', editing: null, dirty: false, publishing: false };
const pages = [
  ['home','Inicio','/','/en','01'], ['about','Nosotros','/quienes-somos','/en/about-us','02'],
  ['training','CEDETEC','/capacitacion','/en/training','03'], ['support','Soporte técnico','/postventa','/en/after-sales','04'],
  ['contact','Contacto','/contacto','/en/contact','05'], ['privacy','Privacidad','/aviso-de-privacidad','/en/privacy-policy','06'],
];
const navigation = [['overview','Resumen','◈'], ...pages.map(p => [p[0],p[1],p[4]]), ['catalog','Productos','▦'], ['families','Familias de producto','▧'], ['catalog-pages','Páginas del catálogo','▤'], ['brands','Marcas','◎'], ['media','Biblioteca de imágenes','▣'], ['shared','Navegación y pie','≡']];
const titles = { overview:'Tu sitio, bajo control.', catalog:'Tecnología que merece conocerse.', families:'Una solución para cada necesidad.', brands:'Marcas que nos respaldan.', media:'La imagen de tu experiencia.', shared:'Los detalles también comunican.', 'catalog-pages':'Cada especialidad, en su lugar.' };
let toastTimer, publicationTimer;
async function request(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { ...(options.body && !(options.body instanceof File) ? { 'Content-Type':'application/json' } : {}), ...options.headers } });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 && path !== '/api/login') { $('#studio-view').hidden = true; $('#login-view').hidden = false; }
    throw new Error(data.error || 'No se pudo completar la solicitud.');
  }
  return data;
}
function notify(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 5000); }
const collection = name => state.content['etapel_' + name] || [];
const sitePath = page => state.config.site.replace(/\/$/, '') + (page.startsWith('/') ? page : '/');
const imageUrl = row => row.file ? '/api/files/' + row.file : sitePath(row.source);
function imageFor(path) { const row = collection('media').find(r => r.source === path); return row ? imageUrl(row) : sitePath(path); }
function currentView() { return location.hash.slice(1) || 'overview'; }
function button(label, action, cls = 'button quiet') { return `<button class="${cls}" data-action="${action}">${label}</button>`; }
function heading(title, subtitle, action = '') { return `<div class="page-heading"><div><p class="eyebrow">ETAPEL / TU ESPACIO DE CONTENIDO</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle)}</p></div>${action}</div>`; }
function languageBar() { return `<div class="language-bar"><span>IDIOMA DE EDICIÓN</span><div>${['es','en'].map(locale => `<button data-locale="${locale}" class="${state.locale === locale ? 'active' : ''}" aria-pressed="${state.locale === locale}">${locale === 'es' ? 'Español' : 'English'}</button>`).join('')}</div><small>Las dos versiones se editan por separado.</small></div>`; }
function pageRows(view) {
  const page = pages.find(p => p[0] === view);
  const route = page ? page[state.locale === 'es' ? 2 : 3] : view === 'shared' ? `${state.locale}:` : state.catalogPage;
  return collection('texts').filter(row => row.locale === state.locale && (view === 'shared' ? row.page.startsWith(route) : row.page === route));
}
function renderTexts(view) {
  const rows = pageRows(view), groups = new Map();
  for (const row of rows) { if (!groups.has(row.section)) groups.set(row.section, []); groups.get(row.section).push(row); }
  return `<form id="texts-form"><div class="content-toolbar"><p><b>${rows.length}</b> textos · Cambia lo que necesites y guarda la página.</p><button type="submit" class="button orange">Guardar la página <span>↗</span></button></div><p id="texts-error" class="error" role="alert"></p>${[...groups].map(([section, fields], i) => `<details class="text-section" ${i === 0 ? 'open' : ''}><summary><span>${escapeHtml(section)}</span><small>${fields.length} textos <span>＋</span></small></summary><div class="text-grid">${fields.sort((a,b) => a.sort - b.sort).map(row => `<label class="editable-field"><span class="field-heading">${escapeHtml(row.label)}<small>EDITABLE</small></span><textarea name="${row.id}" rows="${row.value.length > 150 ? 4 : 2}" maxlength="12000">${escapeHtml(row.value)}</textarea></label>`).join('')}</div></details>`).join('')}${!rows.length ? '<div class="empty">No hay textos en esta página.</div>' : ''}</form>`;
}
function overview() {
  const count = name => collection(name).filter(r => r.status === 'published').length;
  return `${heading(titles.overview,'Tu equipo tiene el conocimiento. Este es el espacio para compartirlo.')}<section class="overview-hero"><div><p class="eyebrow light">TODO EMPIEZA CON UNA BUENA CONEXIÓN.</p><h2>Tu sitio.<br><span>Tu siguiente paso.</span></h2><p>Actualiza tus productos, renueva tus imágenes y cuenta lo que hace diferente a Etapel.</p><a class="button orange" href="#home">Editar el inicio <span>↗</span></a></div><div class="hero-lines"><b>E</b><span>EXPERIENCIA QUE SE COMPARTE.</span></div></section><div class="stats"><article><span>Productos publicados</span><b>${count('products')}</b><small>Tu catálogo actual</small></article><article><span>Familias de producto</span><b>${count('families')}</b><small>Soluciones organizadas</small></article><article><span>Textos editables</span><b>${collection('texts').length}</b><small>Español e inglés</small></article><article><span>Imágenes del sitio</span><b>${collection('media').length}</b><small>Una biblioteca compartida</small></article></div><div class="section-heading"><h2>¿Por dónde empezamos?</h2><span>CUIDA CADA PUNTO DE CONTACTO.</span></div><div class="shortcut-grid">${[['home','01','Tu historia, al día.','Textos, presentación y mensajes de la portada.'],['catalog','02','Un catálogo que avanza.','Productos, fichas, familias y detalles técnicos.'],['media','03','Una imagen que habla.','Fotografías del equipo, instalaciones y productos.']].map(([view,n,title,copy]) => `<a class="shortcut" href="#${view}"><span>${n} / CONTENIDO</span><h3>${title}</h3><p>${copy}</p><b>Explorar <i>↗</i></b></a>`).join('')}</div><div class="workflow-note"><span class="status-dot"></span><div><b>Guardar prepara. Publicar actualiza tu sitio.</b><p>Los cambios se guardan en Directus. «Publicar sitio» genera una nueva versión en Vercel. Tu sitio anterior sigue disponible durante la publicación.</p></div></div>`;
}
function renderCollection(view) {
  const names = { catalog:'products', families:'families', brands:'brands' }, name = names[view];
  const filtered = collection(name).filter(row => `${row.payload.name || row.payload.title} ${row.payload.brand || ''}`.toLowerCase().includes(state.query.toLowerCase()));
  return `${heading(titles[view], 'Edita las fichas y su estado. Los cambios aparecerán en el sitio después de publicar.', button('＋ ' + ({ catalog:'Nuevo producto', families:'Nueva familia', brands:'Nueva marca' }[view]),'new','button orange'))}<div class="list-toolbar"><span>${filtered.length} fichas</span><label class="search"><span>Buscar</span><input id="collection-search" type="search" placeholder="Nombre o marca…" value="${escapeHtml(state.query)}"></label></div><div class="table-panel"><div class="table-scroll"><table><thead><tr><th>${view === 'catalog' ? 'PRODUCTO' : 'CONTENIDO'}</th><th>${view === 'catalog' ? 'MARCA / FAMILIA' : 'ORDEN'}</th><th>ESTADO</th><th></th></tr></thead><tbody>${filtered.map(row => `<tr><td><div class="record-name">${row.payload.image ? `<img src="${escapeHtml(imageFor(row.payload.image))}" alt="" loading="lazy">` : '<span class="record-letter">'+escapeHtml((row.payload.name || row.payload.title).slice(0,1))+'</span>'}<div><b>${escapeHtml(row.payload.name || row.payload.title)}</b><small>${escapeHtml(row.payload.summary?.slice(0,100) || row.payload.pageDescription?.slice(0,100) || row.payload.note || '')}</small></div></div></td><td>${escapeHtml(view === 'catalog' ? row.payload.brand : row.sort)}${view === 'catalog' ? `<small class="family-name">${escapeHtml(collection('families').find(f => f.payload.slug === row.payload.familySlug)?.payload.title || '')}</small>` : ''}</td><td><span class="badge ${row.status}">${({ published:'Publicado',draft:'Borrador',archived:'Archivado' })[row.status]}</span></td><td><button class="edit-button" data-edit="${row.id}" data-collection="${name}">Editar ↗</button></td></tr>`).join('')}</tbody></table></div>${!filtered.length ? '<div class="empty">No se encontraron fichas.</div>' : ''}</div>`;
}
function renderMedia() {
  const filtered = collection('media').filter(row => `${row.title} ${row.page} ${row.source}`.toLowerCase().includes(state.query.toLowerCase()));
  return `${heading(titles.media,'Sustituye una fotografía en todos los lugares donde se utiliza.',button('＋ Subir fotografía','upload-media','button orange'))}<div class="list-toolbar"><span>${filtered.length} imágenes</span><label class="search"><span>Buscar</span><input id="collection-search" type="search" placeholder="Imagen, producto o página…" value="${escapeHtml(state.query)}"></label></div><div class="media-grid">${filtered.map(row => `<article class="media-card"><div class="media-image"><img src="${escapeHtml(imageUrl(row))}" alt="${escapeHtml(row.title)}" loading="lazy">${row.file ? '<span class="badge published">Actualizada</span>' : ''}</div><div><b>${escapeHtml(row.title)}</b><small>${escapeHtml(row.page === '/' ? 'Inicio' : row.page)}</small><button class="edit-button" data-edit="${row.id}" data-collection="media">Cambiar imagen ↗</button></div></article>`).join('')}</div>`;
}
function render() {
  const view = currentView();
  $('#breadcrumb').textContent = navigation.find(n => n[0] === view)?.[1] || 'Resumen';
  $('#navigation').innerHTML = navigation.map(([key,name,icon]) => `<a href="#${key}" class="${view === key ? 'active' : ''}"><span class="nav-icon">${icon}</span>${name}${view === key ? '<i></i>' : ''}</a>`).join('');
  let html;
  if (['catalog','families','brands'].includes(view)) html = renderCollection(view);
  else if (view === 'media') html = renderMedia();
  else if (pages.some(p => p[0] === view) || ['shared','catalog-pages'].includes(view)) {
    let selector = '';
    if (view === 'catalog-pages') {
      const paths = [...new Set(collection('texts').filter(r => r.locale === state.locale && /\/(linea-de-producto|product-lines)/.test(r.page)).map(r => r.page))].sort();
      if (!paths.includes(state.catalogPage)) state.catalogPage = paths[0];
      selector = `<label class="page-selector">Página del catálogo<select id="catalog-page">${paths.map(path => `<option ${path === state.catalogPage ? 'selected' : ''}>${escapeHtml(path)}</option>`).join('')}</select></label>`;
    }
    const page = pages.find(p => p[0] === view), route = page?.[state.locale === 'es' ? 2 : 3] || state.catalogPage || '/';
    html = `${heading(page?.[1] || titles[view], 'Los campos conservan la estructura y el diseño de tu sitio.',`<a class="button quiet" href="${escapeHtml(sitePath(route))}" target="_blank" rel="noopener">Ver la página ↗</a>`)}${languageBar()}${selector}${renderTexts(view)}`;
  } else html = overview();
  $('#main').innerHTML = html;
  $('#main').querySelectorAll('textarea,input,select').forEach(field => field.addEventListener('input', () => { if (field.id !== 'collection-search') state.dirty = true; }));
}
async function reload() { const data = await request('/api/content'); state.content = data.content; state.hash = data.hash; }
async function enter() {
  const [user, config] = await Promise.all([request('/api/session'),request('/api/config')]);
  state.config = config; $('#account-name').textContent = user.name || user.email; $('#visit-site').href = config.site;
  await reload(); $('#login-view').hidden = true; $('#studio-view').hidden = false; $('#publish').disabled = !config.publishReady; render();
}
function field(label, name, value, { type = 'text', rows, required = false, disabled = false, help = '' } = {}) {
  return `<label class="editable-field"><span class="field-heading">${label}<small>EDITABLE</small></span>${rows ? `<textarea name="${name}" rows="${rows}" ${required ? 'required' : ''}>${escapeHtml(value)}</textarea>` : `<input name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''} ${disabled ? 'readonly' : ''}>`}${help ? `<small class="field-help">${help}</small>` : ''}</label>`;
}
function mediaSelector(path) { return `<label class="editable-field"><span class="field-heading">Fotografía de portada<small>EDITABLE</small></span><select name="image">${collection('media').map(row => `<option value="${escapeHtml(row.source)}" ${path === row.source ? 'selected' : ''}>${escapeHtml(row.title)}</option>`).join('')}</select><img class="editor-preview" id="editor-image-preview" src="${escapeHtml(imageFor(path))}" alt="Vista previa de la fotografía"><small class="field-help">Sube nuevas fotografías desde la biblioteca antes de elegirlas aquí.</small></label>`; }
function pairs(name, values, labels) {
  return `<section class="pair-section" data-pairs="${name}"><h3>${labels[0]}</h3><div class="pair-rows">${values.map(row => pairRow(row,labels)).join('')}</div><button class="button quiet" type="button" data-add-pair="${name}">＋ Añadir fila</button></section>`;
}
function pairRow(row = {}, labels) { return `<div class="pair-row"><input aria-label="${labels[1]}" placeholder="${labels[1]}" data-pair-key value="${escapeHtml(Object.values(row)[0] || '')}"><textarea aria-label="${labels[2]}" placeholder="${labels[2]}" data-pair-value rows="2">${escapeHtml(Object.values(row)[1] || '')}</textarea><button type="button" class="icon-button" data-remove-pair aria-label="Quitar fila">×</button></div>`; }
const pairLabels = { specs:['Ficha técnica','Característica','Valor'], variants:['Variantes','Nombre','Detalle'], detailBlocks:['Bloques de detalle','Título','Descripción'], downloads:['Documentos y descargas','Título del documento','Enlace HTTPS'] };
function edit(name, id = null) {
  const row = id ? collection(name).find(r => r.id === id) : null;
  const family = collection('families').find(r => r.status === 'published')?.payload.slug;
  const defaults = name === 'products' ? { slug:'',name:'',brand:'ETAPEL',familySlug:family,category:'',technology:'',application:'',summary:'',description:'',summaryEn:'',descriptionEn:'',image:collection('media')[0]?.source,gallery:[],badges:[],specs:[],variants:[],highlights:[],detailBlocks:[],downloads:[] } : name === 'families' ? { slug:'',title:'',shortTitle:'',href:'',menuDescription:'',pageDescription:'',image:collection('media')[0]?.source,accent:'',items:[] } : { name:'',slug:'',note:'' };
  state.editing = { name, row, payload: structuredClone(row?.payload || defaults) };
  const p = state.editing.payload;
  $('#editor-title').textContent = name === 'media' ? 'La fotografía correcta.' : row ? p.name || p.title : 'Una nueva ficha.';
  $('#editor-kind').textContent = ({products:'PRODUCTOS',families:'FAMILIAS DE PRODUCTO',brands:'MARCAS',media:'BIBLIOTECA DE IMÁGENES'})[name];
  let html = '';
  if (name === 'media') html = `<img class="editor-preview large" src="${escapeHtml(imageUrl(row))}" alt="${escapeHtml(row.title)}">${field('Descripción de la imagen','title',row.title,{ required:true })}<p class="notice">Esta fotografía se utiliza en el sitio. Al cambiarla se actualizarán todos sus usos después de publicar.</p>${button('Elegir una nueva imagen','replace-image','button orange')}<p class="field-help">JPG, PNG, WebP o AVIF · Máximo 25 MB.</p><input name="file" type="hidden" value="${row.file || ''}">`;
  else if (name === 'products') {
    html = `<div class="editor-grid">${field('Nombre del producto','name',p.name,{required:true})}${field('Marca','brand',p.brand,{required:true})}${field('Dirección del producto','slug',p.slug,{required:true,disabled:!!row,help:row ? 'Conservamos el enlace actual del producto.' : 'Minúsculas y guiones, por ejemplo: nueva-pistola-sata.'})}<label class="editable-field"><span class="field-heading">Familia<small>EDITABLE</small></span><select name="familySlug">${collection('families').filter(r=>r.status === 'published').map(r=>`<option value="${r.payload.slug}" ${r.payload.slug === p.familySlug ? 'selected' : ''}>${escapeHtml(r.payload.title)}</option>`).join('')}</select></label></div>${field('Resumen · Español','summary',p.summary,{rows:3,required:true})}${field('Descripción · Español','description',p.description,{rows:5,required:true})}<details class="editor-details"><summary>Versión inglesa</summary>${field('Summary · English','summaryEn',p.summaryEn || '',{rows:3})}${field('Description · English','descriptionEn',p.descriptionEn || '',{rows:5})}</details>${mediaSelector(p.image)}<details class="editor-details"><summary>Galería de fotografías</summary><p class="field-help">La portada se añade automáticamente como primera fotografía.</p><div class="gallery-options">${collection('media').map(r=>`<label><input type="checkbox" name="gallery" value="${escapeHtml(r.source)}" ${p.gallery.includes(r.source) ? 'checked' : ''}>${escapeHtml(r.title)}</label>`).join('')}</div></details><div class="editor-grid">${field('Categoría','category',p.category)}${field('Línea de catálogo','catalogLine',p.catalogLine || '')}${field('Tecnología','technology',p.technology)}${field('Aplicación','application',p.application)}</div>${field('Puntos destacados · uno por línea','highlights',p.highlights.join('\n'),{rows:4})}${pairs('specs',p.specs,pairLabels.specs)}${pairs('variants',p.variants,pairLabels.variants)}${pairs('detailBlocks',p.detailBlocks,pairLabels.detailBlocks)}${pairs('downloads',(p.downloads||[]).filter(d=>typeof d !== 'string').map(d=>({label:d.label,url:d.url})),pairLabels.downloads)}`;
  } else if (name === 'families') html = `${field('Nombre de la familia','title',p.title,{required:true})}${field('Nombre corto','shortTitle',p.shortTitle,{required:true})}${field('Dirección de la familia','slug',p.slug,{required:true,disabled:!!row})}${field('Descripción en el menú','menuDescription',p.menuDescription,{rows:3})}${field('Descripción de la página','pageDescription',p.pageDescription,{rows:4})}${mediaSelector(p.image)}${field('Especialidades · una por línea','items',p.items.join('\n'),{rows:5})}`;
  else html = `${field('Nombre de la marca','name',p.name,{required:true})}${field('Identificador','slug',p.slug,{required:true,disabled:!!row})}${field('Texto complementario','note',p.note || '')}`;
  if (name !== 'media') html += `<div class="editor-grid"><label class="editable-field"><span class="field-heading">Estado<small>EDITABLE</small></span><select name="status">${[['draft','Borrador'],['published','Publicado'],['archived','Archivado']].map(([v,l])=>`<option value="${v}" ${(row?.status || 'draft') === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>${field('Orden de aparición','sort',row?.sort ?? collection(name).length,{type:'number'})}</div><p class="notice">Guardar conserva tu ficha en Directus. «Publicar sitio» actualiza la web. Las fichas en borrador o archivadas no se incluyen.</p>`;
  $('#editor-fields').innerHTML = html; $('#editor-error').textContent = ''; $('#editor').showModal();
}
function closeEditor() { $('#editor').close(); state.editing = null; }
function lines(value) { return String(value || '').split('\n').map(v=>v.trim()).filter(Boolean); }
async function saveRecord(name,row,values) {
  const saved = await request(`/api/records/etapel_${name}${row ? '/' + row.id : ''}`, { method:row ? 'PATCH' : 'POST', body:JSON.stringify({ ...values, revision:row?.revision || 0 }) });
  const rows = collection(name), index = rows.findIndex(r=>r.id === saved.id);
  if (index >= 0) rows[index] = saved; else rows.push(saved);
  return saved;
}
$('#login-form').addEventListener('submit', async event => {
  event.preventDefault(); const formElement = event.currentTarget, submit = formElement.querySelector('button'); submit.disabled = true; $('#login-error').textContent = '';
  try { const form = new FormData(formElement); await request('/api/login',{method:'POST',body:JSON.stringify(Object.fromEntries(form))}); formElement.reset(); await enter(); }
  catch(error) { $('#login-error').textContent = error.message; } finally { submit.disabled = false; }
});
$('#logout').addEventListener('click',async()=>{if(state.dirty && !confirm('Tienes cambios sin guardar. ¿Quieres salir?'))return;await request('/api/logout',{method:'POST',body:'{}'});state.content={};state.dirty=false;clearInterval(publicationTimer);$('#studio-view').hidden=true;$('#login-view').hidden=false;});
window.addEventListener('beforeunload',event=>{if(state.dirty){event.preventDefault();event.returnValue='';}});
window.addEventListener('hashchange',()=>{if(state.dirty && !confirm('Hay textos sin guardar. ¿Quieres cambiar de sección?')){history.replaceState(null,'','#'+state.lastView);return;}state.dirty=false;state.query='';state.lastView=currentView();$('#sidebar').classList.remove('open');$('#nav-backdrop').hidden=true;render();});
$('#mobile-menu').onclick=()=>{$('#sidebar').classList.add('open');$('#nav-backdrop').hidden=false;};
$('#nav-backdrop').onclick=()=>{$('#sidebar').classList.remove('open');$('#nav-backdrop').hidden=true;};
$('#main').addEventListener('click',event=>{
  const editButton=event.target.closest('[data-edit]'); if(editButton)return edit(editButton.dataset.collection,editButton.dataset.edit);
  const action=event.target.closest('[data-action]')?.dataset.action;
  if(action==='new')return edit(({catalog:'products',families:'families',brands:'brands'})[currentView()]);
  if(action==='upload-media'){state.uploadTarget=null;$('#image-upload').click();}
  const locale=event.target.closest('[data-locale]')?.dataset.locale;
  if(locale){if(state.dirty && !confirm('¿Cambiar de idioma sin guardar?'))return;state.locale=locale;state.dirty=false;render();}
});
$('#main').addEventListener('input',event=>{
  if(event.target.id==='collection-search'){
    const position=event.target.selectionStart;state.query=event.target.value;render();const input=$('#collection-search');input.focus();try{input.setSelectionRange(position,position);}catch{}
  }
});
$('#main').addEventListener('change',event=>{if(event.target.id==='catalog-page'){if(state.dirty && !confirm('¿Cambiar de página sin guardar?'))return;state.catalogPage=event.target.value;state.dirty=false;render();}});
$('#main').addEventListener('submit',async event=>{
  if(event.target.id!=='texts-form')return;
  event.preventDefault();const submit=event.target.querySelector('[type=submit]');submit.disabled=true;$('#texts-error').textContent='';
  try{
    let count=0;for(const [id,value]of new FormData(event.target)){const row=collection('texts').find(r=>r.id===id);if(row && row.value!==value){await saveRecord('texts',row,{value,status:'published'});count++;}}
    state.dirty=false;notify(count ? `${count} textos guardados. Publica el sitio para verlos en línea.` : 'No hay cambios pendientes.');
  }catch(error){$('#texts-error').textContent=error.message;}finally{submit.disabled=false;}
});
$('#editor-fields').addEventListener('click',event=>{
  const add=event.target.closest('[data-add-pair]');if(add){const name=add.dataset.addPair;add.closest('[data-pairs]').querySelector('.pair-rows').insertAdjacentHTML('beforeend',pairRow({},pairLabels[name]));}
  if(event.target.closest('[data-remove-pair]'))event.target.closest('.pair-row').remove();
  if(event.target.closest('[data-action="replace-image"]')){state.uploadTarget=state.editing.row;$('#image-upload').click();}
});
$('#editor-fields').addEventListener('change',event=>{if(event.target.name==='image')$('#editor-image-preview').src=imageFor(event.target.value);});
$('#editor-form').addEventListener('submit',async event=>{
  event.preventDefault();const submit=event.target.querySelector('[type=submit]');submit.disabled=true;$('#editor-error').textContent='';
  try{
    const {name,row,payload}=state.editing,form=new FormData(event.target),p=structuredClone(payload);let values;
    if(name==='media')values={title:form.get('title'),file:form.get('file')||null,status:'published'};
    else{
      for(const [key,value]of form)if(!['gallery','sort','status'].includes(key))p[key]=value;
      if(name==='products'){
        p.gallery=[p.image,...form.getAll('gallery').filter(path=>path!==p.image)];p.highlights=lines(form.get('highlights'));
        for(const [key,keys]of Object.entries({specs:['label','value'],variants:['name','note'],detailBlocks:['title','body'],downloads:['label','url']})){
          const rows=[...event.target.querySelectorAll(`[data-pairs="${key}"] .pair-row`)];
          p[key]=rows.map(el=>({[keys[0]]:el.querySelector('[data-pair-key]').value,[keys[1]]:el.querySelector('[data-pair-value]').value}));
          if(key==='downloads')p[key]=[...(payload.downloads||[]).filter(d=>typeof d==='string'),...p[key]];
        }
      }else if(name==='families'){p.items=lines(form.get('items'));p.href='/linea-de-producto/'+p.slug;}
      values={payload:p,status:form.get('status'),sort:Number(form.get('sort'))};
    }
    await saveRecord(name,row,values);closeEditor();render();notify('Cambios guardados en Directus. Publica cuando estén listos.');
  }catch(error){$('#editor-error').textContent=error.message;}finally{submit.disabled=false;}
});
$('#close-editor').onclick=closeEditor;$('#cancel-editor').onclick=closeEditor;
$('#image-upload').addEventListener('change',async event=>{
  const file=event.target.files[0];if(!file)return;
  if(file.size>25*1024*1024){notify('El máximo es 25 MB por fotografía.');event.target.value='';return;}
  notify('Subiendo fotografía…');
  try{
    const {id}=await request('/api/upload',{method:'POST',headers:{'Content-Type':file.type},body:file});
    if(state.uploadTarget){$('#editor-form [name=file]').value=id;$('#editor-fields .editor-preview').src='/api/files/'+id;}
    else{const saved=await request('/api/records/etapel_media',{method:'POST',body:JSON.stringify({title:file.name,file:id,status:'published',revision:0})});collection('media').push(saved);render();}
    notify(state.uploadTarget?'Fotografía subida. Guarda la ficha para conservar el cambio.':'Fotografía añadida a la biblioteca.');
  }catch(error){notify(error.message);}finally{event.target.value='';}
});
$('#publish').addEventListener('click',async()=>{
  if(state.dirty){notify('Guarda tus textos antes de publicar.');return;}
  $('#publish').disabled=true;const panel=$('#publication-status');panel.hidden=false;panel.textContent='Preparando la publicación…';
  try{
    const result=await request('/api/publish',{method:'POST',body:'{}'});state.publishing=true;panel.textContent=result.message;
    let checks=0;clearInterval(publicationTimer);publicationTimer=setInterval(async()=>{
      checks++;try{const current=await request('/api/publication');if(current.hash===result.hash){clearInterval(publicationTimer);state.publishing=false;panel.textContent='Tu sitio está actualizado. La nueva versión ya está en línea.';$('#publish').disabled=false;notify('Sitio publicado correctamente.');}}
      catch{}if(checks>=60){clearInterval(publicationTimer);state.publishing=false;panel.textContent='La publicación aún no se ha confirmado. Revisa el despliegue en Vercel; la versión anterior sigue disponible.';$('#publish').disabled=false;}
    },10000);
  }catch(error){panel.textContent=error.message;$('#publish').disabled=false;}
});
state.lastView=currentView();
enter().catch(error=>{if(!error.message.includes('Entra a tu Studio'))$('#login-error').textContent=error.message;});
