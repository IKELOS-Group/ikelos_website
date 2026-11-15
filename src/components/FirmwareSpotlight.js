import React from 'react';
import { Link } from 'react-router-dom';
import './FirmwareEmulation.css';

export default function FirmwareSpotlight() {
  return <section className="fe-spotlight wrap" aria-labelledby="firmware-spotlight-title">
    <div><p className="eyebrow">04 / Capability focus</p><h2 id="firmware-spotlight-title">Find the path.<br/>Prove the behavior.</h2></div>
    <div><p className="label">Firmware Vulnerability Research &amp; System Emulation</p><p>Connect firmware discovery, controlled execution, and system-level security questions. Inspect the evidence behind a candidate weakness and define what an experiment can establish.</p><Link className="text-link" to="/capabilities/firmware-emulation">Explore firmware research &amp; emulation <span aria-hidden="true">↗</span></Link></div>
    <p className="fe-spotlight-trace" aria-hidden="true"><span>Implementation</span><span>→</span><span>Evidence</span><span>→</span><span>Engineering decision</span></p>
  </section>;
}
