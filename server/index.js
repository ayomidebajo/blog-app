const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { initializePassport } = require("./passportConfig");
const {
  generateAccessToken,
  authenticateToken,
} = require("./src/JWT/issueJWT");
const authRouter = require("./src/routes/auth");

initializePassport(passport);

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// app.use(express.urlencoded({ extended: false }));

//ROUTES

//testing route
app.use("/api", authRouter);

// app.get("logout", (req, res) => {
//   req.logOut();
// });

//custom middlewares to be placed in routes
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/home");
//   }
//   next();
// }

// function checkNotAuthenticated(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }
//   next();
// }
app.listen(PORT, () => {
  console.log("server has started on port 5000");
});
