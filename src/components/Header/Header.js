import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <header className="header">
      <h1>Youth Mental Health Support</h1>
      <nav>
        {!isLoggedIn && <Link to="/" className="nav-link">Home</Link>}
        {isLoggedIn && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
        <Link to="/resources" className="nav-link">Resources</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        {isLoggedIn && <button onClick={handleLogout} className="nav-link logout-button">Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
