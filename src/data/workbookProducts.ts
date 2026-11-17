import type { CatalogProduct, ProductDownload } from './productTypes';

// Verified against final verificado(3).xlsx and the manufacturers' documents.
type Input = {
  slug: string; name: string; brand: string; line: string; section: string;
  summary: string; summaryEn: string; description?: string; descriptionEn?: string;
  image: string; sourceUrl?: string; specs: [string, string][];
  highlights?: string[]; downloads?: ProductDownload[]; subline?: string;
};
const asset = (name: string) => `/images/products/workbook/${name}.webp`;
const verified = (name: string) => `/images/products/verified/catalogo-${name}.webp`;
const specs = (items: [string, string][]) => items.map(([label, value]) => ({ label, value }));
const document = (label: string, url: string): ProductDownload => ({ label, url: new URL(url).href });
const product = (p: Input): CatalogProduct => ({
  slug: `catalogo-${p.slug}`, name: p.name, brand: p.brand,
  familySlug: 'mecanica', category: p.line, interest: p.line,
  ...(p.subline ? { catalogSubline: p.subline } : {}),
  application: p.section, technology: 'Tecnología profesional',
  summary: p.summary, summaryEn: p.summaryEn,
  description: p.description || p.summary,
  descriptionEn: p.descriptionEn || p.summaryEn,
  image: p.image, gallery: [p.image],
  badges: [p.brand, p.line].filter(Boolean), specs: specs(p.specs),
  variants: [], highlights: p.highlights || p.specs.slice(0, 3).map(([label, value]) => `${label}: ${value}.`),
  detailBlocks: [{ title: 'Aplicación', body: p.description || p.summary }],
  downloads: [...(p.downloads || []), ...(p.sourceUrl ? [document('Información del fabricante', p.sourceUrl)] : [])],
  sourceUrl: p.sourceUrl, spareParts: ['Refacciones y accesorios bajo consulta']
});

const scangrip = (slug: string, name: string, ref: string, summary: string, summaryEn: string, properties: [string, string][], url: string, sheet: string) => product({
  slug, name: `SCANGRIP ${name}`, brand: 'Scangrip', line: 'Lámparas de igualación', section: 'Pintura',
  summary, summaryEn, image: asset(slug), sourceUrl: url,
  specs: [['Referencia', ref], ...properties], downloads: [document('Ficha técnica', sheet)]
});

const gys = (ref: string, name: string, line: string, summary: string, summaryEn: string, properties: [string, string][]) => product({
  slug: `gys-${ref}`, name: `GYS ${name}`, brand: 'GYS', line, section: 'Baterías',
  summary, summaryEn, image: asset(`gys-${ref}`),
  sourceUrl: `https://planet.gys.fr/spip.php?page=produit&reference=${ref}&lang=es`,
  specs: [['Referencia', ref], ...properties],
  downloads: [document('Ficha técnica en español', `https://planet.gys.fr/extranet/fr/document/datasheet/${ref}/es`), document('Manual de operación', `https://planet.gys.fr/extranet/fr/document/manual/${ref}/es`)]
});

const scanner = (model: string, summary: string, summaryEn: string, properties: [string, string][], sourceUrl: string, image = asset(`sun-pdl-${model}`)) => product({
  slug: `sun-pdl-${model}`, name: `SUN PDL ${model}`, brand: 'SUN', line: 'Escáner', section: 'Mecánica',
  summary, summaryEn, image, sourceUrl, specs: [['Modelo', `PDL ${model}`], ...properties],
  downloads: [document('Manual del usuario', sourceUrl)]
});

const eae = (slug: string, name: string, summary: string, summaryEn: string, properties: [string, string][], image: string, sourceUrl?: string, brochure?: string) => product({
  slug, name: `EAE ${name}`, brand: 'EAE', line: 'Rampas y elevadores EAE', section: 'Mecánica',
  subline: name, summary, summaryEn, image, sourceUrl, specs: properties,
  downloads: brochure ? [document('Folleto del fabricante', brochure)] : []
});

export const workbookAdditionalProducts: CatalogProduct[] = [
  scangrip('scangrip-sunmatch-4', 'SUNMATCH 4', '03.5657',
    'Lámpara de mano recargable para igualación de color, con 500 lúmenes y barrido CCT SCAN.',
    'Rechargeable 500-lumen handheld colour-matching light with CCT SCAN.',
    [['Flujo luminoso', '50–500 lm'], ['Temperatura de color', '2500–6500 K'], ['Reproducción cromática', 'CRI+ >95'], ['Protección', 'IP65 / IK07'], ['Batería', 'Li-ion, 3.7 V / 2600 mAh'], ['Autonomía', '2–10 h según intensidad']],
    'https://us.scangrip.com/en-us/shop/auto-paint-and-detailing-lights/03-5657-sunmatch-4',
    'https://us.scangrip.com/Files/Images/03.5657/03.5657_SUNMATCH-4-PRODUCTSHEET-uk-low.pdf'),
  scangrip('scangrip-matchpen', 'MATCHPEN', '03.5117',
    'Lámpara de bolsillo de 100 lúmenes para inspeccionar defectos de pintura y superficies pulidas.',
    '100-lumen pocket inspection light for paint defects and polished surfaces.',
    [['Flujo luminoso', '100 lm'], ['Temperatura de color', '4500 K'], ['Reproducción cromática', 'CRI >90'], ['Haz ajustable', '10°–70°'], ['Alimentación', '2 pilas AAA'], ['Protección', 'IP54']],
    'https://us.scangrip.com/en-us/shop/auto-paint-and-detailing-lights/03-5117-matchpen',
    'https://us.scangrip.com/Files/Images/03.5117/03.5117_matchpen_productsheet_high_en.pdf'),
  scangrip('scangrip-i-match-4', 'I-MATCH 4', '03.5663',
    'Lámpara frontal recargable para trabajar con las manos libres, con sensor y cinco temperaturas de color.',
    'Rechargeable hands-free headlamp with motion sensor and five colour temperatures.',
    [['Flujo luminoso', '25–250 lm'], ['Temperatura de color', '2500–6500 K, 5 niveles'], ['Reproducción cromática', 'CRI+ >95'], ['Protección', 'IP65 / IK07'], ['Batería', 'Li-ion, 3.7 V / 1400 mAh'], ['Carga', 'USB, aproximadamente 4 h']],
    'https://www.scangrip.com/en-gb/shop/specialized-work-lights/paint-industry/03-5663-i-match-4',
    'https://www.scangrip.com/Files/Images/03.5663-i-match-4/03.5663-i-match-4-productsheet-en-print.pdf'),
  scangrip('scangrip-multimatch-r', 'MULTIMATCH R', '03.5658',
    'Proyector compacto recargable de 1200 lúmenes para inspección, detallado e igualación de color.',
    'Compact rechargeable 1200-lumen floodlight for inspection, detailing and colour matching.',
    [['Flujo luminoso', '120–1200 lm'], ['Temperatura de color', '2500–6500 K'], ['Reproducción cromática', 'CRI >95'], ['Protección', 'IP67 / IK07'], ['Batería', 'Li-ion, 3.7 V / 6000 mAh'], ['Autonomía', '1–10 h según intensidad']],
    'https://us.scangrip.com/en-us/shop/auto-paint-and-detailing-lights/03-5628-us-multimatch-r',
    'https://us.scangrip.com/Files/Images/03.5658/03.5658-MULTIMATCH-R-PRODUCTSHEET-uk-low.pdf'),
  scangrip('scangrip-multimatch-8-connect', 'MULTIMATCH 8 CONNECT', '03.5676C',
    'Proyector de hasta 8000 lúmenes con control Bluetooth y CCT SCAN para superficies grandes.',
    'Up to 8000-lumen inspection floodlight with Bluetooth control and CCT SCAN for large surfaces.',
    [['Flujo luminoso', '800–8000 lm'], ['Temperatura de color', '2500–6500 K'], ['Reproducción cromática', 'CRI+ >95'], ['Alimentación', 'Baterías 18/20 V con SCANGRIP CONNECTOR o POWER SUPPLY CONNECT'], ['Control', 'Bluetooth; intensidad en 5 niveles'], ['Incluye', 'Lámpara y manual; batería, conector y fuente se seleccionan aparte']],
    'https://us.scangrip.com/en-us/shop/auto-paint-and-detailing-lights/03-5676c-multimatch-8-connect',
    'https://us.scangrip.com/Files/Images/03.5676C-multimatch-8-connect/03.5676C_MULTIMATCH-8-CONNECT-product-sheet-uk-high.pdf'),
  gys('085855', 'NOMAD POWER PRO 701', 'Arrancadores',
    'Arrancador portátil de litio NOMAD POWER PRO 701 para asistencia de arranque de vehículos de 12 V.',
    'Portable lithium NOMAD POWER PRO 701 booster for 12 V vehicle starting assistance.',
    [['Tecnología', 'Litio'], ['Tensión de arranque', '12 V'], ['Peso de empaque', '1.247 kg']]),
  gys('025738', 'PBT 824', 'Probadores de baterías',
    'Probador profesional con impresora para baterías de 6/12 V y conjuntos de 24 V; prueba arranque y alternador.',
    'Professional tester with printer for 6/12 V batteries and 24 V packs, starting and charging systems.',
    [['Baterías', 'Plomo, 6/12 V; conjuntos de 24 V'], ['Capacidad', '7–240 Ah'], ['Sistema de arranque y alternador', '12/24 V'], ['Resultados', 'Impresora térmica integrada y transferencia a PC'], ['Protección', 'Inversión de polaridad']]),
  gys('076686', 'PBT 812 START/STOP', 'Probadores de baterías',
    'Probador de baterías de 6/12 V con impresora térmica, pantalla a color y pruebas de arranque y alternador de 12 V.',
    '6/12 V battery tester with thermal printer, colour display and 12 V starter and alternator tests.',
    [['Baterías', 'Plomo, 6/12 V'], ['Capacidad', '7–240 Ah'], ['Arranque y alternador', '12 V'], ['Pantalla', 'Color, 2.8 pulgadas'], ['Resultados', 'Impresora térmica integrada y transferencia a PC']]),
  gys('079823', 'DBT 500 START/STOP', 'Probadores de baterías',
    'Probador electrónico compacto para evaluar batería, sistema de arranque y alternador, con resultados descargables.',
    'Compact electronic tester for battery, starter and alternator checks with downloadable results.',
    [['Modelo', 'DBT 500 START/STOP'], ['Resultados', 'Descarga y almacenamiento electrónico'], ['Protección', 'Inversión de polaridad'], ['Peso de empaque', '0.44 kg']]),
  product({
    slug: 'geoliner-660', name: 'Hofmann GEOLINER® 660', brand: 'Hofmann', line: 'Alineadoras', section: 'Mecánica',
    summary: 'Alineadora por imágenes con cámaras XD, seguimiento automático de altura y compensación rápida.',
    summaryEn: 'Imaging wheel aligner with XD cameras, automatic height tracking and quick compensation.',
    image: asset('geoliner-660'), sourceUrl: 'https://hofmann-equipment.com/la-es/geoliner-660',
    specs: [['Número de parte', 'EEWA712TH3'], ['Diámetro de rueda, garras AC200', '12–24 pulgadas'], ['Distancia entre ejes', '201–457 cm'], ['Ancho de vía', '122–244 cm'], ['Alimentación', '110–240 V, 50/60 Hz']],
    downloads: [document('Folleto en español', 'https://hofmann-equipment.com/uploads/media-pdf-files/sswa23085 - geoliner 660 LA-ES [WEB].pdf')]
  }),
  scanner('8200',
    'Diagnóstico automotriz con pantalla táctil de 10.1 pulgadas y herramientas de diagnóstico guiado.',
    'Automotive diagnostics with a 10.1-inch touchscreen and guided diagnostic tools.',
    [['Pantalla', 'Táctil capacitiva, 10.1 pulgadas, 1024 × 600'], ['Batería', 'Li-ion, 7.2 V / 6000 mAh'], ['Autonomía orientativa', '8 h con brillo al 50 %'], ['Alimentación del vehículo', '10–20 V CC'], ['Peso con batería', '1.4 kg']],
    'https://www.snapon.com/DiagnosticsManuals/PDL/8200/ES/Content/ES/ES%20Getting%20Started.htm'),
  scanner('7100',
    'Escáner SUN con diagnóstico OBD-II/EOBD, lectura de datos y pruebas funcionales según la cobertura del vehículo.',
    'SUN scan tool with OBD-II/EOBD diagnostics, live data and functional tests according to vehicle coverage.',
    [['Funciones', 'Scanner y OBD-II/EOBD'], ['Datos', 'Lectura y registro de parámetros'], ['Conectividad', 'Wi-Fi y conexión a PC'], ['Cobertura', 'Según vehículo y versión de software']],
    'https://www.snapon.com/DiagnosticsManuals/PDL/MX%20PDL/Content/PDL/MX/7100/ZEESCMX135A%20Rev%20B.pdf'),
  scanner('8100',
    'Plataforma de diagnóstico SUN con pruebas guiadas de componentes y osciloscopio/multímetro.',
    'SUN diagnostic platform with guided component tests and oscilloscope/multimeter.',
    [['Funciones', 'Scanner, OBD-II/EOBD y pruebas guiadas'], ['Medición', 'Osciloscopio / multímetro integrado'], ['Conectividad', 'Wi-Fi y USB'], ['Cobertura', 'Según vehículo y versión de software']],
    'https://www.snapon.com/DiagnosticsManuals/PDL/MX%20PDL/Content/PDL/MX/8100/ZEEMSMX144A%20Rev%20B.pdf'),
  scanner('3200',
    'Escáner de arranque rápido con pantalla táctil de 7 pulgadas y registro de hasta cuatro parámetros simultáneos.',
    'Fast-start scan tool with a 7-inch touchscreen and recording of up to four simultaneous data parameters.',
    [['Pantalla', 'Táctil capacitiva, 7 pulgadas'], ['Inicio', 'Aproximadamente 2 segundos'], ['Memoria', 'microSD de 32 GB'], ['Datos en vivo', 'Hasta 4 parámetros y gráficos simultáneos'], ['Conectividad', 'USB; ShopStream Connect para PC'], ['Alimentación', 'Batería de litio con carga desde el vehículo']],
    'https://www.snapon.com/DiagnosticsManuals/PDL/BR%20PDL/Content/PDL/BR/3200/ZEESCBR132A_.pdf', verified('scanner')),
  scanner('4200',
    'Escáner SUN con lectura de códigos, datos en vivo, pruebas funcionales y controles bidireccionales.',
    'SUN scan tool with code reading, live data, functional tests and bidirectional controls.',
    [['Inicio', 'Aproximadamente 2 segundos'], ['Diagnóstico', 'Códigos, datos en vivo y pruebas funcionales'], ['Funciones', 'Reaprendizajes y adaptaciones según vehículo'], ['Controles', 'Bidireccionales según cobertura'], ['Identificación', 'Lectura automática del vehículo compatible'], ['Sistema', 'SMX dedicado al diagnóstico']],
    'https://www.snapon.com/DiagnosticsManuals/PDL/4200/ES/MX/', verified('scanner-2')),
  eae('eae-c10m', 'C10M — elevador de dos postes',
    'Elevador de portería de 4.2 toneladas con descenso manual y controles de 24 V.',
    '4.2-tonne overhead two-post lift with manual lowering and 24 V controls.',
    [['Clave', 'EAEEE-C10M'], ['Capacidad', '4.2 t'], ['Control', '24 V; descenso con un botón'], ['Brazos', 'De 3 y 2 etapas, con bloqueo automático'], ['Cilindros', 'Aluminio con protección anti-surge']], asset('eae-c10m')),
  eae('eae-f10m', 'F10M — elevador de dos postes',
    'Elevador de 4.2 toneladas sin barra superior, con controles de 24 V y protección para puertas.',
    '4.2-tonne base-plate two-post lift with 24 V controls and door protection pads.',
    [['Clave', 'EAEEE-F10M'], ['Capacidad', '4.2 t'], ['Control', '24 V'], ['Brazos', 'Corto de 3 etapas y largo de 2 etapas'], ['Protección', 'Almohadillas para puertas']], asset('eae-f10m')),
  eae('eae-62b', 'EE-62B.42T.E — elevador con base',
    'Elevador electrohidráulico de 4.2 toneladas con tecnología APS, adecuado para talleres de techo bajo.',
    '4.2-tonne electro-hydraulic base-plate lift with APS technology for low-ceiling workshops.',
    [['Clave del catálogo', 'EAEEE-62BE-42T'], ['Capacidad', '4.2 t'], ['Altura de elevación', '1900 mm'], ['Altura mínima', '90 mm'], ['Altura total', '2825 mm'], ['Bloqueo', 'Eléctrico; sistema de control de 24 V']], asset('eae-62b'),
    'https://eae-ae.co.uk/EE-62B.42T.E/', 'https://eae-ae.co.uk/wp-content/uploads/2025/09/EE-62B.42T.E-Brochure.pdf'),
  eae('eae-62cv3', 'EE-62CV3.42T.E — elevador de portería',
    'Elevador electrohidráulico de 4.2 toneladas con instalación simétrica o asimétrica y altura ajustable.',
    '4.2-tonne clear-floor electro-hydraulic lift with symmetric or asymmetric installation and adjustable height.',
    [['Clave del catálogo', 'EAEEE-62CE-42T'], ['Capacidad', '4.2 t'], ['Altura de elevación', '1900 mm'], ['Altura total ajustable', '3867 / 4300 mm'], ['Instalación', 'Simétrica o asimétrica a 25°'], ['Control', '24 V y bloqueo eléctrico']], asset('eae-62cv3'),
    'https://eae-ae.co.uk/EE-62CV3.42T.E/', 'https://eae-ae.co.uk/wp-content/uploads/2025/09/EE-62CV3.42T.E-Brochure.pdf'),
  eae('eae-adaptador-neumaticos', 'Adaptador para soporte de neumáticos',
    'Accesorio de soporte de neumáticos para elevadores EAE; selección según el equipo instalado.',
    'Tyre support accessory for EAE lifts, selected according to the installed equipment.',
    [['Clave', 'EAE791110998'], ['Aplicación', 'Soporte de neumáticos'], ['Compatibilidad', 'Confirmar con el modelo del elevador']], asset('eae-adaptador-neumaticos')),
  eae('eae-ms12m', 'MS12M — mesa elevadora',
    'Mesa móvil de 1200 kg para desmontar y montar baterías de vehículos eléctricos, motores y transmisiones.',
    '1200 kg mobile lifting table for EV batteries, engines and transmissions.',
    [['Modelo', 'MS12M'], ['Capacidad', '1200 kg'], ['Altura de elevación', '1810 mm'], ['Altura mínima', '800 mm'], ['Plataforma', '1741 + 325 × 800 mm'], ['Control', '24 V, mando portátil y bloqueo eléctrico']], verified('rampas-y-elevadores-eae-3'),
    'https://eae-ae.co.uk/lifting-table/', 'https://eae-ae.co.uk/wp-content/uploads/2025/09/EE-MS12M-Brochure.pdf'),
  eae('eae-mlh10', 'MLH10 — elevador para motocicletas',
    'Rampa hidráulica para motocicletas de hasta una tonelada, con plataforma de 2200 × 800 mm.',
    'Hydraulic motorcycle lift for loads up to one tonne, with a 2200 × 800 mm platform.',
    [['Clave', 'EAEMLH10'], ['Capacidad', '1000 kg'], ['Altura de elevación', '1200 mm'], ['Plataforma', '2200 × 800 mm'], ['Sistema', 'Hidráulico'], ['Sujeción de rueda', 'Manual']], verified('rampas-y-elevadores-eae-4'),
    'https://eae-ae.co.uk/motorcycle-lift/'),
  product({
    slug: 'filtro-techo', name: 'Filtro de techo para cabina', brand: '', line: 'Tecnología de filtros y aire comprimido', section: 'Pintura y Aplicación', subline: 'Filtros para cabina',
    summary: 'Medio filtrante para el techo de la cabina, seleccionado según medidas y configuración de ventilación.',
    summaryEn: 'Spray-booth ceiling filter media selected according to dimensions and ventilation configuration.',
    image: asset('filtros-cabina'), specs: [['Ubicación', 'Techo / entrada de aire'], ['Selección', 'Según marca, modelo, medidas y fotos de la cabina'], ['Servicio', 'Cotización y mantenimiento bajo consulta']]
  })
];

const filterPatch = (name: string, location: string): Partial<CatalogProduct> => ({
  name, brand: '', catalogSubline: 'Filtros para cabina',
  summary: `${name}: selección a medida para la filtración de aire de tu cabina.`,
  description: `Medio filtrante para ${location}. Comparte la marca, modelo, medidas y fotos de la cabina para que Etapel confirme el material y la configuración adecuados. También puedes solicitar mantenimiento.`,
  badges: ['Filtros para cabina', 'Cotización a medida'],
  specs: specs([['Ubicación', location], ['Selección', 'Marca, modelo, medidas y fotos de la cabina'], ['Servicio', 'Cotización y mantenimiento']]),
  downloads: [], sourceUrl: '',
  highlights: ['Selección de material y medidas según tu cabina.', 'Asesoría para reposición y mantenimiento.'],
  detailBlocks: [{ title: 'Solicita una cotización', body: 'Indica marca y modelo, comparte fotos de la cabina y cuéntanos si también necesitas mantenimiento.' }]
});

export const workbookProductPatches: Record<string, Partial<CatalogProduct>> = {
  'catalogo-startium-480e-12-24-v': { category: 'Arrancadores', interest: 'Arrancadores', catalogSubline: 'STARTIUM', summary: 'Cargador y arrancador STARTIUM 480E para baterías de 12/24 V.' },
  'catalogo-plenum': { ...filterPatch('Filtro plenum para cabina', 'Plenum / difusión de aire'), image: asset('filtros-cabina'), gallery: [asset('filtros-cabina')] },
  'catalogo-filtro-techo': { image: asset('filtros-cabina'), gallery: [asset('filtros-cabina')] },
  'catalogo-bolsa': filterPatch('Filtro de cabina tipo bolsa', 'Bolsa / prefiltración'),
  'catalogo-piso': filterPatch('Filtro de piso para cabina', 'Piso / retención de pintura'),
  'catalogo-cam-alinger': {
    name: 'JOSAM Cam-Aligner',
    summary: 'Sistema de alineación de ruedas por cámaras para vehículos pesados y múltiples ejes.',
    downloads: [document('Folleto Cam-Aligner en español', 'https://josam.se/wp-content/uploads/Josam-Cam-aligner-brochure-T-155-5-ES.pdf'), document('Especificaciones técnicas en español', 'https://josam.se/wp-content/uploads/sswa23118a-Cam-Aligner-tech-specs-EU-es.pdf')],
    sourceUrl: 'https://josam.se/es/producto/cam-aligner/'
  },
  'catalogo-ez-adas-recalibration-system': {
    name: 'Car-O-Liner EZ-ADAS', brand: 'Car-O-Liner', catalogSubline: 'Car-O-Liner',
    summary: 'Sistema de recalibración ADAS con colocación de objetivos guiada por láser y procedimientos OEM.',
    summaryEn: 'ADAS recalibration system with laser-guided target placement and OEM-based procedures.',
    description: 'EZ-ADAS de Car-O-Liner facilita el posicionamiento de objetivos respecto a la línea central del vehículo mediante guía láser. Su estructura plegable permite organizar el espacio del taller; la cobertura se confirma según vehículo y accesorios.',
    descriptionEn: 'Car-O-Liner EZ-ADAS uses laser guidance to position calibration targets relative to the vehicle centreline. The folding frame saves workshop space; coverage depends on the vehicle and selected accessories.',
    image: asset('car-o-liner-ez-adas'), gallery: [asset('car-o-liner-ez-adas')],
    badges: ['Car-O-Liner', 'ADAS', 'Guía láser'],
    specs: specs([['Marca', 'Car-O-Liner'], ['Sistema', 'EZ-ADAS'], ['Posicionamiento', 'Línea central y guía láser'], ['Procedimiento', 'Basado en instrucciones OEM'], ['Almacenamiento', 'Estructura plegable'], ['Cobertura', 'Según vehículo, objetivos y accesorios']]),
    highlights: ['Colocación de objetivos guiada por láser.', 'Procedimientos basados en especificaciones OEM.', 'Estructura plegable para almacenamiento.'],
    detailBlocks: [{ title: 'Calibración en el taller', body: 'Etapel puede confirmar la configuración de objetivos, el espacio de trabajo y la cobertura requerida para los vehículos atendidos.' }],
    downloads: [document('Folleto EZ-ADAS en español', 'https://car-o-liner.com/wp-content/uploads/36537-EZ-ADAS-Brochure_2021-02_ES.pdf')],
    sourceUrl: 'https://car-o-liner.com/es/producto/ez-adas/'
  },
  'catalogo-rampas-y-elevadores-eae': {
    summary: 'Elevadores de dos postes, mesa para baterías de vehículos eléctricos y rampa para motocicletas.',
    description: 'Explora las fichas individuales EAE C10M, F10M, EE-62B.42T.E, EE-62CV3.42T.E, MS12M y MLH10 para consultar capacidades, dimensiones, controles y documentos. Etapel confirma instalación y accesorios según el modelo.',
    specs: specs([['Elevadores de dos postes', '4.2 t; C10M, F10M, EE-62B y EE-62CV3'], ['Mesa MS12M', '1200 kg'], ['Rampa para motocicletas MLH10', '1000 kg']]),
    variants: [{ name: 'C10M / F10M', note: 'Elevadores de 4.2 t con controles de 24 V.' }, { name: 'EE-62B / EE-62CV3', note: 'Elevadores de 4.2 t con tecnología APS.' }, { name: 'MS12M', note: 'Mesa móvil para baterías, motores y transmisiones.' }, { name: 'MLH10', note: 'Elevador para motocicletas de hasta una tonelada.' }]
  },
  'catalogo-scanner': {
    summary: 'Compara los escáneres SUN PDL 8200, 7100, 8100, 3200 y 4200.',
    description: 'Cada modelo SUN cuenta con una ficha individual con sus funciones, características y documentación disponible. Consulta los productos relacionados para elegir el equipo de diagnóstico adecuado a tu taller.',
    specs: specs([['Modelos', 'PDL 8200, PDL 7100, PDL 8100, PDL 3200 y PDL 4200'], ['Selección', 'Según vehículos, funciones y cobertura de software']]),
    variants: ['8200', '7100', '8100', '3200', '4200'].map(model => ({ name: `PDL ${model}`, note: 'Consulta su ficha individual y confirma la cobertura con Etapel.' }))
  }
};

export const applyWorkbookProductPatch = (p: CatalogProduct): CatalogProduct => ({ ...p, ...workbookProductPatches[p.slug] });
