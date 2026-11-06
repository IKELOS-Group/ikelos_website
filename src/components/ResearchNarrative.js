import React from 'react';
import { Link } from 'react-router-dom';

const triggers = [
  ['Deployment & acceptance', 'A critical system is approaching a release or acceptance decision, but its security assumptions have not been tested in the intended operating context.'],
  ['Integration & change', 'Components meet their individual requirements, but new interfaces, dependencies, or operating modes create uncertainty about the complete system.'],
  ['Vulnerability & consequence', 'A component weakness is known. Its reachability, system-level effect, or relevance to the mission is still unresolved.'],
  ['Remediation & verification', 'A proposed fix needs evidence that it closes the relevant path, preserves essential behavior, and addresses the conditions behind the finding.'],
];

export default function ResearchNarrative() {
  return <section id="research-narrative" className="buyer-context section wrap" aria-labelledby="narrative-title">
    <div className="buyer-intro"><div><p className="eyebrow">01 / The decision ahead</p><h2 id="narrative-title">Engage IKELOS<br/>when it matters.</h2></div><p>Engage IKELOS when a critical system must be deployed, accepted, integrated, or remediated—and the security assumptions behind that decision remain untested.</p></div>
    <ol className="buying-triggers">{triggers.map(([title, copy], i) => <li key={title}><span className="trigger-index" aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    <div className="positioning-boundary">
      <div><p className="label">Architecture ↔ Implementation</p><h3>The boundary<br/>we investigate.</h3></div>
      <div><p className="boundary-statement">IKELOS works at the boundary between system architecture and implementation research—where a security assumption becomes a testable hypothesis, and a technical effect becomes an engineering decision.</p><p className="boundary-fit">Bring us in when the question crosses component or team boundaries, requires targeted implementation research, or needs independent evidence for a consequential decision. We work with your engineering, product-security, and test teams around a defined research question.</p><Link className="text-link" to="/about">How an engagement works <span aria-hidden="true">↗</span></Link></div>
      <ol className="decision-chain" aria-label="From assumption to decision"><li>Architecture assumption</li><li>Testable hypothesis</li><li>Implementation evidence</li><li>Engineering decision</li></ol>
    </div>
  </section>;
}
