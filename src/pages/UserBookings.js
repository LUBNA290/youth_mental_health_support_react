import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserBookings.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      // setUserId(storedUserId);
      fetchBookings(storedUserId);
    } else {
      setErrorMessage('User ID not found. Please log in again.');
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7002/user-bookings/${userId}`);
      if (response.data.status === 200) {
        setBookings(response.data.bookings);
      } else {
        setErrorMessage('Failed to fetch bookings.');
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      setErrorMessage('An error occurred while fetching your bookings. Please try again later.');
    }
  };

  const handleCreateBookingClick = () => {
    navigate('/book-appointment');
  };

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <button className="create-booking-button" onClick={handleCreateBookingClick}>
        Create Booking
      </button>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Condition</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>Additional Notes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.email}</td>
                <td>{booking.full_name || 'N/A'}</td>
                <td>{booking.condition}</td>
                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.additional_notes}</td>
                <td>{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookings;
