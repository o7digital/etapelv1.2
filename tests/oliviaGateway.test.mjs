import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { Readable } from 'node:stream';

// Exercise the actual gateway handler without binding a port or calling a model.
test('authenticated gateway selects POWERFUL while preserving legacy FAST requests', async t => {
  const originalCreateServer = http.createServer;
  const originalFetch = globalThis.fetch;
  const envKeys = ['GATEWAY_KEY', 'OLIVIA_EMAIL', 'OLIVIA_PASSWORD'];
  const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  Object.assign(process.env, { GATEWAY_KEY: 'gateway-test-key', OLIVIA_EMAIL: 'test@example.invalid', OLIVIA_PASSWORD: 'gateway-test-password' });
  let handler;
  http.createServer = callback => { handler = callback; return { listen() {} }; };
  const calls = [];
  let upstreamRoutingOverride;
  globalThis.fetch = async (url, options) => {
    const body = JSON.parse(options.body);
    if (url.endsWith('/v1/auth/login')) return { ok: true, json: async () => ({ access_token: 'internal-test-token' }) };
    assert.equal(options.headers['X-Tenant-ID'], 'etapel');
    assert.equal(options.headers.Authorization, 'Bearer internal-test-token');
    calls.push(body);
    return { ok: true, json: async () => ({ answer: 'Respuesta Etapel', conversation_id: 'a'.repeat(24), routing: upstreamRoutingOverride || body.routing }) };
  };
  async function request(body, authorization = 'Bearer gateway-test-key') {
    const req = Object.assign(Readable.from([JSON.stringify(body)]), { url: '/chat', method: 'POST', headers: { authorization, 'x-visitor-ip': 'gateway-test' } });
    const res = { writeHead(status) { this.status = status; }, end(data) { this.data = JSON.parse(data); } };
    await handler(req, res);
    return res;
  }
  try {
    await import('../infrastructure/olivia/gateway.mjs');
    http.createServer = originalCreateServer;
    await t.test('keeps older production proxies on FAST until their update', async () => {
      const res = await request({ message: 'Hola', language: 'es' });
      assert.equal(res.status, 200);
      assert.equal(calls.at(-1).routing, 'FAST');
      assert.equal(res.data.routing, 'FAST');
    });
    await t.test('uses POWERFUL for new chats and signed conversation follow-ups', async () => {
      const first = await request({ message: 'Hola', language: 'es', routing: 'POWERFUL' });
      assert.equal(first.status, 200);
      assert.equal(calls.at(-1).routing, 'POWERFUL');
      assert.equal(first.data.routing, 'POWERFUL');
      const followup = await request({ message: '¿Y la capacitación?', language: 'es', routing: 'POWERFUL', conversation: first.data.conversation });
      assert.equal(followup.status, 200);
      assert.equal(calls.at(-1).routing, 'POWERFUL');
      assert.equal(calls.at(-1).conversation_id, 'a'.repeat(24));
      assert.ok(!JSON.stringify(followup.data).includes('internal-test-token'));
    });
    await t.test('does not label a weaker upstream response as POWERFUL', async () => {
      upstreamRoutingOverride = 'FAST';
      try {
        const res = await request({ message: 'Hola', language: 'es', routing: 'POWERFUL' });
        assert.equal(res.status, 503);
        assert.equal(res.data.error, 'Olivia unavailable');
      } finally { upstreamRoutingOverride = undefined; }
    });
    await t.test('rejects unauthenticated access, unsupported routing and forged conversations', async () => {
      const count = calls.length;
      assert.equal((await request({ message: 'Hola', language: 'es', routing: 'POWERFUL' }, 'Bearer wrong-key')).status, 401);
      assert.equal((await request({ message: 'Hola', language: 'es', routing: 'INVALID' })).status, 400);
      assert.equal((await request({ message: 'Hola', language: 'es', routing: 'POWERFUL', conversation: 'a'.repeat(24) + '.forged' })).status, 403);
      assert.equal(calls.length, count);
    });
  } finally {
    http.createServer = originalCreateServer;
    globalThis.fetch = originalFetch;
    for (const key of envKeys) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  }
});
