const pool = require("../../db/db");
const date = require("date-and-time");
const now = new Date();

const createProfile = async (data) => {
  console.log(id, "see");
  try {
    await pool.query(`UPDATE profile SET username = $1 WHERE user_id = $2`, [
      data.username,
      data.user_id,
    ]);
  } catch (error) {
    throw error;
  }
};

module.exports = createProfile;