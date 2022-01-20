require("dotenv").config();
const Pool = require("pg").Pool;

const isProd = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`;

//first method for connecting to psql
// const pool = new Pool({
//   user: `${process.env.DB_USER}`,
//   password: `${process.env.DB_PASSWORD}`,
//   host: `${process.env.DB_HOST}`,
//   port: `${process.env.DB_PORT}`,
//   database: `${process.env.DB_DATABASE_NAME}`,
// });

//second method
const pool = new Pool({
  connectionString: isProd ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
