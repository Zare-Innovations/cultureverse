// Full-page JPEG screenshots of every route at 1440 and 390 for the preview gallery.
const { launch, newPage, settle } = require('./shot');
const path = require('path');
(async () => {
  const out = process.argv[2];
  const routes = [['home', '/'], ['about', '/about'], ['cultureverse', '/cultureverse'], ['culturelive', '/culturelive'], ['cultureexpo', '/cultureexpo'], ['exchnge', '/exchnge'], ['biggive', '/biggive'], ['iconhonors', '/iconhonors'], ['cultureunion', '/cultureunion'], ['culturecoming', '/culturecoming'], ['culturegames', '/culturegames'], ['tap-in', '/tap-in']];
  const browser = await launch();
  const shoot = async (name, url, width, height, opts = {}) => {
    const page = await newPage(browser, { width, height, freeze: false });
    await page.goto(url, { waitUntil: 'networkidle' });
    if (opts.menu) { await page.click('button[aria-label="Open menu"]'); await page.waitForTimeout(300); }
    if (opts.dd) { await page.hover('a[aria-controls="cultureverse-menu"]'); await page.waitForTimeout(400); }
    if (opts.scroll) { await page.evaluate((y) => window.scrollTo(0, y), opts.scroll); await page.waitForTimeout(400); }
    await settle(page, 2400);
    await page.screenshot({ path: path.join(out, name + '.jpg'), type: 'jpeg', quality: 82, fullPage: !opts.viewport });
    await page.context().close();
    console.log('shot', name);
  };
  for (const [name, route] of routes) {
    await shoot(`${name}-1440`, `http://localhost:4200${route}`, 1440, 900);
    await shoot(`${name}-390`, `http://localhost:4200${route}`, 390, 844);
  }
  await shoot('home-announced-1440', 'http://localhost:4201/', 1440, 900);
  await shoot('menu-390', 'http://localhost:4200/', 390, 844, { menu: true, viewport: true });
  await shoot('nav-dropdown-1440', 'http://localhost:4200/about', 1440, 600, { dd: true, viewport: true });
  await shoot('nav-compact-1440', 'http://localhost:4200/cultureverse', 1440, 400, { scroll: 500, viewport: true });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
