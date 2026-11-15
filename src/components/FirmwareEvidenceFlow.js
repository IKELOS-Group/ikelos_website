import React, { useRef, useState } from 'react';
import { firmwareStages } from './firmwareResearch';

export default function FirmwareEvidenceFlow() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef([]);
  const stage = firmwareStages[selected];
  const navigate = (event, index) => {
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = firmwareStages.length - 1;
    else if (event.key in moves) next = (index + moves[event.key] + firmwareStages.length) % firmwareStages.length;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  };

  return <div className="fe-workbench">
    <div className="fe-instrument-bar"><span className="label">Analysis / experiment / interpretation</span><span>Conceptual workflow · No scan or test results</span></div>
    <div className="fe-flow-map">
      <svg className="fe-flow-wires" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
        <path d="M125 60H875V180H125"/>
        <path className="fe-wire-arrows" d="m240 55 6 5-6 5m250-10 6 5-6 5m250-10 6 5-6 5m130 40 5 6 5-6M760 175l-6 5 6 5m-250-10-6 5 6 5m-250-10-6 5 6 5"/>
      </svg>
      <div className="fe-flow-tabs" role="tablist" aria-label="Firmware evidence workflow">
        {firmwareStages.map((item, i) => <button key={item.title} ref={el => { buttons.current[i] = el; }}
          type="button" role="tab" id={`firmware-step-${i}`} aria-selected={selected === i}
          aria-controls="firmware-step-detail" tabIndex={selected === i ? 0 : -1}
          className={`fe-flow-node fe-flow-node-${i}`} onClick={() => setSelected(i)} onKeyDown={event => navigate(event, i)}>
          <span className="fe-node-number">0{i + 1}<span aria-hidden="true">{i < 4 ? ' / A' : ' / E'}</span></span>
          <span>{item.title}</span>
        </button>)}
      </div>
    </div>
    <p className="fe-flow-hint">Select a stage to inspect its evidence requirements. Use arrow keys, Home, or End to navigate.</p>
    <div id="firmware-step-detail" className="fe-flow-detail" role="tabpanel" aria-labelledby={`firmware-step-${selected}`} tabIndex="0">
      <div><p className="label">0{selected + 1} / {stage.domain}</p><h3>{stage.artifact}</h3><p>{stage.action}</p></div>
      <dl><div><dt>Evidence sought</dt><dd>{stage.evidence}</dd></div><div><dt>Boundary of the claim</dt><dd>{stage.limit}</dd></div></dl>
    </div>
    <div className="fe-loop-note"><span aria-hidden="true">↶</span><p>Evidence can challenge the hypothesis. Revise the program model, test conditions, or system assumptions and investigate again.</p></div>
  </div>;
}
