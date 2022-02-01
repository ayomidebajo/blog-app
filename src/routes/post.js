const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { authenticateToken } = require("../JWT/issueJWT");

//ADD POST DB ON HEROKU

const {
  createPost,
  createComment,
  getPosts,
  getSinglePost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/posts", authenticateToken, getPosts);

router.post("/create-post", authenticateToken, createPost);
router.post("/create-comment", authenticateToken, createComment);
router.get("/post/:id", authenticateToken, getSinglePost);

module.exports = router;
