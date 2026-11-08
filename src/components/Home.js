import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import ResearchNarrative from './ResearchNarrative';
import SystemsModel from './SystemsModel';
import CapabilityArt from './CapabilityArt';
import { EvidencePackage } from './Shared';
import FirmwareSpotlight from './FirmwareSpotlight';

const services = [
  ['System security analysis', 'Decide what needs to be tested.', 'For an architecture, integration, or acceptance decision with unresolved security assumptions.', 'System model, assumption register, and prioritized research plan.', 'analysis'],
  ['Vulnerability research', 'Establish what the implementation permits.', 'For a suspected attack path or a component weakness whose system-level effect is unclear.', 'Documented test conditions, evidence, hypothesis status, and consequence analysis.', 'research'],
  ['Engineering advisory', 'Choose the response. Verify the change.', 'For deployment, remediation, or risk decisions that need technical interpretation and retest criteria.', 'Decision brief, engineering options, residual uncertainty, and verification priorities.', 'consulting'],
];

export default function Home() {
  return <>
    <Hero/><ResearchNarrative/><SystemsModel/>
    <section className="capability-preview section wrap" aria-labelledby="services-title">
      <div className="section-heading"><p className="eyebrow">03 / Engagement pathways</p><h2 id="services-title">Start with the decision.<br/>Scope the research.</h2></div>
      <div className="service-grid">{services.map(([title, heading, when, output, id],i) => <article key={id}><CapabilityArt kind={i}/><p className="label">0{i+1} / {title}</p><h3>{heading}</h3><p>{when}</p><p className="pathway-output"><strong>What you receive</strong>{output}</p><Link className="text-link" to={`/services#${id}`}>Explore {title.toLowerCase()} <span aria-hidden="true">↗</span></Link></article>)}</div>
    </section>
    <FirmwareSpotlight/>
    <section id="sample-deliverable" className="evidence-section" aria-labelledby="outputs-title"><div className="wrap">
      <div className="sample-intro"><div><p className="eyebrow">05 / Inspect the deliverable</p><h2 id="outputs-title">Evidence you can<br/>make a decision with.</h2></div><p>Trace an engineering question from an assumption register to a decision and retest criteria. This sample shows the structure of an evidence package; engagement scope determines the records and supporting artifacts delivered.</p></div>
      <EvidencePackage/>
      <Link className="text-link sample-policy-link" to="/about#evidence-policy">Read our evidence policy <span aria-hidden="true">↗</span></Link>
    </div></section>
    <section className="organization-section section wrap" aria-labelledby="organization-title"><div><p className="eyebrow">06 / Working with the firm</p><h2 id="organization-title">IKELOS Group, LLC</h2><p>Scope a direct investigation or a defined research workstream within a broader program.</p></div><div><dl className="organization-facts"><div><dt>Company contact</dt><dd><a href="mailto:info@ikelosgroup.com">info@ikelosgroup.com</a></dd></div><div><dt>Engagement preparation</dt><dd>Align objectives, authorization, access, handling requirements, and deliverables before technical work begins.</dd></div></dl><Link className="text-link" to="/about">Review engagement governance <span aria-hidden="true">↗</span></Link></div></section>
    <section className="engage-section wrap" aria-labelledby="partner-title"><p className="eyebrow">07 / Scope the investigation</p><h2 id="partner-title">An unresolved assumption.<br/>A defensible decision.</h2><div className="engage-bottom"><p>IKELOS turns unresolved system-security assumptions into bounded research questions, experimental evidence, and defensible engineering decisions. Start with the decision ahead, the system involved, and the uncertainty that matters.</p><div><Link className="button" to="/contact">Scope a technical investigation <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/services#partner">Explore specialist partnership <span aria-hidden="true">↗</span></Link></div></div></section>
  </>;
}
