import React from 'react';

export default function FirmwareSystemModel() {
  return <figure className="fe-system-model">
    <figcaption><span className="label">Illustrative system model</span><strong>Controlled process / open research question</strong><span>Fictional architecture · No experimental results</span></figcaption>
    <div className="fe-model-body">
      <div className="fe-model-node fe-modeled"><span className="label">Modeled interaction</span><strong>Operator &amp; external dependencies</strong><span>Control authority · Operating assumptions</span></div>
      <p className="fe-model-edge">↓ Network / protocol / access boundary</p>
      <div className="fe-model-loop">
        <div className="fe-model-node fe-executable"><span className="label">Candidate executable component</span><strong>Controller firmware &amp; application</strong><span>Parsing · State · Operating logic</span></div>
        <p className="fe-model-edge">↓ Control action / hardware interface</p>
        <div className="fe-model-node fe-modeled"><span className="label">Modeled interface</span><strong>Actuator &amp; device response</strong><span>Limits and delays require explicit assumptions</span></div>
        <p className="fe-model-edge">↓ Actuation</p>
        <div className="fe-model-node fe-modeled"><span className="label">Simulated process</span><strong>Physical process &amp; sensors</strong><span>Feedback validity · Timing · Model limits</span></div>
        <span className="fe-feedback-label">Sensor feedback → controller</span>
      </div>
    </div>
    <p className="fe-model-caption">Solid boundary: component proposed for original binary execution. Dashed boundary: modeled or simulated element. Feasibility and fidelity must be established for the target.</p>
  </figure>;
}
