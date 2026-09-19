// node scripts/shot-artboard.js <file.dc.html> <w> <h> <out.png> [world]
const { launch, newPage, settle } = require('./shot');
(async () => {
  const [file, w, h, out, world] = process.argv.slice(2);
  const browser = await launch();
  const page = await newPage(browser, { width: +w, height: +h, artboard: true });
  if (world) await page.addInitScript((wk) => { window.__DC_PROPS = { world: wk }; }, world);
  await page.goto(`http://localhost:4100/${file}`, { waitUntil: 'networkidle' });
  await settle(page);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: +w, height: +h } });
  console.log('wrote', out);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
