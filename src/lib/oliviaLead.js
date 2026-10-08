// Match explicit requests for details or commercial follow-up in visitor languages.
export function requestsInformation(message) {
  const value = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/\b(no quiero|no necesito|do not|don't|ne veux pas)\b.{0,35}\b(contact|llam|appel|informacion|information|info|devis|cotiza)/.test(value)) return false;
  return /\b(infos?|informacion|informaciones|informes|information|informations|details|detalles|renseignements|devis|tarifs?|prices?|pricing|quotes?|quotation|cotiza\w*|presupuesto\w*|precios?|costos?|contact\w*|asesor\w*|advisor|callback|rappel|llamen|llamarme|interesad[oa]|interesa|interested)\b|\b(quiero saber|mas sobre|learn more|saber mas|en savoir plus|how much|cuanto cuesta)\b/.test(value);
}
