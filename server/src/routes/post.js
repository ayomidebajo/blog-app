const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const pool = require("../../db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/posts", authenticateToken, (req, res) => {
  res.json({
    post: "posts",
  });
});
