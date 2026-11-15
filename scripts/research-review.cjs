const {chromium}=require(process.env.PLAYWRIGHT_MODULE || '/tmp/ikelos-browser/node_modules/playwright');
const fs=require('fs');const path=require('path');const assert=require('assert/strict');
const out=path.resolve(process.env.REVIEW_OUTPUT || path.join(__dirname,'../validation/three-practice-redesign'));
process.chdir(path.resolve(__dirname,'..'));
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
const routes=['/','/practices','/practices/exquisite-access-development','/practices/ot-behavior-validation-survivability','/practices/systems-behavior-validation-survivability-testing','/practices/cyber-effects-development-validation','/engagements','/products','/products/phobetor','/products/veiltrace','/about','/contact','/services','/capabilities/firmware-emulation'];
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE || '/tmp/ikelos-browsers/chromium-1194/chrome-linux/chrome',headless:true,args:['--disable-gpu']});
 const page=await browser.newPage();const errors=[],external=new Set(),links=new Set(),views=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});page.on('request',r=>{if(r.url().startsWith('http') && new URL(r.url()).origin!==base)external.add(r.url());});
 try {
  if(!process.argv.includes('--interactions')) for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:width<768?844:1000});
   for(const route of routes){
    await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1600);
    const name=route==='/'?'home':route.split('/').pop();
    assert.equal(await page.locator('h1').count(),1,route+' h1');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
    const axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))};});
    const meta=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]').content,ogTitle:document.querySelector('meta[property="og:title"]').content,ogDescription:document.querySelector('meta[property="og:description"]').content}));
    assert.equal(meta.title,meta.ogTitle);assert.equal(meta.description,meta.ogDescription);
    if(width===390 || width===1440) {await page.screenshot({path:`${out}/${name}-${width}-viewport.png`});await page.screenshot({path:`${out}/${name}-${width}.png`,fullPage:true});}
    if(route==='/') await page.screenshot({path:`${out}/home-${width}-viewport.png`});
    for(const link of await page.locator('a[href]').evaluateAll(a=>a.map(e=>e.getAttribute('href')))) links.add(link);
    views.push({route,width,overflow,axe,meta});
   }
   console.log('Reviewed width '+width);
  }
  if(views.length) fs.writeFileSync(out+'/views.json',JSON.stringify({views,errors,external:[...external],links:[...links]},null,2));
  else { const saved=JSON.parse(fs.readFileSync(out+'/views.json')); views.push(...saved.views); for(const route of routes) {await page.goto(base+route);for(const href of await page.locator('a[href]').evaluateAll(a=>a.map(el=>el.getAttribute('href'))))links.add(href);} }
  assert(views.every(v=>!v.overflow),'Horizontal overflow');assert.deepEqual(views.filter(v=>v.axe.violations.length),[],'axe violations');
  const hashes=['/services#analysis','/services#research','/services#consulting','/services#partner','/about#walkthrough','/about#stuxnet','/contact#partnerships','/contact#encrypted-email','/about#governance','/about#evidence-policy','/#sample-deliverable','/#research-narrative','/#research-methodology',...['research-capability','evidence-workflow','system-integration','engagement-applications','research-deliverables'].map(h=>'/capabilities/firmware-emulation#'+h)];
  for(const width of [320,1440]) {await page.setViewportSize({width,height:1000});for(const route of hashes){await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);const position=await page.evaluate(()=>({target:document.querySelector(location.hash)?.getBoundingClientRect().top,header:document.querySelector('header').getBoundingClientRect().bottom}));assert(position.target>=position.header,route+' anchor '+JSON.stringify(position));}}
  checks.push('All 18 legacy deep links work and clear fixed header on mobile and desktop; methodology migrates to /about.');
  const checkedLinks=[];
  for(const link of links){if(!link.startsWith('/'))continue;const url=new URL(link,base);if(path.extname(url.pathname)){assert.equal((await page.request.get(url.href)).status(),200);continue;}await page.goto(url.href);assert.equal(await page.getByRole('heading',{name:'Page not found',exact:true}).count(),0,link);if(url.hash)assert.equal(await page.locator(url.hash).count(),1,link);checkedLinks.push(link);}
  checks.push('Every internal link resolves to a page or section.');
  await page.setViewportSize({width:390,height:844});await page.goto(base);await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
  await page.getByRole('button',{name:'02 / Survivability',exact:true}).focus();await page.keyboard.press('Space');assert.equal(await page.getByRole('button',{name:'02 / Survivability',exact:true}).getAttribute('aria-pressed'),'true');assert(await page.locator('.lens-result').textContent().then(x=>x.includes('Which critical functions hold up?')));
  await page.screenshot({path:out+'/lens-keyboard-mobile.png'});
  await page.evaluate(()=>scrollTo(0,300));await page.getByRole('button',{name:'Menu'}).click();const dialog=page.getByRole('dialog');const close=dialog.getByRole('button',{name:'Close'});assert(await close.evaluate(el=>el===document.activeElement));await page.keyboard.press('Shift+Tab');assert(await dialog.getByRole('link',{name:'info@ikelosgroup.com'}).evaluate(el=>el===document.activeElement));await page.keyboard.press('Tab');assert(await close.evaluate(el=>el===document.activeElement));
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});assert.deepEqual(await page.evaluate(async()=>(await axe.run()).violations.map(v=>v.id)),[]);await page.screenshot({path:out+'/mobile-menu.png'});await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);assert.equal(await page.evaluate(()=>scrollY),300);assert(await page.getByRole('button',{name:'Menu'}).evaluate(el=>el===document.activeElement));
  await page.getByRole('button',{name:'Menu'}).click();await dialog.getByRole('link',{name:'PHOBETOR',exact:true}).click();await page.waitForURL(base+'/products/phobetor');await page.waitForFunction(()=>document.activeElement?.id==='main-content');assert(await page.locator('main').evaluate(el=>el===document.activeElement));assert.equal(await page.locator('main').getAttribute('inert'),null);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  checks.push('Skip link, keyboard research lens, modal focus trap, Escape, focus/scroll restoration, and route focus pass.');
  await page.goto(base+'/about#research-methodology');const stages=page.getByRole('navigation',{name:'Research workflow'}).getByRole('button');for(let i=0;i<6;i++){await stages.nth(i).click();assert.equal(await stages.nth(i).getAttribute('aria-current'),'step');}await stages.first().focus();await page.keyboard.press('End');assert(await stages.last().evaluate(el=>el===document.activeElement));await page.keyboard.press('Home');assert(await stages.first().evaluate(el=>el===document.activeElement));
  await page.goto(base+'/capabilities/firmware-emulation#evidence-workflow');const tabs=page.getByRole('tab');for(let i=0;i<8;i++){await tabs.nth(i).click();assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');}await tabs.first().focus();await page.keyboard.press('ArrowLeft');assert(await tabs.last().evaluate(el=>el===document.activeElement));await page.keyboard.press('Tab');assert(await page.getByRole('tabpanel').evaluate(el=>el===document.activeElement));
  await page.goto(base+'/#sample-deliverable');const records=page.locator('#sample-deliverable details');assert.equal(await records.count(),8);for(let i=0;i<8;i++){await records.nth(i).locator('summary').focus();await page.keyboard.press('Enter');assert(await records.nth(i).evaluate(el=>el.open));}await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});assert.deepEqual(await page.evaluate(async()=>(await axe.run(document.querySelector('#sample-deliverable'))).violations.map(v=>v.id)),[]);
  checks.push('Retained methodology, firmware evidence tabs, and all eight evidence disclosures work with keyboard.');
  await page.goto(base+'/contact?practice=ot');assert.equal(await page.locator('select').inputValue(),'ot');await page.getByRole('button',{name:'Open email draft'}).click();assert.equal(await page.locator('textarea').evaluate(el=>el.validity.valueMissing),true);
  await page.locator('textarea').fill('Assess recovery after a dependency failure. Timeline: next quarter.');await page.getByRole('button',{name:'Open email draft'}).click();assert(await page.getByRole('status').textContent().then(x=>x.includes('Email draft requested')));assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download public PGP key'}).click()]);assert.equal(download.suggestedFilename(),'ikelos-secure-email.asc');assert(fs.readFileSync(await download.path()).equals(fs.readFileSync('public/keys/ikelos-secure-email.asc')));
  checks.push('Contextual engagement topic, required non-sensitive introduction, email handoff status, no web storage, and exact public-key download pass.');
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);assert.equal(await page.locator('.lens-system img').evaluate(el=>getComputedStyle(el).animationName),'none');await page.screenshot({path:out+'/reduced-motion.png'});checks.push('Reduced motion removes hero animation.');
  await page.goto(base+'/missing');assert.equal(await page.title(),'Page not found — IKELOS Group');await page.getByRole('link',{name:'Return home'}).click();await page.waitForURL(base+'/');
  assert.deepEqual(errors,[]);assert.deepEqual([...external],[]);fs.writeFileSync(out+'/results.json',JSON.stringify({browser:browser.version(),views:views.length,checks,checkedLinks,errors,external:[...external]},null,2));console.log(JSON.stringify({views:views.length,checks,errors},null,2));
 }finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
