/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name").nullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.enum("role", ["job_seeker", "recruiter"]).notNullable().defaultTo("job_seeker");
    table.dateTime("created_at").defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
