const pairs = [
  ['/', '/en'], ['/linea-de-producto', '/en/product-lines'],
  ['/quienes-somos', '/en/about-us'], ['/capacitacion', '/en/training'],
  ['/postventa', '/en/after-sales'], ['/contacto', '/en/contact'],
  ['/aviso-de-privacidad', '/en/privacy-policy'],
];
export function languagePath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  for (const [es, en] of pairs) {
    if (path === es) return en;
    if (path === en) return es;
  }
  for (const [es, en] of [
    ['/linea-de-producto/productos/', '/en/product-lines/products/'],
    ['/linea-de-producto/', '/en/product-lines/'],
  ]) {
    if (path.startsWith(es)) return en + path.slice(es.length);
    if (path.startsWith(en)) return es + path.slice(en.length);
  }
  return path;
}
export function languageHash(hash, english) {
  for (const [es, en] of [['#sectores', '#sectors'], ['#catalogo-productos', '#product-catalog'], ['#formulario-contacto', '#contact-form'], ['#lineas-de-producto', '#families']]) {
    if (hash === (english ? es : en)) return english ? en : es;
  }
  return hash;
}
