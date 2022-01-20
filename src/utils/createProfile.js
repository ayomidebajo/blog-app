const pool = require("../../db/db");
const date = require("date-and-time");
const now = new Date();

const createProfile = async (id, username) => {
  console.log(id, "see");
  try {
    await pool.query(
      `INSERT INTO profile (user_id, created_at, username) VALUES ($1, $2, $3) RETURNING id`,
      [id, date.format(now, "YYYY/MM/DD HH:mm:ss"), username]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = createProfile;
