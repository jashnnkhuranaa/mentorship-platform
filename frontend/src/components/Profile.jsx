import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [services, setServices] = useState([{ name: '', price: 0 }]);
  const [seniors, setSeniors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5000/api/profile/seniors', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSeniors(res.data);
        // Mock current user data (replace with actual user fetch if needed)
        axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        }).then((userRes) => {
          setUser(userRes.data);
          setBio(userRes.data.bio || '');
          setServices(userRes.data.services || [{ name: '', price: 0 }]);
        }).catch((err) => console.error('Fetch user error:', err));
      })
      .catch((err) => console.error('Fetch seniors error:', err));
  }, [navigate]);

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { name: '', price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/profile/update',
        { bio, services },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Update failed: ' + (error.response?.data.message || 'Server error'));
    }
  };

  if (!user) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {user.role === 'senior' ? 'Your Profile' : 'Browse Seniors'}
      </h2>
      {user.role === 'senior' && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write about yourself..."
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <h3 className="text-lg font-bold mb-2">Services</h3>
          {services.map((service, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={service.name}
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                placeholder="Service Name"
                className="w-2/3 p-2 mr-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={service.price}
                onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                placeholder="Price"
                className="w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="mt-2 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Add Service
          </button>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      )}
      {user.role === 'junior' && (
        <div>
          <h3 className="text-lg font-bold mb-2">Available Seniors</h3>
          <ul>
            {seniors.map((senior) => (
              <li key={senior._id} className="mb-4 p-4 border rounded-md">
                <p className="font-bold">{senior.name}</p>
                <p>{senior.bio}</p>
                <p>
                  Services: {senior.services.map((s) => `${s.name} (₹${s.price})`).join(', ')}
                </p>
                <Link to={`/chat/${senior._id}`} className="text-blue-600 hover:underline mr-4">
                  Chat
                </Link>
                <Link to={`/booking/${senior._id}`} className="text-blue-600 hover:underline">
                  Book
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;