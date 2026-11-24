export function greetingReply(message) {
  const text=message.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[¡!¿?.,;:]/g,'').trim().replace(/\s+/g,' ');
  for(const [pattern,reply]of [
    [/^(hola|buenas|buenos dias|buenas tardes|buenas noches)( olivia)?$/,'¡Hola! ¿En qué te puedo ayudar?'],
    [/^(hello|hi|hey|good morning|good afternoon|good evening)( olivia)?$/,'Hello! How can I help you?'],
    [/^(bonjour|salut|bonsoir)( olivia)?$/,'Bonjour ! Comment puis-je vous aider ?'],
    [/^(hallo|guten tag|guten morgen|guten abend)( olivia)?$/,'Hallo! Wie kann ich Ihnen helfen?'],
    [/^(ciao|buongiorno|buonasera)( olivia)?$/,'Ciao! Come posso aiutarti?'],
    [/^(ola|oi|bom dia|boa tarde|boa noite)( olivia)?$/,'Olá! Como posso ajudar?'],
  ])if(pattern.test(text))return reply;
  return null;
}
