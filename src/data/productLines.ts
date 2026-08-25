export interface ProductFamily {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  menuDescription: string;
  pageDescription: string;
  image: string;
  accent: string;
  items: string[];
}

const family = (slug: string, title: string, description: string, image: string, items: string[]): ProductFamily => ({
  slug,
  title,
  shortTitle: title,
  href: `/linea-de-producto/${slug}`,
  menuDescription: description,
  pageDescription: description,
  image,
  accent: '',
  items
});

/** Familias dans l'ordre exact de la colonne B du fichier client. */
export const productFamilies: ProductFamily[] = [
  family('pintura-y-aplicacion', 'Pintura y Aplicación', 'Equipos, sistemas y accesorios para la aplicación profesional de pintura.', '/images/products/sata/jet-x/1200394-main.webp', ['Pistolas para pintar', 'Cabinas de pintura', 'Zonas de preparación', 'Protección respiratoria', 'Filtros y aire comprimido']),
  family('preparacion-y-acabado', 'Preparación y acabado', 'Sistemas profesionales de lijado, aspiración, pulido y acabado.', '/images/products/client-catalog/lijadora-neumatica-de-palma-orbital-aleatoria-con-plato-de-12-mm-y-orbita-de-3mm-skorpioiii.webp', ['Sistemas de lijado', 'Sistema de pulido']),
  family('enderezado-de-carroceria', 'Enderezado de carrocería', 'Equipos de enderezado, medición y alineación para automóviles y vehículos pesados.', '/images/products/client-catalog/benchracktm-versa.webp', ['Bancos de enderezado', 'Equipos de medición', 'Accesorios Car-O-Liner', 'Vehículos pesados']),
  family('desabollado-de-carroceria', 'Desabollado de carrocería', 'Soluciones de desabollado, soldadura, tracción y reparación de plásticos.', '/images/products/client-catalog/gyspot-3902.webp', ['Automóviles y SUV', 'Vehículos pesados', 'Reparación de plásticos']),
  family('cargadores-y-arrancadores-de-baterias', 'Cargadores y arrancadores de baterías', 'Carga, arranque y prueba de baterías, además de soluciones de aire comprimido.', '/images/products/client-catalog/gysflash-101-12-cnt-fv-5m-cables.webp', ['Cargadores', 'Arrancadores', 'Probadores de baterías', 'Líneas de aire comprimido', 'Compresores Denair']),
  family('pintura', 'Pintura', 'Pinturas automotrices, industriales y en polvo para procesos profesionales.', '/images/products/client-catalog/envirobase-high-performance.webp', ['PPG automotriz', 'PPG industrial', 'Pintura en polvo']),
  family('mecanica', 'Mecánica', 'Equipos de elevación, diagnóstico, ruedas, aire acondicionado y calibración ADAS.', '/images/products/client-catalog/geoliner-630.webp', ['Rampas y elevadores', 'Escáner', 'Alineadoras', 'Desmontadoras', 'Balanceadoras', 'Aire acondicionado', 'ADAS']),
  family('consumibles-de-pintura', 'Consumibles de pintura', 'Abrasivos, enmascarado, pulimento, protección personal y consumibles de aplicación.', '/images/products/client-catalog/cinta-de-enmascarar-premium.webp', ['Lijas', 'Enmascarado', 'Pulimento', 'Seguridad personal', 'Otros']),
  family('consumibles-de-hojalateria', 'Consumibles de hojalatería', 'Masillas, selladores y consumibles para herramientas de reparación de carrocería.', '/images/products/client-catalog/undercoating-m80-repaintable.webp', ['Masillas y rellenadores', 'Antipiedras y selladores', 'Consumibles herramientas']),
  family('herramientas-de-hojalateria', 'Herramientas de hojalatería', 'Herramientas neumáticas, hidráulicas y manuales para trabajos de carrocería.', '/images/products/client-catalog/33500-1-air-spot-drill-with-hook.webp', ['Neumáticas', 'Herramientas manuales']),
  family('detallado', 'Detallado', 'Pulidoras y borlas profesionales para corrección y acabado de superficies.', '/images/products/client-catalog/orbital-polisher-eb350-5-9-shinemate-global.webp', ['Pulidoras', 'Borlas'])
];

export const legacyFamilyRoutes: Record<string, string> = {
  'equipo-mayor': 'enderezado-de-carroceria',
  'equipo-menor': 'desabollado-de-carroceria',
  consumibles: 'consumibles-de-pintura',
  'cabinas-y-preparacion': 'pintura-y-aplicacion',
  'soldadura-y-enderezado': 'desabollado-de-carroceria',
  'mecanica-y-aire': 'mecanica'
};
