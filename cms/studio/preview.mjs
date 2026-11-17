import { parse, serialize } from 'parse5';
import { StudioError } from '../model.mjs';

export function previewPath(route) {
  if (typeof route !== 'string' || route.length > 400 || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route)) throw new StudioError(400, 'Selecciona una página del sitio.');
  return `/_studio/pages/${route === '/' ? 'index' : route.slice(1).replaceAll('/', '__')}.json`;
}

// The preview retains the site's HTML and CSS, while all active website code is
// disabled. Editing listeners run in the parent Studio, outside this document.
export function previewDocument(bundle, route, site) {
  if (bundle?.route !== route || typeof bundle.html !== 'string' || bundle.html.length > 5_000_000) throw new StudioError(502, 'La vista de esta página no está disponible.');
  const document = parse(bundle.html);
  const remove = new Set(['script', 'iframe', 'object', 'embed', 'base', 'noscript']);
  const walk = node => {
    node.childNodes = (node.childNodes || []).filter(child => !remove.has(child.tagName) && !(child.tagName === 'meta' && child.attrs.some(a => a.name === 'http-equiv')));
    for (const child of node.childNodes) {
      if (child.attrs) child.attrs = child.attrs.filter(a => !/^on/i.test(a.name) && !['srcdoc', 'autofocus', 'formaction', 'action', 'target', 'ping', 'download'].includes(a.name) && !(['href','src','xlink:href'].includes(a.name) && /^\s*(javascript|vbscript):/i.test(a.value)));
      walk(child);
    }
  };
  walk(document);
  const html = document.childNodes.find(node => node.tagName === 'html');
  const head = html.childNodes.find(node => node.tagName === 'head');
  const element = (name, attrs, text) => ({ nodeName:name, tagName:name, namespaceURI:'http://www.w3.org/1999/xhtml', attrs:Object.entries(attrs).map(([name,value])=>({name,value})), parentNode:head, childNodes:text === undefined ? [] : [{nodeName:'#text',value:text}] });
  head.childNodes.unshift(element('base', { href:new URL(route, site).href }));
  head.childNodes.push(element('meta', { name:'robots', content:'noindex,nofollow' }));
  head.childNodes.push(element('meta', { name:'etapel-preview-media', content:JSON.stringify(bundle.mediaPaths || {}) }));
  head.childNodes.push(element('style', {}, `html{scroll-behavior:auto!important}body{min-width:0}*,*::before,*::after{animation-play-state:paused!important;caret-color:#315cf4} [class*="olivia-"],.back-to-top{display:none!important}a,button,summary{cursor:default}etapel-edit{display:inline;white-space:inherit;outline:none;border-radius:2px}etapel-edit:hover{outline:2px solid #315cf4;outline-offset:4px}etapel-edit:focus{outline:2px solid #ff873e;outline-offset:4px;background:#ff873e18}[data-studio-selected]{outline:3px solid #ff873e!important;outline-offset:4px}[data-studio-photo]{cursor:pointer}[data-studio-photo]:hover{outline:3px solid #315cf4;outline-offset:-3px}body[data-studio-readonly] etapel-edit:hover,body[data-studio-readonly] [data-studio-photo]:hover{outline:none} .studio-background-button{all:initial!important;position:absolute!important;top:12px!important;right:12px!important;z-index:30!important;padding:8px 11px!important;background:#101733!important;color:#fff!important;font:600 12px/1.3 system-ui!important;border:1px solid #ffffff80!important;border-radius:6px!important;cursor:pointer!important;box-shadow:0 3px 16px #0003!important}body[data-studio-readonly] .studio-background-button{display:none!important}`));
  return serialize(document);
}
