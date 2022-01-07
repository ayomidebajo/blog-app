const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { authenticateToken } = require("../JWT/issueJWT");

const router = express.Router();

router.get("/posts", authenticateToken, (req, res) => {
  res.json({
    post: "posts",
  });
});

module.exports = router;
