import React from 'react';

const records = [
  ['A-01', 'Assumption register', 'Assumption / Unverified', 'The navigation display receives GPS-derived input through a defined integration interface. Input validity, provenance, freshness, and operator fault indications are security-relevant assumptions. The ability to influence that input without administrator access must be established.'],
  ['H-01', 'Hypothesis status', 'Open / Requires testing', 'If an actor with the scoped interface access can supply invalid input that the Electronic Chart Display and Information System (ECDIS) accepts as usable, the display could present misleading navigation information or enter an unexpected state. The hypothesis remains open until the causal links are tested.'],
  ['T-01', 'Test conditions', 'Proposed / Agree before testing', 'Record the target configuration and software version, input source, access privileges, operating mode, baseline behavior, instrumentation, and recovery procedure. Use an isolated test environment with agreed stop conditions; demonstrate the assumed input influence within the authorized scope.'],
  ['E-01', 'Evidence', 'Required / Not collected', 'Capture the supplied input, its acceptance or rejection, synchronized display and fault indications, state transitions, recovery behavior, and repeat trials against a baseline. Preserve traceable records that connect each observation to its test conditions and hypothesis.'],
  ['L-01', 'Limitations', 'Coverage / To document', 'Record interfaces, configurations, input classes, and operating modes not tested. Lab behavior alone does not establish behavior across deployed variants, bridge operations, or crew response. A negative result is bounded by the tested conditions.'],
  ['C-01', 'Consequence analysis', 'Modeled / Not demonstrated', 'Misleading or unavailable navigation information could affect crew decisions and mission continuity. Establishing that consequence requires evidence of operational context, available independent information, fault indications, and crew interpretation; a display anomaly alone is insufficient.'],
  ['D-01', 'Decision', 'Pending / Evidence required', 'If accepted invalid input is shown to affect navigation information, evaluate input validation, source isolation, fault indication, recovery, and operational constraints. The accountable stakeholder determines whether to defer acceptance, constrain operation, require a change, accept residual risk, or commission further testing.'],
  ['R-01', 'Retest criteria', 'Proposed / Define acceptance criteria', 'Repeat the relevant test conditions after the change. Verify rejection or safe handling of the invalid input, clear fault indication, recovery, and continued handling of legitimate input. Check adjacent input classes and record remaining uncertainty before closing the finding.'],
];

export function EvidencePackage() {
  return <div className="sample-package">
    <div className="sample-cover"><p className="label">Representative deliverable / NAV-01</p><h3>Navigation input integrity</h3><p className="sample-label">Illustrative sample · Fictional system · No test results</p><dl><div><dt>Decision owner</dt><dd>System acceptance authority and engineering lead</dd></div><div><dt>Decision to support</dt><dd>What evidence is needed to accept, constrain, or change a navigation integration?</dd></div><div><dt>Current disposition</dt><dd>Research question defined. Acceptance recommendation pending evidence.</dd></div></dl><p className="sample-reading">Inspect the records to see how assumptions, tests, and consequences inform a decision brief.</p></div>
    <div className="sample-records" role="group" aria-label="Sample evidence records">{records.map(([id, title, status, copy]) => <details key={id}><summary><span className="sample-code">{id}</span><span>{title}</span><span className="sample-toggle" aria-hidden="true">+</span></summary><div className="sample-record-body"><p className="record-status">{status}</p><p>{copy}</p></div></details>)}</div>
  </div>;
}

export function EngagementDecision({ when, decision }) {
  return <dl className="engagement-decision"><div><dt>Engage when</dt><dd>{when}</dd></div><div><dt>Decision supported</dt><dd>{decision}</dd></div></dl>;
}
