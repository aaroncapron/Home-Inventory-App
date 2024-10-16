const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const secretKey = process.env.SECRET_KEY;

const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  return user;
};

const authenticate = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Invalid username or password');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid username or password');
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { register, authenticate };