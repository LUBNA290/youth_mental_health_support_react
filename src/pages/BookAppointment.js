import React, { useState } from 'react';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the API
    const data = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      date: date,
      time: time,
      notes: notes
    });

    // API configuration
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:7002/appointment',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    // Send the data using axios
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setResponseMessage('Your appointment has been booked successfully!');
        // Clear the form fields after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setTime('');
        setNotes('');
      })
      .catch((error) => {
        console.log(error);
        setResponseMessage('There was an error booking your appointment. Please try again later.');
      });
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
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
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any additional notes or requests"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default BookAppointment;
