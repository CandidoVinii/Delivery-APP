require('dotenv/config').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

export const validateToken = (req, res, next) => {
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

