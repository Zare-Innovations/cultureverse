const { launch, newPage, settle } = require('./shot');
(async () => {
  const [url, w, h, sel] = process.argv.slice(2);
  const browser = await launch();
  const page = await newPage(browser, { width: +w, height: +h, artboard: url.includes('4100') });
  page.on('console', (m) => console.log('console:', m.text().slice(0, 200)));
  page.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0, 300)));
  await page.goto(url, { waitUntil: 'networkidle' });
  await settle(page);
  const rows = await page.evaluate((sel) => Array.from(document.querySelectorAll(sel)).map((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return [el.tagName.toLowerCase() + '.' + String(el.className).replace(/\s+/g, '.').slice(0, 40), Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height), 'op=' + cs.opacity, 'anim=' + cs.animationName, 'vis=' + cs.visibility, 'disp=' + cs.display, 'z=' + cs.zIndex, 'clip=' + cs.clipPath.slice(0, 30)].join('  ');
  }), sel);
  console.log(rows.join('\n'));
  await browser.close();
})();
