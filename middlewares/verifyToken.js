const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authentication;
  if (!authToken) {
    return res.status(401).json({ message: "unauthorized access" });
  }
  const token = authToken.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken