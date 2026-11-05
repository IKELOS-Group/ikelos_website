import React from 'react';
import { EngagementCTA, SectionLabel } from './Shared';

export default function About() {
  return <>
    <section className="page-hero wrap"><p className="eyebrow">IKELOS GROUP / Approach</p><h1>Deliberate by design.<br /><span className="text-muted">Specific by scope.</span></h1><p className="page-lede">IKELOS Group focuses on bespoke vulnerability research and cybersecurity consulting. The starting point is your question. The work takes shape from there.</p></section>
    <section className="principle-section wrap"><SectionLabel number="01">Perspective</SectionLabel><div><h2>Context before conclusions.</h2><p className="large-copy">Useful security work begins with understanding what matters, and why.</p><p>We take the time to understand the concern behind the brief: the system you are examining, the decision you need to make, or the uncertainty you want to resolve. That context gives the engagement its direction.</p><p>Our public presence describes our work and how to begin a conversation. Engagement-specific details belong in a channel agreed together.</p></div></section>
    <section className="process-section wrap" aria-labelledby="process-title"><div className="section-intro"><SectionLabel number="02">The engagement</SectionLabel><h2 id="process-title">A clear starting point.</h2></div><ol className="process-list"><li><span className="process-number">01</span><h3>Understand the question.</h3><p>Begin with a high-level conversation about your needs, context, and the questions you want the engagement to address.</p></li><li><span className="process-number">02</span><h3>Agree the scope.</h3><p>Define objectives, boundaries, and expected outputs together before the work begins.</p></li><li><span className="process-number">03</span><h3>Focus the work.</h3><p>Carry out the research or consulting against that agreed scope, keeping the original question in view.</p></li></ol></section>
    <EngagementCTA />
  </>;
}
