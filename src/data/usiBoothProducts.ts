import type { CatalogProduct } from './productTypes';

export const usiBoothParentSlug = 'catalogo-cabinas-de-pintura-usi-italia';

type BoothInput = Pick<CatalogProduct, 'slug' | 'name' | 'summary' | 'summaryEn' | 'description' | 'descriptionEn' | 'specs' | 'highlights'> & {
  file: string;
  page: string;
  brochure?: string;
};

const booth = ({ file, page, brochure, ...product }: BoothInput, index: number): CatalogProduct => {
  const image = `/images/products/usi-booths/${file}`;
  const sourceUrl = `https://www.usiitalia.com/en/products/${page}/`;
  return {
    ...product,
    brand: 'USI Italia',
    familySlug: 'pintura-y-aplicacion',
    catalogParentSlug: usiBoothParentSlug,
    catalogSubline: 'USI Italia',
    catalogOrder: index,
    catalogVisible: true,
    category: 'Cabinas de pintura',
    interest: 'Cabinas de pintura',
    application: 'Pintura y Aplicación',
    technology: 'Cabina de pintura',
    sprayPattern: 'No aplica',
    nozzleTechnology: 'No aplica',
    image,
    gallery: [image],
    badges: ['USI Italia', 'Cabinas de pintura'],
    variants: [],
    detailBlocks: [],
    sourceUrl,
    downloads: [
      ...(brochure ? [{ label: 'Ficha técnica', url: `https://www.usiitalia.com/wp-content/uploads/${brochure}` }] : []),
      { label: 'Información del fabricante', url: sourceUrl },
    ],
  };
};

// The six models displayed in the manufacturer's Painting Booths collection,
// in the same order. Original photographs and product pages checked 2026-11-24.
export const usiBoothProducts: CatalogProduct[] = [
  {
    slug: 'usi-ohmni', name: 'USI Italia Ohmni', file: 'ohmni.jpg', page: 'ohmni',
    summary: 'Cabina eléctrica con calentamiento del aire y secado por infrarrojos.',
    summaryEn: 'Electric spray booth with heated air and infrared curing.',
    description: 'Combina resistencias eléctricas durante la aplicación con emisores infrarrojos integrados durante el secado. Sus programas se gestionan desde la pantalla táctil o un PC.',
    descriptionEn: 'Uses electric coils during painting and integrated infrared emitters during curing. Programs can be managed from the touchscreen or a PC.',
    specs: [{ label: 'Calentamiento', value: 'Eléctrico' }, { label: 'Secado', value: 'Infrarrojos SWIR / MWIR' }, { label: 'Control', value: 'Pantalla táctil / PC' }],
    highlights: ['Calentamiento sin combustibles fósiles.', 'Programas de secado configurables.'],
    brochure: '2024/07/USI_2022_Flyer_OHMNI_ENG_sc.pdf',
  },
  {
    slug: 'usi-master', name: 'USI Italia Master', file: 'master.png', page: 'master',
    summary: 'Cabina con turbinas industriales de accionamiento directo y flujo de aire estable.',
    summaryEn: 'Spray booth with direct-drive industrial turbines and steady airflow.',
    description: 'Sus ventiladores de álabes curvados hacia atrás mantienen el caudal durante el uso de los filtros. Ofrece diferentes configuraciones de calentamiento y accesorios para el proceso de pintura.',
    descriptionEn: 'Backward-curved fans maintain airflow as the filters are used. Different heating configurations and accessories adapt the booth to the painting process.',
    specs: [{ label: 'Ventilación', value: 'Turbinas de accionamiento directo' }, { label: 'Aplicación', value: 'Repintado, incluidas pinturas base agua' }, { label: 'Configuración', value: 'Calentamiento y accesorios según proyecto' }],
    highlights: ['Ventilación sin correas de transmisión.', 'Configuraciones y accesorios según el taller.'],
    brochure: '2025/01/USI_Scheda_Master_BIANCO_ENG_sc.pdf',
  },
  {
    slug: 'usi-energo', name: 'USI Italia Energo', file: 'energo.png', page: 'energo',
    summary: 'Cabina con variadores en impulsión y extracción para ajustar el aire a cada fase.',
    summaryEn: 'Spray booth with intake and exhaust inverters to match airflow to each phase.',
    description: 'Regula la velocidad de los motores y la presión de la cabina según las necesidades del proceso. El panel DGTouch One permite gestionar el caudal de aire.',
    descriptionEn: 'Adjusts motor speed and booth pressure to the process requirements. The DGTouch One panel controls airflow.',
    specs: [{ label: 'Ventilación', value: 'Variadores en impulsión y extracción' }, { label: 'Control', value: 'DGTouch One' }, { label: 'Presión', value: 'Regulación electrónica' }],
    highlights: ['Caudal ajustado a la fase de trabajo.', 'Arranque progresivo de los motores.'],
    brochure: '2024/03/USI_Scheda_Energo_BIANCO_ENG.pdf',
  },
  {
    slug: 'usi-he', name: 'USI Italia HE', file: 'he.jpg', page: 'high-efficiency-system',
    summary: 'Sistema de cabina de alta eficiencia con gestión del aire y conectividad digital.',
    summaryEn: 'High-efficiency booth system with airflow management and digital connectivity.',
    description: 'Su diseño aeráulico busca reducir el consumo de los motores conservando el rendimiento de ventilación. El sistema permite comunicación bidireccional entre la cabina y un PC.',
    descriptionEn: 'Its airflow design reduces motor consumption while maintaining ventilation performance. The system supports two-way communication between the booth and a PC.',
    specs: [{ label: 'Sistema', value: 'High Efficiency' }, { label: 'Conectividad', value: 'Comunicación PC / cabina / PC' }, { label: 'Configuración', value: 'Adaptable a instalaciones industriales' }],
    highlights: ['Gestión eficiente del flujo de aire.', 'Registro y digitalización de procesos.'],
    brochure: '2023/02/USI_2022_Flyer_HE_ENG_sc.pdf',
  },
  {
    slug: 'usi-open-booth', name: 'USI Italia Open Booth', file: 'open-booth.png', page: 'open-booth',
    summary: 'Cabina abierta modular con aspiración horizontal y filtración en seco.',
    summaryEn: 'Modular open-front booth with horizontal extraction and dry filtration.',
    description: 'Facilita la aplicación de imprimaciones y el acabado de piezas sin ocupar la cabina principal. Su frente abierto y diseño modular simplifican el movimiento de los elementos a pintar.',
    descriptionEn: 'Supports primer application and parts finishing without occupying the main booth. Its open front and modular design simplify handling the items being painted.',
    specs: [{ label: 'Diseño', value: 'Frente abierto modular' }, { label: 'Filtración', value: 'En seco, tres niveles' }, { label: 'Ventilación', value: 'Extracción horizontal con variador' }],
    highlights: ['Configuración modular según el espacio.', 'Iluminación LED integrada.'],
  },
  {
    slug: 'usi-chronotech', name: 'USI Italia Chronotech', file: 'chronotech.png', page: 'chronotech',
    summary: 'Cabina con control del aire, calor y perfiles de trabajo para el repintado.',
    summaryEn: 'Spray booth with controlled airflow, heat and refinishing work profiles.',
    description: 'Adapta los flujos y ciclos térmicos a la operación. Integra gestión de procesos DGT Manager y el asistente E.P.S.; se ofrece en configuraciones Dynamic, Elite y Supremacy.',
    descriptionEn: 'Adapts airflow and heating cycles to the operation. Includes DGT Manager process management and the E.P.S. assistant, with Dynamic, Elite and Supremacy configurations.',
    specs: [{ label: 'Gestión', value: 'DGT Manager' }, { label: 'Asistente', value: 'E.P.S.' }, { label: 'Configuraciones', value: 'Dynamic / Elite / Supremacy' }],
    highlights: ['Perfiles de trabajo manuales o asistidos.', 'Gestión de ciclos y datos del proceso.'],
    brochure: '2023/02/USI_2022_Flyer_3-SOULS-OF-CHRONOTECH_ENG_sc.pdf',
  },
].map(booth);
