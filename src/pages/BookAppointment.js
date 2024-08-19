import React, { useState } from 'react';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        alert('User ID is not available. Please log in again.');
        return;
      }

      const data = {
        user_id: userId,
        booking_time: time,
        booking_date: date,
        additional_notes: notes
      };

      const config = {
        method: 'post',
        url: 'http://localhost:7002/booking',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data
      };


      const response = await axios.request(config);
      console.log('Response:', response.data);
      setResponseMessage('Your appointment has been booked successfully!');

      setDate('');
      setTime('');
      setNotes('');
      
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('There was an error booking your appointment. Please try again later.');
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
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
