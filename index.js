const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bodyParser = require("body-parser");
// import sslRedirect from "heroku-ssl-redirect";

// const sslRedirect = require("heroku-ssl-redirect");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { initializePassport } = require("./passportConfig");
const authRouter = require("./src/routes/auth");
const postRouter = require("./src/routes/post");
const profileRouter = require("./src/routes/profile");

initializePassport(passport);

const PORT = process.env.PORT || 5000;

//middleware
// app.use(sslRedirect());
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "client/build")));
// app.use(express.static("client/build"));
//ROUTES

//testing route
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", profileRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("server has started on port 5000");
});
