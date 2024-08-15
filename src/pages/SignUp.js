import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import Image from "./7792851.jpg";

const SignupPage = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      userName: userName,
      email: email,
      mobileNo: mobileNo,
      address: address,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
    };

    const config = {
      method: 'post',
      url: 'http://localhost:7002/ymhs/autenticate/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data) // Convert data to JSON string
    };

    try {
      const response = await axios.request(config);
      setSuccessMessage('Registration successful! Please log in.');
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle error responses from the API
        setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
        setSuccessMessage('');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="image-container">
        <img src={Image} alt="Signup" className="signup-image" />
      </div>
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="mobileNo">Mobile No</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder="Enter your mobile number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="therapist">Therapist</option>
            </select>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <a href="/login">Already have an account? Login here</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
