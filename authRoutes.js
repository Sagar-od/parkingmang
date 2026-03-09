const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, contact, address, role } = req.body;
    
    // Generate a unique Customer ID
    const count = await User.countDocuments();
    const customerId = `PS-${1000 + count}`;

    const user = new User({ 
      name, email, password, contact, address, customerId, 
      role: role || 'customer' 
    });
    
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'park_story_secret_key_2024', { expiresIn: '24h' });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'park_story_secret_key_2024', { expiresIn: '24h' });
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
