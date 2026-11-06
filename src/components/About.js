import React from 'react';
import { DecisionBrief } from './Shared';

const stages = [
  ['Define the operational problem.', 'Establish intended functions, operating modes, critical outcomes, assessment boundaries, and attacker access assumptions.', 'Assessment objectives, scope, and documented assumptions.'],
  ['Model the system.', 'Map components, interfaces, trust boundaries, control actions, feedback, dependencies, and relevant physical processes.', 'A system model showing security-relevant relationships.'],
  ['Develop attack hypotheses.', 'Examine security assumptions, commands, message sequences, timing, and control interactions that could reach unknown or unsafe states or produce an unacceptable outcome.', 'Prioritized hypotheses tied to system functions and consequences.'],
  ['Investigate the implementation.', 'Apply targeted reverse engineering, hardware interface characterization, protocol analysis, emulation, fuzzing, black-box investigation, or custom tooling as the system requires.', 'Observed states and transitions, technical observations, and candidate attack paths.'],
  ['Validate exploitability.', 'Test candidate paths under defined access and operating conditions. Develop proof-of-concept demonstrations where appropriate and record prerequisites, repeatability, observed impact, and limitations.', 'Evidence distinguishing confirmed findings from unresolved hypotheses.'],
  ['Support engineering decisions.', 'Connect findings to operational consequences and recommend changes to design, implementation, integration, or operating controls. Define retest criteria where included in scope.', 'Prioritized engineering recommendations supported by the evidence.'],
];
const walkthrough = [
  ['Dependable navigation information', 'Begin with the operational purpose: the crew needs information it can rely on for navigation. Crew interpretation, confidence, and dependence on that information are part of the system.'],
  ['Dependencies and assumptions', 'Model the relationship between GPS-derived input, the Electronic Chart Display and Information System (ECDIS), its fault indications, and the crew. Ask what the system assumes about input validity and how uncertainty is communicated.'],
  ['Unexpected behavior', 'In this hypothetical scenario, invalid GPS-derived input places the ECDIS into an unexpected state without obtaining root or administrator access. Investigate the input-handling assumption and the resulting system behavior.'],
  ['Diminished operational confidence', 'The unexpected behavior undermines crew confidence in the information the ECDIS provides. Establishing that effect would require evidence of both the system’s behavior and its influence on crew interpretation and reliance.'],
  ['Engineering decisions', 'Use the evidence to decide how inputs should be handled, how faults should be indicated, what recovery requires, and how the information can be independently verified. Define the evidence needed to evaluate each change.'],
];

export default function About() {
  return <>
    <section className="page-hero wrap">
      <h1>Approach</h1>
      <p className="page-lede">Our top-down, target-agnostic approach begins with system purpose, constraints, and relationships. We investigate the implementation to establish exploitability, understand operational consequences, and support engineering decisions with evidence.</p>
    </section>

    <section className="section wrap" aria-labelledby="workflow-title">
      <div className="section-intro prose">
        <h2 id="workflow-title">Six-stage iterative workflow</h2>
        <p>This is IKELOS’s engagement workflow, adapted to scope. System purpose, unacceptable outcomes, and control relationships guide the questions; the target determines the investigative techniques and tooling.</p>
        <p>Where appropriate, System-Theoretic Process Analysis for Security (STPA-Sec) helps formulate and prioritize research questions. These are not the official steps of STPA-Sec. The analysis does not scan for exploits, certify a system, or prove a proposed attack works; implementation research and experimental validation provide that evidence.</p>
      </div>
      <ol className="workflow" aria-label="Engagement workflow">{stages.map(([title, copy, output], i) => <li key={title}>
        <span className="workflow-number" aria-hidden="true">0{i + 1}</span>
        <div><h3>{title.replace(/\.$/, '')}</h3><p>{copy}</p></div>
        <div className="stage-output"><span className="label">Output</span><p>{output}</p></div>
      </li>)}</ol>
      <p className="iteration-note">Evidence feeds back into the model. New observations can change the access assumptions, reveal a missing dependency, or reorder the research priorities.</p>
    </section>

    <section className="section wrap" aria-labelledby="confidence-title">
      <div className="section-intro prose">
        <h2 id="confidence-title">Evidence standards</h2>
        <p>An unknown state is not automatically unsafe or exploitable. Reports distinguish what was seen, what it suggests, and what testing established.</p>
      </div>
      <dl className="evidence-states">
        <div><dt>Observation</dt><dd>A recorded behavior or implementation detail, with the conditions under which it was observed.</dd></div>
        <div><dt>Hypothesis</dt><dd>A proposed attack path or consequence that requires further investigation and validation.</dd></div>
        <div><dt>Validated finding</dt><dd>A conclusion supported by repeatable evidence under documented access and operating conditions, with stated limitations.</dd></div>
      </dl>
      <p className="scope-note">An engagement does not guarantee successful compromise, discovery of a new vulnerability, exhaustive coverage, or proof that a system is secure. Unresolved hypotheses and coverage limits remain explicit.</p>
    </section>

    <section id="walkthrough" className="section wrap" aria-labelledby="walkthrough-title">
      <div className="document-panel">
        <div className="section-intro prose">
          <p className="scenario-label">Hypothetical scenario</p>
          <h2 id="walkthrough-title">Maritime walkthrough: navigation confidence</h2>
          <p>This scenario illustrates analytical reasoning, not an IKELOS customer engagement or a verified finding. Start with dependable navigation information and follow the dependencies through to the engineering decisions.</p>
        </div>
        <ol className="walkthrough" aria-label="Maritime walkthrough">{walkthrough.map(([title, copy], i) => <li key={title}>
          <span className="workflow-number" aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{copy}</p>
        </li>)}</ol>
        <div className="walkthrough-brief">
          <div className="prose">
            <h3>Access conditions and operational effects</h3>
            <p>D4M describes deny, degrade, disrupt, destroy, and manipulate. This hypothetical example concerns degradation of an operational capability; it does not establish the other effects.</p>
            <p>To establish exploitability, an investigation would also need to demonstrate the assumed ability to influence the input under defined access conditions. Unexpected behavior alone does not establish an operational effect.</p>
          </div>
          <DecisionBrief />
        </div>
      </div>
    </section>

    <section id="stuxnet" className="section wrap historical-note" aria-labelledby="stuxnet-title">
      <div className="prose">
        <h2 id="stuxnet-title">Historical note: Stuxnet</h2>
        <p>Symantec’s <cite>W32.Stuxnet Dossier</cite> describes malware designed to alter industrial control behavior while concealing changes. Its analysis connects knowledge of the target process and equipment with changes to control logic, intended sabotage, and mechanisms that obscured those changes from operators. <a className="source-link" href="https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf">Read the Symantec analysis (PDF)</a>.</p>
        <p>Our retrospective systems-engineering interpretation is that the operational objective, process dependencies, control behavior, and operator visibility must be examined together. An implementation weakness gains meaning through the effect it can produce in that wider system.</p>
        <p>This is historical analysis, not an IKELOS engagement or a claim of comparable achievement. It does not establish which development method the creators used, including STPA-Sec. It is separate from the maritime scenario and does not illustrate an absence of privileged access.</p>
      </div>
    </section>
  </>;
}
