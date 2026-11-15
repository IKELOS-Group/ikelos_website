import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FirmwareEvidenceFlow from './FirmwareEvidenceFlow';
import { firmwareStages } from './firmwareResearch';
import { researchStages } from './researchMethodology';

const route = '/products/phobetor';
const legacyRoute = '/capabilities/firmware-emulation';

beforeEach(() => {
  window.history.replaceState({}, '', route);
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">';
});

test('direct entry renders PHOBETOR and updates document and Open Graph metadata', () => {
  render(<App/>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('PHOBETOR');
  expect(document.title).toBe('PHOBETOR — IKELOS Group');
  expect(document.querySelector('meta[property="og:title"]').content).toBe(document.title);
  expect(document.querySelector('meta[name="description"]').content).toMatch(/controlled execution/);
  expect(document.querySelector('meta[property="og:description"]').content).toBe(document.querySelector('meta[name="description"]').content);
  for (const link of within(screen.getByRole('main')).getAllByRole('link', { name: /Discuss a research engagement/ })) expect(link).toHaveAttribute('href', '/contact?practice=phobetor');
  expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).getAllByRole('link').map(link => link.textContent)).toEqual(['Practices', 'Research products', 'How we work', 'Discuss a research engagement ↗']);
});

test('scope, fidelity, and evidence limits remain visible beside the capability claims', () => {
  render(<App/>);
  const capability = document.getElementById('research-capability');
  expect(capability).toHaveTextContent('ELF-based embedded Linux firmware · x86-64 and AArch64');
  const research = document.getElementById('funded-research');
  expect(research).toHaveTextContent('RTOS and bare-metal images remain outside the current embedded Linux workflow');
  expect(research).toHaveTextContent('Protocol-based vulnerability discovery');
  expect(research).toHaveTextContent('Protocol coverage and test harnesses are established per investigation');
  expect(capability).toHaveTextContent('Mechanism, reachability, and authentication are evaluated as separate claims');
  expect(capability).toHaveTextContent('may involve external models or APIs');
  expect(capability).toHaveTextContent('Target-specific engineering');
  expect(capability).toHaveTextContent('Emulation alone cannot establish real-world exploitability');
  expect(document.getElementById('research-deliverables')).toHaveTextContent('are not guaranteed');
  expect(screen.getByRole('main')).not.toHaveTextContent(/certified|guaranteed exploitability/i);
});

test('system integration preserves all six research stages and labels its example honestly', () => {
  render(<App/>);
  const integration = within(document.getElementById('system-integration'));
  expect(integration.getAllByRole('heading', { level: 3 }).map(el => el.textContent)).toEqual(researchStages.map(stage => stage.title));
  expect(integration.getByText('Fictional architecture · No experimental results')).toBeVisible();
  expect(integration.getByText(/These are IKELOS/)).toHaveTextContent('rather than the official STPA-Sec steps');
  expect(integration.getByText(/STPA-Sec structures/)).toHaveTextContent('does not establish a real-world mission consequence');
});

test('every workflow stage exposes supporting evidence and a bounded claim', () => {
  render(<FirmwareEvidenceFlow/>);
  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(8);
  firmwareStages.forEach((stage, i) => {
    fireEvent.click(tabs[i]);
    const panel = screen.getByRole('tabpanel');
    expect(tabs[i]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[i]).toHaveAttribute('tabindex', '0');
    expect(panel).toHaveAccessibleName(new RegExp(stage.title));
    expect(panel).toHaveTextContent(stage.evidence);
    expect(panel).toHaveTextContent(stage.limit);
    expect(screen.getAllByRole('tab').filter(tab => tab.tabIndex === 0)).toHaveLength(1);
  });
  expect(screen.getByText('Conceptual workflow · No scan or test results')).toBeVisible();
});

test('keyboard workflow supports sequential navigation, wraparound, Home/End, and the evidence panel', () => {
  render(<FirmwareEvidenceFlow/>);
  const tabs = screen.getAllByRole('tab');
  userEvent.tab();
  expect(tabs[0]).toHaveFocus();
  for (const [key, index] of [['ArrowRight', 1], ['ArrowDown', 2], ['ArrowUp', 1], ['ArrowLeft', 0], ['ArrowLeft', 7], ['Home', 0], ['End', 7], ['ArrowRight', 0]]) {
    fireEvent.keyDown(document.activeElement, { key });
    expect(tabs[index]).toHaveFocus();
    expect(tabs[index]).toHaveAttribute('aria-selected', 'true');
  }
  userEvent.tab();
  expect(screen.getByRole('tabpanel')).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(tabs[0]).toHaveFocus();
});

test.each(['research-capability', 'research-basis', 'funded-research', 'rtos-research', 'protocol-research', 'evidence-workflow', 'system-integration', 'engagement-applications', 'research-deliverables'])('deep link #%s preserves hash scrolling', id => {
  window.history.replaceState({}, '', `${route}#${id}`);
  render(<App/>);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test('same-page links preserve navigation and the contact CTA moves focus to the new route', () => {
  render(<App/>);
  const nav = within(screen.getByRole('navigation', { name: 'PHOBETOR sections' }));
  fireEvent.click(nav.getByRole('link', { name: 'From hypothesis to evidence' }));
  expect(window.location.hash).toBe('#evidence-workflow');
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById('evidence-workflow'));
  fireEvent.click(within(screen.getByRole('main')).getAllByRole('link', { name: /Discuss a research engagement/ })[0]);
  expect(window.location.pathname).toBe('/contact');
  expect(window.location.search).toBe('?practice=phobetor');
  expect(screen.getByLabelText('Research interest')).toHaveValue('phobetor');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(document.title).toBe('Discuss a research engagement — IKELOS Group');
});

test.each(['', '#research-capability', '#evidence-workflow', '#system-integration', '#engagement-applications', '#research-deliverables'].flatMap(hash => [[legacyRoute, hash], [`${legacyRoute}/`, hash]]))('legacy firmware route %s migrates to PHOBETOR and retains %s and query parameters', (from, hash) => {
  window.history.replaceState({}, '', `${from}?ref=firmware${hash}`);
  const historyLength = window.history.length;
  render(<App/>);
  expect(window.location.pathname + window.location.search + window.location.hash).toBe(`${route}?ref=firmware${hash}`);
  expect(window.history.length).toBe(historyLength);
  expect(document.title).toBe('PHOBETOR — IKELOS Group');
  expect(screen.getByRole('main')).toHaveFocus();
  if (hash) expect(Element.prototype.scrollIntoView.mock.instances).toContain(document.getElementById(hash.slice(1)));
});

test('footer products list contains only PHOBETOR and VEILTRACE', () => {
  render(<App/>);
  const footer = within(screen.getByRole('navigation', { name: 'Footer navigation' }));
  const products = within(footer.getByText('Research products').parentElement);
  expect(products.getAllByRole('link').map(link => [link.textContent, link.getAttribute('href')])).toEqual([
    ['PHOBETOR', route], ['VEILTRACE', '/products/veiltrace'],
  ]);
});
