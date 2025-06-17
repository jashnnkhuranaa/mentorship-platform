import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';
import Booking from './components/Booking.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:seniorId" element={<Chat />} />
          <Route path="/booking/:seniorId" element={<Booking />} />
          <Route path="/" element={<h1 className="text-3xl font-bold text-center mt-6">College Guidance Platform</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;