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
    await pool.query(`SELECT * FROM users WHERE email = $1`);
  } catch (error) {}
};
