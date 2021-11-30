const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");

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
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// app.use(express.urlencoded({ extended: false }));

//ROUTES

//testing route
app.get("/", async (req, res) => {
  try {
    res.send("Hello");
    await console.log("test route working!");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/register", async (req, res) => {
  try {
    res.send("working");
    await console.log("register get working");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    let errors = [];
    let { username, email, password, confirmPassword } = req.body;
    console.log(req.body);
    // res.send("created!!");
    if (!username || !email || !password || !confirmPassword) {
      errors.push({
        message: "Please enter all fields",
      });
    }
    if (password.length < 8) {
      errors.push({
        message: "Password should be at least 8 characters",
      });
    }
    //   //do for confirm password
    if (confirmPassword != password) {
      errors.push({ message: "passwords don't match" });
    }
    console.log(errors.length, "len");
    if (errors.length > 0) {
      res.send(errors);
    } else {
      // res.send("created!!");
      let hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword, "hash");

      await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }

          if (results.rows.length > 0) {
            errors.push({ message: "Email already registered" });
            console.log(results.rows.length, "row length", errors.length);
            res.send(errors);
          } else {
            pool.query(
              `INSERT INTO users (username, password, email)
              VALUES ($1, $2, $3) RETURNING username, password`,
              [username, hashedPassword, email],
              (err, res) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows, "success");
                req.flash("sucess");
              }
            );
            res.send("created!!");
          }
        }
      );
    }
  } catch (error) {
    res.send(error);
    console.log(error.message);
  }
});
// authenticate options
// {
//   successMessage: "successfully logged in",
//   failureMessage: "login error",
// }

app.post("/login", (req, res) => {
  passport.authenticate("local", {
    successMessage: "successfully logged in",
    failureMessage: "login error",
  });

  res.send("logged in");
});

app.get("logout", (req, res) => {
  req.logOut();
});

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
