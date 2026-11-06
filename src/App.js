import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import { Link } from 'react-router-dom';
import './index.css';

const pageMeta = {
  '/': ['System exploitability & operational consequences', 'Understand system exploitability and operational consequences with IKELOS Group. System security analysis, vulnerability research, and engineering advisory.'],
  '/services': ['Capabilities', 'System security analysis, vulnerability research, and engineering advisory. Engage IKELOS as a specialist delivery partner for a defined research workstream.'],
  '/about': ['Approach', 'A top-down, target-agnostic practice connecting system models, implementation research, and validated evidence to operational consequences and engineering decisions.'],
  '/contact': ['Contact', 'Discuss an engagement or specialist delivery partnership with IKELOS Group. Review our initial workflow and access encrypted PGP correspondence.'],
};

function PageShell() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const [title, description] = pageMeta[pathname] || ['Page not found', 'Find your way back to IKELOS Group.'];
    document.title = `${title} — IKELOS Group`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
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
        <Route path="*" element={<section className="page-hero wrap"><h1>Page not found</h1><Link className="text-link" to="/">Return home</Link></section>} />
      </Routes>
    </main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><PageShell /></BrowserRouter>;
}
