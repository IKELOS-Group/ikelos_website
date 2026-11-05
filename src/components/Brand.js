import React from 'react';
import logo from '../assets/ikelos-group-logo.png';

// Frame the supplied artwork without changing the original image. The dark-site
// treatment is applied in CSS so the emblem, lettering, and slogan stay intact.
export default function Brand() {
  return <svg className="brand-logo" viewBox="224 164 1725 385" aria-hidden="true" focusable="false">
    <image href={logo} width="2172" height="724" />
  </svg>;
}
