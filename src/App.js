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
  '/': ['Bespoke vulnerability research & cybersecurity consulting', 'IKELOS Group provides bespoke vulnerability research and cybersecurity consulting. Start a conversation about your security questions.'],
  '/services': ['Capabilities', 'Explore bespoke vulnerability research and cybersecurity consulting from IKELOS Group.'],
  '/about': ['Approach', 'A focused approach to bespoke security work: understand the question, agree the scope, and investigate.'],
  '/contact': ['Contact', 'Discuss a potential engagement with IKELOS Group. Email us to begin a conversation and arrange a suitable communication channel.'],
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
        <Route path="*" element={<section className="page-hero wrap"><p className="eyebrow">404 / Page not found</p><h1>Back to the<br />known terrain.</h1><Link className="button" to="/">Return home <span aria-hidden="true">↗</span></Link></section>} />
      </Routes>
    </main>
    <Footer />
  </>;
}

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><PageShell /></BrowserRouter>;
}
