import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  document.head.innerHTML = '<meta name="description" content="">';
});

test('home introduces both offerings and provides a working engagement path', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Look deeper.Know more.');
  expect(screen.getByRole('heading', { name: /bespoke vulnerability research/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /cybersecurity consulting/i })).toBeInTheDocument();
  fireEvent.click(within(screen.getByRole('main')).getAllByRole('link', { name: /discuss an engagement/i })[0]);
  expect(window.location.pathname).toBe('/contact');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Begin witha conversation.');
  expect(screen.getByRole('main')).toHaveFocus();
  expect(document.title).toBe('Contact — IKELOS Group');
});

test.each([
  ['/services', 'Specific questions.Focused expertise.', 'Capabilities'],
  ['/about', 'Deliberate by design.Specific by scope.', 'Approach'],
  ['/contact', 'Begin witha conversation.', 'Contact'],
])('direct entry to %s renders its own content and metadata', (path, heading, title) => {
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  expect(document.title).toBe(`${title} — IKELOS Group`);
  expect(document.querySelector('meta[name="description"]').content.length).toBeGreaterThan(40);
});

test('mobile menu exposes state, closes on Escape, and closes after navigation', async () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: /menu/i });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('is-open');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
  fireEvent.click(toggle);
  fireEvent.click(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Capabilities' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Specific questions.');
});

test('research link lands at its section without a subsequent scroll reset', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /01 \/ research/i }));
  expect(window.location.pathname).toBe('/services');
  expect(window.location.hash).toBe('#research');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(window.scrollTo).not.toHaveBeenCalled();
});

test('contact provides general email and PGP contact with the public key and fingerprint', () => {
  window.history.replaceState({}, '', '/contact');
  render(<App />);
  const main = screen.getByRole('main');
  expect(within(main).getByRole('link', { name: /info@ikelosgroup.com/i })).toHaveAttribute('href', 'mailto:info@ikelosgroup.com');
  expect(within(main).getByRole('link', { name: /secure_email@ikelosgroup.com/i })).toHaveAttribute('href', 'mailto:secure_email@ikelosgroup.com');
  const keyLink = within(main).getByRole('link', { name: /download public PGP key/i });
  expect(keyLink).toHaveAttribute('href', '/keys/ikelos-secure-email.asc');
  expect(keyLink).toHaveAttribute('download', 'ikelos-secure-email.asc');
  expect(within(main).getByText('5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3')).toBeInTheDocument();
  expect(within(main).getByText(/does not encrypt your message automatically/i)).toBeInTheDocument();
});

test('unknown routes provide a route home', async () => {
  window.history.replaceState({}, '', '/missing');
  render(<App />);
  expect(document.title).toBe('Page not found — IKELOS Group');
  fireEvent.click(screen.getByRole('link', { name: /return home/i }));
  expect(window.location.pathname).toBe('/');
});
