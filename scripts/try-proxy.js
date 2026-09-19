const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: process.env.HTTPS_PROXY } });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('requestfailed', r => errs.push(r.url().slice(0, 90) + ' ' + (r.failure() && r.failure().errorText)));
  await page.goto('http://localhost:4100/03-About-D.dc.html', { waitUntil: 'networkidle' });
  const fonts = await page.evaluate(async () => { await document.fonts.ready; return Array.from(document.fonts).map(f => f.family + ' ' + f.weight + ' ' + f.style + ' ' + f.status); });
  console.log('fonts loaded:', fonts.length, fonts.slice(0, 4));
  console.log('failed', errs);
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
