exports.up = function (knex) {
  return knex.schema.createTable("theaters", (t) => {
    t.increments("theater_id").primary();
    t.string("name");
    t.string("address_line_1");
    t.string("address_line_2");
    t.string("city");
    t.string("state");
    t.string("zip");
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("theaters");
};
