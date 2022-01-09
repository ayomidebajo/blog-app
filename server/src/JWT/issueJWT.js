const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(email) {
  return jwt.sign(email, process.env.SECRET, { expiresIn: "24h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({
      message: "A token is required for authentication",
    });

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        message: "Invalid token",
      });
    req.user = user;
    next();
  });
}
module.exports = { generateAccessToken, authenticateToken };
