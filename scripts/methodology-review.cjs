const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const fs = require('fs');
const assert = require('assert/strict');
const path = require('path');
const output = process.env.REVIEW_OUTPUT || path.resolve('validation/research-methodology');
const root = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE });
  const page = await browser.newPage();
  const errors = [], checks = [], results = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  try {
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 812 : 1000 });
      await page.goto(root); await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#research-methodology');
      const stages = page.getByRole('navigation', { name: 'Research workflow' }).getByRole('button');
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({ path: `${output}/methodology-${width}.png`, style: '.site-header,.skip-link{visibility:hidden!important}' });
      const geometry = await page.locator('.rm-component').evaluateAll(nodes => nodes.map(n => { const r = n.getBoundingClientRect(); return {x:r.x, y:r.y, width:r.width, height:r.height}; }));
      for (let stage = 0; stage < 6; stage++) {
        await stages.nth(stage).click();
        await page.waitForTimeout(450);
        assert.equal(await stages.nth(stage).getAttribute('aria-current'), 'step');
        assert(await section.getByText('Research plan · No test results').isVisible());
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        const sizes = await page.locator('.rm-component').evaluateAll(nodes => nodes.map(n => {const r=n.getBoundingClientRect();return {width:r.width,height:r.height};}));
        assert.deepEqual(sizes,geometry.map(({width,height})=>({width,height})));
        const overlaps = await page.locator('.rm-canvas').evaluate(canvas => {
          const note=canvas.querySelector('.rm-layer-note').getBoundingClientRect();
          return [...canvas.querySelectorAll('.rm-component')].filter(el=>{const r=el.getBoundingClientRect();return note.left<r.right && note.right>r.left && note.top<r.bottom && note.bottom>r.top;}).map(el=>el.getAttribute('aria-label'));
        });
        assert.deepEqual(overlaps,[],`Overlapping diagram annotation at ${width}, stage ${stage+1}`);
        if (stage === 2) await page.locator('.rm-canvas').screenshot({path:`${output}/causal-diagram-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
        if (width === 375 || width === 1440) {
          await page.locator('.rm-workbench').screenshot({ path: `${output}/structure-${stage+1}-${width}.png`, style: '.site-header,.skip-link{visibility:hidden!important}' });
          await page.locator('.rm-analysis').screenshot({ path: `${output}/analysis-${stage+1}-${width}.png`, style: '.site-header,.skip-link{visibility:hidden!important}' });
        }
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const axe = await page.evaluate(async () => {
          const r = await axe.run(document.querySelector('#research-methodology'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
          return { violations: r.violations.map(v => ({ id:v.id, nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})) })), incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})) };
        });
        results.push({width,stage:stage+1,axe});
      }
      for (const name of ['operator station', 'maintenance interface', 'control computer', 'pump drive', 'thermal circuit', 'process sensors']) {
        await page.getByRole('button', {name:`Inspect ${name}`, exact:true}).click();
        assert.equal(await page.getByRole('button', {name:`Inspect ${name}`,exact:true}).getAttribute('aria-pressed'),'true');
        assert.equal(await page.locator('#rm-component-inspector h4').innerText(), name[0].toUpperCase()+name.slice(1));
      }
      await stages.nth(0).focus();await page.keyboard.press('End');assert.equal(await stages.nth(5).getAttribute('aria-current'),'step');
      await page.keyboard.press('ArrowRight');assert.equal(await stages.nth(0).getAttribute('aria-current'),'step');
      await page.keyboard.press('ArrowUp');assert.equal(await stages.nth(5).getAttribute('aria-current'),'step');
      await page.keyboard.press('Home');assert.equal(await stages.nth(0).getAttribute('aria-current'),'step');
      await stages.nth(4).click();
      for(let i=1;i<=4;i++) await page.getByRole('button',{name:`Inspect evidence requirement E-0${i}`}).click();
      assert.equal(await page.locator('#rm-component-inspector h4').innerText(),'Thermal circuit');
      await stages.nth(5).click();await page.getByRole('button',{name:'Revisit System Modeling'}).click();assert.equal(await stages.nth(1).getAttribute('aria-current'),'step');
      await page.locator('.buying-triggers').scrollIntoViewIfNeeded();await page.waitForTimeout(150);assert.equal(await stages.nth(1).getAttribute('aria-current'),'step');
      checks.push(`Six stages, six components, fixed geometry, evidence inspection, keyboard, iteration and scroll independence: ${width}px`);
    }
    await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(root+'/#research-methodology');await page.evaluate(()=>document.fonts.ready);
    await page.getByRole('button',{name:'Causal & Attack Analysis',exact:true}).focus();await page.keyboard.press('Enter');
    assert.equal(await page.locator('.rm-causal-path').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
    await page.locator('.rm-workbench').screenshot({path:`${output}/keyboard-reduced-motion.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
    checks.push('Reduced motion and keyboard-activated causal overlay');
    for(const route of ['/services','/about','/contact']) { await page.goto(root+route);assert.equal(await page.locator('h1').count(),1); }
    fs.writeFileSync(`${output}/results.json`,JSON.stringify({browser:browser.version(),results,checks,errors},null,2));
    console.log(JSON.stringify({checks,errors,violations:results.filter(r=>r.axe.violations.length).map(({width,stage,axe})=>({width,stage,violations:axe.violations}))},null,2));
    assert.deepEqual(errors,[]);assert(results.every(r=>!r.axe.violations.length));
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1);});
