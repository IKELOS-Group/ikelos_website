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

test('home uses a text-led introduction and the revised reading order', () => {
  render(<App />);
  const main = within(screen.getByRole('main'));
  expect(main.getByRole('heading', { level: 1 })).toHaveTextContent('Understand how your system can be exploited—and what that means for operation.');
  expect(main.getAllByRole('heading', { level: 2 }).map(el => el.textContent)).toEqual([
    'Services', 'Reasons to engage', 'Maritime example: navigation confidence', 'Specialist delivery partnership',
  ]);
  expect(main.getAllByRole('link', { name: 'Discuss an engagement' })).toHaveLength(1);
  expect(main.queryByRole('figure')).not.toBeInTheDocument();
  expect(main.queryByRole('complementary')).not.toBeInTheDocument();
  expect(main.queryByText('Illustrative decision brief')).not.toBeInTheDocument();
  const preview = main.getByRole('region', { name: 'Maritime example: navigation confidence' });
  expect(within(preview).getByText('Hypothetical scenario')).toBeVisible();
  const copy = within(preview).getByText(/not an IKELOS customer engagement or a verified finding/);
  expect(copy.textContent.split(/\s+/).length).toBeLessThanOrEqual(80);
  expect(preview.querySelector('.document-panel')).toBeNull();
  const reasons = main.getByRole('region', { name: 'Reasons to engage' });
  expect(within(reasons).getAllByRole('listitem')).toHaveLength(4);
  expect(within(reasons).getByRole('list').tagName).toBe('UL');
});

test.each(services)('home links %s to its capability section', (name, id) => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: `Explore ${name.toLowerCase()}` }));
  expect(window.location.pathname + window.location.hash).toBe(`/services#${id}`);
  expect(within(document.getElementById(id)).getByRole('heading', { level: 2, name })).toBeVisible();
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
  expect(screen.getByRole('main')).toHaveFocus();
});

test('engagement navigation updates route, focus, metadata, and scroll', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Discuss an engagement' }));
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

test('mobile menu exposes state, closes on Escape and outside click, and closes after navigation', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('is-open');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  fireEvent.click(toggle);
  fireEvent.pointerDown(screen.getByRole('main'));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Capabilities' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
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
  for (const method of ['emulation', 'fuzzing', 'trusted execution environment analysis', 'test fixtures', 'proof-of-concept', 'Foreign materiel exploitation']) {
    expect(research).toHaveTextContent(method);
  }
  expect(document.getElementById('analysis')).toHaveTextContent('STPA-Sec');
  expect(document.getElementById('consulting')).toHaveTextContent('retest criteria');
});

test('maritime preview leads to the complete, qualified walkthrough and decision brief', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Follow the maritime walkthrough' }));
  expect(window.location.pathname + window.location.hash).toBe('/about#walkthrough');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(window.scrollTo).not.toHaveBeenCalled();
  const walkthrough = within(document.getElementById('walkthrough'));
  expect(walkthrough.getByText('Hypothetical scenario', { exact: true })).toBeVisible();
  expect(walkthrough.getByText(/not an IKELOS customer engagement or a verified finding/)).toBeVisible();
  expect(walkthrough.getAllByRole('listitem')).toHaveLength(5);
  for (const name of ['Dependable navigation information', 'Dependencies and assumptions', 'Unexpected behavior', 'Diminished operational confidence', 'Engineering decisions']) {
    expect(walkthrough.getAllByRole('heading', { name })[0]).toBeVisible();
  }
  expect(walkthrough.getByText(/D4M describes deny, degrade, disrupt, destroy, and manipulate/)).toHaveTextContent('does not establish the other effects');
  expect(walkthrough.getByText(/demonstrate the assumed ability to influence the input/)).toHaveTextContent('Unexpected behavior alone does not establish an operational effect');
  const brief = within(walkthrough.getByRole('complementary', { name: 'Dependable navigation information' }));
  expect(brief.getByText('Illustrative decision brief')).toBeVisible();
  expect(brief.getByText(/Hypothetical scenario/)).toBeVisible();
  expect(brief.getByText(/not measured findings or completed remediation/)).toBeVisible();
  for (const name of ['Objective', 'Scenario consequence', 'Evidence needed', 'Engineering decisions']) {
    expect(brief.getByText(name, { selector: 'dt' })).toBeVisible();
  }
});

test('approach orders six stages, evidence standards, walkthrough, and an always-visible historical note', () => {
  window.history.replaceState({}, '', '/about');
  render(<App />);
  expect(within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map(el => el.textContent)).toEqual([
    'Six-stage iterative workflow', 'Evidence standards', 'Maritime walkthrough: navigation confidence', 'Historical note: Stuxnet',
  ]);
  const workflow = screen.getByRole('region', { name: 'Six-stage iterative workflow' });
  expect(within(workflow).getAllByRole('listitem')).toHaveLength(6);
  expect(within(workflow).getByText(/evidence feeds back into the model/i)).toBeVisible();
  expect(screen.getByText(/System-Theoretic Process Analysis for Security/)).toHaveTextContent('not the official steps of STPA-Sec');
  for (const name of ['Observation', 'Hypothesis', 'Validated finding']) {
    expect(screen.getByText(name, { selector: 'dt' })).toBeVisible();
  }
  const history = within(document.getElementById('stuxnet'));
  expect(history.getByRole('heading', { name: 'Historical note: Stuxnet' })).toBeVisible();
  expect(history.getByRole('link', { name: /read the Symantec analysis/i })).toHaveAttribute('href', 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf');
  expect(history.getByText(/retrospective systems-engineering interpretation/)).toBeVisible();
  expect(history.getByText(/not an IKELOS engagement/)).toHaveTextContent('does not illustrate an absence of privileged access');
  expect(history.getByText(/does not establish which development method/)).toHaveTextContent('STPA-Sec');
  expect(document.querySelector('a[href="#stuxnet"]')).toBeNull();
});

test('contextual partnership path connects scope and contact prompts', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Explore specialist partnership' }));
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
});

test('unknown routes provide a route home', () => {
  window.history.replaceState({}, '', '/missing');
  render(<App />);
  expect(document.title).toBe('Page not found — IKELOS Group');
  fireEvent.click(screen.getByRole('link', { name: 'Return home' }));
  expect(window.location.pathname).toBe('/');
});
