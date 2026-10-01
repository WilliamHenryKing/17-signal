"""Restore the committed, licensed asset set from its own pinned manifest."""
from pathlib import Path
import hashlib
import json
import urllib.request

root = Path(__file__).resolve().parent.parent
for record in json.loads((root / 'assets.manifest.json').read_text())['assets']:
    target = (root / record['output']).resolve()
    if not target.is_relative_to((root / 'public').resolve()):
        raise ValueError('Asset destination must remain inside public/')
    request = urllib.request.Request(record['download'], headers={'User-Agent':'Mozilla/5.0'})
    data = urllib.request.urlopen(request, timeout=45).read()
    if hashlib.sha256(data).hexdigest() != record['sha256']:
        raise ValueError(f"Source changed: {record['output']}; review provenance before replacing")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    print(record['output'], len(data))
