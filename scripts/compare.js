/*
 * Pixel comparison of every artboard against its route.
 * Usage: node scripts/compare.js [filter]   (filter matches the comparison id)
 * Requires the design folder on :4100 and the exported site on :4200.
 * Writes <id>-a.png (artboard), <id>-r.png (route), <id>-diff.png and <id>-sbs.png (side by side)
 * into $SCRATCH/compare and prints the mismatch ratio per comparison.
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pm = require('pixelmatch');
const pixelmatch = typeof pm === 'function' ? pm : pm.default;
const { launch, newPage, settle, SCRATCH } = require('./shot');

const OUT = path.join(SCRATCH, 'compare');
fs.mkdirSync(OUT, { recursive: true });

// id, artboard file, board clip [x,y,w,h], route, route anchor selector (clip starts at its top) or number, viewport width, extra route options
const M = require('./manifest');

function sbs(a, r, d) {
  const out = new PNG({ width: a.width * 3 + 20, height: a.height });
  out.data.fill(80);
  for (const [img, ox] of [[a, 0], [r, a.width + 10], [d, a.width * 2 + 20]]) {
    for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4, o = (y * out.width + x + ox) * 4;
      out.data[o] = img.data[i]; out.data[o + 1] = img.data[i + 1]; out.data[o + 2] = img.data[i + 2]; out.data[o + 3] = 255;
    }
  }
  return out;
}

(async () => {
  const filter = process.argv[2];
  const list = M.filter((m) => !filter || m.id.includes(filter));
  const browser = await launch();
  const results = [];
  for (const m of list) {
    // Artboard
    const ap = await newPage(browser, { width: m.bw, height: m.bh, artboard: true });
    if (m.world) await ap.addInitScript((wk) => { window.__DC_PROPS = { world: wk }; }, m.world);
    await ap.goto(`http://localhost:4100/${m.board}`, { waitUntil: 'networkidle' });
    await settle(ap);
    const clip = m.clip ? { x: m.clip[0], y: m.clip[1], width: m.clip[2], height: m.clip[3] } : { x: 0, y: 0, width: m.bw, height: m.bh };
    const aBuf = await ap.screenshot({ clip });
    await ap.context().close();

    // Route
    const viewportShot = m.fixedTop || m.anchor === 0;
    const rp = await newPage(browser, { width: m.w, height: viewportShot ? m.h : Math.max(m.h, 900) });
    await rp.addInitScript(() => { document.documentElement.classList.add('is-capture'); });
    await rp.goto(`http://localhost:${m.announced ? 4201 : 4200}${m.route}`, { waitUntil: 'networkidle' });
    if (m.scroll) { await rp.evaluate((y) => window.scrollTo(0, y), m.scroll); await rp.waitForTimeout(300); }
    if (m.menu) { await rp.click('button[aria-label="Open menu"]'); await rp.waitForTimeout(300); }
    if (m.dd) { await rp.hover('a[aria-controls="cultureverse-menu"]'); await rp.waitForTimeout(400); }
    await settle(rp);
    let top = 0;
    if (typeof m.anchor === 'string') top = await rp.evaluate((sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0; }, m.anchor);
    else top = m.anchor;
    // Hide the pinned ticket bar for body comparisons (it sits at the viewport bottom, not in the artboard body).
    if (!m.menu && m.anchor !== 0) await rp.addStyleTag({ content: '[class*="TicketBar"] { display: none !important; }' });
    const rBuf = viewportShot
      ? await rp.screenshot({ clip: { x: 0, y: 0, width: m.w, height: m.h } })
      : await rp.screenshot({ fullPage: true, clip: { x: 0, y: top, width: m.w, height: m.h } });
    await rp.context().close();

    const a = PNG.sync.read(aBuf), r = PNG.sync.read(rBuf);
    const h = Math.min(a.height, r.height), w = Math.min(a.width, r.width);
    const diff = new PNG({ width: w, height: h });
    const n = pixelmatch(a.data, r.data, diff.data, w, h, { threshold: 0.12, includeAA: true, diffColor: [255, 0, 255], alpha: 0.35 });
    const ratio = n / (w * h);
    results.push({ id: m.id, ratio });
    fs.writeFileSync(path.join(OUT, `${m.id}-a.png`), aBuf);
    fs.writeFileSync(path.join(OUT, `${m.id}-r.png`), rBuf);
    fs.writeFileSync(path.join(OUT, `${m.id}-diff.png`), PNG.sync.write(diff));
    fs.writeFileSync(path.join(OUT, `${m.id}-sbs.png`), PNG.sync.write(sbs(a, r, diff)));
    console.log(`${m.id.padEnd(16)} mismatch ${(ratio * 100).toFixed(2)}%  (${w}x${h})`);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
