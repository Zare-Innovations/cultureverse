// Form checks: JSON POST body, success state, honeypot, native validation, error state without an endpoint.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const out = [];
  const check = (n, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${n}${extra ? '  (' + extra + ')' : ''}`);
  const ENDPOINT = 'https://forms.example.test/submit';

  const run = async (width, route, fill, expectForm, expectText, formSel) => {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const posts = [];
    await page.route(ENDPOINT, (r) => { posts.push(JSON.parse(r.request().postData() || '{}')); r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.goto(`http://localhost:4202${route}`, { waitUntil: 'networkidle' });
    const scope = width >= 1024 ? '.only-d' : '.only-m';
    const form = page.locator(`main ${scope} ${formSel}`).first();
    await fill(form);
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(500);
    const text = await form.innerText();
    const body = posts[0] || {};
    check(`${route} @${width} posts JSON with form=${expectForm}`, posts.length === 1 && body.form === expectForm && !('website' in body), JSON.stringify(body));
    check(`${route} @${width} shows success state`, text.includes(expectText), text.replace(/\s+/g, ' ').slice(0, 70));
    await ctx.close();
  };

  await run(1440, '/tap-in', async (f) => { await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com'); }, 'tap-in', "You're in.", 'form');
  await run(390, '/tap-in', async (f) => { await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com'); }, 'tap-in', "You're in.", 'form');
  await run(1440, '/exchnge', async (f) => { await f.locator('input[name=name]').fill('Ava Lee'); await f.locator('input[name=email]').fill('ava@example.com'); await f.locator('input[name=company]').fill('Zare'); }, 'exchnge', 'Request received', 'form');
  await run(390, '/exchnge', async (f) => { await f.locator('input[name=name]').fill('Ava Lee'); await f.locator('input[name=email]').fill('ava@example.com'); }, 'exchnge', 'Request received', 'form');
  await run(1440, '/biggive', async (f) => { await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com'); await f.locator('button', { hasText: 'With friends' }).click(); }, 'biggive', "You're in for Saturday", 'form');
  await run(390, '/biggive', async (f) => { await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com'); }, 'biggive', "You're in for Saturday", 'form');
  await run(1440, '/iconhonors', async (f) => { await f.locator('input[name=email]').fill('ava@example.com'); }, 'iconhonors', 'You will hear it here first.', 'form');
  await run(390, '/iconhonors', async (f) => { await f.locator('input[name=email]').fill('ava@example.com'); }, 'iconhonors', 'You will hear it here first.', 'form');

  // Big Give body carries the chosen group; the desktop success copy names it.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); const posts = [];
    await page.route(ENDPOINT, (r) => { posts.push(JSON.parse(r.request().postData())); r.fulfill({ status: 200, body: '{}' }); });
    await page.goto('http://localhost:4202/biggive', { waitUntil: 'networkidle' });
    const f = page.locator('main .only-d form');
    await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com');
    await f.locator('button', { hasText: 'With my organization' }).click();
    await f.locator('button[type=submit]').click(); await page.waitForTimeout(400);
    check('biggive comingAs in body and success copy', posts[0]?.comingAs === 'org' && (await f.innerText()).includes('Signed up with your organization'), JSON.stringify(posts[0]));
    await ctx.close();
  }
  // Honeypot: filled hidden field means nothing is sent but the success state shows.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); let posts = 0;
    await page.route(ENDPOINT, (r) => { posts++; r.fulfill({ status: 200, body: '{}' }); });
    await page.goto('http://localhost:4202/tap-in', { waitUntil: 'networkidle' });
    const f = page.locator('main form');
    await f.locator('input[name=firstName]').fill('Bot'); await f.locator('input[name=lastName]').fill('Bot'); await f.locator('input[name=email]').fill('bot@example.com');
    await page.evaluate(() => { document.querySelector('main form input[name=website]').value = 'http://spam'; });
    await f.locator('button[type=submit]').click(); await page.waitForTimeout(400);
    check('honeypot suppresses the POST', posts === 0 && (await f.innerText()).includes("You're in."), `posts=${posts}`);
    await ctx.close();
  }
  // Native validation blocks an empty submit.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); let posts = 0;
    await page.route(ENDPOINT, (r) => { posts++; r.fulfill({ status: 200, body: '{}' }); });
    await page.goto('http://localhost:4202/tap-in', { waitUntil: 'networkidle' });
    const f = page.locator('main form');
    await f.locator('button[type=submit]').click(); await page.waitForTimeout(300);
    const invalid = await page.evaluate(() => document.querySelector('main form input[name=firstName]').matches(':invalid') && document.activeElement?.getAttribute('name') === 'firstName');
    check('required fields block submit and focus the first empty field', posts === 0 && invalid && (await f.innerText()).includes('Tap In'));
    await ctx.close();
  }
  // Without NEXT_PUBLIC_FORM_ENDPOINT (the :4200 build) the form reports an error instead of a false success.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:4200/tap-in', { waitUntil: 'networkidle' });
    const f = page.locator('main form');
    await f.locator('input[name=firstName]').fill('Ava'); await f.locator('input[name=lastName]').fill('Lee'); await f.locator('input[name=email]').fill('ava@example.com');
    await f.locator('button[type=submit]').click(); await page.waitForTimeout(400);
    const t = await f.innerText();
    check('missing endpoint shows the error line, not success', t.includes('Something went wrong') && !t.includes("You're in."));
    await ctx.close();
  }
  await browser.close();
  console.log(out.join('\n'));
  console.log(`\n${out.filter((r) => r.startsWith('PASS')).length}/${out.length} form checks passed`);
})().catch((e) => { console.error(e); process.exit(1); });
