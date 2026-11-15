import React from 'react';
import { Link } from 'react-router-dom';
import FirmwareArchitecture from './FirmwareArchitecture';
import FirmwareEvidenceFlow from './FirmwareEvidenceFlow';
import FirmwareSystemModel from './FirmwareSystemModel';
import { researchStages } from './researchMethodology';
import { emulationIntegration } from './firmwareResearch';
import { accessPath, otPath } from './ResearchFoundation';
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

export default function Phobetor() {
  return <div className="product-page firmware-page phobetor-page">
    <section className="page-hero wrap fe-hero" aria-labelledby="firmware-title">
      <Link className="eyebrow breadcrumb" to="/products">Research products / IKELOS Group</Link>
      <div className="fe-hero-grid"><div>
        <h1 id="firmware-title">PHOBETOR</h1>
        <p className="product-statement">Full-system emulation.<br/>Vulnerability discovery.</p>
        <p className="page-lede">PHOBETOR is IKELOS Group’s platform for firmware vulnerability research and system emulation. We connect cross-binary analysis, controlled execution, and system-level investigation to evidence an engineer can inspect and reproduce.</p>
        <p className="fe-development-summary">Operated by IKELOS Group, with funded research into RTOS support and protocol-based vulnerability discovery.</p>
        <div className="fe-hero-actions"><Link className="button" to="/contact?practice=phobetor">Discuss a research engagement <span aria-hidden="true">↗</span></Link><Link className="text-link" to="#evidence-workflow">Explore the evidence workflow <span aria-hidden="true">↓</span></Link></div>
      </div><div className="fe-hero-art"><FirmwareArchitecture/><p>Conceptual architecture / Evidence at every boundary</p></div></div>
      <nav className="page-jump-links" aria-label="PHOBETOR sections"><Link to="#research-capability">Research capability</Link><Link to="#funded-research">Funded research</Link><Link to="#evidence-workflow">From hypothesis to evidence</Link><Link to="#system-integration">System-theoretic integration</Link><Link to="#research-deliverables">Deliverables</Link></nav>
    </section>

    <section className="section wrap fe-split" aria-labelledby="analysis-limits-title">
      <div><p className="eyebrow">01 / The research question</p><h2 id="analysis-limits-title">Find the path.<br/>Prove the behavior.</h2></div>
      <div className="prose"><p>Isolated binary analysis can miss the relationships that make a weakness reachable: a service accepts input, a shared library transforms it, and another component uses it with different privileges. Pattern matches alone do not explain the authentication, state, or execution context along that path.</p><p>Physical hardware may be unavailable. Dependencies may be undocumented. A plausible vulnerability claim may lack enough evidence to reproduce the behavior or establish an exploit mechanism.</p><p>IKELOS connects implementation research to the system-level question. We investigate whether a proposed weakness is reachable, the conditions under which it manifests, and what the observations can support about the larger system.</p><p className="fe-principle">Demonstrated implementation behavior. Modeled system effects. Unverified operational consequences. Each carries a different evidence requirement.</p></div>
    </section>

    <section id="research-capability" className="section wrap" aria-labelledby="research-capability-title">
      <div className="fe-section-intro"><p className="eyebrow">02 / PHOBETOR capabilities</p><h2 id="research-capability-title">Inspect the implementation.<br/>Test the relationship.</h2><p>IKELOS Group operates PHOBETOR within scoped research engagements. The research question determines the analysis, experiment, and fidelity required.</p></div>
      <div id="research-basis" className="fe-scope-strip"><span className="label">Current firmware workflow</span><p>ELF-based embedded Linux firmware · x86-64 and AArch64 · Cross-binary static analysis · Component-level rehosting · Isolated execution and evidence collection</p></div>
      <div className="fe-pillars">
        <article><p className="label">A / Discover</p><h3>Firmware vulnerability discovery</h3><p>Unpack firmware, inventory executables, and build inspectable program models through Ghidra-backed reverse engineering. Investigate dependencies and source-to-sink dataflow across executables and shared libraries.</p><p>Trace reachability, authentication, and privilege context. Deterministic static analysis supplies the evidence; evidence-constrained AI agents assist investigation and independent adversarial review of candidate findings. Researchers assess the claim and its unresolved assumptions.</p><p className="fe-pillar-output"><strong>Traceable hypotheses</strong>Code references, cross-component relationships, counterarguments, and reproducible evidence packages support structured vulnerability reporting.</p></article>
        <article><p className="label">B / Execute</p><h3>Dynamic execution and validation</h3><p>Rehost selected components and execute original firmware binaries in isolated research environments, without necessarily requiring the physical device. Observe processes, system calls, file changes, responses, and crashes.</p><p>Validation contracts define repeatable experiments. Where necessary and feasible, emulate or simulate unavailable interfaces, documenting their effect on fidelity. Reusable environments can support regression testing and fuzzing.</p><p className="fe-pillar-output"><strong>Bounded demonstrations</strong>A suspected weakness becomes a demonstrated exploit mechanism only when the evidence supports the claimed behavior and prerequisites. Mechanism, reachability, and authentication are evaluated as separate claims. Emulation alone cannot establish real-world exploitability or operational consequences.</p></article>
        <article><p className="label">C / Model · Target-specific engineering</p><h3>Full-system &amp; cyber-physical emulation</h3><p>Engineer controlled research environments around firmware and application software, controllers and operating logic, networks and protocols, sensors, actuators, and feedback.</p><p>Represent relevant external dependencies, hardware interfaces, simulated physical processes, operator interactions, and control authority. Combine real executable components with explicitly modeled or simulated elements where the investigation requires them.</p><p className="fe-pillar-output"><strong>Defined fidelity</strong>Target-specific engineering establishes assumptions, instrumentation, and repeatability. Full or faithful emulation is not feasible for every system; experimental claims remain bounded by what the environment represents.</p></article>
      </div>
      <p className="fe-handling-note">AI-assisted research may involve external models or APIs. Model hosting, permitted data transfers, retention, and handling requirements are established during engagement scoping. <Link to="/contact#handling">Review engagement preparation ↗</Link></p>
    </section>

    <section id="funded-research" className="deliverable-band phobetor-research" aria-labelledby="funded-research-title"><div className="wrap">
      <div className="fe-section-intro"><p className="eyebrow">03 / IKELOS-funded development</p><h2 id="funded-research-title">Extend the platform.<br/>Expand the investigation.</h2><p>IKELOS Group funds PHOBETOR’s expansion into RTOS support and protocol-based vulnerability discovery. Both research programs build on the platform’s analysis, controlled execution, and evidence workflow.</p></div>
      <div className="fe-research-programs">
        <article id="rtos-research" aria-labelledby="rtos-title"><p className="label">01 / Funded research</p><h3 id="rtos-title">RTOS support</h3><p>Extend firmware investigation into real-time operating systems, where task scheduling, interrupts, and hardware interfaces shape execution.</p><ul><li>Task execution, memory management, and privilege boundaries.</li><li>Inter-task communication, device interfaces, and hardware abstractions.</li><li>Platform-specific emulation, instrumentation, and timing-sensitive behavior.</li></ul><p className="fe-research-status"><strong>In development.</strong> RTOS support requires platform-specific research and validation. RTOS and bare-metal images remain outside the current embedded Linux workflow; feasibility depends on the architecture, firmware access, and hardware information.</p></article>
        <article id="protocol-research" aria-labelledby="protocol-title"><p className="label">02 / Funded research</p><h3 id="protocol-title">Protocol-based vulnerability discovery</h3><p>Develop discovery methods around the messages, sequences, and states that connect an exposed interface to firmware behavior.</p><ul><li>Message parsing, input handling, and authentication boundaries.</li><li>State transitions, command sequences, and timing assumptions.</li><li>Protocol-aware fuzzing and repeatable traffic experiments linked to execution evidence.</li></ul><p className="fe-research-status"><strong>In development.</strong> Protocol coverage and test harnesses are established per investigation. Research aims to connect candidate weaknesses to reproducible behavior under defined conditions.</p></article>
      </div>
    </div></section>

    <section id="evidence-workflow" className="section wrap" aria-labelledby="evidence-workflow-title">
      <div className="fe-section-intro"><p className="eyebrow">04 / From hypothesis to evidence</p><h2 id="evidence-workflow-title">Make every claim inspectable.</h2><p>Static analysis proposes a path. A validation contract defines what to test. Controlled execution produces observations for researchers to interpret within the experiment’s limits.</p></div>
      <FirmwareEvidenceFlow/>
    </section>

    <section id="system-integration" className="section wrap" aria-labelledby="system-integration-title">
      <div className="fe-section-intro"><p className="eyebrow">05 / System-theoretic integration</p><h2 id="system-integration-title">A system question.<br/>An implementation investigation.</h2><p>System-theoretic analysis identifies the conditions that matter. Implementation research investigates whether those conditions are possible. Controlled emulation provides an environment to test the evidence.</p></div>
      <div className="fe-integration-grid"><div><FirmwareSystemModel/><div className="fe-hypothesis"><p className="label">Illustrative hypothesis / Unverified</p><p>Could an input accepted across an authority boundary alter a controller’s operating state, and could that state change affect a control action?</p><p>Trace input handling first. Test the implementation under defined conditions. Investigate a control effect only where the environment represents the relevant feedback and operating constraints.</p></div></div><div>
        <p className="fe-method-note">These are IKELOS’s six research stages, informed by STPA-Sec, rather than the official STPA-Sec steps. Emulation supports specific experiments within this broader methodology.</p>
        <ol className="fe-method-stages">{researchStages.map((stage, i) => <li key={stage.title}><span aria-hidden="true">0{i + 1}</span><div><h3>{stage.title}</h3><p>{emulationIntegration[i]}</p></div></li>)}</ol>
        <Link className="text-link" to="/about#research-methodology">Explore the broader research methodology <span aria-hidden="true">↗</span></Link>
      </div></div>
      <div className="fe-evidence-boundary"><strong>Keep the causal links separate.</strong><p>STPA-Sec structures system-level security reasoning; it is not an automated vulnerability scanner. A reproduced implementation behavior may inform a control hypothesis. A simulated control effect does not establish a real-world mission consequence; that claim requires additional evidence from the relevant system and operating conditions.</p></div>
    </section>

    <section id="engagement-applications" className="section wrap fe-split" aria-labelledby="applications-title"><div><p className="eyebrow">06 / Engagement applications</p><h2 id="applications-title">Scope the uncertainty<br/>that matters.</h2><p className="fe-section-note">PHOBETOR supports the embedded Linux workflow described above. RTOS support and protocol-based discovery are funded development areas. Expanded system emulation requires target-specific engineering and an agreed level of fidelity.</p></div><div className="fe-applications">{applications.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section id="research-deliverables" className="section wrap fe-split" aria-labelledby="deliverables-title"><div><p className="eyebrow">07 / Research deliverables</p><h2 id="deliverables-title">Evidence for the<br/>engineering decision.</h2><p className="fe-section-note">Deliverables follow the agreed research scope. An engagement may produce supported findings, bounded negative results, or unresolved hypotheses. Vulnerability discovery and successful proof-of-concept reproduction are not guaranteed.</p><Link className="text-link" to="/about#evidence-policy">Review our evidence policy <span aria-hidden="true">↗</span></Link></div><ul className="fe-deliverables">{deliverables.map((item, i) => <li key={item}><span aria-hidden="true">0{i + 1}</span>{item}</li>)}</ul></section>

    <section className="section wrap practice-product"><div><p className="eyebrow">08 / From platform to practice</p><h2>Investigate access.<br/>Examine behavior.</h2><p>PHOBETOR supports the implementation research behind Exquisite Access Development. Where a critical-function question depends on firmware behavior, it can also support a scoped OT investigation.</p><div className="page-jump-links"><Link to={accessPath}>Exquisite Access Development ↗</Link><Link to={otPath}>OT behavior validation ↗</Link></div></div><aside><p className="label">The surrounding environment</p><h3>VEILTRACE</h3><p>Model the network relationships around an embedded implementation. Where an investigation needs both products, define the environment, interfaces, and evidence requirements together.</p><Link className="text-link" to="/products/veiltrace">Explore VEILTRACE ↗</Link></aside></section>

    <section className="engage-section wrap fe-cta" aria-labelledby="firmware-engage-title"><p className="eyebrow">09 / Define the investigation</p><h2 id="firmware-engage-title">Have a system that<br/>doesn't fit the scanner?</h2><div className="engage-bottom"><p>Start with a non-sensitive description of the system and research question. Agree handling requirements and an approved channel before exchanging firmware, architecture, or other technical material.</p><Link className="button" to="/contact?practice=phobetor">Discuss a research engagement <span aria-hidden="true">↗</span></Link></div></section>
  </div>;
}
