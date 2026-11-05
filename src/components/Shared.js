import React from 'react';
import { Link } from 'react-router-dom';

export function SectionLabel({ number, children }) {
  return <p className="eyebrow section-label"><span>{number}</span>{children}</p>;
}

export function EngagementCTA() {
  return <section className="engagement wrap" aria-labelledby="engagement-title">
    <div><p className="eyebrow">Start a conversation</p><h2 id="engagement-title">A specific question.<br /><span className="text-muted">A focused engagement.</span></h2></div>
    <div className="engagement-action"><p>Tell us what you need to understand.<br />We’ll start with the scope.</p><Link className="button" to="/contact">Discuss an engagement <span aria-hidden="true">↗</span></Link></div>
  </section>;
}

export function ResearchDiagram() {
  return <div className="research-diagram" aria-hidden="true">
    <div className="diagram-top"><span>IKELOS / RESEARCH</span><span>FIG. 01</span></div>
    <svg viewBox="0 0 520 480" fill="none">
      <defs><pattern id="diagram-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="currentColor" strokeWidth=".5" opacity=".16" /></pattern></defs>
      <rect x="20" y="20" width="480" height="432" fill="url(#diagram-grid)" />
      <g stroke="currentColor">
        <path d="M260 22v430M24 240h472" opacity=".3" strokeDasharray="3 7" />
        <circle cx="260" cy="240" r="182" opacity=".22" />
        <circle cx="260" cy="240" r="157" opacity=".35" strokeDasharray="2 7" />
        <ellipse cx="260" cy="240" rx="122" ry="182" opacity=".42" transform="rotate(35 260 240)" />
        <ellipse cx="260" cy="240" rx="65" ry="182" opacity=".35" transform="rotate(35 260 240)" />
        <ellipse cx="260" cy="240" rx="182" ry="66" opacity=".35" transform="rotate(35 260 240)" />
        <ellipse cx="260" cy="240" rx="182" ry="127" opacity=".32" transform="rotate(35 260 240)" />
        <path d="m111 135 149 105 128-129M260 240l61 170M111 135l210 275 67-299-277 24Z" opacity=".4" />
        <path d="M78 240a182 182 0 0 1 182-182" strokeWidth="2" />
        <path d="M442 240a182 182 0 0 1-105 165" strokeWidth="2" />
        <path d="M30 58V30h28M462 30h28v28M30 422v28h28M462 450h28v-28" opacity=".65" />
        <circle cx="260" cy="240" r="8" /><circle cx="260" cy="240" r="25" opacity=".4" />
      </g>
      <g fill="currentColor"><circle cx="111" cy="135" r="4" /><circle cx="388" cy="111" r="4" /><circle cx="321" cy="410" r="4" /><circle cx="260" cy="240" r="3" /></g>
      <g fill="currentColor" fontSize="9" fontFamily="monospace" letterSpacing="1.5"><text x="123" y="125">SURFACE</text><text x="283" y="228">QUESTION</text><text x="336" y="431">CONTEXT</text></g>
    </svg>
    <div className="diagram-bottom"><span>THE QUESTION DEFINES THE SCOPE.</span><span className="diagram-cross">+</span></div>
  </div>;
}
