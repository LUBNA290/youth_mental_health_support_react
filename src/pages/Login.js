import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Image from './7749157.jpg'; // Import your image

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = JSON.stringify({
      userEmail: email,
      Password: password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:7002/ymhs/autenticate/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      const { token, role, user_id } = response.data;

      // Store the token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      window.location.href = '/dashboard';
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <a href="/signup">Create an Account</a>
        </div>
      </div>
      <div className="image-container">
        <img src={Image} alt="Mental Health" className="login-image" />
      </div>
    </div>
  );
};

export default LoginPage;
