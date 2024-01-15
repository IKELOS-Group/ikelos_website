// src/components/Footer.js
import React from 'react';
import '../Footer.css'; // Make sure the path to your CSS file is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="/" target="https://www.instagram.com" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="/" target="https://www.facebook.com" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
      {/* Additional footer content goes here */}
    </footer>
  );
};

export default Footer;
