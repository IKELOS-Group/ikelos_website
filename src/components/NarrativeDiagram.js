import React from 'react';

const narrativeStates = {
  0: { active: [0,1,2,3,4], tag: 'Intended control and feedback' },
  2: { active: [0,1,2,4], tag: 'Outlined nodes · Investigation scope' },
  4: { active: [1,2,3,4], tag: 'Connected nodes · Decisions to evaluate' },
};
const nodes = [['01','Maintenance','Service interface'],['02','Embedded hardware','Firmware behavior'],['03','Controller','Authorization + logic'],['04','Physical process','Controlled function'],['05','Feedback sensor','Measured state']];

export function SystemDiagram({ state = 0, compact = false }) {
  const current = narrativeStates[state];
  return <div className={`system-diagram state-${state}${compact ? ' compact' : ''}`} role="img" aria-label={`Illustrative system. ${current.tag}. Maintenance connects to embedded hardware across the service trust boundary; hardware connects to the controller across the control trust boundary. The controller commands the physical process; a feedback sensor returns measured state.`}>
    <div className="diagram-topline" aria-hidden="true"><span>Fictional architecture</span><span>Control / feedback</span></div>
    <div className="system-nodes" aria-hidden="true">{nodes.map(([num,name,sub], i) => <React.Fragment key={name}>
      {(i === 1 || i === 2) && <div className={`trust-boundary boundary-${i}`}><span>{i === 1 ? 'Service trust boundary' : 'Control trust boundary'}</span></div>}
      <div className={`system-node node-${i}${current.active.includes(i) ? ' active-node' : ''}`}><span className="node-number">{num}</span><span className="node-symbol">{i === 3 ? '◇' : i === 4 ? '⊙' : '⌑'}</span><strong>{name}</strong><span>{sub}</span></div>
    </React.Fragment>)}</div>
    <div className="feedback-line" aria-hidden="true"><span>← Measured state / feedback to controller</span></div>
    <p className="diagram-legend" aria-hidden="true">{current.tag}</p>
  </div>;
}
