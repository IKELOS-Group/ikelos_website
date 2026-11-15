import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';
import { accessPath, otPath } from './components/ResearchFoundation';
beforeEach(() => {
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">';
});

test('first screen states the shared premise and distinguishes the two research questions', () => {
  render(<App/>);
  const hero = screen.getByRole('region', {name:/Understand.*the system/});
  expect(hero).toHaveTextContent('Applied research for embedded and operational systems');
  expect(hero).toHaveTextContent('what access is possible and which critical functions hold up under stress');
  fireEvent.click(screen.getByRole('button',{name:'02 / Survivability'}));
  expect(screen.getByRole('button',{name:'02 / Survivability'})).toHaveAttribute('aria-pressed','true');
  expect(document.querySelector('.lens-result')).toHaveTextContent('which functions continue, which fail, and what recovery requires');
  expect(screen.getByRole('region',{name:/Two questions/})).toHaveTextContent('Exquisite Access Development');
  expect(screen.getByRole('region',{name:/Two questions/})).toHaveTextContent('OT Behavior Validation and Survivability');
  expect(screen.getByRole('region',{name:/The foundations/})).toHaveTextContent('PHOBETOR');
  expect(screen.getByRole('region',{name:/The foundations/})).toHaveTextContent('VEILTRACE');
});

test('practice paths lead to distinct scoped engagements and related product work',()=>{
  render(<App/>);
  fireEvent.click(screen.getByRole('link',{name:/Explore access development/}));
  expect(window.location.pathname).toBe(accessPath);
  expect(screen.getByRole('heading',{level:1})).toHaveTextContent('Exquisite Access Development');
  expect(screen.getByRole('main')).toHaveTextContent('Foreign materiel exploitation (FME)');
  expect(screen.getByRole('main')).toHaveTextContent('does not guarantee access');
  expect(screen.getByRole('link',{name:'Explore PHOBETOR'})).toHaveAttribute('href','/products/phobetor');
  fireEvent.click(screen.getByRole('link',{name:/Explore behavior validation/}));
  expect(window.location.pathname).toBe(otPath);
  expect(screen.getByRole('main')).toHaveTextContent('Survivability is tested under defined conditions');
  expect(screen.getByRole('link',{name:'Explore VEILTRACE'})).toHaveAttribute('href','/products/veiltrace');
});

test.each([
  ['/practices','Research practices'], ['/products','Research products'],
  [accessPath,'Exquisite Access Development'], [otPath,'OT Behavior Validation and Survivability'],
  ['/products/phobetor','PHOBETOR'], ['/products/veiltrace','VEILTRACE'],
  ['/about','How we work'], ['/contact','Discuss a research engagement'], ['/services','Research practices'],
])('route %s has unique metadata and one main heading',(route,title)=>{
  window.history.replaceState({},'',route);render(<App/>);
  expect(screen.getAllByRole('heading',{level:1})).toHaveLength(1);
  expect(document.title).toBe(title+' — IKELOS Group');
  expect(document.querySelector('meta[property="og:title"]').content).toBe(document.title);
  expect(document.querySelector('meta[name="description"]').content).toBe(document.querySelector('meta[property="og:description"]').content);
  expect(document.body).not.toHaveTextContent(/monkeysploit|monkeyforge/i);
  expect(document.head.innerHTML).not.toMatch(/monkeysploit|monkeyforge/i);
});

test('PHOBETOR brings firmware capabilities and funded research into the IKELOS product',()=>{
  window.history.replaceState({},'','/products/phobetor');render(<App/>);
  const main=screen.getByRole('main');
  expect(main).toHaveTextContent('PHOBETOR is IKELOS Group’s platform');
  expect(document.getElementById('research-capability')).toHaveTextContent('ELF-based embedded Linux firmware · x86-64 and AArch64');
  expect(document.getElementById('funded-research')).toHaveTextContent('IKELOS Group funds PHOBETOR’s expansion');
  for(const id of ['rtos-research','protocol-research']) expect(document.getElementById(id)).toHaveTextContent('In development.');
  expect(screen.getAllByRole('tab')).toHaveLength(8);
  expect(document.getElementById('system-integration')).toBeVisible();
  expect(document.getElementById('research-deliverables')).toBeVisible();
  expect(screen.getByRole('link',{name:/Explore the evidence workflow/})).toHaveAttribute('href','/products/phobetor#evidence-workflow');
  expect(main.querySelector('a[href$=".pdf"]')).toBeNull();
});

test('VEILTRACE presents bounded modeling scope without fabricated evidence',()=>{
  window.history.replaceState({},'','/products/veiltrace');render(<App/>);
  const main=screen.getByRole('main');
  expect(main).toHaveTextContent('Dynamic, threat-representative network generation');
  expect(main).toHaveTextContent('A VEILTRACE white paper is not yet available');
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
