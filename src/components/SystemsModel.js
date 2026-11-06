import React, { useId, useRef, useState } from 'react';
import { researchStages, researchComponents, evidenceRequirements } from './researchMethodology';
import './ResearchMethodology.css';

function ControlStructure({ stage, selected, onSelect }) {
  const id = useId();
  const current = researchStages[stage];
  const causal = stage === 2 || stage === 3;
  return <div className={`rm-canvas rm-phase-${stage}`}>
    {[false, true].map(mobile => {
      const marker = `${id}-${mobile ? 'mobile' : 'desktop'}`;
      return <svg key={marker} className={`rm-structure ${mobile ? 'rm-mobile-structure' : 'rm-desktop-structure'}`} viewBox={mobile ? '0 0 360 700' : '0 0 900 600'} fill="none" aria-hidden="true" focusable="false">
        <defs>
          <pattern id={`${marker}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0v30" stroke="currentColor" opacity=".12"/><circle cx="0" cy="0" r="1.5" fill="currentColor" opacity=".4"/></pattern>
          <marker id={`${marker}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" stroke="currentColor" strokeWidth="1.5"/></marker>
        </defs>
        <path d={mobile ? 'M0 0h360v700H0z' : 'M0 0h900v600H0z'} fill={`url(#${marker}-grid)`}/>
        <g className="rm-envelope">
          <ellipse cx={mobile ? 275 : 750} cy={mobile ? 565 : 465} rx={mobile ? 81 : 130} ry={mobile ? 96 : 113}/>
          <ellipse cx={mobile ? 275 : 750} cy={mobile ? 565 : 465} rx={mobile ? 69 : 115} ry={mobile ? 84 : 96}/>
          <path d={mobile ? 'M190 565h165M275 460v206' : 'M615 465h270M750 345v240'}/>
        </g>
        <g className="rm-boundaries">
          <path d={mobile ? 'M180 125v155' : 'M298 150v185'}/>
          <path d={mobile ? 'M190 305h160' : 'M335 367h530'}/>
        </g>
        <g className="rm-control-lines" markerEnd={`url(#${marker}-arrow)`}>
          <path d={mobile ? 'M180 101v24h95v31' : 'M450 106v98'}/>
          <path d={mobile ? 'M155 205h50' : 'M235 250h125'}/>
          <path d={mobile ? 'M275 254v82' : 'M450 296v124'}/>
          <path d={mobile ? 'M275 434v82' : 'M540 465h120'}/>
          <path d={mobile ? 'M205 565h-50' : 'M750 420V296'}/>
          <path d={mobile ? 'M85 516V290h140v-36' : 'M660 250H540'}/>
        </g>
        <g className="rm-line-labels" fill="currentColor" stroke="none">
          {mobile ? <>
            <text x="15" y="115">Operating mode / authority</text>
            <text x="15" y="146">Service boundary</text>
            <text x="205" y="322">Control boundary</text>
            <text x="289" y="293">Demand</text>
            <text x="289" y="475">Actuation</text>
            <text x="18" y="337">Measured state</text>
            <text x="18" y="355">Temperature / flow</text>
            <text x="20" y="652">SC-01 / Preserve required cooling</text>
          </> : <>
            <text x="470" y="153">Operating mode / authority</text>
            <text x="40" y="162">Service domain</text>
            <text x="318" y="162">Operational control domain</text>
            <text x="298" y="235" textAnchor="middle">Configuration</text>
            <text x="600" y="235" textAnchor="middle">Measured state</text>
            <text x="468" y="345">Pump demand</text>
            <text x="600" y="451" textAnchor="middle">Actuation</text>
            <text x="770" y="342">Temperature</text><text x="770" y="358">/ flow</text>
            <text x="340" y="390">Control / physical interface</text>
            <text x="710" y="565">SC-01 / Cooling constraint</text>
          </>}
        </g>
        <g className={`rm-causal-path${causal ? ' is-visible' : ''}`} markerEnd={`url(#${marker}-arrow)`}>
          <path d={mobile ? 'M155 218h48M288 254v80M288 434v80' : 'M235 264h123M436 296v122M540 480h118'}/>
        </g>
        <g className={`rm-test-points${stage === 4 ? ' is-visible' : ''}`}>
          {(mobile ? [[85,266],[275,266],[275,447],[275,627]] : [[145,318],[450,318],[450,533],[750,533]]).map(([x,y],i) => <g key={i} transform={`translate(${x} ${y})`}><circle r="12"/><text textAnchor="middle" y="4">E{i+1}</text></g>)}
        </g>
        <g className={`rm-proposed-gates${stage === 5 ? ' is-visible' : ''}`}>
          <path d={mobile ? 'M180 185v40m-5-40v40M255 315h40m-40 5h40' : 'M296 231v38m6-38v38M431 367h38m-38 6h38'}/>
          <text x={mobile ? 15 : 35} y={mobile ? 680 : 565}>D-01 / Proposed controls · Verification required</text>
        </g>
      </svg>;
    })}
    <span className="rm-model-caption" aria-hidden="true">M-01 <span>Control structure</span></span>
    <span className="rm-envelope-label" aria-hidden="true">L-01 / Mission availability</span>
    <div className="rm-layer-note" aria-live="polite"><span>{[
      'L-01 → H-01', 'M-01 / A-01', 'CS-01 → ICA-01', 'Q-01 / Q-02 / Q-03', 'E-01 → E-04', 'D-01 → V-01',
    ][stage]}</span><strong>{[
      'Preserve mission availability', 'Authority is an assumption', 'Calibration → estimate → action', 'Follow the implementation', 'Acquire evidence at each link', 'Propose. Verify. Revisit.',
    ][stage]}</strong><p>{[
      'Insufficient cooling is a modeled hazardous state.', 'Connectivity does not establish permission or exploitability.', 'Could pump demand fall below the cooling requirement?', 'Configuration access, firmware behavior, feedback validity.', 'Required measurements; no acquired results shown.', 'Controls remain proposals until verified by retesting.',
    ][stage]}</p></div>
    <p id="rm-topology-description" className="rm-sr-only">The operator supplies operating mode to the control computer. The maintenance interface supplies configuration across the service trust boundary. The control computer commands the pump drive, which actuates the thermal circuit. Process sensors return temperature and flow feedback to the control computer, closing the control loop.</p>
    <div className="rm-components" role="group" aria-label="Inspect system components" aria-describedby="rm-topology-description">
      {researchComponents.map(node => <button key={node.id} className={`rm-component rm-component-${node.id}${current.nodes.includes(node.id) ? ' rm-relevant' : ''}${selected === node.id ? ' rm-selected' : ''}`} style={{'--x': `${node.x / 9}%`, '--y': `${node.y / 6}%`, '--mx': `${node.mx / 3.6}%`, '--my': `${node.my / 7}%`}} onClick={() => onSelect(node.id)} aria-label={`Inspect ${node.name.toLowerCase()}`} aria-pressed={selected === node.id} aria-controls="rm-component-inspector">
        <span className="rm-component-icon" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none"><path d={node.id === 'process' ? 'm14 2 12 7v10l-12 7L2 19V9zM2 9l12 7 12-7m-12 7v10' : node.id === 'sensor' ? 'M2 14h5l3-9 7 18 4-9h5' : node.id === 'drive' ? 'M4 4h20v20H4zM9 14h10m-5-5v10' : node.id === 'operator' ? 'M3 4h22v15H3zm11 15v5m-6 0h12' : 'M5 5h18v18H5zm4 4h10v10H9zM1 9h4m-4 9h4m18-9h4m-4 9h4M9 1v4m9-4v4M9 23v4m9-4v4'} stroke="currentColor" strokeWidth="1.3"/></svg></span>
        <strong>{node.name}</strong><span className="rm-component-sub">{node.sub}</span>
      </button>)}
    </div>
  </div>;
}

export default function SystemsModel() {
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState('process');
  const controls = useRef([]);
  const current = researchStages[stage];
  const component = researchComponents.find(node => node.id === selected);
  const selectStage = index => { setStage(index); setSelected(researchStages[index].focus); };
  const navigate = (event, index) => {
    const keys = {ArrowDown: (index + 1) % 6, ArrowRight: (index + 1) % 6, ArrowUp: (index + 5) % 6, ArrowLeft: (index + 5) % 6, Home: 0, End: 5};
    if (!(event.key in keys)) return;
    event.preventDefault(); selectStage(keys[event.key]); controls.current[keys[event.key]]?.focus();
  };
  return <section id="research-methodology" className="systems-section methodology" aria-labelledby="systems-title">
    <div className="wrap">
      <header className="rm-intro">
        <p className="eyebrow">02 / Research Methodology</p>
        <h2 id="systems-title">The System Defines<br className="rm-heading-break"/> the Investigation.</h2>
        <p className="rm-lede">We begin with mission objectives and system behavior, not a predefined list of exploits. Systems-theoretic analysis guides targeted research, while experimental evidence establishes exploitability and operational consequence.</p>
      </header>
      <div className="rm-workbench">
        <div className="rm-case-header"><div><span className="rm-kicker">Reference system</span><h3>Remote thermal-control module</h3></div><p>Illustrative system<br/><strong>Research plan · No test results</strong></p></div>
        <div className="rm-workspace">
          <nav className="rm-stage-rail" aria-label="Research workflow">
            <p className="rm-rail-label">Explore the investigation</p>
            <ol>{researchStages.map((item,i) => <li key={item.title}><button ref={el => {controls.current[i] = el;}} onClick={() => selectStage(i)} onKeyDown={event => navigate(event,i)} aria-label={item.title} aria-current={stage === i ? 'step' : undefined} aria-controls="rm-stage-details"><span className="rm-stage-number" aria-hidden="true">0{i+1}</span><span><strong>{item.title}</strong><span className="rm-stage-short">{item.short}</span></span><span className="rm-stage-arrow" aria-hidden="true">↗</span></button></li>)}</ol>
            <p className="rm-loop-note"><span aria-hidden="true">↶</span> Evidence can reopen any stage.</p>
          </nav>
          <div className="rm-system-view">
            <div className="rm-view-header"><span>{current.mode}</span><span className="rm-view-index" aria-hidden="true">0{stage+1} / 06</span></div>
            <ControlStructure stage={stage} selected={selected} onSelect={setSelected}/>
            <div className="rm-diagram-key"><span><i className="rm-key-solid"/>Control / feedback</span><span><i className="rm-key-dashed"/>Candidate influence</span><span><i className="rm-key-boundary"/>Trust / control boundary</span></div>
            <p className="rm-inspect-hint">Select a component to inspect its assumptions and evidence needs.</p>
          </div>
        </div>
        <div id="rm-component-inspector" className="rm-inspector" role="region" aria-labelledby="rm-inspector-title">
          <div><span className="rm-kicker">Component inspection</span><h4 id="rm-inspector-title" aria-live="polite">{component.name}</h4><p className="rm-inspector-state">Assumption to examine</p></div>
          <div><p>{component.assumption}</p><p className="rm-inspector-question">{component.question}</p></div>
          <div><span className="rm-kicker">Evidence to seek</span><p>{component.evidence}</p></div>
        </div>
      </div>
      <div id="rm-stage-details" className="rm-analysis" role="region" aria-labelledby="rm-stage-title">
        <div className="rm-analysis-heading"><div><p className="rm-kicker">Stage 0{stage+1} / {current.title}</p><h3 id="rm-stage-title">{current.heading}</h3></div><p>{current.summary}</p></div>
        <div className="rm-trace" role="group" aria-label="Analysis trace"><span>Traceability</span><ol>{current.trace.map(code => <li key={code}>{code}</li>)}</ol><span>{current.artifact}</span></div>
        <div className="rm-analysis-columns"><article><h4>{current.recordLabel}</h4><p>{current.record}</p></article><article><h4>Research question &amp; method</h4><p>{current.question}</p></article><article><h4>Decision basis</h4><p>{current.output}</p></article></div>
        {stage === 4 && <div className="rm-evidence-chain" role="group" aria-label="Validation evidence requirements">{evidenceRequirements.map(([code,title,copy,node]) => <button key={code} onClick={() => setSelected(node)} aria-controls="rm-component-inspector" aria-label={`Inspect evidence requirement ${code}`} aria-pressed={selected === node}><span>{code} / Required</span><strong>{title}</strong><span>{copy}</span></button>)}</div>}
        <div className="rm-analysis-footer"><p role="status" aria-live="polite">{current.status}</p><button onClick={() => selectStage(stage === 5 ? 1 : stage+1)}>{stage === 5 ? 'Revisit System Modeling' : `Explore ${researchStages[stage+1].title}`} <span aria-hidden="true">{stage === 5 ? '↶' : '→'}</span></button></div>
      </div>
      <div className="rm-method-note"><span className="rm-kicker">Systems analysis ↔ experimental research</span><p>STPA-Sec informs the systems analysis, particularly mission-level losses, control structures, insecure control actions, and causal scenarios. These six stages are IKELOS’s broader research workflow, not the official STPA-Sec steps. Findings can revise system models, assumptions, and research priorities. Modeled consequences remain distinct from experimentally demonstrated consequences.</p></div>
    </div>
  </section>;
}
