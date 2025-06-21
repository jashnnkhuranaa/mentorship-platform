import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('junior');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
      localStorage.setItem('token', response.data.token);
      toast.success('Signup successful! Redirecting...');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">GoMentor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-md hover:from-green-600 hover:to-teal-600 transition duration-200"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-teal-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;