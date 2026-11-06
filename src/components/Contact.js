import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return <>
    <section className="page-hero contact-hero wrap">
      <h1>Contact</h1>
      <a className="email-link" href="mailto:info@ikelosgroup.com">info@ikelosgroup.com</a>
      <p className="page-lede">Start with a high-level introduction: the system, your assessment objective, available access or documentation, and the desired timeline.</p>
      <div className="page-jump-links">
        <Link to="#partnerships">Partnership inquiries</Link>
        <Link to="#encrypted-email">Encrypted correspondence</Link>
      </div>
    </section>

    <section className="section wrap content-section initial-workflow" aria-labelledby="initial-workflow-title">
      <h2 id="initial-workflow-title">Initial workflow</h2>
      <ol>
        <li>Introductory discussion</li>
        <li>Confidentiality arrangements as needed</li>
        <li>Objectives and access review</li>
        <li>Scoped proposal</li>
      </ol>
    </section>

    <section id="partnerships" className="section wrap content-section" aria-labelledby="partnerships-title">
      <h2 id="partnerships-title">Partnership inquiries</h2>
      <div className="prose">
        <ul className="partnership-prompts">
          <li>The broader engagement and research questions IKELOS would own.</li>
          <li>Evidence needed for engineering and stakeholder deliverables.</li>
          <li>Available access, documentation, timeline, and team interfaces.</li>
          <li>Proposed responsibilities, reporting, confidentiality, and intellectual property (IP) arrangements.</li>
        </ul>
        <a className="text-link" href="mailto:info@ikelosgroup.com">Discuss a partnership by email</a>
      </div>
    </section>

    <section id="encrypted-email" className="section wrap content-section" aria-labelledby="encrypted-email-title">
      <h2 id="encrypted-email-title">Encrypted correspondence</h2>
      <div className="prose">
        <a className="email-link secure-email-link" aria-label="secure_email@ikelosgroup.com" href="mailto:secure_email@ikelosgroup.com">secure_email@<wbr />ikelosgroup.com</a>
        <p>Download and import our public key into your OpenPGP-capable mail app, then encrypt your message before sending it to this address.</p>
        <a className="text-link key-download" href="/keys/ikelos-secure-email.asc" download="ikelos-secure-email.asc">Download public PGP key</a>
        <dl className="key-details">
          <dt className="label">Public key fingerprint</dt>
          <dd><code>5AD6 A645 E697 72E5 AA7C 0277 DB44 9499 7C6F 00D3</code></dd>
        </dl>
        <p>Opening the email link does not encrypt your message automatically. Enable PGP encryption in your mail app before sending.</p>
      </div>
    </section>
  </>;
}
