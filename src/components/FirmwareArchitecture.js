import React from 'react';

// Original conceptual artwork; no supplied whitepaper diagrams are reproduced.
export default function FirmwareArchitecture() {
  return <svg className="fe-architecture" viewBox="0 0 460 410" fill="none" aria-hidden="true">
    <defs><pattern id="fe-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="var(--steel)" strokeOpacity=".22"/></pattern></defs>
    <path fill="url(#fe-grid)" d="M0 0h460v410H0z"/>
    <g stroke="var(--steel)"><path d="M24 24h38M24 24v38m412-38h-38m38 0v38M24 386h38m-38 0v-38m412 38h-38m38 0v-38"/><path d="M108 138v10h244v-10m-122 10v18M108 338v8h244v-8"/></g>
    <g stroke="var(--accent)"><path d="M230 52v6H108v16m122-16h122v16M230 248v12H108v14m122-14h122v14M230 346v30"/><path strokeDasharray="4 5" d="M412 306h20V106h-20"/></g>
    <g fill="var(--bg)" stroke="var(--steel)"><rect x="48" y="74" width="120" height="64"/><rect x="292" y="74" width="120" height="64"/><path d="m230 166 73 41-73 41-73-41z"/><rect x="48" y="274" width="120" height="64"/><rect x="292" y="274" width="120" height="64"/></g>
    <g fill="var(--text)" textAnchor="middle" fontFamily="var(--sans)" fontSize="13"><text x="108" y="102">Program model</text><text x="108" y="120" className="fe-svg-small">Static evidence</text><text x="352" y="102">Candidate review</text><text x="352" y="120" className="fe-svg-small">AI + researcher</text><text x="230" y="204">Validation</text><text x="230" y="222">contract</text><text x="108" y="301">Original binaries</text><text x="108" y="319" className="fe-svg-small">Isolated execution</text><text x="352" y="301">Observations</text><text x="352" y="319" className="fe-svg-small">Trace + reproduce</text></g>
    <g fill="var(--accent)"><circle cx="230" cy="148" r="4"/><circle cx="230" cy="346" r="4"/></g>
    <g fill="var(--muted)" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" letterSpacing="1"><text x="230" y="40">SYSTEM QUESTION</text><text x="230" y="394">ENGINEERING DECISION</text></g>
  </svg>;
}
