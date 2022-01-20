//Todo add endpoint for viewing profile
const pool = require("../../db/db");
const viewProfile = async (req, res, next) => {
  try {
    let errors = [];
    let username = req.body;
    if (!username) {
      errors.push({
        message: "You don't have access, please login",
      });
    }

    if (errors.length > 0) {
      res.status(404).json({
        message: errors.message,
      });
    }
    console.log(req.params, "not alone");
    await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [req.params.id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rowCount.length > 0) {
          res.status(200).json({
            data: results.rows,
          });
        }
      }
    );
  } catch (error) {
    throw next(error);
  }
};

const editUsername = async (req, res, next) => {
  try {
    let errors = [];
    let { username, user_id } = req.body;
    if (!username) {
      errors.push({
        message: "You don't have access, please login",
      });
    }
    console.log(req.params, "not alone");
    await pool.query(
      `UPDATE profile SET user_name = $1 WHERE user_id = $2`,
      [username, user_id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rowCount.length > 0) {
          errors.push({ message: "Not found" });
          res.status(403).json(errors);
        } else {
          res.json({
            data: "Username updated successfully!",
          });
        }
      }
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = { viewProfile, editUsername };
