import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isMentor = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user'))?.role === 'senior' : false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">GoMentor</div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-teal-300">About</Link>
          <Link to="/services" className="hover:text-teal-300">Services</Link>
          <Link to="/mentors" className="hover:text-teal-300">Mentors</Link>
          <span>🔔</span>
          {!isMentor && (
            <button className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded hover:from-green-600 hover:to-teal-600">
              Join as Expert
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Our Story */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600">
            GoMentor was created to support college students with personalized guidance. Started by peers, it’s now a growing community for learning and growth.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To empower every student with mentorship and resources to succeed in college and beyond.
          </p>
        </section>

        {/* Testimonials */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testimonials</h2>
          <div className="space-y-4">
            <p className="text-gray-600 italic">"GoMentor made my exam prep so much easier!" - Amit, 3rd Year</p>
            <p className="text-gray-600 italic">"Amazing support from mentors!" - Neha, 2nd Year</p>
          </div>
        </section>

        {/* Connect with Us */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect with Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-blue-600 hover:underline">Facebook</a>
            <a href="https://twitter.com" className="text-blue-600 hover:underline">Twitter</a>
            <a href="https://linkedin.com" className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;