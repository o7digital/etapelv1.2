const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const absolute = url => new URL(url, location.origin).href;
const devices = { desktop:1440, tablet:820, mobile:390 };

export function visualEditorMarkup({route, locale, translationReady, translating, stale, mode}) {
  return `<section class="visual-editor" aria-label="Editor visual de la página">
    <div class="visual-toolbar"><div class="visual-mode" role="group" aria-label="Modo del editor"><button data-visual="edit" class="active" aria-pressed="true">✎ Editar página</button><button data-visual="preview" aria-pressed="false">Vista previa</button></div>
    <div class="visual-devices" role="group" aria-label="Tamaño de pantalla"><button data-device="desktop" title="Ordenador" aria-label="Ordenador" aria-pressed="true">▱</button><button data-device="tablet" title="Tableta" aria-label="Tableta" aria-pressed="false">▯</button><button data-device="mobile" title="Móvil" aria-label="Móvil" aria-pressed="false">▯</button></div>
    <button class="visual-expand" data-visual="fullscreen" title="Ampliar editor" aria-label="Ampliar editor">⛶</button><span class="visual-save-status" role="status">${locale==='en' ? 'Vista del inglés · Revisa antes de validar' : 'Haz clic en un texto o una foto'}</span>
    ${translationReady ? `<button class="button quiet visual-translate" data-action="translate-page" ${translating ? 'disabled' : ''}>ES → EN</button>` : ''}<button class="button orange visual-save" data-visual="save" ${translating || stale ? 'disabled' : ''}>${locale==='en' ? 'Validar inglés' : translationReady ? 'Guardar y traducir' : 'Guardar cambios'} ↗</button></div>
    <div class="visual-workbench"><div class="visual-canvas"><div class="visual-browser"><span class="browser-dots">● ● ●</span><span>etapel.com${route==='/' ? '' : esc(route)}</span><span class="canvas-label">TU PÁGINA REAL</span></div><div class="visual-viewport"><div class="visual-frame-wrap"><iframe id="page-preview" title="Página Etapel editable · ${locale==='es' ? 'Español' : 'English'}" sandbox="allow-same-origin"></iframe></div><div class="visual-loading" role="status"><span class="loader"></span><b>Preparando tu página…</b><span>Con sus textos, fotografías y diseño.</span></div></div><div class="visual-canvas-footer"><span class="visual-dimensions">1440 px · Ordenador</span><span>Guardar prepara · Publicar actualiza el sitio</span></div></div>
    <aside class="visual-inspector" aria-label="Contenido seleccionado"><div class="inspector-tabs"><button data-inspector="edit" class="active">Editar</button><button data-inspector="outline">Contenido</button></div><div class="inspector-content"><div class="visual-welcome"><span class="welcome-cursor">↖</span><p class="eyebrow">ASÍ DE FÁCIL</p><h2>Tu página.<br>En tus manos.</h2><p>Haz clic en un texto para escribir directamente.<br><br>Selecciona una fotografía para cambiarla.</p><div>① Elige un contenido<br>② Haz tu cambio<br>③ Guarda y publica</div></div></div></aside></div><input type="file" class="visual-file-input" accept="image/jpeg,image/png,image/webp,image/avif" hidden>
    <dialog class="visual-library"><header><div><p class="eyebrow">TUS FOTOGRAFÍAS</p><h2>Elige la imagen.</h2></div><button class="icon-button" data-library-close aria-label="Cerrar biblioteca">✕</button></header><input type="search" class="visual-library-search" placeholder="Buscar una fotografía…" aria-label="Buscar una fotografía"><div class="visual-library-grid"></div><p class="visual-library-status" role="status"></p></dialog>
    <p class="visual-error error" role="alert"></p>
  </section>`;
}

export function mountVisualEditor(root, options) {
  const {route, rows, allTexts, media, drafts, mediaDrafts, imageUrl, onText, onMedia, onSave, notify, locale, prefs} = options;
  const frame = root.querySelector('iframe'), viewport = root.querySelector('.visual-viewport');
  const inspector = root.querySelector('.inspector-content'), library = root.querySelector('.visual-library');
  const byId = new Map(rows.map(row=>[row.id,row])), bySource = new Map(media.map(row=>[row.source,row]));
  const targets = new Map(), pictures = new Map(), backgrounds = [];
  let doc, activatedDocument, selected, destroyed=false, observer, resizeTimer, mode='edit', device=prefs.device || 'desktop';
  const valueOf = row => drafts[row.id] ?? (row.translation?.state==='pending' ? row.translation.value : row.value);
  const mediaValue = row => ({...row,...mediaDrafts[row.id]});
  const photoUrl = row => absolute(imageUrl(mediaValue(row)));
  const error = message => { root.querySelector('.visual-error').textContent=message; notify(message); };
  const listen = (el,type,fn) => el.addEventListener(type,fn);
  function updateStatus() {
    const count=Object.keys(drafts).length+Object.keys(mediaDrafts).length;
    root.querySelector('.visual-save-status').textContent=count ? `${count} cambio${count===1 ? '' : 's'} sin guardar` : locale==='en' ? 'Vista del inglés · Revisa antes de validar' : 'Haz clic en un texto o una foto';
    root.classList.toggle('has-visual-changes',count>0);
  }
  function updateText(id,value,origin) {
    const row=byId.get(id);if(!row)return;
    onText(row,value);
    for(const node of targets.get(id) || [])if(node!==origin)node.textContent=value;
    if(origin?.ownerDocument===doc && inspector.querySelector('[data-text-value]'))inspector.querySelector('[data-text-value]').value=value;
    updateStatus();
  }
  function showText(row,focus=false) {
    selected={type:'text',row};highlight(targets.get(row.id)?.[0]);
    root.querySelectorAll('[data-inspector]').forEach(b=>b.classList.toggle('active',b.dataset.inspector==='edit'));
    const sources=(row.translation?.source_ids || []).map(id=>allTexts.find(r=>r.id===id)?.value).filter(v=>v!==undefined);
    inspector.innerHTML=`<div class="inspector-kind">✎ TEXTO ${locale==='en' ? 'EN INGLÉS' : 'EN ESPAÑOL'}</div><h2>${esc(row.section)}</h2><label class="inspector-label">Contenido<textarea data-text-value rows="7" maxlength="12000" aria-label="Texto seleccionado">${esc(valueOf(row))}</textarea></label>${sources.length ? `<div class="inspector-original"><b>ESPAÑOL · ORIGINAL</b><p>${esc(sources.join('\n\n'))}</p></div>` : ''}${row.translation?.state==='pending' ? '<span class="badge draft">Traducción por validar</span>' : ''}<p class="inspector-note">El cambio se ve al instante en la página. Su tipografía y diseño se conservan.</p><button class="button quiet full" data-focus-text>Ir al texto ↗</button>`;
    listen(inspector.querySelector('textarea'),'input',e=>updateText(row.id,e.target.value,e.target));
    listen(inspector.querySelector('[data-focus-text]'),'click',()=>{const el=targets.get(row.id)?.[0];el?.scrollIntoView({block:'center',behavior:'smooth'});el?.focus();});
    if(focus)inspector.querySelector('textarea').focus();
  }
  function highlight(el) { doc?.querySelectorAll('[data-studio-selected]').forEach(n=>n.removeAttribute('data-studio-selected'));el?.setAttribute('data-studio-selected',''); }
  function showImage(row,element) {
    selected={type:'image',row,element};highlight(element);root.querySelectorAll('[data-inspector]').forEach(b=>b.classList.toggle('active',b.dataset.inspector==='edit'));
    inspector.innerHTML=`<div class="inspector-kind">▧ FOTOGRAFÍA</div><h2>Una imagen que se ve.</h2><img class="inspector-photo" src="${esc(photoUrl(row))}" alt="${esc(row.title)}"><label class="inspector-label">Descripción de la imagen<input data-image-title maxlength="500" value="${esc(mediaValue(row).title)}" aria-label="Descripción de la imagen seleccionada"></label><button class="button orange full" data-upload-photo>↑ Subir una foto</button><button class="button quiet full" data-choose-photo>Elegir de la biblioteca</button><p class="inspector-note">JPG, PNG, WebP o AVIF · Hasta 25 MB.<br><br>Esta foto se actualizará en todos los lugares donde se utiliza después de publicar.</p>`;
    listen(inspector.querySelector('[data-upload-photo]'),'click',()=>root.querySelector('.visual-file-input').click());
    listen(inspector.querySelector('[data-choose-photo]'),'click',()=>{renderLibrary('');library.showModal();});
    listen(inspector.querySelector('[data-image-title]'),'input',e=>{onMedia(row,{...mediaDrafts[row.id],file:mediaDrafts[row.id]?.file ?? row.file,title:e.target.value});updateStatus();});
  }
  function applyImages() {
    if(!doc)return;
    for(const node of doc.querySelectorAll('[data-etapel-images]')) {
      const sources=JSON.parse(node.dataset.etapelImages);
      if(node.tagName==='IMG') {
        const row=bySource.get(sources[0]);if(row){node.src=photoUrl(row);node.alt=mediaValue(row).title;}
      }
      if(node.hasAttribute('srcset')){
        node.dataset.studioSrcset ||= node.getAttribute('srcset');
        node.srcset=sources.reduce((srcset,source)=>{const row=bySource.get(source);return row ? srcset.split(source).join(photoUrl(row)) : srcset;},node.dataset.studioSrcset);
      }
    }
    for(const bg of backgrounds){
      let value=bg.original;
      for(const item of bg.items)value=value.replace(item.url,photoUrl(item.row));
      bg.style.textContent=`[data-studio-background="${bg.key}"]${bg.pseudo}{background-image:${value}!important}`;
    }
  }
  function matchingRow(path, published) {
    let pathname;try{pathname=new URL(path,doc.baseURI).pathname;}catch{return;}
    return media.find(row=>{const original=published[row.source] || row.source;return pathname===new URL(original,doc.baseURI).pathname || pathname===new URL(row.source,doc.baseURI).pathname;});
  }
  function findBackgrounds() {
    const published=JSON.parse(doc.querySelector('meta[name="etapel-preview-media"]')?.content || '{}');
    let index=0;
    for(const el of doc.querySelectorAll('body *')) {
      if(!el.getBoundingClientRect().width)continue;
      for(const pseudo of ['', '::before', '::after']) {
        const original=doc.defaultView.getComputedStyle(el,pseudo || null).backgroundImage;
        if(!original || original==='none' || !original.includes('url('))continue;
        const items=[...original.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(match=>({url:match[1],row:matchingRow(match[1],published)})).filter(item=>item.row);
        if(!items.length)continue;
        const key=String(++index),style=doc.createElement('style');doc.head.append(style);
        el.dataset.studioBackground=key;
        // One element may have a background on itself and a pseudo-element.
        for(const previous of backgrounds.filter(bg=>bg.el===el))previous.key=key;
        backgrounds.push({el,key,pseudo,items,original,style});
        for(const item of items)if(!pictures.has(item.row.id))pictures.set(item.row.id,{row:item.row,element:el});
        const button=doc.createElement('button');button.type='button';button.className='studio-background-button';button.textContent='▧ Foto de fondo';button.setAttribute('aria-label','Cambiar fotografía de fondo');
        if(doc.defaultView.getComputedStyle(el).position==='static')el.style.position='relative';
        el.append(button);listen(button,'click',event=>{event.preventDefault();event.stopPropagation();if(mode==='edit')showImage(items[0].row,el);});
        listen(el,'click',event=>{if(mode==='edit' && !event.target.closest('etapel-edit,[data-studio-photo],.studio-background-button')){event.preventDefault();event.stopPropagation();showImage(items[0].row,el);}});
      }
    }
  }
  function renderLibrary(query) {
    const filtered=media.filter(row=>(row.title+' '+row.source).toLowerCase().includes(query.toLowerCase())).slice(0,60);
    root.querySelector('.visual-library-grid').innerHTML=filtered.map(row=>`<button type="button" data-library-image="${row.id}"><img src="${esc(photoUrl(row))}" alt="" loading="lazy"><span>${esc(row.title)}</span></button>`).join('') || '<p>No se encontraron fotografías.</p>';
  }
  async function choosePhoto(row) {
    const target=selected?.row;if(!target || selected.type!=='image')return;
    root.querySelector('.visual-library-status').textContent='Preparando fotografía…';
    try {
      let file=row.file;
      if(!file){
        const response=await fetch(`/api/media/${row.id}/image`);if(!response.ok)throw new Error('No se pudo preparar esta fotografía.');
        const blob=await response.blob();
        file=await upload(new File([blob],row.title,{type:blob.type}));
      }
      if(destroyed)return;
      onMedia(target,{file,title:mediaValue(target).title});applyImages();showImage(target,selected.element);updateStatus();library.close();
    }catch(e){root.querySelector('.visual-library-status').textContent=e.message;}
  }
  async function upload(file) {
    if(file.size>25*1024*1024)throw new Error('El máximo es 25 MB por fotografía.');
    const response=await fetch('/api/upload',{method:'POST',headers:{'Content-Type':file.type},body:file});
    const result=await response.json();if(!response.ok)throw new Error(result.error || 'No se pudo subir la fotografía.');return result.id;
  }
  function showOutline() {
    const sections=new Map();
    for(const row of rows.filter(r=>r.section!=='SEO').sort((a,b)=>a.sort-b.sort)){if(!sections.has(row.section))sections.set(row.section,[]);sections.get(row.section).push(row);}
    inspector.innerHTML=`<div class="inspector-kind">TU PÁGINA POR DENTRO</div><h2>Todo, en su lugar.</h2><p class="inspector-note">Elige un texto o una foto para localizarlo en la página.</p><div class="visual-outline">${[...sections].map(([section,items],i)=>`<details ${i===0 ? 'open' : ''}><summary>${esc(section)}<span>${items.length}</span></summary>${items.map(row=>`<button data-outline-text="${row.id}">${esc(valueOf(row).slice(0,95))}</button>`).join('')}</details>`).join('')}</div><h3 class="outline-photo-title">Fotografías de esta página</h3><div class="outline-photos">${[...pictures].map(([id,{row}])=>`<button data-outline-image="${id}"><img src="${esc(photoUrl(row))}" alt="" loading="lazy"><span>${esc(row.title)}</span></button>`).join('')}</div>`;
  }
  function setDevice(next) {
    device=next;prefs.device=next;
    root.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===next)));
    const width=devices[device],scale=Math.min(1,(viewport.clientWidth-32)/width);
    const height=Math.max(320,viewport.clientHeight-32);
    const wrap=root.querySelector('.visual-frame-wrap');wrap.style.width=`${width*scale}px`;wrap.style.height=`${height}px`;
    frame.style.width=`${width}px`;frame.style.height=`${height/scale}px`;frame.style.transform=`scale(${scale})`;
    root.querySelector('.visual-dimensions').textContent=`${width} px · ${{desktop:'Ordenador',tablet:'Tableta',mobile:'Móvil'}[device]}`;
  }
  function setMode(next) {
    mode=next;doc?.body.toggleAttribute('data-studio-readonly',next==='preview');
    root.classList.toggle('is-preview',next==='preview');
    for(const nodes of targets.values())for(const node of nodes)node.contentEditable=next==='edit' ? 'plaintext-only' : 'false';
    root.querySelectorAll('[data-visual="edit"],[data-visual="preview"]').forEach(b=>{b.classList.toggle('active',b.dataset.visual===next);b.setAttribute('aria-pressed',String(b.dataset.visual===next));});
    if(next==='preview')highlight(null);
  }
  function activate() {
    if(destroyed)return;doc=frame.contentDocument;
    if(!doc?.querySelector('meta[name="etapel-preview-media"]')) {
      let message='No se pudo abrir la página. Vuelve a cargar el editor.';
      try{message=JSON.parse(doc.body.textContent).error || message;}catch{}
      root.querySelector('.visual-loading').innerHTML=`<b>La página no está disponible.</b><p>${esc(message)}</p><button class="button quiet" data-preview-retry>Volver a intentar</button>`;
      root.querySelector('[data-preview-retry]').onclick=()=>{frame.src=`/api/preview?page=${encodeURIComponent(route)}&retry=${Date.now()}`;};return;
    }
    // Browsers may notify load again when preview resources finish. Mount each
    // document once; wrapping its whitespace a second time duplicates the copy.
    if(activatedDocument===doc)return;
    activatedDocument=doc;
    targets.clear();pictures.clear();backgrounds.length=0;selected=null;
    for(const parent of doc.querySelectorAll('[data-etapel-texts]')) {
      const nodes=[...parent.childNodes];
      for(const [index,id] of Object.entries(JSON.parse(parent.dataset.etapelTexts))) {
        const row=byId.get(id),node=nodes[Number(index)];if(!row || node?.nodeType!==3)continue;
        const editable=doc.createElement('etapel-edit');editable.dataset.studioText=id;editable.contentEditable='plaintext-only';editable.spellcheck=true;editable.setAttribute('aria-label',row.label);editable.textContent=valueOf(row);
        const leading=node.textContent.match(/^\s*/)[0],trailing=node.textContent.match(/\s*$/)[0];
        node.replaceWith(doc.createTextNode(leading),editable,doc.createTextNode(trailing));
        if(!targets.has(id))targets.set(id,[]);targets.get(id).push(editable);
        listen(editable,'focus',()=>{if(mode==='edit' && selected?.row.id!==id)showText(row);});
        listen(editable,'input',()=>updateText(id,editable.textContent,editable));
        listen(editable,'beforeinput',e=>{if(e.inputType==='insertParagraph'){e.preventDefault();doc.execCommand('insertText',false,'\n');}});
        listen(editable,'paste',e=>{e.preventDefault();doc.execCommand('insertText',false,e.clipboardData.getData('text/plain'));});
      }
    }
    for(const img of doc.querySelectorAll('img[data-etapel-images]')) {
      const source=JSON.parse(img.dataset.etapelImages)[0],row=bySource.get(source);if(!row)continue;
      img.dataset.studioPhoto=row.id;img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label',`Cambiar fotografía: ${row.title}`);
      pictures.set(row.id,{row,element:img});
      const select=()=>{
        const sources=[...(img.closest('picture')?.querySelectorAll('[data-etapel-images]') || [img])].flatMap(el=>JSON.parse(el.dataset.etapelImages));
        const actual=sources.map(s=>bySource.get(s)).find(r=>r && photoUrl(r)===img.currentSrc) || row;
        showImage(actual,img);
      };
      listen(img,'click',e=>{if(mode==='edit'){e.preventDefault();e.stopPropagation();select();}});
      listen(img,'keydown',e=>{if(mode==='edit' && ['Enter',' '].includes(e.key)){e.preventDefault();select();}});
    }
    findBackgrounds();applyImages();setMode(mode);setDevice(device);
    listen(doc,'click',e=>{const text=e.target.closest('etapel-edit');if(text && mode==='edit'){e.preventDefault();showText(byId.get(text.dataset.studioText));text.focus();}else if(e.target.closest('a,button,input,select,textarea,summary'))e.preventDefault();});
    listen(doc,'submit',e=>e.preventDefault());
    listen(doc,'keydown',e=>{if((e.ctrlKey || e.metaKey) && e.key==='s'){e.preventDefault();onSave();}if(e.key==='Escape' && document.body.classList.contains('visual-fullscreen')){document.body.classList.remove('visual-fullscreen');setDevice(device);}});
    root.querySelector('.visual-loading').hidden=true;
    updateStatus();
  }
  listen(frame,'load',activate);
  listen(root,'click',event=>{
    const action=event.target.closest('[data-visual]')?.dataset.visual;
    if(action==='save')onSave();
    if(action==='edit' || action==='preview')setMode(action);
    if(action==='fullscreen'){document.body.classList.toggle('visual-fullscreen');setDevice(device);}
    const next=event.target.closest('[data-device]')?.dataset.device;if(next)setDevice(next);
    const tab=event.target.closest('[data-inspector]')?.dataset.inspector;
    if(tab){root.querySelectorAll('[data-inspector]').forEach(b=>b.classList.toggle('active',b.dataset.inspector===tab));if(tab==='outline')showOutline();else if(selected?.type==='text')showText(selected.row);else if(selected?.type==='image')showImage(selected.row,selected.element);else inspector.innerHTML='<p class="inspector-note">Selecciona un texto o una fotografía en la página.</p>';}
    const textId=event.target.closest('[data-outline-text]')?.dataset.outlineText;
    if(textId){const row=byId.get(textId);showText(row,true);targets.get(textId)?.[0]?.scrollIntoView({block:'center'});}
    const imageId=event.target.closest('[data-outline-image]')?.dataset.outlineImage;
    if(imageId){const {row,element}=pictures.get(imageId);element.scrollIntoView({block:'center'});showImage(row,element);}
    const image=event.target.closest('[data-library-image]')?.dataset.libraryImage;if(image)choosePhoto(media.find(row=>row.id===image));
    if(event.target.closest('[data-library-close]'))library.close();
  });
  listen(root.querySelector('.visual-library-search'),'input',event=>renderLibrary(event.target.value));
  listen(root.querySelector('.visual-file-input'),'change',async event=>{
    const file=event.target.files[0],target=selected;if(!file || target?.type!=='image')return;
    notify('Subiendo fotografía…');
    try{const id=await upload(file);if(destroyed)return;onMedia(target.row,{file:id,title:mediaValue(target.row).title});applyImages();showImage(target.row,target.element);updateStatus();notify('Fotografía lista. Guarda la página para conservarla.');}catch(e){error(e.message);}finally{event.target.value='';}
  });
  observer=new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>setDevice(device),50);});observer.observe(viewport);
  frame.src=`/api/preview?page=${encodeURIComponent(route)}`;
  setDevice(device);
  return {destroy(){destroyed=true;frame.removeEventListener('load',activate);observer.disconnect();clearTimeout(resizeTimer);document.body.classList.remove('visual-fullscreen');}};
}
