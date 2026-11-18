import { createHash } from 'node:crypto';

const origin = 'https://www.etapel.com';
const supported = new Set(['es', 'en', 'de', 'it', 'fr', 'pt']);
const stopwords = new Set(('a an the and or of for to in on is are do does what which how can i you me my your with about please etapel el la los las un una de del y o en para por que cual como puedo puede mi mis su sus con sobre al se es son hay das der die den dem des ein eine und oder von fur zu im in ist sind wie was welche ich sie mir mein meine mit bitte le les des du une et ou pour au aux est sont quel quelle quels quelles comment puis peux je vous mon ma mes avec sur il lo gli delle della di e per da che cosa quali come posso vorrei mio mia con su um uma os as do dos das da em para por qual quais como posso meu minha com sobre voce o seu sua il gli dei della delle un una e per che quale sono puo io tu noi voi con mio mia bitte auch also also').split(/\s+/));
export const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const searchTerms = value => [...new Set((normalizeSearch(value).match(/[\p{L}\p{N}]+/gu) || []).filter(term => !stopwords.has(term) && (term.length > 1 || /^\d$/.test(term))).map(term => term.length > 5 && term.endsWith('s') ? term.slice(0, -1) : term))];

export function createSearchIndex(payload) {
  if (payload?.version !== 1 || payload.origin !== origin || !Array.isArray(payload.documents) || !payload.documents.length || payload.documents.length > 10000 || !/^[a-f0-9]{64}$/.test(payload.hash || '')) throw new Error('Invalid public site knowledge');
  if (createHash('sha256').update(JSON.stringify(payload.documents)).digest('hex') !== payload.hash) throw new Error('Public site knowledge hash mismatch');
  const paths = new Set(), frequency = new Map();
  const documents = payload.documents.map(document => {
    if (!document || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(document.path) || document.path.startsWith('/admin') || !supported.has(document.locale) || typeof document.title !== 'string' || typeof document.text !== 'string' || document.text.length > 150000 || !document.text.trim() || paths.has(document.path)) throw new Error('Invalid public knowledge document');
    paths.add(document.path);
    const terms = new Map();
    for (const [text, weight] of [[document.title, 7], [document.description || '', 2], [document.text, 1]]) for (const term of searchTerms(text)) terms.set(term, (terms.get(term) || 0) + weight);
    for (const term of terms.keys()) frequency.set(term, (frequency.get(term) || 0) + 1);
    return { ...document, key: document.key || document.path, terms, titleTerms: searchTerms(document.title.replace(/\|.*$/, '')) };
  });
  return { documents, frequency, byPath: new Map(documents.map(document => [document.path, document])), hash: payload.hash, languages: [...new Set(documents.map(document => document.locale))].sort() };
}

function excerpt(text, terms, maxLength = 7000) {
  if (text.length <= maxLength) return text;
  const normalized = normalizeSearch(text);
  const windows = [{ start: 0, end: 600 }];
  for (const term of terms) {
    let start = normalized.indexOf(term), hits = 0;
    while (start >= 0 && hits++ < 3) { windows.push({ start: Math.max(0, start - 350), end: Math.min(text.length, start + 850) }); start = normalized.indexOf(term, start + term.length); }
  }
  windows.sort((a, b) => a.start - b.start);
  const merged = [];
  for (const window of windows) {
    const previous = merged.at(-1);
    if (previous && window.start <= previous.end) previous.end = Math.max(previous.end, window.end);
    else merged.push({ ...window });
  }
  return merged.map(window => text.slice(window.start, window.end)).join('\n[…]\n').slice(0, maxLength);
}

export function searchKnowledge(index, message, { language = 'es', page, previousKeys = [] } = {}) {
  const terms = searchTerms(message), ranked = [];
  const current = page ? index.byPath.get(page.replace(/\/+$/, '') || '/') : undefined;
  for (const document of index.documents) {
    let score = 0;
    for (const term of terms) {
      const weight = document.terms.get(term);
      if (weight) score += Math.log(1 + index.documents.length / (index.frequency.get(term) || 1)) * weight;
    }
    const titleHits = document.titleTerms.filter(term => terms.includes(term)).length;
    if (document.titleTerms.length && titleHits === document.titleTerms.length) score += 30;
    if (document.key === current?.key) score += 7;
    if (previousKeys.includes(document.key)) score += 4;
    if (document.locale === language) score += 0.1;
    if (score > 0.1) ranked.push({ document, score });
  }
  ranked.sort((a, b) => b.score - a.score);
  const groups = new Map();
  for (const { document, score } of ranked) if (!groups.has(document.key)) groups.set(document.key, { document, score });
  const chosen = [...groups.values()].slice(0, 4).map(item => item.document);
  if (!chosen.length) for (const key of ['/', '/linea-de-producto', '/contacto']) {
    const document = index.documents.find(document => document.key === key && document.locale === language) || index.byPath.get(key);
    if (document) chosen.push(document);
  }
  const documents = [];
  for (const document of chosen) {
    documents.push(document);
    // The Spanish original includes technical specifications and legal details
    // that some translated layouts summarize. Keep it available in every language.
    const original = index.byPath.get(document.key);
    if (original && original.path !== document.path) documents.push(original);
  }
  let remaining = 26000;
  const sources = [], context = [];
  for (const document of documents) {
    if (remaining < 600) break;
    const text = excerpt(document.text, terms, Math.min(7000, remaining));
    const url = origin + (document.path === '/' ? '/' : document.path);
    sources.push({ title: document.title, url });
    context.push(JSON.stringify({ source: url, language: document.locale, title: document.title, description: document.description, content: text, links: document.links || [] }));
    remaining -= text.length;
  }
  return { context: context.join('\n'), sources, keys: chosen.map(document => document.key), hash: index.hash, pages: index.documents.length, languages: index.languages };
}

export function createKnowledgeLoader({ fetcher = (...args) => fetch(...args), now = Date.now, ttl = 60000 } = {}) {
  let cached, expires = 0, pending;
  return async function load() {
    if (cached && now() < expires) return cached;
    if (pending) return pending;
    pending = (async () => {
      try {
        const response = await fetcher(origin + '/.well-known/etapel-knowledge.json', { signal: AbortSignal.timeout(12000), redirect: 'error' });
        if (!response.ok) throw new Error(`Public knowledge HTTP ${response.status}`);
        const declared = Number(response.headers?.get('content-length'));
        if (declared > 15 * 1024 * 1024) throw new Error('Public knowledge exceeds size limit');
        const raw = await response.text();
        if (Buffer.byteLength(raw) > 15 * 1024 * 1024) throw new Error('Public knowledge exceeds size limit');
        const fresh = createSearchIndex(JSON.parse(raw));
        cached = fresh; expires = now() + ttl;
        return fresh;
      } catch (error) {
        if (!cached) throw error;
        // A temporary website outage keeps the last validated published index.
        expires = now() + 15000;
        return cached;
      } finally { pending = undefined; }
    })();
    return pending;
  };
}
