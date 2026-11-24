import { languagePath, pathLocale } from './languageRoutes.mjs';

// Keep source HTML, visible footer copy and generated translations in sync.
// Columns follow the same language order as the site's language switcher.
const languages = ['es', 'en', 'de', 'it', 'fr', 'pt'];
const cities = ['CDMX', 'Mexico City', 'Mexiko-Stadt', 'Città del Messico', 'Mexico', 'Cidade do México'];
const terms = {
  paint: ['pintura automotriz', 'automotive paint', 'Autolack', 'vernici per auto', 'peinture automobile', 'pintura automotiva'],
  workshop: ['taller automotriz', 'automotive workshop', 'Kfz-Werkstatt', 'officina automobilistica', 'atelier automobile', 'oficina automotiva'],
  equipment: ['equipo para taller', 'workshop equipment', 'Werkstattausrüstung', 'attrezzature per officina', 'équipement pour atelier', 'equipamentos para oficina'],
  booth: ['cabina de pintura', 'spray booth', 'Lackierkabine', 'cabina di verniciatura', 'cabine de peinture', 'cabine de pintura'],
  sprayGun: ['pistola de pintura', 'paint spray gun', 'Lackierpistole', 'pistola per verniciatura', 'pistolet de peinture', 'pistola de pintura'],
  consumables: ['consumibles de pintura', 'paint consumables', 'Lackierverbrauchsmaterial', 'materiali di consumo per verniciatura', 'consommables de peinture', 'consumíveis de pintura'],
  welding: ['soldadura automotriz', 'automotive welding', 'Schweißtechnik für Fahrzeuge', 'saldatura automobilistica', 'soudage automobile', 'soldagem automotiva'],
  air: ['aire comprimido', 'compressed air', 'Druckluft', 'aria compressa', 'air comprimé', 'ar comprimido'],
  training: ['capacitación automotriz', 'automotive training', 'Kfz-Schulung', 'formazione automobilistica', 'formation automobile', 'treinamento automotivo'],
  afterSales: ['postventa automotriz', 'automotive after-sales service', 'Kfz-Kundendienst', 'assistenza post-vendita automobilistica', 'service après-vente automobile', 'pós-venda automotiva'],
  maintenance: ['mantenimiento de equipos', 'equipment maintenance', 'Gerätewartung', 'manutenzione delle attrezzature', 'maintenance des équipements', 'manutenção de equipamentos'],
  support: ['soporte técnico', 'technical support', 'technischer Support', 'supporto tecnico', 'assistance technique', 'suporte técnico'],
  technology: ['tecnología para taller', 'workshop technology', 'Werkstatttechnik', 'tecnologia per officina', 'technologie pour atelier', 'tecnologia para oficina'],
  bodywork: ['soluciones para carrocería', 'body repair solutions', 'Karosseriereparaturlösungen', 'soluzioni per carrozzeria', 'solutions pour carrosserie', 'soluções para carroceria'],
  technicalService: ['servicio técnico especializado', 'specialized technical service', 'spezialisierter technischer Service', 'assistenza tecnica specializzata', 'service technique spécialisé', 'assistência técnica especializada'],
  trainingCenter: ['centro de capacitación', 'training center', 'Schulungszentrum', 'centro di formazione', 'centre de formation', 'centro de treinamento'],
  certified: ['soluciones certificadas', 'certified solutions', 'zertifizierte Lösungen', 'soluzioni certificate', 'solutions certifiées', 'soluções certificadas'],
  quote: ['cotización de equipos automotrices', 'automotive equipment quotation', 'Angebot für Kfz-Ausrüstung', 'preventivo per attrezzature automobilistiche', 'devis pour équipement automobile', 'orçamento de equipamentos automotivos'],
  paintTraining: ['capacitación en pintura', 'paint training', 'Lackierschulung', 'formazione sulla verniciatura', 'formation en peinture', 'treinamento em pintura'],
  approvedProcesses: ['procesos homologados', 'approved processes', 'freigegebene Verfahren', 'processi omologati', 'procédés homologués', 'processos homologados'],
  safety: ['seguridad en taller', 'workshop safety', 'Arbeitssicherheit in der Werkstatt', 'sicurezza in officina', 'sécurité en atelier', 'segurança na oficina'],
  efficiency: ['eficiencia operativa', 'operational efficiency', 'betriebliche Effizienz', 'efficienza operativa', 'efficacité opérationnelle', 'eficiência operacional'],
  repair: ['reparación de equipos', 'equipment repair', 'Gerätereparatur', 'riparazione delle attrezzature', 'réparation des équipements', 'reparo de equipamentos'],
  installation: ['instalación de equipos', 'equipment installation', 'Geräteinstallation', 'installazione delle attrezzature', 'installation des équipements', 'instalação de equipamentos'],
  supplier: ['proveedor automotriz', 'automotive supplier', 'Kfz-Ausrüster', 'fornitore automobilistico', 'fournisseur automobile', 'fornecedor automotivo'],
  solutions: ['soluciones automotrices', 'automotive solutions', 'Lösungen für die Kfz-Branche', 'soluzioni automobilistiche', 'solutions automobiles', 'soluções automotivas'],
};
const legacyGeneral = ['paint', 'workshop', 'equipment', 'booth', 'sprayGun', 'consumables', 'welding', 'air', 'training', 'afterSales', 'maintenance', 'support', 'technology', 'bodywork', 'technicalService', 'trainingCenter', 'certified', 'quote'];
const legacyPageTerms = {
  '/capacitacion': ['training', 'paintTraining', 'trainingCenter', 'approvedProcesses', 'safety', 'efficiency'],
  '/postventa': ['afterSales', 'maintenance', 'repair', 'installation', 'technicalService', 'support'],
  '/quienes-somos': ['supplier', 'solutions', 'equipment', 'paint'],
  '/contacto': ['supplier', 'solutions', 'quote', 'equipment', 'support', 'technicalService'],
};
const about = ['quienes somos Etapel', 'about Etapel', 'über Etapel', 'chi siamo Etapel', 'à propos d’Etapel', 'sobre a Etapel'];

// Only recognize the previous generated defaults. Editorial CMS overrides
// remain editable; unchanged defaults must not restore the old generic lists.
export function isLegacySeoKeywords(value, path) {
  const normalize = text => text.split(/\s*[,·]\s*/).filter(Boolean).join('|');
  const route = languagePath(path, 'es');
  return languages.some((language, index) => {
    const previous = (legacyPageTerms[route] || legacyGeneral).map(key => `${terms[key][index]} ${cities[index]}`);
    if (route === '/quienes-somos') previous.unshift(about[index], 'Etapel SA de CV');
    return normalize(value) === normalize(previous.join(', '));
  });
}

// Columns: ES, EN, DE, IT, FR, PT. Terms describe products sold by Etapel,
// rather than suggesting that Etapel repairs customers' vehicles.
const productTerms = {
  paint: terms.paint,
  booth: terms.booth,
  sprayGun: terms.sprayGun,
  consumables: terms.consumables,
  industrialPaint: ['pintura industrial', 'industrial paint', 'Industrielack', 'vernici industriali', 'peinture industrielle', 'pintura industrial'],
  powderPaint: ['pintura en polvo', 'powder coatings', 'Pulverlack', 'vernici in polvere', 'peinture en poudre', 'pintura em pó'],
  booths: ['cabinas de pintura', 'spray booths', 'Lackierkabinen', 'cabine di verniciatura', 'cabines de peinture', 'cabines de pintura'],
  usiBooths: ['cabinas de pintura USI Italia', 'USI Italia spray booths', 'USI Italia Lackierkabinen', 'cabine di verniciatura USI Italia', 'cabines de peinture USI Italia', 'cabines de pintura USI Italia'],
  sprayGuns: ['pistolas de pintura', 'paint spray guns', 'Lackierpistolen', 'pistole per verniciatura', 'pistolets de peinture', 'pistolas de pintura'],
  sataGuns: ['pistolas de pintura SATA', 'SATA paint spray guns', 'SATA Lackierpistolen', 'pistole per verniciatura SATA', 'pistolets de peinture SATA', 'pistolas de pintura SATA'],
  automotiveGuns: ['pistolas para pintura automotriz', 'automotive paint spray guns', 'Autolackierpistolen', 'pistole per verniciatura auto', 'pistolets pour peinture automobile', 'pistolas para pintura automotiva'],
  equipment: ['equipo para taller de pintura', 'paint shop equipment', 'Lackierwerkstattausrüstung', 'attrezzature per verniciatura', 'équipement pour atelier de peinture', 'equipamentos para oficina de pintura'],
  preparation: ['zonas de preparación de pintura', 'paint preparation areas', 'Lackiervorbereitungsplätze', 'zone di preparazione alla verniciatura', 'aires de préparation peinture', 'áreas de preparação de pintura'],
  infrared: ['lámparas infrarrojas para pintura', 'paint curing infrared lamps', 'Infrarot-Lacktrockner', 'lampade a infrarossi per verniciatura', 'lampes infrarouges pour peinture', 'lâmpadas infravermelhas para pintura'],
  respirators: ['mascarillas de respiración para pintura', 'paint respirators', 'Atemschutzmasken zum Lackieren', 'maschere respiratorie per verniciatura', 'masques respiratoires pour peinture', 'máscaras respiratórias para pintura'],
  airFilters: ['filtros de aire comprimido', 'compressed air filters', 'Druckluftfilter', 'filtri per aria compressa', 'filtres à air comprimé', 'filtros de ar comprimido'],
  boothFilters: ['filtros de cabina de pintura', 'spray booth filters', 'Lackierkabinenfilter', 'filtri per cabine di verniciatura', 'filtres pour cabine de peinture', 'filtros para cabine de pintura'],
  airNetwork: ['instalaciones de aire comprimido', 'compressed air installations', 'Druckluftinstallationen', 'impianti di aria compressa', 'installations d’air comprimé', 'instalações de ar comprimido'],
  prevost: ['aire comprimido Prevost', 'Prevost compressed air systems', 'Prevost Druckluftsysteme', 'sistemi ad aria compressa Prevost', 'réseaux d’air comprimé Prevost', 'sistemas de ar comprimido Prevost'],
  compressors: ['compresores de aire', 'air compressors', 'Luftkompressoren', 'compressori d’aria', 'compresseurs d’air', 'compressores de ar'],
  sanders: ['lijadoras', 'sanders', 'Schleifmaschinen', 'levigatrici', 'ponceuses', 'lixadeiras'],
  abrasives: ['lijas para pintura automotriz', 'automotive paint abrasives', 'Schleifmittel für Autolack', 'abrasivi per verniciatura auto', 'abrasifs pour peinture automobile', 'lixas para pintura automotiva'],
  compounds: ['pulimentos', 'polishing compounds', 'Poliermittel', 'paste abrasive per lucidatura', 'produits de polissage', 'compostos de polimento'],
  polishers: ['pulidoras', 'polishers', 'Poliermaschinen', 'lucidatrici', 'polisseuses', 'politrizes'],
  shinemate: ['pulidoras ShineMate', 'ShineMate polishers', 'ShineMate Poliermaschinen', 'lucidatrici ShineMate', 'polisseuses ShineMate', 'politrizes ShineMate'],
  pads: ['borlas para pulir', 'polishing pads', 'Polierpads', 'tamponi per lucidatura', 'tampons de polissage', 'boinas de polimento'],
  extraction: ['aspiradoras para lijado', 'sanding dust extractors', 'Schleifstaubabsaugung', 'aspiratori per levigatura', 'aspirateurs pour ponçage', 'aspiradores para lixamento'],
  masking: ['materiales para enmascarar pintura', 'paint masking supplies', 'Abdeckmaterial zum Lackieren', 'materiali per mascheratura verniciatura', 'matériaux de masquage peinture', 'materiais de mascaramento para pintura'],
  maskingFilm: ['plástico para enmascarar', 'masking film', 'Abdeckfolie', 'plastica per mascheratura', 'film de masquage', 'plástico para mascaramento'],
  maskingPaper: ['papel para enmascarar', 'masking paper', 'Abdeckpapier', 'carta per mascheratura', 'papier de masquage', 'papel para mascaramento'],
  maskingTape: ['cinta para enmascarar', 'masking tape', 'Abdeckband', 'nastro per mascheratura', 'ruban de masquage', 'fita para mascaramento'],
  welders: ['soldadoras', 'welding machines', 'Schweißgeräte', 'saldatrici', 'postes à souder', 'máquinas de solda'],
  mig: ['soldadoras MIG', 'MIG welders', 'MIG-Schweißgeräte', 'saldatrici MIG', 'postes à souder MIG', 'máquinas de solda MIG'],
  spot: ['soldadoras de punto', 'spot welders', 'Punktschweißgeräte', 'saldatrici a punti', 'soudeuses par points', 'máquinas de solda por pontos'],
  plasma: ['cortadoras plasma', 'plasma cutters', 'Plasmaschneider', 'tagliatrici al plasma', 'découpeurs plasma', 'cortadoras de plasma'],
  spotter: ['spotter para hojalatería', 'dent repair spotters', 'Ausbeulspotter', 'spotter per carrozzeria', 'spotters de débosselage', 'repuxadeiras para funilaria'],
  gys: ['soldadoras GYS', 'GYS welders', 'GYS Schweißgeräte', 'saldatrici GYS', 'postes à souder GYS', 'máquinas de solda GYS'],
  plasticWelders: ['soldadoras de plásticos', 'plastic welders', 'Kunststoffschweißgeräte', 'saldatrici per plastica', 'soudeuses de plastiques', 'máquinas de solda de plásticos'],
  dentTools: ['equipos para desabollado', 'dent repair equipment', 'Ausbeulgeräte', 'attrezzature per riparazione ammaccature', 'équipements de débosselage', 'equipamentos para desamassar'],
  riveters: ['remachadoras para carrocería', 'bodywork riveters', 'Karosserienietgeräte', 'rivettatrici per carrozzeria', 'riveteuses de carrosserie', 'rebitadeiras para carroceria'],
  induction: ['inductores de calor', 'induction heaters', 'Induktionsheizgeräte', 'riscaldatori a induzione', 'chauffages à induction', 'aquecedores por indução'],
  safety: ['protección personal para pintura', 'personal protective equipment for painting', 'Schutzausrüstung zum Lackieren', 'protezione personale per verniciatura', 'protection individuelle pour peinture', 'proteção individual para pintura'],
  benches: ['bancos de enderezado', 'body straightening benches', 'Karosserierichtbänke', 'banchi di raddrizzatura', 'bancs de redressage', 'bancadas de alinhamento'],
  measuring: ['equipos de medición de carrocería', 'body measuring equipment', 'Karosseriemessgeräte', 'sistemi di misurazione carrozzeria', 'systèmes de mesure de carrosserie', 'equipamentos de medição de carroceria'],
  truckEquipment: ['equipos para talleres de tractocamiones', 'truck workshop equipment', 'Lkw-Werkstattausrüstung', 'attrezzature per officine di camion', 'équipements pour ateliers de poids lourds', 'equipamentos para oficinas de caminhões'],
  bodyConsumables: ['consumibles para hojalatería', 'bodywork consumables', 'Karosserieverbrauchsmaterial', 'materiali di consumo per carrozzeria', 'consommables de carrosserie', 'consumíveis para funilaria'],
  fillers: ['masillas para carrocería', 'body fillers', 'Karosseriespachtel', 'stucchi per carrozzeria', 'mastics de carrosserie', 'massas para carroceria'],
  sealants: ['selladores para carrocería', 'body sealants', 'Karosseriedichtstoffe', 'sigillanti per carrozzeria', 'produits d’étanchéité pour carrosserie', 'selantes para carroceria'],
  tools: ['herramientas de hojalatería', 'bodywork tools', 'Karosseriewerkzeuge', 'utensili per carrozzeria', 'outils de carrosserie', 'ferramentas para funilaria'],
  chargers: ['cargadores de baterías', 'battery chargers', 'Batterieladegeräte', 'caricabatterie', 'chargeurs de batteries', 'carregadores de baterias'],
  starters: ['arrancadores de baterías', 'battery jump starters', 'Starthilfegeräte', 'avviatori di batterie', 'démarreurs de batteries', 'auxiliares de partida'],
  testers: ['probadores de baterías', 'battery testers', 'Batterietester', 'tester per batterie', 'testeurs de batteries', 'testadores de baterias'],
  lifts: ['rampas y elevadores automotrices', 'automotive lifts', 'Kfz-Hebebühnen', 'ponti sollevatori per auto', 'ponts élévateurs automobiles', 'elevadores automotivos'],
  diagnostics: ['equipos de diagnóstico automotriz', 'automotive diagnostic equipment', 'Kfz-Diagnosegeräte', 'strumenti di diagnosi auto', 'équipements de diagnostic automobile', 'equipamentos de diagnóstico automotivo'],
  aligners: ['alineadoras de ruedas', 'wheel aligners', 'Achsvermessungsgeräte', 'sistemi di assetto ruote', 'appareils de géométrie des roues', 'alinhadores de rodas'],
  tireChangers: ['desmontadoras de llantas', 'tire changers', 'Reifenmontiermaschinen', 'smontagomme', 'démonte-pneus', 'desmontadoras de pneus'],
  balancers: ['balanceadoras de ruedas', 'wheel balancers', 'Radauswuchtmaschinen', 'equilibratrici', 'équilibreuses de roues', 'balanceadoras de rodas'],
  adas: ['equipos de calibración ADAS', 'ADAS calibration equipment', 'ADAS-Kalibriergeräte', 'attrezzature per calibrazione ADAS', 'équipements de calibrage ADAS', 'equipamentos de calibração ADAS'],
  airConditioning: ['equipos de aire acondicionado automotriz', 'automotive air conditioning equipment', 'Kfz-Klimaservicegeräte', 'attrezzature per climatizzazione auto', 'équipements de climatisation automobile', 'equipamentos de ar condicionado automotivo'],
  gunAccessories: ['accesorios para pistolas de pintura', 'paint spray gun accessories', 'Lackierpistolenzubehör', 'accessori per pistole di verniciatura', 'accessoires pour pistolets de peinture', 'acessórios para pistolas de pintura'],
  gunCleaners: ['lavadoras de pistolas de pintura', 'paint spray-gun cleaners', 'Lackierpistolenreiniger', 'lavapistole per verniciatura', 'laveuses de pistolets à peinture', 'lavadoras de pistolas de pintura'],
  paintTraining: terms.paintTraining,
  boothTraining: ['capacitación en cabinas de pintura', 'spray booth training', 'Lackierkabinenschulung', 'formazione sulle cabine di verniciatura', 'formation aux cabines de peinture', 'treinamento em cabines de pintura'],
  gunTraining: ['capacitación en pistolas SATA', 'SATA spray gun training', 'SATA Lackierpistolenschulung', 'formazione sulle pistole SATA', 'formation aux pistolets SATA', 'treinamento em pistolas SATA'],
  boothMaintenance: ['mantenimiento de cabinas de pintura', 'spray booth maintenance', 'Lackierkabinenwartung', 'manutenzione cabine di verniciatura', 'maintenance de cabines de peinture', 'manutenção de cabines de pintura'],
  gunRepair: ['reparación de pistolas SATA', 'SATA spray gun repair', 'SATA Lackierpistolenreparatur', 'riparazione pistole SATA', 'réparation de pistolets SATA', 'reparo de pistolas SATA'],
  equipmentInstallation: ['instalación de equipos de pintura', 'paint equipment installation', 'Installation von Lackierausrüstung', 'installazione di attrezzature per verniciatura', 'installation d’équipements de peinture', 'instalação de equipamentos de pintura'],
  paintSupplier: ['proveedor de pintura automotriz', 'automotive paint supplier', 'Autolacklieferant', 'fornitore di vernici per auto', 'fournisseur de peinture automobile', 'fornecedor de pintura automotiva'],
  equipmentQuote: ['cotización de equipos de pintura', 'paint equipment quotation', 'Angebot für Lackierausrüstung', 'preventivo per attrezzature di verniciatura', 'devis pour équipement de peinture', 'orçamento de equipamentos de pintura'],
};
const countries = ['México', 'Mexico', 'Mexiko', 'Messico', 'Mexique', 'México'];
const general = ['paint', 'booth', 'sprayGun', 'industrialPaint', 'booths', 'usiBooths', 'sprayGuns', 'sataGuns', 'equipment', 'sanders', 'abrasives', 'compounds', 'consumables', 'maskingFilm', 'maskingPaper', 'respirators', 'airFilters', 'prevost'];
const pageTerms = {
  '/capacitacion': ['paintTraining', 'gunTraining', 'boothTraining', 'paint', 'sprayGuns', 'equipment'],
  '/postventa': ['boothMaintenance', 'gunRepair', 'equipmentInstallation', 'airNetwork', 'boothFilters', 'airFilters'],
  '/quienes-somos': ['paintSupplier', 'paint', 'industrialPaint', 'sataGuns', 'usiBooths', 'equipment'],
  '/contacto': ['paintSupplier', 'equipmentQuote', 'sataGuns', 'usiBooths', 'consumables', 'prevost'],
  '/aviso-de-privacidad': [],
  '/politicas-de-etapel': [],
};
const familyTerms = {
  'pintura-y-aplicacion': ['paint', 'booth', 'sprayGun', 'sprayGuns', 'sataGuns', 'automotiveGuns', 'booths', 'usiBooths', 'preparation', 'respirators', 'airFilters', 'boothFilters', 'prevost'],
  pintura: ['paint', 'industrialPaint', 'powderPaint'],
  'preparacion-y-acabado': ['sanders', 'abrasives', 'compounds', 'polishers', 'shinemate', 'extraction'],
  'enderezado-de-carroceria': ['benches', 'measuring', 'truckEquipment'],
  'desabollado-de-carroceria': ['welders', 'mig', 'spot', 'plasma', 'spotter', 'gys'],
  'cargadores-y-arrancadores-de-baterias': ['chargers', 'starters', 'testers', 'airNetwork', 'prevost', 'compressors'],
  mecanica: ['lifts', 'diagnostics', 'aligners', 'tireChangers', 'balancers', 'adas', 'airConditioning'],
  'consumibles-de-pintura': ['consumables', 'abrasives', 'maskingFilm', 'maskingPaper', 'maskingTape', 'compounds', 'respirators'],
  'consumibles-de-hojalateria': ['bodyConsumables', 'fillers', 'sealants'],
  'herramientas-de-hojalateria': ['tools', 'sanders'],
  detallado: ['polishers', 'shinemate', 'pads', 'compounds'],
  'lavadora-de-pistolas': ['gunCleaners'],
  // Existing aliases retain their destination's intent and canonical URL.
  'equipo-mayor': ['benches', 'measuring', 'truckEquipment'],
  'equipo-menor': ['welders', 'mig', 'spot', 'plasma', 'spotter', 'gys'],
  consumibles: ['consumables', 'abrasives', 'maskingFilm', 'maskingPaper', 'compounds'],
  'cabinas-y-preparacion': ['booth', 'booths', 'usiBooths', 'preparation'],
  'soldadura-y-enderezado': ['welders', 'mig', 'spot', 'plasma', 'spotter', 'gys'],
  'mecanica-y-aire': ['lifts', 'diagnostics', 'aligners', 'tireChangers', 'balancers', 'adas', 'airConditioning'],
};
const lineTerms = {
  'Cabinas de pintura': ['booth', 'booths'],
  'Zonas de preparación': ['preparation'],
  'Pistolas para pintar': ['sprayGun', 'sprayGuns', 'automotiveGuns'],
  'Accesorios pistolas': ['gunAccessories'],
  'Lavadora de pistolas': ['gunCleaners'],
  'Protección respiratoria': ['respirators'],
  'Tecnología de filtros y aire comprimido': ['airFilters'],
  'Lámparas infrarrojas': ['infrared'],
  'PPG automotriz': ['paint'],
  'PPG industrial': ['industrialPaint'],
  'Lámparas de igualación': ['equipment'],
  'Pintura en polvo': ['powderPaint'],
  'Sistemas de lijado': ['sanders', 'extraction'],
  'Sistema de pulido': ['polishers', 'compounds'],
  'Pulidoras': ['polishers', 'pads'],
  'Lijas': ['abrasives'],
  'Enmascarado': ['masking', 'maskingFilm', 'maskingPaper'],
  'Pulimento': ['compounds', 'pads'],
  'Seguridad personal': ['safety'],
  'Otros': ['consumables'],
  'Masillas y rellenadores': ['fillers'],
  'Antipiedras y selladores': ['sealants'],
  'Consumibles herramientas': ['bodyConsumables'],
  'Bancos de enderezado autos y SUV': ['benches'],
  'Equipos de medición': ['measuring'],
  'Accesorios Car-O-Liner': ['tools', 'benches'],
  'Alineación y enderezado de vehículos pesados': ['truckEquipment', 'benches'],
  'Líneas de aire comprimido': ['airNetwork', 'prevost'],
  'Compresores Denair': ['compressors'],
  'Cargadores': ['chargers'],
  'Arrancadores': ['starters'],
  'Probadores de baterías': ['testers'],
  'Rampas y elevadores EAE': ['lifts'],
  'Alineadoras': ['aligners'],
  'Desmontadoras': ['tireChangers'],
  'Balanceadoras': ['balancers'],
  'ADAS': ['adas'],
  'Escáner': ['diagnostics'],
  'Aire acondicionado': ['airConditioning'],
  'Neumáticas': ['tools'],
  'Herramientas manuales': ['tools'],
  'Desabollo de carrocería auto y SUV': ['dentTools'],
  'Desabollo de carrocería de vehículos pesados': ['truckEquipment', 'dentTools'],
  'Reparación de plásticos': ['plasticWelders'],
};

export function seoKeywords(path, language = pathLocale(path), product) {
  const index = languages.indexOf(language);
  if (index === -1) throw new Error(`Unsupported keyword language: ${language}`);
  const route = languagePath(path, 'es');
  const location = cities[index], country = countries[index];
  const family = product?.familySlug || route.match(/^\/linea-de-producto\/([^/]+)$/)?.[1];
  let keys = familyTerms[family] || pageTerms[route] || general;
  if (product) {
    keys = lineTerms[product.catalogLine] || familyTerms[family] || ['equipment'];
    if (product.catalogSubline === 'Filtros para cabina') keys = ['boothFilters'];
    else if (product.catalogSubline === 'Prevost') keys = ['airNetwork', 'prevost'];
    else if (product.catalogSubline === 'Aspiradoras') keys = ['extraction'];
    else if (product.catalogSubline === 'Lijadoras') keys = ['sanders'];
    else if (product.catalogSubline === 'Soldadoras MIG') keys = ['mig'];
    else if (product.catalogSubline === 'Soldadura por punto') keys = ['spot'];
    else if (product.catalogSubline === 'Cortadores plasma') keys = ['plasma'];
    else if (product.catalogSubline === 'Remachadoras') keys = ['riveters'];
    else if (product.catalogSubline === 'Inductor de calor') keys = ['induction'];
    else if (product.catalogSubline === 'Mascarillas') keys = ['respirators'];
    else if (product.catalogLine === 'Enmascarado') keys = product.catalogSubline === 'Papel' ? ['maskingPaper'] : product.catalogSubline === 'Plástico' ? ['maskingFilm'] : product.catalogSubline === 'Masking' ? ['maskingTape'] : ['masking'];
    else if (/^Borlas /.test(product.catalogSubline || '')) keys = ['pads'];
    // Brand phrases belong only on products of that brand and product type.
    if (product.brand === 'SATA' && product.catalogLine === 'Pistolas para pintar') keys = [...keys, 'sataGuns'];
    if (product.brand === 'USI Italia' && product.catalogLine === 'Cabinas de pintura') keys = [...keys, 'usiBooths'];
    if (product.brand === 'ShineMate' && keys.includes('polishers')) keys = [...keys, 'shinemate'];
    if (product.brand === 'GYS' && ['Soldadoras MIG', 'Soldadura por punto'].includes(product.catalogSubline)) keys = [...keys, 'welders', 'gys'];
    if (product.catalogSubline === 'Reparación de abolladuras' && /gyspot|spotter/i.test(product.name)) keys = [...keys, 'spotter'];
    // Product/model and brand stay intact in every language.
    const name = product.brand && !product.name.toLowerCase().includes(product.brand.toLowerCase()) ? `${product.brand} ${product.name}` : product.name;
    return [...new Set([
      `${name} ${location}`, `${name} ${country}`,
      ...keys.flatMap(key => [`${productTerms[key][index]} ${location}`, `${productTerms[key][index]} ${country}`]),
    ])];
  }
  const keywords = keys.map(key => `${productTerms[key][index]} ${location}`);
  // Keep the exact established CDMX phrases, then add national purchase intent.
  if (keys.length) keywords.push(...keys.slice(0, 3).map(key => `${productTerms[key][index]} ${country}`));
  if (route === '/quienes-somos') keywords.unshift(about[index], 'Etapel SA de CV');
  return [...new Set(keywords)];
}
