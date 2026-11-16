"""Prepare private VPS settings for the dedicated Etapel engine; print no secrets."""
import base64
import json
import os
from pathlib import Path
import secrets
import subprocess

root = Path('/opt/o7/apps/etapel-olivia36')
assert Path.cwd() == root
if (root / '.env').exists() or (root / '.env.db').exists():
    assert (root / '.env').exists() and (root / '.env.db').exists(), 'Incomplete engine settings'
    print('Existing Etapel engine credentials preserved.')
    raise SystemExit(0)
info = json.loads(subprocess.check_output(['docker', 'inspect', 'olivia-v3']))[0]
old = dict(value.split('=', 1) for value in info['Config']['Env'])
assert old.get('OPENAI_API_KEY'), 'The current Etapel provider credential is required'
provider_keys = ['OPENAI_API_KEY', 'OPENAI_MODEL_FAST', 'OPENAI_MODEL_BALANCED', 'OPENAI_MODEL_POWERFUL', 'EMBEDDING_PROVIDER', 'EMBEDDING_MODEL', 'EMBEDDING_DIMENSIONS', 'RAG_TOP_K', 'RAG_SIMILARITY_THRESHOLD', 'RAG_CHUNK_SIZE', 'RAG_CHUNK_OVERLAP', 'RATE_LIMIT_PER_MINUTE']
password = secrets.token_hex(32)
db = {'POSTGRES_DB': 'etapel', 'POSTGRES_USER': 'etapel', 'POSTGRES_PASSWORD': password}
api = {key: old[key] for key in provider_keys if key in old}
api.update({
    'DATABASE_URL': f'postgresql+psycopg://etapel:{password}@postgres:5432/etapel',
    'JWT_SECRET': secrets.token_hex(48),
    'VAULT_MASTER_KEY': base64.urlsafe_b64encode(secrets.token_bytes(32)).decode(),
    'TOOLS_ADMIN_KEY': secrets.token_hex(32),
    'LOCAL_LLM_ENABLED': 'false',
    'CHAT_TIMEOUT_SECONDS': '45',
})
os.umask(0o077)
for name, values in [('.env.db', db), ('.env', api)]:
    assert all('\n' not in value and '\r' not in value for value in values.values())
    (root / name).write_text(''.join(f'{key}={value}\n' for key, value in values.items()))
print('Dedicated Etapel database and engine credentials prepared; current provider settings preserved.')
