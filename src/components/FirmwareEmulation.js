import React from 'react';
import { Link } from 'react-router-dom';
import FirmwareArchitecture from './FirmwareArchitecture';
import FirmwareEvidenceFlow from './FirmwareEvidenceFlow';
import FirmwareSystemModel from './FirmwareSystemModel';
import { researchStages } from './researchMethodology';
import { emulationIntegration } from './firmwareResearch';
import './FirmwareEmulation.css';

const applications = [
  ['Embedded product security assessments', 'Investigate security assumptions in an embedded implementation and define the evidence needed for acceptance or remediation.'],
  ['Firmware vulnerability research', 'Trace candidate weaknesses across components, examine reachability, and scope controlled validation.'],
  ['Supply-chain and procurement investigations', 'Examine available firmware and dependencies to inform technical procurement questions and further verification requirements.'],
  ['Authorized vulnerability discovery programs', 'Conduct scoped discovery and evidence review under defined testing authority and disclosure requirements.'],
  ['Cyber-physical system security assessments', 'Connect implementation questions to control relationships, operating constraints, and system-level security hypotheses.'],
  ['Bespoke research testbeds', 'Engineer emulation environments and instrumentation around the interfaces and behaviors a specific investigation needs to observe.'],
  ['Engineering acceptance and remediation', 'Use documented observations, residual uncertainty, and retest criteria to support an accountable engineering decision.'],
];

const deliverables = [
  'Firmware inventory and program dependency models',
  'Cross-binary vulnerability evidence',
  'Reachability and privilege-context analysis',
  'Reproducible proof-of-concept artifacts where validation succeeds',
  'Execution traces and controlled experiment records',
  'Emulation environments with documented fidelity and limitations',
  'Technical vulnerability reports',
  'Engineering recommendations and retest criteria',
];

export default function FirmwareEmulation() {
  return <div className="firmware-page">
    <section className="page-hero wrap fe-hero" aria-labelledby="firmware-title">
      <p className="eyebrow">01 / Introduction</p>
      <div className="fe-hero-grid"><div>
        <p className="fe-capability-name">Firmware Vulnerability Research &amp; System Emulation</p>
        <h1 id="firmware-title">Find the path.<br/>Prove the behavior.</h1>
        <p className="page-lede">From firmware-level vulnerability discovery to controlled system emulation, IKELOS investigates how implementation weaknesses emerge, how they can be validated, and what they mean for the security of complex cyber-physical systems.</p>
        <Link className="text-link" to="#evidence-workflow">Explore the evidence workflow <span aria-hidden="true">↓</span></Link>
      </div><div className="fe-hero-art"><FirmwareArchitecture/><p>Conceptual architecture / Evidence at every boundary</p></div></div>
      <nav className="page-jump-links" aria-label="Firmware capability sections"><Link to="#research-capability">Research capability</Link><Link to="#evidence-workflow">From hypothesis to evidence</Link><Link to="#system-integration">System-theoretic integration</Link><Link to="#research-deliverables">Deliverables</Link></nav>
    </section>

    <section className="section wrap fe-split" aria-labelledby="analysis-limits-title">
      <div><p className="eyebrow">02 / Why conventional analysis stops short</p><h2 id="analysis-limits-title">A suspicious path is<br/>the beginning.</h2></div>
      <div className="prose"><p>Isolated binary analysis can miss the relationships that make a weakness reachable: a service accepts input, a shared library transforms it, and another component uses it with different privileges. Pattern matches alone do not explain the authentication, state, or execution context along that path.</p><p>Physical hardware may be unavailable. Dependencies may be undocumented. A plausible vulnerability claim may lack enough evidence to reproduce the behavior or establish an exploit mechanism.</p><p>IKELOS connects implementation research to the system-level question. We investigate whether a proposed weakness is reachable, the conditions under which it manifests, and what the observations can support about the larger system.</p><p className="fe-principle">Demonstrated implementation behavior. Modeled system effects. Unverified operational consequences. Each carries a different evidence requirement.</p></div>
    </section>

    <section id="research-capability" className="section wrap" aria-labelledby="research-capability-title">
      <div className="fe-section-intro"><p className="eyebrow">03 / Research capability</p><h2 id="research-capability-title">Inspect the implementation.<br/>Test the relationship.</h2><p>IKELOS provides research services using specialized tooling and controlled research infrastructure. The research question determines the analysis, experiment, and fidelity required.</p></div>
      <div className="fe-scope-strip"><span className="label">Current demonstrated tooling scope</span><p>ELF-based embedded Linux firmware · x86-64 and AArch64 · Cross-binary static analysis · Component-level rehosting · Isolated execution and evidence collection</p></div>
      <div className="fe-pillars">
        <article><p className="label">A / Discover</p><h3>Firmware vulnerability discovery</h3><p>Unpack firmware, inventory executables, and build inspectable program models through Ghidra-backed reverse engineering. Investigate dependencies and source-to-sink dataflow across executables and shared libraries.</p><p>Trace reachability, authentication, and privilege context. Deterministic static analysis supplies the evidence; evidence-constrained AI agents assist investigation and independent adversarial review of candidate findings. Researchers assess the claim and its unresolved assumptions.</p><p className="fe-pillar-output"><strong>Traceable hypotheses</strong>Code references, cross-component relationships, counterarguments, and reproducible evidence packages support structured vulnerability reporting.</p></article>
        <article><p className="label">B / Execute</p><h3>Dynamic execution and validation</h3><p>Rehost selected components and execute original firmware binaries in isolated research environments, without necessarily requiring the physical device. Observe processes, system calls, file changes, responses, and crashes.</p><p>Validation contracts define repeatable experiments. Where necessary and feasible, emulate or simulate unavailable interfaces, documenting their effect on fidelity. Reusable environments can support regression testing and fuzzing.</p><p className="fe-pillar-output"><strong>Bounded demonstrations</strong>A suspected weakness becomes a demonstrated exploit mechanism only when the evidence supports the claimed behavior and prerequisites. Mechanism, reachability, and authentication are evaluated as separate claims. Emulation alone cannot establish real-world exploitability or operational consequences.</p></article>
        <article><p className="label">C / Model · Development direction</p><h3>Bespoke cyber-physical system emulation</h3><p>Develop controlled research environments around firmware and application software, controllers and operating logic, networks and protocols, sensors, actuators, and feedback.</p><p>Represent relevant external dependencies, hardware interfaces, simulated physical processes, operator interactions, and control authority. Combine real executable components with explicitly modeled or simulated elements where the investigation requires them.</p><p className="fe-pillar-output"><strong>Defined fidelity</strong>Target-specific engineering establishes assumptions, instrumentation, and repeatability. Full or faithful emulation is not feasible for every system; experimental claims remain bounded by what the environment represents.</p></article>
      </div>
      <aside className="fe-rtos" aria-labelledby="rtos-title"><div><p className="label">Capability development / Platform-specific research</p><h3 id="rtos-title">Extending the investigation to RTOS environments.</h3></div><div><p>Research directions include RTOS firmware analysis; task scheduling and execution context; memory management and privilege boundaries; inter-task communications; device interfaces and hardware abstractions; interrupt-driven behavior; and timing-sensitive implementation questions.</p><p>RTOS and bare-metal images are outside the current tooling’s supported scope. Platform-specific emulation and instrumentation require additional engineering. Feasibility depends on the operating system, architecture, firmware access, and available hardware information. RTOS support is a development area, not a validated, production-ready, or universally compatible capability.</p></div></aside>
      <p className="fe-handling-note">AI-assisted research uses model calls and may involve external models or APIs. Model hosting, permitted data transfers, and handling requirements must be established during engagement scoping; do not assume all processing occurs locally.</p>
    </section>

    <section id="evidence-workflow" className="section wrap" aria-labelledby="evidence-workflow-title">
      <div className="fe-section-intro"><p className="eyebrow">04 / From hypothesis to evidence</p><h2 id="evidence-workflow-title">Make every claim inspectable.</h2><p>Static analysis proposes a path. A validation contract defines what to test. Controlled execution produces observations for researchers to interpret within the experiment’s limits.</p></div>
      <FirmwareEvidenceFlow/>
    </section>

    <section id="system-integration" className="section wrap" aria-labelledby="system-integration-title">
      <div className="fe-section-intro"><p className="eyebrow">05 / System-theoretic integration</p><h2 id="system-integration-title">A system question.<br/>An implementation investigation.</h2><p>System-theoretic analysis identifies the conditions that matter. Implementation research investigates whether those conditions are possible. Controlled emulation provides an environment to test the evidence.</p></div>
      <div className="fe-integration-grid"><div><FirmwareSystemModel/><div className="fe-hypothesis"><p className="label">Illustrative hypothesis / Unverified</p><p>Could an input accepted across an authority boundary alter a controller’s operating state, and could that state change affect a control action?</p><p>Trace input handling first. Test the implementation under defined conditions. Investigate a control effect only where the environment represents the relevant feedback and operating constraints.</p></div></div><div>
        <p className="fe-method-note">These are IKELOS’s six research stages, informed by STPA-Sec, rather than the official STPA-Sec steps. Emulation supports specific experiments within this broader methodology.</p>
        <ol className="fe-method-stages">{researchStages.map((stage, i) => <li key={stage.title}><span aria-hidden="true">0{i + 1}</span><div><h3>{stage.title}</h3><p>{emulationIntegration[i]}</p></div></li>)}</ol>
        <Link className="text-link" to="/#research-methodology">Explore the broader research methodology <span aria-hidden="true">↗</span></Link>
      </div></div>
      <div className="fe-evidence-boundary"><strong>Keep the causal links separate.</strong><p>STPA-Sec structures system-level security reasoning; it is not an automated vulnerability scanner. A reproduced implementation behavior may inform a control hypothesis. A simulated control effect does not establish a real-world mission consequence; that claim requires additional evidence from the relevant system and operating conditions.</p></div>
    </section>

    <section id="engagement-applications" className="section wrap fe-split" aria-labelledby="applications-title"><div><p className="eyebrow">06 / Engagement applications</p><h2 id="applications-title">Scope the uncertainty<br/>that matters.</h2><p className="fe-section-note">Existing tooling supports the embedded Linux scope described above. RTOS investigations and expanded system emulation require feasibility review and additional engineering; they are not standard features available for every target.</p></div><div className="fe-applications">{applications.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section id="research-deliverables" className="section wrap fe-split" aria-labelledby="deliverables-title"><div><p className="eyebrow">07 / Research deliverables</p><h2 id="deliverables-title">Evidence for the<br/>engineering decision.</h2><p className="fe-section-note">Deliverables follow the agreed research scope. An engagement may produce supported findings, bounded negative results, or unresolved hypotheses. Vulnerability discovery and successful proof-of-concept reproduction are not guaranteed.</p><Link className="text-link" to="/about#evidence-policy">Review our evidence policy <span aria-hidden="true">↗</span></Link></div><ul className="fe-deliverables">{deliverables.map((item, i) => <li key={item}><span aria-hidden="true">0{i + 1}</span>{item}</li>)}</ul></section>

    <section className="engage-section wrap fe-cta" aria-labelledby="firmware-engage-title"><p className="eyebrow">08 / Define the investigation</p><h2 id="firmware-engage-title">Have a system that<br/>doesn't fit the scanner?</h2><div className="engage-bottom"><p>Bring us the firmware, architecture, or research question. We'll help define the evidence required to understand the implementation and assess the security-relevant behavior.</p><Link className="button" to="/contact">Discuss a Research Engagement <span aria-hidden="true">↗</span></Link></div></section>
  </div>;
}
