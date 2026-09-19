/*
 * Turns the static export into a relocatable copy for a hosted preview (any base path, no server routing):
 * root-relative URLs become relative, page links resolve to their .html files through a small runtime,
 * unused assets and RSC payload files are dropped. Output: <outDir>/site/...
 * Build first with NEXT_PUBLIC_RELATIVE_PREVIEW=true, then: node scripts/preview-export.js <outDir>
 * To add the headliner-announced home next to it: build again with NEXT_PUBLIC_HEADLINER_ANNOUNCED=true and run
 * node scripts/preview-export.js <outDir> --announced, which merges that build's home page in as index-announced.html
 * (plus any chunks and assets the first export does not have) and puts a hero switch on both home pages.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'out');
const OUT = path.join(process.argv[2] || path.join(ROOT, 'preview'), 'site');
const ANNOUNCED = process.argv.includes('--announced');

// Preview-only switch between the two home pages; the announced hero is a desktop layout, so it hides below 1024px.
function heroSwitch(current) {
  const link = (href, label) => `<a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`;
  return '<style>#cb-preview-switch{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:flex;align-items:center;gap:6px;padding:8px 10px;background:#111821;color:#fff;font:600 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.18)}'
    + '#cb-preview-switch span{opacity:.7;margin-right:4px}#cb-preview-switch a{color:#fff;text-decoration:none;padding:6px 10px;border:1px solid rgba(255,255,255,.35)}'
    + '#cb-preview-switch a[aria-current="page"]{background:#f6003a;border-color:#f6003a}@media (max-width:1023.98px){#cb-preview-switch{display:none}}</style>'
    + '<div id="cb-preview-switch" role="navigation" aria-label="Preview hero switch"><span>Preview hero</span>'
    + link('index.html', 'Default') + link('index-announced.html', 'Headliner announced') + '</div>';
}

// The click/observer runtime is rendered by the layout when NEXT_PUBLIC_RELATIVE_PREVIEW=true.

// Only assets some exported page references are copied (cb2.css is bundled, and a hero variant may use others).
function referencedAssets(dir) {
  const refs = new Set();
  for (const file of walk(dir)) {
    if (!/\.(html|css)$/.test(file)) continue;
    for (const m of fs.readFileSync(file, 'utf8').matchAll(/assets\/[A-Za-z0-9._\/-]+/g)) refs.add(m[0].split('/').slice(1).join(path.sep));
  }
  return refs;
}

function walk(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, list); else list.push(p);
  }
  return list;
}

if (!ANNOUNCED) fs.rmSync(OUT, { recursive: true, force: true });
const USED = referencedAssets(SRC);
let n = 0, bytes = 0;
for (const file of walk(SRC)) {
  let rel = path.relative(SRC, file);
  if (ANNOUNCED) {
    // Merge mode: the home page under its own name, and only the files the first export does not already have.
    if (rel.endsWith('.html')) { if (rel !== 'index.html') continue; rel = 'index-announced.html'; }
    else if (fs.existsSync(path.join(OUT, rel))) continue;
  }
  if (rel.endsWith('.txt') || rel === 'sitemap.xml' || rel === 'robots.txt') continue;
  // The nomodule polyfill bundle is only fetched by legacy browsers and contains U+FFFD literals some hosts reject.
  if (/polyfills-[a-f0-9]+\.js$/.test(rel)) continue;
  if (rel.startsWith('assets' + path.sep) && !USED.has(rel.slice(('assets' + path.sep).length))) continue;
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (rel.endsWith('.html')) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/"\/(_next|assets|favicon\.ico|icon\.png|apple-icon\.png|og-image\.png)/g, '"$1');
    html = html.replace(/,\s*\/(assets|_next)\//g, ', $1/');
    html = html.replace(/<script[^>]*polyfills-[a-f0-9]+\.js"[^>]*><\/script>/, '');
    if (rel === 'index.html' || rel === 'index-announced.html') html = html.replace('</body>', heroSwitch(rel) + '</body>');
    fs.writeFileSync(dest, html);
  } else if (rel.endsWith('.js') && rel.includes('_next' + path.sep + 'static' + path.sep + 'chunks')) {
    // webpack public path and the router's asset prefix: relative so runtime chunk loads and hoisted scripts resolve next to the page.
    fs.writeFileSync(dest, fs.readFileSync(file, 'utf8').split('"/_next/"').join('"_next/"'));
  } else if (rel.endsWith('.css')) {
    fs.writeFileSync(dest, fs.readFileSync(file, 'utf8').replace(/url\(\/_next\/static\/media\//g, 'url(../media/'));
  } else {
    fs.copyFileSync(file, dest);
  }
  n++; bytes += fs.statSync(dest).size;
}
console.log(`${n} files, ${(bytes / 1048576).toFixed(1)} MB in ${OUT}`);
