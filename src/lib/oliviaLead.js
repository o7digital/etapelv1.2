// Match explicit requests for details or commercial follow-up in visitor languages.
export function requestsInformation(message) {
  const value = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/\b(no quiero|no necesito|do not|don't|ne veux pas|non voglio|non desidero|nao quero|nao preciso|ich mochte keine|ich will keine|bitte keine)\b.{0,45}\b(contact|contat|kontakt|llam|appel|informacion|information|informazioni|informacoes|info|devis|cotiza|angebot|orcamento|preventivo)/.test(value)) return false;
  return /\b(infos?|informacion|informaciones|informes|information|informations|informationen|informazioni|informacoes|details|detalles|detalhes|renseignements|devis|tarifs?|prices?|pricing|quotes?|quotation|cotiza\w*|presupuesto\w*|precios?|costos?|contact\w*|contat\w*|kontakt\w*|angebot\w*|preventiv\w*|orcamento\w*|precos?|asesor\w*|advisor|callback|rappel|llamen|llamarme|interesad[oa]|interesa|interested)\b|\b(quiero saber|mas sobre|learn more|saber mas|en savoir plus|how much|cuanto cuesta|mehr erfahren|quanto costa|saperne di piu|saber mais|quanto custa)\b/.test(value);
}
