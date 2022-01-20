const pool = require("../../db/db");
const date = require("date-and-time");
const now = new Date();

const createNotifications = async (id) => {
  console.log(id, "see");
  try {
    await pool.query(
      `INSERT INTO notifications (user_id, created_at) VALUES ($1, $2) RETURNING id`,
      [id, date.format(now, "YYYY/MM/DD HH:mm:ss")]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = createNotifications;
