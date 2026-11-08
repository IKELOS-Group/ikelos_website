import React from 'react';
import { Link } from 'react-router-dom';
import CapabilityArt from './CapabilityArt';
import { EngagementDecision } from './Shared';

const researchTopics = [
  {
    title: 'Hardware and firmware',
    capability: 'Explore firmware discovery and validation',
    question: 'What can the implementation do that the architecture assumes it cannot?',
    methods: 'Combine black-box investigation and hardware interface characterization with firmware reverse engineering, emulation, and fuzzing. Trace cross-binary vulnerability hypotheses and investigate them through controlled component execution. Build custom test fixtures and research platforms where the investigation requires them.',
    outputs: 'Interface maps, implementation observations, candidate attack paths, and reproducible evidence for confirmed weaknesses.',
    when: 'The behavior or access controls of an embedded component are undocumented, uncertain, or central to a system-security assumption.',
    decision: 'Whether to change an implementation, restrict an interface, or pursue a candidate path with deeper testing.',
  },
  {
    title: 'Protocol and logic analysis',
    question: 'Which messages, sequences, or states cross an assumed boundary?',
    methods: 'Investigate message content, command sequences, timing, state transitions, and implementation logic across OT protocols, including unfamiliar or proprietary implementations. Direct automated discovery with research hypotheses, then validate how candidate paths affect the complete system.',
    outputs: 'Documented states and transitions, reproducible input sequences, and validated logic weaknesses with their prerequisites and limitations.',
    when: 'An integration relies on message validation, ordering, timing, or authorization that has not been tested across relevant states.',
    decision: 'Which protocol checks, state constraints, or integration boundaries need to change before acceptance.',
  },
  {
    title: 'Cyber-physical implementation',
    question: 'How could a control interaction affect the physical process?',
    methods: 'Investigate interactions among software, communications, controllers, feedback, and physical processes. Examine which commands or component interactions could move a process outside its intended operating constraints, within agreed operating and test boundaries.',
    outputs: 'Control-relationship models, experimentally supported findings where feasible, and analysis of consequences for operation.',
    when: 'A software or communications weakness may affect a physical process, but the control effect and operational consequence remain uncertain.',
    decision: 'Whether to constrain operation, change control logic or isolation, or obtain further evidence before deployment.',
  },
  {
    title: 'Physical-access assessment',
    question: 'What functionality becomes reachable under the defined access conditions?',
    methods: 'Define physical access assumptions, operating conditions, and validation objectives for deployable systems. Characterize equipment interfaces and investigate the firmware and embedded software reachable through them.',
    outputs: 'An access model, evidence of reachable functionality, and findings that distinguish demonstrated effects from untested possibilities.',
    when: 'Deployment or maintenance exposes equipment to physical access that the security model assumes is constrained.',
    decision: 'Which interface restrictions, access controls, or equipment-handling measures the deployment requires.',
  },
  {
    title: 'Research tooling and test platforms',
    capability: 'Explore controlled execution and system emulation',
    question: 'What must we build to make this system observable and testable?',
    methods: 'Make unfamiliar or undocumented systems observable and testable with custom reverse engineering and analysis tools, instrumented test fixtures, proof-of-concept demonstrations, and research platforms built around the scoped investigation. Scope bespoke system emulation around explicit fidelity requirements, with original executable components and modeled interfaces where feasible.',
    outputs: 'Research tooling, technical observations, and proof-of-concept results with defined conditions and engineering implications.',
    when: 'Existing tools cannot expose the relevant system behavior or reproduce the conditions needed to test a hypothesis.',
    decision: 'What instrumentation, test environment, and repeatable procedure are needed to resolve the research question and support retesting.',
  },
];

export default function Services() {
  return <>
    <section className="page-hero wrap">
      <p className="eyebrow">Research disciplines / IKELOS Group</p><h1>Capabilities</h1><p className="page-statement">Complex systems.<br/>Specific questions.</p>
      <p className="page-lede">Resolve the uncertainty behind a deployment, acceptance, integration, or remediation decision. Each engagement connects a defined engineering question to the research, evidence, and deliverables needed to act.</p>
      <nav className="page-jump-links" aria-label="Service sections">
        <Link to="#analysis">System security analysis</Link>
        <Link to="#research">Vulnerability research</Link>
        <Link to="#consulting">Engineering advisory</Link>
        <Link to="#partner">Specialist partnership</Link>
      </nav>
    </section>

    <section id="analysis" className="section wrap content-section" aria-labelledby="analysis-title">
      <div><p className="eyebrow">01 / Architecture &amp; assumptions</p><h2 id="analysis-title">System security analysis</h2><CapabilityArt kind={0}/></div>
      <div className="prose">
        <EngagementDecision when="A critical architecture or integration depends on security assumptions that have not been examined across the complete system." decision="Which assumptions require testing, which interfaces need attention, and where to focus the research budget before an acceptance or deployment decision."/>
        <h3 className="engineering-question">Which relationships can produce an unacceptable outcome?</h3><p>Work from system purpose, operating constraints, and unacceptable outcomes through architecture, dependencies, control relationships, security assumptions, and trust boundaries. Develop attack hypotheses around inputs and interactions that could drive the system into unknown or unsafe states.</p>
        <p>Use System-Theoretic Process Analysis for Security (STPA-Sec) where appropriate to examine mission-level losses, control structures, insecure control actions, and causal scenarios. Translate that analysis into prioritized implementation research and validation questions.</p>
        <p><strong>Outputs:</strong> Security-relevant system and interface models, documented assumptions, prioritized attack hypotheses and research questions, and consequence analysis.</p>
      </div>
    </section>

    <section id="research" className="section wrap research-section" aria-labelledby="research-title">
      <p className="eyebrow">02 / Implementation &amp; evidence</p><h2 id="research-title">Vulnerability research</h2>
      <div className="prose">
        <EngagementDecision when="A suspected attack path or a component vulnerability has been identified, but its reachability and effect on the complete system remain uncertain." decision="Whether to block deployment, constrain operation, redesign an interface, accept residual risk, or commission further testing."/>
        <p>Follow system-level hypotheses into the implementation. Establish what the evidence supports about exploitability and operational consequences under defined access and test conditions.</p>
        </div><div className="research-topics">{researchTopics.map(({ title, question, methods, outputs, when, decision, capability }, i) => <article key={title}>
          <CapabilityArt kind={i + 1}/><div><p className="eyebrow">Discipline / 0{i + 1}</p><h3>{title}</h3><p className="engineering-question">{question}</p><EngagementDecision when={when} decision={decision}/><p>{methods}</p><p className="capability-output"><strong>Scoped outputs</strong><br/>{outputs}</p>{capability && <Link className="text-link" to="/capabilities/firmware-emulation">{capability} <span aria-hidden="true">↗</span></Link>}</div>
        </article>)}</div>
    </section>

    <section id="consulting" className="section wrap content-section" aria-labelledby="consulting-title">
      <h2 id="consulting-title">Engineering advisory</h2>
      <div className="prose">
        <EngagementDecision when="An architecture choice, vulnerability finding, or proposed remediation needs to be translated into a program or engineering decision." decision="Which changes to prioritize, which operating constraints to retain, and what evidence is required to verify the response."/>
        <p>Examine architecture decisions and security assumptions before implementation. Plan an investigation around the uncertainty that matters, the access available, and the operating constraints.</p>
        <p>Interpret findings in their system context and prioritize changes to design, implementation, integration, or operating controls.</p>
        <p><strong>Outputs:</strong> Investigation plans, operational consequence analysis, prioritized engineering recommendations, a concise decision brief for stakeholders, and retest criteria with the evidence needed to evaluate remediation.</p>
      </div>
    </section>

    <section id="partner" className="section wrap content-section" aria-labelledby="delivery-partner-title">
      <h2 id="delivery-partner-title">Specialist delivery partnership</h2>
      <div className="prose">
        <EngagementDecision when="Your program or delivery team needs a defined systems-analysis or implementation-research workstream with clear interfaces to the wider effort." decision="How to assign research responsibilities, integrate evidence into program deliverables, and evaluate completion against agreed criteria."/>
        <p>IKELOS can own a defined research workstream within your broader engagement. This arrangement can span system security analysis, vulnerability research, and engineering advisory, producing evidence for your engineering and stakeholder deliverables.</p>
        <p>During scoping, discuss the research questions, access, documentation, and test conditions, along with responsibilities, technical interfaces, reporting, confidentiality, and intellectual property (IP) arrangements.</p>
        <Link className="text-link" to="/contact#partnerships">Discuss a specialist partnership</Link>
      </div>
    </section>
  </>;
}
