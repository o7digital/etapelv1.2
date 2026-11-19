export const locales = [
  { code: 'es', tag: 'es-MX', name: 'Español', og: 'es_MX' },
  { code: 'en', tag: 'en', name: 'English', og: 'en_US' },
  { code: 'de', tag: 'de', name: 'Deutsch', og: 'de_DE' },
  { code: 'it', tag: 'it', name: 'Italiano', og: 'it_IT' },
  { code: 'fr', tag: 'fr', name: 'Français', og: 'fr_FR' },
  { code: 'pt', tag: 'pt-BR', name: 'Português', og: 'pt_BR' },
];
export const addedLocales = locales.filter(locale => !['es', 'en'].includes(locale.code));

// Product and family identifiers stay stable across languages.
const sections = {
  es: ['', 'linea-de-producto', 'quienes-somos', 'capacitacion', 'postventa', 'contacto', 'aviso-de-privacidad', 'politicas-de-etapel'],
  en: ['', 'product-lines', 'about-us', 'training', 'after-sales', 'contact', 'privacy-policy', 'etapel-policies'],
  de: ['', 'produktlinien', 'ueber-uns', 'schulung', 'kundendienst', 'kontakt', 'datenschutz', 'etapel-richtlinien'],
  it: ['', 'linee-di-prodotto', 'chi-siamo', 'formazione', 'assistenza-tecnica', 'contatti', 'informativa-privacy', 'politiche-etapel'],
  fr: ['', 'gammes-de-produits', 'a-propos', 'formation', 'service-apres-vente', 'contact', 'confidentialite', 'politique-etapel'],
  pt: ['', 'linhas-de-produtos', 'sobre-nos', 'treinamento', 'assistencia-tecnica', 'contato', 'privacidade', 'politicas-etapel'],
};
const products = { es: 'productos', en: 'products', de: 'produkte', it: 'prodotti', fr: 'produits', pt: 'produtos' };
const cleanPath = path => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
const prefix = locale => locale === 'es' ? '' : `/${locale}`;

export function pathLocale(pathname) {
  const first = cleanPath(pathname).split('/')[1];
  return locales.some(locale => locale.code === first) ? first : 'es';
}

export function languagePath(pathname, target) {
  const path = cleanPath(pathname), source = pathLocale(path);
  target ??= source === 'es' ? 'en' : 'es';
  if (!sections[target]) throw new Error(`Unsupported language: ${target}`);
  for (let index = 0; index < sections[source].length; index++) {
    const current = `${prefix(source)}/${sections[source][index]}`.replace(/\/+$/, '') || '/';
    if (path === current) return `${prefix(target)}/${sections[target][index]}`.replace(/\/+$/, '') || '/';
  }
  const catalog = `${prefix(source)}/${sections[source][1]}/`;
  if (path.startsWith(catalog)) {
    let slug = path.slice(catalog.length);
    if (slug.startsWith(`${products[source]}/`)) slug = `${products[target]}/${slug.slice(products[source].length + 1)}`;
    return `${prefix(target)}/${sections[target][1]}/${slug}`;
  }
  return path;
}

export function hasLanguageRoute(pathname) {
  const source = pathLocale(pathname);
  return languagePath(pathname, source === 'es' ? 'en' : 'es') !== cleanPath(pathname);
}

export function languageHash(hash, target) {
  const english = typeof target === 'boolean' ? target : target !== 'es';
  for (const [es, en] of [['#sectores', '#sectors'], ['#catalogo-productos', '#product-catalog'], ['#formulario-contacto', '#contact-form'], ['#lineas-de-producto', '#families']]) {
    if (hash === (english ? es : en)) return english ? en : es;
  }
  return hash;
}
