import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';
import Booking from './components/Booking.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:seniorId" element={<Chat />} />
        <Route path="/booking/:seniorId" element={<Booking />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<div>Services Page (Under Development)</div>} />
        <Route path="/mentors" element={<div>Mentors Page (Under Development)</div>} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Fallback to login */}
      </Routes>
    </div>
  );
}

export default App;