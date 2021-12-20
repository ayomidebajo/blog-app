const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { initializePassport } = require("./passportConfig");
const { generateAccessToken, authenticateToken } = require("./JWT/issueJWT");

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
      res.json(errors);
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
            res.status(403).json(errors);
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
                // req.flash("sucess");
              }
            );
            res.json({ message: "account created" });
          }
        }
      );
    }
  } catch (error) {
    return next(error);
    // res.send(error);
    // console.log(error.message);
  }
});
// authenticate options
// {
//   successMessage: "successfully logged in",
//   failureMessage: "login error",
// }

app.get("/login", async (req, res) => {
  try {
    res.send("working");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          if (
            results.rows[0] &&
            bcrypt.compareSync(password, results.rows[0].password)
          ) {
            const options = {
              expiresIn: "2 days",
            };
            const token = jwt.sign({ user: email }, process.env.SECRET, {
              expiresIn: "2days",
            });
            res.cookie("token", token, {
              maxAge: new Date(Date.now() + 90000),
              httpOnly: true,
            });
            res.json({ token: token, username: results.rows[0].username });
          }
          //  60 * 60 * 24 * 1 * 1000,
        } else {
          res.status(404).json({ message: "user does not exist" });
        }
      }
    );
  } catch (error) {
    return next(error);
  }
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json({
    post: "posts",
  });
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
