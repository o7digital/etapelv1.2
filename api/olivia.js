import { randomUUID } from 'node:crypto';
import { greetingReply } from '../src/lib/oliviaGreeting.js';
import { conversationToken, inboxRequest, publicSnapshot, validContact } from '../src/lib/oliviaInbox.js';
export const config = { maxDuration: 60 };
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['POST','GET'].includes(req.method)) { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'Method not allowed' }); }
  const origin = req.headers.origin;
  const allowed = new Set(['https://www.etapel.com', 'https://etapel.com', 'https://etapelv1-2.vercel.app', process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`].filter(Boolean));
  if (!(req.method === 'GET' && !origin) && !allowed.has(origin)) return res.status(403).json({ error: 'Origin not allowed' });
  if (req.method === 'GET') {
    if (!process.env.OLIVIA_GATEWAY_KEY || !process.env.ETAPEL_INBOX_KEY) return res.status(503).json({ error: 'Olivia unavailable' });
    let token;
    try { token = conversationToken(req.query?.conversation || new URL(req.url || '/', 'https://www.etapel.com').searchParams.get('conversation') || '', process.env.OLIVIA_GATEWAY_KEY); }
    catch { return res.status(403).json({ error: 'Invalid conversation' }); }
    try { return res.status(200).json(publicSnapshot(await inboxRequest(token))); }
    catch { return res.status(503).json({ error: 'Olivia unavailable' }); }
  }
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return res.status(415).json({ error: 'JSON required' });
  const body = req.body;
  if (!body || !['es','en','de','it','fr','pt'].includes(body.language) || (body.action != null && body.action !== 'contact') || (body.requestId != null && (typeof body.requestId !== 'string' || !/^[a-zA-Z0-9_-]{8,80}$/.test(body.requestId)))) return res.status(400).json({ error: 'Invalid message' });
  if (body.action === 'contact' ? !validContact(body.contact) : (typeof body.message !== 'string' || !body.message.trim() || body.message.length > 2000)) return res.status(400).json({ error: 'Invalid message' });
  if (body.page != null && (typeof body.page !== 'string' || body.page.length > 400 || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?)?$/.test(body.page))) return res.status(400).json({ error: 'Invalid page' });
  if (body.intent != null && body.intent !== 'sata-parts') return res.status(400).json({ error: 'Invalid intent' });
  if (!process.env.OLIVIA_GATEWAY_KEY || !process.env.ETAPEL_INBOX_KEY) return res.status(503).json({ error: 'Olivia unavailable' });
  let token;
  try { token = conversationToken(body.conversation, process.env.OLIVIA_GATEWAY_KEY); }
  catch { return res.status(403).json({ error: 'Invalid conversation' }); }
  const requestId = body.requestId || randomUUID();
  const context = { language: body.language, ...(body.page ? { page: body.page } : {}), ...(body.intent ? { intent: body.intent } : {}) };
  try {
    const initial = await inboxRequest(token, { ...context, messages: body.action === 'contact' ? [{ role: 'visitor', content: ('Solicitud de contacto: ' + body.contact.need).slice(0,2000), externalId: `${requestId}:contact` }] : [{ role: 'visitor', content: body.message.trim(), externalId: `${requestId}:visitor` }], ...(body.action === 'contact' ? { contact: body.contact } : {}) });
    if (body.action === 'contact') return res.status(200).json({ conversation: token, saved: true });
    if (initial.conversation?.status === 'manual') return res.status(200).json({ conversation: token, answer: '', status: 'manual' });
    const cached = initial.messages.find(message => message.role === 'ai' && message.metadata?.etapelExternalId === `${requestId}:assistant`);
    if (cached) return res.status(200).json({ conversation: token, answer: cached.content, status: initial.conversation?.status || 'ai', sources: [] });
    const greeting = greetingReply(body.message);
    let data;
    if (greeting) data = { answer: greeting, conversation: token, sources: [], mode: 'greeting' };
    else {
      const response = await fetch('https://olivia.o7digitalgroup.com/etapel/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OLIVIA_GATEWAY_KEY}`, 'X-Visitor-IP': req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown' },
        body: JSON.stringify({ message: body.message.trim(), language: body.language, conversation: token, ...context, routing: 'POWERFUL' }), signal: AbortSignal.timeout(38000),
      });
      data = await response.json();
      if (!response.ok) return res.status(response.status === 429 ? 429 : 503).json({ error: 'Olivia unavailable', conversation: token });
      if (data.version !== '3.6.0' || data.routing !== 'POWERFUL' || typeof data.answer !== 'string' || !data.answer.trim() || data.answer.length > 16000 || data.conversation !== token) throw new Error('Invalid gateway response');
    }
    const saved = await inboxRequest(token, { ...context, messages: [{ role: 'ai', content: data.answer, externalId: `${requestId}:assistant` }] });
    if (saved.conversation?.status === 'manual') return res.status(200).json({ conversation: token, answer: '', status: 'manual' });
    return res.status(200).json({ ...data, status: saved.conversation?.status || 'ai' });
  } catch { return res.status(503).json({ error: 'Olivia unavailable', conversation: token }); }
}
