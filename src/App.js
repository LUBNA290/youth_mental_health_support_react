import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import './styles/App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import TherapistDashboard from './pages/TherapistDashboard';
import UserBookings from './pages/UserBookings';

const App = () => (
  <Router>
    <Header />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
        <Route path="/bookings" element={<UserBookings />} />
        
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
