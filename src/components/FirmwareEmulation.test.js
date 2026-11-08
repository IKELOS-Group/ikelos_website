import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FirmwareEvidenceFlow from './FirmwareEvidenceFlow';
import { firmwareStages } from './firmwareResearch';
import { researchStages } from './researchMethodology';

const route = '/capabilities/firmware-emulation';

beforeEach(() => {
  window.history.replaceState({}, '', route);
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content=""><meta property="og:title" content=""><meta property="og:description" content="">';
});

test('direct entry renders the capability and updates document and Open Graph metadata', () => {
  render(<App/>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Find the path.Prove the behavior.');
  expect(document.title).toBe('Firmware Vulnerability Research & System Emulation — IKELOS Group');
  expect(document.querySelector('meta[property="og:title"]').content).toBe(document.title);
  expect(document.querySelector('meta[name="description"]').content).toMatch(/controlled execution/);
  expect(document.querySelector('meta[property="og:description"]').content).toBe(document.querySelector('meta[name="description"]').content);
  expect(screen.getByRole('link', { name: /Discuss a Research Engagement/ })).toHaveAttribute('href', '/contact');
  expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).getAllByRole('link').map(link => link.textContent)).toEqual(['Capabilities', 'Approach', 'Contact']);
});

test('scope, fidelity, and evidence limits remain visible beside the capability claims', () => {
  render(<App/>);
  const capability = document.getElementById('research-capability');
  expect(capability).toHaveTextContent('ELF-based embedded Linux firmware · x86-64 and AArch64');
  expect(capability).toHaveTextContent('RTOS support is a development area');
  expect(capability).toHaveTextContent('RTOS and bare-metal images are outside the current tooling’s supported scope');
  expect(capability).toHaveTextContent('Mechanism, reachability, and authentication are evaluated as separate claims');
  expect(capability).toHaveTextContent('may involve external models or APIs');
  expect(capability).toHaveTextContent('Development direction');
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

test.each(['research-capability', 'evidence-workflow', 'system-integration', 'engagement-applications', 'research-deliverables'])('deep link #%s preserves hash scrolling', id => {
  window.history.replaceState({}, '', `${route}#${id}`);
  render(<App/>);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById(id));
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test('same-page links preserve navigation and the contact CTA moves focus to the new route', () => {
  render(<App/>);
  const nav = within(screen.getByRole('navigation', { name: 'Firmware capability sections' }));
  fireEvent.click(nav.getByRole('link', { name: 'From hypothesis to evidence' }));
  expect(window.location.hash).toBe('#evidence-workflow');
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(document.getElementById('evidence-workflow'));
  fireEvent.click(screen.getByRole('link', { name: /Discuss a Research Engagement/ }));
  expect(window.location.pathname).toBe('/contact');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(document.title).toBe('Contact — IKELOS Group');
});

test('homepage spotlight sits between pathways and the sample and navigates to the capability', () => {
  window.history.replaceState({}, '', '/');
  render(<App/>);
  const spotlight = screen.getByRole('region', { name: /Find the path.\s*Prove the behavior./ });
  const pathways = screen.getByRole('region', { name: /Start with the decision.\s*Scope the research./ });
  expect(pathways.compareDocumentPosition(spotlight) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(spotlight.compareDocumentPosition(document.getElementById('sample-deliverable')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  fireEvent.click(within(spotlight).getByRole('link'));
  expect(window.location.pathname).toBe(route);
  expect(screen.getByRole('main')).toHaveFocus();
});

test('hardware and research tooling disciplines and footer expose the capability', () => {
  window.history.replaceState({}, '', '/services');
  render(<App/>);
  const hardware = screen.getByRole('heading', { name: 'Hardware and firmware' }).closest('article');
  const tooling = screen.getByRole('heading', { name: 'Research tooling and test platforms' }).closest('article');
  for (const article of [hardware, tooling]) expect(within(article).getByRole('link')).toHaveAttribute('href', route);
  expect(within(screen.getByRole('navigation', { name: 'Footer navigation' })).getByRole('link', { name: 'Firmware & emulation' })).toHaveAttribute('href', route);
});
