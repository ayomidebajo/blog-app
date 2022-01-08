const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { authenticateToken } = require("../JWT/issueJWT");

const { createPost } = require("../controllers/postController");

const router = express.Router();

router.get("/posts", authenticateToken, (req, res) => {
  res.json({
    post: "posts",
  });
});

router.post("/create-post", authenticateToken, createPost);

module.exports = router;
