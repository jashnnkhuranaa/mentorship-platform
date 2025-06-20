import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to College Guidance Hub</h1>
      <p className="text-lg mb-6">Get personalized support for your college journey – connect with mentors, prep for exams, and explore opportunities.</p>
      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Describe your need... (e.g., 'Help with placement prep')"
          className="w-full p-3 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none"
        />
        <button className="bg-blue-600 p-3 rounded-r-md hover:bg-blue-700">
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <button className="bg-gray-800 p-3 rounded hover:bg-gray-700">Placement Prep</button>
        <button className="bg-gray-800 p-3 rounded hover:bg-gray-700">Exam Guidance</button>
        <button className="bg-gray-800 p-3 rounded hover:bg-gray-700">Mentor Chat</button>
        <button className="bg-gray-800 p-3 rounded hover:bg-gray-700">Internship Help</button>
      </div>
    </div>
  );
}

export default Dashboard;