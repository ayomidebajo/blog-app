require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/db");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  algorithms: ["RS256"],
};

console.log(process.env.SECRET, "lol");
function initializePassport(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, res) => {
      if (err) {
        throw err;
      }

      if (res.rows.length > 0) {
        const user = res.rows[0];
        // console.log(user, "logs user");
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "password is incorrect" });
          }
        });
      } else {
        return done(null, false, { message: "username not registered" });
      }
    });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.use(new JwtStrategy(options, authenticateUser));
  passport.serializeUser((user, done) => (null, user.id));
  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, result) => {
      if (err) {
        throw err;
      }
      return done(null, result.rows[0]);
    });
  });
}

const authenticateUser = (req, res, done) => {
  const { email, password, username } = req.body;
  const response = res;
  pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, res) => {
    if (err) {
      throw err;
    }
    if (res.rows.length > 0) {
      const user = res.rows[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (isMatch) {
          const token = jwt.sign({ user: req.body.email }, process.env.SECRET);
          response.json({ token, user: user?.username });
        } else {
          response.json({ message: "user not registered!" });
        }
      });
    } else {
      response.json({ message: "user not registered!" });
    }
  });
};

module.exports = { initializePassport, authenticateUser };
