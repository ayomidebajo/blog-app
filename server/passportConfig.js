const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const pool = require("./db");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  algorithms: ["RS256"],
};

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, res) => {
      if (err) {
        throw err;
      }
      console.log(res.rows);

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
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      console.log(payload, "pay");
      return authenticateUser(payload.sub);
    })
  );
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

module.exports = initialize;
