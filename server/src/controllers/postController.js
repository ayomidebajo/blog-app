const pool = require("../../db/db");
const date = require("date-and-time");
const { v4: uuidv4 } = require("uuid");

const createPost = async (req, res, next) => {
  try {
    let { body, title, author, draft } = req.body;
    let now = new Date();
    await pool.query(
      `INSERT INTO posts (author,title, body, draft, post_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        author,
        title,
        body,
        draft,
        uuidv4(),
        date.format(now, "YYYY/MM/DD HH:mm:ss"),
      ],
      async (err, results) => {
        if (err) {
          throw err;
        }

        await pool.query(
          `SELECT * FROM posts`,

          async (err, results) => {
            if (err) {
              throw err;
            }

            res.json({
              data: results.rows,
            });
          }
        );
      }
    );
  } catch (error) {
    throw next(error);
  }
};

module.exports = { createPost };
