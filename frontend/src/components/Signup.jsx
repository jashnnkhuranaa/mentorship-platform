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
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
      <p className="mt-2 text-center">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
}

export default Signup;