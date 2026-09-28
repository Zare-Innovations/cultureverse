// Behavior checks against the exported site on :4200 (no frozen time here).
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const results = [];
  const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  (' + extra + ')' : ''}`);

  // 1. Countdown ticks every second (desktop hero seconds, nav compact readout, mobile minutes).
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  let page = await ctx.newPage();
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle' });
  const secSel = 'main .only-d [role="timer"] span.d:nth-of-type(1)';
  const s1 = await page.evaluate(() => Array.from(document.querySelectorAll('main .only-d [role="timer"] .d')).map((e) => e.textContent).join(':'));
  await page.waitForTimeout(2200);
  const s2 = await page.evaluate(() => Array.from(document.querySelectorAll('main .only-d [role="timer"] .d')).map((e) => e.textContent).join(':'));
  check('countdown ticks', s1 !== s2, `${s1} -> ${s2}`);
  const target = await page.evaluate(() => { const t = document.querySelector('main .only-d [role="timer"]'); return t && t.getAttribute('aria-label'); });
  check('timer has aria-label', target === 'Time until opening night', target);

  // 2. Hero stones: label follows hover and focus; stones link to world pages.
  const before = await page.evaluate(() => document.querySelector('main .only-d .hud[class*="label"]')?.textContent);
  // Hover a stone other than the resting one, so this asserts the label follows the pointer
  // without hardcoding which stone rests.
  await page.hover('main .only-d a[href="/culturelive"]');
  await page.waitForTimeout(200);
  const afterHover = await page.evaluate(() => document.querySelector('main .only-d .hud[class*="label"]')?.textContent);
  check('stone label changes on hover', !!before && !before.includes('CultureLive') && !!afterHover?.includes('CultureLive'), `${before} -> ${afterHover}`);
  await page.focus('main .only-d a[href="/biggive"]');
  await page.waitForTimeout(200);
  const afterFocus = await page.evaluate(() => document.querySelector('main .only-d .hud[class*="label"]')?.textContent);
  check('stone label changes on focus', afterFocus?.includes('BIG GIVE'), afterFocus);
  const hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('main .only-d a.door')).map((a) => a.getAttribute('href')));
  check('stones link to world pages', JSON.stringify(hrefs) === JSON.stringify(['/culturegames', '/iconhonors', '/culturecoming', '/exchnge', '/culturelive', '/cultureexpo', '/biggive']), hrefs.join(','));

  // 3. Parallax responds to the cursor.
  await page.mouse.move(1400, 100);
  await page.waitForTimeout(100);
  const mx = await page.evaluate(() => document.querySelector('main .only-d').style.getPropertyValue('--mx'));
  check('parallax sets --mx', mx !== '' && Math.abs(parseFloat(mx)) > 0.3, mx);

  // 4. Compact nav after scroll: countdown readout and Tap in appear; dropdown opens on hover and focus, closes on Escape.
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(300);
  const compact = await page.evaluate(() => ({ h: document.querySelector('header nav').getBoundingClientRect().height, tap: getComputedStyle(document.querySelector('header a[href="/tap-in"]')).display, cd: document.querySelector('header .hud span')?.textContent }));
  check('compact nav at scroll', Math.round(compact.h) === 60 && compact.tap !== 'none' && /\d\dD \d\dH/.test(compact.cd || ''), JSON.stringify(compact));
  await page.hover('header a[aria-controls="cultureverse-menu"]');
  await page.waitForTimeout(300);
  let dd = await page.evaluate(() => !document.getElementById('cultureverse-menu').hidden);
  check('dropdown opens on hover', dd);
  await page.mouse.move(700, 600);
  await page.waitForTimeout(400);
  dd = await page.evaluate(() => !document.getElementById('cultureverse-menu').hidden);
  check('dropdown closes on mouse leave', !dd);
  await page.focus('header a[aria-controls="cultureverse-menu"]');
  await page.waitForTimeout(100);
  dd = await page.evaluate(() => !document.getElementById('cultureverse-menu').hidden);
  check('dropdown opens on focus', dd);
  await page.keyboard.press('Escape');
  dd = await page.evaluate(() => !document.getElementById('cultureverse-menu').hidden);
  check('dropdown closes on Escape', !dd);

  // 5. Ticket links.
  const tickets = await page.evaluate(() => Array.from(document.querySelectorAll('a')).filter((a) => /tickets?$/i.test(a.textContent.trim())).map((a) => [a.getAttribute('href'), a.getAttribute('target'), a.getAttribute('rel')]));
  check('every ticket link opens Ticketmaster in a new tab', tickets.length > 0 && tickets.every(([h, t, r]) => h === 'https://www.ticketmaster.com/[CULTUREBOWL EVENT URL]' && t === '_blank' && r === 'noopener'), `${tickets.length} links`);
  await ctx.close();

  // 6. Reduced motion: no load animations, no parallax.
  ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page = await ctx.newPage();
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle' });
  const anim = await page.evaluate(() => Array.from(document.querySelectorAll('main .only-d .a-assemble, main .only-d .a-lock, main .only-d .a-wipe')).map((e) => getComputedStyle(e).animationName));
  check('reduced motion disables the sequence', anim.every((a) => a === 'none'), anim.join(','));
  await page.mouse.move(1400, 100);
  await page.waitForTimeout(100);
  const mx2 = await page.evaluate(() => document.querySelector('main .only-d').style.getPropertyValue('--mx'));
  check('reduced motion disables parallax', mx2 === '', JSON.stringify(mx2));
  await ctx.close();

  // 7. Mobile: ticket bar fixed at the bottom on every page; menu opens, traps focus, closes with Escape and restores focus.
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  page = await ctx.newPage();
  for (const route of ['/', '/about', '/cultureverse', '/culturelive', '/cultureexpo', '/exchnge', '/biggive', '/iconhonors', '/cultureunion', '/culturecoming', '/culturegames', '/tap-in']) {
    await page.goto(`http://localhost:4200${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(100);
    const bar = await page.evaluate(() => { const b = document.querySelector('[class*="TicketBar_bar"]'); const r = b.getBoundingClientRect(); return [getComputedStyle(b).position, Math.round(r.bottom), Math.round(r.height)]; });
    check(`ticket bar pinned on ${route}`, bar[0] === 'fixed' && bar[1] === 844 && bar[2] === 96, bar.join(','));
  }
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle' });
  await page.click('button[aria-label="Open menu"]');
  await page.waitForTimeout(200);
  const focused1 = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  check('menu opens with focus on close button', focused1 === 'Close menu', focused1);
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
  check('menu locks body scroll', bodyOverflow === 'hidden');
  // Tab forward through all items and confirm focus stays inside the dialog.
  let inside = true;
  for (let i = 0; i < 25; i++) { await page.keyboard.press('Tab'); inside = inside && (await page.evaluate(() => !!document.activeElement.closest('#mobile-menu'))); }
  check('Tab keeps focus inside the menu', inside);
  await page.keyboard.press('Shift+Tab');
  const wrapped = await page.evaluate(() => !!document.activeElement.closest('#mobile-menu'));
  check('Shift+Tab keeps focus inside the menu', wrapped);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  const closed = await page.evaluate(() => !document.getElementById('mobile-menu'));
  const focused2 = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  check('Escape closes the menu and restores focus', closed && focused2 === 'Open menu', focused2);
  // Mobile stones toggle the label link.
  await page.waitForTimeout(2300);
  const curBefore = await page.evaluate(() => document.querySelector('main .only-m a[class*="curLabel"]')?.getAttribute('href'));
  await page.click('main .only-m button[aria-label^="ICON HONORS"]');
  const curAfter = await page.evaluate(() => document.querySelector('main .only-m a[class*="curLabel"]')?.getAttribute('href'));
  check('mobile stone tap switches the label link', curBefore === '/culturelive' && curAfter === '/iconhonors', `${curBefore} -> ${curAfter}`);
  await ctx.close();

  // 8. Metadata on every route.
  ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await ctx.newPage();
  for (const route of ['/', '/about', '/cultureverse', '/culturelive', '/cultureexpo', '/exchnge', '/biggive', '/iconhonors', '/cultureunion', '/culturecoming', '/culturegames', '/tap-in']) {
    await page.goto(`http://localhost:4200${route}`, { waitUntil: 'domcontentloaded' });
    const meta = await page.evaluate(() => ({ title: document.title, desc: document.querySelector('meta[name="description"]')?.content, og: document.querySelector('meta[property="og:image"]')?.content, h1: document.querySelectorAll('h1').length }));
    check(`metadata ${route}`, /— All Things CultureBowl™$/.test(meta.title) && !!meta.desc && /og-image\.png$/.test(meta.og || ''), `${meta.title} | h1s=${meta.h1}`);
  }
  await ctx.close();
  await browser.close();
  console.log(results.join('\n'));
  const fails = results.filter((r) => r.startsWith('FAIL')).length;
  console.log(`\n${results.length - fails}/${results.length} checks passed`);
})().catch((e) => { console.error(e); process.exit(1); });
