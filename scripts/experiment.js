// Compare the footer crop of /about against the footer artboard under different CSS tweaks.
const fs = require('fs'); const { PNG } = require('pngjs');
const pm = require('pixelmatch'); const pixelmatch = typeof pm === 'function' ? pm : pm.default;
const { launch, newPage, settle } = require('./shot');
(async () => {
  const browser = await launch();
  const ap = await newPage(browser, { width: 1440, height: 640, artboard: true });
  await ap.goto('http://localhost:4100/12-Footer-D.dc.html', { waitUntil: 'networkidle' }); await settle(ap, 1500);
  const a = PNG.sync.read(await ap.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 640 } }));
  await ap.context().close();
  const variants = {
    asis: '',
    nocontain: 'footer { container-type: normal !important; --u: 1px !important; }',
    nooverflow: 'footer { overflow: visible !important; }',
    both: 'footer { container-type: normal !important; --u: 1px !important; overflow: visible !important; }',
    nofixedheader: 'header { position: absolute !important; }',
    nosmoothing: 'body { -webkit-font-smoothing: auto !important; }',
  };
  for (const [name, css] of Object.entries(variants)) {
    const rp = await newPage(browser, { width: 1440, height: 900 });
    await rp.goto('http://localhost:4200/about', { waitUntil: 'networkidle' });
    if (css) await rp.addStyleTag({ content: css });
    await rp.addStyleTag({ content: 'body { padding-bottom: 200px !important; }' });
    await settle(rp, 1500);
    const top = await rp.evaluate(() => document.querySelector('footer').getBoundingClientRect().top + window.scrollY);
    const r = PNG.sync.read(await rp.screenshot({ fullPage: true, clip: { x: 0, y: top, width: 1440, height: 640 } }));
    const diff = new PNG({ width: 1440, height: 640 });
    const n = pixelmatch(a.data, r.data, diff.data, 1440, 640, { threshold: 0.12, includeAA: true });
    console.log(name.padEnd(14), (n / (1440 * 640) * 100).toFixed(3) + '%', 'footer top', top);
    await rp.context().close();
  }
  await browser.close();
})();
