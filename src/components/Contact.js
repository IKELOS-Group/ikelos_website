import React from 'react';

export default function Contact() {
  return <>
    <section className="page-hero contact-hero wrap"><p className="eyebrow">IKELOS GROUP / Contact</p><h1>Begin with<br /><span className="accent-text">a conversation.</span></h1><p className="page-lede">Have a research question or a security decision ahead?<br />Tell us a little about what you need to understand.</p></section>
    <div className="contact-grid wrap">
      <section className="contact-primary" aria-labelledby="email-title">
        <p className="eyebrow">General inquiries</p>
        <h2 id="email-title">Discuss an engagement.</h2>
        <a className="email-link" href="mailto:info@ikelosgroup.com">info@ikelosgroup.com <span aria-hidden="true">↗</span></a>
        <p>Send a high-level introduction by email. A short outline of your question and the kind of support you are looking for is enough to start.</p>
        <span className="contact-note">Bespoke vulnerability research / Cybersecurity consulting</span>
      </section>
      <section id="encrypted-email" className="contact-aside" aria-labelledby="encrypted-email-title">
        <p className="eyebrow">Encrypted correspondence</p>
        <h2 id="encrypted-email-title">Contact us with PGP.</h2>
        <a className="email-link secure-email-link" href="mailto:secure_email@ikelosgroup.com"><span>secure_email@<wbr />ikelosgroup.com</span><span aria-hidden="true">↗</span></a>
        <p>Download and import our public key into your OpenPGP-capable mail app, then encrypt your message before sending it to this address.</p>
        <a className="button key-download" href="/keys/ikelos-secure-email.asc" download="ikelos-secure-email.asc">Download public PGP key <span aria-hidden="true">↓</span></a>
        <dl className="key-details">
          <dt className="eyebrow">Public key fingerprint</dt>
          <dd><code>5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3</code></dd>
        </dl>
        <p className="encryption-note">Opening the email link does not encrypt your message automatically. Enable PGP encryption in your mail app before sending.</p>
      </section>
    </div>
    <div className="contact-closing wrap"><span className="square-dot" /><p>Every engagement starts with a specific question.</p></div>
  </>;
}
