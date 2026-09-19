const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('requestfailed', r => errs.push(r.url() + ' ' + (r.failure() && r.failure().errorText)));
  await page.goto('http://localhost:4100/03-About-D.dc.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const fonts = await page.evaluate(async () => { await document.fonts.ready; return { golos: document.fonts.check('900 20px "Golos Text"'), corm: document.fonts.check('400 20px "Cormorant Garamond"'), n: document.fonts.size }; });
  console.log('fonts', fonts);
  console.log('failed', errs);
  await page.screenshot({ path: process.argv[2] || '/tmp/x.png' });
  await browser.close();
})();
