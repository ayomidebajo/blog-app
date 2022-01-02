exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("user_id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notifications");
};
