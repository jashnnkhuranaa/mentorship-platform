import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const services = [
    {
      title: 'Resume Reviewer',
      description: 'Get expert feedback to perfect your resume and stand out to recruiters.',
    },
    {
      title: 'Ace Academics',
      description: 'Personalized guidance to excel in your college exams and assignments.',
    },
    {
      title: '1:1 Conversation',
      description: 'Direct mentorship sessions with experienced seniors for tailored advice.',
    },
    {
      title: 'Community Support',
      description: 'Join a network of peers and mentors for ongoing support and collaboration.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 flex justify-between items-center shadow-lg">
        <div className="text-2xl font-bold">GoMentor</div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-teal-300">About</Link>
          <Link to="/services" className="text-teal-300">Services</Link>
          <Link to="/mentors" className="hover:text-teal-300">Mentors</Link>
          <span>🔔</span>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded hover:from-green-600 hover:to-teal-600">
            Join as Expert
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;