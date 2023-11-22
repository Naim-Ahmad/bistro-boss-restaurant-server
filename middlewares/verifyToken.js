const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const token = req.headers.authentication;
  if (!token) {
    return res.status(401).json({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken