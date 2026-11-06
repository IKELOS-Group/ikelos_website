import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from './Motion';
import { ReactComponent as Sigil } from '../assets/systems-sigil.svg';

export default function Hero() {
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (reduced) return undefined;
    const timer = setTimeout(() => setSettled(true), 3100);
    return () => clearTimeout(timer);
  }, [reduced]);
  return <section className={`home-hero${settled || reduced ? ' is-settled' : ' is-intro'}`} aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true">
      <div className="hero-grid" />
      <svg className="hero-orbits" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor"><ellipse cx="1010" cy="425" rx="510" ry="318" transform="rotate(-28 1010 425)"/><ellipse cx="1010" cy="425" rx="430" ry="266" transform="rotate(-28 1010 425)"/><path d="M0 810 1440 80M0 830 1440 100M180 0v960M1240 0v960M0 425h1440"/><path className="hero-signal" d="m140 800 770-444 350-201"/></g></svg>
      <div className="hero-sigil"><img className="sigil-depth" src="/brand/emblem-dark.svg" alt=""/><Sigil className="sigil-face" aria-hidden="true" focusable="false" /></div>
      <span className="hero-coordinate">SYSTEMS / INTERFACES / CONSEQUENCES</span>
    </div>
    <div className="hero-content wrap">
      <p className="eyebrow">Systems security engineering &amp; vulnerability research</p>
      <h1 id="hero-title">First Principles.<br/><span>Decisive Effects.</span></h1>
      <div className="hero-bottom"><p>IKELOS investigates the system-level weaknesses that component assessments can miss. We model critical functions and control relationships, test the hardware, firmware, protocols, and software that enforce them, and produce evidence for deployment, remediation, and mission-risk decisions.</p>
        <div className="hero-actions"><Link className="button" to="/contact">Scope a technical investigation <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/services">Explore capabilities <span aria-hidden="true">↗</span></Link></div>
      </div>
    </div>
    <div className="hero-edge wrap"><span>Research from first principles</span>{!settled && !reduced ? <button className="skip-animation" onClick={() => setSettled(true)}>Skip animation <span aria-hidden="true">→</span></button> : <a href="#research-narrative">When to engage <span aria-hidden="true">↓</span></a>}</div>
  </section>;
}
