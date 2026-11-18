// Verified official SATA finder pages. SATA does not offer a Portuguese finder.
const finders = {
  es: 'https://www.sata.com/es/servicio/buscador-de-recambios/',
  en: 'https://www.sata.com/en/service/spare-parts-finder/',
  de: 'https://www.sata.com/de-de/ersatzteilfinder',
  it: 'https://www.sata.com/it-it/servizio/ricerca-ricambi/',
  fr: 'https://www.sata.com/fr/service/recherche-de-pieces-detachees/',
  pt: 'https://www.sata.com/en/service/spare-parts-finder/',
};
export const sataFinderUrl = locale => finders[locale] || finders.en;
export const isSataFinder = href => Object.values(finders).includes(href);
