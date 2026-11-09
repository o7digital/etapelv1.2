import { createHash } from 'node:crypto';
export const collections = ['etapel_texts', 'etapel_media', 'etapel_products', 'etapel_families', 'etapel_brands'];
export const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export const contentHash = content => createHash('sha256').update(JSON.stringify(canonical(Object.fromEntries(collections.map(name => [name, [...content[name]].sort((a, b) => a.id.localeCompare(b.id))]))))).digest('hex');
export class StudioError extends Error { constructor(status, message) { super(message); this.status = status; } }
export function safeLink(value) {
  if (typeof value !== 'string') return false;
  if (/^\/(?!\/)[\w/%.\-?=#&+]*$/.test(value)) return !value.includes('..');
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
}
const string = (value, max = 12000) => typeof value === 'string' && value.length <= max;
const slug = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 180;
export function validateRecord(collection, input, previous) {
  if (!collections.includes(collection) || !input || typeof input !== 'object' || Array.isArray(input)) throw new StudioError(400, 'Contenido no válido.');
  const allowed = collection === 'etapel_texts' ? ['value', 'status', 'revision'] : collection === 'etapel_media' ? ['file', 'title', 'status', 'revision'] : ['payload', 'status', 'sort', 'revision'];
  if (Object.keys(input).some(key => !allowed.includes(key))) throw new StudioError(400, 'El formulario incluye campos no permitidos.');
  if (!['draft', 'published', 'archived'].includes(input.status)) throw new StudioError(400, 'Selecciona un estado válido.');
  if (input.sort !== undefined && (!Number.isInteger(input.sort) || input.sort < 0 || input.sort > 100000)) throw new StudioError(400, 'Orden no válido.');
  if (collection === 'etapel_texts') {
    if (!string(input.value)) throw new StudioError(400, 'El texto es demasiado largo.');
  } else if (collection === 'etapel_media') {
    if (input.file !== null && !/^[a-f\d-]{36}$/i.test(input.file)) throw new StudioError(400, 'Selecciona una fotografía válida.');
    if (!string(input.title, 500)) throw new StudioError(400, 'Escribe una descripción de la imagen.');
  } else {
    const p = input.payload;
    if (!p || typeof p !== 'object' || Array.isArray(p) || JSON.stringify(p).length > 100000) throw new StudioError(400, 'Revisa la ficha.');
    if (collection === 'etapel_products') {
      if (!slug(p.slug) || !slug(p.familySlug)) throw new StudioError(400, 'La dirección o la familia del producto no es válida.');
      if (previous && p.slug !== previous.payload.slug) throw new StudioError(400, 'La dirección de un producto existente se conserva para mantener sus enlaces.');
      const strings = ['slug','brand','familySlug','category','technology','application','name','summary','summaryEn','descriptionEn','description','image','catalogSection','catalogLine','catalogSubline','sprayPattern','nozzleTechnology','interest','sourceUrl'];
      const arrays = ['gallery','badges','specs','variants','optionGroups','highlights','highlightSlides','detailBlocks','downloads','spareParts'];
      if (Object.keys(p).some(key => ![...strings, ...arrays, 'catalogOrder'].includes(key))) throw new StudioError(400, 'Campo de producto no permitido.');
      for (const key of strings) if (p[key] !== undefined && !string(p[key])) throw new StudioError(400, `Revisa ${key}.`);
      for (const key of arrays) if (p[key] !== undefined && (!Array.isArray(p[key]) || p[key].length > 100)) throw new StudioError(400, `Revisa ${key}.`);
      for (const key of ['badges','highlights','highlightSlides','spareParts','gallery']) if (p[key]?.some(value => !string(value, 4000))) throw new StudioError(400, `Revisa ${key}.`);
      for (const key of ['specs', 'variants', 'detailBlocks']) {
        const expected = { specs: ['label','value'], variants: ['name','note'], detailBlocks: ['title','body'] }[key];
        if (p[key]?.some(row => !row || Object.keys(row).some(k => !expected.includes(k)) || expected.some(k => !string(row[k])))) throw new StudioError(400, `Revisa ${key}.`);
      }
      if (!string(p.name, 500) || !p.name.trim() || !string(p.summary) || !string(p.description)) throw new StudioError(400, 'Completa nombre, resumen y descripción.');
      if (!safeLink(p.image) || !Array.isArray(p.gallery) || !p.gallery.length || p.gallery.some(path => !safeLink(path)) || p.gallery[0] !== p.image) throw new StudioError(400, 'La primera foto de la galería debe ser la portada.');
      for (const download of p.downloads || []) if (typeof download !== 'string' && (!string(download?.label, 500) || !safeLink(download?.url))) throw new StudioError(400, 'Enlace de descarga no válido.');
      if (p.sourceUrl && !safeLink(p.sourceUrl)) throw new StudioError(400, 'Enlace de origen no válido.');
      for (const key of ['specs','variants','badges','highlights','detailBlocks']) if (!Array.isArray(p[key])) throw new StudioError(400, `Falta ${key}.`);
    } else if (collection === 'etapel_families') {
      const keys = ['slug','title','shortTitle','href','menuDescription','pageDescription','image','accent','items'];
      if (Object.keys(p).some(key => !keys.includes(key)) || !slug(p.slug) || !p.title?.trim() || !safeLink(p.image) || p.href !== `/linea-de-producto/${p.slug}` || !Array.isArray(p.items) || p.items.some(v => !string(v, 500))) throw new StudioError(400, 'Revisa la familia de productos.');
      if (previous && p.slug !== previous.payload.slug) throw new StudioError(400, 'La dirección de la familia se conserva.');
      for (const key of keys.filter(k => k !== 'items')) if (!string(p[key])) throw new StudioError(400, 'Completa los campos de la familia.');
    } else {
      if (Object.keys(p).some(k => !['name','slug','note'].includes(k)) || !string(p.name, 100) || !p.name.trim() || !slug(p.slug) || (p.note !== undefined && !string(p.note, 200))) throw new StudioError(400, 'Revisa la marca.');
    }
  }
  return { ...input, revision: (previous?.revision || 0) + 1 };
}
