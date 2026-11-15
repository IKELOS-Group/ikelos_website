// Run against a local production SPA preview. Reuses environment-provided browsers.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const output = process.env.REVIEW_OUTPUT || path.resolve('validation/firmware-emulation');
const route = '/capabilities/firmware-emulation';
const hashes = ['research-capability', 'evidence-workflow', 'system-integration', 'engagement-applications', 'research-deliverables'];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--disable-gpu'] });
  const page = await browser.newPage();
  const errors = [], results = [], requests = new Set();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (request.url().startsWith('http') && new URL(request.url()).origin !== root) requests.add(request.url()); });
  async function visit(destination) {
    let response = await page.goto(root + destination);
    // Hash-only navigation has no response; reload to verify direct server entry.
    if (!response) response = await page.reload();
    assert.equal(response.status(), 200);
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
  }
  async function audit(label) {
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${label}: overflow`);
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    const axe = await page.evaluate(async () => {
      const report = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
      return { violations: report.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incomplete: report.incomplete.map(v => v.id) };
    });
    assert.deepEqual(axe.violations, [], `${label}: accessibility`);
    results.push({ label, overflow: false, axe });
  }
  const shot = async (locator, filename) => locator.screenshot({ path: `${output}/${filename}.png`, style: '.site-header,.skip-link{visibility:hidden!important}' });
  try {
    if (process.argv.includes('--contrast-review')) {
      const review = [];
      for (const width of [375, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await visit(route);
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const incomplete = await page.evaluate(async () => {
          const report = await window.axe.run(document, { runOnly: ['color-contrast'] });
          return report.incomplete.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary, checks: n.any.map(check => ({ message: check.message, data: check.data })) })) }));
        });
        review.push({ width, incomplete });
      }
      fs.writeFileSync(`${output}/contrast-review.json`, JSON.stringify(review, null, 2));
      console.log(JSON.stringify(review, null, 2));
      return;
    }
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 1000 });
      await visit(route);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.title(), 'Firmware Vulnerability Research & System Emulation — IKELOS Group');
      const fonts = await page.evaluate(() => ({ inter: document.fonts.check('16px Inter'), orbitron: document.fonts.check('16px Orbitron') }));
      assert.deepEqual(fonts, { inter: true, orbitron: true });
      await audit(`capability-${width}`);
      await page.screenshot({ path: `${output}/firmware-${width}-viewport.png` });
      await page.screenshot({ path: `${output}/firmware-${width}.png`, fullPage: true });
      const tabs = page.getByRole('tab');
      assert.equal(await tabs.count(), 8);
      for (let i = 0; i < 8; i++) {
        await tabs.nth(i).click();
        assert.equal(await tabs.nth(i).getAttribute('aria-selected'), 'true');
        const panel = page.getByRole('tabpanel');
        assert.equal(await panel.getAttribute('aria-labelledby'), `firmware-step-${i}`);
        assert(await panel.getByText('Boundary of the claim').isVisible());
        assert.equal(await page.locator('[role="tab"][tabindex="0"]').count(), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      await tabs.nth(0).focus();
      for (const [key, index] of [['ArrowRight', 1], ['ArrowDown', 2], ['ArrowUp', 1], ['ArrowLeft', 0], ['ArrowLeft', 7], ['Home', 0], ['End', 7], ['ArrowRight', 0]]) {
        await page.keyboard.press(key);
        assert(await tabs.nth(index).evaluate(el => el === document.activeElement));
        assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
      }
      await page.keyboard.press('Tab');
      assert(await page.getByRole('tabpanel').evaluate(el => el === document.activeElement));
      await page.keyboard.press('Shift+Tab');
      assert(await tabs.nth(0).evaluate(el => el === document.activeElement));
      assert.equal(await tabs.nth(0).evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
      await shot(page.locator('.fe-workbench'), `workflow-${width}`);
      await tabs.nth(6).click();
      await audit(`observed-evidence-${width}`);
      if ([375, 1440].includes(width)) {
        await shot(page.locator('.fe-workbench'), `observed-evidence-${width}`);
        await shot(page.locator('#system-integration'), `system-integration-${width}`);
      }
      for (const hash of hashes) {
        await visit(`${route}#${hash}`);
        const geometry = await page.evaluate(id => ({ top: document.getElementById(id).getBoundingClientRect().top, header: document.querySelector('header').getBoundingClientRect().bottom }), hash);
        assert(geometry.top >= geometry.header - 1, `${width} #${hash}: obscured anchor ${JSON.stringify(geometry)}`);
      }
      await page.getByRole('link', { name: 'Discuss a Research Engagement' }).click();
      await page.waitForURL(root + '/contact');
      await page.waitForFunction(() => document.activeElement?.id === 'main-content');
      for (const destination of ['/', '/services', '/about', '/contact']) {
        await visit(destination);
        const skip = page.getByRole('button', { name: 'Skip animation' });
        if (await skip.count()) await skip.click();
        await audit(`${destination === '/' ? 'home' : destination.slice(1)}-${width}`);
      }
      await visit('/');
      await shot(page.locator('.fe-spotlight'), `spotlight-${width}`);
      await page.getByRole('link', { name: 'Explore firmware research & emulation' }).click();
      await page.waitForURL(root + route);
      await page.waitForFunction(() => document.activeElement?.id === 'main-content');
      await page.getByRole('link', { name: 'Explore the broader research methodology' }).click();
      await page.waitForURL(root + '/#research-methodology');
      await page.getByRole('navigation', { name: 'Research workflow' }).waitFor();
      assert.equal(await page.getByRole('navigation', { name: 'Research workflow' }).getByRole('button').count(), 6);
      await visit('/services');
      for (const name of ['Explore firmware discovery and validation', 'Explore controlled execution and system emulation']) {
        await page.getByRole('link', { name }).click();
        await page.waitForURL(root + route);
        await page.goBack();
        await page.waitForURL(root + '/services');
      }
      await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: 'Firmware & emulation' }).click();
      await page.waitForURL(root + route);
      if (width < 768) {
        await page.getByRole('button', { name: 'Menu' }).click();
        const dialog = page.getByRole('dialog');
        assert(await dialog.getByRole('button', { name: 'Close' }).evaluate(el => el === document.activeElement));
        await page.keyboard.press('Shift+Tab');
        assert(await dialog.getByRole('link', { name: 'info@ikelosgroup.com' }).evaluate(el => el === document.activeElement));
        await page.keyboard.press('Escape');
        assert(await page.getByRole('button', { name: 'Menu' }).evaluate(el => el === document.activeElement));
      }
    }
    await page.setViewportSize({ width: 375, height: 812 });
    await visit(route);
    await page.keyboard.press('Tab');
    assert(await page.getByRole('link', { name: 'Skip to content' }).evaluate(el => el === document.activeElement));
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement?.id === 'main-content');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await visit(route + '#evidence-workflow');
    await page.getByRole('tab').first().focus();
    await page.keyboard.press('End');
    assert.equal(await page.getByRole('tab').last().getAttribute('aria-selected'), 'true');
    const motion = await page.locator('.fe-flow-node').first().evaluate(el => ({ animation: getComputedStyle(el).animationName, transition: getComputedStyle(el).transitionDuration }));
    assert.deepEqual(motion, { animation: 'none', transition: '0s' });
    await shot(page.locator('.fe-workbench'), 'reduced-motion-375');
    assert.deepEqual(errors, []);
    assert.deepEqual([...requests], []);
    fs.writeFileSync(`${output}/results.json`, JSON.stringify({ browser: 'Chromium', results, motion, errors, externalRequests: [...requests], interactions: 'All eight stages, arrows, wraparound, Home/End, tab panel focus, visible focus, 20 direct hashes, route focus, CTA, home/services/footer links, browser back, methodology link, mobile menu, skip link, reduced motion passed.' }, null, 2));
    console.log(`Passed ${results.length} layout/accessibility checks plus workflow, navigation, focus, deep-link, and reduced-motion checks. No browser errors or external requests.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
