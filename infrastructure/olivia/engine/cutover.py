"""Switch only the Etapel gateway after preparing and testing its 3.6 engine."""
from datetime import datetime, timezone
from pathlib import Path
import shutil
import subprocess

gateway = Path('/opt/o7/apps/etapel-olivia')
engine = Path('/opt/o7/apps/etapel-olivia36')
staged = {'gateway.mjs': gateway / 'gateway-3.6.mjs', 'compose.yaml': gateway / 'compose-3.6.yaml'}
assert all(path.is_file() for path in staged.values()), 'Stage the reviewed gateway files first'
backup = gateway / 'backups' / ('before-3.6-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ'))
backup.mkdir(parents=True, mode=0o700)
for name in staged:
    shutil.copy2(gateway / name, backup / name)
subprocess.run(['docker', 'stop', '--time', '10', 'etapel-olivia-gateway'], check=True)
try:
    subprocess.run(['python3', str(engine / 'migrate-etapel.py')], check=True)
    for name, path in staged.items():
        shutil.copyfile(path, gateway / name)
    subprocess.run(['docker', 'compose', 'up', '-d', '--force-recreate', '--wait', '--wait-timeout', '60'], cwd=gateway, check=True)
except Exception:
    for name in staged:
        shutil.copy2(backup / name, gateway / name)
    subprocess.run(['docker', 'compose', 'up', '-d', '--force-recreate', '--wait', '--wait-timeout', '60'], cwd=gateway, check=True)
    raise
print('Etapel gateway switched to Olivia 3.6.0. Previous gateway files:', backup)
