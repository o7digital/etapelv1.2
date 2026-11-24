import type { CatalogProduct } from './productTypes';

type AdamInput = Pick<CatalogProduct, 'slug' | 'name' | 'summary' | 'summaryEn' | 'description' | 'descriptionEn' | 'specs' | 'highlights'> & {
  sourceUrl: string;
  manual: string;
};

const adam = ({ manual, ...product }: AdamInput): CatalogProduct => {
  const image = `/images/products/sata/adam/${product.slug}.webp`;
  return {
    ...product,
    brand: 'SATA',
    familySlug: 'pintura-y-aplicacion',
    category: 'Accesorios pistolas',
    interest: 'Accesorios pistolas',
    catalogSubline: 'Adam',
    application: 'Pintura y Aplicación',
    technology: 'Digital',
    sprayPattern: 'No aplica',
    nozzleTechnology: 'No aplica',
    image,
    gallery: [image],
    badges: ['SATA', 'Adam'],
    variants: [],
    detailBlocks: [],
    downloads: [
      { label: 'Manual de instrucciones', url: manual },
      { label: 'Información del fabricante', url: product.sourceUrl },
    ],
  };
};

// Manufacturer product pages and original product photographs, checked 2026-11-24.
export const sataAdamProducts: CatalogProduct[] = [
  adam({
    slug: 'sata-adam-2',
    name: 'SATA adam 2',
    summary: 'Indicador digital desmontable de presión para pistolas SATA con dock compatible.',
    summaryEn: 'Removable digital pressure display for SATA spray guns with a compatible dock.',
    description: 'Permite comprobar la presión de entrada. El display se retira para limpieza o cambio de pistola; la versión y el dock se seleccionan según el modelo.',
    descriptionEn: 'Checks the spray gun inlet pressure. The display can be removed for cleaning or moved to another gun; the version and dock depend on the gun model.',
    specs: [
      { label: 'Referencia', value: '211540' },
      { label: 'Versión', value: 'SATAjet 5000 · bar' },
      { label: 'Montaje', value: 'SATA dock compatible' },
    ],
    highlights: ['Display desmontable.', 'Selección de versión y dock según la pistola.'],
    sourceUrl: 'https://www.sata.com/es/sata-adam-2/CF1931342',
    manual: 'https://www.sata.com/media/f4/ab/b1/1794564797/BETRIEBSANLEITUNG-SATA-ADAM-2.PDF.PDF?ts=1794564797',
  }),
  adam({
    slug: 'sata-adam-x',
    name: 'adam X',
    summary: 'Unidad digital para jet X con lectura de presión, tiempo de uso y estado de batería.',
    summaryEn: 'Digital unit for jet X with pressure, operating-time and battery-status display.',
    description: 'Se monta directamente en la conexión QAC de la jet X y se controla mediante doble toque. Compatible con versiones digitales de jet X; no con BASIC.',
    descriptionEn: 'Mounts directly on the jet X QAC connector and uses double-tap controls. Compatible with digital jet X versions; not BASIC.',
    specs: [
      { label: 'Referencia', value: '1201996' },
      { label: 'Compatibilidad', value: 'jet X con QAC · excepto BASIC' },
      { label: 'Presión', value: 'bar / psi' },
      { label: 'Control', value: 'Doble toque' },
    ],
    highlights: ['Montaje QAC sin estación adicional.', 'Lectura de presión, tiempo de uso y batería.'],
    sourceUrl: 'https://www.sata.com/es/adam-x/CF1931341',
    manual: 'https://www.sata.com/media/ee/0a/d4/1794564796/MULTILINGUAL-SATA-OPERATING-MANUAL-ADAM-X-PRO-ADAM-X-3220-240904.PDF.PDF?ts=1794564796',
  }),
  adam({
    slug: 'sata-adam-x-pro',
    name: 'adam X pro',
    summary: 'Unidad digital para jet X con presión objetivo, aviso de desviación y registro de datos del pintado.',
    summaryEn: 'Digital unit for jet X with target pressure, deviation warning and painting statistics.',
    description: 'Compara la presión real con el valor seleccionado y avisa de desviaciones. Registra el uso y permite transferir los parámetros a un panel digital mediante QR.',
    descriptionEn: 'Compares actual and selected pressure and warns of deviations. Records usage and transfers painting parameters to a digital dashboard through a QR code.',
    specs: [
      { label: 'Referencia', value: '1202001' },
      { label: 'Compatibilidad', value: 'jet X con QAC · excepto BASIC' },
      { label: 'Presión', value: 'bar / psi' },
      { label: 'Aviso de desviación', value: '> 0,2 bar (3 psi)' },
      { label: 'Datos', value: 'Registro y transferencia mediante QR' },
    ],
    highlights: ['Comparación de presión real y objetivo.', 'Registro de uso y transferencia de datos mediante QR.'],
    sourceUrl: 'https://www.sata.com/es/adam-x-pro/CF1931340',
    manual: 'https://www.sata.com/media/ee/0a/d4/1794564796/MULTILINGUAL-SATA-OPERATING-MANUAL-ADAM-X-PRO-ADAM-X-3220-240904.PDF.PDF?ts=1794564796',
  }),
];
