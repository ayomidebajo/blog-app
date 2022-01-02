const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

// TODO in prod, use dependency injection
// to create knex instance so db access can be mocked for tests

//TODO  in prod don't access knexfile.dev but decide env var which config to use
module.exports = db;
