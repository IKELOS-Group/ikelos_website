import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sigil from '../assets/systems-sigil.svg';

export const accessPath = '/practices/exquisite-access-development';
export const otPath = '/practices/ot-behavior-validation-survivability';
export function EngagementCTA() {
  return <section className="research-cta wrap"><div><p className="eyebrow">Start with the question</p><h2>What do you need<br/>to find out?</h2><p>Share a non-sensitive description of the system, the decision ahead, and the uncertainty that matters.</p></div><div><Link className="button" to="/contact">Discuss a research engagement <span aria-hidden="true">↗</span></Link><p>Agree scope, access, and approved channels before sharing technical material.</p></div></section>;
}
export function PracticePaths() {
  return <div className="practice-paths">
    <article><div className="path-heading"><span className="label">01 / Access</span><span aria-hidden="true">↗</span></div><h3><Link to={accessPath}>Exquisite Access Development</Link></h3><p>Develop tailored access capabilities for unfamiliar or poorly documented systems through foreign materiel exploitation and specialized research.</p><div className="path-question">What access is possible?</div><Link className="text-link" to={accessPath}>Explore access development <span aria-hidden="true">↗</span></Link></article>
    <article><div className="path-heading"><span className="label">02 / Survivability</span><span aria-hidden="true">↗</span></div><h3><Link to={otPath}>OT Behavior Validation and Survivability</Link></h3><p>Test operational behavior under defined failure, degradation, or adversarial conditions. Establish what continues, what fails, and how recovery works.</p><div className="path-question">Which critical functions hold up?</div><Link className="text-link" to={otPath}>Explore behavior validation <span aria-hidden="true">↗</span></Link></article>
  </div>;
}
export function ProductArt({ network = false }) {
  return <svg className="product-art" viewBox="0 0 560 220" fill="none" aria-hidden="true">
    <defs><pattern id={network ? 'network-grid' : 'firmware-grid'} width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#405463"/></pattern></defs>
    <path fill={`url(#${network ? 'network-grid' : 'firmware-grid'})`} d="M0 0h560v220H0z"/>
    {network ? <><g stroke="#5D9FB0"><path d="M65 110 180 45 280 110 395 50 490 110 390 180 280 110 170 180 65 110M180 45l-10 135M395 50l-5 130M65 110h425"/><path strokeDasharray="5 7" d="M180 45h215M170 180h220"/></g>{[[65,110],[180,45],[280,110],[395,50],[490,110],[390,180],[170,180]].map(([x,y],i)=><g key={i}><path d={`M${x} ${y-16}l16 9v18l-16 9-16-9v-18z`} fill="#10161D" stroke={i===2?'#E6EDF3':'#5D9FB0'}/><circle cx={x} cy={y+2} r="3" fill="#A6B5C3"/></g>)}</> : <><g stroke="#405463"><path d="m280 25 150 70-150 75-150-75zM130 115l150 75 150-75M130 140l150 75 150-75M280 25v145M130 95l150 55 150-55"/><path d="M35 110h90M435 110h90M280 0v25"/></g><path d="m280 65 65 30-65 33-65-33z" stroke="#5D9FB0" strokeWidth="2" fill="#22313F"/><path d="M280 128v60M180 118l-50 25M380 118l50 25" stroke="#5D9FB0"/><circle cx="280" cy="95" r="5" fill="#E6EDF3"/></>}
  </svg>;
}
export function ProductFoundations() {
  return <div className="product-foundations">
    <article><ProductArt/><div className="product-copy"><p className="label">Embedded implementation / PHOBETOR</p><h3><Link to="/products/phobetor">PHOBETOR</Link></h3><p>IKELOS Group’s platform for firmware vulnerability research and system emulation. Connect implementation questions to controlled experiments.</p><p className="product-role">Funded development: RTOS support and protocol-based vulnerability discovery.</p><Link className="text-link" to="/products/phobetor">Explore PHOBETOR <span aria-hidden="true">↗</span></Link></div></article>
    <article><ProductArt network/><div className="product-copy"><p className="label">Operational environment / VEILTRACE</p><h3><Link to="/products/veiltrace">VEILTRACE</Link></h3><p>Dynamic, threat-representative network generation for modeling complex IT and OT environments and analyzing failure states.</p><p className="product-role">Supports the environment context for behavior and survivability research.</p><Link className="text-link" to="/products/veiltrace">Explore VEILTRACE <span aria-hidden="true">↗</span></Link></div></article>
  </div>;
}
export function ResearchLens() {
  const [lens, setLens] = useState('access');
  const access = lens === 'access';
  return <figure className="research-lens"><figcaption><span className="label">One system / Two research questions</span><span>Illustrative research model</span></figcaption><div className="lens-controls" role="group" aria-label="Explore the research questions"><button aria-pressed={access} onClick={()=>setLens('access')}>01 / Access</button><button aria-pressed={!access} onClick={()=>setLens('behavior')}>02 / Survivability</button></div><div className={`lens-system lens-${lens}`} aria-hidden="true"><div className="lens-orbit orbit-one"/><div className="lens-orbit orbit-two"/><img src={sigil} alt=""/><span className="system-tag tag-input">Interfaces</span><span className="system-tag tag-control">Control logic</span><span className="system-tag tag-function">Critical functions</span><div className="lens-line line-one"/><div className="lens-line line-two"/></div><div className="lens-result" aria-live="polite"><span className="label">{access ? 'Investigate the implementation' : 'Test under defined stress'}</span><p>{access ? 'Determine which paths permit access, and under what conditions.' : 'Determine which functions continue, which fail, and what recovery requires.'}</p></div></figure>;
}
