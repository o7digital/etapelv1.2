import type { CatalogProduct } from './productTypes';

export type CatalogFamilySlug = string;

export interface CatalogLineDefinition {
  familySlug: CatalogFamilySlug;
  section: string;
  sectionEn: string;
  name: string;
  nameEn: string;
  sublines: { name: string; nameEn: string }[];
  externalHref?: string;
  contactOnly?: boolean;
}

const children = (...items: [string, string][]) => items.map(([name, nameEn]) => ({ name, nameEn }));

/**
 * Exact order from the customer workbook. Column B is the section, column C
 * the product line, and column D the subline, brand or product type.
 */
export const catalogHierarchy: CatalogLineDefinition[] = [
  { familySlug: 'equipo-mayor', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Cabinas de pintura', nameEn: 'Spray booths', sublines: children(['USI Italia', 'USI Italia'], ['Millibar', 'Millibar']) },
  { familySlug: 'equipo-mayor', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Zonas de preparación', nameEn: 'Preparation areas', sublines: children(['USI Italia', 'USI Italia'], ['Millibar', 'Millibar']) },
  { familySlug: 'equipo-mayor', section: 'Enderezado de carrocería', sectionEn: 'Body straightening', name: 'Bancos de enderezado autos y SUV', nameEn: 'Car and SUV straightening benches', sublines: children(['BenchRack', 'BenchRack'], ['BenchRack Versa', 'BenchRack Versa'], ['Speed 3T', 'Speed 3T']) },
  { familySlug: 'equipo-mayor', section: 'Enderezado de carrocería', sectionEn: 'Body straightening', name: 'Equipos de medición', nameEn: 'Measuring equipment', sublines: children(['POINT X', 'POINT X'], ['Car-O-Tronic', 'Car-O-Tronic']) },
  { familySlug: 'equipo-mayor', section: 'Enderezado de carrocería', sectionEn: 'Body straightening', name: 'Accesorios Car-O-Liner', nameEn: 'Car-O-Liner accessories', sublines: children(['Mordazas de chasis', 'Chassis clamps'], ['EVO 1, 2 y 3', 'EVO 1, 2 and 3']) },
  { familySlug: 'equipo-mayor', section: 'Enderezado de carrocería', sectionEn: 'Body straightening', name: 'Alineación y enderezado de vehículos pesados', nameEn: 'Heavy-vehicle alignment and straightening', sublines: children(['Cam-Aligner', 'Cam-Aligner'], ['Frame Press', 'Frame Press'], ['Inductor de calor', 'Heat inductor']) },
  { familySlug: 'equipo-mayor', section: 'Aire comprimido', sectionEn: 'Compressed air', name: 'Líneas de aire comprimido', nameEn: 'Compressed-air lines', sublines: children(['Prevost', 'Prevost']) },
  { familySlug: 'equipo-mayor', section: 'Aire comprimido', sectionEn: 'Compressed air', name: 'Compresores Denair', nameEn: 'Denair compressors', sublines: children(['Compresor con secador integrado', 'Compressor with integrated dryer']) },
  { familySlug: 'equipo-mayor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Rampas y elevadores EAE', nameEn: 'EAE lifts', sublines: children(['EAE', 'EAE']) },
  { familySlug: 'equipo-mayor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Alineadoras', nameEn: 'Wheel aligners', sublines: children(['Hofmann', 'Hofmann']) },
  { familySlug: 'equipo-mayor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Desmontadoras', nameEn: 'Tire changers', sublines: children(['Hofmann', 'Hofmann']) },
  { familySlug: 'equipo-mayor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Balanceadoras', nameEn: 'Wheel balancers', sublines: children(['Hofmann', 'Hofmann']) },
  { familySlug: 'equipo-mayor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'ADAS', nameEn: 'ADAS calibration', sublines: children(['SUN', 'SUN']) },

  { familySlug: 'equipo-menor', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Lámparas infrarrojas', nameEn: 'Infrared lamps', sublines: children(['Solary', 'Solary'], ['IRT', 'IRT']) },
  { familySlug: 'equipo-menor', section: 'Preparación y acabado', sectionEn: 'Preparation & finishing', name: 'Sistemas de lijado', nameEn: 'Sanding systems', sublines: children(['Lijadoras', 'Sanders'], ['Aspiradoras', 'Vacuum systems']) },
  { familySlug: 'equipo-menor', section: 'Preparación y acabado', sectionEn: 'Preparation & finishing', name: 'Sistema de pulido', nameEn: 'Polishing system', sublines: children(['Pulidoras', 'Polishers'], ['Borlas RUPES', 'RUPES polishing pads']) },
  { familySlug: 'equipo-menor', section: 'Desabollado de carrocería', sectionEn: 'Body dent repair', name: 'Desabollado de carrocería auto y SUV', nameEn: 'Car and SUV dent repair', sublines: children(['Reparación de abolladuras', 'Dent repair'], ['Sistemas de tracción para enderezado', 'Straightening pull systems'], ['Soldadura por punto', 'Spot welding'], ['Remachadoras', 'Riveters'], ['Soldadoras MIG', 'MIG welders'], ['Cortadores plasma', 'Plasma cutters'], ['Inductor de calor', 'Heat inductor']) },
  { familySlug: 'equipo-menor', section: 'Desabollado de carrocería', sectionEn: 'Body dent repair', name: 'Desabollado de carrocería de vehículos pesados', nameEn: 'Heavy-vehicle body repair', sublines: children(['JOSAM', 'JOSAM'], ['Wieländer+Schill', 'Wieländer+Schill'], ['GYS', 'GYS']) },
  { familySlug: 'equipo-menor', section: 'Desabollado de carrocería', sectionEn: 'Body dent repair', name: 'Reparación de plásticos', nameEn: 'Plastic repair', sublines: children(['Polyvance', 'Polyvance']) },
  { familySlug: 'equipo-menor', section: 'Baterías', sectionEn: 'Batteries', name: 'Cargadores', nameEn: 'Battery chargers', sublines: children(['GYSFLASH', 'GYSFLASH'], ['STARTIUM', 'STARTIUM']) },
  { familySlug: 'equipo-menor', section: 'Baterías', sectionEn: 'Batteries', name: 'Arrancadores', nameEn: 'Battery starters', sublines: [], contactOnly: true },
  { familySlug: 'equipo-menor', section: 'Baterías', sectionEn: 'Batteries', name: 'Probadores de baterías', nameEn: 'Battery testers', sublines: children(['GYS', 'GYS']) },
  { familySlug: 'equipo-menor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Escáner', nameEn: 'Diagnostic scanners', sublines: children(['SUN', 'SUN']) },
  { familySlug: 'equipo-menor', section: 'Mecánica', sectionEn: 'Mechanical service', name: 'Aire acondicionado', nameEn: 'Air conditioning', sublines: children(['SUN', 'SUN']) },
  { familySlug: 'equipo-menor', section: 'Herramientas de hojalatería', sectionEn: 'Bodywork tools', name: 'Neumáticas', nameEn: 'Pneumatic tools', sublines: children(['PneuTrend', 'PneuTrend'], ['Porto Power', 'Porto Power']) },
  { familySlug: 'equipo-menor', section: 'Herramientas de hojalatería', sectionEn: 'Bodywork tools', name: 'Herramientas manuales', nameEn: 'Hand tools', sublines: children(['Herramientas de mecánica', 'Mechanical tools'], ['Garlopas ShineMate', 'ShineMate sanding blocks'], ['Limas Wieländer+Schill', 'Wieländer+Schill files'], ['Cuñas Colad', 'Colad spreaders']) },
  { familySlug: 'equipo-menor', section: 'Detallado', sectionEn: 'Detailing', name: 'Pulidoras', nameEn: 'Polishers', sublines: children(['ShineMate', 'ShineMate'], ['RUPES', 'RUPES'], ['Borlas ShineMate', 'ShineMate polishing pads'], ['Borlas RUPES', 'RUPES polishing pads']) },

  { familySlug: 'pintura', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Pistolas para pintar', nameEn: 'Paint spray guns', sublines: children(['Pistolas de gravedad', 'Gravity-feed spray guns'], ['Pistolas de olla de presión', 'Pressure-feed spray guns'], ['Pistolas aerográficas', 'Airbrush spray guns'], ['Pistolas de vaso inferior', 'Siphon-feed spray guns'], ['Pistolas para robot', 'Automatic spray guns']) },
  { familySlug: 'pintura', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Buscador de refacciones SATA', nameEn: 'SATA spare-parts finder', sublines: [], externalHref: 'https://www.sata.com/es/servicio/buscador-de-recambios/' },
  { familySlug: 'pintura', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Accesorios pistolas', nameEn: 'Spray gun accessories', sublines: children(['Adam', 'Adam'], ['Sistemas de depósito', 'Cup systems'], ['Lavadoras de pistola', 'Spray-gun cleaners']) },
  { familySlug: 'pintura', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Protección respiratoria', nameEn: 'Respiratory protection', sublines: children(['SATA air vision 5000', 'SATA air vision 5000'], ['Air star F 2.0', 'Air star F 2.0'], ['Air star C', 'Air star C'], ['Air star F', 'Air star F']) },
  { familySlug: 'pintura', section: 'Pintura y Aplicación', sectionEn: 'Paint & application', name: 'Tecnología de filtros y aire comprimido', nameEn: 'Filtration and compressed air', sublines: children(['Filtros SATA', 'SATA filters'], ['Filtros para cabina', 'Spray-booth filters'], ['Prevost', 'Prevost']) },
  { familySlug: 'pintura', section: 'Pintura', sectionEn: 'Paint', name: 'PPG automotriz', nameEn: 'PPG automotive coatings', sublines: children(['Deltron', 'Deltron'], ['Autolux', 'Autolux'], ['Envirobase', 'Envirobase']) },
  { familySlug: 'pintura', section: 'Pintura', sectionEn: 'Paint', name: 'PPG industrial', nameEn: 'PPG industrial coatings', sublines: children(['Versolon', 'Versolon']) },
  { familySlug: 'pintura', section: 'Pintura', sectionEn: 'Paint', name: 'Pintura en polvo', nameEn: 'Powder coatings', sublines: children(['PPG', 'PPG']) },

  { familySlug: 'consumibles', section: 'Consumibles de pintura', sectionEn: 'Paint consumables', name: 'Lijas', nameEn: 'Abrasives', sublines: children(['Tecnología cerámica', 'Ceramic technology'], ['Tecnología de óxido de aluminio', 'Aluminum-oxide technology'], ['Sistema de lijado para pulir', 'Finishing sanding system']) },
  { familySlug: 'consumibles', section: 'Consumibles de pintura', sectionEn: 'Paint consumables', name: 'Enmascarado', nameEn: 'Masking', sublines: children(['Papel', 'Paper'], ['Masking', 'Masking tape'], ['Plástico', 'Masking film'], ['Protectores', 'Protective products']) },
  { familySlug: 'consumibles', section: 'Consumibles de pintura', sectionEn: 'Paint consumables', name: 'Pulimento', nameEn: 'Polishing compounds and pads', sublines: children(['Pulimentos', 'Polishing compounds'], ['Borlas Farécla', 'Farécla polishing pads'], ['Borlas RUPES', 'RUPES polishing pads']) },
  { familySlug: 'consumibles', section: 'Consumibles de pintura', sectionEn: 'Paint consumables', name: 'Seguridad personal', nameEn: 'Personal protection', sublines: children(['Guantes', 'Gloves'], ['Overoles', 'Coveralls'], ['Mascarillas', 'Respirators']) },
  { familySlug: 'consumibles', section: 'Consumibles de pintura', sectionEn: 'Paint consumables', name: 'Otros', nameEn: 'Other paint consumables', sublines: children(['Coladores', 'Paint strainers'], ['Vasos RPS SATA', 'SATA RPS cups'], ['Tarjetas de cartón para prueba de color', 'Cardboard spray samples'], ['Tarjetas de lámina para prueba de color', 'Metal spray samples'], ['Toallas de limpieza', 'Cleaning wipes'], ['Coagulante para lavadoras base agua', 'Coagulant for waterborne gun cleaners']) },
  { familySlug: 'consumibles', section: 'Consumibles de hojalatería', sectionEn: 'Bodywork consumables', name: 'Masillas y rellenadores', nameEn: 'Putties and fillers', sublines: children(['Poly-Flex', 'Poly-Flex'], ['RAGE OPTEX Gallon', 'RAGE OPTEX Gallon'], ['Lite Weight Optex Gallon', 'Lite Weight Optex Gallon'], ['Z-Grip Optex Gallon', 'Z-Grip Optex Gallon'], ['Spot-Lite', 'Spot-Lite'], ['Masilla acrílica fina beige 200 g', 'Fine beige acrylic putty 200 g']) },
  { familySlug: 'consumibles', section: 'Consumibles de hojalatería', sectionEn: 'Bodywork consumables', name: 'Antipiedras y selladores', nameEn: 'Undercoatings and sealants', sublines: children(['Undercoating M80 repintable', 'Repaintable M80 undercoating'], ['Sellador autoadherible antirruido', 'Self-adhesive sound-deadening pad'], ['Masilla para carrocería (sellador gris)', 'Body sealant (gray)']) },
  { familySlug: 'consumibles', section: 'Consumibles de hojalatería', sectionEn: 'Bodywork consumables', name: 'Consumibles herramientas', nameEn: 'Tool consumables', sublines: children(['Arandelas 8 × 16 mm', '8 × 16 mm washers'], ['Lápiz de carbón', 'Carbon rod'], ['Alambre ondulado', 'Corrugated wire'], ['Anillos de tiro retorcidos', 'Twisted pulling rings'], ['Anillos de tiro rectos', 'Straight pulling rings'], ['Estrellas tiraclavos', 'Dent-pulling stars'], ['Microalambre de acero 0.6 mm', '0.6 mm steel welding wire'], ['Broca de 8 mm', '8 mm drill bit'], ['Segueta de 24 dientes', '24-tooth saw blade']) },
];

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ').toLowerCase();
const definitionByName = new Map(catalogHierarchy.map((line) => [normalize(line.name), line]));

/** La columna B del Excel es la familia. Algunas filas históricas tenían una
 * etiqueta interna distinta (Baterías / Aire comprimido), pero pertenecen a
 * una misma familia de la columna B. */
const familySlugForSection = (section: string) => ({
  [normalize('Pintura y Aplicación')]: 'pintura-y-aplicacion',
  [normalize('Preparación y acabado')]: 'preparacion-y-acabado',
  [normalize('Enderezado de carrocería')]: 'enderezado-de-carroceria',
  [normalize('Desabollado de carrocería')]: 'desabollado-de-carroceria',
  [normalize('Baterías')]: 'cargadores-y-arrancadores-de-baterias',
  [normalize('Aire comprimido')]: 'cargadores-y-arrancadores-de-baterias',
  [normalize('Pintura')]: 'pintura',
  [normalize('Mecánica')]: 'mecanica',
  [normalize('Consumibles de pintura')]: 'consumibles-de-pintura',
  [normalize('Consumibles de hojalatería')]: 'consumibles-de-hojalateria',
  [normalize('Herramientas de hojalatería')]: 'herramientas-de-hojalateria',
  [normalize('Detallado')]: 'detallado',
}[normalize(section)] || 'pintura-y-aplicacion');

const aliases: Record<string, string> = {
  'cabinas y areas': 'Cabinas de pintura', 'cabinas y preparacion': 'Cabinas de pintura',
  'pistolas de pintura': 'Pistolas para pintar', 'pistolas con vaso de gravedad': 'Pistolas para pintar',
  'pistolas con calderin': 'Pistolas para pintar', 'pistolas aerograficas': 'Pistolas para pintar',
  'pistolas de vaso inferior': 'Pistolas para pintar', 'pistolas roboticas': 'Pistolas para pintar',
  'sistemas de deposito': 'Accesorios pistolas', 'tecnologia de filtros': 'Tecnología de filtros y aire comprimido',
  'aire comprimido': 'Tecnología de filtros y aire comprimido', 'accesorios car o liner': 'Accesorios Car-O-Liner',
  'alineacion y enderezado vehiculos pesados': 'Alineación y enderezado de vehículos pesados',
  'desabollo de carroceria auto y suv': 'Desabollado de carrocería auto y SUV',
  'desabollo de carroceria vehiculos pesados': 'Desabollado de carrocería de vehículos pesados',
  'reparacion de plasticos': 'Reparación de plásticos', 'rampas y elevadores eae': 'Rampas y elevadores EAE',
  desmontadora: 'Desmontadoras', 'pintura en polvo': 'Pintura en polvo', 'seguridad personal': 'Seguridad personal',
  scanner: 'Escáner',
  electricas: 'Neumáticas',
  'carritos de herramientas': 'Herramientas manuales',
};

const canonicalLine = (product: CatalogProduct) => {
  if (/comprobador de bater/i.test(product.name)) return 'Probadores de baterías';
  const raw = product.interest || product.category;
  return aliases[normalize(raw)] || definitionByName.get(normalize(raw))?.name || raw;
};

const sublineFor = (product: CatalogProduct, line: string) => {
  const source = normalize(product.interest || product.category);
  const slug = product.slug;
  if (line === 'Pistolas para pintar') return ({ 'pistolas con vaso de gravedad': 'Pistolas de gravedad', 'pistolas con calderin': 'Pistolas de olla de presión', 'pistolas aerograficas': 'Pistolas aerográficas', 'pistolas de vaso inferior': 'Pistolas de vaso inferior', 'pistolas roboticas': 'Pistolas para robot' }[source] || product.name);
  if (line === 'Accesorios pistolas') return slug.includes('drester') ? 'Lavadoras de pistola' : 'Sistemas de depósito';
  if (line === 'Protección respiratoria') {
    if (slug.includes('vision')) return 'SATA air vision 5000';
    if (slug.includes('star-f-2-0')) return 'Air star F 2.0';
    if (slug.includes('star-c')) return 'Air star C';
    return 'Air star F';
  }
  if (line === 'Tecnología de filtros y aire comprimido') return product.brand === 'SATA' ? 'Filtros SATA' : ['catalogo-plenum', 'catalogo-bolsa', 'catalogo-piso'].includes(slug) ? 'Filtros para cabina' : 'Prevost';
  if (line === 'Cabinas de pintura' || line === 'Zonas de preparación') return product.brand === 'Etapel' ? 'Proyecto integral Etapel' : product.brand;
  if (line === 'Bancos de enderezado autos y SUV') return slug.includes('versa') ? 'BenchRack Versa' : slug.includes('speed') ? 'Speed 3T' : 'BenchRack';
  if (line === 'Equipos de medición') return slug.includes('point') ? 'POINT X' : 'Car-O-Tronic';
  if (line === 'Accesorios Car-O-Liner') return slug.includes('b731') ? 'Mordazas de chasis' : 'EVO 1, 2 y 3';
  if (line === 'Alineación y enderezado de vehículos pesados') return slug.includes('cam-alinger') ? 'Cam-Aligner' : product.name;
  if (line === 'Líneas de aire comprimido') return 'Prevost';
  if (line === 'Compresores Denair') return 'Compresor con secador integrado';
  if (['Rampas y elevadores EAE', 'Alineadoras', 'Desmontadoras', 'Balanceadoras', 'ADAS', 'Escáner', 'Aire acondicionado'].includes(line)) return product.brand;
  if (line === 'Lámparas infrarrojas') return product.brand === 'Solary' ? 'Solary' : 'IRT';
  if (line === 'Sistemas de lijado') return /aspirador/i.test(product.name) ? 'Aspiradoras' : 'Lijadoras';
  if (line === 'Sistema de pulido') return /borlas|pad/i.test(product.name) ? 'Borlas RUPES' : 'Pulidoras';
  if (line === 'Desabollado de carrocería auto y SUV') {
    if (slug.includes('sistemas-de-traccion')) return 'Sistemas de tracción para enderezado';
    if (/pti-neo|pti-expert/.test(slug)) return 'Soldadura por punto';
    if (slug.includes('remachadora')) return 'Remachadoras';
    if (/smartmig|carmig|e2-gys|e3-gys|autopulse/.test(slug)) return 'Soldadoras MIG';
    if (/easycut|cutter/.test(slug)) return 'Cortadores plasma';
    if (slug.includes('gysduction')) return 'Inductor de calor';
    return 'Reparación de abolladuras';
  }
  if (line === 'Desabollado de carrocería de vehículos pesados') return product.brand;
  if (line === 'Reparación de plásticos') return 'Polyvance';
  if (line === 'Cargadores') return /startium/i.test(product.name) ? 'STARTIUM' : 'GYSFLASH';
  if (line === 'Probadores de baterías') return 'GYS';
  if (line === 'Neumáticas') return product.brand === 'PneuTrend' ? 'PneuTrend' : 'Porto Power';
  if (line === 'Herramientas manuales') return ['Jonnesway', 'SUN'].includes(product.brand) ? 'Herramientas de mecánica' : product.brand === 'ShineMate' ? 'Garlopas ShineMate' : product.brand.includes('Wiel') ? 'Limas Wieländer+Schill' : 'Cuñas Colad';
  if (line === 'Pulidoras') return /foam|wool|pad|borla/i.test(product.name) ? `Borlas ${product.brand}` : product.brand;
  if (line === 'PPG automotriz') return slug.includes('deltron') ? 'Deltron' : slug.includes('autolux') ? 'Autolux' : 'Envirobase';
  if (line === 'PPG industrial') return 'Versolon';
  if (line === 'Pintura en polvo') return 'PPG';
  if (line === 'Lijas') return product.brand === 'Etapel' ? 'Tecnología cerámica' : product.brand === 'Kovax' ? 'Tecnología de óxido de aluminio' : 'Sistema de lijado para pulir';
  if (line === 'Enmascarado') return /papel/i.test(product.name) ? 'Papel' : /cinta/i.test(product.name) ? 'Masking' : /pl[aá]stico/i.test(product.name) ? 'Plástico' : 'Protectores';
  if (line === 'Pulimento') return /borlas frecla/i.test(product.name) ? 'Borlas Farécla' : /almohadillas/i.test(product.name) ? 'Borlas RUPES' : 'Pulimentos';
  if (line === 'Seguridad personal') return /glove/i.test(product.name) ? 'Guantes' : /overall/i.test(product.name) ? 'Overoles' : 'Mascarillas';
  if (line === 'Otros') return /coladores/i.test(product.name) ? 'Coladores' : /rps/i.test(product.name) ? 'Vasos RPS SATA' : /paper spray samples/i.test(product.name) ? 'Tarjetas de cartón para prueba de color' : /metal spray samples/i.test(product.name) ? 'Tarjetas de lámina para prueba de color' : /toallitas/i.test(product.name) ? 'Toallas de limpieza' : 'Coagulante para lavadoras base agua';
  if (line === 'Masillas y rellenadores') return slug.includes('masilla-acrilica') ? 'Masilla acrílica fina beige 200 g' : product.name;
  if (line === 'Antipiedras y selladores') return slug.includes('undercoating-m80') ? 'Undercoating M80 repintable' : slug.includes('sellador-auto-adherible') ? 'Sellador autoadherible antirruido' : 'Masilla para carrocería (sellador gris)';
  if (line === 'Consumibles herramientas') {
    if (slug.includes('arandelas')) return 'Arandelas 8 × 16 mm';
    if (slug.includes('lapiz-de-carbon')) return 'Lápiz de carbón';
    if (slug.includes('hilo-ondulado')) return 'Alambre ondulado';
    if (slug.includes('anillas-de-tiro-torcidas')) return 'Anillos de tiro retorcidos';
    if (slug.includes('anillas-de-tiro-recto')) return 'Anillos de tiro rectos';
    if (slug.includes('estrellas-tiraclavos')) return 'Estrellas tiraclavos';
    if (slug.includes('hilo-mag-acero')) return 'Microalambre de acero 0.6 mm';
    if (slug.includes('broca')) return 'Broca de 8 mm';
    return 'Segueta de 24 dientes';
  }
  return product.name;
};

export const catalogPlacementFor = (product: CatalogProduct) => {
  const lineName = canonicalLine(product);
  const definition = definitionByName.get(normalize(lineName));
  return {
    familySlug: definition ? familySlugForSection(definition.section) : product.familySlug,
    catalogSection: definition?.section || product.application,
    catalogLine: definition?.name || lineName,
    catalogSubline: sublineFor(product, definition?.name || lineName),
    catalogOrder: definition ? catalogHierarchy.indexOf(definition) : 999,
  };
};

const workbookLineOrder: Record<string, string[]> = {
  'pintura-y-aplicacion': ['Pistolas para pintar', 'Buscador de refacciones SATA', 'Accesorios pistolas', 'Cabinas de pintura', 'Zonas de preparación', 'Protección respiratoria', 'Tecnología de filtros y aire comprimido', 'Lámparas infrarrojas'],
  'preparacion-y-acabado': ['Sistemas de lijado', 'Sistema de pulido'],
  'enderezado-de-carroceria': ['Bancos de enderezado autos y SUV', 'Equipos de medición', 'Accesorios Car-O-Liner', 'Alineación y enderezado de vehículos pesados'],
  'desabollado-de-carroceria': ['Desabollado de carrocería auto y SUV', 'Desabollado de carrocería de vehículos pesados', 'Reparación de plásticos'],
  'cargadores-y-arrancadores-de-baterias': ['Cargadores', 'Arrancadores', 'Probadores de baterías', 'Líneas de aire comprimido', 'Compresores Denair'],
  pintura: ['PPG automotriz', 'PPG industrial', 'Pintura en polvo'],
  mecanica: ['Rampas y elevadores EAE', 'Escáner', 'Alineadoras', 'Desmontadoras', 'Balanceadoras', 'Aire acondicionado', 'ADAS'],
  'consumibles-de-pintura': ['Lijas', 'Enmascarado', 'Pulimento', 'Seguridad personal', 'Otros'],
  'consumibles-de-hojalateria': ['Masillas y rellenadores', 'Antipiedras y selladores', 'Consumibles herramientas'],
  'herramientas-de-hojalateria': ['Neumáticas', 'Herramientas manuales'],
  detallado: ['Pulidoras']
};

export const catalogLinesForFamily = (familySlug: string) => {
  const order = workbookLineOrder[familySlug] || [];
  return catalogHierarchy
    .filter((line) => familySlugForSection(line.section) === familySlug)
    .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
};

export const catalogLineTranslation = (value: string) => {
  const key = normalize(value);
  if (key === normalize('Proyecto integral Etapel')) return 'Etapel turnkey project';
  for (const line of catalogHierarchy) {
    if (normalize(line.name) === key) return line.nameEn;
    const child = line.sublines.find((item) => normalize(item.name) === key);
    if (child) return child.nameEn;
  }
  return value;
};
