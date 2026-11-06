import React from 'react';
import { Link } from 'react-router-dom';

const researchTopics = [
  {
    title: 'Hardware and firmware',
    methods: 'Combine black-box investigation and hardware interface characterization with firmware reverse engineering, emulation, fuzzing, and trusted execution environment analysis. Build custom test fixtures and research platforms where the investigation requires them.',
    outputs: 'Interface maps, implementation observations, candidate attack paths, and reproducible evidence for confirmed weaknesses.',
  },
  {
    title: 'Protocol and logic analysis',
    methods: 'Investigate message content, command sequences, timing, state transitions, and implementation logic across OT protocols, including unfamiliar or proprietary implementations. Direct automated discovery with research hypotheses, then validate how candidate paths affect the complete system.',
    outputs: 'Documented states and transitions, reproducible input sequences, and validated logic weaknesses with their prerequisites and limitations.',
  },
  {
    title: 'Cyber-physical implementation',
    methods: 'Investigate interactions among software, communications, controllers, feedback, and physical processes. Examine which commands or component interactions could move a process outside its intended operating constraints, within agreed operating and test boundaries.',
    outputs: 'Control-relationship models, experimentally supported findings where feasible, and analysis of consequences for operation.',
  },
  {
    title: 'Physical-access conditions',
    methods: 'Define physical access assumptions, operating conditions, and validation objectives for deployable systems. Characterize equipment interfaces and investigate the firmware and embedded software reachable through them.',
    outputs: 'An access model, evidence of reachable functionality, and findings that distinguish demonstrated effects from untested possibilities.',
  },
  {
    title: 'Custom tooling and research platforms',
    methods: 'Make unfamiliar or undocumented systems observable and testable with custom reverse engineering and analysis tools, proof-of-concept demonstrations, and research platforms. Foreign materiel exploitation—the technical examination of foreign equipment to understand its operation and security properties—can be part of this work.',
    outputs: 'Research tooling, technical observations, and proof-of-concept results with defined conditions and engineering implications.',
  },
];

export default function Services() {
  return <>
    <section className="page-hero wrap">
      <h1>Capabilities</h1>
      <p className="page-lede">System security analysis, vulnerability research, and engineering advisory for teams making decisions about complex systems. Scope, access, and operating constraints shape the investigation and its deliverables.</p>
      <nav className="page-jump-links" aria-label="Service sections">
        <Link to="#analysis">System security analysis</Link>
        <Link to="#research">Vulnerability research</Link>
        <Link to="#consulting">Engineering advisory</Link>
        <Link to="#partner">Specialist partnership</Link>
      </nav>
    </section>

    <section id="analysis" className="section wrap content-section" aria-labelledby="analysis-title">
      <h2 id="analysis-title">System security analysis</h2>
      <div className="prose">
        <p>Work from system purpose, operating constraints, and unacceptable outcomes through architecture, dependencies, control relationships, security assumptions, and trust boundaries. Develop attack hypotheses around inputs and interactions that could drive the system into unknown or unsafe states.</p>
        <p>Use System-Theoretic Process Analysis for Security (STPA-Sec) where appropriate to prioritize attack paths and connect implementation weaknesses to system-level consequences. Implementation research and validation are needed to establish whether a proposed attack works.</p>
        <p><strong>Outputs:</strong> Security-relevant system and interface models, documented assumptions, prioritized attack hypotheses and research questions, and consequence analysis.</p>
      </div>
    </section>

    <section id="research" className="section wrap content-section" aria-labelledby="research-title">
      <h2 id="research-title">Vulnerability research</h2>
      <div className="prose">
        <p>Follow system-level hypotheses into the implementation to establish exploitability and operational consequences under defined access and test conditions. Confirmed findings, unresolved hypotheses, and coverage limitations are reported distinctly.</p>
        <div className="research-topics">{researchTopics.map(({ title, methods, outputs }) => <article key={title}>
          <h3>{title}</h3>
          <p>{methods}</p>
          <p><strong>Outputs:</strong> {outputs}</p>
        </article>)}</div>
      </div>
    </section>

    <section id="consulting" className="section wrap content-section" aria-labelledby="consulting-title">
      <h2 id="consulting-title">Engineering advisory</h2>
      <div className="prose">
        <p>Examine architecture decisions and security assumptions before implementation. Plan an investigation around the uncertainty that matters, the access available, and the operating constraints.</p>
        <p>Interpret findings in their system context and prioritize changes to design, implementation, integration, or operating controls.</p>
        <p><strong>Outputs:</strong> Investigation plans, operational consequence analysis, prioritized engineering recommendations, a concise decision brief for stakeholders, and retest criteria with the evidence needed to evaluate remediation.</p>
      </div>
    </section>

    <section id="partner" className="section wrap content-section" aria-labelledby="delivery-partner-title">
      <h2 id="delivery-partner-title">Specialist delivery partnership</h2>
      <div className="prose">
        <p>IKELOS can own a defined research workstream within your broader engagement. This arrangement can span system security analysis, vulnerability research, and engineering advisory, producing evidence for your engineering and stakeholder deliverables.</p>
        <p>During scoping, discuss the research questions, access, documentation, and test conditions, along with responsibilities, technical interfaces, reporting, confidentiality, and intellectual property (IP) arrangements.</p>
        <Link className="text-link" to="/contact#partnerships">Discuss a specialist partnership</Link>
      </div>
    </section>
  </>;
}
