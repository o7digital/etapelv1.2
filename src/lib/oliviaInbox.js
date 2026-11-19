import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const endpoint = 'https://olivia-ai.o7digital.com/api/internal/etapel';
export function conversationToken(value, key) {
  if (!key) throw new Error('Missing gateway key');
  const sign = id => createHmac('sha256', key).update(id).digest('base64url');
  if (value == null) {
    const id = randomBytes(12).toString('hex');
    return `${id}.${sign(id)}`;
  }
  if (typeof value !== 'string' || !/^[a-f0-9]{24}\.[A-Za-z0-9_-]{43}$/.test(value)) throw new Error('Invalid conversation');
  const [id, signature] = value.split('.');
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(sign(id)))) throw new Error('Invalid conversation');
  return value;
}
export async function inboxRequest(conversation, payload) {
  const key = process.env.ETAPEL_INBOX_KEY;
  if (!key || key.length < 32) throw new Error('Missing inbox key');
  const id = conversation.split('.')[0];
  const response = await fetch(payload ? endpoint : `${endpoint}?conversationId=${id}`, {
    method: payload ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${key}`, ...(payload ? { 'Content-Type': 'application/json' } : {}) },
    ...(payload ? { body: JSON.stringify({ ...payload, conversationId: id }) } : {}),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Inbox unavailable');
  const data = await response.json();
  if (!Array.isArray(data.messages)) throw new Error('Invalid inbox response');
  return data;
}
export function publicSnapshot(data) {
  return { status: data.conversation?.status || 'ai', messages: data.messages.filter(message => message.role === 'operator').map(({ id, content, createdAt }) => ({ id, content, createdAt })) };
}
export function validContact(c) {
  return c && c.consent === true && typeof c.name === 'string' && c.name.trim().length > 0 && c.name.length <= 180 && typeof c.email === 'string' && c.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) && typeof c.phone === 'string' && /^[+0-9() .-]{7,40}$/.test(c.phone) && typeof c.need === 'string' && c.need.length <= 4000 && ['Email','Teléfono','WhatsApp'].includes(c.method);
}
