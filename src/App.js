import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Practices from './components/Practices';
import Products from './components/Products';
import Engagements from './components/Engagements';
import Contact from './components/Contact';
import { Link } from 'react-router-dom';
import './index.css';
import './components/BuyerPositioning.css';
import './components/ResearchRedesign.css';
import './components/MissionRedesign.css';

const pageMeta = {
  '/': ['Cyberwarfare R&D for OT and cyber-physical systems', 'IKELOS Group supports the warfighter and protects critical civilian operations through Exquisite Access Development, Systems Behavior Validation and Survivability Testing, and Cyber Effects Development and Validation.'],
  '/practices': ['Three research practices', 'Three specializations in operational technology and complex cyber-physical systems: access development, systems survivability testing, and cyber effects validation.'],
  '/services': ['Three research practices', 'Explore IKELOS research practices, technical methods, and specialist delivery partnerships.'],
  '/practices/exquisite-access-development': ['Exquisite Access Development', 'Authorized research into unfamiliar OT and cyber-physical systems. Scope access feasibility, foreign materiel exploitation, controlled demonstrations, and evidence.'],
  '/practices/systems-behavior-validation-survivability-testing': ['Systems Behavior Validation and Survivability Testing', 'Test critical functions, degraded operation, and recovery under defined conditions in operational technology and complex cyber-physical systems.'],
  '/practices/cyber-effects-development-validation': ['Cyber Effects Development and Validation', 'Develop and measure a specified cyber effect in an authorized laboratory. Explicit prerequisites, controlled demonstrations, and bounded evidence.'],
  '/engagements': ['For prime partners and government', 'Scope specialist OT and cyber-physical research for prime contractor partnerships and government evaluation: technical fit, evidence, milestones, and acquisition requirements.'],
  '/products': ['Research foundations', 'PHOBETOR and VEILTRACE research foundations: embedded implementation, controlled environments, demonstrated basis, and proposed development.'],
  '/products/phobetor': ['PHOBETOR', 'Full-system emulation and vulnerability discovery research direction, building on a bounded embedded Linux workflow. Explicit maturity and target-specific engineering requirements.'],
  '/products/veiltrace': ['VEILTRACE', 'Threat-representative test environment research. Initial Ludus configuration feasibility, proposed hybrid OT and scale research, and explicit model limits.'],
  '/about': ['How we work', 'Scope, written authorization, safe test boundaries, evidence, reporting, and retesting for IKELOS research engagements.'],
  '/contact': ['Discuss a research engagement', 'Start with a non-sensitive research introduction. Agree scope, handling requirements, and approved channels before sharing technical material.'],
};

function PageShell() {
  const { pathname, search, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const [title, description] = pageMeta[pathname.replace(/\/$/, '') || '/'] || ['Page not found', 'Find your way back to IKELOS Group.'];
    document.title = `${title} — IKELOS Group`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${title} — IKELOS Group`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else if (previousPath.current !== pathname) {
      window.scrollTo(0, 0);
    }
    if (previousPath.current !== pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname, hash]);
  if (pathname === '/' && hash === '#research-methodology') return <Navigate replace to="/about#research-methodology"/>;
  if (pathname === '/capabilities/firmware-emulation' || pathname === '/capabilities/firmware-emulation/') return <Navigate replace to={{ pathname: '/products/phobetor', search, hash }}/>;
  if (pathname.replace(/\/$/, '') === '/practices/ot-behavior-validation-survivability') return <Navigate replace to={{ pathname: '/practices/systems-behavior-validation-survivability-testing', search, hash }}/>;
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex="-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Practices />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/practices/exquisite-access-development" element={<Practices kind="access" />} />
        <Route path="/practices/systems-behavior-validation-survivability-testing" element={<Practices kind="ot" />} />
        <Route path="/practices/cyber-effects-development-validation" element={<Practices kind="effects" />} />
        <Route path="/engagements" element={<Engagements />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/phobetor" element={<Products product="phobetor" />} />
        <Route path="/products/veiltrace" element={<Products product="veiltrace" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<section className="page-hero wrap"><h1>Page not found</h1><Link className="text-link" to="/">Return home</Link></section>} />
      </Routes>
    </main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><PageShell /></BrowserRouter>;
}
