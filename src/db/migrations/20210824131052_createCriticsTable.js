exports.up = function (knex) {
  return knex.schema.createTable("critics", function (table) {
    table.increments("critic_id").primary();
    table.string("preferred_name").notNullable();
    table.string("surname");
    table.string("organization_name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("critics");
};
