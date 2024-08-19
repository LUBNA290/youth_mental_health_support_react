import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TherapistDashboard.css';

const TherapistDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [badges, setBadges] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');

  useEffect(() => {
    fetchBookings();
    fetchBadges();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:7002/booking');
      if (response.data.status === 200) {
        setBookings(response.data.bookings);
      } else {
        setErrorMessage('Failed to fetch bookings.');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setErrorMessage('An error occurred while fetching bookings. Please try again later.');
    }
  };

  const fetchBadges = async () => {
    try {
      const response = await axios.get('http://localhost:7002/badges');
      if (response.data.status === 200) {
        setBadges(response.data.badges);
      } else {
        setErrorMessage('Failed to fetch badges.');
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
      setErrorMessage('An error occurred while fetching badges. Please try again later.');
    }
  };

  const handleStatusClick = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setShowStatusModal(true);
  };

  const handleAssignColorClick = (booking) => {
    setSelectedBooking(booking);
    setShowBadgeModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedBooking) return;

    try {
      await axios.put(`http://localhost:7002/booking/${selectedBooking.booking_id}/status`, { status: newStatus });
      setBookings(bookings.map(b => 
        b.booking_id === selectedBooking.booking_id ? { ...b, status: newStatus } : b
      ));
      setShowStatusModal(false);
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('An error occurred while updating the status. Please try again later.');
    }
  };

  const handleBadgeUpdate = async () => {
    if (!selectedBooking || !selectedBadge) return;

    try {
      await axios.post('http://localhost:7002/badge-assign', {
        user_id: selectedBooking.user_id,
        badge_id: selectedBadge
      });

      await fetchBookings();
      setShowBadgeModal(false);
    } catch (error) {
      console.error('Error assigning badge:', error);
      setErrorMessage('An error occurred while assigning the badge. Please try again later.');
    }
  };

  return (
    <div className="therapist-dashboard">
      <h2>Therapist Dashboard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
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
            <th>Badge</th>
            <th>Actions</th>
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
                <td>{booking.badge_color || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => handleStatusClick(booking)} 
                    className="action-button status-button"
                  >
                    Status
                  </button>
                  <button 
                    onClick={() => handleAssignColorClick(booking)} 
                    className="action-button color-button"
                  >
                    Assign Color
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Status for Booking ID: {selectedBooking.booking_id}</h3>
            <label>
              Status:
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <button onClick={handleStatusUpdate}>Update Status</button>
            <button onClick={() => setShowStatusModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Badge Assignment Modal */}
      {showBadgeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign Badge to Booking ID: {selectedBooking.booking_id}</h3>
            <label>
              Select Badge:
              <select value={selectedBadge} onChange={(e) => setSelectedBadge(e.target.value)}>
                <option value="">Select a badge</option>
                {badges.map(badge => (
                  <option key={badge.badge_id} value={badge.badge_id}>
                    {badge.badge_color}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleBadgeUpdate}>Assign Badge</button>
            <button onClick={() => setShowBadgeModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistDashboard;
