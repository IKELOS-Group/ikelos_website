const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const fs = require('fs');
const assert = require('assert/strict');
const output = process.env.REVIEW_OUTPUT || require('path').resolve('validation/systems-sigil');
const root = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--disable-gpu']});
 const page=await browser.newPage(); const errors=[], results=[], links=new Set(), externalRequests=new Set();
 page.on('request',r=>{if(r.url().startsWith('http') && new URL(r.url()).origin!==new URL(root).origin)externalRequests.add(r.url())});
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 try {
 if(process.argv.includes('--icons')) {
  for(const size of [32,180,192,512]) {
   await page.setViewportSize({width:size,height:size});
   await page.setContent(`<style>*{margin:0}img{display:block;width:100%;height:100%}</style><img src="data:image/svg+xml;base64,${fs.readFileSync('public/favicon.svg').toString('base64')}">`);
   await page.locator('img').evaluate(el=>el.decode());await page.screenshot({path:`public/brand/icon-${size}.png`,omitBackground:true});
  }return;
 }
 if(process.argv.includes('--interactions')) {
  const checks=[];
  const hashes=['/services#analysis','/services#research','/services#consulting','/services#partner','/about#walkthrough','/about#stuxnet','/contact#partnerships','/contact#encrypted-email','/about#governance','/about#evidence-policy','/#sample-deliverable'];
  for(const width of [320,375,768,1440]) {
   await page.setViewportSize({width,height:width<768?812:1000});
   for(const route of hashes) {
    await page.goto(root+route);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(120);
    const rect=await page.evaluate(()=>({target:document.querySelector(location.hash).getBoundingClientRect().top,header:document.querySelector('header').getBoundingClientRect().bottom}));
    assert(rect.target>=rect.header,`${width} ${route}: anchor obscured ${JSON.stringify(rect)}`);
   }
   await page.goto(root+'/contact');
   const email=await page.getByRole('main').getByRole('link',{name:'info@ikelosgroup.com',exact:true}).boundingBox();assert(email.y+email.height<812);
   await page.goto(root);await page.evaluate(()=>document.fonts.ready);
   await page.locator('#research-narrative').screenshot({path:`${output}/buying-case-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
   const sample=page.locator('#sample-deliverable');
   await sample.screenshot({path:`${output}/sample-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
   const records=sample.locator('details');assert.equal(await records.count(),8);
   for(let i=0;i<8;i++) {
    const record=records.nth(i), summary=record.locator('summary');
    await summary.focus();await page.keyboard.press('Enter');assert(await record.evaluate(el=>el.open));assert(await record.locator('.record-status').isVisible());
   }
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const sampleAxe=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('#sample-deliverable'));return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});assert.deepEqual(sampleAxe,[]);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await sample.screenshot({path:`${output}/sample-expanded-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
   await records.nth(0).locator('summary').focus();await page.keyboard.press('Space');assert.equal(await records.nth(0).evaluate(el=>el.open),false);
   await records.nth(1).locator('summary').focus();await page.screenshot({path:`${output}/sample-keyboard-${width}.png`});
  }
  for(const width of [375,1440]) {
   await page.setViewportSize({width,height:width<768?812:1000});await page.goto(root+'/about');await page.evaluate(()=>document.fonts.ready);
   for(const [label,selector] of [['governance','.workflow'],['evidence-policy','#evidence-policy'],['historical-note','#stuxnet']]) await page.locator(selector).screenshot({path:`${output}/${label}-${width}.png`,style:'.site-header,.skip-link { visibility: hidden !important; }'});
   await page.locator('#stuxnet summary').click();assert(await page.getByRole('link',{name:'Read the Symantec analysis (PDF)'}).isVisible());
   await page.getByRole('link',{name:'Open the illustrative evidence package'}).click();await page.waitForURL(root+'/#sample-deliverable');await page.waitForFunction(()=>document.activeElement?.id==='main-content');assert(await page.locator('main').evaluate(el=>el===document.activeElement));
  }
  checks.push('44 direct hashes clear the fixed header; business email visible at all four widths; legacy maritime link reaches sample');
  checks.push('Eight native evidence disclosures open with Enter and close with Space; visible status, focus, reflow and expanded axe at all four widths');
  for(const width of [375,1440]) {
   await page.setViewportSize({width,height:width<768?812:1000});
   await page.goto(root);await page.evaluate(()=>document.fonts.ready);
   const skip=page.getByRole('button',{name:'Skip animation'});if(await skip.count()) await skip.click();
   assert(await page.locator('.home-hero.is-settled').count());
   const stages=page.getByRole('navigation',{name:'Research workflow'}).getByRole('button');
   for(let i=0;i<6;i++) {
    await stages.nth(i).click();assert.equal(await stages.nth(i).getAttribute('aria-current'),'step');
    await page.locator('.rm-workbench').screenshot({path:`${output}/methodology-${i+1}-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
   }
   await stages.nth(0).focus();await page.keyboard.press('End');assert.equal(await stages.nth(5).getAttribute('aria-current'),'step');
   await page.keyboard.press('ArrowRight');assert.equal(await stages.nth(0).getAttribute('aria-current'),'step');
   await page.keyboard.press('ArrowLeft');assert.equal(await stages.nth(5).getAttribute('aria-current'),'step');
   await page.keyboard.press('Home');assert.equal(await stages.nth(0).getAttribute('aria-current'),'step');
   await stages.nth(2).click();await page.locator('.buying-triggers').scrollIntoViewIfNeeded();await page.waitForTimeout(300);assert.equal(await stages.nth(2).getAttribute('aria-current'),'step');
   checks.push(`Six methodology stages, arrow/Home/End, intro skip, scroll independence at ${width}`);
  }
  await page.setViewportSize({width:375,height:812});await page.goto(root);await page.evaluate(()=>window.scrollTo(0,400));
  await page.getByRole('button',{name:'Menu',exact:false}).click();
  const dialog=page.getByRole('dialog');const close=dialog.getByRole('button',{name:'Close',exact:false});
  assert(await close.evaluate(el=>el===document.activeElement));await page.keyboard.press('Shift+Tab');assert(await dialog.getByRole('link',{name:'info@ikelosgroup.com'}).evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Tab');assert(await close.evaluate(el=>el===document.activeElement));
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const menuAxe=await page.evaluate(async()=>{const r=await axe.run();return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});assert.deepEqual(menuAxe,[]);
  await page.screenshot({path:`${output}/menu-375.png`});await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);assert(await page.getByRole('button',{name:'Menu'}).evaluate(el=>el===document.activeElement));assert.equal(await page.evaluate(()=>scrollY),400);
  await page.getByRole('button',{name:'Menu'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Contact'}).click();await page.waitForURL(root+'/contact');await page.waitForFunction(()=>document.activeElement?.id==='main-content');assert(await page.locator('main').evaluate(el=>el===document.activeElement));assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  checks.push('Mobile menu focus containment, Escape, focus/scroll return, route focus, axe');
  await page.goto(root);await page.keyboard.press('Tab');assert(await page.getByRole('link',{name:'Skip to content'}).evaluate(el=>el===document.activeElement));await page.keyboard.press('Enter');assert(await page.locator('main').evaluate(el=>el===document.activeElement));
  await page.getByRole('link',{name:'Scope a technical investigation'}).first().focus();await page.screenshot({path:`${output}/focus-mobile.png`});
  await page.setViewportSize({width:1440,height:1000});await page.goto(root);await page.getByRole('link',{name:'Scope a technical investigation'}).first().focus();await page.screenshot({path:`${output}/focus-desktop.png`});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(root);assert.equal(await page.getByRole('button',{name:'Skip animation'}).count(),0);assert.equal(await page.locator('.hero-sigil').evaluate(el=>getComputedStyle(el).animationName),'none');await page.screenshot({path:`${output}/reduced-motion-1440.png`});
  checks.push('Keyboard skip link, visible CTA focus, reduced-motion settled state');
  await page.goto(root+'/contact');const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download public PGP key'}).click()]);assert.equal(download.suggestedFilename(),'ikelos-secure-email.asc');assert(fs.readFileSync(await download.path()).equals(fs.readFileSync('public/keys/ikelos-secure-email.asc')));checks.push('Browser key download filename and bytes');
  await page.goto(root+'/missing');await page.getByRole('link',{name:'Return home'}).click();assert.equal(new URL(page.url()).pathname,'/');checks.push('404 recovery');
  assert.deepEqual(errors,[]);fs.writeFileSync(`${output}/interactions.json`,JSON.stringify({checks,errors},null,2));console.log(checks);return;
 }
 for(const width of [320,375,768,1440]) {
  await page.setViewportSize({width,height:width<768?812:1000});
  for(const route of ['/','/services','/about','/contact']) {
   await page.goto(root+route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(3200);
   assert.equal(await page.locator('h1').count(),1);
   for(const href of await page.locator('a').evaluateAll(els=>els.map(el=>el.href))) links.add(href);
   const name=route==='/'?'home':route.slice(1);
   await page.screenshot({path:`${output}/${name}-${width}-viewport.png`});await page.screenshot({path:`${output}/${name}-${width}.png`,fullPage:true});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))}});
   const fonts=await page.evaluate(()=>({inter:document.fonts.check('16px Inter'),orbitron:document.fonts.check('16px Orbitron')}));
   results.push({width,route,overflow,axe,fonts});
  }
 }
 const checkedLinks=[];
 for(const href of links) {
  if(href.startsWith('mailto:')) {assert(['mailto:info@ikelosgroup.com','mailto:secure_email@ikelosgroup.com'].includes(href));continue;}
  const url=new URL(href); if(url.origin!==new URL(root).origin)continue;
  const response=await page.request.get(url.origin+url.pathname);assert.equal(response.status(),200);
  if(url.hash){await page.goto(url.href);assert.equal(await page.locator(url.hash).count(),1);}
  checkedLinks.push(url.pathname+url.hash);
 }
 for(const asset of ['/favicon.svg','/manifest.json','/brand/icon-32.png','/brand/icon-180.png','/brand/icon-192.png','/brand/icon-512.png','/brand/wordmark-color.svg','/brand/wordmark-dark.svg','/brand/wordmark-light.svg','/brand/emblem-color.svg','/brand/emblem-light.svg','/brand/emblem-dark.svg','/fonts/inter-latin-variable.woff2','/fonts/orbitron-latin-variable.woff2','/fonts/Inter-OFL.txt','/fonts/Orbitron-OFL.txt']) assert.equal((await page.request.get(root+asset)).status(),200);
 fs.writeFileSync(`${output}/results.json`,JSON.stringify({browser:browser.version(),results,errors,checkedLinks,externalRequests:[...externalRequests]},null,2));
 assert.deepEqual(errors,[]);assert.deepEqual([...externalRequests],[]);assert(results.every(r=>!r.overflow && !r.axe.violations.length && r.fonts.inter && r.fonts.orbitron));
 console.log(JSON.stringify({views:results.length,overflow:results.filter(r=>r.overflow),violations:results.filter(r=>r.axe.violations.length),errors},null,2));
 }finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
