const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { viewProfile } = require("../controllers/profileController");
const { authenticateToken } = require("../JWT/issueJWT");

const router = express.Router();

router.get("/profile/:id", authenticateToken, viewProfile);

module.exports = router;
