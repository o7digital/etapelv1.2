import { visualEditorMarkup, mountVisualEditor } from './visual-editor.js';
import { locales, languagePath } from './language-routes.js';
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const state = { content: {}, config: {}, locale: 'es', translationLocale: 'en', query: '', status: '', family: '', page: 1, editing: null, editorDirty: false, dirty: false, publishing: false, liveHash: null, version: 0, translating: false, translationHashes: {} };
Object.assign(state, { editorMode:'visual', visualDrafts:{}, visualMediaDrafts:{}, visualPrefs:{device:'desktop'}, saving:false, uploading:false });
let visualEditor;
const pages = [
  ['home','Inicio','/','/en','01'], ['about','Nosotros','/quienes-somos','/en/about-us','02'],
  ['training','CEDETEC','/capacitacion','/en/training','03'], ['support','Soporte técnico','/postventa','/en/after-sales','04'],
  ['contact','Contacto','/contacto','/en/contact','05'], ['privacy','Privacidad','/aviso-de-privacidad','/en/privacy-policy','06'],
  ['policies','Políticas de Etapel','/politicas-de-etapel','/en/etapel-policies','07'],
];
const navigation = [['overview','Resumen','◈'], ...pages.map(p => [p[0],p[1],p[4]]), ['catalog','Productos','▦'], ['families','Familias de producto','▧'], ['catalog-pages','Páginas del catálogo','▤'], ['brands','Marcas','◎'], ['media','Biblioteca de imágenes','▣'], ['shared','Navegación y pie','≡']];
const titles = { overview:'Tu sitio, bajo control.', catalog:'Tecnología que merece conocerse.', families:'Una solución para cada necesidad.', brands:'Marcas que nos respaldan.', media:'La imagen de tu experiencia.', shared:'Los detalles también comunican.', 'catalog-pages':'Cada especialidad, en su lugar.' };
let toastTimer, publicationTimer;
const paths = {
  overview:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  page:'M14 2H5v20h14V7z M14 2v5h5 M8 12h8 M8 16h6',
  catalog:'m12 3 9 5-9 5-9-5z M3 8v9l9 5 9-5V8 M12 13v9',
  families:'M3 7V4h6l3 3h9v13H3z',
  brands:'M20 13 11 22 2 13V3h10z M7 8h.01',
  media:'M3 3h18v18H3z M3 16l6-6 6 6 3-3 3 3 M16 7h.01',
  shared:'M4 6h16 M4 12h16 M4 18h16 M8 4v4 M16 10v4 M10 16v4',
  arrow:'M5 19 19 5 M5 5h14v14',
  check:'m5 12 4 4L19 6',
  spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',
  home:'m3 10 9-7 9 7v11h-7v-7h-4v7H3z',
  about:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  training:'m2 8 10-5 10 5-10 5z M6 10v7c4 3 8 3 12 0v-7 M22 8v7',
  support:'M14 6a5 5 0 0 0-6 6L3 17a2.8 2.8 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-3-3z',
  contact:'M21 11a8 8 0 0 1-8 8H7l-5 3V11a9 9 0 0 1 19 0 M7 10h10 M7 14h6',
  privacy:'m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6z m-4 10 3 3 5-6',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.page}"/></svg>`;
const number = value => new Intl.NumberFormat('es-MX').format(value);
const hasUnsaved = () => state.dirty || state.editorDirty || state.translating || state.saving || state.uploading;
const textValue = row => state.visualDrafts[row.id] ?? (row.translation?.state==='pending' ? row.translation.value : row.value);
function clearPageDrafts() { state.visualDrafts={};state.visualMediaDrafts={};state.dirty=false; }
function setTextDraft(row,value) {
  const original=row.translation?.state==='pending' ? row.translation.value : row.value;
  if(value===original)delete state.visualDrafts[row.id];else state.visualDrafts[row.id]=value;
  state.dirty=Boolean(Object.keys(state.visualDrafts).length || Object.keys(state.visualMediaDrafts).length);
}
function setMediaDraft(row,value) {
  if(value.file===row.file && value.title===row.title)delete state.visualMediaDrafts[row.id];else state.visualMediaDrafts[row.id]=value;
  state.dirty=Boolean(Object.keys(state.visualDrafts).length || Object.keys(state.visualMediaDrafts).length);
}
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
function button(label, action, cls = 'button quiet') { return `<button type="button" class="${cls}" data-action="${action}">${label}</button>`; }
function heading(title, subtitle, action = '') { return `<div class="page-heading"><div><p class="eyebrow">ETAPEL / TU ESPACIO DE CONTENIDO</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle)}</p></div>${action}</div>`; }
const localeName = code => locales.find(locale => locale.code === code)?.name || code;
const translationLocale = () => state.locale === 'es' ? state.translationLocale : state.locale;
const translatedScope = (page, locale) => page.startsWith('es:') ? page.replace(/^es:/, `${locale}:`) : languagePath(page, locale);
function languageBar() {
  return `<div class="language-bar"><span>IDIOMA DE EDICIÓN</span><div>${locales.map(locale => `<button data-locale="${locale.code}" class="${state.locale === locale.code ? 'active' : ''}" aria-pressed="${state.locale === locale.code}">${locale.name}</button>`).join('')}</div><small>Español es el original. Edita y valida cada idioma.</small></div>`;
}
function pageRows(view) {
  const page = pages.find(p => p[0] === view);
  const route = page ? languagePath(page[2], state.locale) : view === 'shared' ? `${state.locale}:` : state.catalogPage;
  return collection('texts').filter(row => row.locale === state.locale && (view === 'shared' ? row.page.startsWith(route) : row.page === route));
}
function sourceScopes(view = currentView()) {
  if (view === 'shared') return ['es:navigation', 'es:footer'];
  const page = pages.find(page => page[0] === view);
  return [page ? page[2] : languagePath(state.catalogPage || '/linea-de-producto', 'es')];
}
function translationSelector() {
  return state.locale === 'es' ? `<label class="translation-target">Traducir a<select data-translation-target aria-label="Idioma de traducción">${locales.filter(locale => locale.code !== 'es').map(locale => `<option value="${locale.code}" ${translationLocale() === locale.code ? 'selected' : ''}>${locale.name}</option>`).join('')}</select></label>` : '';
}
function staleTranslation(row) { return row.translation?.state==='pending' && row.translation.source_hash!==state.translationHashes[row.translation.source_scope]; }
function translationPanel(view) {
  const rows = pageRows(view), pending = rows.filter(row => row.translation?.state === 'pending').length, stale = rows.some(staleTranslation);
  return `<div class="translation-panel"><span class="translation-mark">ES <span>→</span> ${translationLocale().toUpperCase()}</span><div><b>${state.locale === 'es' ? 'Escribe en español. Elige el idioma de traducción.' : pending ? `${pending} propuestas listas para tu revisión` : `Versión ${localeName(state.locale)}`}</b><p>${stale ? 'El español cambió. Genera de nuevo la traducción para poder validarla.' : state.locale === 'es' ? 'Al guardar, se prepara un borrador en el idioma seleccionado. Tú decides cuándo validarlo.' : 'Compara con el original, ajusta y valida. Los borradores no cambian el contenido publicado.'}</p><span id="translation-status" role="status">${state.translating ? 'Traduciendo… Puede tardar unos segundos.' : escapeHtml(state.translationError || '')}</span></div>${translationSelector()}<button type="button" class="button translate-button" data-action="translate-page" ${!state.config.translationReady || state.translating ? 'disabled' : ''}>${state.translating ? 'Traduciendo…' : state.locale === 'es' ? 'Traducir' : 'Volver a traducir'} ${icon('spark')}</button></div>`;
}
function translatedField(row) {
  const draft=row.translation,stateLabel=staleTranslation(row) ? 'ESPAÑOL MODIFICADO' : draft?.state==='pending' ? 'POR VALIDAR' : 'EDITABLE';
  const value=textValue(row);
  const sources=(draft?.source_ids || []).map(id=>collection('texts').find(source=>source.id===id)?.value).filter(value=>value!==undefined);
  return `<div class="translation-pair">${sources.length ? `<label class="source-field"><span class="field-heading">Español · Original<small>ES</small></span><textarea readonly rows="${value.length>150 ? 5 : 3}" aria-label="Original español">${escapeHtml(sources.join('\n\n'))}</textarea></label>` : `<div class="source-field source-placeholder"><span>ESPAÑOL → ${escapeHtml(localeName(state.locale).toUpperCase())}</span><p>Genera una traducción para ver aquí el original español correspondiente.</p></div>`}<label class="editable-field"><span class="field-heading">${escapeHtml(row.label)}<small class="${draft?.state==='pending' ? 'needs-review' : ''}">${stateLabel}</small></span><textarea name="${row.id}" rows="${value.length>150 ? 5 : 3}" maxlength="12000">${escapeHtml(value)}</textarea></label></div>`;
}
function renderTexts(view) {
  const rows=pageRows(view),groups=new Map(),translated=state.locale!=='es';
  for(const row of rows){if(!groups.has(row.section))groups.set(row.section,[]);groups.get(row.section).push(row);}
  return `<form id="texts-form"><div class="content-toolbar"><p><b>${rows.length}</b> textos · ${translated ? 'Revisa, ajusta y valida antes de publicar.' : 'El español es la fuente de la traducción.'}</p><button type="submit" class="button orange" ${state.translating || (translated && rows.some(staleTranslation)) ? 'disabled' : ''}>${translated ? `Validar y guardar · ${localeName(state.locale)}` : state.config.translationReady ? 'Guardar y traducir' : 'Guardar la página'} <span>↗</span></button></div><p id="texts-error" class="error" role="alert"></p>${[...groups].map(([section,fields],index)=>`<details class="text-section" ${index===0 ? 'open' : ''}><summary><span>${escapeHtml(section)}</span><small>${fields.length} textos <span>＋</span></small></summary><div class="text-grid ${translated ? 'review-grid' : ''}">${fields.sort((a,b)=>a.sort-b.sort).map(row=>translated ? translatedField(row) : `<label class="editable-field"><span class="field-heading">${escapeHtml(row.label)}<small>ESPAÑOL</small></span><textarea name="${row.id}" rows="${row.value.length>150 ? 4 : 2}" maxlength="12000">${escapeHtml(textValue(row))}</textarea></label>`).join('')}</div></details>`).join('')}${!rows.length ? '<div class="empty">No hay textos en esta página.</div>' : ''}</form>`;
}
function mergeTextRecords(records) {
  for(const record of records){const index=collection('texts').findIndex(row=>row.id===record.id);if(index>=0)state.content.etapel_texts[index]=record;}
  if(records.length){state.pending=true;state.version++;}
}
async function generateTranslation({ force = false } = {}) {
  if (state.translating) return;
  if (state.dirty) { notify('Guarda los cambios de esta página antes de generar la traducción.'); return; }
  const view = currentView(), scopes = sourceScopes(view), locale = translationLocale();
  state.translating = true; state.translationError = ''; render();
  try {
    let pending = 0;
    for (const page of scopes) {
      const result = await request('/api/translations/propose', { method: 'POST', body: JSON.stringify({ page, locale, force }) });
      mergeTextRecords(result.records); pending += result.pending;
    }
    state.locale = locale;
    if (view === 'catalog-pages') state.catalogPage = languagePath(scopes[0], locale);
    notify(`${pending} propuestas en ${localeName(locale)} listas para revisar. Valídalas antes de publicar.`);
  } catch (error) { state.translationError = error.message; notify(error.message); }
  finally { state.translating = false; render(); }
}

function overview() {
  const count = name => collection(name).filter(r => r.status === 'published').length;
  const drafts = collection('products').filter(r => r.status === 'draft').length;
  const pendingTranslations=collection('texts').filter(row=>row.translation?.state==='pending').length;
  const published = !state.pending && !pendingTranslations && state.liveHash && state.liveHash === state.hash;
  const publication = state.publishing ? 'Publicación en curso' : pendingTranslations ? `${pendingTranslations} traducciones por validar` : !state.liveHash && !state.pending ? 'Publicación por verificar' : published ? 'Todo está al día' : 'Cambios por publicar';
  const firstName = escapeHtml((state.user?.name || 'equipo').split(' ')[0]);
  return `<div class="dashboard-intro"><div><p class="eyebrow">TU ESPACIO. TU IMPACTO.</p><h1>Vamos con todo, ${firstName}<span>.</span></h1><p>Todo lo que necesitas para llevar Etapel al siguiente nivel.</p></div><a class="button quiet" href="${escapeHtml(state.config.site)}" target="_blank" rel="noopener">Ver mi sitio ${icon('arrow')}</a></div>
  <div class="dashboard-grid"><section class="overview-hero"><div class="hero-copy"><span class="hero-label">${icon('spark')} ETAPEL EN MOVIMIENTO</span><h2>Haz que<br>tu experiencia<br><em>se vea.</em></h2><p>Tu catálogo. Tu equipo. Tu historia.<br>Dale fuerza a lo que viene.</p><div class="hero-actions"><a class="button white" href="#home">Editar mi inicio ${icon('arrow')}</a><a class="hero-link" href="#catalog">Ir al catálogo <span>→</span></a></div></div><div class="hero-photo"><img src="/assets/painting.webp" alt="Especialista en aplicación de pintura automotriz" fetchpriority="high"><span>TECNOLOGÍA QUE TRANSFORMA.</span></div><span class="hero-stamp" aria-hidden="true">DALE<br>EL SIGUIENTE<br><b>IMPULSO ↗</b></span></section>
  <section class="publication-card"><div class="panel-heading"><h2>EN VIVO</h2><span class="status-dot"></span></div><div class="publication-body"><div class="publication-signal ${published ? 'is-live' : ''}">${icon(published ? 'check' : 'arrow')}</div><span class="badge ${published ? 'published' : 'draft'}" id="overview-publication">${publication}</span><h3>${pendingTranslations ? 'Traducciones.<br>Por validar.' : published ? 'Tu sitio.<br>En línea.' : 'Tu próxima<br>gran versión.'}</h3><p>${pendingTranslations ? 'Las traducciones esperan tu visto bueno. Las versiones publicadas se conservan.' : published ? 'Tu contenido guardado ya está en línea. ¿Qué sigue?' : 'Guarda tus cambios y compártelos con el mundo cuando estén listos.'}</p><button class="button orange" data-action="publish-site" ${!state.config.publishReady || state.publishing ? 'disabled' : ''}>${state.publishing ? 'Publicando…' : 'Publicar sitio'} ${icon('arrow')}</button><small>${drafts ? `${number(drafts)} producto${drafts === 1 ? '' : 's'} en borrador, fuera del sitio.` : 'Guardar prepara. Publicar conecta.'}</small></div></section></div>
  <div class="stats">${[['catalog','catalog','Productos publicados',count('products'),'Explorar catálogo','blue'],['families','families','Familias de producto',count('families'),'Organizar soluciones','orange'],['page','home','Textos editables',collection('texts').length,'6 idiomas','violet'],['media','media','Imágenes del sitio',collection('media').length,'Abrir biblioteca','green']].map(([symbol,view,label,value,note,tone])=>`<article class="stat-${tone}"><a href="#${view}" class="stat-link"><div class="stat-top"><span class="stat-icon">${icon(symbol)}</span><span class="stat-arrow">${icon('arrow')}</span></div><b>${number(value)}</b><span class="stat-label">${label}</span><small>${note} <span>→</span></small></a></article>`).join('')}</div>
  <div class="section-heading"><div><p class="eyebrow">MENOS VUELTAS. MÁS ACCIÓN.</p><h2>¿Qué movemos hoy?</h2></div><span>ELIGE TU SIGUIENTE PASO ${icon('arrow')}</span></div><div class="shortcut-grid">${[['home','01','Una portada con fuerza.','Dale a tu historia el mejor primer vistazo.','precision.webp'],['catalog','02','Productos que destacan.','Cada solución, con todos sus detalles.','jet-x.webp'],['media','03','Que tus imágenes hablen.','Renueva la forma de mostrar tu experiencia.','painting.webp']].map(([view,n,title,copy,photo]) => `<a class="shortcut shortcut-${view}" href="#${view}"><div class="shortcut-photo"><img src="/assets/${photo}" alt="" loading="lazy"><span>${n}</span><i>${icon('arrow')}</i></div><div class="shortcut-copy"><h3>${title}</h3><p>${copy}</p><b>${view === 'home' ? 'Editar inicio' : view === 'catalog' ? 'Ver productos' : 'Abrir biblioteca'} <span>→</span></b></div></a>`).join('')}</div><div class="workflow-note">${icon('spark')}<div><b>Lo que haces merece verse.</b><p>Guarda en el Studio. Publica en tu sitio. Sigue avanzando.</p></div><span>HECHO PARA ETAPEL ↗</span></div>`;
}
function filters(showFamily = false) {
  return `<div class="collection-filters"><label>Estado<select id="status-filter"><option value="">Todos los estados</option>${[['published','Publicados'],['draft','Borradores'],['archived','Archivados']].map(([value,label])=>`<option value="${value}" ${state.status === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label>${showFamily ? `<label>Familia<select id="family-filter"><option value="">Todas las familias</option>${collection('families').map(row=>`<option value="${escapeHtml(row.payload.slug)}" ${state.family === row.payload.slug ? 'selected' : ''}>${escapeHtml(row.payload.title)}</option>`).join('')}</select></label>` : ''}</div>`;
}
function paginate(rows) {
  const size = currentView() === 'media' ? 24 : 25, total = Math.max(1,Math.ceil(rows.length / size));
  state.page = Math.min(Math.max(state.page,1),total);
  return { rows: rows.slice((state.page - 1) * size, state.page * size), footer: `<div class="pagination"><span>${number(rows.length)} ${currentView() === 'media' ? 'imágenes' : 'fichas'} · Página ${state.page} de ${total}</span><div><button class="button quiet" data-action="previous" ${state.page === 1 ? 'disabled' : ''}>← Anterior</button><button class="button quiet" data-action="next" ${state.page === total ? 'disabled' : ''}>Siguiente →</button></div></div>` };
}
function renderCollection(view) {
  const names = { catalog:'products', families:'families', brands:'brands' }, name = names[view];
  const filtered = collection(name).filter(row => `${row.payload.name || row.payload.title} ${row.payload.brand || ''} ${row.payload.slug}`.toLowerCase().includes(state.query.toLowerCase()) && (!state.status || row.status === state.status) && (view !== 'catalog' || !state.family || row.payload.familySlug === state.family)).sort((a,b)=>(a.sort || 0)-(b.sort || 0));
  const page = paginate(filtered);
  return `${heading(titles[view], 'Edita las fichas y su estado. Los cambios aparecerán en el sitio después de publicar.', button('＋ ' + ({ catalog:'Nuevo producto', families:'Nueva familia', brands:'Nueva marca' }[view]),'new','button orange'))}<div class="list-toolbar"><span>${filtered.length} fichas</span><label class="search"><span>Buscar</span><input id="collection-search" type="search" placeholder="Nombre o marca…" value="${escapeHtml(state.query)}"></label></div>${filters(view === 'catalog')}<div class="table-panel"><div class="table-scroll"><table><thead><tr><th>${view === 'catalog' ? 'PRODUCTO' : 'CONTENIDO'}</th><th>${view === 'catalog' ? 'MARCA / FAMILIA' : 'ORDEN'}</th><th>ESTADO</th><th></th></tr></thead><tbody>${page.rows.map(row => `<tr><td><div class="record-name">${row.payload.image ? `<img src="${escapeHtml(imageFor(row.payload.image))}" alt="" loading="lazy">` : '<span class="record-letter">'+escapeHtml((row.payload.name || row.payload.title).slice(0,1))+'</span>'}<div><b>${escapeHtml(row.payload.name || row.payload.title)}</b><small>${escapeHtml(row.payload.summary?.slice(0,100) || row.payload.pageDescription?.slice(0,100) || row.payload.note || '')}</small></div></div></td><td>${escapeHtml(view === 'catalog' ? row.payload.brand : row.sort)}${view === 'catalog' ? `<small class="family-name">${escapeHtml(collection('families').find(f => f.payload.slug === row.payload.familySlug)?.payload.title || '')}</small>` : ''}</td><td><span class="badge ${row.status}">${({ published:'Publicado',draft:'Borrador',archived:'Archivado' })[row.status]}</span></td><td><button class="edit-button" data-edit="${row.id}" data-collection="${name}">Editar ↗</button></td></tr>`).join('')}</tbody></table></div>${!filtered.length ? '<div class="empty">No se encontraron fichas.</div>' : ''}${page.footer}</div>`;
}
function renderMedia() {
  const filtered = collection('media').filter(row => `${row.title} ${row.page} ${row.source}`.toLowerCase().includes(state.query.toLowerCase()));
  const page = paginate(filtered);
  return `${heading(titles.media,'Sube tus fotografías y elígelas para las páginas, productos y familias.',button('↑ Subir fotos','upload-media','button orange'))}<div class="media-upload-zone" data-photo-dropzone><span class="upload-symbol" aria-hidden="true">↑</span><div><h2>Sube tus fotografías</h2><p>Elige varias fotos de tu equipo o arrástralas aquí.</p><small>JPG, PNG, WebP o AVIF · Hasta 25 MB por foto.</small></div>${button('Elegir fotos','upload-media','button orange')}</div><p id="media-upload-status" class="photo-upload-status" role="status" aria-live="polite"></p><div class="list-toolbar"><span>${filtered.length} imágenes</span><label class="search"><span>Buscar</span><input id="collection-search" type="search" placeholder="Imagen, producto o página…" value="${escapeHtml(state.query)}"></label></div><div class="media-grid">${page.rows.map(row => `<article class="media-card"><div class="media-image"><img src="${escapeHtml(imageUrl(row))}" alt="${escapeHtml(row.title)}" loading="lazy">${row.file ? '<span class="badge published">Actualizada</span>' : ''}</div><div><b>${escapeHtml(row.title)}</b><small>${escapeHtml(row.page === '/' ? 'Inicio' : row.page)}</small><button class="edit-button" data-edit="${row.id}" data-collection="media">Cambiar imagen ↗</button></div></article>`).join('')}</div>${!filtered.length ? '<div class="empty">No se encontraron imágenes.</div>' : ''}${page.footer}`;
}
function render() {
  visualEditor?.destroy();visualEditor=null;
  const view = currentView();
  const pageEditor=pages.some(p=>p[0]===view) || ['shared','catalog-pages'].includes(view);
  $('#main').classList.toggle('visual-page',pageEditor && state.editorMode==='visual');
  $('#breadcrumb').textContent = navigation.find(n => n[0] === view)?.[1] || 'Resumen';
  $('#navigation').innerHTML = navigation.map(([key,name]) => `${({overview:'MI ESPACIO',home:'PÁGINAS DEL SITIO',catalog:'CATÁLOGO Y RECURSOS'})[key] ? `<span class="nav-label">${({overview:'MI ESPACIO',home:'PÁGINAS DEL SITIO',catalog:'CATÁLOGO Y RECURSOS'})[key]}</span>` : ''}<a href="#${key}" class="${view === key ? 'active' : ''}" ${view === key ? 'aria-current="page"' : ''}><span class="nav-icon">${icon(key)}</span>${name}${view === key ? '<i></i>' : ''}</a>`).join('');
  let html;
  if (['catalog','families','brands'].includes(view)) html = renderCollection(view);
  else if (view === 'media') html = renderMedia();
  else if (pages.some(p => p[0] === view) || ['shared','catalog-pages'].includes(view)) {
    let selector = '';
    if (view === 'catalog-pages') {
      const paths = [...new Set(collection('texts').filter(r => r.locale === state.locale && languagePath(r.page, 'es').startsWith('/linea-de-producto')).map(r => r.page))].sort();
      if (!paths.includes(state.catalogPage)) state.catalogPage = paths[0];
      selector = `<label class="page-selector">Página del catálogo<select id="catalog-page">${paths.map(path => `<option ${path === state.catalogPage ? 'selected' : ''}>${escapeHtml(path)}</option>`).join('')}</select></label>`;
    }
    const page = pages.find(p => p[0] === view), route = view==='shared' ? languagePath('/',state.locale) : (page ? languagePath(page[2],state.locale) : null) || state.catalogPage || '/';
    const modes=`<div class="page-editor-modes"><button class="button ${state.editorMode==='visual' ? 'selected' : 'quiet'}" data-action="editor-visual">Vista visual</button><button class="button ${state.editorMode==='fields' ? 'selected' : 'quiet'}" data-action="editor-fields">Textos y SEO</button><a class="button quiet" href="${escapeHtml(sitePath(route))}" target="_blank" rel="noopener">Ver sitio ↗</a></div>`;
    html = `${heading(page?.[1] || titles[view], 'Tu página real. Haz clic en un texto o una fotografía para editar.',modes)}${languageBar()}${selector}${state.editorMode==='visual' ? visualEditorMarkup({route,locale:state.locale,translationReady:state.config.translationReady,translationLocale:translationLocale(),translationSelector:translationSelector(),translating:state.translating,stale:state.locale!=='es' && pageRows(view).some(staleTranslation)}) : translationPanel(view)+renderTexts(view)}${state.translationError ? `<p class="error">${escapeHtml(state.translationError)}</p>` : ''}`;
    state.visualRoute=route;
  } else html = overview();
  $('#main').innerHTML = html;
  $('#main').querySelectorAll('textarea,input,select').forEach(field => field.addEventListener('input', () => { if (field.closest('#texts-form')) { const row=collection('texts').find(row=>row.id===field.name);if(row)setTextDraft(row,field.value); } }));
  const root=$('.visual-editor');
  if(root)visualEditor=mountVisualEditor(root,{route:state.visualRoute,locale:state.locale,rows:pageRows(view),allTexts:collection('texts'),media:collection('media'),drafts:state.visualDrafts,mediaDrafts:state.visualMediaDrafts,prefs:state.visualPrefs,imageUrl,onText:setTextDraft,onMedia:setMediaDraft,onSave:()=>savePage(pageRows(view).map(row=>[row.id,textValue(row)])),notify});
  if(state.translating){const editor=root || $('#texts-form');if(editor){editor.inert=true;editor.setAttribute('aria-busy','true');}if(root)root.insertAdjacentHTML('beforebegin','<p class="visual-translation-progress" role="status">Traducción en curso. Preparando el idioma seleccionado para tu revisión…</p>');}
}
async function reload() { const data = await request('/api/content'); state.content = data.content; state.hash = data.hash; state.translationHashes = data.translationHashes || {}; }
async function enter() {
  const [user, config] = await Promise.all([request('/api/session'),request('/api/config')]);
  state.config = config; state.user = user; $('#account-name').textContent = user.name || user.email; $('#visit-site').href = config.site;
  $('.account-avatar').textContent = (user.name || user.email || 'E').slice(0,1).toUpperCase();
  $('#today').dateTime = new Date().toISOString().slice(0,10);
  $('#today').textContent = new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
  await reload();
  state.liveHash = (await request('/api/publication').catch(()=>({hash:null}))).hash;
  $('#login-view').hidden = true; $('#studio-view').hidden = false; $('#publish').disabled = !config.publishReady; render();
}
function field(label, name, value, { type = 'text', rows, required = false, disabled = false, help = '' } = {}) {
  return `<label class="editable-field"><span class="field-heading">${label}<small>EDITABLE</small></span>${rows ? `<textarea name="${name}" rows="${rows}" ${required ? 'required' : ''}>${escapeHtml(value)}</textarea>` : `<input name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''} ${disabled ? 'readonly' : ''}>`}${help ? `<small class="field-help">${help}</small>` : ''}</label>`;
}
function mediaSelector(path) { return `<section class="photo-selector"><label class="editable-field"><span class="field-heading">Fotografía de portada<small>EDITABLE</small></span><select name="image">${path && !collection('media').some(row=>row.source===path) ? `<option value="${escapeHtml(path)}" selected>Fotografía actual</option>` : ''}${collection('media').map(row => `<option value="${escapeHtml(row.source)}" ${path === row.source ? 'selected' : ''}>${escapeHtml(row.title)}</option>`).join('')}</select></label><img class="editor-preview" id="editor-image-preview" src="${escapeHtml(imageFor(path))}" alt="Vista previa de la fotografía">${button('↑ Subir foto de portada','upload-cover','button orange')}<small class="field-help">Elige una imagen de tu equipo o de la biblioteca. JPG, PNG, WebP o AVIF · Hasta 25 MB por foto.</small></section>`; }
function galleryOption(row, checked = false) { return `<label><input type="checkbox" name="gallery" value="${escapeHtml(row.source)}" ${checked ? 'checked' : ''}><img src="${escapeHtml(imageUrl(row))}" alt="" loading="lazy"><span>${escapeHtml(row.title)}</span></label>`; }
function pairs(name, values, labels) {
  return `<section class="pair-section" data-pairs="${name}"><h3>${labels[0]}</h3><div class="pair-rows">${values.map(row => pairRow(row,labels)).join('')}</div><button class="button quiet" type="button" data-add-pair="${name}">＋ Añadir fila</button></section>`;
}
function pairRow(row = {}, labels) { return `<div class="pair-row"><input aria-label="${labels[1]}" placeholder="${labels[1]}" data-pair-key value="${escapeHtml(Object.values(row)[0] || '')}"><textarea aria-label="${labels[2]}" placeholder="${labels[2]}" data-pair-value rows="2">${escapeHtml(Object.values(row)[1] || '')}</textarea><button type="button" class="icon-button" data-remove-pair aria-label="Quitar fila">×</button></div>`; }
const pairLabels = { specs:['Ficha técnica','Característica','Valor'], variants:['Variantes','Nombre','Detalle'], detailBlocks:['Bloques de detalle','Título','Descripción'], downloads:['Documentos y descargas','Título del documento','Enlace HTTPS'] };
function edit(name, id = null) {
  if(state.uploading){notify('Espera a que terminen de subir las fotografías.');return;}
  const row = id ? collection(name).find(r => r.id === id) : null;
  const family = collection('families').find(r => r.status === 'published')?.payload.slug;
  const defaults = name === 'products' ? { slug:'',name:'',brand:'ETAPEL',familySlug:family,category:'',technology:'',application:'',summary:'',description:'',summaryEn:'',descriptionEn:'',image:collection('media')[0]?.source,gallery:[],badges:[],specs:[],variants:[],highlights:[],detailBlocks:[],downloads:[] } : name === 'families' ? { slug:'',title:'',shortTitle:'',href:'',menuDescription:'',pageDescription:'',image:collection('media')[0]?.source,accent:'',items:[] } : { name:'',slug:'',note:'' };
  state.editing = { name, row, payload: structuredClone(row?.payload || defaults) }; state.editorDirty = false;
  const p = state.editing.payload;
  $('#editor-title').textContent = name === 'media' ? 'La fotografía correcta.' : row ? p.name || p.title : 'Una nueva ficha.';
  $('#editor-kind').textContent = ({products:'PRODUCTOS',families:'FAMILIAS DE PRODUCTO',brands:'MARCAS',media:'BIBLIOTECA DE IMÁGENES'})[name];
  let html = '';
  if (name === 'media') html = `<img class="editor-preview large" src="${escapeHtml(imageUrl(row))}" alt="${escapeHtml(row.title)}">${field('Descripción de la imagen','title',row.title,{ required:true })}<p class="notice">Esta fotografía se utiliza en el sitio. Al cambiarla se actualizarán todos sus usos después de publicar.</p>${button('Elegir una nueva imagen','replace-image','button orange')}<p class="field-help">JPG, PNG, WebP o AVIF · Máximo 25 MB.</p><input name="file" type="hidden" value="${row.file || ''}">`;
  else if (name === 'products') {
    html = `<div class="editor-grid">${field('Nombre del producto','name',p.name,{required:true})}${field('Marca','brand',p.brand,{required:true})}${field('Dirección del producto','slug',p.slug,{required:true,disabled:!!row,help:row ? 'Conservamos el enlace actual del producto.' : 'Minúsculas y guiones, por ejemplo: nueva-pistola-sata.'})}<label class="editable-field"><span class="field-heading">Familia<small>EDITABLE</small></span><select name="familySlug">${collection('families').filter(r=>r.status === 'published').map(r=>`<option value="${r.payload.slug}" ${r.payload.slug === p.familySlug ? 'selected' : ''}>${escapeHtml(r.payload.title)}</option>`).join('')}</select></label></div>${field('Resumen · Español','summary',p.summary,{rows:3,required:true})}${field('Descripción · Español','description',p.description,{rows:5,required:true})}<details class="editor-details"><summary>Versión inglesa</summary>${field('Summary · English','summaryEn',p.summaryEn || '',{rows:3})}${field('Description · English','descriptionEn',p.descriptionEn || '',{rows:5})}</details>${mediaSelector(p.image)}<details class="editor-details" data-photo-gallery open><summary>Galería de fotografías</summary>${button('↑ Subir fotos a la galería','upload-gallery','button orange')}<p class="field-help">Puedes subir varias fotos a la vez. La portada se añade como primera fotografía. Guarda la ficha para conservar la selección.</p><div class="gallery-options">${collection('media').map(row=>galleryOption(row,p.gallery.includes(row.source))).join('')}</div></details><div class="editor-grid">${field('Categoría','category',p.category)}${field('Línea de catálogo','catalogLine',p.catalogLine || '')}${field('Tecnología','technology',p.technology)}${field('Aplicación','application',p.application)}</div><details class="editor-details"><summary>Organización y detalles del catálogo</summary><div class="editor-grid">${field('Sección','catalogSection',p.catalogSection || '')}${field('Sublínea','catalogSubline',p.catalogSubline || '')}${field('Orden en catálogo','catalogOrder',p.catalogOrder ?? 0,{type:'number'})}${field('Patrón de aplicación','sprayPattern',p.sprayPattern || '')}${field('Tecnología de boquilla','nozzleTechnology',p.nozzleTechnology || '')}${field('Interés','interest',p.interest || '')}</div>${field('Etiquetas · una por línea','badges',(p.badges || []).join('\n'),{rows:3})}${field('Refacciones · una por línea','spareParts',(p.spareParts || []).join('\n'),{rows:3})}${field('Mensajes de galería · uno por línea','highlightSlides',(p.highlightSlides || []).join('\n'),{rows:3})}${field('Página del fabricante','sourceUrl',p.sourceUrl || '',{type:'url'})}</details>${field('Puntos destacados · uno por línea','highlights',p.highlights.join('\n'),{rows:4})}${pairs('specs',p.specs,pairLabels.specs)}${pairs('variants',p.variants,pairLabels.variants)}${pairs('detailBlocks',p.detailBlocks,pairLabels.detailBlocks)}${pairs('downloads',(p.downloads||[]).filter(d=>typeof d !== 'string').map(d=>({label:d.label,url:d.url})),pairLabels.downloads)}`;
  } else if (name === 'families') html = `${field('Nombre de la familia','title',p.title,{required:true})}${field('Nombre corto','shortTitle',p.shortTitle,{required:true})}${field('Dirección de la familia','slug',p.slug,{required:true,disabled:!!row})}${field('Descripción en el menú','menuDescription',p.menuDescription,{rows:3})}${field('Descripción de la página','pageDescription',p.pageDescription,{rows:4})}${mediaSelector(p.image)}${field('Especialidades · una por línea','items',p.items.join('\n'),{rows:5})}`;
  else html = `${field('Nombre de la marca','name',p.name,{required:true})}${field('Identificador','slug',p.slug,{required:true,disabled:!!row})}${field('Texto complementario','note',p.note || '')}`;
  if (name !== 'media') html += `<div class="editor-grid"><label class="editable-field"><span class="field-heading">Estado<small>EDITABLE</small></span><select name="status">${[['draft','Borrador'],['published','Publicado'],['archived','Archivado']].map(([v,l])=>`<option value="${v}" ${(row?.status || 'draft') === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>${field('Orden de aparición','sort',row?.sort ?? collection(name).length,{type:'number'})}</div><p class="notice">Guardar conserva tu ficha en el Studio. «Publicar sitio» actualiza la web. Las fichas en borrador o archivadas no se incluyen.</p>`;
  $('#editor-fields').innerHTML = html; $('#editor-error').textContent = ''; $('#editor-photo-status').textContent = ''; $('#editor').showModal();
}
function closeEditor(force = false) { if(state.uploading){notify('Espera a que terminen de subir las fotografías.');return;} if (!force && state.editorDirty && !confirm('Tienes cambios sin guardar. ¿Quieres cerrar la ficha?')) return; $('#editor').close(); state.editing = null; state.editorDirty = false; }
function lines(value) { return String(value || '').split('\n').map(v=>v.trim()).filter(Boolean); }
async function saveRecord(name,row,values) {
  const saved = await request(`/api/records/etapel_${name}${row ? '/' + row.id : ''}`, { method:row ? 'PATCH' : 'POST', body:JSON.stringify({ ...values, revision:row?.revision || 0 }) });
  state.pending = true; state.version++;
  const rows = collection(name), index = rows.findIndex(r=>r.id === saved.id);
  if (index >= 0) rows[index] = saved; else rows.push(saved);
  return saved;
}
$('#login-form').addEventListener('submit', async event => {
  event.preventDefault(); const formElement = event.currentTarget, submit = formElement.querySelector('button'); submit.disabled = true; $('#login-error').textContent = '';
  try { const form = new FormData(formElement); await request('/api/login',{method:'POST',body:JSON.stringify(Object.fromEntries(form))}); formElement.reset(); await enter(); }
  catch(error) { $('#login-error').textContent = error.message; } finally { submit.disabled = false; }
});
$('#logout').addEventListener('click',async()=>{if(state.uploading){notify('Espera a que terminen de subir las fotografías.');return;}if(hasUnsaved() && !confirm('Tienes cambios sin guardar. ¿Quieres salir?'))return;await request('/api/logout',{method:'POST',body:'{}'});state.content={};clearPageDrafts();visualEditor?.destroy();clearInterval(publicationTimer);$('#studio-view').hidden=true;$('#login-view').hidden=false;});
window.addEventListener('beforeunload',event=>{if(hasUnsaved()){event.preventDefault();event.returnValue='';}});
window.addEventListener('hashchange',()=>{if(state.translating || state.saving || state.uploading){history.replaceState(null,'','#'+state.lastView);notify(state.uploading ? 'Espera a que terminen de subir las fotografías.' : 'La traducción sigue en curso. Espera a que termine.');return;}if(state.dirty && !confirm('Hay textos sin guardar. ¿Quieres cambiar de sección?')){history.replaceState(null,'','#'+state.lastView);return;}clearPageDrafts();state.translationError='';state.query='';state.status='';state.family='';state.page=1;state.lastView=currentView();setNav(false);render();});
function setNav(open) { $('#sidebar').classList.toggle('open',open); $('#nav-backdrop').hidden=!open; $('#mobile-menu').setAttribute('aria-expanded',String(open)); }
$('#mobile-menu').onclick=()=>setNav(true);
$('#nav-backdrop').onclick=()=>setNav(false);
window.addEventListener('keydown',event=>{if(event.key==='Escape' && $('#sidebar').classList.contains('open')){setNav(false);$('#mobile-menu').focus();}});
$('#main').addEventListener('click',event=>{
  const editButton=event.target.closest('[data-edit]'); if(editButton)return edit(editButton.dataset.collection,editButton.dataset.edit);
  const action=event.target.closest('[data-action]')?.dataset.action;
  if(action==='editor-visual' || action==='editor-fields'){state.editorMode=action==='editor-visual' ? 'visual' : 'fields';render();return;}
  if(action==='translate-page'){generateTranslation({force:state.locale!=='es'});return;}
  if(action==='publish-site'){if(!$('#publish').disabled)$('#publish').click();return;}
  if(action==='previous' || action==='next'){state.page+=action==='next'?1:-1;render();$('#main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});return;}
  if(action==='new')return edit(({catalog:'products',families:'families',brands:'brands'})[currentView()]);
  if(action==='upload-media')choosePhotos('library');
  const locale=event.target.closest('[data-locale]')?.dataset.locale;
  if(locale){if(state.translating){notify('Espera a que termine la traducción.');return;}if(state.dirty && !confirm('¿Cambiar de idioma sin guardar?'))return;if(!locales.some(item=>item.code===locale))return;if(currentView()==='catalog-pages')state.catalogPage=languagePath(state.catalogPage,locale);state.locale=locale;if(locale!=='es')state.translationLocale=locale;clearPageDrafts();render();}
});
$('#main').addEventListener('input',event=>{
  if(event.target.id==='collection-search'){
    const position=event.target.selectionStart;state.query=event.target.value;state.page=1;render();const input=$('#collection-search');input.focus();try{input.setSelectionRange(position,position);}catch{}
  }
});
$('#main').addEventListener('change',event=>{if(event.target.matches('[data-translation-target]')){if(state.translating)return;state.translationLocale=event.target.value;render();return;}if(['status-filter','family-filter'].includes(event.target.id)){state[event.target.id==='status-filter'?'status':'family']=event.target.value;state.page=1;render();return;}if(event.target.id==='catalog-page'){if(state.translating){notify('Espera a que termine la traducción.');render();return;}if(state.dirty && !confirm('¿Cambiar de página sin guardar?'))return;state.catalogPage=event.target.value;clearPageDrafts();render();}});
async function savePage(entries) {
  if(state.translating || state.saving)return;
  state.saving=true;
  const workspace=$('.visual-editor') || $('#texts-form');if(workspace)workspace.inert=true;
  const errorPanel=$('#texts-error');if(errorPanel)errorPanel.textContent='';
  try {
    let count=0;
    for(const [id,values] of Object.entries(state.visualMediaDrafts)) {
      const row=collection('media').find(row=>row.id===id);
      if(row && (row.file!==values.file || row.title!==values.title)){await saveRecord('media',row,{...values,status:'published'});count++;}
    }
    if(state.locale!=='es') {
      for(const page of sourceScopes()) {
        const targetPage=translatedScope(page,state.locale);
        const values=entries.map(([id,value])=>{const row=collection('texts').find(row=>row.id===id);return row?.page===targetPage && (row.translation?.state==='pending' || row.value!==value) ? {id,value,revision:row.revision || 0} : null;}).filter(Boolean);
        if(values.length){const result=await request('/api/translations/approve',{method:'POST',body:JSON.stringify({page,locale:state.locale,values})});mergeTextRecords(result.records);count+=result.approved;}
      }
      clearPageDrafts();await reload();render();notify(count ? 'Traducción validada y cambios guardados. Publica para compartirlos.' : 'No hay cambios pendientes.');
    } else {
      for(const [id,value] of entries){const row=collection('texts').find(row=>row.id===id);if(row && row.value!==value){await saveRecord('texts',row,{value,status:'published'});count++;}}
      await reload();clearPageDrafts();state.saving=false;
      if(state.config.translationReady)await generateTranslation();
      else{render();notify(count ? 'Cambios guardados. Publica cuando estén listos.' : 'No hay cambios pendientes.');}
    }
  } catch(error) {
    const panel=$('#texts-error') || $('.visual-error');if(panel)panel.textContent=error.message;notify(error.message);
  } finally {state.saving=false;if(workspace?.isConnected)workspace.inert=false;}
}
$('#main').addEventListener('submit',async event=>{
  if(event.target.id!=='texts-form')return;
  event.preventDefault();await savePage([...new FormData(event.target)]);
});

$('#editor-fields').addEventListener('input',()=>{state.editorDirty=true;});
$('#editor-fields').addEventListener('change',()=>{state.editorDirty=true;});
$('#editor').addEventListener('cancel',event=>{event.preventDefault();closeEditor();});
$('#editor-fields').addEventListener('click',event=>{
  const add=event.target.closest('[data-add-pair]');if(add){state.editorDirty=true;const name=add.dataset.addPair;add.closest('[data-pairs]').querySelector('.pair-rows').insertAdjacentHTML('beforeend',pairRow({},pairLabels[name]));}
  if(event.target.closest('[data-remove-pair]')){state.editorDirty=true;event.target.closest('.pair-row').remove();}
  const photoAction=event.target.closest('[data-action]')?.dataset.action;
  if(photoAction==='replace-image')choosePhotos('replace');
  if(photoAction==='upload-cover')choosePhotos('cover');
  if(photoAction==='upload-gallery')choosePhotos('gallery');
});
$('#editor-fields').addEventListener('change',event=>{if(event.target.name==='image')$('#editor-image-preview').src=imageFor(event.target.value);});
$('#editor-form').addEventListener('submit',async event=>{
  event.preventDefault();if(state.uploading){notify('Espera a que terminen de subir las fotografías.');return;}const submit=event.target.querySelector('[type=submit]');submit.disabled=true;$('#editor-error').textContent='';
  try{
    const {name,row,payload}=state.editing,form=new FormData(event.target),p=structuredClone(payload);let values;
    if(name==='media')values={title:form.get('title'),file:form.get('file')||null,status:'published'};
    else{
      for(const [key,value]of form)if(!['gallery','sort','status'].includes(key))p[key]=value;
      if(name==='products'){
        p.gallery=[p.image,...form.getAll('gallery').filter(path=>path!==p.image)];p.highlights=lines(form.get('highlights'));
        for(const key of ['badges','spareParts','highlightSlides'])p[key]=lines(form.get(key));
        p.catalogOrder=Number(form.get('catalogOrder'));
        for(const [key,keys]of Object.entries({specs:['label','value'],variants:['name','note'],detailBlocks:['title','body'],downloads:['label','url']})){
          const rows=[...event.target.querySelectorAll(`[data-pairs="${key}"] .pair-row`)];
          p[key]=rows.map(el=>({[keys[0]]:el.querySelector('[data-pair-key]').value,[keys[1]]:el.querySelector('[data-pair-value]').value}));
          if(key==='downloads')p[key]=[...(payload.downloads||[]).filter(d=>typeof d==='string'),...p[key]];
        }
      }else if(name==='families'){p.items=lines(form.get('items'));p.href='/linea-de-producto/'+p.slug;}
      values={payload:p,status:form.get('status'),sort:Number(form.get('sort'))};
    }
    await saveRecord(name,row,values);closeEditor(true);render();notify('Cambios guardados. Publica cuando estén listos.');
  }catch(error){$('#editor-error').textContent=error.message;}finally{submit.disabled=false;}
});
$('#close-editor').onclick=()=>closeEditor();$('#cancel-editor').onclick=()=>closeEditor();
function choosePhotos(kind) {
  if(state.uploading){notify('Espera a que terminen de subir las fotografías.');return;}
  if(kind!=='library' && (!state.editing || $('#editor-form [type=submit]').disabled))return;
  state.uploadTarget={kind,editor:state.editing};
  $('#image-upload').multiple=['library','gallery'].includes(kind);
  $('#image-upload').click();
}
function photoStatus(message) {
  const element=$('#editor').open ? $('#editor-photo-status') : $('#media-upload-status');
  if(element)element.textContent=message;
}
function photoUploadBusy(active) {
  state.uploading=active;
  $('#editor').setAttribute('aria-busy',String(active));
  document.querySelectorAll('[data-action="upload-media"],[data-action="upload-cover"],[data-action="upload-gallery"],[data-action="replace-image"],#editor-form [type=submit],#close-editor,#cancel-editor').forEach(button=>button.disabled=active);
  $('#image-upload').disabled=active;
}
async function uploadSelection(selection,target) {
  if(state.uploading || !selection.length)return;
  if(target.kind!=='library' && (!target.editor || target.editor!==state.editing || !$('#editor').open))return;
  const files=['cover','replace'].includes(target.kind) ? [...selection].slice(0,1) : [...selection];
  if(target.kind==='gallery' || (target.kind==='cover' && state.editing?.name==='products')){
    const form=new FormData($('#editor-form'));
    const gallery=form.getAll('gallery'),selected=new Set([form.get('image'),...gallery].filter(Boolean));
    const added=target.kind==='gallery' ? files.length : Number(gallery.includes(form.get('image')));
    if(selected.size+added>100){const message='La galería admite hasta 100 fotos, incluida la portada. Quita alguna selección antes de subir más.';photoStatus(message);notify(message);return;}
  }
  photoUploadBusy(true);
  let uploaded=0;
  const errors=[];
  try{
    for(const [index,file]of files.entries()){
      photoStatus(`Subiendo foto ${index+1} de ${files.length}: ${file.name}`);
      try{
        if(!['image/jpeg','image/png','image/webp','image/avif'].includes(file.type))throw new Error('Utiliza JPG, PNG, WebP o AVIF.');
        if(!file.size || file.size>25*1024*1024)throw new Error(file.size ? 'El máximo es 25 MB por fotografía.' : 'El archivo está vacío.');
        const {id}=await request('/api/upload',{method:'POST',headers:{'Content-Type':file.type},body:file});
        if(target.kind==='replace'){
          $('#editor-form [name=file]').value=id;
          $('#editor-fields .editor-preview').src='/api/files/'+id;
          state.editorDirty=true;
        }else{
          const saved=await saveRecord('media',null,{title:file.name.slice(0,500),file:id,status:'published'});
          if(target.kind==='library'){
            const rows=collection('media');rows.splice(rows.findIndex(row=>row.id===saved.id),1);rows.unshift(saved);
          }else{
            const select=$('#editor-form [name=image]');
            select.add(new Option(saved.title,saved.source));
            if(target.kind==='cover'){select.value=saved.source;$('#editor-image-preview').src=imageUrl(saved);}
            const gallery=$('#editor-fields .gallery-options');
            if(gallery){gallery.insertAdjacentHTML('beforeend',galleryOption(saved,target.kind==='gallery'));gallery.scrollTop=gallery.scrollHeight;}
            state.editorDirty=true;
          }
        }
        uploaded++;
      }catch(error){errors.push(`${file.name}: ${error.message}`);}
    }
  }finally{photoUploadBusy(false);}
  if(target.kind==='library'){state.query='';state.page=1;render();}
  const summary=uploaded ? `${uploaded} foto${uploaded===1 ? '' : 's'} subida${uploaded===1 ? '' : 's'}. ${target.kind==='library' ? 'Ya puedes elegirlas desde las páginas y fichas.' : 'Guarda la ficha para conservar la selección.'}` : 'No se pudo subir ninguna fotografía.';
  photoStatus([summary,...errors].join('\n'));
  notify(errors.length ? `${summary} ${errors.length} archivo${errors.length===1 ? '' : 's'} sin subir. Revisa el detalle.` : summary);
}
$('#image-upload').addEventListener('change',event=>{
  const files=[...event.target.files],target=state.uploadTarget || {kind:'library'};
  event.target.value='';
  uploadSelection(files,target);
});
$('#main').addEventListener('dragover',event=>{
  const zone=event.target.closest('[data-photo-dropzone]');if(!zone)return;
  event.preventDefault();event.dataTransfer.dropEffect='copy';zone.classList.add('dragging');
});
$('#main').addEventListener('dragleave',event=>{
  const zone=event.target.closest('[data-photo-dropzone]');if(zone && !zone.contains(event.relatedTarget))zone.classList.remove('dragging');
});
$('#main').addEventListener('drop',event=>{
  const zone=event.target.closest('[data-photo-dropzone]');if(!zone)return;
  event.preventDefault();zone.classList.remove('dragging');
  uploadSelection([...event.dataTransfer.files],{kind:'library'});
});
function setPublishing(active) {
  state.publishing=active;
  $('#publish').disabled=active || !state.config.publishReady;
  const action=$('[data-action="publish-site"]');
  if(action){action.disabled=$('#publish').disabled;action.innerHTML=`${active ? 'Publicando…' : 'Publicar sitio'} ${icon('arrow')}`;}
}
$('#publish').addEventListener('click',async()=>{
  if(state.translating){notify('Espera a que termine la traducción antes de publicar.');return;}
  if(hasUnsaved()){notify('Guarda tus cambios antes de publicar.');return;}
  setPublishing(true);const panel=$('#publication-status');panel.hidden=false;panel.textContent='Preparando la publicación…';
  try{
    const version=state.version;const result=await request('/api/publish',{method:'POST',body:'{}'});panel.textContent=result.message;
    let checks=0;clearInterval(publicationTimer);publicationTimer=setInterval(async()=>{
      checks++;try{const current=await request('/api/publication');if(current.hash===result.hash){clearInterval(publicationTimer);setPublishing(false);state.liveHash=result.hash;if(state.version===version){state.hash=result.hash;state.pending=false;}panel.textContent='Tu sitio está actualizado. La nueva versión ya está en línea.';notify('Sitio publicado correctamente.');if(currentView()==='overview')render();}}
      catch{}if(checks>=60){clearInterval(publicationTimer);setPublishing(false);panel.textContent='La publicación aún no se ha confirmado. Revisa el despliegue en Vercel; la versión anterior sigue disponible.';}
    },10000);
  }catch(error){panel.textContent=error.message;setPublishing(false);}
});
state.lastView=currentView();
enter().catch(error=>{if(!error.message.includes('Entra a tu Studio'))$('#login-error').textContent=error.message;});
