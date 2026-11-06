import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content="">';
});

const services = [
  ['System security analysis', 'analysis'],
  ['Vulnerability research', 'research'],
  ['Engineering advisory', 'consulting'],
];

test('home exposes positioning, research model, capabilities, and scoped evidence', () => {
  render(<App />);
  const main = within(screen.getByRole('main'));
  expect(main.getByRole('heading', { level: 1 })).toHaveTextContent('First Principles.Decisive Effects.');
  expect(main.getAllByRole('link', { name: /Scope a technical investigation/ })[0]).toHaveAttribute('href', '/contact');
  expect(main.getByRole('link', { name: /Explore capabilities/ })).toHaveAttribute('href', '/services');
  expect(main.getByRole('navigation', { name: 'Research workflow' })).toBeVisible();
  expect(main.getByText('Research plan · No test results')).toBeVisible();
  const buyingCase = document.getElementById('research-narrative');
  expect(buyingCase).toHaveTextContent('the security assumptions behind that decision remain untested');
  expect(buyingCase).toHaveTextContent('boundary between system architecture and implementation research');
  expect(buyingCase.compareDocumentPosition(document.getElementById('research-methodology')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test.each(services)('home links %s to its capability section', (name, id) => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: new RegExp(`Explore ${name.toLowerCase()}`) }));
  expect(window.location.pathname + window.location.hash).toBe(`/services#${id}`);
  expect(within(document.getElementById(id)).getByRole('heading', { level: 2, name })).toBeVisible();
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
  expect(screen.getByRole('main')).toHaveFocus();
});

test('engagement navigation updates route, focus, metadata, and scroll', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('link', { name: /Scope a technical investigation/ })[0]);
  expect(window.location.pathname).toBe('/contact');
  expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
  expect(screen.getByRole('main')).toHaveFocus();
  expect(document.title).toBe('Contact — IKELOS Group');
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

test.each([
  ['/services', 'Capabilities'],
  ['/about', 'Approach'],
  ['/contact', 'Contact'],
])('direct entry to %s has a plain heading, navigation, and metadata', (path, title) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title);
  expect(document.title).toBe(`${title} — IKELOS Group`);
  const description = document.querySelector('meta[name="description"]').content;
  expect(description.length).toBeGreaterThan(40);
  expect(description).not.toMatch(/stuxnet/i);
  const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }));
  expect(nav.getAllByRole('link').map(el => el.textContent)).toEqual(['Capabilities', 'Approach', 'Contact']);
  expect(nav.getByRole('link', { name: title })).toHaveAttribute('aria-current', 'page');
});

test('mobile modal traps focus, restores scroll and focus on Escape, and closes after navigation', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(toggle);
  const dialog = screen.getByRole('dialog', { name: 'Navigation menu' });
  const close = within(dialog).getByRole('button', { name: /Close/ });
  expect(close).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden');
  expect(screen.getByRole('main')).toHaveAttribute('inert');
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(within(dialog).getByRole('link', { name: 'info@ikelosgroup.com' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveFocus();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
  expect(screen.getByRole('main')).not.toHaveAttribute('inert');
  fireEvent.click(toggle);
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'Capabilities' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Capabilities');
});

test.each([
  ['/services#analysis', 'analysis'],
  ['/services#research', 'research'],
  ['/services#consulting', 'consulting'],
  ['/services#partner', 'partner'],
  ['/contact#encrypted-email', 'encrypted-email'],
  ['/contact#partnerships', 'partnerships'],
  ['/about#walkthrough', 'walkthrough'],
  ['/about#stuxnet', 'stuxnet'],
])('direct entry to %s preserves its destination without resetting scroll', (path, id) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(document.getElementById(id)).toBeInTheDocument();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test.each([...services, ['Specialist partnership', 'partner']])('same-page %s link scrolls without a route reset', (name, id) => {
  window.history.replaceState({}, '', '/services');
  render(<App />);
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Service sections' })).getByRole('link', { name }));
  expect(window.location.hash).toBe(`#${id}`);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test('capabilities groups technical methods and deliverables under three services', () => {
  window.history.replaceState({}, '', '/services');
  render(<App />);
  expect(within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map(el => el.textContent)).toEqual([
    ...services.map(([name]) => name), 'Specialist delivery partnership',
  ]);
  const research = document.getElementById('research');
  expect(within(research).getAllByRole('heading', { level: 3 })).toHaveLength(5);
  for (const method of ['emulation', 'fuzzing', 'test fixtures', 'proof-of-concept', 'Research tooling and test platforms']) {
    expect(research).toHaveTextContent(method);
  }
  expect(document.getElementById('analysis')).toHaveTextContent('STPA-Sec');
  expect(document.getElementById('consulting')).toHaveTextContent('retest criteria');
  for (const id of ['analysis', 'research', 'consulting', 'partner']) {
    expect(document.getElementById(id)).toHaveTextContent('Engage when');
    expect(document.getElementById(id)).toHaveTextContent('Decision supported');
  }
  for (const topic of within(research).getAllByRole('article')) {
    expect(topic).toHaveTextContent('Engage when');
    expect(topic).toHaveTextContent('Decision supported');
  }
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
  expect(screen.getByRole('link', { name: /Explore the six-stage research methodology/ })).toHaveAttribute('href', '/#research-methodology');
  expect(document.getElementById('evidence-policy')).toHaveTextContent('demonstrated findings, bounded negative results, unresolved hypotheses, and coverage limitations separately');
  const history = document.getElementById('stuxnet');
  expect(history.querySelector('details')).not.toHaveAttribute('open');
  fireEvent.click(history.querySelector('summary'));
  expect(within(history).getByRole('link', { name: /read the Symantec analysis/i })).toHaveAttribute('href', 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf');
  expect(history).toHaveTextContent('not IKELOS work or evidence that STPA-Sec was used');
});

test('contextual partnership path connects scope and contact prompts', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /Explore specialist partnership/ }));
  expect(window.location.pathname + window.location.hash).toBe('/services#partner');
  const partner = within(document.getElementById('partner'));
  expect(partner.getByText(/defined research workstream/)).toBeVisible();
  expect(partner.getByText(/During scoping/)).toHaveTextContent('responsibilities, technical interfaces, reporting, confidentiality, and intellectual property');
  fireEvent.click(partner.getByRole('link', { name: 'Discuss a specialist partnership' }));
  expect(window.location.pathname + window.location.hash).toBe('/contact#partnerships');
  const prompts = within(document.getElementById('partnerships'));
  expect(prompts.getAllByRole('listitem')).toHaveLength(4);
  expect(prompts.getByRole('link', { name: 'Discuss a partnership by email' })).toHaveAttribute('href', 'mailto:info@ikelosgroup.com');
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
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Inspect process sensors' }));
  expect(screen.getByRole('region', { name: 'Process sensors' })).toHaveTextContent('stale, conflicting, or biased');
  expect(screen.getByRole('button', { name: 'Mission & Consequence' })).toHaveAttribute('aria-current', 'step');
  expect(screen.getByRole('status')).toHaveTextContent('Consequence modeled');
});

test('intro can be skipped without blocking contact actions', () => {
  render(<App />);
  expect(screen.getAllByRole('link', { name: /Scope a technical investigation/ })[0]).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: /Skip animation/ }));
  expect(screen.queryByRole('button', { name: /Skip animation/ })).not.toBeInTheDocument();
  expect(document.querySelector('.home-hero')).toHaveClass('is-settled');
});

test('reduced motion starts with settled hero and static narrative', () => {
  const original = window.matchMedia;
  window.matchMedia = jest.fn(() => ({matches:true, addEventListener:jest.fn(), removeEventListener:jest.fn()}));
  render(<App />);
  expect(document.querySelector('.home-hero')).toHaveClass('is-settled');
  expect(screen.queryByRole('button', { name: /Skip animation/ })).not.toBeInTheDocument();
  window.matchMedia = original;
});
