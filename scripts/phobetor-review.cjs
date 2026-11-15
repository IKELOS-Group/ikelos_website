// Focused production-preview review; uses the existing QA browser installation.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
const output = path.resolve(process.env.REVIEW_OUTPUT || 'validation/phobetor');
const product = '/products/phobetor';
const legacy = '/capabilities/firmware-emulation';
const legacyHashes = ['research-capability', 'evidence-workflow', 'system-integration', 'engagement-applications', 'research-deliverables'];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--disable-gpu'] });
  const page = await browser.newPage();
  const views = [], errors = [], external = new Set(), links = new Set(), redirects = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (request.url().startsWith('http') && new URL(request.url()).origin !== base) external.add(request.url()); });
  const visit = async route => {
    await page.goto(base + route);
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
  };
  try {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      for (const route of [product, '/', '/products', '/practices/exquisite-access-development', '/products/veiltrace']) {
        await visit(route);
        if (route === '/') await page.waitForTimeout(1600);
        assert.equal(await page.locator('h1').count(), 1);
        assert.doesNotMatch(await page.locator('body').innerText(), /monkeysploit|monkeyforge/i);
        assert.doesNotMatch(await page.locator('head').innerHTML(), /monkeysploit|monkeyforge/i);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} at ${width}: overflow`);
        const metadata = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]').content, ogTitle: document.querySelector('meta[property="og:title"]').content, ogDescription: document.querySelector('meta[property="og:description"]').content }));
        assert.equal(metadata.title, metadata.ogTitle);
        assert.equal(metadata.description, metadata.ogDescription);
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const axe = await page.evaluate(async () => {
          const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
          return { violations: result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incomplete: result.incomplete.map(v => v.id) };
        });
        assert.deepEqual(axe.violations, [], `${route} at ${width}: accessibility`);
        views.push({ route, width, overflow: false, metadata, axe });
        for (const href of await page.locator('a[href]').evaluateAll(items => items.map(item => item.getAttribute('href')))) if (href.startsWith('/')) links.add(href);
        if (route === product && [390, 1440].includes(width)) {
          await page.screenshot({ path: `${output}/phobetor-${width}.png` });
          await page.locator('#funded-research').screenshot({ path: `${output}/funded-research-${width}.png`, style: '.site-header,.skip-link{visibility:hidden!important}' });
        }
      }
      await visit(product);
      const tabs = page.getByRole('tab');
      assert.equal(await tabs.count(), 8);
      for (let i = 0; i < 8; i++) {
        await tabs.nth(i).click();
        assert.equal(await tabs.nth(i).getAttribute('aria-selected'), 'true');
        assert.equal(await page.getByRole('tabpanel').getAttribute('aria-labelledby'), `firmware-step-${i}`);
      }
      await tabs.first().focus();
      await page.keyboard.press('ArrowLeft');
      assert(await tabs.last().evaluate(el => el === document.activeElement));
      await page.keyboard.press('Tab');
      assert(await page.getByRole('tabpanel').evaluate(el => el === document.activeElement));
      for (const [route, hashes] of [[legacy, legacyHashes], [product, ['research-basis', 'funded-research', 'rtos-research', 'protocol-research']]]) {
        for (const hash of hashes) {
          await visit(`${route}?ref=firmware#${hash}`);
          await page.waitForURL(`${base}${product}?ref=firmware#${hash}`);
          const geometry = await page.evaluate(id => ({ top: document.getElementById(id).getBoundingClientRect().top, header: document.querySelector('header').getBoundingClientRect().bottom }), hash);
          assert(geometry.top >= geometry.header - 1, `${width} #${hash}: obscured anchor ${JSON.stringify(geometry)}`);
          redirects.push({ from: route, hash, width, destination: page.url() });
        }
      }
      await visit(`${legacy}/?ref=firmware#evidence-workflow`);
      await page.waitForURL(`${base}${product}?ref=firmware#evidence-workflow`);
      await page.locator('main').getByRole('link', { name: /Discuss a research engagement/ }).first().click();
      await page.waitForURL(`${base}/contact?practice=phobetor`);
      assert.equal(await page.getByLabel('Research interest').inputValue(), 'phobetor');
      assert(await page.locator('main').evaluate(el => el === document.activeElement));
      console.log(`PHOBETOR reviewed at ${width}px`);
    }
    for (const href of links) {
      const url = new URL(href, base);
      if (path.extname(url.pathname)) { assert.equal((await page.request.get(url.href)).status(), 200); continue; }
      await visit(href);
      assert.equal(await page.getByRole('heading', { name: 'Page not found', exact: true }).count(), 0, href);
      if (url.hash) assert.equal(await page.locator(url.hash).count(), 1, href);
    }
    assert.deepEqual(errors, []);
    assert.deepEqual([...external], []);
    fs.writeFileSync(`${output}/results.json`, JSON.stringify({ browser: browser.version(), views, redirects, checkedLinks: [...links], checks: ['Eight-stage workflow and keyboard navigation', 'Canonical and legacy anchors clear the header', 'Legacy query and hash preservation, including trailing slash', 'PHOBETOR engagement context and route focus', 'Public branding and metadata', 'Internal links', 'No runtime errors or external requests'], errors, external: [...external] }, null, 2));
    console.log(JSON.stringify({ views: views.length, deepLinks: redirects.length, links: links.size, errors }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
