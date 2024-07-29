import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <h1>Youth Mental Health Support</h1>
    <nav>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/resources" className="nav-link">Resources</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  </header>
);

export default Header;