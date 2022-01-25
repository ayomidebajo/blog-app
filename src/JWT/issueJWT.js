const jwt = require("jsonwebtoken");
const decoded = require("jwt-decode");
require("dotenv").config();

function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET, { expiresIn: "24h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({
      message: "A token is required for authentication",
    });

  try {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      // console.log(user, "user");

      next();
    });
  } catch (error) {
    res.status(404).json({
      message: "Invalid token",
    });
  }
}

function authenticateTokenToGetUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({
      message: "A token is required for authentication",
    });

  try {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      res.status(200).json({
        user: user.user,
      });

      next();
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { generateAccessToken, authenticateToken };
