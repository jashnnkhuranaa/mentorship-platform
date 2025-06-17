import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat() {
  const { seniorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode token to get userId (simplified, assumes JWT structure)
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded.userId;

    // Fetch chat history
    axios
      .get(`http://localhost:5000/api/chat/history?sender=${userId}&receiver=${seniorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Fetch chat error:', err));

    // Join chat room
    socket.emit('joinRoom', { senderId: userId, receiverId: seniorId });

    // Receive messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [seniorId, navigate]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    socket.emit('sendMessage', {
      senderId: decoded.userId,
      receiverId: seniorId,
      message,
    });
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat</h2>
      <div className="h-64 bg-gray-100 p-4 rounded-md mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-md ${
              msg.senderId === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId
                ? 'text-right bg-blue-200'
                : 'bg-gray-200'
            }`}
          >
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;