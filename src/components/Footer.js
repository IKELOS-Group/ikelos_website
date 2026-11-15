import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';

export default function Footer() {
  return <footer className="site-footer wrap">
    <div className="footer-top"><Link to="/" className="footer-brand" aria-label="IKELOS Group home"><Brand /></Link><a href="mailto:info@ikelosgroup.com">info@ikelosgroup.com</a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} IKELOS Group, LLC</span><nav aria-label="Footer navigation"><Link to="/services">Capabilities</Link><Link to="/capabilities/firmware-emulation">Firmware &amp; emulation</Link><Link to="/about">Approach</Link><Link to="/contact">Contact</Link><Link to="/contact#partnerships">Partnerships</Link></nav></div>
  </footer>;
}
