/*
 * Dump bounding boxes of elements so an artboard and a route can be compared numerically.
 * Usage: node scripts/measure.js <url> <width> <height> [selector] [world]
 * Artboards (port 4100) get the support.js stand-in so templates render.
 */
const { launch, newPage, settle } = require('./shot');
(async () => {
  const [url, w, h, selector, world] = process.argv.slice(2);
  const browser = await launch();
  const page = await newPage(browser, { width: +w || 1440, height: +h || 900, artboard: url.includes(':4100') });
  if (world) await page.addInitScript((wk) => { window.__DC_PROPS = { world: wk }; }, world);
  await page.goto(url, { waitUntil: 'networkidle' });
  await settle(page, 2200);
  const rows = await page.evaluate((sel) => {
    const out = [];
    const els = document.querySelectorAll(sel || 'x-dc *, main *');
    for (const el of els) {
      if (['SCRIPT', 'STYLE', 'HELMET', 'LINK', 'SVG', 'PATH', 'BR'].includes(el.tagName)) continue;
      if (el.closest('helmet')) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;
      const text = (el.childElementCount === 0 ? el.textContent : '').trim().replace(/\s+/g, ' ').slice(0, 36);
      const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).map((c) => c.replace(/__.*$/, '')).join('.') : '';
      out.push(`${el.tagName.toLowerCase()}${cls}\t${Math.round(r.left + window.scrollX)}\t${Math.round(r.top + window.scrollY)}\t${Math.round(r.width)}\t${Math.round(r.height)}\tfs=${cs.fontSize}\t${text}`);
    }
    return out;
  }, selector);
  console.log(rows.join('\n'));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
