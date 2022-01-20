const pool = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const date = require("date-and-time");
const { v4: uuidv4 } = require("uuid");
const createProfile = require("../utils/createProfile");

const registerController = async (req, res, next) => {
  try {
    let errors = [];
    let { username, email, password, confirmPassword } = req.body;
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
    if (errors.length > 0) {
      res.json(errors);
    } else {
      // res.send("created!!");
      let hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        async (err, results) => {
          if (err) {
            throw err;
          }
          const now = new Date();

          if (results.rows.length > 0) {
            errors.push({ message: "Email already registered" });
            res.status(403).json(errors);
          } else {
            await pool.query(
              `INSERT INTO users (username, password, email, created_on, user_id)
              VALUES ($1, $2, $3, $4, $5) RETURNING id`,
              [
                username,
                hashedPassword,
                email,
                date.format(now, "YYYY/MM/DD HH:mm:ss"),
                uuidv4(),
              ],
              (err, res) => {
                if (err) {
                  throw err;
                }
                console.log(res.rows[0]?.id, "hey");
                createProfile(res.rows[0]?.id, username);
              }
            );
            //    CREATE TABLE users (
            // id serial PRIMARY KEY,
            // user_id VARCHAR,
            // username VARCHAR(50) UNIQUE NOT NULL,
            // password VARCHAR(50) NOT NULL,
            // email VARCHAR(255) UNIQUE NOT NULL,
            // created_on TIMESTAMP
            // );
            res.json({ message: "account created" });
          }
        }
      );
    }
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
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
            const token = jwt.sign({ user: username }, process.env.SECRET, {
              expiresIn: "2days",
            });
            res.cookie("token", token, {
              maxAge: new Date(Date.now() + 90000),
              httpOnly: true,
            });
            res.json({ token: token, username: results.rows[0].username });
          } else {
            res.status(401).json({
              data: "incorrect password or email",
            });
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
};

const logOut = async (req, res, next) => {
  req.logOut();
  next();
};

const changePassword = async (req, res, next) => {
  try {
    let { oldPassword, newPassword, username } = req.body;
    await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          if (
            results.rows[0] &&
            bcrypt.compareSync(oldPassword, results.rows[0].password)
          ) {
            if (oldPassword !== newPassword) {
              let hashedPassword = await bcrypt.hash(newPassword, 10);

              await pool.query(
                `UPDATE users SET password = $1 WHERE username = $2`,
                [hashedPassword, username]
              );
            }
            res.json({
              data: "Password changed sucessfully",
            });
          } else {
            res.json({
              data: "new passwords can't be the same as the old password",
            });
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
};

module.exports = {
  registerController,
  loginController,
  logOut,
  changePassword,
};
