import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';
import Booking from './components/Booking.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:seniorId" element={<Chat />} />
        <Route path="/booking/:seniorId" element={<Booking />} />
        <Route
          path="/"
          element={
            <div className="text-center p-10">
              <h1 className="text-3xl font-bold mb-4">College Guidance Platform</h1>
              <p className="text-lg mb-4">Welcome! Get started with your career guidance.</p>
              <div className="space-x-4">
                <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
                <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;