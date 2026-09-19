#!/usr/bin/env python3
"""Rewrite /_blob/<id> references in the exported .dc.html files to /assets/<file>.
Usage: python3 relink.py <folder with the .dc.html files>"""
import json, os, re, sys
folder = sys.argv[1] if len(sys.argv) > 1 else '.'
here = os.path.dirname(os.path.abspath(__file__))
m = json.load(open(os.path.join(here, 'blob-map.json')))
missing = set()
for f in os.listdir(folder):
    if not f.endswith('.dc.html'):
        continue
    p = os.path.join(folder, f)
    s = open(p, encoding='utf-8').read()
    def sub(mt):
        i = mt.group(1)
        if i in m:
            return '/assets/' + m[i]
        missing.add(i); return mt.group(0)
    s2 = re.sub(r'/_blob/([0-9a-f]{32})', sub, s)
    # script form: B + 'id'  ->  '/assets/file'
    def sub2(mt):
        i = mt.group(1)
        if i in m:
            return "'/assets/" + m[i] + "'"
        missing.add(i); return mt.group(0)
    s2 = re.sub(r"B \+ '([0-9a-f]{32})'", sub2, s2)
    s2 = s2.replace("const B = '/_blob/';", "const B = '/assets/';")
    if s2 != s:
        open(p, 'w', encoding='utf-8').write(s2)
        print('relinked', f)
if missing:
    print('unmapped ids:', sorted(missing))
