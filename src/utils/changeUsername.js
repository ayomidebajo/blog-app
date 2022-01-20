const pool = require("../../db/db");

const createProfile = async (data) => {
  console.log(id, "see");
  ///TODO search if username exists
  /// TODO search if the new username is available
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
