"""Copy only Etapel's records into its empty, dedicated Olivia 3.6 database.

Run on the VPS before switching the gateway. Payloads stay in memory and are
never printed. Existing source records are read only; a populated destination
is rejected to prevent replacing newer conversations.
"""
import json
import subprocess

EXPORT = r'''
import json
from datetime import datetime
from sqlalchemy import select
from app.db import tenant_session
from app.models import Base
def encode(value):
    if isinstance(value, datetime): return value.isoformat()
    if hasattr(value, 'tolist'): return value.tolist()
    raise TypeError(type(value).__name__)
records = {}
with tenant_session('etapel') as db:
    for table in Base.metadata.sorted_tables:
        if 'tenant_id' in table.c:
            records[table.name] = [dict(row) for row in db.execute(select(table).where(table.c.tenant_id == 'etapel')).mappings()]
assert not records.get('tenant_secrets'), 'Encrypted tenant secrets require a separate vault migration'
print(json.dumps(records, default=encode))
'''

IMPORT = r'''
import json, sys
from datetime import datetime
from sqlalchemy import DateTime, Integer, select, func, text
from app.db import engine
from app.models import Base
records = json.load(sys.stdin)
counts = {}
with engine.begin() as db:
    for table in Base.metadata.sorted_tables:
        if 'tenant_id' in table.c:
            assert db.scalar(select(func.count()).select_from(table)) == 0, 'Destination must be empty: ' + table.name
    for table in Base.metadata.sorted_tables:
        for row in records.get(table.name, []):
            assert row['tenant_id'] == 'etapel'
            assert set(row).issubset(table.c.keys()), 'Schema mismatch: ' + table.name
            for column in table.c:
                if isinstance(column.type, DateTime) and row.get(column.name): row[column.name] = datetime.fromisoformat(row[column.name])
            db.execute(table.insert().values(**row))
        if table.name in records:
            counts[table.name] = db.scalar(select(func.count()).select_from(table))
            assert counts[table.name] == len(records[table.name]), table.name
        if 'id' in table.c and isinstance(table.c.id.type, Integer):
            sequence = db.scalar(text('SELECT pg_get_serial_sequence(:table, :column)'), {'table': table.name, 'column': 'id'})
            maximum = db.scalar(select(func.max(table.c.id)))
            if sequence and maximum: db.execute(text('SELECT setval(:sequence, :maximum, true)'), {'sequence': sequence, 'maximum': maximum})
print(json.dumps({'tenant': 'etapel', 'copied': counts}))
'''

if __name__ == '__main__':
    exported = subprocess.run(['docker', 'exec', 'olivia-v3', 'python', '-c', EXPORT], check=True, capture_output=True)
    records = json.loads(exported.stdout)
    assert all(row.get('tenant_id') == 'etapel' for rows in records.values() for row in rows)
    imported = subprocess.run(['docker', 'exec', '-i', 'etapel-olivia36', 'python', '-c', IMPORT], input=exported.stdout, check=True, capture_output=True)
    print(imported.stdout.decode().strip())
