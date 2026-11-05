import React from 'react';
import { Link } from 'react-router-dom';
import { EngagementCTA, ResearchDiagram, SectionLabel } from './Shared';

export default function Home() {
  return <>
    <section className="home-hero wrap">
      <div className="hero-copy"><p className="eyebrow"><span className="square-dot" /><span lang="la">In Silentio, Vincimus</span></p>
        <h1>Look deeper.<br />Know <span className="accent-text">more.</span></h1>
        <p className="hero-descriptor">Bespoke vulnerability research.<br />Cybersecurity consulting.</p>
        <p className="hero-description">For the security questions that need a closer look. Research and advice shaped around your systems, your context, and what you need to understand.</p>
        <div className="hero-actions"><Link className="button" to="/contact">Discuss an engagement <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/services">Explore capabilities <span aria-hidden="true">↓</span></Link></div>
      </div>
      <ResearchDiagram />
      <div className="hero-footnote"><span>IKELOS GROUP / RESEARCH & ADVISORY</span><span>Specific questions. Clear direction.</span></div>
    </section>
    <section className="capabilities-section wrap" aria-labelledby="capabilities-title">
      <div className="section-intro"><SectionLabel number="01">Capabilities</SectionLabel><div><h2 id="capabilities-title">Depth where it matters.</h2><p>Two connected disciplines. Each shaped by the question at hand.</p></div></div>
      <div className="capability-grid">
        <Link to="/services#research" className="capability-card"><div className="card-top"><span className="eyebrow">01 / Research</span><span className="card-arrow" aria-hidden="true">↗</span></div><div className="capability-glyph research-glyph" aria-hidden="true"><span /><span /><span /></div><h3>Bespoke vulnerability<br />research</h3><p>Investigate security weaknesses in the context that matters to you. Focused work starts with a well-defined question.</p><span className="card-link">Explore research <span aria-hidden="true">↗</span></span></Link>
        <Link to="/services#consulting" className="capability-card"><div className="card-top"><span className="eyebrow">02 / Advisory</span><span className="card-arrow" aria-hidden="true">↗</span></div><div className="capability-glyph consulting-glyph" aria-hidden="true"><span /><span /><span /></div><h3>Cybersecurity<br />consulting</h3><p>Bring a security perspective to complex decisions. Advice grounded in your priorities, constraints, and operating context.</p><span className="card-link">Explore consulting <span aria-hidden="true">↗</span></span></Link>
      </div>
    </section>
    <section className="approach-teaser wrap" aria-labelledby="approach-title"><SectionLabel number="02">Our approach</SectionLabel><div><h2 id="approach-title">The work starts<br />with <span className="text-muted">understanding.</span></h2><p>Before an investigation, a conversation. We begin with what you need to know, establish the scope together, and focus the engagement around it.</p><Link className="text-link" to="/about">How we approach the work <span aria-hidden="true">↗</span></Link></div><div className="approach-index" aria-hidden="true"><span>01 <b>Understand</b></span><span>02 <b>Define</b></span><span>03 <b>Investigate</b></span></div></section>
    <EngagementCTA />
  </>;
}
