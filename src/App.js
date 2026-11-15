import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Practices from './components/Practices';
import Products from './components/Products';
import Contact from './components/Contact';
import { Link } from 'react-router-dom';
import './index.css';
import './components/BuyerPositioning.css';
import './components/ResearchRedesign.css';

const pageMeta = {
  '/': ['Applied research for embedded and operational systems', 'IKELOS investigates how complex systems behave to determine what access is possible and which critical functions hold up under stress.'],
  '/practices': ['Research practices', 'Exquisite Access Development and OT Behavior Validation and Survivability: two distinct research outcomes for embedded and operational systems.'],
  '/services': ['Research practices', 'Explore IKELOS research practices, technical methods, and specialist delivery partnerships.'],
  '/practices/exquisite-access-development': ['Exquisite Access Development', 'Tailored access capabilities for unfamiliar or poorly documented systems through foreign materiel exploitation and specialized research.'],
  '/practices/ot-behavior-validation-survivability': ['OT Behavior Validation and Survivability', 'Test critical functions, failure, degraded operation, and recovery under defined conditions with IKELOS.'],
  '/products': ['Research products', 'PHOBETOR and VEILTRACE: research foundations for embedded implementations and complex IT and OT environments.'],
  '/products/phobetor': ['PHOBETOR', 'IKELOS Group’s platform for firmware vulnerability research, controlled execution, and system emulation, with funded RTOS and protocol-based discovery research.'],
  '/products/veiltrace': ['VEILTRACE', 'Dynamic, threat-representative network generation for modeling complex IT and OT environments and analyzing failure states.'],
  '/about': ['How we work', 'Scope, authorization, test boundaries, research methodology, evidence, and retesting for an IKELOS research engagement.'],
  '/contact': ['Discuss a research engagement', 'Start with a non-sensitive description of your research question. Agree scope, handling requirements, and approved channels before sharing technical material.'],
};

function PageShell() {
  const { pathname, search, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const [title, description] = pageMeta[pathname] || ['Page not found', 'Find your way back to IKELOS Group.'];
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
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex="-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Practices />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/practices/exquisite-access-development" element={<Practices kind="access" />} />
        <Route path="/practices/ot-behavior-validation-survivability" element={<Practices kind="ot" />} />
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
