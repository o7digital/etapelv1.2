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

/**
 * Grandes familias comerciales definidas por Etapel. Las lineas de producto
 * que aparecen dentro de cada una se generan a partir del catalogo real.
 */
export const productFamilies: ProductFamily[] = [
  {
    slug: 'equipo-mayor',
    title: 'Equipo Mayor',
    shortTitle: 'Equipo Mayor',
    href: '/linea-de-producto/equipo-mayor',
    menuDescription: 'Instalaciones y equipos de gran formato para estructurar y equipar el taller.',
    pageDescription:
      'Cabinas de pintura, zonas de preparación, bancos de enderezado, sistemas de medición, alineación, elevación, aire comprimido y otros equipos de gran formato para el taller.',
    image: '/images/products/client-catalog/benchracktm-versa.png',
    accent: 'from-blue-500/16 to-slate-500/8',
    items: [
      'Cabinas y zonas de preparación',
      'Bancos de enderezado',
      'Alineación y medición',
      'Elevación y servicio de ruedas',
      'Compresores y redes de aire'
    ]
  },
  {
    slug: 'equipo-menor',
    title: 'Equipo Menor',
    shortTitle: 'Equipo Menor',
    href: '/linea-de-producto/equipo-menor',
    menuDescription: 'Herramientas y equipos móviles para reparación, diagnóstico, soldadura y acabado.',
    pageDescription:
      'Herramientas neumáticas, eléctricas y manuales, soldadura, desabollado, reparación de plásticos, diagnóstico, cargadores y equipos móviles para la operación diaria.',
    image: '/images/products/client-catalog/gyspot-3902.png',
    accent: 'from-amber-500/16 to-orange-500/8',
    items: [
      'Soldadura y desabollado',
      'Herramientas neumáticas',
      'Herramientas eléctricas y manuales',
      'Diagnóstico y cargadores',
      'Lámparas y equipos móviles'
    ]
  },
  {
    slug: 'pintura',
    title: 'Pintura',
    shortTitle: 'Pintura',
    href: '/linea-de-producto/pintura',
    menuDescription: 'Pinturas automotrices e industriales, aplicación, filtración y sistemas de acabado.',
    pageDescription:
      'Pintura automotriz PPG, pintura industrial y en polvo, primers, bases y acabados, junto con pistolas SATA, filtración, equipos de aplicación y asesoría para configurar el proceso completo de pintura.',
    image: '/images/products/sata/jet-x/1200394-main.webp',
    accent: 'from-sky-500/18 to-cyan-500/8',
    items: [
      'Pintura automotriz PPG',
      'Pintura industrial y en polvo',
      'Pistolas de pintura',
      'Filtración y aire para pintura',
      'Accesorios de aplicación'
    ]
  },
  {
    slug: 'consumibles',
    title: 'Consumibles',
    shortTitle: 'Consumibles',
    href: '/linea-de-producto/consumibles',
    menuDescription: 'Materiales de preparación, protección, reparación y acabado de uso recurrente.',
    pageDescription:
      'Abrasivos, enmascarado, plásticos, papel, masillas, selladores, pulimentos, almohadillas, protección personal y consumibles para mantener el flujo diario del taller.',
    image: '/images/products/client-catalog/cinta-de-enmascarar-premium.jpg',
    accent: 'from-orange-500/16 to-amber-500/8',
    items: [
      'Lijas y abrasivos',
      'Enmascarado, plásticos y papel',
      'Masillas y selladores',
      'Pulimentos y almohadillas',
      'Protección personal'
    ]
  }
];

export const legacyFamilyRoutes: Record<string, string> = {
  'cabinas-y-preparacion': 'equipo-mayor',
  'soldadura-y-enderezado': 'equipo-menor',
  'mecanica-y-aire': 'equipo-menor'
};
