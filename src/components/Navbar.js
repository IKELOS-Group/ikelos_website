// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Ikelos Group</h1>
      <div className="links">
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
