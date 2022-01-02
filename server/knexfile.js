// Update with your config settings.
require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  // development: {
  //   client: "postgresql",
  //   connection: {
  //     filename: "./db.js",
  //   },
  // },

  development: {
    client: "postgresql",
    connection: {
      database: "blog",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
