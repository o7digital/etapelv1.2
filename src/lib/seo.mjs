import { languagePath, hasLanguageRoute, locales } from './languageRoutes.mjs';

export const siteOrigin = 'https://www.etapel.com';
export const canonicalUrl = path => new URL((path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'), siteOrigin).href;
export const jsonLd = value => JSON.stringify(value).replaceAll('<', '\\u003c');

export function languageAlternates(path) {
  const current = new URL(canonicalUrl(path)).pathname;
  if (!hasLanguageRoute(current)) return [];
  const es = canonicalUrl(languagePath(current, 'es'));
  return [
    ...locales.map(locale => ({ lang: locale.tag, href: canonicalUrl(languagePath(current, locale.code)) })),
    { lang: 'x-default', href: es },
  ];
}
