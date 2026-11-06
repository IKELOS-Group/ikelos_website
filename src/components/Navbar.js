import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const dismiss = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const outside = event => { if (!header.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);
  return <header className="site-header" ref={header}>
    <div className="header-inner wrap">
      <Link className="wordmark" to="/" aria-label="IKELOS Group home" onClick={() => setOpen(false)}>
        <Brand />
      </Link>
      <button className="menu-toggle" ref={toggle} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
        <NavLink to="/services" onClick={() => setOpen(false)}>Capabilities</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>Approach</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
      </nav>
    </div>
  </header>;
}
