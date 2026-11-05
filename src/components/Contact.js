import React from 'react';

export default function Contact() {
  return <>
    <section className="page-hero contact-hero wrap"><p className="eyebrow">IKELOS GROUP / Contact</p><h1>Begin with<br /><span className="accent-text">a conversation.</span></h1><p className="page-lede">Have a research question or a security decision ahead?<br />Tell us a little about what you need to understand.</p></section>
    <section className="contact-grid wrap" aria-labelledby="email-title"><div className="contact-primary"><p className="eyebrow">Initial inquiries</p><h2 id="email-title">Discuss an engagement.</h2><a className="email-link" href="mailto:info@ikelosgroup.com">info@ikelosgroup.com <span aria-hidden="true">↗</span></a><p>Send a high-level introduction by email. A short outline of your question and the kind of support you are looking for is enough to start.</p><span className="contact-note">Bespoke vulnerability research / Cybersecurity consulting</span></div><aside className="contact-aside"><span className="channel-icon" aria-hidden="true">↗</span><h2>A suitable channel<br />for the details.</h2><p>A secure communication channel can be arranged through initial email contact.</p><p>Keep your first message high level. Save sensitive technical information, credentials, and confidential material for the channel we agree together.</p></aside></section>
    <div className="contact-closing wrap"><span className="square-dot" /><p>Every engagement starts with a specific question.</p></div>
  </>;
}
