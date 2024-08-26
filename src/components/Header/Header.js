import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <header className="header">
      <h1>Youth Mental Health Support</h1>
      <nav>
        {!isLoggedIn && <Link to="/" className="nav-link">Home</Link>}
        
        {isLoggedIn && (
          userRole === 'user' ? (
            <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/bookings" className="nav-link">Bookings</Link>
            <Link to="/motivational-stories" className="nav-link">Stories</Link>
            </>
          ) : (
            <>
            <Link to="/therapist-dashboard" className="nav-link">Therapist Dashboard</Link>
            <Link to="/motivational-stories" className="nav-link">Stories</Link>
            </>
          )
        )}
        

        <Link to="/resources" className="nav-link">Resources</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        
        {isLoggedIn && <button onClick={handleLogout} className="nav-link logout-button">Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
