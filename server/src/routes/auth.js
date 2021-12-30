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
const { initializePassport } = require("../../passportConfig");
const { generateAccessToken, authenticateToken } = require("../JWT/issueJWT");
const {
  registerController,
  loginController,
  logOut,
} = require("../controllers/authController");

const router = express.Router();

router.get("/register", async (req, res) => {
  try {
    await console.log("register get working");
    res.send({
      message: "get register!",
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/test", async (req, res) => {
  res.send({
    message: "the test route is working",
  });
});

router.post("/register", registerController);

router.get("/login", async (req, res) => {
  try {
    res.send("working");
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/login", loginController);

router.get("logout", logOut);

module.exports = router;
