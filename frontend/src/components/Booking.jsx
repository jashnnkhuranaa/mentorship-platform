import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Booking() {
  const { seniorId } = useParams();
  const [senior, setSenior] = useState(null);
  const [selectedService, setSelectedService] = useState('');
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
        const found = res.data.find((s) => s._id === seniorId);
        if (found) setSenior(found);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [seniorId, navigate]);

  const handleBooking = async () => {
    if (!selectedService) {
      alert('Please select a service');
      return;
    }

    const token = localStorage.getItem('token');
    const service = senior.services.find((s) => s.name === selectedService);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/booking/create',
        { seniorId, service },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: 'rzp_test_xxxxxxxxxxxx', // Replace with your Razorpay test key
        amount: service.price * 100,
        currency: 'INR',
        name: 'College Guidance Platform',
        description: `Booking for ${service.name}`,
        handler: async function (response) {
          await axios.post(
            `http://localhost:5000/api/booking/update/${res.data.bookingId}`,
            { status: 'paid' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('Payment successful! Joining video call...');

          const domain = 'meet.jit.si';
          const jitsiRoom = res.data.jitsiRoom;
          new window.JitsiMeetExternalAPI(domain, {
            roomName: jitsiRoom,
            width: '100%',
            height: 500,
            parentNode: document.querySelector('#jitsi-meet-container'),
          });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Booking error: ' + (error.response?.data.message || 'Server error'));
    }
  };

  if (!senior) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Session with {senior.name}</h2>
      <p>{senior.bio}</p>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a service</option>
        {senior.services.map((service, index) => (
          <option key={index} value={service.name}>
            {service.name} (₹{service.price})
          </option>
        ))}
      </select>
      <button
        onClick={handleBooking}
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Book Now
      </button>
      <div id="jitsi-meet-container" className="mt-4"></div>
    </div>
  );
}

export default Booking;