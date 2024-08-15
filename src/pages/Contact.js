import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the API
    const data = JSON.stringify({
      name: name,
      email: email,
      message: message
    });

    // API configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:7002/contact',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    // Send the data using axios
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setResponseMessage('Your message has been sent successfully!');
        // Clear the form fields after successful submission
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
        setResponseMessage('There was an error sending your message. Please try again later.');
      });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="contact-button">Submit</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default ContactUs;
