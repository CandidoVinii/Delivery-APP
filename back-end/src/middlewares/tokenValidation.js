require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, JWT_SECRET);

    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
module.exports = validateToken;
