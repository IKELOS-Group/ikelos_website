import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  ['System security analysis', 'Understand the system’s purpose, dependencies, and security assumptions to identify the questions that matter.', 'System models and prioritized research questions.', 'analysis'],
  ['Vulnerability research', 'Investigate hardware, firmware, protocols, and control logic under defined access and operating conditions.', 'Reproducible evidence of exploitability, prerequisites, and limits.', 'research'],
  ['Engineering advisory', 'Use technical evidence to guide architecture, integration, remediation, and verification decisions.', 'Engineering recommendations and retest criteria.', 'consulting'],
];

const triggers = [
  ['Deployment decisions', 'Establish what could compromise the intended operation before deployment.'],
  ['System integration or acceptance', 'Test interfaces, dependencies, and operating assumptions as the parts come together.'],
  ['Unresolved security assumptions', 'Investigate uncertainty before it becomes a design commitment.'],
  ['Remediation priorities', 'Identify changes that address the operational consequence and how to verify them.'],
];

export default function Home() {
  return <>
    <section className="home-hero wrap">
      <div className="hero-copy">
        <h1>Understand how your system can be exploited—and what that means for operation.</h1>
        <p className="hero-description">IKELOS Group starts with system purpose, operating constraints, and dependencies. This top-down, target-agnostic approach directs vulnerability research into the relevant implementation and connects technical findings to engineering decisions.</p>
        <Link className="button" to="/contact">Discuss an engagement</Link>
      </div>
    </section>

    <section className="section wrap" aria-labelledby="services-title">
      <h2 id="services-title">Services</h2>
      <div className="service-grid">{services.map(([title, description, output, id]) => <article key={id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p><strong>Output:</strong> {output}</p>
        <Link className="text-link" to={`/services#${id}`}>Explore {title.toLowerCase()}</Link>
      </article>)}</div>
    </section>

    <section className="section wrap content-section" aria-labelledby="triggers-title">
      <h2 id="triggers-title">Reasons to engage</h2>
      <ul className="engagement-reasons">{triggers.map(([title, copy]) => <li key={title}><strong>{title}.</strong> {copy}</li>)}</ul>
    </section>

    <section className="section wrap content-section maritime-preview" aria-labelledby="maritime-title">
      <h2 id="maritime-title">Maritime example: navigation confidence</h2>
      <div className="prose">
        <p className="scenario-label">Hypothetical scenario</p>
        <p>Invalid GPS-derived input places an Electronic Chart Display and Information System (ECDIS) into an unexpected state, undermining crew confidence without root or administrator access. The system includes the crew’s interpretation and reliance on the information. This hypothetical scenario illustrates analytical reasoning; it is not an IKELOS customer engagement or a verified finding.</p>
        <Link className="text-link" to="/about#walkthrough">Follow the maritime walkthrough</Link>
      </div>
    </section>

    <section className="section wrap content-section" aria-labelledby="partner-title">
      <h2 id="partner-title">Specialist delivery partnership</h2>
      <div className="prose">
        <p>IKELOS can own a defined research workstream within your broader engagement, from system modeling and research planning through implementation investigation and validation, producing evidence for your engineering and stakeholder deliverables.</p>
        <Link className="text-link" to="/services#partner">Explore specialist partnership</Link>
      </div>
    </section>
  </>;
}
