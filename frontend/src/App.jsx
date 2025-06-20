import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';
import Booking from './components/Booking.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:seniorId" element={<Chat />} />
        <Route path="/booking/:seniorId" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard */}
      </Routes>
    </div>
  );
}

export default App;