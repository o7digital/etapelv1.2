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
const general = ['paint', 'workshop', 'equipment', 'booth', 'sprayGun', 'consumables', 'welding', 'air', 'training', 'afterSales', 'maintenance', 'support', 'technology', 'bodywork', 'technicalService', 'trainingCenter', 'certified', 'quote'];
const pageTerms = {
  '/capacitacion': ['training', 'paintTraining', 'trainingCenter', 'approvedProcesses', 'safety', 'efficiency'],
  '/postventa': ['afterSales', 'maintenance', 'repair', 'installation', 'technicalService', 'support'],
  '/quienes-somos': ['supplier', 'solutions', 'equipment', 'paint'],
  '/contacto': ['supplier', 'solutions', 'quote', 'equipment', 'support', 'technicalService'],
};
const about = ['quienes somos Etapel', 'about Etapel', 'über Etapel', 'chi siamo Etapel', 'à propos d’Etapel', 'sobre a Etapel'];

export function seoKeywords(path, language = pathLocale(path)) {
  const index = languages.indexOf(language);
  if (index === -1) throw new Error(`Unsupported keyword language: ${language}`);
  const route = languagePath(path, 'es');
  const keywords = (pageTerms[route] || general).map(key => `${terms[key][index]} ${cities[index]}`);
  if (route === '/quienes-somos') keywords.unshift(about[index], 'Etapel SA de CV');
  return keywords;
}
