import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { accessPath, otPath, effectsPath } from './components/ResearchFoundation';
beforeEach(() => {
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">';
});

const practiceNames = ['Exquisite Access Development', 'Systems Behavior Validation and Survivability Testing', 'Cyber Effects Development and Validation'];

test('first screen positions cyberwarfare R&D and presents exactly three research lenses', () => {
  render(<App/>);
  const hero = screen.getByRole('region', {name:/The threat does.*not announce.*itself/});
  expect(hero).toHaveTextContent('Cyberwarfare R&D');
  expect(hero).toHaveTextContent(/warfighter/);
  expect(hero).toHaveTextContent(/critical civilian operations/);
  expect(hero).toHaveTextContent(/Operational technology/);
  expect(hero).toHaveTextContent(/Complex cyber-physical systems/);
  const controls = within(screen.getByRole('group', {name:'Explore the research questions'})).getAllByRole('button');
  expect(controls.map(button=>button.textContent)).toEqual(['01 / Access','02 / Survivability','03 / Effects']);
  for (const button of controls) {
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed','true');
    expect(controls.filter(control=>control.getAttribute('aria-pressed')==='true')).toHaveLength(1);
    expect(document.querySelector('.lens-result')).not.toBeEmptyDOMElement();
  }
  const paths = within(document.getElementById('practices'));
  for (const name of practiceNames) expect(paths.getByRole('link',{name,exact:true})).toBeVisible();
  expect(paths.getAllByRole('heading',{level:3})).toHaveLength(3);
  for (const name of ['PHOBETOR','VEILTRACE']) expect(within(document.getElementById('products')).getByRole('link',{name,exact:true})).toBeVisible();
});

test('practice paths preserve distinct scopes and connected research foundations',()=>{
  render(<App/>);
  fireEvent.click(within(document.getElementById('practices')).getByRole('link',{name:practiceNames[0],exact:true}));
  expect(window.location.pathname).toBe(accessPath);
  expect(screen.getByRole('heading',{level:1})).toHaveTextContent(practiceNames[0]);
  expect(screen.getByRole('main')).toHaveTextContent(/foreign materiel exploitation \(FME\)/i);
  expect(screen.getByRole('main')).toHaveTextContent('Access is not guaranteed');
  expect(screen.getByRole('link',{name:/Explore the research basis/})).toHaveAttribute('href','/products/phobetor');
  fireEvent.click(within(screen.getByRole('main')).getByRole('link',{name: new RegExp(practiceNames[1])}));
  expect(window.location.pathname).toBe(otPath);
  expect(screen.getByRole('main')).toHaveTextContent('Survivability is demonstrated only under tested conditions');
  expect(screen.getByRole('link',{name:/Explore the research basis/})).toHaveAttribute('href','/products/veiltrace');
  fireEvent.click(within(screen.getByRole('main')).getByRole('link',{name:new RegExp(practiceNames[2])}));
  expect(window.location.pathname).toBe(effectsPath);
  expect(screen.getByRole('heading',{level:1})).toHaveTextContent(practiceNames[2]);
  expect(screen.getByRole('main')).toHaveTextContent('authorized R&D and controlled laboratory validation');
  expect(screen.getByRole('main')).toHaveTextContent('does not establish live operational effectiveness');
  expect(screen.getByRole('main')).toHaveTextContent('Development outcomes are not guaranteed');
});

test.each([
  ['/practices','Three research practices'], ['/products','Research foundations'],
  ['/engagements','For prime partners and government'], [effectsPath,'Cyber Effects Development and Validation'],
  [accessPath,'Exquisite Access Development'], [otPath,'Systems Behavior Validation and Survivability Testing'],
  ['/products/phobetor','PHOBETOR'], ['/products/veiltrace','VEILTRACE'],
  ['/about','How we work'], ['/contact','Discuss a research engagement'], ['/services','Three research practices'],
])('route %s has unique metadata and one main heading',(route,title)=>{
  window.history.replaceState({},'',route);render(<App/>);
  expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);
  expect(document.title).toBe(title+' — IKELOS Group');
  expect(document.querySelector('meta[property="og:title"]').content).toBe(document.title);
  expect(document.querySelector('meta[name="description"]').content).toBe(document.querySelector('meta[property="og:description"]').content);
});

test('PHOBETOR separates its bounded research basis from proposed product development',()=>{
  window.history.replaceState({},'','/products/phobetor');render(<App/>);
  const main=screen.getByRole('main');
  expect(main).toHaveTextContent('PHOBETOR is IKELOS Group’s research-product direction');
  expect(document.getElementById('research-capability')).toHaveTextContent('ELF-based embedded Linux firmware · x86-64 and AArch64');
  expect(document.getElementById('research-capability')).toHaveTextContent('does not establish universal firmware support');
  expect(document.getElementById('research-capability')).toHaveTextContent('production-ready PHOBETOR capability');
  for(const id of ['rtos-research','protocol-research']) expect(document.getElementById(id)).toHaveTextContent('Research direction.');
  expect(screen.getAllByRole('tab')).toHaveLength(8);
  expect(document.getElementById('system-integration')).toBeVisible();
  expect(document.getElementById('research-deliverables')).toBeVisible();
  expect(screen.getByRole('link',{name:/Explore the evidence workflow/})).toHaveAttribute('href','/products/phobetor#evidence-workflow');
  expect(main.querySelector('a[href$=".pdf"]')).toBeNull();
});

test('VEILTRACE presents bounded modeling scope without fabricated evidence',()=>{
  window.history.replaceState({},'','/products/veiltrace');render(<App/>);
  const main=screen.getByRole('main');
  expect(main).toHaveTextContent('functional Ludus configurations');
  expect(main).toHaveTextContent('PHOBETOR integration are proposed research areas');
  expect(main).toHaveTextContent('does not demonstrate operational realism');
  expect(main).toHaveTextContent('external models or APIs');
  expect(main).toHaveTextContent('Do not assume all processing remains local');
  expect(main).toHaveTextContent('A generated environment is a model');
  expect(main).not.toHaveTextContent(/validated deployment|uptime|subscription|benchmark results/i);
});

test.each(['/services#analysis','/services#research','/services#consulting','/services#partner','/about#walkthrough','/about#stuxnet','/contact#partnerships','/contact#encrypted-email','/#research-narrative','/#sample-deliverable'])('preserves legacy deep link %s',route=>{
  window.history.replaceState({},'',route);render(<App/>);
  const id=route.split('#')[1];expect(document.getElementById(id)).not.toBeNull();
  expect(Element.prototype.scrollIntoView.mock.instances).toContain(document.getElementById(id));
});

test('legacy homepage methodology migrates deliberately',()=>{
  window.history.replaceState({},'','/#research-methodology');render(<App/>);
  expect(window.location.pathname+window.location.hash).toBe('/about#research-methodology');
  expect(screen.getByRole('navigation',{name:'Research workflow'})).toBeVisible();
  expect(screen.getByRole('main')).toHaveFocus();
});

test('engagement CTA preserves context and moves focus',()=>{
  window.history.replaceState({},'',otPath);render(<App/>);
  fireEvent.click(within(screen.getByRole('main')).getAllByRole('link',{name:/Discuss a research engagement/})[0]);
  expect(window.location.pathname+window.location.search).toBe('/contact?practice=ot');
  expect(screen.getByLabelText('Research interest')).toHaveValue('ot');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByLabelText(/Non-sensitive description/)).toBeRequired();
  expect(screen.getByText(/Nothing is submitted or stored/)).toBeVisible();
  expect(screen.getByRole('main')).toHaveTextContent('external models or APIs');
});

test('legacy maritime destination leads to an inspectable sample with honest evidence status', () => {
  window.history.replaceState({}, '', '/about#walkthrough');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /Open the illustrative evidence package/ }));
  expect(window.location.pathname + window.location.hash).toBe('/#sample-deliverable');
  expect(screen.getByRole('main')).toHaveFocus();
  const sample = within(document.getElementById('sample-deliverable'));
  expect(sample.getByText('Illustrative sample · Fictional system · No test results')).toBeVisible();
  for (const title of ['Assumption register', 'Hypothesis status', 'Test conditions', 'Evidence', 'Limitations', 'Consequence analysis', 'Decision', 'Retest criteria']) {
    const detail = sample.getByText(title, { exact: true, selector: 'summary span' }).closest('details');
    fireEvent.click(detail.querySelector('summary'));
    expect(detail).toHaveAttribute('open');
    expect(detail.querySelector('.record-status')).toBeVisible();
  }
  expect(sample.getByText('Required / Not collected')).toBeVisible();
  expect(sample.getByText('Modeled / Not demonstrated')).toBeVisible();
  expect(sample.getByText('Pending / Evidence required')).toBeVisible();
  expect(sample.getByText(/The accountable stakeholder determines/)).toHaveTextContent('commission further testing');
});

test('approach governs an engagement, centralizes the evidence policy, and demotes historical reading', () => {
  window.history.replaceState({}, '', '/about');
  render(<App />);
  const workflow = screen.getByRole('list', { name: 'Engagement governance' });
  for (const term of ['written testing authority', 'approved communications', 'stop conditions', 'scope review', 'retest criteria']) expect(workflow).toHaveTextContent(term);
  expect(screen.getByRole('link', { name: /Explore the six-stage research methodology/ })).toHaveAttribute('href', '/about#research-methodology');
  expect(document.getElementById('evidence-policy')).toHaveTextContent('demonstrated findings, bounded negative results, unresolved hypotheses, and coverage limitations separately');
  const history = document.getElementById('stuxnet');
  expect(history.querySelector('details')).not.toHaveAttribute('open');
  fireEvent.click(history.querySelector('summary'));
  expect(within(history).getByRole('link', { name: /read the Symantec analysis/i })).toHaveAttribute('href', 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf');
  expect(history).toHaveTextContent('not IKELOS work or evidence that STPA-Sec was used');
});

test('contact leads with the business email, then the compact workflow, partnership prompts, and PGP', () => {
  window.history.replaceState({}, '', '/contact');
  render(<App />);
  const main = within(screen.getByRole('main'));
  const email = main.getByRole('link', { name: 'info@ikelosgroup.com' });
  expect(main.getByRole('heading', { level: 1 }).nextElementSibling).toBe(email);
  expect(email).toHaveAttribute('href', 'mailto:info@ikelosgroup.com');
  const workflow = main.getByRole('region', { name: 'Initial workflow' });
  expect(within(workflow).getAllByRole('listitem').map(el => el.textContent)).toEqual([
    'Introductory discussion', 'Confidentiality arrangements as needed', 'Objectives and access review', 'Scoped proposal',
  ]);
  const partnerships = document.getElementById('partnerships');
  const encryption = document.getElementById('encrypted-email');
  expect(workflow.compareDocumentPosition(partnerships) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(partnerships.compareDocumentPosition(encryption) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(main.getByRole('link', { name: 'secure_email@ikelosgroup.com' })).toHaveAttribute('href', 'mailto:secure_email@ikelosgroup.com');
  const keyLink = main.getByRole('link', { name: 'Download public PGP key' });
  expect(keyLink).toHaveAttribute('href', '/keys/ikelos-secure-email.asc');
  expect(keyLink).toHaveAttribute('download', 'ikelos-secure-email.asc');
  expect(main.getByText('5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3')).toBeVisible();
  expect(main.getByText(/does not encrypt your message automatically/)).toBeVisible();
  expect(main.getByText(/OpenPGP-capable mail app/)).toBeVisible();
  expect(within(encryption).getByText(/Do not send classified information/)).toHaveTextContent('CUI, export-controlled data, credentials, or proprietary technical material');
  expect(encryption).toHaveTextContent('does not by itself authorize transmission of controlled information');
});

test('unknown routes provide a route home', () => {
  window.history.replaceState({}, '', '/missing');
  render(<App />);
  expect(document.title).toBe('Page not found — IKELOS Group');
  fireEvent.click(screen.getByRole('link', { name: 'Return home' }));
  expect(window.location.pathname).toBe('/');
});

test('research workflow selects six analytical stages without a tab interface', () => {
  window.history.replaceState({}, '', '/about');
  render(<App />);
  const workflow = within(screen.getByRole('navigation', { name: 'Research workflow' }));
  const controls = workflow.getAllByRole('button');
  expect(controls).toHaveLength(6);
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Inspect system components' })).toHaveAccessibleDescription(/Process sensors return temperature and flow feedback/);
  expect(controls[0]).toHaveAttribute('aria-current', 'step');
  fireEvent.keyDown(controls[0], { key: 'ArrowDown' });
  expect(controls[1]).toHaveFocus();
  expect(screen.getByRole('region', { name: 'Model authority, action, and feedback together.' })).toHaveTextContent('Physical connectivity alone does not establish');
  fireEvent.keyDown(controls[1], { key: 'End' });
  expect(controls[5]).toHaveFocus();
  expect(screen.getByText(/if the candidate path is demonstrated/)).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: /Revisit System Modeling/ }));
  expect(controls[1]).toHaveAttribute('aria-current', 'step');
  fireEvent.keyDown(controls[1], { key: 'Home' });
  expect(controls[0]).toHaveFocus();
  fireEvent.keyDown(controls[0], { key: 'ArrowLeft' });
  expect(controls[5]).toHaveFocus();
  for (const control of controls) {
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('Research plan · No test results')).toBeVisible();
  }
});

test('causal scenario and validation distinguish assumptions, technical effects, and consequences', () => {
  window.history.replaceState({}, '', '/about');
  render(<App />);
  const workflow = within(screen.getByRole('navigation', { name: 'Research workflow' }));
  fireEvent.click(workflow.getByRole('button', { name: 'Causal & Attack Analysis' }));
  expect(screen.getByText(/ICA-01: reduce pump demand/)).toHaveTextContent('if an attacker can influence accepted calibration');
  expect(screen.getByText(/Attack hypotheses are not validated vulnerabilities/)).toBeVisible();
  fireEvent.click(workflow.getByRole('button', { name: 'Exploit Validation' }));
  expect(screen.getByText(/A supported or contradicted hypothesis/)).toBeVisible();
  expect(screen.getByText(/Distinguish an emulated result/)).toBeVisible();
  expect(screen.getByText('Validation plan · Evidence requirements defined')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Inspect evidence requirement E-02' }));
  expect(screen.getByRole('button', { name: 'Inspect control computer' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('region', { name: 'Control computer' })).toHaveTextContent('Implementation trace');
  expect(screen.getByText(/not the official STPA-Sec steps/)).toHaveTextContent('Modeled consequences remain distinct from experimentally demonstrated consequences');
});

test('component inspection exposes assumptions and evidence without changing the research stage', () => {
  window.history.replaceState({}, '', '/about');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Inspect process sensors' }));
  expect(screen.getByRole('region', { name: 'Process sensors' })).toHaveTextContent('stale, conflicting, or biased');
  expect(screen.getByRole('button', { name: 'Mission & Consequence' })).toHaveAttribute('aria-current', 'step');
  expect(screen.getByRole('status')).toHaveTextContent('Consequence modeled');
});

test.each(['', '/'])('old survivability route%s replaces history and retains query and hash', suffix => {
  window.history.replaceState({}, '', `/practices/ot-behavior-validation-survivability${suffix}?ref=legacy#main-content`);
  const historyLength = window.history.length;
  render(<App/>);
  expect(window.location.pathname + window.location.search + window.location.hash).toBe(`${otPath}?ref=legacy#main-content`);
  expect(window.history.length).toBe(historyLength);
  expect(screen.getByRole('heading',{level:1})).toHaveTextContent(practiceNames[1]);
  expect(screen.getByRole('main')).toHaveFocus();
  expect(Element.prototype.scrollIntoView.mock.instances).toContain(screen.getByRole('main'));
});

test.each([
  ['prime','prime-partners', /Discuss a research partnership/],
  ['government','government', /Discuss the research requirement/],
])('partner page carries %s audience context into the non-sensitive contact brief', (audience,id,cta) => {
  window.history.replaceState({}, '', `/engagements#${id}`);
  render(<App/>);
  expect(Element.prototype.scrollIntoView.mock.instances).toContain(document.getElementById(id));
  expect(screen.getByRole('main')).toHaveTextContent(/acceptance criteria/);
  expect(screen.getByRole('main')).toHaveTextContent(/Contract vehicles, clearances, certifications, and availability must be verified/);
  expect(document.getElementById('engagement-evidence')).toHaveTextContent(/not a customer result, benchmark, or claim of past performance/);
  fireEvent.click(screen.getByRole('link',{name:cta}));
  expect(window.location.pathname+window.location.search+window.location.hash).toBe(`/contact?audience=${audience}#engagement-brief`);
  expect(screen.getByLabelText('Engagement context')).toHaveValue(audience);
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByLabelText(/Non-sensitive description/)).toBeRequired();
});

test('effects engagement preserves practice choice',()=>{
  window.history.replaceState({},'',effectsPath);
  render(<App/>);
  fireEvent.click(within(screen.getByRole('main')).getAllByRole('link',{name:/Discuss a research engagement/})[0]);
  expect(window.location.pathname+window.location.search).toBe('/contact?practice=effects');
  expect(screen.getByLabelText('Research interest')).toHaveValue('effects');
  expect(screen.getByRole('option',{name:practiceNames[2]})).toBeInTheDocument();
});

test('invalid contact query choices fall back to safe defaults',()=>{
  window.history.replaceState({},'','/contact?practice=unknown&audience=unknown');
  render(<App/>);
  expect(screen.getByLabelText('Research interest')).toHaveValue('undecided');
  expect(screen.getByLabelText('Engagement context')).toHaveValue('other');
});

test('mobile navigation contains all practices and restores focus, scroll, and background state',()=>{
  render(<App/>);
  const toggle = screen.getByRole('button',{name:/Menu/});
  const originalOverflow = document.body.style.overflow;
  fireEvent.click(toggle);
  const dialog = screen.getByRole('dialog',{name:'Navigation menu'});
  expect(dialog).toHaveAttribute('aria-modal','true');
  expect(toggle).toHaveAttribute('aria-expanded','true');
  const close = within(dialog).getByRole('button',{name:/Close/});
  expect(close).toHaveFocus();
  expect(screen.getByRole('main')).toHaveAttribute('inert');
  expect(document.querySelector('footer')).toHaveAttribute('inert');
  expect(document.body.style.overflow).toBe('hidden');
  for (const name of practiceNames) expect(within(dialog).getByRole('link',{name:new RegExp(name)})).toBeVisible();
  const last = within(dialog).getByRole('link',{name:'info@ikelosgroup.com'});
  fireEvent.keyDown(close,{key:'Tab',shiftKey:true});
  expect(last).toHaveFocus();
  fireEvent.keyDown(last,{key:'Tab'});
  expect(close).toHaveFocus();
  fireEvent.keyDown(close,{key:'Escape'});
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(toggle).toHaveFocus();
  expect(toggle).toHaveAttribute('aria-expanded','false');
  expect(document.body.style.overflow).toBe(originalOverflow);
  expect(screen.getByRole('main')).not.toHaveAttribute('inert');
  expect(document.querySelector('footer')).not.toHaveAttribute('inert');
  expect(window.scrollTo).toHaveBeenCalledWith(0,window.scrollY);
});

test('mobile route navigation closes the dialog and focuses destination content',()=>{
  render(<App/>);
  fireEvent.click(screen.getByRole('button',{name:/Menu/}));
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('link',{name:new RegExp(practiceNames[2])}));
  expect(window.location.pathname).toBe(effectsPath);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByRole('main')).not.toHaveAttribute('inert');
  expect(document.querySelector('footer')).not.toHaveAttribute('inert');
});


test('contact context follows query navigation without losing the introduction', () => {
  window.history.replaceState({}, '', '/contact?practice=access&audience=prime');
  render(<App/>);
  fireEvent.change(screen.getByLabelText(/Non-sensitive description/), { target: { value: 'A high-level test introduction.' } });
  window.history.pushState({}, '', '/contact?practice=effects&audience=government');
  fireEvent.popState(window);
  expect(screen.getByLabelText('Research interest')).toHaveValue('effects');
  expect(screen.getByLabelText('Engagement context')).toHaveValue('government');
  expect(screen.getByLabelText(/Non-sensitive description/)).toHaveValue('A high-level test introduction.');
});
