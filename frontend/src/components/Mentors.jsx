import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Mentors({ user }) {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mentors');
        setMentors(res.data);
      } catch (err) {
        alert('Error fetching mentors');
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Available Mentors</h2>
      <div className="grid grid-cols-1 gap-4">
        {mentors.map(mentor => (
          <div key={mentor._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl">{mentor.name}</h3>
            <p>{mentor.email}</p>
            {user && user.role === 'junior' && (
              <div className="space-x-2">
                <Link to={`/chat/${mentor._id}`} className="bg-blue-600 text-white p-2 rounded">Chat</Link>
                <Link to={`/booking/${mentor._id}`} className="bg-green-600 text-white p-2 rounded">Book Session</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mentors;