const express = require('express');
const router = express.Router();
const { register, authenticate } = require('../utils/auth');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await register(username, password);
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authenticate(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid username and/or password' });
  }
});

module.exports = router;