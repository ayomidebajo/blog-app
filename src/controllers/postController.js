const pool = require("../../db/db");
const date = require("date-and-time");
const { v4: uuidv4 } = require("uuid");

const createPost = async (req, res, next) => {
  //TODO add parser for images and gifs
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

const createComment = async (req, res, next) => {
  try {
    let { user_id, body } = req.body;
    let now = new Date();
    await pool.query(
      `INSERT INTO comments (user_id, body, post_id, created_on) VALUES ($1, $2, $3, $4)`,
      [user_id, body, uuidv4(), date.format(now, "YYYY/MM/DD HH:mm:ss")],
      async (err, results) => {
        if (err) {
          throw err;
        }

        await pool.query(
          `SELECT * FROM comments`,

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

const getPosts = async (req, res, next) => {
  try {
    await pool.query(
      `SELECT * FROM posts`,

      async (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows, "res");
        res.json({
          data: results.rows,
        });
      }
    );
  } catch (error) {
    throw next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    await pool.query(
      `SELECT * FROM posts WHERE post_id = $1`,
      [req.params.id],
      async (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows, "res");
        res.status(200).json({
          data: results.rows,
        });
      }
    );
  } catch (error) {
    throw next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    let { like } = req.body;
    let initialLike = "";

    await pool.query(
      `SELECT * FROM posts where post_id = $1`,
      [req.params.id],
      async (err, results) => {
        if (err) {
          throw err;
        }

        initialLike = Number(results.rows[0].likes) + 1;
        // console.log(initialLike, "ini");

        await pool.query(
          `UPDATE posts SET likes = $1 WHERE post_id = $2 RETURNING *`,
          [String(initialLike), req.params.id],
          async (err, results) => {
            if (err) {
              throw err;
            }
            res.status(200).json({
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

const removeLike = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
  createPost,
  createComment,
  addLike,
  removeLike,
  getPosts,
  getSinglePost,
};
