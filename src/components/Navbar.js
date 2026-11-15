import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { practices } from './ResearchFoundation';

const links = [['/practices','Practices'],['/products','Research foundations'],['/engagements','For partners'],['/about','Approach']];
const mobileGroups = [
  ['Research practices', practices.map(p=>[p.path,p.title])],
  ['Research foundations', [['/products/phobetor','PHOBETOR'],['/products/veiltrace','VEILTRACE']]],
  ['Work with IKELOS', [['/engagements','For primes and government'],['/about','How we work'],['/contact','Discuss a research engagement']]],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  const dialog = useRef(null);
  const navigating = useRef(false);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const sentinel = document.getElementById('header-sentinel');
    if (!window.IntersectionObserver || !sentinel) { setScrolled(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { setOpen(false); }, [pathname, hash]);
  useLayoutEffect(() => {
    if (!open) return undefined;
    navigating.current = false;
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const scrollY = window.scrollY;
    const toggleButton = toggle.current;
    const original = { overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = 'hidden';
    main?.setAttribute('inert', ''); footer?.setAttribute('inert', '');
    dialog.current?.querySelector('button')?.focus();
    const keyboard = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const items = [...dialog.current.querySelectorAll('a,button')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const resize = () => { if (window.innerWidth > 760) setOpen(false); };
    document.addEventListener('keydown', keyboard);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('keydown', keyboard); window.removeEventListener('resize', resize);
      Object.assign(document.body.style, original);
      main?.removeAttribute('inert'); footer?.removeAttribute('inert');
      if (!navigating.current) { toggleButton?.focus(); window.scrollTo(0, scrollY); }
    };
  }, [open]);
  const navigate = () => { navigating.current = true; setOpen(false); };
  return <>
    <div id="header-sentinel" aria-hidden="true"/>
    <header className={`site-header${scrolled || pathname !== '/' ? ' header-solid' : ''}`}>
      <div className="header-inner wrap">
        <Link className="wordmark" to="/" aria-label="IKELOS Group home"><Brand /></Link>
        <nav className="primary-nav" aria-label="Main navigation">{links.map(([to,label]) => <NavLink key={to} to={to}>{label}</NavLink>)}<NavLink className="nav-engage" to="/contact">Engage →</NavLink></nav>
        <button className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls={open ? 'mobile-menu' : undefined} aria-haspopup="dialog" onClick={() => setOpen(true)}>Menu <span aria-hidden="true">+</span></button>
      </div>
    </header>
    {open && <div className="menu-overlay" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" ref={dialog}>
      <div className="menu-top"><span className="label">IKELOS / Navigation</span><button className="menu-close" onClick={() => setOpen(false)}>Close <span aria-hidden="true">×</span></button></div>
      <nav className="mobile-directory" aria-label="Mobile navigation">{mobileGroups.map(([heading,items])=><div key={heading}><p className="label">{heading}</p>{items.map(([to,label])=><NavLink key={to} to={to} onClick={navigate}>{label}<span aria-hidden="true">→</span></NavLink>)}</div>)}</nav>
      <div className="menu-bottom"><p>First Principles.<br/>Decisive Effects.</p><a href="mailto:info@ikelosgroup.com">info@ikelosgroup.com</a></div>
    </div>}
  </>;
}
