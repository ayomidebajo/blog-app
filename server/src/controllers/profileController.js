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
    console.log(req.params, "not alone");
    await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [req.params.id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rowCount.length > 0) {
          errors.push({ message: "Email already registered" });
          res.status(403).json(errors);
        } else {
          res.json({
            data: results.rows,
          });
        }
      }
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = { viewProfile };
