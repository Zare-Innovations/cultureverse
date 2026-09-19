// node scripts/shot-route.js <path> <w> <h> <out.png> [--full] [--scroll=N] [--clip=x,y,w,h] [--rm] [--menu] [--dd] [--hover=selector]
const { launch, newPage, settle } = require('./shot');
(async () => {
  const [route, w, h, out, ...flags] = process.argv.slice(2);
  const opt = Object.fromEntries(flags.map((f) => { const m = f.match(/^--([^=]+)(?:=(.*))?$/); return [m[1], m[2] === undefined ? true : m[2]]; }));
  const browser = await launch();
  const page = await newPage(browser, { width: +w, height: +h, reducedMotion: opt.rm ? 'reduce' : 'no-preference' });
  await page.goto(`http://localhost:4200${route}`, { waitUntil: 'networkidle' });
  if (opt.scroll) { await page.evaluate((y) => window.scrollTo(0, y), +opt.scroll); await page.waitForTimeout(300); }
  if (opt.menu) { await page.click('button[aria-label="Open menu"]'); await page.waitForTimeout(300); }
  if (opt.dd) { await page.hover('a[aria-controls="cultureverse-menu"]'); await page.waitForTimeout(400); }
  if (opt.hover) { await page.hover(opt.hover); await page.waitForTimeout(600); }
  await settle(page);
  const shot = { path: out };
  if (opt.full) shot.fullPage = true;
  if (opt.clip) { const [x, y, cw, ch] = opt.clip.split(',').map(Number); shot.clip = { x, y, width: cw, height: ch }; shot.fullPage = true; }
  await page.screenshot(shot);
  console.log('wrote', out);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
