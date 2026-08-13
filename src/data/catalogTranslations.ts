const productLineTranslations: Record<string, string> = {
  'accesorios car o liner': 'Car-O-Liner accessories',
  'accesorios pistolas': 'Spray gun accessories',
  adas: 'ADAS calibration',
  'aire acondicionado': 'Air conditioning',
  'aire comprimido': 'Compressed air',
  'alineacion y enderezado vehiculos pesados': 'Heavy-vehicle alignment and straightening',
  alineadoras: 'Wheel aligners',
  'antipiedras y selladores': 'Undercoatings and sealants',
  balanceadoras: 'Wheel balancers',
  'bancos de enderezado autos y suv': 'Car and SUV straightening benches',
  'cabinas de pintura': 'Spray booths',
  'cabinas y areas': 'Spray booths and work areas',
  'cabinas y preparacion': 'Spray booths and preparation areas',
  cargadores: 'Battery chargers',
  'carritos de herramientas': 'Tool carts',
  'compresores denair': 'Denair compressors',
  'consumibles herramientas': 'Tool consumables',
  'desabollo de carroceria auto y suv': 'Car and SUV dent repair',
  'desabollo de carroceria vehiculos pesados': 'Heavy-vehicle body repair',
  desmontadora: 'Tire changers',
  electricas: 'Electric tools',
  enmascarado: 'Masking',
  'equipos de medicion': 'Measuring equipment',
  'herramientas manuales': 'Hand tools',
  'lamparas infrarojo': 'Infrared lamps',
  lijas: 'Abrasives',
  'lineas de aire comprimido': 'Compressed-air lines',
  'manuales??': 'Hand tools',
  'masillas y rellenadores': 'Putties and fillers',
  neumaticas: 'Pneumatic tools',
  otros: 'Other products',
  'pintura en polvo': 'Powder coatings',
  'pistolas aerograficas': 'Airbrush spray guns',
  'pistolas con calderin': 'Pressure-feed spray guns',
  'pistolas con vaso de gravedad': 'Gravity-feed spray guns',
  'pistolas de pintura': 'Paint spray guns',
  'pistolas de vaso inferior': 'Siphon-feed spray guns',
  'pistolas roboticas': 'Automatic spray guns',
  'ppg automotriz': 'PPG automotive coatings',
  'ppg industrial': 'PPG industrial coatings',
  'proteccion respiratoria': 'Respiratory protection',
  pulidoras: 'Polishers',
  pulimento: 'Polishing compounds',
  'rampas y elevadores eae': 'EAE lifts',
  'reparacion de plasticos': 'Plastic repair',
  scanner: 'Diagnostic scanners',
  'seguridad personal': 'Personal protection',
  'sistema de pulido': 'Polishing systems',
  'sistemas de deposito': 'Cup systems',
  'sistemas de lijado': 'Sanding systems',
  'tecnologia de filtros': 'Filter technology',
  'tecnologia de filtros y aire comprimido': 'Filtration and compressed air',
  'vasos y consumibles': 'Cups and consumables',
  'zonas de prepracion': 'Preparation areas',
};

const normalizedProductLine = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

export const englishProductLine = (value: string) =>
  productLineTranslations[normalizedProductLine(value)] || value;
