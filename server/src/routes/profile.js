const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {
  viewProfile,
  editUsername,
} = require("../controllers/profileController");
const { authenticateToken } = require("../JWT/issueJWT");

const router = express.Router();

router.get("/profile/:id", authenticateToken, viewProfile);
router.patch("/profile-edit/:id", authenticateToken, editUsername);

module.exports = router;
