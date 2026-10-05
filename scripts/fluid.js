// Horizontal overflow check at intermediate and wide viewports.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const routes = ['/', '/about', '/cultureverse', '/culturelive', '/cultureexpo', '/exchnge', '/biggive', '/iconhonors', '/cultureunion', '/culturecoming', '/culturegames', '/tap-in', '/shop'];
  const widths = [320, 360, 390, 480, 600, 768, 900, 1023, 1024, 1100, 1200, 1366, 1440, 1600, 1920];
  const bad = [];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    for (const r of routes) {
      await page.goto(`http://localhost:4200${r}`, { waitUntil: 'load' });
      await page.waitForTimeout(150);
      const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      if (sw[0] > sw[1]) bad.push(`${w}px ${r}: scrollWidth ${sw[0]} > ${sw[1]}`);
    }
    await ctx.close();
  }
  await browser.close();
  console.log(bad.length ? bad.join('\n') : 'no horizontal overflow at any tested width');
})();
