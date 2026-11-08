import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import FirmwareEmulation from './components/FirmwareEmulation';
import { Link } from 'react-router-dom';
import './index.css';
import './components/BuyerPositioning.css';

const pageMeta = {
  '/': ['First Principles. Decisive Effects.', 'IKELOS investigates system-level weaknesses and produces evidence for deployment, acceptance, remediation, and mission-risk decisions. Scope a technical investigation.'],
  '/services': ['Capabilities', 'System security analysis, vulnerability research, and engineering advisory. Engage IKELOS as a specialist delivery partner for a defined research workstream.'],
  '/about': ['Approach', 'How an IKELOS engagement works: scope, authorization, access, test boundaries, evidence, stakeholder decisions, and retesting. Review our evidence policy.'],
  '/contact': ['Contact', 'Scope a technical investigation or specialist partnership with IKELOS Group. Review engagement preparation and encrypted correspondence instructions.'],
  '/capabilities/firmware-emulation': ['Firmware Vulnerability Research & System Emulation', 'Connect firmware vulnerability discovery, controlled execution, and system-theoretic security research with IKELOS. Inspect evidence, defined fidelity, and engineering implications.'],
};

function PageShell() {
  const { pathname, hash } = useLocation();
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
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <main id="main-content" tabIndex="-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/capabilities/firmware-emulation" element={<FirmwareEmulation />} />
        <Route path="*" element={<section className="page-hero wrap"><h1>Page not found</h1><Link className="text-link" to="/">Return home</Link></section>} />
      </Routes>
    </main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><PageShell /></BrowserRouter>;
}
