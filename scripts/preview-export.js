/*
 * Turns the static export into a relocatable copy for a hosted preview (any base path, no server routing):
 * root-relative URLs become relative, page links resolve to their .html files through a small runtime,
 * unused assets and RSC payload files are dropped. Output: <outDir>/site/...
 * Build first with NEXT_PUBLIC_RELATIVE_PREVIEW=true, then: node scripts/preview-export.js <outDir>
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'out');
const OUT = path.join(process.argv[2] || path.join(ROOT, 'preview'), 'site');

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

fs.rmSync(OUT, { recursive: true, force: true });
const USED = referencedAssets(SRC);
let n = 0, bytes = 0;
for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
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
