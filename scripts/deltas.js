/*
 * Text-anchored precise comparison: for every visible text leaf in the route, find the artboard
 * leaf with the same text and print the vertical/horizontal delta (route minus artboard, nav offset removed).
 * Usage: node scripts/deltas.js <comparison id> [minDelta]
 */
const { launch, newPage, settle } = require('./shot');
const M = require('./manifest');
(async () => {
  const [id, minStr] = process.argv.slice(2);
  const min = minStr ? +minStr : 0.04;
  const m = M.find((x) => x.id === id);
  if (!m) throw new Error('unknown id ' + id);
  const browser = await launch();
  const leaves = async (page, offset, root) => page.evaluate(([offset, root]) => {
    const out = new Map();
    const scope = document.querySelector(root) || document.body;
    for (const el of scope.querySelectorAll('*')) {
      if (['SCRIPT', 'STYLE', 'HELMET', 'SVG', 'PATH', 'BR'].includes(el.tagName)) continue;
      if (el.childElementCount !== 0) continue;
      let t = (el.textContent || '').trim().replace(/\s+/g, ' ');
      if (el.tagName === 'IMG') t = 'img:' + (el.getAttribute('src') || '').split('/').pop() + '@' + Math.round(el.getBoundingClientRect().width);
      if (!t) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (!out.has(t)) out.set(t, [r.left + window.scrollX, r.top + window.scrollY - offset, r.width, r.height]);
    }
    return Array.from(out.entries());
  }, [offset, root]);

  const ap = await newPage(browser, { width: m.bw, height: m.bh, artboard: true });
  if (m.world) await ap.addInitScript((wk) => { window.__DC_PROPS = { world: wk }; }, m.world);
  await ap.goto(`http://localhost:4100/${m.board}`, { waitUntil: 'networkidle' });
  await settle(ap, 1500);
  const clipY = m.clip ? m.clip[1] : 0;
  const A = new Map(await leaves(ap, clipY, 'x-dc'));
  await ap.context().close();

  const rp = await newPage(browser, { width: m.w, height: Math.max(m.h, 900) });
  await rp.goto(`http://localhost:${m.announced ? 4201 : 4200}${m.route}`, { waitUntil: 'networkidle' });
  if (m.scroll) { await rp.evaluate((y) => window.scrollTo(0, y), m.scroll); await rp.waitForTimeout(300); }
  if (m.menu) { await rp.click('button[aria-label="Open menu"]'); await rp.waitForTimeout(300); }
  if (m.dd) { await rp.hover('a[aria-controls="cultureverse-menu"]'); await rp.waitForTimeout(400); }
  await settle(rp, 1500);
  let top = 0, bottom = 0;
  if (typeof m.anchor === 'string') [top, bottom] = await rp.evaluate((sel) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect(); return [r.top + window.scrollY, r.bottom + window.scrollY]; }, m.anchor);
  console.log(`anchor ${m.anchor}: top=${top.toFixed(3)} height=${(bottom - top).toFixed(3)} (artboard ${m.bh})`);
  const root = m.menu ? '#mobile-menu' : (typeof m.anchor === 'string' ? m.anchor : 'body');
  const R = new Map(await leaves(rp, top, root));
  await rp.context().close();
  await browser.close();

  let n = 0;
  for (const [t, [rx, ry, rw, rh]] of R) {
    const a = A.get(t);
    if (!a) { console.log(`  (route only) ${t.slice(0, 50)}`); continue; }
    const dx = rx - a[0], dy = ry - a[1], dw = rw - a[2], dh = rh - a[3];
    if (Math.abs(dx) >= min || Math.abs(dy) >= min || Math.abs(dw) >= min || Math.abs(dh) >= min) {
      n++;
      console.log(`dy=${dy.toFixed(2).padStart(7)} dx=${dx.toFixed(2).padStart(7)} dw=${dw.toFixed(2).padStart(7)} dh=${dh.toFixed(2).padStart(6)}  y=${a[1].toFixed(2).padStart(8)}  ${t.slice(0, 48)}`);
    }
  }
  for (const t of A.keys()) if (!R.has(t)) console.log(`  (artboard only) ${t.slice(0, 50)}`);
  console.log(`${id}: ${n} of ${R.size} texts differ by >= ${min}px`);
})().catch((e) => { console.error(e); process.exit(1); });
