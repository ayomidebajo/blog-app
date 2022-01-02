exports.up = function (knex) {
  return knex.schema.createTable("profile", (table) => {
    table.increments("id");
    table.string("dp");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("user_id").inTable("users");
    table.string("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profile");
};
