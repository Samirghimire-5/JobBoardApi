/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("applications", function(table) {
    table.increments("id").primary();
    table.integer("job_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.text("cover_letter").notNullable();
    table.applied_at("created_at").defaultTo(knex.fn.now());
  })
   await knex.schema.alterTable("applications", function(table) {
    table.foreign("job_id").references("id").inTable("jobs");
    table.foreign("user_id").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("applications");
};
