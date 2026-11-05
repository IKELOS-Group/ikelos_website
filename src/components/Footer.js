import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';

export default function Footer() {
  return <footer className="site-footer wrap">
    <div className="footer-top"><Link to="/" className="footer-brand" aria-label="IKELOS Group home"><Brand /></Link><p className="brand-slogan" lang="la">In Silentio, Vincimus</p><a href="mailto:info@ikelosgroup.com">info@ikelosgroup.com <span aria-hidden="true">↗</span></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} IKELOS Group</span><nav aria-label="Footer navigation"><Link to="/services">Capabilities</Link><Link to="/about">Approach</Link><Link to="/contact">Contact</Link></nav><span className="footer-note">Precision in the details.</span></div>
  </footer>;
}
