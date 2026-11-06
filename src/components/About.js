import React from 'react';
import { Link } from 'react-router-dom';

const milestones = [
  ['Scope the decision', 'Identify the decision owner, critical functions, unresolved assumptions, operating constraints, and timeline. Define what evidence would change the decision and what can be investigated with the access available.', 'A bounded research question, scope, deliverables, and completion criteria.'],
  ['Authorize and prepare', 'Establish written testing authority, target ownership, in-scope assets and interfaces, access permissions, and third-party dependencies. Agree confidentiality, intellectual property, data handling, retention, and approved communications before exchanging restricted material.', 'Authorization and access conditions, handling requirements, and responsibilities.'],
  ['Set the test boundaries', 'Agree the test environment, permitted activities, safety constraints, stop conditions, recovery procedures, and escalation contacts. Document any differences between laboratory conditions and the operational system.', 'A test plan with explicit operating limits, recovery arrangements, and coverage boundaries.'],
  ['Investigate and review', 'Use system-led and technique-adaptive research to test prioritized hypotheses. Review observations and emerging consequences with the responsible stakeholders. Changes in access, models, or priorities trigger a scope review before work expands.', 'Traceable evidence, progress reviews, and documented decisions about the next research step.'],
  ['Decide, retest, and hand over', 'Connect technical evidence to engineering options, operational constraints, and residual uncertainty. Agree which changes and follow-up tests belong in scope. Provide the decision brief and supporting records for stakeholder review.', 'Engineering recommendations, a decision record, and retest criteria tied to the original question.'],
];

export default function About() {
  return <>
    <section className="page-hero wrap">
      <p className="eyebrow">Engagement governance / IKELOS Group</p><h1>Approach</h1><p className="page-statement">A clear question.<br/>An accountable investigation.</p>
      <p className="page-lede">Agree the decision, authority, access, and evidence before research begins. Keep stakeholders informed as the investigation changes what is known—and what needs to be tested next.</p>
      <nav className="page-jump-links" aria-label="Approach sections"><Link to="#governance">How we work</Link><Link to="#evidence-policy">Evidence policy</Link><Link to="#walkthrough">Sample deliverable</Link></nav>
    </section>
    <section id="governance" className="section wrap" aria-labelledby="governance-title">
      <div className="section-intro prose"><p className="eyebrow">From scoping to handover</p><h2 id="governance-title">Govern the work.<br/>Keep the decision in view.</h2><p>These agreements frame the research. They are revisited when evidence changes the model, the access assumptions, or the priorities. Your engineering and security teams remain part of the decision process.</p></div>
      <ol className="workflow governance-workflow" aria-label="Engagement governance">{milestones.map(([title, copy, output], i) => <li key={title}><span className="workflow-number" aria-hidden="true">0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div><div className="stage-output"><span className="label">Agreement / output</span><p>{output}</p></div></li>)}</ol>
      <Link className="text-link methodology-link" to="/#research-methodology">Explore the six-stage research methodology <span aria-hidden="true">↗</span></Link>
    </section>
    <section id="evidence-policy" className="section wrap content-section" aria-labelledby="confidence-title">
      <div><p className="eyebrow">Evidence policy</p><h2 id="confidence-title">Conclusions with<br/>defined boundaries.</h2></div>
      <div className="prose"><p className="evidence-policy">We report demonstrated findings, bounded negative results, unresolved hypotheses, and coverage limitations separately. Conclusions are limited to the documented access, configuration, and operating conditions.</p><p>Modeled consequences guide the investigation. Experimentally demonstrated consequences require evidence that connects access, implementation behavior, system effect, and operational context.</p><p>The decision brief identifies what the evidence supports, what remains unresolved, and which engineering or follow-up research choices are available.</p></div>
    </section>
    <section id="walkthrough" className="section wrap" aria-labelledby="walkthrough-title"><div className="document-panel sample-referral"><div><p className="label">Representative deliverable / NAV-01</p><h2 id="walkthrough-title">Inspect a decision brief.</h2></div><div><p>The navigation input integrity sample shows the assumption register, hypothesis status, proposed test conditions, evidence requirements, limitations, modeled consequence, decision, and retest criteria in one inspectable package.</p><Link className="text-link" to="/#sample-deliverable">Open the illustrative evidence package <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="section wrap content-section" aria-labelledby="scoping-title"><h2 id="scoping-title">Bring the constraints<br/>into the first conversation.</h2><div className="prose"><p>Start with the decision, deadline, and high-level system context. For direct and partner engagements, scoping covers authorization, procurement requirements, handling constraints, reporting, team interfaces, and deliverable acceptance.</p><Link className="button" to="/contact">Scope a technical investigation <span aria-hidden="true">↗</span></Link></div></section>
    <aside id="stuxnet" className="wrap historical-note"><details><summary>Historical reading / Stuxnet</summary><div className="prose"><p>For historical context, Symantec’s <cite>W32.Stuxnet Dossier</cite> examines industrial control behavior and operator visibility. This is a retrospective reference, not IKELOS work or evidence that STPA-Sec was used by the creators. <a className="source-link" href="https://nsarchive2.gwu.edu/NSAEBB/NSAEBB424/docs/Cyber-044.pdf">Read the Symantec analysis (PDF)</a>.</p></div></details></aside>
  </>;
}
