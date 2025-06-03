const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

// Create a JWT token
function createToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify a JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

// Decode a JWT token without verifying
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};

//token.js