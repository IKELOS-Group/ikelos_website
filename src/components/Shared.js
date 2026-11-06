import React, { useId } from 'react';

export function DecisionBrief() {
  const id = useId();
  return <aside className="decision-brief" aria-labelledby={`${id}-title`}>
    <p className="label">Illustrative decision brief</p>
    <h3 id={`${id}-title`}>Dependable navigation information</h3>
    <p className="brief-status">Hypothetical scenario · Evidence to establish</p>
    <dl>
      <div><dt>Objective</dt><dd>Determine whether navigation information remains dependable when GPS-derived input is invalid.</dd></div>
      <div><dt>Scenario consequence</dt><dd>An unexpected ECDIS state undermines crew confidence in the information it provides, without root or administrator access.</dd></div>
      <div><dt>Evidence needed</dt><dd>Repeatable observations under defined access and operating conditions; the resulting display and fault indications; recovery behavior; and evidence of how crew interpretation and reliance are affected.</dd></div>
      <div><dt>Engineering decisions</dt><dd>What input handling must change? How should faults be indicated? What recovery behavior is required, and how should crews independently verify the information?</dd></div>
    </dl>
    <p className="brief-footnote">Illustrative questions, not measured findings or completed remediation.</p>
  </aside>;
}
