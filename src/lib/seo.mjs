import { languagePath } from './languageRoutes.mjs';

export const siteOrigin = 'https://www.etapel.com';
export const canonicalUrl = path => new URL((path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'), siteOrigin).href;
export const jsonLd = value => JSON.stringify(value).replaceAll('<', '\\u003c');

export function languageAlternates(path) {
  const current = new URL(canonicalUrl(path)).pathname;
  const other = languagePath(current);
  if (other === current) return [];
  const english = current === '/en' || current.startsWith('/en/');
  const es = canonicalUrl(english ? other : current);
  const en = canonicalUrl(english ? current : other);
  return [
    { lang: 'es-MX', href: es },
    { lang: 'en', href: en },
    { lang: 'x-default', href: es },
  ];
}
