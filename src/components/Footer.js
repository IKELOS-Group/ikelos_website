import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';
import { practices } from './ResearchFoundation';
export default function Footer() {
  return <footer className="site-footer wrap"><div className="footer-top"><Link to="/" className="footer-brand" aria-label="IKELOS Group home"><Brand/></Link><a href="mailto:info@ikelosgroup.com">info@ikelosgroup.com</a></div><nav className="footer-directory" aria-label="Footer navigation"><div><p className="label">Research practices</p>{practices.map(p=><Link key={p.key} to={p.path}>{p.title}</Link>)}</div><div><p className="label">Research foundations</p><Link to="/products/phobetor">PHOBETOR</Link><Link to="/products/veiltrace">VEILTRACE</Link></div><div><p className="label">Work with IKELOS</p><Link to="/engagements">For primes and government</Link><Link to="/about">How we work</Link><Link to="/contact">Discuss a research engagement</Link><Link to="/contact#partnerships">Partnerships</Link><Link to="/contact#encrypted-email">Encrypted correspondence</Link></div></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} IKELOS Group, LLC</span><span>First Principles. Decisive Effects.</span></div></footer>;
}
