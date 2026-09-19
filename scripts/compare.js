/*
 * Pixel comparison of every artboard against its route.
 * Usage: node scripts/compare.js [filter]   (filter matches the comparison id)
 * Requires the design folder on :4100 and the exported site on :4200.
 * Writes <id>-a.png (artboard), <id>-r.png (route), <id>-diff.png and <id>-sbs.png (side by side)
 * into $SCRATCH/compare and prints the mismatch ratio per comparison.
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pm = require('pixelmatch');
const pixelmatch = typeof pm === 'function' ? pm : pm.default;
const { launch, newPage, settle, SCRATCH } = require('./shot');

const OUT = path.join(SCRATCH, 'compare');
fs.mkdirSync(OUT, { recursive: true });

// id, artboard file, board clip [x,y,w,h], route, route anchor selector (clip starts at its top) or number, viewport width, extra route options
const M = [
  { id: 'nav-rest', board: '00-Nav-States-D.dc.html', bw: 1440, bh: 760, clip: [0, 60, 1440, 72], route: '/about', anchor: 0, w: 1440, h: 72, dim: 'd' },
  { id: 'nav-compact', board: '00-Nav-States-D.dc.html', bw: 1440, bh: 760, clip: [0, 200, 1440, 60], route: '/about', anchor: 0, w: 1440, h: 60, dim: 'd', scroll: 400, fixedTop: true },
  { id: 'nav-dd', board: '00-Nav-States-D.dc.html', bw: 1440, bh: 760, clip: [0, 324, 1440, 420], route: '/about', anchor: 0, w: 1440, h: 420, dim: 'd', dd: true },
  { id: 'home-d', board: 'Main.dc.html', bw: 1440, bh: 900, route: '/', anchor: 0, w: 1440, h: 900, dim: 'd' },
  { id: 'home-m', board: '01-Home-M.dc.html', bw: 390, bh: 844, route: '/', anchor: 0, w: 390, h: 844, dim: 'm' },
  { id: 'menu-m', board: '01-Home-Menu-M.dc.html', bw: 390, bh: 844, route: '/', anchor: 0, w: 390, h: 844, dim: 'm', menu: true, fixedTop: true },
  { id: 'announced-d', board: '02-Home-Announced-D.dc.html', bw: 1440, bh: 900, route: '/', anchor: 0, w: 1440, h: 900, dim: 'd', announced: true },
  { id: 'about-d', board: '03-About-D.dc.html', bw: 1440, bh: 1100, route: '/about', anchor: 'main', w: 1440, h: 1100, dim: 'd' },
  { id: 'about-m', board: '03-About-M.dc.html', bw: 390, bh: 1300, route: '/about', anchor: 'main', w: 390, h: 1300, dim: 'm' },
  { id: 'cultureverse-d', board: '04-Cultureverse-D.dc.html', bw: 1440, bh: 1300, route: '/cultureverse', anchor: 'main', w: 1440, h: 1300, dim: 'd' },
  { id: 'cultureverse-m', board: '04-Cultureverse-M.dc.html', bw: 390, bh: 1800, route: '/cultureverse', anchor: 'main', w: 390, h: 1800, dim: 'm' },
  { id: 'culturelive-d', board: '05-CultureLive-D.dc.html', bw: 1440, bh: 1260, route: '/culturelive', anchor: 'main', w: 1440, h: 1260, dim: 'd' },
  { id: 'culturelive-m', board: '05-CultureLive-M.dc.html', bw: 390, bh: 1360, route: '/culturelive', anchor: 'main', w: 390, h: 1360, dim: 'm' },
  { id: 'cultureexpo-d', board: '06-CultureExpo-D.dc.html', bw: 1440, bh: 1180, route: '/cultureexpo', anchor: 'main', w: 1440, h: 1180, dim: 'd' },
  { id: 'cultureexpo-m', board: '06-CultureExpo-M.dc.html', bw: 390, bh: 1160, route: '/cultureexpo', anchor: 'main', w: 390, h: 1160, dim: 'm' },
  { id: 'exchnge-d', board: '07-EXCHNGE-D.dc.html', bw: 1440, bh: 980, route: '/exchnge', anchor: 'main', w: 1440, h: 980, dim: 'd' },
  { id: 'exchnge-m', board: '07-EXCHNGE-M.dc.html', bw: 390, bh: 1330, route: '/exchnge', anchor: 'main', w: 390, h: 1330, dim: 'm' },
  { id: 'biggive-d', board: '08-BigGive-D.dc.html', bw: 1440, bh: 980, route: '/biggive', anchor: 'main', w: 1440, h: 980, dim: 'd' },
  { id: 'biggive-m', board: '08-BigGive-M.dc.html', bw: 390, bh: 1400, route: '/biggive', anchor: 'main', w: 390, h: 1400, dim: 'm' },
  { id: 'iconhonors-d', board: '09-IconHonors-D.dc.html', bw: 1440, bh: 1580, route: '/iconhonors', anchor: 'main', w: 1440, h: 1580, dim: 'd' },
  { id: 'iconhonors-m', board: '09-IconHonors-M.dc.html', bw: 390, bh: 1920, route: '/iconhonors', anchor: 'main', w: 390, h: 1920, dim: 'm' },
  { id: 'reunion-d', board: '10-ComingWorlds-D.dc.html', bw: 1440, bh: 900, route: '/cultureunion', anchor: 'main', w: 1440, h: 900, dim: 'd', world: 'reunion' },
  { id: 'reunion-m', board: '10-ComingWorlds-M.dc.html', bw: 390, bh: 1000, route: '/cultureunion', anchor: 'main', w: 390, h: 1000, dim: 'm', world: 'reunion' },
  { id: 'coming-d', board: '10-ComingWorlds-D.dc.html', bw: 1440, bh: 900, route: '/culturecoming', anchor: 'main', w: 1440, h: 900, dim: 'd', world: 'coming' },
  { id: 'coming-m', board: '10-ComingWorlds-M.dc.html', bw: 390, bh: 1000, route: '/culturecoming', anchor: 'main', w: 390, h: 1000, dim: 'm', world: 'coming' },
  { id: 'games-d', board: '10-ComingWorlds-D.dc.html', bw: 1440, bh: 900, route: '/culturegames', anchor: 'main', w: 1440, h: 900, dim: 'd', world: 'games' },
  { id: 'games-m', board: '10-ComingWorlds-M.dc.html', bw: 390, bh: 1000, route: '/culturegames', anchor: 'main', w: 390, h: 1000, dim: 'm', world: 'games' },
  { id: 'tapin-d', board: '11-StayTappedIn-D.dc.html', bw: 1440, bh: 820, route: '/tap-in', anchor: 'main', w: 1440, h: 820, dim: 'd' },
  { id: 'tapin-m', board: '11-StayTappedIn-M.dc.html', bw: 390, bh: 900, route: '/tap-in', anchor: 'main', w: 390, h: 900, dim: 'm' },
  { id: 'home-band-d', board: '11-StayTappedIn-D.dc.html', bw: 1440, bh: 820, route: '/', anchor: '#join', w: 1440, h: 820, dim: 'd' },
  { id: 'cv-band-m', board: '11-StayTappedIn-M.dc.html', bw: 390, bh: 900, route: '/cultureverse', anchor: '#join', w: 390, h: 900, dim: 'm' },
  { id: 'footer-d', board: '12-Footer-D.dc.html', bw: 1440, bh: 640, route: '/about', anchor: 'footer', w: 1440, h: 640, dim: 'd' },
  { id: 'footer-m', board: '12-Footer-M.dc.html', bw: 390, bh: 1000, route: '/about', anchor: 'footer', w: 390, h: 1000, dim: 'm' },
];

function sbs(a, r, d) {
  const out = new PNG({ width: a.width * 3 + 20, height: a.height });
  out.data.fill(80);
  for (const [img, ox] of [[a, 0], [r, a.width + 10], [d, a.width * 2 + 20]]) {
    for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4, o = (y * out.width + x + ox) * 4;
      out.data[o] = img.data[i]; out.data[o + 1] = img.data[i + 1]; out.data[o + 2] = img.data[i + 2]; out.data[o + 3] = 255;
    }
  }
  return out;
}

(async () => {
  const filter = process.argv[2];
  const list = M.filter((m) => !filter || m.id.includes(filter));
  const browser = await launch();
  const results = [];
  for (const m of list) {
    // Artboard
    const ap = await newPage(browser, { width: m.bw, height: m.bh, artboard: true });
    if (m.world) await ap.addInitScript((wk) => { window.__DC_PROPS = { world: wk }; }, m.world);
    await ap.goto(`http://localhost:4100/${m.board}`, { waitUntil: 'networkidle' });
    await settle(ap);
    const clip = m.clip ? { x: m.clip[0], y: m.clip[1], width: m.clip[2], height: m.clip[3] } : { x: 0, y: 0, width: m.bw, height: m.bh };
    const aBuf = await ap.screenshot({ clip });
    await ap.context().close();

    // Route
    const viewportShot = m.fixedTop || m.anchor === 0;
    const rp = await newPage(browser, { width: m.w, height: viewportShot ? m.h : Math.max(m.h, 900) });
    await rp.addInitScript(() => { document.documentElement.classList.add('is-capture'); });
    await rp.goto(`http://localhost:${m.announced ? 4201 : 4200}${m.route}`, { waitUntil: 'networkidle' });
    if (m.scroll) { await rp.evaluate((y) => window.scrollTo(0, y), m.scroll); await rp.waitForTimeout(300); }
    if (m.menu) { await rp.click('button[aria-label="Open menu"]'); await rp.waitForTimeout(300); }
    if (m.dd) { await rp.hover('a[aria-controls="cultureverse-menu"]'); await rp.waitForTimeout(400); }
    await settle(rp);
    let top = 0;
    if (typeof m.anchor === 'string') top = await rp.evaluate((sel) => { const el = document.querySelector(sel); return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0; }, m.anchor);
    else top = m.anchor;
    // Hide the pinned ticket bar for body comparisons (it sits at the viewport bottom, not in the artboard body).
    if (!m.menu && m.anchor !== 0) await rp.addStyleTag({ content: '[class*="TicketBar"] { display: none !important; }' });
    const rBuf = viewportShot
      ? await rp.screenshot({ clip: { x: 0, y: 0, width: m.w, height: m.h } })
      : await rp.screenshot({ fullPage: true, clip: { x: 0, y: top, width: m.w, height: m.h } });
    await rp.context().close();

    const a = PNG.sync.read(aBuf), r = PNG.sync.read(rBuf);
    const h = Math.min(a.height, r.height), w = Math.min(a.width, r.width);
    const diff = new PNG({ width: w, height: h });
    const n = pixelmatch(a.data, r.data, diff.data, w, h, { threshold: 0.12, includeAA: true, diffColor: [255, 0, 255], alpha: 0.35 });
    const ratio = n / (w * h);
    results.push({ id: m.id, ratio });
    fs.writeFileSync(path.join(OUT, `${m.id}-a.png`), aBuf);
    fs.writeFileSync(path.join(OUT, `${m.id}-r.png`), rBuf);
    fs.writeFileSync(path.join(OUT, `${m.id}-diff.png`), PNG.sync.write(diff));
    fs.writeFileSync(path.join(OUT, `${m.id}-sbs.png`), PNG.sync.write(sbs(a, r, diff)));
    console.log(`${m.id.padEnd(16)} mismatch ${(ratio * 100).toFixed(2)}%  (${w}x${h})`);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
