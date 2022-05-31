const jwt = require("jsonwebtoken");

const generateToken = id => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN });
};

module.exports = { generateToken };