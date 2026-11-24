import type { CatalogProduct } from './productTypes';

export const millibarBoothParentSlug = 'catalogo-cabinas-de-pintura-millibar';

type BoothInput = Pick<CatalogProduct, 'slug' | 'name' | 'summary' | 'summaryEn' | 'description' | 'descriptionEn' | 'specs' | 'highlights'> & {
  file: string;
  page: string;
  brochures?: { label: string; path: string }[];
};

const booth = ({ file, page, brochures = [], ...product }: BoothInput, index: number): CatalogProduct => {
  const image = `/images/products/millibar/${file}`;
  const sourceUrl = `https://www.millibar.it/products/${page}/`;
  return {
    ...product,
    brand: 'Millibar',
    familySlug: 'pintura-y-aplicacion',
    catalogParentSlug: millibarBoothParentSlug,
    catalogSubline: 'Millibar',
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
    badges: ['Millibar', 'Cabinas de pintura'],
    variants: [],
    detailBlocks: [],
    sourceUrl,
    downloads: [
      ...brochures.map(({ label, path }) => ({ label, url: `https://www.millibar.it/wp-content/uploads/${path}` })),
      { label: 'Información del fabricante', url: sourceUrl },
    ],
  };
};

// Only the three spray booths requested from the manufacturer's product range.
// Product pages, brochures and original photographs checked 2026-11-24.
export const millibarBoothProducts: CatalogProduct[] = [
  {
    slug: 'millibar-2-0', name: 'Millibar 2.0', file: 'millibar-2-0.jpg', page: 'millibar-20',
    summary: 'Cabina de flujo descendente con doble pared aislada y recirculación de aire.',
    summaryEn: 'Downdraft spray booth with insulated double walls and air recirculation.',
    description: 'El techo filtrante y la extracción por foso crean un flujo vertical. La iluminación superior inclinada facilita la inspección del acabado durante el repintado.',
    descriptionEn: 'The filtered ceiling and extraction pit create vertical airflow. Angled overhead lighting helps inspect the finish during automotive refinishing.',
    specs: [{ label: 'Ventilación', value: 'Flujo vertical descendente' }, { label: 'Estructura', value: 'Doble pared con aislamiento' }, { label: 'Secado', value: 'Recirculación de aire' }],
    highlights: ['Techo filtrante y extracción inferior.', 'Iluminación superior inclinada.'],
    brochures: [
      { label: 'Catálogo · Español / Português', path: '2021/01/MILLIBAR_GENERAL_SINGLE-SLIDES_ESP-PORT.pdf' },
      { label: 'Catalogue · English / Français', path: '2021/01/MILLIBAR_GENERAL_SINGLE-SLIDES_ENG-FRA.pdf' },
    ],
  },
  {
    slug: 'millibar-lt', name: 'Millibar LT', file: 'millibar-lt.jpg', page: 'millibar-lt',
    summary: 'Cabina de flujo descendente para talleres en climas cálidos.',
    summaryEn: 'Downdraft spray booth for body shops in warm climates.',
    description: 'Pensada para repintado automotriz con necesidades térmicas moderadas. Combina techo filtrante, extracción inferior e iluminación superior para trabajar el acabado.',
    descriptionEn: 'Designed for automotive refinishing with moderate heating requirements. Combines a filtered ceiling, floor extraction and overhead lighting for finishing work.',
    specs: [{ label: 'Aplicación', value: 'Repintado en climas cálidos' }, { label: 'Ventilación', value: 'Flujo vertical descendente' }, { label: 'Iluminación', value: 'Luminarias superiores inclinadas' }],
    highlights: ['Configuración para necesidades térmicas moderadas.', 'Techo filtrante y extracción inferior.'],
  },
  {
    slug: 'millibar-sd-line', name: 'SD Line', file: 'millibar-sd-line.png', page: 'sd-line',
    summary: 'Cabina con extracción posterior, sin foso ni base metálica con rampas.',
    summaryEn: 'Spray booth with rear extraction, without a pit or metal base and ramps.',
    description: 'Adapta la entrada de aire y la pared de aspiración a las dimensiones de la cabina. El variador en la extracción regula la presión; en secado recircula parte del aire caliente.',
    descriptionEn: 'Matches the air inlet and extraction wall to the booth dimensions. An exhaust inverter regulates pressure, while part of the warm air recirculates during curing.',
    specs: [{ label: 'Extracción', value: 'Posterior con variador' }, { label: 'Instalación', value: 'Sin foso ni base metálica' }, { label: 'Secado', value: 'Recirculación parcial de aire' }],
    highlights: ['Instalación sin excavación de foso.', 'Regulación de presión mediante variador.'],
    brochures: [{ label: 'Ficha técnica', path: '2020/11/MILLIBAR_Scheda_SDLINE_sc.pdf' }],
  },
].map(booth);
