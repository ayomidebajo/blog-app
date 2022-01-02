const pool = require("../../db/db");

const createProfile = (data) => {
  try {
    await pool.query(`UPDATE profile SET user_id =  WHERE email = data.user`, [
      data.user,
      data.created_at,
    ]);
  } catch (error) {
    throw error;
  }
};
