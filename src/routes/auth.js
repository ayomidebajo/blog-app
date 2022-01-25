const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {
  registerController,
  loginController,
  logOut,
  changePassword,
} = require("../controllers/authController");
const { authenticateToken } = require("../JWT/issueJWT");

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
router.post("/change-password", authenticateToken, changePassword);

router.get("/logout", authenticateToken, logOut);

module.exports = router;
