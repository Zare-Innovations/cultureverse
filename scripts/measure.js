/*
 * Dump bounding boxes of elements in a page so an artboard and a route can be compared numerically.
 * Usage: node scripts/measure.js <url> <width> <height> [selector] [--proxyfonts]
 * Prints one line per element: tag.class  left top width height  | text excerpt
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const FONT_DIR = process.env.FONT_DIR || path.join(process.env.SCRATCH || '/tmp/claude-0/-home-user-cultureverse/10d67d4b-5497-5ece-86e6-53dcb3bdeec8/scratchpad', 'fonts');

async function localFonts(context) {
  await context.route(/fonts\.googleapis\.com\/css2/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/css', body: fs.readFileSync(path.join(FONT_DIR, 'fonts-local.css'), 'utf8') }));
  await context.route(/\/__fonts__\/files\//, (route) => {
    const name = route.request().url().split('/').pop();
    route.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(path.join(FONT_DIR, 'files', name)) });
  });
}

(async () => {
  const [url, w, h, selector] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: +w || 1440, height: +h || 900 }, deviceScaleFactor: 1 });
  await localFonts(ctx);
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);
  const rows = await page.evaluate((sel) => {
    const out = [];
    const els = document.querySelectorAll(sel || 'x-dc *, main *');
    for (const el of els) {
      if (['SCRIPT', 'STYLE', 'HELMET', 'LINK', 'SVG', 'PATH'].includes(el.tagName)) continue;
      if (el.closest('helmet')) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') continue;
      const text = (el.childElementCount === 0 ? el.textContent : '').trim().replace(/\s+/g, ' ').slice(0, 40);
      const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '';
      out.push(`${el.tagName.toLowerCase()}${cls}\t${Math.round(r.left + window.scrollX)}\t${Math.round(r.top + window.scrollY)}\t${Math.round(r.width)}\t${Math.round(r.height)}\tfs=${cs.fontSize}\t${text}`);
    }
    return out;
  }, selector);
  console.log(rows.join('\n'));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
