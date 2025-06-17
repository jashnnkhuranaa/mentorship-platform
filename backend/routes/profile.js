const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/seniors', async (req, res) => {
  try {
    const seniors = await User.find({ role: 'senior' }).select('name bio services');
    res.json(seniors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', authMiddleware, async (req, res) => {
  const { bio, services } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.bio = bio || user.bio;
    user.services = services || user.services;
    await user.save();

    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;