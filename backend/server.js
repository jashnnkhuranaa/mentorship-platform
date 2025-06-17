const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const bookingRoutes = require('./routes/booking');
const Chat = require('./models/Chat');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/booking', bookingRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const room = [senderId, receiverId].sort().join('-');
    socket.join(room);
  });

  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    const room = [senderId, receiverId].sort().join('-');
    try {
      const chat = new Chat({ sender: senderId, receiver: receiverId, message });
      await chat.save();
      io.to(room).emit('receiveMessage', { senderId, message, timestamp: chat.timestamp });
    } catch (error) {
      console.error('Chat error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));