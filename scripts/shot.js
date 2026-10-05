/*
 * Screenshot helper shared by the verification scripts.
 * - Serves local copies of the Google Fonts CSS and files for the artboards.
 * - Injects scripts/support.js for /support.js so artboard templates render.
 * - Freezes Date.now() so countdowns match between artboard and route.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCRATCH = process.env.SCRATCH || '/tmp/claude-0/-home-user-cultureverse/10d67d4b-5497-5ece-86e6-53dcb3bdeec8/scratchpad';
const FONT_DIR = process.env.FONT_DIR || path.join(SCRATCH, 'fonts');
const FROZEN_NOW = Date.UTC(2026, 8, 19, 14, 0, 0); // 31 days 14 hours before opening night

async function launch() {
  return chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
}

async function newPage(browser, { width, height, reducedMotion = 'no-preference', freeze = true, artboard = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion });
  await ctx.route(/fonts\.googleapis\.com\/css2/, (route) =>
    route.fulfill({ status: 200, contentType: 'text/css', body: fs.readFileSync(path.join(FONT_DIR, 'fonts-local.css'), 'utf8') }));
  await ctx.route(/\/__fonts__\/files\//, (route) => {
    const name = route.request().url().split('/').pop();
    route.fulfill({ status: 200, contentType: 'font/woff2', body: fs.readFileSync(path.join(FONT_DIR, 'files', name)) });
  });
  // Hosts the browser cannot reach directly in the cloud environment (it ignores the proxy env) are
  // fetched by Node instead: SHOT_PROXY_HOSTS=images.squarespace-cdn.com,other.host
  const proxied = (process.env.SHOT_PROXY_HOSTS || '').split(',').map((h) => h.trim()).filter(Boolean);
  if (proxied.length) {
    await ctx.route((url) => proxied.includes(url.hostname), async (route) => {
      try {
        const res = await fetch(route.request().url(), { headers: { accept: 'image/*,*/*' } });
        const body = Buffer.from(await res.arrayBuffer());
        route.fulfill({ status: res.status, contentType: res.headers.get('content-type') || 'application/octet-stream', body });
      } catch (e) {
        route.abort();
      }
    });
  }
  if (artboard) {
    await ctx.route(/\/support\.js$/, (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(path.join(__dirname, 'support.js'), 'utf8') }));
  }
  if (freeze) {
    await ctx.addInitScript((now) => {
      const RealDate = Date;
      const fixed = now;
      // Freeze Date.now and new Date() (no args) so countdowns are deterministic.
      class FrozenDate extends RealDate {
        constructor(...args) { if (args.length === 0) super(fixed); else super(...args); }
        static now() { return fixed; }
      }
      window.Date = FrozenDate;
      // Countdowns must not tick during capture.
      window.setInterval = () => 0;
    }, FROZEN_NOW);
  }
  const page = await ctx.newPage();
  return page;
}

async function settle(page, ms = 2600) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(ms); // load sequence ends at 1900ms
}

module.exports = { launch, newPage, settle, FROZEN_NOW, SCRATCH };
