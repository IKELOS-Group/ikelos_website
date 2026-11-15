import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const topics = { undecided: 'Help define the research question', access: 'Exquisite Access Development', ot: 'OT Behavior Validation and Survivability', phobetor: 'PHOBETOR research', veiltrace: 'VEILTRACE research' };
export default function EngagementDraft() {
  const [params] = useSearchParams();
  const [topic,setTopic] = useState(topics[params.get('practice')] ? params.get('practice') : 'undecided');
  const [description,setDescription] = useState('');
  const [opened,setOpened] = useState(false);
  function prepare(event) {
    event.preventDefault();
    window.location.href = `mailto:info@ikelosgroup.com?subject=${encodeURIComponent('Research engagement: '+topics[topic])}&body=${encodeURIComponent('Research interest: '+topics[topic]+'\n\nNon-sensitive introduction:\n'+description)}`;
    setOpened(true);
  }
  return <section id="engagement-brief" className="section wrap contact-form-section" aria-labelledby="brief-title"><div><p className="eyebrow">Prepare the first conversation</p><h2 id="brief-title">Start with a<br/>non-sensitive description.</h2><p>Describe the system at a high level, the decision or outcome you need, and your timeline. For a partner engagement, include the workstream you would like IKELOS to own.</p><p>No technical attachments are needed for this introduction.</p></div><form className="engagement-form" onSubmit={prepare}><label htmlFor="research-interest">Research interest</label><select id="research-interest" value={topic} onChange={event=>{setTopic(event.target.value);setOpened(false);}}>{Object.entries(topics).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select><label htmlFor="research-description">Non-sensitive description <span>(required)</span></label><textarea id="research-description" required maxLength={1800} value={description} onChange={event=>{setDescription(event.target.value);setOpened(false);}} aria-describedby="draft-handling draft-note"/><p id="draft-handling" className="form-note">Do not include classified information, CUI, export-controlled data, credentials, or proprietary technical material.</p><button className="button" type="submit">Open email draft <span aria-hidden="true">↗</span></button><p id="draft-note" className="form-note">Opens your mail application for review. Nothing is submitted or stored by this website. Ordinary email is not an approved channel for technical material.</p><p role="status" className="form-note">{opened ? 'Email draft requested. Review and send it in your mail application. If no mail app opens, copy your introduction into an email to info@ikelosgroup.com.' : ''}</p></form></section>;
}
